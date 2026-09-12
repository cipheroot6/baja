import { siteConfig } from "@/lib/site-config";
import { sections } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-navy-dark">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 sm:px-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-sm">
          <p className="font-display text-base font-extrabold text-white">
            TEAM<span className="text-primary"> ABHYUDAY</span>{" "}
            <span className="text-accent">RACING</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            {siteConfig.college}. aBAJA & eBAJA, building since{" "}
            {siteConfig.founded}.
          </p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-3">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="py-1 text-sm text-white/60 transition-colors hover:text-accent"
            >
              {section.label}
            </a>
          ))}
        </nav>

        <div className="text-sm text-white/50">
          <p className="font-semibold text-white/80">Contact</p>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="mt-2 block break-all transition-colors hover:text-accent"
          >
            {siteConfig.contact.email}
          </a>
          <a
            href={`tel:${siteConfig.contact.phoneRaw}`}
            className="mt-1 block transition-colors hover:text-accent"
          >
            {siteConfig.contact.phoneDisplay}
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-5 sm:px-6">
          <p className="text-center text-xs text-white/40">
            © {year} {siteConfig.name}. All rights reserved. Made with passion
            in Pune.
          </p>
        </div>
      </div>
    </footer>
  );
}