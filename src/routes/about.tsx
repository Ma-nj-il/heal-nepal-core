import { createFileRoute } from "@tanstack/react-router";
import { Code2, Hospital, Bot, Globe } from "lucide-react";
import { Section, SectionHeader } from "@/components/Section";
import { CTABanner } from "@/components/CTABanner";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Growfund — Our Mission, Vision & Team" },
      { name: "description", content: "Learn about Growfund's mission to revolutionize Nepal's healthcare with world-class digital health technology." },
      { property: "og:title", content: "About Growfund" },
      { property: "og:description", content: "Technology built in Nepal. Built for Nepal." },
    ],
  }),
  component: AboutPage,
});

const timeline = [
  { date: "Early 2024", emoji: "🌱", title: "A Napkin, a Problem, and a Promise", sub: "The Founding Moment", body: "Two engineers sat in a Kathmandu café watching a hospital receptionist dig through three physical registers just to find a patient's last visit date. That five-minute search became Growfund's entire reason for existing. That same week, the company was registered and the first lines of Nuronix were written — on a personal laptop, in a rented room in Lalitpur." },
  { date: "Mid 2024", emoji: "💡", title: "Building in the Dark", sub: "6 Months of Pure Development", body: "No clients. No revenue. Just building. The founding team spent six intense months talking to doctors, nurses, lab technicians, and pharmacists across Kathmandu Valley — sitting in OPDs, watching workflows, mapping every paper form that slowed patient care. Every conversation shaped Nuronix." },
  { date: "Late 2024", emoji: "🔬", title: "The First Patient. The First Real Test.", sub: "First Live Deployment", body: "Nuronix went live at its first partner facility — a clinic in Patan. The very first patient record was entered on a Tuesday morning. The team celebrated with momo that evening and barely slept. That clinic has not touched paper since." },
  { date: "Early 2025", emoji: "🚀", title: "Word Travels Fast in Healthcare", sub: "Growing Without a Marketing Budget", body: "Growfund never ran a single ad. The next three facilities came entirely through word of mouth — a doctor who saw Nuronix at a colleague's clinic, a hospital administrator who heard about it at a medical conference in Pokhara. Within months, Nuronix was live across multiple facilities in Kathmandu, Pokhara, and Chitwan." },
  { date: "Mid 2025", emoji: "🏛️", title: "Built to WHO Standard", sub: "HMIS Framework Alignment Achieved", body: "After rigorous internal auditing and clinical validation with partner facilities, Nuronix was formally aligned with the World Health Organization's HMIS framework — making it the only Nepali-built EMR to meet this benchmark." },
  { date: "Now & Beyond", emoji: "🔭", title: "The Operating System for Every Hospital in Nepal", sub: "One Year In. Just Getting Started.", body: "Our roadmap for the next 12 months includes Nuronix AI clinical intelligence, telemedicine integration, Nepali-language voice input for clinical notes, and direct API connections to Nepal's national health insurance system." },
];

function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-gradient text-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-white/10 blur-3xl animate-float-slow" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-brand-electric/30 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 md:px-6 py-20 md:py-28 relative text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">About Growfund</h1>
          <p className="mt-5 text-lg text-white/85">Technology built in Nepal. Built for Nepal.</p>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <SectionHeader center={false} eyebrow="Who We Are" title="A Nepali Health-Tech Company on a Mission" />
            <div className="text-muted-foreground space-y-4">
              <p>Growfund is a Nepali health-technology company founded with a singular mission: to bring world-class digital health infrastructure to Nepal's healthcare system. We are not a foreign solution imposed on a local problem — we are a team of Nepali technologists, clinicians, and public health advocates who understand, firsthand, the challenges Nepal's hospitals and health workers face every day.</p>
              <p>We build open, interoperable, standards-compliant health software that any facility — from a rural health post to a multi-specialty tertiary hospital — can deploy, customize, and own. Our flagship product, Nuronix, is Nepal's first WHO-standard Electronic Medical Record system, and it represents the foundation of everything we are building.</p>
              <p>Founded in 2024, Growfund has grown from a small team of four to a diverse organization spanning engineering, clinical informatics, design, and customer success — with clients across all seven provinces of Nepal.</p>
            </div>
          </div>
          <div className="rounded-2xl bg-brand-soft-gradient border p-7 shadow-soft self-start">
            <div className="space-y-5">
              {[
                ["Founded", "2024"],
                ["Team Size", "20+ across Nepal"],
                ["Provinces Served", "All 7"],
                ["Facilities Onboarded", "50+"],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="text-xs uppercase tracking-wider text-brand-royal font-semibold">{k}</p>
                  <p className="text-2xl font-extrabold text-brand-deep">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section variant="soft">
        <SectionHeader eyebrow="What We Do" title="We Build Digital Health Infrastructure" />
        <div className="grid sm:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {[
            [Code2, "Software Development", "We design and build open-source EMR, HMIS, and clinical management systems specifically engineered for Nepal's regulatory and clinical environment."],
            [Hospital, "Hospital Implementation", "We partner with healthcare facilities to deploy, configure, train, and maintain our systems — ensuring adoption, not just installation."],
            [Bot, "Clinical AI Research", "We are investing in the next generation of AI-powered clinical decision support tools, built on Nepali patient data and clinical workflows."],
            [Globe, "Open Source Advocacy", "We publish our core platform under open-source licenses and contribute to global health informatics communities, including WHO digital health working groups."],
          ].map(([Icon, t, b]) => {
            const I = Icon as typeof Code2;
            return (
              <div key={t as string} className="rounded-2xl border bg-card p-7 shadow-soft hover:shadow-elegant transition">
                <div className="h-12 w-12 rounded-xl bg-brand-gradient text-white grid place-items-center"><I className="h-6 w-6" /></div>
                <h3 className="mt-4 text-xl font-bold text-brand-deep">{t as string}</h3>
                <p className="mt-2 text-muted-foreground">{b as string}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Why Choose Us" title="What Makes Growfund Different" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            ["🇳🇵", "Nepal-Born, Nepal-Focused", "We understand your workflows, billing requirements, and government reporting obligations. We're not translating a foreign product — we're building native."],
            ["🔓", "True Open Source", "Nuronix Core will always be free and open source. We believe health infrastructure belongs to everyone."],
            ["🏛️", "WHO Compliant", "Every module we build is aligned with WHO health informatics standards — international-grade software with local implementation."],
            ["🚀", "Rapid Deployment", "Our average deployment time is 14 days. From contract signing to go-live in two weeks — with full staff training included."],
            ["🤝", "Long-Term Partnership", "We don't disappear after go-live. Our customer success team provides monthly check-ins, updates, and continuous improvement."],
            ["📊", "Data Sovereignty", "Your patient data stays yours. We offer both cloud and on-premise deployment options so you maintain full control."],
          ].map(([i, t, d]) => (
            <div key={t} className="rounded-2xl border bg-card p-6 shadow-soft hover:shadow-elegant transition">
              <div className="text-4xl">{i}</div>
              <p className="mt-3 font-bold text-brand-deep text-lg">{t}</p>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section variant="deep">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur">
            <p className="text-xs uppercase tracking-widest text-brand-electric font-semibold">Mission</p>
            <p className="mt-4 text-lg text-white/90 leading-relaxed">
              "To democratize access to world-class health information technology for every healthcare facility in Nepal — from the most remote health post in the Himalayas to the largest hospital in Kathmandu."
            </p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur">
            <p className="text-xs uppercase tracking-widest text-brand-electric font-semibold">Vision</p>
            <p className="mt-4 text-lg text-white/90 leading-relaxed">
              "A Nepal where every patient encounter is recorded, every clinical decision is informed by complete data, and every health institution operates with the efficiency and quality of the world's best health systems."
            </p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur">
            <p className="text-xs uppercase tracking-widest text-brand-electric font-semibold">Our Values</p>
            <ul className="mt-4 space-y-2 text-white/90 text-sm">
              <li>🌱 <strong>Impact First</strong> — Every line of code must serve patient care</li>
              <li>🔍 <strong>Transparency</strong> — Open source, open processes</li>
              <li>🤝 <strong>Equity</strong> — Technology that works for all</li>
              <li>🏆 <strong>Excellence</strong> — WHO-standard quality</li>
              <li>🇳🇵 <strong>Pride</strong> — Built in Nepal, for Nepal</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section variant="soft">
        <SectionHeader eyebrow="Leadership" title="The People Building Growfund" />
        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            ["Co-Founder", "CEO"],
            ["Co-Founder", "CTO"],
            ["Clinical Lead", "Chief Clinical Informatics Officer"],
          ].map(([n, t]) => (
            <div key={t} className="rounded-2xl border bg-card p-6 text-center shadow-soft">
              <div className="mx-auto h-24 w-24 rounded-full bg-brand-gradient grid place-items-center text-white text-3xl font-extrabold">
                {n[0]}
              </div>
              <p className="mt-4 font-bold text-brand-deep">{n}</p>
              <p className="text-sm text-brand-royal">{t}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Timeline */}
      <Section>
        <SectionHeader eyebrow="Our Journey" title="From a Napkin Sketch to a National Platform" />
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-royal via-brand-electric to-brand-royal/30 md:-translate-x-1/2" />
          <div className="space-y-10">
            {timeline.map((m, i) => {
              const left = i % 2 === 0;
              return (
                <div key={m.title} className={`relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-10 items-center`}>
                  <div className={`hidden md:block ${left ? "" : "md:order-2"}`} />
                  <div className={`absolute left-4 md:left-1/2 -translate-x-1/2 h-9 w-9 rounded-full bg-brand-gradient text-white grid place-items-center shadow-elegant text-lg`}>
                    {m.emoji}
                  </div>
                  <div className={`rounded-2xl border bg-card p-6 shadow-soft hover:shadow-elegant transition ${left ? "md:text-right md:mr-6" : "md:ml-6"}`}>
                    <span className="inline-block rounded-full bg-brand-gradient text-white px-3 py-1 text-xs font-bold">{m.date}</span>
                    <h3 className="mt-3 text-xl font-extrabold text-brand-deep">{m.title}</h3>
                    <p className="text-sm text-brand-royal italic">{m.sub}</p>
                    <p className="mt-3 text-muted-foreground">{m.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      <CTABanner />
    </>
  );
}
