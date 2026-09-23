"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";
import { staggerContainer, fadeUpItem } from "@/lib/motion-variants";
import { siteConfig } from "@/lib/site-config";

const Vehicle3D  = dynamic(() => import("@/components/Vehicle3D"),  { ssr: false });
const HeroCanvas = dynamic(() => import("@/components/HeroCanvas"), { ssr: false });

/* ── Corner brackets (CAD framing) ── */
function CornerBrackets() {
  const S = 36;
  const W = 1.5;
  const brackets = [
    { cls: "top-5 left-5",     d: `M0 ${S} L0 0 L${S} 0`,       delay: "0s" },
    { cls: "top-5 right-5",    d: `M${S} ${S} L${S} 0 L0 0`,    delay: "0.1s" },
    { cls: "bottom-5 left-5",  d: `M0 0 L0 ${S} L${S} ${S}`,    delay: "0.2s" },
    { cls: "bottom-5 right-5", d: `M${S} 0 L${S} ${S} L0 ${S}`, delay: "0.3s" },
  ];
  return (
    <>
      {brackets.map((b, i) => (
        <svg
          key={i}
          className={`pointer-events-none absolute ${b.cls} z-[6]`}
          width={S + 2} height={S + 2}
          aria-hidden="true"
        >
          <path
            d={b.d}
            fill="none"
            stroke="#ff6b00"
            strokeWidth={W}
            strokeLinecap="square"
            className="bracket-line"
            style={{ animationDelay: b.delay }}
          />
        </svg>
      ))}
    </>
  );
}

/* ── Scan line that sweeps across the hero ── */
function ScanLine() {
  return (
    <div
      className="scan-line pointer-events-none absolute inset-x-0 z-[7] h-px"
      style={{
        background: "linear-gradient(to right, transparent, rgba(255,107,0,0.6) 35%, rgba(0,212,255,0.6) 65%, transparent)",
        boxShadow: "0 0 16px rgba(255,107,0,0.5)",
      }}
      aria-hidden="true"
    />
  );
}

/* ── Faint dot-grid overlay ── */
function GridBg() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] bg-grid opacity-25" aria-hidden="true" />
  );
}

/* ── Radial orange glow behind vehicle ── */
function RadialGlow() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[2]"
      style={{
        background: "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(255,107,0,0.14) 0%, rgba(0,212,255,0.05) 45%, transparent 70%)",
      }}
      aria-hidden="true"
    />
  );
}

/* ── Subtle bottom vignette for text contrast ── */
function Vignettes() {
  return (
    <>
      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute bottom-0 inset-x-0 z-[4] h-64"
        style={{ background: "linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.4) 60%, transparent 100%)" }}
        aria-hidden="true"
      />
      {/* Top fade */}
      <div
        className="pointer-events-none absolute top-0 inset-x-0 z-[4] h-24"
        style={{ background: "linear-gradient(to bottom, rgba(8,8,8,0.7), transparent 100%)" }}
        aria-hidden="true"
      />
    </>
  );
}

/* ── Telemetry Specs Card (bottom-right HUD) ── */
function TelemetryHUD() {
  const telemetry = [
    { label: "CHASSIS", value: "Custom 4130 Chromoly" },
    { label: "CATEGORY", value: "aBAJA & eBAJA" },
    { label: "SERIES", value: "BAJA SAEINDIA 2026" },
    { label: "STATUS", value: "Competition Ready" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
      className="hidden lg:flex flex-col gap-2 rounded-lg border border-white/10 bg-black/60 p-4 backdrop-blur-md shadow-2xl shadow-black/80"
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <span className="font-mono text-[9px] font-bold tracking-[0.25em] text-primary uppercase">
          TELEMETRY // A10
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[9px] text-accent">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          ONLINE
        </span>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-1">
        {telemetry.map((item) => (
          <div key={item.label} className="flex flex-col">
            <span className="font-mono text-[8px] tracking-[0.15em] text-white/40 uppercase">
              {item.label}
            </span>
            <span className="font-mono text-[11px] font-semibold text-white/90">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Bottom Center Hint & Scroll ── */
function CenterHUD() {
  return (
    <div className="pointer-events-none flex flex-col items-center gap-2" aria-hidden="true">
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1 backdrop-blur-sm">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-accent animate-pulse">
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
          <circle cx="8" cy="8" r="2" fill="currentColor" />
        </svg>
        <span className="font-mono text-[9px] tracking-[0.2em] text-white/50 uppercase">
          DRAG TO INSPECT 360°
        </span>
      </div>

      <div className="flex flex-col items-center gap-1 text-white/30">
        <svg width="14" height="20" viewBox="0 0 14 20" fill="none" className="hero-chevron">
          <path d="M7 0 v14" stroke="#ff6b00" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M2 10 L7 15 L12 10" stroke="#ff6b00" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="font-mono text-[7px] tracking-[0.25em] uppercase">SCROLL</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════ */
/*  Main Hero                                      */
/* ═══════════════════════════════════════════════ */
export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative min-h-[100svh] w-full overflow-hidden"
      style={{ background: "#080808" }}
    >
      {/* Z-0: Particle dust */}
      <HeroCanvas className="pointer-events-none absolute inset-0 z-0 h-full w-full" />

      {/* Z-1: Tech Grid */}
      <GridBg />

      {/* Z-2: Ambient Radial Glow */}
      <RadialGlow />

      {/* Z-3: FULL 3D MODEL CANVAS — Always mounted, interactive */}
      <div className="absolute inset-0 z-[3]" aria-label="3D Vehicle Viewport">
        <Vehicle3D modelUrl={siteConfig.model.url} />
      </div>

      {/* Z-4: Vignettes for text contrast */}
      <Vignettes />

      {/* Z-6: CAD Corner Brackets */}
      <CornerBrackets />

      {/* Z-7: Animated Scan Line */}
      <ScanLine />

      {/* ═══════════════════════════════════════════════
          HUD OVERLAY CONTAINER (pointer-events-none)
      ═══════════════════════════════════════════════ */}
      <div className="pointer-events-none absolute inset-0 z-[10] flex flex-col justify-between p-6 sm:p-10 lg:p-12">
        
        {/* ── TOP BAR HUD ── */}
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
            className="flex flex-wrap items-center gap-2.5"
          >
            <span className="rounded-full border border-primary/40 bg-black/60 px-3.5 py-1 font-mono text-[10px] font-bold tracking-widest text-primary uppercase backdrop-blur-md shadow-lg shadow-primary/10">
              aBAJA · Autonomous
            </span>
            <span className="rounded-full border border-accent/40 bg-black/60 px-3.5 py-1 font-mono text-[10px] font-bold tracking-widest text-accent uppercase backdrop-blur-md shadow-lg shadow-accent/10">
              eBAJA · Electric
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
            className="hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3.5 py-1 backdrop-blur-md"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary shadow-[0_0_8px_rgba(255,107,0,0.9)]" />
            <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-white/70 uppercase">
              A10 VEHICLE STUDIO
            </span>
          </motion.div>
        </div>

        {/* ── BOTTOM HUD ROW ── */}
        <div className="flex flex-col lg:flex-row items-end justify-between gap-6 pb-2">
          
          {/* Main Heading & Copy (Bottom Left) */}
          <motion.div
            variants={staggerContainer(0.12, shouldReduceMotion ? 0 : 0.2)}
            initial="hidden"
            animate="show"
            className="flex flex-col max-w-xl"
          >
            {/* Team Title */}
            <motion.h1
              variants={fadeUpItem}
              className="font-display font-extrabold tracking-tight text-white leading-[1.08]"
              style={{ fontSize: "clamp(2.6rem, 5.5vw, 5rem)" }}
            >
              Team
              <span className="mt-1 block neon-orange text-primary">
                Abhyuday
              </span>
              <span className="mt-1 block neon-cyan text-accent">
                Racing
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              variants={fadeUpItem}
              className="mt-3 font-mono text-xs sm:text-sm font-bold tracking-[0.24em] text-white/70 uppercase"
            >
              {siteConfig.tagline}
            </motion.p>

            {/* Description */}
            <motion.p
              variants={fadeUpItem}
              className="mt-2.5 max-w-md text-xs sm:text-sm leading-relaxed text-white/55"
            >
              {siteConfig.college}. Two off-road race vehicles —{" "}
              <span className="font-semibold text-primary">self-driving aBAJA</span> &amp;{" "}
              <span className="font-semibold text-accent">electric eBAJA</span>.
              Engineered from scratch for BAJA SAEINDIA.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUpItem}
              className="pointer-events-auto mt-5 flex flex-wrap items-center gap-3.5"
            >
              <a
                href="#apply"
                className="inline-flex items-center gap-2 rounded-full border border-primary bg-primary px-6 py-2.5 font-mono text-xs font-bold tracking-widest text-white uppercase shadow-lg shadow-primary/30 transition hover:bg-primary-dark hover:shadow-primary/50 focus-visible:outline-2 focus-visible:outline-primary"
              >
                Join the Team
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              <a
                href="#about"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-2.5 font-mono text-xs font-bold tracking-widest text-white/80 uppercase backdrop-blur-sm transition hover:border-white/40 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-white"
              >
                Our Story
              </a>
            </motion.div>
          </motion.div>

          {/* Center Hint & Scroll Indicator */}
          <div className="hidden md:flex mb-2">
            <CenterHUD />
          </div>

          {/* Right Telemetry Card */}
          <div className="pointer-events-auto">
            <TelemetryHUD />
          </div>

        </div>

      </div>
    </section>
  );
}
