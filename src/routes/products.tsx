import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Hospital, Stethoscope, Pill, FlaskConical, Bot } from "lucide-react";
import { Section, SectionHeader } from "@/components/Section";
import { CTABanner } from "@/components/CTABanner";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Growfund Product Suite — EMR, Clinic, Pharmacy, Lab & AI" },
      { name: "description", content: "Five integrated health management modules for Nepal's complete healthcare ecosystem." },
      { property: "og:title", content: "The Growfund Product Suite" },
      { property: "og:description", content: "Five specialized solutions. One unified healthcare operating system." },
    ],
  }),
  component: ProductsPage,
});

const products = [
  {
    icon: Hospital, name: "Nuronix Core", tag: "EMR",
    line: "The Foundation of Modern Patient Care",
    target: "Hospitals · Polyclinics · Teaching Hospitals",
    f: ["Patient registration & unique health ID", "IPD / OPD management", "Clinical notes & SOAP templates", "E-prescriptions", "Discharge summary generation", "Bed & ward management", "Internal & external referrals", "HMIS reports"],
  },
  {
    icon: Stethoscope, name: "Nuronix Care", tag: "Clinic",
    line: "Smarter Clinics Start Here",
    target: "Private clinics · Specialist practices · Health posts",
    f: ["Online & walk-in appointments", "Digital queue display", "Consultation workflow", "Billing & invoicing", "Follow-up reminders", "Patient history", "Multi-doctor support", "Telemedicine-ready"],
  },
  {
    icon: Pill, name: "Nuronix Rx", tag: "Pharmacy",
    line: "Pharmacy Intelligence, Simplified",
    target: "Hospital pharmacies · Retail pharmacies · Community dispensaries",
    f: ["Inventory control with alerts", "Prescription integration", "Expiry & batch tracking", "Drug interaction alerts", "GST / VAT billing", "Supplier management", "Purchase orders", "Sales analytics"],
  },
  {
    icon: FlaskConical, name: "Nuronix Labs", tag: "Lab",
    line: "From Test Order to Report — All Digital",
    target: "Diagnostic centers · Hospital labs · Pathology labs",
    f: ["Test order integration", "Technician workflow", "Auto result flagging", "Report printing & PDF", "Specimen tracking", "LIS integration", "Radiology module", "Multi-lab support"],
  },
  {
    icon: Bot, name: "Nuronix AI", tag: "Intelligence · Coming Soon",
    line: "The Smart Layer Across Everything",
    target: "Hospital admins · Clinical leads · Government health agencies",
    f: ["Predictive readmission risk", "Disease pattern detection", "Auto HMIS reporting", "AI diagnosis suggestions", "Smart scheduling", "Performance dashboards", "Outbreak alerts", "NLP clinical notes"],
    soon: true,
  },
];

function ProductsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-gradient text-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-electric/30 blur-3xl animate-float-slow" />
        </div>
        <div className="container mx-auto px-4 md:px-6 py-20 md:py-28 relative text-center max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium backdrop-blur">
            5 Modules · 1 Platform
          </span>
          <h1 className="mt-5 text-4xl md:text-6xl font-extrabold leading-tight">The Growfund Product Suite</h1>
          <p className="mt-5 text-lg text-white/85">
            Five specialized solutions. One unified healthcare operating system.
          </p>
        </div>
      </section>

      <Section>
        <div className="space-y-10">
          {products.map((p, i) => (
            <div key={p.name} className={`grid lg:grid-cols-12 gap-8 items-center rounded-3xl border bg-card p-8 md:p-10 shadow-soft hover:shadow-elegant transition ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div className="lg:col-span-5">
                <div className="aspect-square max-w-sm mx-auto rounded-3xl bg-brand-gradient p-10 grid place-items-center relative overflow-hidden shadow-elegant">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25),transparent_60%)]" />
                  <div className="relative text-center text-white">
                    <div className="inline-grid h-20 w-20 place-items-center rounded-2xl bg-white/15 backdrop-blur mb-4">
                      <p.icon className="h-10 w-10" />
                    </div>
                    <p className="text-xs uppercase tracking-widest text-white/70">{p.tag}</p>
                    <p className="mt-1 text-2xl font-extrabold">{p.name}</p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7">
                {p.soon && <span className="inline-block mb-3 rounded-full bg-amber-100 text-amber-700 px-3 py-1 text-xs font-semibold">Coming Soon</span>}
                <h2 className="text-2xl md:text-3xl font-extrabold text-brand-deep">{p.name}</h2>
                <p className="mt-1 text-brand-royal font-semibold italic">"{p.line}"</p>
                <p className="mt-3 text-sm text-muted-foreground"><strong className="text-brand-deep">Target:</strong> {p.target}</p>
                <ul className="mt-5 grid sm:grid-cols-2 gap-2.5">
                  {p.f.map((x) => (
                    <li key={x} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-brand-royal mt-0.5 shrink-0" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-gradient text-white px-5 py-2.5 text-sm font-semibold">
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Comparison */}
      <Section variant="soft">
        <SectionHeader eyebrow="Compare" title="One Platform · Many Strengths" />
        <div className="overflow-x-auto rounded-2xl border bg-card shadow-soft">
          <table className="w-full text-sm min-w-[700px]">
            <thead className="bg-brand-soft">
              <tr>
                <th className="text-left p-4 font-semibold text-brand-deep">Capability</th>
                {products.map((p) => (
                  <th key={p.name} className="p-4 font-semibold text-brand-deep text-center">{p.name.replace("Nuronix ", "")}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Web-based", [true, true, true, true, true]],
                ["Open Source", [true, true, true, true, false]],
                ["WHO Compliant", [true, true, true, true, true]],
                ["Cloud Hosting", [true, true, true, true, true]],
                ["API Access", [true, true, true, true, true]],
                ["AI Features", [false, false, false, false, true]],
                ["Custom Workflows", [true, true, true, true, true]],
              ].map(([row, vals]) => (
                <tr key={row as string} className="border-t">
                  <td className="p-4 font-medium text-brand-deep">{row as string}</td>
                  {(vals as boolean[]).map((v, i) => (
                    <td key={i} className="p-4 text-center">
                      {v ? <Check className="inline h-5 w-5 text-brand-royal" /> : <span className="text-muted-foreground">—</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Integrations */}
      <Section>
        <SectionHeader eyebrow="Integrations" title="Nuronix Connects With Your World" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {["Nepal HIS", "Insurance Board of Nepal", "Nepal Medical Council", "HL7 / FHIR", "REST API"].map((x) => (
            <div key={x} className="rounded-xl border bg-card px-4 py-6 text-center text-sm font-semibold text-brand-deep shadow-soft hover:shadow-elegant transition">
              {x}
            </div>
          ))}
        </div>
      </Section>

      <CTABanner />
    </>
  );
}
