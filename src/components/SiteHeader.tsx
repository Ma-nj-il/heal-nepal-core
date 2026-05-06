import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { RequestDemoDialog } from "@/components/RequestDemoDialog";
import logo from "../../public/company-logo.png";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/nuronix", label: "Nuronix" },
  { to: "/products", label: "Products" },
  { to: "/career", label: "Career" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full glass border-b border-border/60 transition-all ${
        scrolled ? "shadow-soft h-16 md:h-[68px]" : "h-16 md:h-[72px]"
      }`}
    >
      <div className="container mx-auto h-full px-4 md:px-6 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="Growfund" className="h-50 w-50 object-contain" />
          {/* <span className="font-display font-extrabold text-lg text-brand-deep tracking-tight">
            Growfund
          </span> */}
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="relative px-3 py-2 text-sm font-medium text-foreground/80 hover:text-brand-royal transition-colors data-[status=active]:text-brand-royal data-[status=active]:font-semibold group"
            >
              {item.label}
              <span className="absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-brand-royal scale-x-0 group-data-[status=active]:scale-x-100 transition-transform" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <RequestDemoDialog
            trigger={
              <button className="hidden sm:inline-flex items-center gap-2 rounded-full bg-brand-gradient text-white px-5 py-2.5 text-sm font-semibold shadow-soft hover:shadow-elegant transition">
                Request Demo <ArrowRight className="h-4 w-4" />
              </button>
            }
          />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg border border-border bg-background"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] sm:w-[380px] p-0">
              <div className="flex items-center justify-between p-5 border-b">
                <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
                  <img src={logo} alt="Growfund" className="h-8 w-8" />
                  <span className="font-display font-extrabold text-brand-deep">Growfund</span>
                </Link>
                <button onClick={() => setOpen(false)} aria-label="Close" className="h-9 w-9 grid place-items-center rounded-md hover:bg-muted">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col p-3">
                {NAV.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    activeOptions={{ exact: item.to === "/" }}
                    className="px-4 py-3 rounded-lg text-base font-medium hover:bg-muted data-[status=active]:bg-brand-soft data-[status=active]:text-brand-royal"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient text-white px-5 py-3 text-sm font-semibold"
                >
                  Request Demo <ArrowRight className="h-4 w-4" />
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
