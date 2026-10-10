import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Check, Hospital, FileText, HeartPulse, Database, Stethoscope, Pill, FlaskConical,
  Microscope, ClipboardList, Receipt, BarChart3, Wrench, UserPlus, Building2, Network, Layers,
  Globe, Workflow, LineChart, ServerCog, GraduationCap, Users, Bot, Sparkles, MessageSquare, Phone,
} from "lucide-react";
import { DashboardMockup } from "@/components/DashboardMockup";
import { RequestDemoDialog } from "@/components/RequestDemoDialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Growfund — Healthcare Software for Hospitals, Clinics, Labs & Pharmacies" },
      { name: "description", content: "Growfund builds HMIS, EMR, EHR, LIS, OPD, pharmacy and diagnostic software — connecting every healthcare workflow through the Nuronix platform." },
      { property: "og:title", content: "Growfund — Powering the Future of Digital Healthcare" },
      { property: "og:description", content: "Integrated healthcare software for hospitals, clinics, diagnostic centers, laboratories and pharmacies." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const solutions = [
  { icon: Hospital, t: "Hospital Management System (HMIS)", d: "Registration, appointments, billing, admissions, discharge and departmental workflows." },
  { icon: FileText, t: "Electronic Medical Records (EMR)", d: "Digital charts, clinical notes, diagnoses, prescriptions and treatment history." },
  { icon: HeartPulse, t: "Electronic Health Records (EHR)", d: "Longitudinal patient records with coordinated access across care settings." },
  { icon: Database, t: "Medical Information System (EMIS)", d: "Health information management, reporting and configurable data workflows." },
  { icon: Stethoscope, t: "OPD & Clinic Management", d: "Scheduling, patient queues, consultations, prescriptions and follow-ups." },
  { icon: Pill, t: "Pharmacy Management", d: "Inventory, stock tracking, dispensing, expiry monitoring, purchasing and billing." },
  { icon: FlaskConical, t: "Laboratory Information System (LIS)", d: "Test orders, sample tracking, result entry, report generation and delivery." },
  { icon: Microscope, t: "Diagnostic Center Management", d: "Test scheduling, diagnostic workflows, result management and distribution." },
  { icon: ClipboardList, t: "Lab Reports & Diagnostics", d: "Digital reports, result validation, history and authorized access to results." },
  { icon: Receipt, t: "Billing & Finance", d: "Patient billing, payment records, service charges and financial reporting." },
  { icon: BarChart3, t: "Analytics & Reporting", d: "Operational dashboards, service statistics and data-driven insights." },
  { icon: Wrench, t: "Custom Healthcare Software", d: "Tailored solutions and integrations for specialized requirements." },
];

const flow = [
  { icon: UserPlus, t: "Registration" },
  { icon: Stethoscope, t: "OPD / Consultation" },
  { icon: FileText, t: "EMR / EHR" },
  { icon: FlaskConical, t: "Lab & Diagnostics" },
  { icon: Pill, t: "Pharmacy" },
  { icon: Receipt, t: "Billing" },
  { icon: BarChart3, t: "Reports & Follow-up" },
];

const orgs = [
  { icon: Hospital, t: "Hospitals & Multispecialty", d: "HMIS, EMR, billing and departmental workflows in one system." },
  { icon: Stethoscope, t: "Clinics & Polyclinics", d: "OPD queues, appointments, prescriptions and clinic billing." },
  { icon: Microscope, t: "Diagnostic Centers", d: "Scheduling, diagnostic workflows and report distribution." },
  { icon: FlaskConical, t: "Medical Laboratories", d: "LIS with sample tracking, validation and digital reports." },
  { icon: Pill, t: "Retail & Hospital Pharmacies", d: "Inventory, expiry alerts, dispensing and purchasing." },
  { icon: HeartPulse, t: "Specialized Facilities", d: "Configurable modules for specialty care workflows." },
  { icon: Network, t: "Networks & Programs", d: "Multi-facility reporting and program-level data management." },
];

const why = [
  { icon: HeartPulse, t: "Healthcare-focused software development" },
  { icon: Workflow, t: "Integrated clinical & administrative workflows" },
  { icon: Layers, t: "Modular and customizable solutions" },
  { icon: Globe, t: "Web-based accessibility" },
  { icon: Users, t: "Simplified patient & department information" },
  { icon: FlaskConical, t: "Laboratory & diagnostic workflow support" },
  { icon: LineChart, t: "Reporting and operational visibility" },
  { icon: ServerCog, t: "Scalable architecture & integrations" },
  { icon: GraduationCap, t: "Implementation, training & support" },
];

const modules = [
  { icon: Hospital, n: "Nuronix Core", d: "Patient records, clinical notes, prescriptions and diagnoses." },
  { icon: Stethoscope, n: "Nuronix Care", d: "Appointments, queues, consultation and clinic billing." },
  { icon: Pill, n: "Nuronix Rx", d: "Dispensing, inventory and expiry tracking." },
  { icon: FlaskConical, n: "Nuronix Labs", d: "Test orders, sample tracking and results." },
  { icon: Bot, n: "Nuronix AI", d: "Analytics and reporting assistance." },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white text-brand-royal border border-brand-electric/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider shadow-soft">
      <Sparkles className="h-3.5 w-3.5" /> {children}
    </span>
  );
}

function Header({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="max-w-3xl mx-auto text-center mb-12">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-brand-deep tracking-tight">{title}</h2>
      {sub && <p className="mt-4 text-base md:text-lg text-muted-foreground">{sub}</p>}
    </div>
  );
}

function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-brand-soft-gradient">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-brand-electric/20 blur-3xl animate-float-slow" />
          <div className="absolute top-20 -right-24 h-96 w-96 rounded-full bg-brand-electric/25 blur-3xl animate-float" />
        </div>
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 relative">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 animate-fade-in-up">
              <Eyebrow>Healthcare Technology · Made in Nepal</Eyebrow>
              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] text-brand-deep tracking-tight">
                Powering the Future of{" "}
                <span className="bg-gradient-to-r from-brand-royal to-brand-electric bg-clip-text text-transparent">Digital Healthcare.</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
                From hospitals and clinics to diagnostic laboratories and pharmacies, Growfund builds intelligent healthcare software that connects clinical workflows, patient records, diagnostics, and healthcare operations in one digital ecosystem.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#solutions" className="inline-flex items-center gap-2 rounded-xl bg-brand-gradient text-primary-foreground px-6 py-3.5 font-semibold shadow-elegant hover:-translate-y-0.5 transition">
                  Explore Our Healthcare Solutions <ArrowRight className="h-4 w-4" />
                </a>
                <RequestDemoDialog
                  trigger={
                    <button className="inline-flex items-center gap-2 rounded-xl border-2 border-brand-royal/30 bg-white text-brand-royal px-6 py-3.5 font-semibold hover:border-brand-royal transition">
                      Request a Demo
                    </button>
                  }
                />
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-brand-deep/80">
                {["HMIS", "EMR / EHR", "LIS", "OPD", "Pharmacy", "Diagnostics"].map((b) => (
                  <span key={b} className="inline-flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-brand-electric" /> {b}
                  </span>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <DashboardMockup />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Solutions */}
      <section id="solutions" className="py-16 md:py-24 bg-background scroll-mt-20">
        <div className="container mx-auto px-4 md:px-6">
          <Header eyebrow="Our Specialization" title="Complete Digital Solutions for Every Healthcare Facility." sub="Purpose-built software for every clinical, diagnostic and administrative workflow." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {solutions.map(({ icon: Icon, t, d }) => (
              <div key={t} className="group rounded-2xl border bg-card p-6 shadow-soft hover:shadow-elegant hover:-translate-y-1 hover:border-brand-electric/40 transition">
                <div className="h-12 w-12 rounded-xl bg-brand-soft text-brand-royal grid place-items-center group-hover:bg-brand-gradient group-hover:text-primary-foreground transition">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-bold text-brand-deep leading-snug">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
                <Link to="/products" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-royal group-hover:gap-2 transition-all">
                  Explore Solution <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Ecosystem */}
      <section className="py-16 md:py-24 bg-brand-soft-gradient">
        <div className="container mx-auto px-4 md:px-6">
          <Header eyebrow="Connected Ecosystem" title="One Patient Journey. Every Department Connected." sub="Information flows from registration to follow-up — reducing repetitive data entry, improving access to records and helping teams coordinate care." />
          <div className="relative">
            <div className="hidden lg:block absolute top-10 left-[7%] right-[7%] h-0.5 bg-gradient-to-r from-brand-electric/20 via-brand-electric to-brand-electric/20" />
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6">
              {flow.map(({ icon: Icon, t }, i) => (
                <div key={t} className="relative text-center">
                  <div className="mx-auto h-20 w-20 rounded-2xl bg-white border border-brand-electric/30 shadow-soft grid place-items-center text-brand-royal relative">
                    <Icon className="h-8 w-8" />
                    <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-brand-gradient text-primary-foreground text-xs font-bold grid place-items-center">{i + 1}</span>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-brand-deep">{t}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {[
              ["Less repetitive entry", "Patient details captured once and reused across departments."],
              ["Faster access", "Authorized staff see the information they need, when they need it."],
              ["Better coordination", "Doctors, labs and pharmacies work from the same record."],
            ].map(([t, d]) => (
              <div key={t} className="rounded-2xl bg-white/80 backdrop-blur border p-6">
                <p className="font-bold text-brand-deep">{t}</p>
                <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">Available integrations depend on the modules implemented at each facility.</p>
        </div>
      </section>

      {/* 4. Organizations */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <Header eyebrow="Who We Serve" title="Built for Every Healthcare Organization." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {orgs.map(({ icon: Icon, t, d }, i) => (
              <div key={t} className={`rounded-2xl border p-6 transition hover:shadow-elegant ${i === 0 ? "bg-brand-gradient text-primary-foreground sm:col-span-2 lg:col-span-1" : "bg-card"}`}>
                <Icon className={`h-8 w-8 ${i === 0 ? "" : "text-brand-electric"}`} />
                <h3 className={`mt-4 font-bold ${i === 0 ? "" : "text-brand-deep"}`}>{t}</h3>
                <p className={`mt-2 text-sm ${i === 0 ? "opacity-85" : "text-muted-foreground"}`}>{d}</p>
              </div>
            ))}
            <Link to="/contact" className="rounded-2xl border-2 border-dashed border-brand-electric/40 p-6 grid place-items-center text-center hover:bg-brand-soft transition">
              <div>
                <Building2 className="h-8 w-8 mx-auto text-brand-royal" />
                <p className="mt-3 font-bold text-brand-deep">Your organization?</p>
                <p className="text-sm text-brand-royal font-semibold mt-1">Talk to us →</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Why */}
      <section className="py-16 md:py-24 bg-brand-soft-gradient">
        <div className="container mx-auto px-4 md:px-6">
          <Header eyebrow="Why Growfund" title="Why Healthcare Teams Choose Growfund." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {why.map(({ icon: Icon, t }) => (
              <div key={t} className="flex items-center gap-4 rounded-2xl bg-white border p-5 shadow-soft hover:border-brand-electric/40 transition">
                <div className="h-11 w-11 shrink-0 rounded-xl bg-brand-soft text-brand-royal grid place-items-center">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="font-semibold text-brand-deep">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Nuronix */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Eyebrow>Flagship Platform</Eyebrow>
            <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-brand-deep tracking-tight">
              Nuronix — The Operating System for Modern Hospitals.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Growfund's modular healthcare platform brings hospital operations, clinical services, diagnostics and pharmacy into one cohesive system.
            </p>
            <Link to="/nuronix" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-gradient text-primary-foreground px-6 py-3.5 font-semibold shadow-elegant hover:-translate-y-0.5 transition">
              Explore Nuronix <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {modules.map(({ icon: Icon, n, d }, i) => (
              <div key={n} className={`rounded-2xl border bg-card p-5 shadow-soft hover:shadow-elegant transition ${i === 4 ? "sm:col-span-2" : ""}`}>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-brand-gradient text-primary-foreground grid place-items-center"><Icon className="h-5 w-5" /></div>
                  <p className="font-bold text-brand-deep">{n}</p>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Interface previews */}
      <section className="py-16 md:py-24 bg-brand-soft-gradient">
        <div className="container mx-auto px-4 md:px-6">
          <Header eyebrow="Interface Preview" title="Software Designed Around Clinical Workflows." sub="Illustrative demonstrations with sample data — not screenshots of deployed customer systems." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <Preview title="EMR Patient Chart" icon={FileText}>
              <Row a="Patient" b="Aarya Sharma · 34F" />
              <Row a="Diagnosis" b="Hypertension (I10)" />
              <Row a="Rx" b="Amlodipine 5mg · OD" />
              <Row a="Next visit" b="12 Nov 2026" />
            </Preview>
            <Preview title="OPD Queue" icon={Stethoscope}>
              {[["T-021", "Cardiology", "In consult"], ["T-022", "General", "Waiting"], ["T-023", "Pediatrics", "Waiting"], ["T-024", "Ortho", "Checked in"]].map(([t, d, s]) => (
                <Row key={t} a={`${t} · ${d}`} b={s} pill />
              ))}
            </Preview>
            <Preview title="Pharmacy Inventory" icon={Pill}>
              <Bar l="Paracetamol 500mg" v={82} />
              <Bar l="Amoxicillin 250mg" v={35} warn />
              <Bar l="Metformin 500mg" v={64} />
              <Bar l="ORS sachets" v={18} warn />
            </Preview>
            <Preview title="Lab Sample Tracking" icon={FlaskConical}>
              {[["S-1042", "CBC", "Processing"], ["S-1043", "Lipid Profile", "Collected"], ["S-1044", "HbA1c", "Validated"]].map(([a, b, c]) => (
                <Row key={a} a={`${a} · ${b}`} b={c} pill />
              ))}
            </Preview>
            <Preview title="LIS Test Results" icon={ClipboardList}>
              <Row a="Hemoglobin" b="13.4 g/dL" />
              <Row a="WBC" b="7,200 /µL" />
              <Row a="Platelets" b="2.6 lakh /µL" />
              <Row a="Status" b="Report ready" pill />
            </Preview>
            <Preview title="Billing & Analytics" icon={BarChart3}>
              <div className="flex items-end gap-1.5 h-20">
                {[40, 55, 35, 70, 60, 85, 75].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-brand-royal to-brand-electric" style={{ height: `${h}%` }} />
                ))}
              </div>
              <Row a="Today's billing" b="NPR 2,48,500" />
            </Preview>
          </div>
        </div>
      </section>

      {/* 8. CTA */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-brand-gradient p-10 md:p-16 text-center shadow-elegant text-primary-foreground">
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-electric/40 blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-extrabold">Let's Digitize Your Healthcare Operations.</h2>
              <p className="mt-4 opacity-85 text-lg max-w-2xl mx-auto">
                Whether you manage a hospital, clinic, laboratory, diagnostic center, or pharmacy, discover healthcare software designed around your workflows.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <RequestDemoDialog
                  trigger={
                    <button className="inline-flex items-center gap-2 rounded-xl bg-white text-brand-royal px-6 py-3 font-semibold hover:bg-brand-soft transition">
                      Request a Demo <ArrowRight className="h-4 w-4" />
                    </button>
                  }
                />
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl border-2 border-white/70 px-6 py-3 font-semibold hover:bg-white/10 transition">
                  <MessageSquare className="h-4 w-4" /> Discuss Your Requirements
                </Link>
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl border-2 border-white/70 px-6 py-3 font-semibold hover:bg-white/10 transition">
                  <Phone className="h-4 w-4" /> Contact Our Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Preview({ title, icon: Icon, children }: { title: string; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white border shadow-soft overflow-hidden hover:shadow-elegant hover:-translate-y-1 transition">
      <div className="flex items-center gap-2 px-4 py-3 border-b bg-brand-soft">
        <Icon className="h-4 w-4 text-brand-royal" />
        <span className="text-sm font-semibold text-brand-deep">{title}</span>
        <span className="ml-auto text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Demo</span>
      </div>
      <div className="p-4 space-y-2.5">{children}</div>
    </div>
  );
}

function Row({ a, b, pill }: { a: string; b: string; pill?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-muted-foreground truncate">{a}</span>
      {pill ? (
        <span className="rounded-full bg-brand-soft text-brand-royal px-2 py-0.5 text-xs font-semibold whitespace-nowrap">{b}</span>
      ) : (
        <span className="font-semibold text-brand-deep whitespace-nowrap">{b}</span>
      )}
    </div>
  );
}

function Bar({ l, v, warn }: { l: string; v: number; warn?: boolean }) {
  return (
    <div>
      <div className="flex justify-between text-xs">
        <span className="text-brand-deep font-medium">{l}</span>
        <span className={warn ? "text-destructive font-semibold" : "text-muted-foreground"}>{v}%{warn ? " · Low" : ""}</span>
      </div>
      <div className="mt-1 h-1.5 rounded-full bg-muted overflow-hidden">
        <div className={`h-full rounded-full ${warn ? "bg-destructive" : "bg-brand-electric"}`} style={{ width: `${v}%` }} />
      </div>
    </div>
  );
}
