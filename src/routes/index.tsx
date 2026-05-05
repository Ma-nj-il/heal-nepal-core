import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, ShieldCheck, Cloud, Globe, Lock, Phone, RefreshCw, Hospital, Stethoscope, Pill, FlaskConical, Bot, FileText, Database, Network } from "lucide-react";
import { Section, SectionHeader } from "@/components/Section";
import { DashboardMockup } from "@/components/DashboardMockup";
import { CTABanner } from "@/components/CTABanner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Growfund — Nepal's Digital Health Technology Company" },
      { name: "description", content: "Makers of Nuronix, Nepal's first WHO-standard open-source EMR. Built for hospitals, clinics, labs, and pharmacies." },
      { property: "og:title", content: "Growfund — Powering Nepal's Digital Health Revolution" },
      { property: "og:description", content: "Nepal's first WHO-standard open-source EMR. Trusted by 50+ healthcare facilities." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-gradient text-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-white/10 blur-3xl animate-float-slow" />
          <div className="absolute top-40 -right-20 h-80 w-80 rounded-full bg-brand-electric/40 blur-3xl animate-float" />
          <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_50%)]" />
        </div>
        <div className="container mx-auto px-4 md:px-6 py-20 md:py-28 relative">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 animate-fade-in-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium backdrop-blur">
                🇳🇵 Made in Nepal · WHO Certified
              </span>
              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.05]">
                Nuronix — The Operating System for Modern Hospitals.
              </h1>
              <p className="mt-6 text-lg text-white/85 max-w-2xl">
                Nepal's first WHO-standard open-source EMR — built for hospitals, clinics, labs, and pharmacies. Fully customizable. Cloud-ready. Trusted by healthcare providers nationwide.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/nuronix" className="inline-flex items-center gap-2 rounded-xl bg-white text-brand-royal px-6 py-3.5 font-semibold hover:bg-brand-soft transition shadow-elegant">
                  Explore Nuronix <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl border-2 border-white/70 text-white px-6 py-3.5 font-semibold hover:bg-white/10 transition">
                  Request a Demo
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
                {["WHO Standard", "Open Source", "Nepal's First EMR", "HMIS Compliant"].map((b) => (
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

      {/* Stats */}
      <section className="bg-brand-deep text-white">
        <div className="container mx-auto px-4 md:px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            ["50+", "Healthcare Facilities Onboarded"],
            ["1M+", "Patient Records Managed"],
            ["99.9%", "System Uptime"],
            ["24/7", "Support Available"],
          ].map(([n, l]) => (
            <div key={l}>
              <p className="text-3xl md:text-5xl font-extrabold text-gradient-brand bg-gradient-to-r from-white to-brand-electric bg-clip-text text-transparent">{n}</p>
              <p className="mt-1 text-xs md:text-sm text-white/70">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Problem */}
      <Section variant="soft">
        <SectionHeader
          eyebrow="The Problem"
          title="Healthcare in Nepal Deserves Better Technology"
          subtitle="Three challenges that hold back patient care across the country — and what we're solving."
        />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "🗂️", title: "Paper-based chaos", body: "Thousands of Nepali hospitals still rely on paper records, leading to lost patient data, medication errors, and diagnostic delays." },
            { icon: "🔒", title: "Data insecurity", body: "Patient health records scattered across notebooks and Excel sheets are vulnerable, unaudited, and impossible to share across departments." },
            { icon: "🌐", title: "No digital interoperability", body: "Labs, pharmacies, and clinics operate in silos — no unified system means duplicated effort and fragmented care." },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border bg-card p-7 shadow-soft hover:shadow-elegant transition">
              <div className="text-4xl">{c.icon}</div>
              <h3 className="mt-4 text-xl font-semibold text-brand-deep">{c.title}</h3>
              <p className="mt-2 text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Introducing Nuronix */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft text-brand-royal border border-brand-royal/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
              Nepal's First · WHO Standard EMR
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-brand-deep">
              One Platform. Every Department.
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Nuronix is Growfund's flagship open-source Electronic Medical Record (EMR) system, built in alignment with WHO Health Management Information System (HMIS) standards. It brings Nepal's healthcare ecosystem into the digital age — giving hospitals, clinics, laboratories, and pharmacies a single, unified, intelligent platform.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Web-based — accessible from any browser, anywhere",
                "Fully customizable for Nepal's healthcare workflows",
                "Built on open-source — no vendor lock-in",
                "Bilingual support (Nepali + English)",
                "Offline-capable with sync",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-1 h-5 w-5 rounded-full bg-brand-soft grid place-items-center shrink-0">
                    <Check className="h-3 w-3 text-brand-royal" />
                  </span>
                  <span className="text-foreground">{b}</span>
                </li>
              ))}
            </ul>
            <Link to="/nuronix" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-gradient text-white px-6 py-3 font-semibold shadow-soft hover:shadow-elegant transition">
              Discover Nuronix <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-brand-gradient p-10 flex items-center justify-center shadow-elegant relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.2),transparent_60%)]" />
              <div className="relative text-center">
                <div className="inline-grid place-items-center h-20 w-20 rounded-2xl bg-white/15 backdrop-blur mb-6">
                  <Hospital className="h-10 w-10 text-white" />
                </div>
                <p className="text-white/70 text-xs font-semibold uppercase tracking-widest">Powered by</p>
                <p className="font-display font-extrabold text-white text-6xl md:text-7xl mt-2">Nuronix</p>
                <p className="text-white/80 mt-3">The Hospital Operating System</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Product Suite */}
      <Section variant="soft">
        <SectionHeader
          eyebrow="Product Suite"
          title="The Complete Growfund Suite"
          subtitle="Purpose-built modules that work independently or as one unified hospital OS."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Hospital, name: "Nuronix Core", desc: "Full EMR platform — patient records, clinical notes, prescriptions, diagnoses." },
            { icon: Stethoscope, name: "Nuronix Care", desc: "Clinic management — appointments, queue, consultation, billing." },
            { icon: Pill, name: "Nuronix Rx", desc: "Pharmacy management — dispensing, inventory, drug interaction alerts." },
            { icon: FlaskConical, name: "Nuronix Labs", desc: "Laboratory management — test orders, results, LIS integration." },
            { icon: Bot, name: "Nuronix AI", desc: "Clinical intelligence — predictive analytics, diagnosis support, reporting." },
          ].map(({ icon: Icon, name, desc }) => (
            <div key={name} className="rounded-2xl border bg-card p-7 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition group">
              <div className="h-12 w-12 rounded-xl bg-brand-gradient text-white grid place-items-center shadow-soft">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-brand-deep">{name}</h3>
              <p className="mt-2 text-muted-foreground">{desc}</p>
              <Link to="/products" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-royal group-hover:gap-2 transition-all">
                Learn More <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* Why Choose */}
      <Section variant="deep">
        <SectionHeader
          light
          eyebrow="Why Growfund"
          title="Built for Nepal. Ready for the World."
          subtitle="Standards-grade engineering, local context, and enterprise reliability."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: Globe, t: "WHO & HMIS Compliant" },
            { icon: ShieldCheck, t: "100% Open Source Core" },
            { icon: Cloud, t: "Cloud + On-Premise Flexible" },
            { icon: Lock, t: "End-to-End Encrypted" },
            { icon: Phone, t: "Local Support Team" },
            { icon: RefreshCw, t: "Seamless Data Migration" },
          ].map(({ icon: Icon, t }) => (
            <div key={t} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur hover:bg-white/10 transition">
              <div className="h-11 w-11 rounded-xl bg-brand-electric/20 text-brand-electric grid place-items-center">
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-4 font-semibold text-white">{t}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section variant="soft">
        <SectionHeader eyebrow="Testimonials" title="Trusted by Nepal's Healthcare Leaders" />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { q: "Before Nuronix, finding a patient's old record meant 20 minutes of searching. Now it's two clicks. Our OPD has never been faster.", n: "Dr. Anjana Bhattarai", r: "Medical Director, Kathmandu" },
            { q: "Nuronix Labs cut our report turnaround time by half. Doctors get results the moment we sign off — no more lost slips.", n: "Suresh Lama", r: "Lab Manager, Pokhara" },
            { q: "Stock-outs used to cost us patients. With Nuronix Rx, expiry alerts and reorder points just work. We finally have control.", n: "Manisha Thapa", r: "Pharmacy Head, Chitwan" },
          ].map((t) => (
            <div key={t.n} className="rounded-2xl bg-card border p-7 shadow-soft">
              <div className="text-4xl text-brand-electric leading-none">"</div>
              <p className="mt-2 text-foreground">{t.q}</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-brand-gradient text-white grid place-items-center font-bold">{t.n[0]}</div>
                <div>
                  <p className="font-semibold text-brand-deep text-sm">{t.n}</p>
                  <p className="text-xs text-muted-foreground">{t.r}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <CTABanner />
    </>
  );
}
