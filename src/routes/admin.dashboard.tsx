import { createFileRoute, Link, Outlet, redirect, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { LayoutDashboard, Inbox, Mail, CalendarCheck, Stethoscope, ShieldCheck, Users, History, Settings, LogOut, Menu, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getAdminSession, hasAtLeast, logActivity, ROLE_LABELS, type AdminRole } from "@/lib/admin-auth";

export const Route = createFileRoute("/admin/dashboard")({
  ssr: false,
  head: () => ({ meta: [{ title: "Dashboard — Growfund Admin" }, { name: "robots", content: "noindex, nofollow" }] }),
  beforeLoad: async () => {
    const admin = await getAdminSession();
    if (!admin) throw redirect({ to: "/admin", replace: true });
    return { admin };
  },
  component: DashboardLayout,
});

const IDLE_MS = 30 * 60 * 1000;

type NavItem = { to: string; label: string; icon: typeof Inbox; search?: Record<string, string>; min?: AdminRole };
const NAV: NavItem[] = [
  { to: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/admin/dashboard/submissions", label: "All Submissions", icon: Inbox },
  { to: "/admin/dashboard/submissions", label: "Contact Inquiries", icon: Mail, search: { type: "contact" } },
  { to: "/admin/dashboard/submissions", label: "Demo Requests", icon: CalendarCheck, search: { type: "demo" } },
  { to: "/admin/dashboard/submissions", label: "Solution Inquiries", icon: Stethoscope, search: { type: "product_inquiry" } },
  { to: "/admin/dashboard/privacy", label: "Privacy Policy", icon: ShieldCheck },
  { to: "/admin/dashboard/users", label: "Admin Users", icon: Users, min: "super_admin" },
  { to: "/admin/dashboard/activity", label: "Activity Logs", icon: History, min: "admin" },
  { to: "/admin/dashboard/settings", label: "Settings", icon: Settings },
];

function DashboardLayout() {
  const { admin } = Route.useRouteContext();
  const nav = useNavigate();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const loc = useRouterState({ select: (s) => s.location });

  async function signOut() {
    await logActivity("auth.logout", "admin_user");
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    nav({ to: "/admin", replace: true });
  }

  // Session expiry after inactivity + react to sign-out in other tabs
  useEffect(() => {
    let t = setTimeout(signOut, IDLE_MS);
    const reset = () => { clearTimeout(t); t = setTimeout(signOut, IDLE_MS); };
    const evs = ["mousemove", "keydown", "click", "scroll"];
    evs.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    const { data: sub } = supabase.auth.onAuthStateChange((ev) => { if (ev === "SIGNED_OUT") nav({ to: "/admin", replace: true }); });
    return () => { clearTimeout(t); evs.forEach((e) => window.removeEventListener(e, reset)); sub.subscription.unsubscribe(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => setOpen(false), [loc.href]);

  const items = NAV.filter((i) => !i.min || hasAtLeast(admin.role, i.min));
  const currentType = (loc.search as Record<string, unknown>).type;

  return (
    <div className="min-h-screen bg-brand-soft flex">
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-card border-r flex flex-col transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="h-16 flex items-center gap-2 px-5 border-b">
          <img src="/logo-growfund.png" alt="" className="h-8 w-8" />
          <div>
            <p className="font-display font-extrabold text-brand-deep leading-none">Growfund</p>
            <p className="text-[11px] text-brand-royal font-semibold">Admin Console</p>
          </div>
          <button className="ml-auto lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu"><X className="h-5 w-5" /></button>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {items.map((i) => {
            const active = loc.pathname.replace(/\/$/, "") === i.to && (i.to !== "/admin/dashboard/submissions" || (i.search?.type ?? undefined) === currentType);
            return (
              <Link key={i.label} to={i.to} search={i.search as never}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${active ? "bg-brand-gradient text-primary-foreground shadow-soft" : "text-brand-deep hover:bg-brand-soft"}`}>
                <i.icon className="h-4 w-4" /> {i.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t">
          <button onClick={signOut} className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </aside>
      {open && <div className="fixed inset-0 z-30 bg-foreground/30 lg:hidden" onClick={() => setOpen(false)} />}
      <div className="flex-1 lg:pl-64 min-w-0">
        <header className="sticky top-0 z-20 h-16 bg-card/90 backdrop-blur border-b flex items-center gap-3 px-4 md:px-8">
          <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Menu className="h-5 w-5" /></button>
          <p className="font-semibold text-brand-deep truncate">Nuronix · Growfund Admin</p>
          <div className="ml-auto flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold text-brand-deep leading-none">{admin.username}</p>
              <p className="text-xs text-muted-foreground">{ROLE_LABELS[admin.role]}</p>
            </div>
            <div className="h-9 w-9 rounded-full bg-brand-gradient grid place-items-center text-primary-foreground font-bold uppercase">{admin.username[0]}</div>
          </div>
        </header>
        <main className="p-4 md:p-8"><Outlet /></main>
      </div>
    </div>
  );
}
