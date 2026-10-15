import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Search, Download, ChevronLeft, ChevronRight, Archive, ArchiveRestore, X, Mail, Phone, Building2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { FORM_TYPE_LABELS, STATUS_LABELS, type FormType, type SubmissionStatus } from "@/lib/submissions";
import { hasAtLeast, logActivity } from "@/lib/admin-auth";
import { toCsv, downloadCsv } from "@/lib/csv";
import { StatusBadge } from "@/components/admin/StatusBadge";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const searchSchema = z.object({
  type: z.enum(["contact", "demo", "requirements", "product_inquiry"]).optional(),
  status: z.enum(["new", "in_progress", "responded", "closed"]).optional(),
  q: z.string().max(100).optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  sort: z.enum(["newest", "oldest"]).optional(),
  archived: z.boolean().optional(),
  page: z.number().int().min(1).optional(),
});
type S = z.infer<typeof searchSchema>;

export const Route = createFileRoute("/admin/dashboard/submissions")({
  validateSearch: (s) => searchSchema.parse(s),
  component: Submissions,
});

const PAGE = 20;
type Row = {
  id: string; ref_code: string; form_type: string; full_name: string; email: string; phone: string | null;
  organization: string | null; subject: string | null; message: string | null; product: string | null;
  facility_type: string | null; province: string | null; requester_role: string | null; source_page: string | null;
  status: string; assigned_to: string | null; follow_up_date: string | null; archived_at: string | null;
  created_at: string; updated_at: string;
};

function applyFilters<T extends { eq: Function; is: Function; not: Function; or: Function; gte: Function; lte: Function }>(query: T, s: S): T {
  let q: any = query;
  if (s.type) q = q.eq("form_type", s.type);
  if (s.status) q = q.eq("status", s.status);
  q = s.archived ? q.not("archived_at", "is", null) : q.is("archived_at", null);
  if (s.from) q = q.gte("created_at", new Date(s.from).toISOString());
  if (s.to) { const d = new Date(s.to); d.setDate(d.getDate() + 1); q = q.lte("created_at", d.toISOString()); }
  const term = s.q?.trim().replace(/[%,()*]/g, " ").trim();
  if (term) q = q.or(`full_name.ilike.%${term}%,email.ilike.%${term}%,organization.ilike.%${term}%,ref_code.ilike.%${term}%`);
  return q;
}

function Submissions() {
  const s = Route.useSearch();
  const { admin } = Route.useRouteContext();
  const nav = useNavigate({ from: Route.fullPath });
  const [qInput, setQInput] = useState(s.q ?? "");
  const [openId, setOpenId] = useState<string | null>(null);
  const page = s.page ?? 1;
  const set = (patch: Partial<S>) => nav({ search: (p: S) => ({ ...p, page: undefined, ...patch }) });

  const list = useQuery({
    queryKey: ["admin", "submissions", s],
    queryFn: async () => {
      let q = supabase.from("form_submissions").select("*", { count: "exact" });
      q = applyFilters(q, s);
      const { data, error, count } = await q.order("created_at", { ascending: s.sort === "oldest" }).range((page - 1) * PAGE, page * PAGE - 1);
      if (error) throw error;
      return { rows: data as Row[], count: count ?? 0 };
    },
  });

  async function exportCsv() {
    let q = supabase.from("form_submissions").select("*");
    q = applyFilters(q, s);
    const { data, error } = await q.order("created_at", { ascending: s.sort === "oldest" }).limit(5000);
    if (error) { toast.error("Export failed. Please try again."); return; }
    const cols = ["ref_code", "form_type", "status", "full_name", "email", "phone", "organization", "subject", "product", "facility_type", "province", "requester_role", "message", "follow_up_date", "source_page", "created_at"];
    downloadCsv(`growfund-submissions-${new Date().toISOString().slice(0, 10)}.csv`, toCsv(data as Row[], cols));
    await logActivity("submissions.exported", "submission", undefined, { count: data.length, filters: { type: s.type ?? null, status: s.status ?? null } });
    toast.success(`Exported ${data.length} records`);
  }

  const total = list.data?.count ?? 0;
  const pages = Math.max(1, Math.ceil(total / PAGE));
  const title = s.type ? FORM_TYPE_LABELS[s.type] + "s" : "All Submissions";

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-brand-deep">{title}</h1>
          <p className="text-sm text-muted-foreground">{total} {s.archived ? "archived " : ""}record{total === 1 ? "" : "s"}</p>
        </div>
        {hasAtLeast(admin.role, "admin") && (
          <button onClick={exportCsv} className="ml-auto inline-flex items-center gap-2 rounded-xl bg-brand-gradient text-primary-foreground px-4 py-2 text-sm font-semibold shadow-soft">
            <Download className="h-4 w-4" /> Export CSV
          </button>
        )}
      </div>

      <div className="rounded-2xl border bg-card p-4 shadow-soft grid gap-3 md:grid-cols-2 xl:grid-cols-6">
        <form className="relative xl:col-span-2" onSubmit={(e) => { e.preventDefault(); set({ q: qInput || undefined }); }}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input value={qInput} onChange={(e) => setQInput(e.target.value)} placeholder="Search name, email, organization, ID…" maxLength={100}
            className="w-full rounded-xl border border-input bg-background pl-9 pr-3 py-2 text-sm" />
        </form>
        <select value={s.type ?? ""} onChange={(e) => set({ type: (e.target.value || undefined) as S["type"] })} className="rounded-xl border border-input bg-background px-3 py-2 text-sm">
          <option value="">All types</option>
          {Object.entries(FORM_TYPE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <select value={s.status ?? ""} onChange={(e) => set({ status: (e.target.value || undefined) as S["status"] })} className="rounded-xl border border-input bg-background px-3 py-2 text-sm">
          <option value="">All statuses</option>
          {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <div className="flex gap-2">
          <input type="date" aria-label="From date" value={s.from ?? ""} onChange={(e) => set({ from: e.target.value || undefined })} className="min-w-0 flex-1 rounded-xl border border-input bg-background px-2 py-2 text-xs" />
          <input type="date" aria-label="To date" value={s.to ?? ""} onChange={(e) => set({ to: e.target.value || undefined })} className="min-w-0 flex-1 rounded-xl border border-input bg-background px-2 py-2 text-xs" />
        </div>
        <div className="flex gap-2">
          <select value={s.sort ?? "newest"} onChange={(e) => set({ sort: e.target.value === "oldest" ? "oldest" : undefined })} className="flex-1 rounded-xl border border-input bg-background px-3 py-2 text-sm">
            <option value="newest">Newest</option><option value="oldest">Oldest</option>
          </select>
          <button onClick={() => set({ archived: s.archived ? undefined : true })} className={`rounded-xl border px-3 text-sm font-medium ${s.archived ? "bg-brand-royal text-primary-foreground" : "bg-background"}`}>
            {s.archived ? "Archived" : "Active"}
          </button>
        </div>
      </div>

      <div className="rounded-2xl border bg-card shadow-soft overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-brand-soft text-left text-xs uppercase tracking-wider text-brand-royal">
            <tr><th className="p-3">ID</th><th className="p-3">Name</th><th className="p-3 hidden md:table-cell">Organization</th><th className="p-3 hidden lg:table-cell">Type</th><th className="p-3">Status</th><th className="p-3 hidden md:table-cell">Date</th></tr>
          </thead>
          <tbody className="divide-y">
            {list.isLoading && <tr><td colSpan={6} className="p-6 text-center text-muted-foreground">Loading…</td></tr>}
            {list.error && <tr><td colSpan={6} className="p-6 text-center text-destructive">Could not load submissions. Please refresh.</td></tr>}
            {list.data?.rows.length === 0 && <tr><td colSpan={6} className="p-6 text-center text-muted-foreground">No matching submissions.</td></tr>}
            {list.data?.rows.map((r) => (
              <tr key={r.id} onClick={() => setOpenId(r.id)} className="cursor-pointer hover:bg-brand-soft/60">
                <td className="p-3 font-mono text-xs text-brand-royal">{r.ref_code}</td>
                <td className="p-3"><p className="font-semibold text-brand-deep">{r.full_name}</p><p className="text-xs text-muted-foreground">{r.email}</p></td>
                <td className="p-3 hidden md:table-cell">{r.organization ?? "—"}</td>
                <td className="p-3 hidden lg:table-cell">{FORM_TYPE_LABELS[r.form_type as FormType]}</td>
                <td className="p-3"><StatusBadge status={r.status as SubmissionStatus} /></td>
                <td className="p-3 hidden md:table-cell text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-end gap-2 text-sm">
        <span className="text-muted-foreground">Page {page} of {pages}</span>
        <button disabled={page <= 1} onClick={() => nav({ search: (p: S) => ({ ...p, page: page - 1 }) })} className="rounded-lg border bg-card p-2 disabled:opacity-40" aria-label="Previous page"><ChevronLeft className="h-4 w-4" /></button>
        <button disabled={page >= pages} onClick={() => nav({ search: (p: S) => ({ ...p, page: page + 1 }) })} className="rounded-lg border bg-card p-2 disabled:opacity-40" aria-label="Next page"><ChevronRight className="h-4 w-4" /></button>
      </div>

      {openId && <Detail id={openId} onClose={() => setOpenId(null)} />}
    </div>
  );
}

function Detail({ id, onClose }: { id: string; onClose: () => void }) {
  const qc = useQueryClient();
  const [note, setNote] = useState("");
  const [confirmArchive, setConfirmArchive] = useState(false);
  const { data: r } = useQuery({
    queryKey: ["admin", "submission", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("form_submissions").select("*").eq("id", id).single();
      if (error) throw error;
      return data as Row;
    },
  });
  const notes = useQuery({
    queryKey: ["admin", "notes", id],
    queryFn: async () => (await supabase.from("submission_notes").select("*").eq("submission_id", id).order("created_at")).data ?? [],
  });
  const staff = useQuery({
    queryKey: ["admin", "staff"],
    queryFn: async () => (await supabase.from("admin_profiles").select("user_id,username,display_name,is_active").eq("is_active", true)).data ?? [],
  });
  const nameOf = (uid: string | null) => staff.data?.find((x) => x.user_id === uid)?.username ?? "Unknown";

  async function update(patch: Partial<Row>) {
    const { error } = await supabase.from("form_submissions").update(patch).eq("id", id);
    if (error) { toast.error("Update failed. Please try again."); return; }
    toast.success("Saved");
    qc.invalidateQueries({ queryKey: ["admin"] });
  }
  async function addNote() {
    const body = note.trim();
    if (!body) return;
    const { data: u } = await supabase.auth.getUser();
    const { error } = await supabase.from("submission_notes").insert({ submission_id: id, author_id: u.user!.id, body: body.slice(0, 2000) });
    if (error) { toast.error("Could not add note."); return; }
    setNote("");
    notes.refetch();
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-foreground/30" onClick={onClose} />
      <div className="relative w-full max-w-xl h-full overflow-y-auto bg-card shadow-elegant">
        <div className="sticky top-0 bg-brand-gradient text-primary-foreground p-5 flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-mono text-xs opacity-80">{r?.ref_code}</p>
            <h2 className="text-xl font-bold truncate">{r?.full_name ?? "Loading…"}</h2>
            {r && <p className="text-xs opacity-80">{FORM_TYPE_LABELS[r.form_type as FormType]} · {new Date(r.created_at).toLocaleString()}</p>}
          </div>
          <button onClick={onClose} aria-label="Close"><X className="h-5 w-5" /></button>
        </div>
        {r && (
          <div className="p-5 space-y-6">
            <div className="grid gap-2 text-sm">
              <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-brand-royal" /><a className="text-brand-royal hover:underline" href={`mailto:${r.email}`}>{r.email}</a></p>
              {r.phone && <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-brand-royal" />{r.phone}</p>}
              {r.organization && <p className="flex items-center gap-2"><Building2 className="h-4 w-4 text-brand-royal" />{r.organization}</p>}
            </div>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              {([["Subject", r.subject], ["Product", r.product], ["Facility", r.facility_type], ["Province", r.province], ["Role", r.requester_role], ["Source", r.source_page]] as const)
                .filter(([, v]) => v).map(([k, v]) => (
                  <div key={k}><dt className="text-xs text-muted-foreground">{k}</dt><dd className="font-medium text-brand-deep">{v}</dd></div>
                ))}
            </dl>
            {r.message && <div><p className="text-xs text-muted-foreground mb-1">Message</p><p className="whitespace-pre-wrap rounded-xl bg-brand-soft p-4 text-sm">{r.message}</p></div>}

            <div className="grid sm:grid-cols-3 gap-3">
              <label className="text-xs text-muted-foreground">Status
                <select value={r.status} onChange={(e) => update({ status: e.target.value })} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground">
                  {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </label>
              <label className="text-xs text-muted-foreground">Follow-up
                <input type="date" value={r.follow_up_date ?? ""} onChange={(e) => update({ follow_up_date: e.target.value || null })} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground" />
              </label>
              <label className="text-xs text-muted-foreground">Assigned to
                <select value={r.assigned_to ?? ""} onChange={(e) => update({ assigned_to: e.target.value || null })} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground">
                  <option value="">Unassigned</option>
                  {staff.data?.map((u) => <option key={u.user_id} value={u.user_id}>{u.display_name || u.username}</option>)}
                </select>
              </label>
            </div>

            <div>
              <h3 className="font-bold text-brand-deep mb-2">Internal notes</h3>
              <ul className="space-y-2 mb-3">
                {notes.data?.map((n) => (
                  <li key={n.id} className="rounded-xl border p-3 text-sm">
                    <p className="whitespace-pre-wrap">{n.body}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{nameOf(n.author_id)} · {new Date(n.created_at).toLocaleString()}</p>
                  </li>
                ))}
                {notes.data?.length === 0 && <li className="text-sm text-muted-foreground">No notes yet.</li>}
              </ul>
              <textarea value={note} onChange={(e) => setNote(e.target.value)} maxLength={2000} rows={3} placeholder="Add an internal note (not visible to the customer)…" className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm" />
              <button onClick={addNote} disabled={!note.trim()} className="mt-2 rounded-xl bg-brand-royal text-primary-foreground px-4 py-2 text-sm font-semibold disabled:opacity-50">Add note</button>
            </div>

            <div className="border-t pt-4">
              {r.archived_at ? (
                <button onClick={() => update({ archived_at: null })} className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold"><ArchiveRestore className="h-4 w-4" /> Restore</button>
              ) : (
                <button onClick={() => setConfirmArchive(true)} className="inline-flex items-center gap-2 rounded-xl border border-destructive/40 text-destructive px-4 py-2 text-sm font-semibold"><Archive className="h-4 w-4" /> Archive</button>
              )}
            </div>
          </div>
        )}
      </div>
      <AlertDialog open={confirmArchive} onOpenChange={setConfirmArchive}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Archive this submission?</AlertDialogTitle>
            <AlertDialogDescription>It will be hidden from active lists and statistics. You can restore it from the Archived view.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => update({ archived_at: new Date().toISOString() })}>Archive</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
