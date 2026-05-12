import { ArrowUpRight } from "lucide-react";
import { navItems, profile, socialLinks } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="container-page flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <a href="#hero" className="inline-flex items-center gap-3 font-semibold text-white">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-xs font-black text-slate-950">
              ZU
            </span>
            {profile.name}
          </a>
          <p className="mt-2 text-sm text-slate-500">
            © {new Date().getFullYear()} Zahid Uddin. Senior WordPress Developer.
          </p>
        </div>

        <nav className="flex flex-wrap gap-3 text-sm text-slate-400" aria-label="Footer navigation">
          {navItems.slice(1, 6).map((item) => (
            <a key={item.href} href={item.href} className="hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-wrap gap-3 text-sm">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-slate-400 hover:text-white"
            >
              {link.label}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
