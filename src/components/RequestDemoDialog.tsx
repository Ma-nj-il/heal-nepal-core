import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  org: z.string().trim().min(1, "Organization required").max(150),
  email: z.string().trim().email("Invalid email").max(200),
  phone: z.string().trim().min(7, "Phone required").max(30),
  type: z.string().min(1, "Select facility type"),
  notes: z.string().trim().max(1000).optional(),
});

export function RequestDemoDialog({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? ""),
      org: String(fd.get("org") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      type: String(fd.get("type") ?? ""),
      notes: String(fd.get("notes") ?? ""),
    };
    const r = schema.safeParse(data);
    if (!r.success) {
      toast.error(r.error.issues[0]?.message ?? "Please review the form");
      return;
    }
    setSubmitting(true);
    (async () => {
      const { supabase } = await import("@/integrations/supabase/client");
      const { error } = await supabase.from("demo_requests").insert({
        name: r.data.name,
        organization: r.data.org,
        email: r.data.email,
        phone: r.data.phone,
        facility_type: r.data.type,
        notes: r.data.notes || null,
      });
      setSubmitting(false);
      if (error) {
        toast.error("Could not submit. Please try again.");
        return;
      }
      toast.success("Demo request received! Our team will reach out within 24 hours.");
      setOpen(false);
    })();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden border-0">
        <div className="bg-brand-gradient text-white p-6 relative overflow-hidden">
          <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
          <DialogHeader className="relative">
            <DialogTitle className="text-2xl font-extrabold text-white">Request a Nuronix Demo</DialogTitle>
            <DialogDescription className="text-white/85">
              See Nepal's first WHO-standard EMR live. We'll tailor the walkthrough to your facility.
            </DialogDescription>
          </DialogHeader>
          <div className="relative mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/80">
            {["30-min live demo", "No commitment", "Tailored to your workflow"].map((b) => (
              <span key={b} className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5" /> {b}</span>
            ))}
          </div>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-4 bg-card">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Full Name" name="name" placeholder="Your name" />
            <Input label="Organization" name="org" placeholder="Hospital / Clinic" />
            <Input label="Email" name="email" type="email" placeholder="you@hospital.org" />
            <Input label="Phone" name="phone" placeholder="+977 98XXXXXXXX" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-brand-deep mb-1.5">Facility Type</label>
            <select name="type" defaultValue="" className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-royal/40 focus:border-brand-royal transition">
              <option value="" disabled>Select…</option>
              {["Hospital", "Clinic / Polyclinic", "Diagnostic Lab", "Pharmacy", "Other"].map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-brand-deep mb-1.5">What would you like to see? <span className="text-muted-foreground font-normal">(optional)</span></label>
            <textarea name="notes" rows={3} maxLength={1000} placeholder="EMR, lab module, pharmacy, billing…" className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-royal/40 focus:border-brand-royal transition" />
          </div>
          <button disabled={submitting} type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gradient text-white px-5 py-3 font-semibold shadow-soft hover:shadow-elegant transition disabled:opacity-60">
            {submitting ? "Sending..." : <>Request Demo <ArrowRight className="h-4 w-4" /></>}
          </button>
          <p className="text-xs text-muted-foreground text-center">We typically respond within 24 hours.</p>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Input({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-brand-deep mb-1.5">{label}</label>
      <input type={type} name={name} placeholder={placeholder} maxLength={200} className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-royal/40 focus:border-brand-royal transition" />
    </div>
  );
}
