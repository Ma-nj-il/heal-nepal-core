import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Hospital,
  Pill,
  FlaskConical,
  Stethoscope,
  Bot,
  ShieldCheck,
  BookOpen,
  Headphones,
  Cloud,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/Section";
import { CTABanner } from "@/components/CTABanner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/nuronix")({
  head: () => ({
    meta: [
      { title: "Nuronix EMR — Nepal's First WHO-Standard Electronic Medical Record" },
      {
        name: "description",
        content:
          "Open-source, web-based EMR and HMIS system for hospitals, clinics, labs, and pharmacies in Nepal.",
      },
      { property: "og:title", content: "Nuronix — The Operating System for Modern Hospitals" },
      { property: "og:description", content: "Open-source, WHO-standard EMR built in Nepal." },
    ],
  }),
  component: NuronixPage,
});

const features = {
  web: {
    title: "Web-Based & Cloud Ready",
    body: "Nuronix runs entirely in your browser. There's nothing to install, nothing to maintain on individual workstations. Access patient records, run reports, and manage your hospital from any device — desktop, tablet, or mobile — from anywhere with internet access.",
    icon: Cloud,
    list: [
      "Zero installation",
      "Works on Chrome / Firefox / Safari",
      "Mobile responsive",
      "Multi-branch support",
      "Real-time sync",
    ],
  },
  security: {
    title: "Security & Compliance",
    body: "Healthcare data is among the most sensitive data in the world. Nuronix is built with security at its foundation.",
    icon: ShieldCheck,
    list: [
      "AES-256 data encryption at rest and in transit",
      "Role-based access control (RBAC)",
      "Full audit logs — every action is traceable",
      "HIPAA-aligned data governance",
      "Automatic session timeout",
      "IP whitelisting for facility networks",
      "Daily encrypted backups",
      "Two-factor authentication (2FA) for admin roles",
    ],
  },
  support: {
    title: "Support & Training",
    body: "We don't just sell software — we partner with your facility for long-term success.",
    icon: Headphones,
    list: [
      "Dedicated onboarding specialist for every new client",
      "Live training sessions for clinical and admin staff",
      "Video tutorials in Nepali and English",
      "24/7 technical support via phone, WhatsApp, and email",
      "Monthly system health check calls",
      "On-site support available across Nepal",
      "Free updates and patches — forever",
    ],
  },
};

const modules = [
  {
    icon: Pill,
    name: "Pharmacy Management",
    sub: "Nuronix Rx",
    intro: "Total control over every medicine that enters and leaves your facility.",
    list: [
      "Drug inventory management with low-stock alerts",
      "Prescription-to-dispense workflow integration",
      "Drug interaction and allergy alerts",
      "Batch tracking and expiry management",
      "Supplier and purchase order management",
      "Daily, weekly, and monthly sales reports",
      "Barcode scanning support",
      "Controlled substance tracking",
    ],
  },
  {
    icon: FlaskConical,
    name: "Laboratory Management",
    sub: "Nuronix Labs",
    intro: "From test order to result delivery — fully digital.",
    list: [
      "Doctor-to-lab test order integration",
      "Lab technician workflow management",
      "Reference range flagging (normal/abnormal)",
      "Automated result delivery to patient record",
      "Lab report PDF generation and printing",
      "Specimen tracking and chain of custody",
      "Haematology, biochemistry, microbiology, radiology",
      "Integration with external LIS systems",
    ],
  },
  {
    icon: Stethoscope,
    name: "Clinic Management",
    sub: "Nuronix Care",
    intro: "Order to your OPD, specialist clinic, or general practice.",
    list: [
      "Online and walk-in appointment booking",
      "Digital queue display system",
      "Consultation room workflow",
      "Chief complaint and SOAP note templates",
      "ICD-10 diagnosis code support",
      "Follow-up scheduling with automated reminders",
      "Billing and invoice generation",
      "Patient satisfaction scoring",
    ],
  },
  {
    icon: Hospital,
    name: "EMR Core",
    sub: "Nuronix Core",
    intro: "The heart of Nuronix — a complete Electronic Medical Record system.",
    list: [
      "Patient registration and unique health ID",
      "Complete clinical history",
      "IPD and OPD management",
      "Bed and ward management",
      "Nursing notes and care plans",
      "Surgical and procedure records",
      "Discharge summary generation",
      "Referral management",
    ],
  },
  {
    icon: Bot,
    name: "Clinical Intelligence",
    sub: "Nuronix AI · Coming Soon",
    intro: "The next frontier of Nepali healthcare.",
    list: [
      "AI-powered diagnosis suggestion engine",
      "Readmission risk prediction",
      "Automated HMIS reporting to government portals",
      "Pattern detection for disease outbreaks",
      "Smart appointment scheduling optimization",
      "Natural language clinical note generation",
    ],
  },
];

function NuronixPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-gradient text-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 right-0 h-[28rem] w-[28rem] rounded-full bg-brand-electric/30 blur-3xl animate-float-slow" />
          <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 md:px-6 py-20 md:py-28 relative text-center max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium backdrop-blur">
            Open Source · WHO Standard · Nepal's First
          </span>
          <h1 className="mt-5 text-4xl md:text-6xl font-extrabold leading-tight">
            Nuronix — Nepal's First WHO-Standard Electronic Medical Record System
          </h1>
          <p className="mt-5 text-lg text-white/85 max-w-3xl mx-auto">
            An open-source, web-based HMIS and EMR platform designed specifically for Nepal's
            healthcare system. Nuronix brings clinical workflows, patient records, and hospital
            operations under one intelligent roof.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-white text-brand-royal px-6 py-3.5 font-semibold hover:bg-brand-soft transition"
            >
              Request a Demo <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#modules"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/70 text-white px-6 py-3.5 font-semibold hover:bg-white/10 transition"
            >
              View Documentation
            </a>
          </div>

          {/* Hero mock */}
          <div className="mt-14 relative max-w-3xl mx-auto">
            <div className="absolute -inset-6 bg-brand-electric/30 blur-3xl rounded-full" />
            <div className="relative rounded-2xl bg-white text-foreground shadow-elegant p-4 text-left">
              <div className="flex gap-2 mb-3">
                {["Dashboard", "Patients", "OPD", "Lab", "Pharmacy", "Reports"].map((t, i) => (
                  <span
                    key={t}
                    className={`text-xs px-3 py-1.5 rounded-md ${i === 0 ? "bg-brand-royal text-white" : "bg-muted text-muted-foreground"}`}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-3">
                {["Active OPD", "Inpatients", "Lab Pending", "Revenue (NPR)"].map((l, i) => (
                  <div key={l} className="rounded-lg border p-3">
                    <p className="text-[10px] text-muted-foreground">{l}</p>
                    <p className="font-extrabold text-brand-deep mt-1">
                      {["142", "38", "21", "1.2L"][i]}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-3 rounded-lg bg-brand-soft border p-3 h-24 flex items-end gap-1">
                {[35, 60, 45, 75, 55, 85, 70, 92, 60, 78].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-brand-royal to-brand-electric rounded-sm"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <SectionHeader
              center={false}
              eyebrow="What is Nuronix?"
              title="Built for Nepal. Built to WHO Standard."
            />
            <div className="space-y-4 text-muted-foreground text-lg">
              <p>
                Nuronix is Growfund's open-source Electronic Medical Record (EMR) and Hospital
                Management Information System (HMIS), developed in full compliance with the World
                Health Organization's (WHO) standards for health informatics.
              </p>
              <p>
                It is Nepal's first truly customizable, community-driven EMR — built to address the
                specific clinical, administrative, and regulatory needs of Nepali healthcare
                facilities.
              </p>
              <p>
                Whether you run a 10-bed clinic in Pokhara or a 500-bed tertiary hospital in
                Kathmandu, Nuronix adapts to your workflow — not the other way around.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border bg-brand-soft-gradient p-8 shadow-soft">
            <h3 className="font-display font-bold text-brand-deep text-xl mb-5">Key Facts</h3>
            <dl className="space-y-4">
              {[
                ["📋 Type", "EMR + HMIS"],
                ["🌐 Deployment", "Web-based"],
                ["🔓 License", "Open Source"],
                ["🏛️ Standard", "WHO HMIS Framework"],
                ["🇳🇵 Origin", "Made in Nepal"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex justify-between gap-4 pb-3 border-b border-brand-royal/10 last:border-0"
                >
                  <dt className="font-semibold text-brand-deep">{k}</dt>
                  <dd className="text-muted-foreground text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* Core Features Tabs */}
      <Section variant="soft">
        <SectionHeader eyebrow="Core Features" title="Engineered for Trust at Every Layer" />
        <Tabs defaultValue="web" className="max-w-5xl mx-auto">
          <TabsList className="grid grid-cols-3 w-full max-w-2xl mx-auto h-auto p-1.5 bg-white border shadow-soft">
            {Object.entries(features).map(([key, f]) => (
              <TabsTrigger
                key={key}
                value={key}
                className="py-3 text-sm font-semibold text-muted-foreground
  data-[state=active]:bg-brand-royal
  data-[state=active]:text-white
  data-[state=active]:shadow-md
  rounded-md transition"
              >
                {f.title.split(" ")[0]}
              </TabsTrigger>
            ))}
          </TabsList>
          {Object.entries(features).map(([key, f]) => (
            <TabsContent key={key} value={key} className="mt-8">
              <div className="rounded-2xl bg-card border shadow-soft p-8 md:p-10">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-brand-gradient text-white grid place-items-center shrink-0">
                    <f.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-brand-deep">{f.title}</h3>
                    <p className="mt-2 text-muted-foreground">{f.body}</p>
                  </div>
                </div>
                <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                  {f.list.map((x) => (
                    <li key={x} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-brand-royal mt-0.5 shrink-0" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Section>

      {/* Modules */}
      <Section id="modules">
        <SectionHeader
          eyebrow="Module Deep-Dive"
          title="Everything Your Hospital Needs. All in One System."
        />
        <Accordion type="single" collapsible defaultValue="0" className="max-w-4xl mx-auto">
          {modules.map((m, i) => (
            <AccordionItem
              key={m.name}
              value={String(i)}
              className="border rounded-2xl mb-3 px-6 bg-card shadow-soft"
            >
              <AccordionTrigger className="hover:no-underline py-5">
                <div className="flex items-center gap-4 text-left">
                  <div className="h-11 w-11 rounded-xl bg-brand-gradient text-white grid place-items-center shrink-0">
                    <m.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-brand-deep">{m.name}</p>
                    <p className="text-xs text-brand-royal font-semibold">{m.sub}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <p className="text-muted-foreground mb-4">{m.intro}</p>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {m.list.map((x) => (
                    <li key={x} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-brand-royal mt-0.5 shrink-0" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      {/* Who is it for */}
      <Section variant="soft">
        <SectionHeader
          eyebrow="Who Is Nuronix For?"
          title="Designed for Every Corner of Nepal's Healthcare"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            ["🏥", "District Hospitals"],
            ["🩺", "Private Clinics"],
            ["🔬", "Diagnostic Labs"],
            ["💊", "Community Pharmacies"],
            ["🏛️", "Teaching Hospitals"],
            ["🚑", "Polyclinics"],
          ].map(([i, t]) => (
            <div
              key={t}
              className="rounded-2xl border bg-card p-6 shadow-soft text-center hover:shadow-elegant hover:-translate-y-1 transition"
            >
              <div className="text-4xl">{i}</div>
              <p className="mt-3 font-semibold text-brand-deep">{t}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Implementation Journey */}
      <Section>
        <SectionHeader
          eyebrow="Implementation Journey"
          title="From Contract to Go-Live in 14 Days"
        />
        <div className="relative max-w-5xl mx-auto">
          <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-brand-royal/20" />
          <div className="grid md:grid-cols-5 gap-6">
            {[
              ["Discovery Call", "Day 1", "We understand your facility's needs"],
              ["System Setup", "Day 3–5", "Configuration and data migration"],
              ["Staff Training", "Day 7–10", "Comprehensive onboarding"],
              ["Go Live", "Day 14", "Full deployment with monitoring"],
              ["Ongoing Support", "Forever", "Monthly check-ins and updates"],
            ].map(([t, d, body], i) => (
              <div key={t} className="relative text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-brand-gradient text-white grid place-items-center font-bold relative z-10 shadow-soft">
                  {i + 1}
                </div>
                <p className="mt-4 font-bold text-brand-deep">{t}</p>
                <p className="text-xs text-brand-royal font-semibold">{d}</p>
                <p className="mt-1 text-sm text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Pricing */}
      <Section variant="soft">
        <SectionHeader
          eyebrow="Pricing Philosophy"
          title="Free to Start. Scale When You're Ready."
          subtitle="Nuronix Core is free and open source. Enterprise modules, hosting, training, and SLA support are available through transparent pricing plans."
        />
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              n: "Community",
              p: "Free",
              d: "Core EMR · 1 facility · community support",
              f: ["Nuronix Core", "Self-hosted", "Community forum"],
            },
            {
              n: "Professional",
              p: "Contact us",
              d: "All modules · cloud hosting · priority support",
              featured: true,
              f: ["All modules", "Cloud hosting", "Priority support", "Training included"],
            },
            {
              n: "Enterprise",
              p: "Custom",
              d: "Multi-branch · SLA · dedicated team · custom dev",
              f: ["Multi-branch", "SLA & dedicated team", "Custom development", "On-site support"],
            },
          ].map((p) => (
            <div
              key={p.n}
              className={`rounded-2xl p-8 shadow-soft ${p.featured ? "bg-brand-gradient text-white scale-105 shadow-elegant" : "bg-card border"}`}
            >
              <p
                className={`text-sm font-semibold uppercase tracking-wider ${p.featured ? "text-white/80" : "text-brand-royal"}`}
              >
                {p.n}
              </p>
              <p
                className={`mt-3 text-4xl font-extrabold ${p.featured ? "text-white" : "text-brand-deep"}`}
              >
                {p.p}
              </p>
              <p
                className={`mt-2 text-sm ${p.featured ? "text-white/80" : "text-muted-foreground"}`}
              >
                {p.d}
              </p>
              <ul className="mt-6 space-y-2">
                {p.f.map((x) => (
                  <li key={x} className="flex items-center gap-2 text-sm">
                    <Check
                      className={`h-4 w-4 ${p.featured ? "text-white" : "text-brand-royal"}`}
                    />{" "}
                    {x}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className={`mt-6 block text-center rounded-xl px-5 py-3 font-semibold transition ${p.featured ? "bg-white text-brand-royal hover:bg-brand-soft" : "bg-brand-gradient text-white hover:opacity-90"}`}
              >
                Talk to Us
              </Link>
            </div>
          ))}
        </div>
      </Section>

      <CTABanner />
    </>
  );
}
