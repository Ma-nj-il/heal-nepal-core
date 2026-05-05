import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Mail, Phone, MessageCircle, MapPin } from "lucide-react";
import { Section, SectionHeader } from "@/components/Section";

export const Route = createFileRoute("/career")({
  head: () => ({
    meta: [
      { title: "Careers at Growfund — Build Healthcare Technology in Nepal" },
      { name: "description", content: "Join Nepal's fastest-growing health-tech company. Engineers, designers, and clinicians welcome." },
      { property: "og:title", content: "Careers at Growfund" },
      { property: "og:description", content: "Shape the future of healthcare in Nepal." },
    ],
  }),
  component: CareerPage,
});

function CareerPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-gradient text-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-brand-electric/30 blur-3xl animate-float-slow" />
        </div>
        <div className="container mx-auto px-4 md:px-6 py-20 md:py-28 relative text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">Shape the Future of Healthcare in Nepal</h1>
          <p className="mt-5 text-lg text-white/85">Join Growfund and build technology that saves lives.</p>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader center={false} eyebrow="Working at Growfund" title="Engineers, designers, clinicians — building together." />
            <div className="text-muted-foreground space-y-4">
              <p>At Growfund, we believe that exceptional software can transform healthcare. We're a team of engineers, designers, clinicians, and problem-solvers who wake up every day to make Nepal's healthcare system more humane, more efficient, and more equitable. We work at the intersection of technology and public health — and there's nothing more meaningful than that.</p>
              <p>Our team culture is built on three pillars: radical ownership, empathetic collaboration, and relentless learning. We're not just building products — we're building Nepal's digital health infrastructure.</p>
            </div>
          </div>
          <div className="aspect-square rounded-3xl bg-brand-soft-gradient p-8 grid grid-cols-3 grid-rows-3 gap-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="rounded-xl bg-gradient-to-br from-brand-royal to-brand-electric opacity-90 shadow-soft" style={{ animation: `float ${3 + (i % 3)}s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
        </div>
      </Section>

      <Section variant="soft">
        <SectionHeader eyebrow="Industry-Leading Products" title="Work on Products That Matter" />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            ["Nuronix EMR", "Your code will manage real patient records in real hospitals. That responsibility drives us to write better software."],
            ["Nuronix AI", "Be on the frontier of clinical AI in South Asia. We're building the region's first Nepali-language diagnostic intelligence layer."],
            ["Open Source Impact", "Contribute to WHO-standard open health infrastructure that any hospital in the world can use and build on."],
          ].map(([t, b]) => (
            <div key={t} className="rounded-2xl border bg-card p-7 shadow-soft hover:shadow-elegant transition">
              <h3 className="text-xl font-bold text-brand-deep">{t}</h3>
              <p className="mt-3 text-muted-foreground">{b}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Benefits" title="Benefits & Perks" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            ["🏥", "Health Insurance", "Family covered"],
            ["📚", "Learning Budget", "NPR 50,000/year"],
            ["🏠", "Remote-Friendly", "Flexible working culture"],
            ["🎯", "Performance Bonuses", "Reward what matters"],
            ["🌱", "Equity / ESOP", "For senior roles"],
            ["🤝", "Public Health Impact", "Direct, measurable, real"],
          ].map(([i, t, d]) => (
            <div key={t} className="rounded-2xl border bg-card p-6 shadow-soft hover:shadow-elegant transition">
              <div className="text-4xl">{i}</div>
              <p className="mt-3 font-bold text-brand-deep">{t}</p>
              <p className="text-sm text-muted-foreground mt-1">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section variant="soft">
        <div className="max-w-4xl mx-auto rounded-3xl bg-card border p-10 shadow-soft">
          <h3 className="text-2xl md:text-3xl font-extrabold text-brand-deep">We Believe in Radical Inclusion</h3>
          <div className="mt-4 text-muted-foreground space-y-3">
            <p>Growfund is an equal opportunity employer. We do not discriminate on the basis of caste, ethnicity, gender, religion, disability, age, sexual orientation, or place of origin. Nepal's diversity is our greatest strength, and we are committed to building a team that reflects the communities our products serve.</p>
            <p>We actively encourage applications from women, Dalit communities, indigenous nationalities, and persons with disabilities. We provide reasonable accommodations throughout our hiring process and workplace.</p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Open Positions" title="Join the Team" />
        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {[
            ["Senior Full Stack Engineer", "Engineering · React + Node.js", "Remote, Nepal"],
            ["Clinical Informatics Specialist", "Clinical", "Kathmandu (On-site)"],
            ["Product Designer", "Design · Health UX focus", "Remote / Hybrid"],
            ["Implementation & Training Lead", "Customer Success", "Field-based, Nepal"],
          ].map(([role, dept, loc]) => (
            <div key={role} className="rounded-2xl border bg-card p-6 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition">
              <span className="inline-block rounded-full bg-brand-soft text-brand-royal px-3 py-1 text-xs font-semibold">{loc}</span>
              <h3 className="mt-3 text-lg font-bold text-brand-deep">{role}</h3>
              <p className="text-sm text-muted-foreground">{dept}</p>
              <Link to="/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-royal hover:gap-3 transition-all">
                Apply Now <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </Section>

      <Section variant="soft">
        <SectionHeader eyebrow="Need Help?" title="Questions About Joining Growfund?" />
        <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {[
            [Mail, "Email", "admin@growfund.com.np"],
            [Phone, "Call HR", "+977- 9745875081"],
            [MessageCircle, "WhatsApp", "Quick questions welcome"],
          ].map(([Icon, t, v]) => {
            const I = Icon as typeof Mail;
            return (
              <div key={t as string} className="rounded-2xl border bg-card p-6 text-center shadow-soft">
                <div className="mx-auto h-12 w-12 rounded-xl bg-brand-gradient text-white grid place-items-center">
                  <I className="h-5 w-5" />
                </div>
                <p className="mt-3 font-bold text-brand-deep">{t as string}</p>
                <p className="text-sm text-muted-foreground">{v as string}</p>
              </div>
            );
          })}
        </div>
      </Section>
    </>
  );
}
