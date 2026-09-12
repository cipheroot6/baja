"use client";

import { useEffect, useState } from "react";
import { sections } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const scrollTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-navy-dark/90 backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <button
          onClick={() => scrollTo("home")}
          className="font-display text-sm font-extrabold tracking-wide text-white sm:text-base"
          aria-label="Back to top"
        >
          TEAM<span className="text-primary"> ABHYUDAY</span>{" "}
          <span className="text-accent">RACING</span>
        </button>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className="text-sm font-medium text-white/75 transition-colors hover:text-accent"
            >
              {section.label}
            </button>
          ))}
          <a
            href={siteConfig.join.formUrl}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
          >
            Apply Now
          </a>
        </nav>

        <button
          onClick={() => setOpen((value) => !value)}
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span
            className={`h-0.5 w-6 bg-white transition-transform ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-white transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-white transition-transform ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          className="flex max-h-[calc(100svh-4rem)] flex-col gap-1 overflow-y-auto border-t border-white/10 bg-navy-dark px-4 pt-3 pb-6 lg:hidden"
          aria-label="Mobile"
        >
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className="flex h-12 items-center rounded-lg px-3 text-left text-base font-medium text-white/85 transition-colors hover:bg-white/5 active:bg-white/10"
            >
              {section.label}
            </button>
          ))}
          <a
            href={siteConfig.join.formUrl}
            className="mt-2 flex h-13 min-h-13 items-center justify-center rounded-xl bg-primary px-5 text-base font-bold text-white"
          >
            Apply Now
          </a>
        </nav>
      )}
    </header>
  );
}