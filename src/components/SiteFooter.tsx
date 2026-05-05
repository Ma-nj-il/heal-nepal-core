import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Twitter, Facebook, Heart } from "lucide-react";
import logo from "/logo-growfund.png?url";

export function SiteFooter() {
  return (
    <footer className="bg-brand-deep text-white/85">
      <div className="container mx-auto px-4 md:px-6 py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src={logo} alt="Growfund" className="h-10 w-10 bg-white rounded-md p-1" />
            <span className="font-display font-extrabold text-xl text-white">Growfund</span>
          </div>
          <p className="text-sm text-white/70 max-w-xs">
            Powering Nepal's Digital Health Revolution.
          </p>
          <div className="flex items-center gap-3 mt-5">
            {[Linkedin, Github, Twitter, Facebook].map((Icon, i) => (
              <a key={i} href="#" aria-label="social" className="h-9 w-9 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 transition">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <FooterCol title="Products" links={[
          ["Nuronix Core", "/nuronix"],
          ["Nuronix Care", "/products"],
          ["Nuronix Rx", "/products"],
          ["Nuronix Labs", "/products"],
          ["Nuronix AI", "/products"],
        ]} />

        <FooterCol title="Company" links={[
          ["About Us", "/about"],
          ["Career", "/career"],
          ["Contact", "/contact"],
          ["Blog", "/about"],
        ]} />

        <FooterCol title="Resources" links={[
          ["Documentation", "/nuronix"],
          ["Open Source", "/about"],
          ["Privacy Policy", "/about"],
          ["Terms of Service", "/about"],
        ]} />
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <p>© 2025 Growfund Pvt. Ltd. All rights reserved. · Kathmandu, Nepal</p>
          <p className="flex items-center gap-1.5">
            Built with <Heart className="h-3.5 w-3.5 text-red-400 fill-red-400" /> for Nepal's healthcare
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">{title}</h4>
      <ul className="space-y-2.5">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link to={href} className="text-sm text-white/70 hover:text-white transition">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
