import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Lock, ArrowRight, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getAdminSession, usernameToEmail } from "@/lib/admin-auth";

export const Route = createFileRoute("/admin/")({
  ssr: false,
  head: () => ({ meta: [{ title: "Admin Login — Growfund" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: AdminLogin,
});

const MAX_ATTEMPTS = 5;
const LOCK_MS = 60_000;

function AdminLogin() {
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fails, setFails] = useState(0);
  const [lockedUntil, setLockedUntil] = useState(0);

  useEffect(() => {
    getAdminSession().then((s) => { if (s) nav({ to: "/admin/dashboard", replace: true }); });
  }, [nav]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (Date.now() < lockedUntil) { setError("Too many attempts. Please wait a minute and try again."); return; }
    if (!username.trim()) { setError("Please enter your username."); return; }
    if (password.length < 6) { setError("Please enter your password."); return; }
    setLoading(true);
    const { error: err } = await supabase.auth.signInWithPassword({ email: usernameToEmail(username), password });
    if (err) {
      const n = fails + 1;
      setFails(n);
      if (n >= MAX_ATTEMPTS) { setLockedUntil(Date.now() + LOCK_MS); setFails(0); }
      setError(/rate|too many/i.test(err.message) ? "Too many attempts. Please wait and try again." : "Invalid username or password.");
      setLoading(false);
      return;
    }
    const session = await getAdminSession();
    if (!session) {
      await supabase.auth.signOut();
      setError("This account does not have dashboard access.");
      setLoading(false);
      return;
    }
    await supabase.rpc("record_admin_login");
    nav({ to: "/admin/dashboard", replace: true });
  }

  return (
    <div className="min-h-screen grid place-items-center bg-brand-soft-gradient px-4 py-16">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-6">
          <img src="/logo-growfund.png" alt="" className="h-10 w-10 rounded-lg bg-card p-1 shadow-soft" />
          <div>
            <p className="font-display font-extrabold text-xl text-brand-deep leading-none">Growfund</p>
            <p className="text-xs text-brand-royal font-semibold">Nuronix Admin Console</p>
          </div>
        </div>
        <div className="rounded-3xl border bg-card p-8 shadow-elegant">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-brand-gradient grid place-items-center text-primary-foreground"><Lock className="h-5 w-5" /></div>
            <div>
              <h1 className="text-xl font-bold text-brand-deep">Administrator sign in</h1>
              <p className="text-xs text-muted-foreground">Authorized staff only</p>
            </div>
          </div>
          <form onSubmit={submit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="u" className="block text-sm font-semibold text-brand-deep mb-1.5">Username</label>
              <input id="u" autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} maxLength={32}
                className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-royal/40" />
            </div>
            <div>
              <label htmlFor="p" className="block text-sm font-semibold text-brand-deep mb-1.5">Password</label>
              <div className="relative">
                <input id="p" type={show ? "text" : "password"} autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} maxLength={72}
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-brand-royal/40" />
                <button type="button" onClick={() => setShow(!show)} aria-label={show ? "Hide password" : "Show password"}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-brand-royal">
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            {error && (
              <p role="alert" className="flex items-center gap-2 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0" /> {error}
              </p>
            )}
            <button disabled={loading} type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gradient text-primary-foreground px-5 py-3 font-semibold shadow-soft hover:shadow-elegant transition disabled:opacity-60">
              {loading ? "Signing in…" : <>Sign in <ArrowRight className="h-4 w-4" /></>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
