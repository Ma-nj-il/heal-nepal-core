import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function CTABanner() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-brand-gradient p-10 md:p-16 text-center shadow-elegant">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#3D9BE9]/40 blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white">
              Ready to Bring Nuronix to Your Hospital?
            </h2>
            <p className="mt-4 text-white/85 text-lg max-w-2xl mx-auto">
              Join 50+ healthcare facilities already running on Growfund's platform.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl bg-white text-brand-royal px-6 py-3 font-semibold hover:bg-brand-soft transition">
                Request Demo <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/nuronix" className="inline-flex items-center gap-2 rounded-xl border-2 border-white/70 text-white px-6 py-3 font-semibold hover:bg-white/10 transition">
                Explore Nuronix
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
