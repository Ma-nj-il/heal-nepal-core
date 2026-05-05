import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowRight, Mail, Phone, MessageCircle, MapPin, Clock, Hospital, Briefcase, Package } from "lucide-react";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Growfund — Get a Demo or Ask a Question" },
      { name: "description", content: "Reach out to Growfund for a product demo, pricing, support, or partnership inquiry." },
      { property: "og:title", content: "Contact Growfund" },
      { property: "og:description", content: "Let's start a conversation." },
    ],
  }),
  component: ContactPage,
});

const provinces = ["Koshi", "Madhesh", "Bagmati", "Gandaki", "Lumbini", "Karnali", "Sudurpashchim"];
const roles = ["Hospital / Clinic", "Lab / Diagnostic Center", "Pharmacy", "Developer / Partner", "Government Body", "Other"];
const subjects = ["Request a Demo", "Pricing Inquiry", "Technical Support", "Partnership", "Career", "General Inquiry"];

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  org: z.string().trim().min(1, "Organization required").max(150),
  email: z.string().trim().email("Invalid email").max(200),
  phone: z.string().trim().min(7, "Phone required").max(30),
  province: z.string().min(1, "Select a province"),
  role: z.string().min(1, "Select a role"),
  subject: z.string().min(1, "Select a subject"),
  message: z.string().trim().min(10, "Message too short").max(2000),
  agree: z.literal(true, { message: "Please agree to continue" }),
});

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = {
      name: String(fd.get("name") ?? ""),
      org: String(fd.get("org") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      province: String(fd.get("province") ?? ""),
      role: String(fd.get("role") ?? ""),
      subject: String(fd.get("subject") ?? ""),
      message: String(fd.get("message") ?? ""),
      agree: fd.get("agree") === "on",
    };
    const r = schema.safeParse(data);
    if (!r.success) {
      toast.error(r.error.issues[0]?.message ?? "Please review the form");
      return;
    }
    setSubmitting(true);
    (async () => {
      const { supabase } = await import("@/integrations/supabase/client");
      const { error } = await supabase.from("contact_submissions").insert({
        name: r.data.name,
        organization: r.data.org,
        email: r.data.email,
        phone: r.data.phone,
        province: r.data.province,
        role: r.data.role,
        subject: r.data.subject,
        message: r.data.message,
      });
      setSubmitting(false);
      if (error) {
        toast.error("Could not send. Please try again.");
        return;
      }
      toast.success("Message sent! We'll respond within 24 hours.");
      form.reset();
    })();
  }

  return (
    <>
      <section className="relative overflow-hidden bg-brand-gradient text-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-brand-electric/30 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-20 relative text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Let's Start a Conversation</h1>
          <p className="mt-4 text-lg text-white/85">
            Whether you're a hospital looking to go digital, a developer wanting to contribute, or a partner — we'd love to hear from you.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Form */}
          <form onSubmit={onSubmit} className="lg:col-span-3 rounded-3xl border bg-card p-8 md:p-10 shadow-soft space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Full Name" name="name" placeholder="Your name" />
              <Field label="Organization / Hospital" name="org" placeholder="e.g. Patan Hospital" />
              <Field label="Email Address" name="email" type="email" placeholder="you@hospital.org" />
              <Field label="Phone Number" name="phone" placeholder="+977 98XXXXXXXX" />
              <Select label="Province / District" name="province" options={provinces} />
              <Select label="I am a..." name="role" options={roles} />
            </div>
            <Select label="Subject" name="subject" options={subjects} />
            <div>
              <label className="block text-sm font-semibold text-brand-deep mb-1.5">Message</label>
              <textarea name="message" rows={5} placeholder="Tell us about your facility, what you're looking for, or just say hi..." maxLength={2000}
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-royal/40 focus:border-brand-royal transition" />
            </div>
            <label className="flex items-start gap-3 text-sm text-muted-foreground cursor-pointer">
              <input type="checkbox" name="agree" className="mt-1 h-4 w-4 rounded border-input accent-brand-royal" />
              I agree to Growfund's privacy policy and consent to being contacted about my inquiry.
            </label>
            <button disabled={submitting} type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gradient text-white px-6 py-3.5 font-semibold shadow-soft hover:shadow-elegant transition disabled:opacity-60">
              {submitting ? "Sending..." : <>Send Message <ArrowRight className="h-4 w-4" /></>}
            </button>
            <p className="text-xs text-muted-foreground text-center">We typically respond within 24 hours.</p>
          </form>

          {/* Info */}
          <div className="lg:col-span-2 space-y-5">
            <div className="rounded-2xl border bg-brand-soft-gradient p-7 shadow-soft">
              <h3 className="font-display font-bold text-brand-deep text-lg mb-4">Get in Touch</h3>
              <ul className="space-y-4 text-sm">
                <Info icon={MapPin} label="Office" value="Budhanilkantha-11,Kathmandu, Nepal" />
                <Info icon={Mail} label="Email" value="admin@growfund.com.np" />
                <Info icon={Phone} label="Phone" value="+977- 9745875081" />
                <Info icon={MessageCircle} label="WhatsApp" value="Support available" />
                <Info icon={Clock} label="Office Hours" value="Sun–Fri, 9 AM – 6 PM (NST)" />
              </ul>
            </div>

            <div className="rounded-2xl bg-brand-gradient text-white p-6 h-48 grid place-items-center shadow-soft relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent_60%)]" />
              <div className="relative text-center">
                <MapPin className="h-8 w-8 mx-auto mb-2" />
                <p className="font-semibold">Map — Kathmandu Office</p>
                <p className="text-xs text-white/70 mt-1">Embedded map coming soon</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                [Hospital, "For Hospitals", "/nuronix"],
                [Briefcase, "Join Our Team", "/career"],
                [Package, "All Products", "/products"],
              ].map(([Icon, t, href]) => {
                const I = Icon as typeof Hospital;
                return (
                  <Link key={t as string} to={href as string} className="rounded-xl border bg-card p-4 text-center shadow-soft hover:shadow-elegant hover:-translate-y-0.5 transition">
                    <I className="h-5 w-5 mx-auto text-brand-royal" />
                    <p className="mt-2 text-xs font-semibold text-brand-deep">{t as string}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-brand-deep mb-1.5">{label}</label>
      <input type={type} name={name} placeholder={placeholder} maxLength={200}
        className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-royal/40 focus:border-brand-royal transition" />
    </div>
  );
}

function Select({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-brand-deep mb-1.5">{label}</label>
      <select name={name} defaultValue=""
        className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-royal/40 focus:border-brand-royal transition">
        <option value="" disabled>Select…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function Info({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return (
    <li className="flex items-start gap-3">
      <div className="h-9 w-9 shrink-0 rounded-lg bg-white grid place-items-center text-brand-royal shadow-soft">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider text-brand-royal font-semibold">{label}</p>
        <p className="font-semibold text-brand-deep">{value}</p>
      </div>
    </li>
  );
}
