import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import logo from "../../public/company-logo.jpeg";

const socialLinks = [
  {
    label: "LinkedIn",
    Icon: LinkedInIcon,
    url:"https://www.linkedin.com/company/107913754/admin/dashboard/",
  },
  {
    label: "Twitter",
    Icon: TwitterIcon,
    url: "https://twitter.com/growfund",
  },
  {
    label: "Facebook",
    Icon: FacebookIcon,
    url: "https://facebook.com/growfund",
  },
] as const;

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
            {socialLinks.map(({ label, Icon, url }) => (
              <a key={label} href={url} aria-label={label} className="h-9 w-9 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 transition">
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
        <div className="container mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row items-center justify-center gap-3 text-xs text-white/60">
          <p>© 2025 Growfund Pvt. Ltd. All rights reserved. · Kathmandu, Nepal</p>
        </div>
      </div>
    </footer>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M6.94 6.5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.5 8.75h3v11h-3v-11ZM9.5 8.75h2.88v1.5h.04c.4-.76 1.39-1.56 2.86-1.56 3.06 0 3.62 2.01 3.62 4.62v6.44h-3v-5.71c0-1.36-.02-3.1-1.89-3.1-1.9 0-2.19 1.49-2.19 3.01v5.8h-3v-11Z" />
    </svg>
  );
}


function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.9 2.25h3.68l-8.04 9.2 9.47 12.3h-7.4l-5.81-7.58-6.6 7.58H.52l8.6-9.85L0 2.25h7.59l5.28 6.91 6.03-6.91Zm-1.3 19.33h2.04L6.48 4.34H4.29l13.3 17.24Z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M13.5 22v-8.5h2.85l.43-3.31H13.5V8.06c0-.96.27-1.62 1.67-1.62h1.78V3.47c-.31-.04-1.36-.12-2.58-.12-2.55 0-4.3 1.56-4.3 4.42v2.42H7.25v3.31h2.82V22h3.43Z" />
    </svg>
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
