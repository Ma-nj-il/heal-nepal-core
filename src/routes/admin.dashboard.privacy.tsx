import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ExternalLink, FilePlus2, Save, Send, Eye, Pencil } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { hasAtLeast } from "@/lib/admin-auth";
import { PolicyContent } from "@/components/PolicyContent";
import { DEFAULT_POLICY_CONTENT, DEFAULT_POLICY_TITLE } from "@/lib/default-privacy-policy";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/admin/dashboard/privacy")({ component: PrivacyAdmin });

type Version = { id: string; version: string; title: string; content: string; status: string; created_at: string; published_at: string | null };

function PrivacyAdmin() {
  const { admin } = Route.useRouteContext();
  const canEdit = hasAtLeast(admin.role, "admin");
  const qc = useQueryClient();
  const versions = useQuery({
    queryKey: ["admin", "policies"],
    queryFn: async () => {
      const { data, error } = await supabase.from("privacy_policy_versions").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Version[];
    },
  });
  const draft = versions.data?.find((v) => v.status === "draft");
  const published = versions.data?.filter((v) => v.status === "published") ?? [];
  const [form, setForm] = useState({ version: "", title: "", content: "" });
  const [preview, setPreview] = useState(false);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => { if (draft) setForm({ version: draft.version, title: draft.title, content: draft.content }); }, [draft?.id]);

  async function createDraft() {
    const base = published[0];
    const { data: u } = await supabase.auth.getUser();
    const next = base ? bump(base.version) : "1.0";
    const { error } = await supabase.from("privacy_policy_versions").insert({
      version: next, title: base?.title ?? DEFAULT_POLICY_TITLE, content: base?.content ?? DEFAULT_POLICY_CONTENT, status: "draft", created_by: u.user!.id,
    });
    if (error) return toast.error("Could not create draft.");
    qc.invalidateQueries({ queryKey: ["admin", "policies"] });
  }
  async function save() {
    if (!draft) return;
    if (!form.version.trim() || !form.title.trim() || !form.content.trim()) return toast.error("Version, title and content are required.");
    const { error } = await supabase.from("privacy_policy_versions").update(form).eq("id", draft.id);
    if (error) return toast.error("Could not save draft.");
    toast.success("Draft saved");
    qc.invalidateQueries({ queryKey: ["admin", "policies"] });
  }
  async function publish() {
    if (!draft) return;
    await save();
    const { error } = await supabase.rpc("publish_privacy_policy", { _id: draft.id });
    if (error) return toast.error("Could not publish.");
    toast.success("Published — now live on /privacy-policy");
    qc.invalidateQueries({ queryKey: ["admin", "policies"] });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-brand-deep">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">Edit a draft, preview it, then publish. Only published versions appear publicly.</p>
        </div>
        <a href="/privacy-policy" target="_blank" rel="noreferrer" className="ml-auto inline-flex items-center gap-2 rounded-xl border bg-card px-4 py-2 text-sm font-semibold text-brand-royal">
          View public page <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      {canEdit && !draft && (
        <button onClick={createDraft} className="inline-flex items-center gap-2 rounded-xl bg-brand-gradient text-primary-foreground px-4 py-2 text-sm font-semibold shadow-soft">
          <FilePlus2 className="h-4 w-4" /> {published.length ? "Start new draft from current version" : "Create first draft"}
        </button>
      )}

      {draft && (
        <div className="rounded-2xl border bg-card p-5 shadow-soft space-y-4">
          <div className="flex flex-wrap gap-3 items-center">
            <span className="rounded-full bg-brand-yellow/25 px-3 py-1 text-xs font-semibold text-brand-deep">Draft</span>
            <button onClick={() => setPreview(!preview)} className="ml-auto inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-sm">
              {preview ? <><Pencil className="h-4 w-4" /> Edit</> : <><Eye className="h-4 w-4" /> Preview</>}
            </button>
          </div>
          {preview ? (
            <div className="rounded-xl border p-5"><h2 className="text-2xl font-extrabold text-brand-deep mb-6">{form.title}</h2><PolicyContent content={form.content} showToc={false} /></div>
          ) : (
            <>
              <div className="grid sm:grid-cols-3 gap-3">
                <label className="text-xs text-muted-foreground">Version
                  <input disabled={!canEdit} value={form.version} maxLength={30} onChange={(e) => setForm({ ...form, version: e.target.value })} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground" />
                </label>
                <label className="text-xs text-muted-foreground sm:col-span-2">Title
                  <input disabled={!canEdit} value={form.title} maxLength={200} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground" />
                </label>
              </div>
              <label className="block text-xs text-muted-foreground">Content — use "## " for section headings and "- " for bullet points
                <textarea disabled={!canEdit} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={22} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 font-mono text-xs text-foreground" />
              </label>
            </>
          )}
          {canEdit && (
            <div className="flex flex-wrap gap-3">
              <button onClick={save} className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold"><Save className="h-4 w-4" /> Save draft</button>
              <button onClick={() => setConfirm(true)} className="inline-flex items-center gap-2 rounded-xl bg-brand-gradient text-primary-foreground px-4 py-2 text-sm font-semibold"><Send className="h-4 w-4" /> Publish</button>
            </div>
          )}
        </div>
      )}

      <div className="rounded-2xl border bg-card p-5 shadow-soft">
        <h2 className="font-bold text-brand-deep mb-3">Published history</h2>
        <ul className="divide-y text-sm">
          {published.map((v, i) => (
            <li key={v.id} className="py-2.5 flex items-center gap-3">
              <span className="font-mono">v{v.version}</span><span className="text-muted-foreground">{v.title}</span>
              <span className="ml-auto text-xs text-muted-foreground">{v.published_at && new Date(v.published_at).toLocaleString()}</span>
              {i === 0 && <span className="rounded-full bg-brand-green/15 px-2 py-0.5 text-xs font-semibold text-brand-green">Live</span>}
            </li>
          ))}
          {published.length === 0 && <li className="py-3 text-muted-foreground">Nothing published yet — the public page shows the built-in draft text.</li>}
        </ul>
      </div>

      <AlertDialog open={confirm} onOpenChange={setConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Publish version {form.version}?</AlertDialogTitle>
            <AlertDialogDescription>This replaces the public Privacy Policy immediately. Make sure all [CONFIRM] items are resolved.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={publish}>Publish</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function bump(v: string) {
  const m = v.match(/^(\d+)\.(\d+)/);
  return m ? `${m[1]}.${Number(m[2]) + 1}` : `${v}-next`;
}
