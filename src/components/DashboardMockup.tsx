import { Activity, Users, HeartPulse, FileText } from "lucide-react";

export function DashboardMockup() {
  return (
    <div className="relative animate-float">
      <div className="absolute -inset-6 bg-brand-electric/30 blur-3xl rounded-full" />
      <div className="relative rounded-2xl bg-white shadow-elegant border border-white/40 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b bg-gradient-to-r from-brand-soft to-white">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
          </div>
          <div className="ml-3 text-xs font-medium text-brand-deep">nuronix.health/dashboard</div>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-green-100 text-green-700 px-2 py-0.5 text-[10px] font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" /> Active
          </span>
        </div>

        <div className="p-4 grid grid-cols-3 gap-3">
          <Stat icon={<Users className="h-4 w-4" />} label="Patients" value="1,284" tone="bg-blue-50 text-brand-royal" />
          <Stat icon={<HeartPulse className="h-4 w-4" />} label="OPD Today" value="142" tone="bg-emerald-50 text-emerald-600" />
          <Stat icon={<FileText className="h-4 w-4" />} label="Reports" value="58" tone="bg-amber-50 text-amber-600" />
        </div>

        <div className="px-4 pb-4">
          <div className="rounded-xl bg-gradient-to-br from-brand-soft to-white border p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-brand-deep">Patient Visits · 7 days</span>
              <Activity className="h-3.5 w-3.5 text-brand-royal" />
            </div>
            <svg viewBox="0 0 200 60" className="w-full h-16">
              <defs>
                <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#3D9BE9" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#3D9BE9" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,45 L30,38 L60,42 L90,22 L120,28 L150,12 L180,18 L200,8 L200,60 L0,60 Z" fill="url(#g)" />
              <path d="M0,45 L30,38 L60,42 L90,22 L120,28 L150,12 L180,18 L200,8" stroke="#1E5BC6" strokeWidth="2" fill="none" />
            </svg>
          </div>

          <div className="mt-3 space-y-2">
            {[
              ["Aarya Sharma", "OPD · Cardiology", "bg-blue-500"],
              ["Bishal Karki", "Lab · Hematology", "bg-emerald-500"],
              ["Sita Rai", "Pharmacy · Refill", "bg-amber-500"],
            ].map(([n, t, c]) => (
              <div key={n} className="flex items-center gap-3 rounded-lg border bg-white p-2.5">
                <div className={`h-7 w-7 rounded-full ${c} text-white grid place-items-center text-xs font-bold`}>{n[0]}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-brand-deep truncate">{n}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{t}</p>
                </div>
                <span className="text-[10px] font-semibold text-brand-royal">View →</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: string; tone: string }) {
  return (
    <div className="rounded-xl border bg-white p-3">
      <div className={`inline-flex h-7 w-7 items-center justify-center rounded-lg ${tone}`}>{icon}</div>
      <p className="mt-2 text-lg font-extrabold text-brand-deep">{value}</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  );
}
