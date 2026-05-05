import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LogOut, Mail, Phone, Building2, Calendar, Trash2, Check, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Growfund" }, { name: "robots", content: "noindex" }] }),
  component: Dashboard,
});

type Contact = {
  id: string; name: string; organization: string; email: string; phone: string;
  province: string | null; role: string | null; subject: string; message: string;
  is_read: boolean; created_at: string;
};
type Demo = {
  id: string; name: string; organization: string; email: string; phone: string;
  facility_type: string; notes: string | null; is_read: boolean; created_at: string;
};

function Dashboard() {
  const nav = useNavigate();
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [tab, setTab] = useState<"contact" | "demo">("contact");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [demos, setDemos] = useState<Demo[]>([]);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(async ({ data }) => {
      if (!mounted) return;
      if (!data.session) {
        nav({ to: "/admin/login" });
        return;
      }
      setUserEmail(data.session.user.email ?? "");
      const { data: roles } = await supabase
        .from("user_roles").select("role").eq("user_id", data.session.user.id);
      const admin = !!roles?.some((r) => r.role === "admin");
      setIsAdmin(admin);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) nav({ to: "/admin/login" });
    });
    return () => { mounted = false; sub.subscription.unsubscribe(); };
  }, [nav]);

  async function load() {
    setLoading(true);
    const [{ data: c }, { data: d }] = await Promise.all([
      supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }),
      supabase.from("demo_requests").select("*").order("created_at", { ascending: false }),
    ]);
    setContacts((c as Contact[]) ?? []);
    setDemos((d as Demo[]) ?? []);
    setLoading(false);
  }

  useEffect(() => { if (isAdmin) load(); }, [isAdmin]);

  async function logout() {
    await supabase.auth.signOut();
    nav({ to: "/admin/login" });
  }

  async function toggleRead(table: "contact_submissions" | "demo_requests", id: string, current: boolean) {
    const { error } = await supabase.from(table).update({ is_read: !current }).eq("id", id);
    if (error) return toast.error("Update failed");
    if (table === "contact_submissions") setContacts((x) => x.map((r) => r.id === id ? { ...r, is_read: !current } : r));
    else setDemos((x) => x.map((r) => r.id === id ? { ...r, is_read: !current } : r));
  }

  async function remove(table: "contact_submissions" | "demo_requests", id: string) {
    if (!confirm("Delete this submission?")) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) return toast.error("Delete failed");
    if (table === "contact_submissions") setContacts((x) => x.filter((r) => r.id !== id));
    else setDemos((x) => x.filter((r) => r.id !== id));
    toast.success("Deleted");
  }

  if (!ready) return <div className="min-h-[60vh] grid place-items-center text-muted-foreground">Loading…</div>;

  if (!isAdmin) {
    return (
      <div className="min-h-[60vh] grid place-items-center px-4 py-16">
        <div className="max-w-md text-center rounded-3xl border bg-card p-8 shadow-soft">
          <h1 className="text-2xl font-bold text-brand-deep mb-2">Access Pending</h1>
          <p className="text-sm text-muted-foreground mb-4">
            Your account ({userEmail}) does not have admin access yet. Ask an existing administrator to grant your account the <code className="font-mono">admin</code> role.
          </p>
          <button onClick={logout} className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-muted">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </div>
    );
  }

  const list = tab === "contact" ? contacts : demos;
  const unread = (tab === "contact" ? contacts : demos).filter((r) => !r.is_read).length;

  return (
    <div className="container mx-auto px-4 md:px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-deep">Submissions Dashboard</h1>
          <p className="text-sm text-muted-foreground">Signed in as {userEmail}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold hover:bg-muted">
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
          </button>
          <button onClick={logout} className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold hover:bg-muted">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-6 border-b">
        {(["contact", "demo"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition ${
              tab === t ? "border-brand-royal text-brand-deep" : "border-transparent text-muted-foreground hover:text-brand-deep"
            }`}>
            {t === "contact" ? "Contact Form" : "Demo Requests"}
            <span className="ml-2 text-xs rounded-full bg-muted px-2 py-0.5">
              {t === "contact" ? contacts.length : demos.length}
            </span>
          </button>
        ))}
      </div>

      <p className="text-sm text-muted-foreground mb-4">{unread} unread</p>

      <div className="grid gap-4">
        {list.length === 0 && (
          <div className="rounded-2xl border bg-card p-10 text-center text-muted-foreground">No submissions yet.</div>
        )}
        {tab === "contact" && contacts.map((r) => (
          <article key={r.id} className={`rounded-2xl border bg-card p-5 shadow-soft ${!r.is_read ? "border-brand-royal/40 bg-brand-royal/5" : ""}`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-bold text-brand-deep">{r.name} <span className="text-xs font-normal text-muted-foreground">· {r.subject}</span></h3>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mt-1">
                  <span className="inline-flex items-center gap-1"><Building2 className="h-3 w-3" />{r.organization}</span>
                  <span className="inline-flex items-center gap-1"><Mail className="h-3 w-3" />{r.email}</span>
                  <span className="inline-flex items-center gap-1"><Phone className="h-3 w-3" />{r.phone}</span>
                  {r.province && <span>{r.province}</span>}
                  {r.role && <span>{r.role}</span>}
                  <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(r.created_at).toLocaleString()}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => toggleRead("contact_submissions", r.id, r.is_read)} className="rounded-lg border px-2.5 py-1.5 text-xs hover:bg-muted inline-flex items-center gap-1">
                  <Check className="h-3 w-3" /> {r.is_read ? "Mark unread" : "Mark read"}
                </button>
                <button onClick={() => remove("contact_submissions", r.id)} className="rounded-lg border px-2.5 py-1.5 text-xs text-destructive hover:bg-destructive/10 inline-flex items-center gap-1">
                  <Trash2 className="h-3 w-3" /> Delete
                </button>
              </div>
            </div>
            <p className="mt-3 text-sm whitespace-pre-wrap">{r.message}</p>
          </article>
        ))}
        {tab === "demo" && demos.map((r) => (
          <article key={r.id} className={`rounded-2xl border bg-card p-5 shadow-soft ${!r.is_read ? "border-brand-royal/40 bg-brand-royal/5" : ""}`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-bold text-brand-deep">{r.name} <span className="text-xs font-normal text-muted-foreground">· {r.facility_type}</span></h3>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mt-1">
                  <span className="inline-flex items-center gap-1"><Building2 className="h-3 w-3" />{r.organization}</span>
                  <span className="inline-flex items-center gap-1"><Mail className="h-3 w-3" />{r.email}</span>
                  <span className="inline-flex items-center gap-1"><Phone className="h-3 w-3" />{r.phone}</span>
                  <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(r.created_at).toLocaleString()}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => toggleRead("demo_requests", r.id, r.is_read)} className="rounded-lg border px-2.5 py-1.5 text-xs hover:bg-muted inline-flex items-center gap-1">
                  <Check className="h-3 w-3" /> {r.is_read ? "Mark unread" : "Mark read"}
                </button>
                <button onClick={() => remove("demo_requests", r.id)} className="rounded-lg border px-2.5 py-1.5 text-xs text-destructive hover:bg-destructive/10 inline-flex items-center gap-1">
                  <Trash2 className="h-3 w-3" /> Delete
                </button>
              </div>
            </div>
            {r.notes && <p className="mt-3 text-sm whitespace-pre-wrap">{r.notes}</p>}
          </article>
        ))}
      </div>
    </div>
  );
}
