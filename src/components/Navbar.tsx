"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { sections } from "@/lib/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const { reduced } = usePrefersReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
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
    <motion.header
      initial={reduced ? {} : { y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={
        reduced
          ? { duration: 0 }
          : { type: "spring", stiffness: 260, damping: 28 }
      }
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 backdrop-blur-sm ${
        scrolled || open
          ? "border-white/10 bg-navy-dark/90"
          : "border-white/5 bg-navy-dark/40"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:px-6">
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
              className={`relative text-sm font-medium transition-colors hover:text-accent ${
                active === section.id ? "text-white" : "text-white/75"
              }`}
            >
              {section.label}
              {active === section.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-0 -bottom-1.5 h-0.5 rounded-full bg-primary"
                />
              )}
            </button>
          ))}
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
          className="flex h-[calc(100svh-4rem)] flex-col items-center justify-center gap-8 overflow-y-auto border-t border-white/10 bg-navy-dark/95 px-4 pb-20 lg:hidden backdrop-blur-md"
          aria-label="Mobile"
        >
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className="text-2xl font-display font-bold tracking-wide text-white transition-colors hover:text-primary active:scale-95"
            >
              {section.label}
            </button>
          ))}
        </nav>
      )}
    </motion.header>
  );
}