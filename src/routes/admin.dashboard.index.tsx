import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Inbox, Sparkles, Loader, MailCheck, CheckCircle2, CalendarCheck } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { FORM_TYPE_LABELS, STATUS_LABELS, type FormType, type SubmissionStatus } from "@/lib/submissions";
import { StatusBadge } from "@/components/admin/StatusBadge";

export const Route = createFileRoute("/admin/dashboard/")({ component: Overview });

function Overview() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "overview"],
    queryFn: async () => {
      const { data, error } = await supabase.from("form_submissions")
        .select("id,ref_code,form_type,status,full_name,organization,created_at")
        .is("archived_at", null).order("created_at", { ascending: false }).limit(5000);
      if (error) throw error;
      return data;
    },
  });

  if (error) return <p className="text-destructive">Could not load dashboard data. Please refresh.</p>;
  const rows = data ?? [];
  const count = (s: SubmissionStatus) => rows.filter((r) => r.status === s).length;
  const cards = [
    { label: "Total submissions", value: rows.length, icon: Inbox },
    { label: "New", value: count("new"), icon: Sparkles },
    { label: "In progress", value: count("in_progress"), icon: Loader },
    { label: "Responded", value: count("responded"), icon: MailCheck },
    { label: "Closed", value: count("closed"), icon: CheckCircle2 },
    { label: "Demo requests", value: rows.filter((r) => r.form_type === "demo").length, icon: CalendarCheck },
  ];

  const days: { day: string; count: number }[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    days.push({ day: key.slice(5), count: rows.filter((r) => new Date(r.created_at).toISOString().slice(0, 10) === key).length });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-brand-deep">Overview</h1>
        <p className="text-sm text-muted-foreground">Live figures from your website submissions (archived records excluded).</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border bg-card p-5 shadow-soft">
            <c.icon className="h-5 w-5 text-brand-royal" />
            <p className="mt-3 text-3xl font-extrabold text-brand-deep">{isLoading ? "–" : c.value}</p>
            <p className="text-xs text-muted-foreground">{c.label}</p>
          </div>
        ))}
      </div>
      <div className="grid xl:grid-cols-5 gap-6">
        <div className="xl:col-span-3 rounded-2xl border bg-card p-5 shadow-soft">
          <h2 className="font-bold text-brand-deep mb-4">Inquiries — last 30 days</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={days}>
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--brand-royal)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--brand-royal)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} interval={4} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} width={28} />
                <Tooltip />
                <Area type="monotone" dataKey="count" name="Submissions" stroke="var(--brand-royal)" fill="url(#g)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="xl:col-span-2 rounded-2xl border bg-card p-5 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-brand-deep">Recent submissions</h2>
            <Link to="/admin/dashboard/submissions" className="text-sm text-brand-royal font-semibold">View all</Link>
          </div>
          <ul className="divide-y">
            {rows.slice(0, 6).map((r) => (
              <li key={r.id} className="py-3 flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-brand-deep truncate">{r.full_name}</p>
                  <p className="text-xs text-muted-foreground truncate">{r.ref_code} · {FORM_TYPE_LABELS[r.form_type as FormType]} · {new Date(r.created_at).toLocaleDateString()}</p>
                </div>
                <StatusBadge status={r.status as SubmissionStatus} />
              </li>
            ))}
            {!isLoading && rows.length === 0 && <li className="py-6 text-sm text-muted-foreground text-center">No submissions yet.</li>}
          </ul>
        </div>
      </div>
      <p className="sr-only">{Object.values(STATUS_LABELS).join(",")}</p>
    </div>
  );
}
