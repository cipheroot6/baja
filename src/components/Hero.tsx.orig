"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";
import { staggerContainer, fadeUpItem } from "@/lib/motion-variants";
import { siteConfig } from "@/lib/site-config";

const Vehicle3D = dynamic(() => import("@/components/Vehicle3D"), { ssr: false });

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative min-h-[100svh] w-full bg-navy-dark overflow-hidden"
    >
      {/* ── 3D Vehicle Canvas ── */}
      <div className="absolute inset-0 z-[1]" aria-label="3D Vehicle Viewport">
        <Vehicle3D modelUrl={siteConfig.model.url} />
      </div>

      {/* ── Subtle Vignettes for text contrast ── */}
      <div
        className="pointer-events-none absolute bottom-0 inset-x-0 z-[2] h-[60vh]"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 40%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Main Content Overlay ── */}
      <div className="pointer-events-none absolute inset-0 z-[10] flex flex-col justify-end p-6 sm:p-12 lg:p-20 pb-12 sm:pb-16 lg:pb-24">
        <motion.div
          variants={staggerContainer(0.12, shouldReduceMotion ? 0 : 0.2)}
          initial="hidden"
          animate="show"
          className="flex flex-col max-w-4xl"
        >
          {/* Tagline */}
          <motion.p
            variants={fadeUpItem}
            className="mb-4 font-mono text-xs sm:text-sm font-bold tracking-[0.24em] text-white/60 uppercase"
          >
            {siteConfig.tagline}
          </motion.p>

          {/* Title */}
          <motion.h1
            variants={fadeUpItem}
            className="font-display font-extrabold tracking-tight text-white"
            style={{ fontSize: "clamp(3.5rem, 8vw, 7.5rem)", lineHeight: 1.05 }}
          >
            Team <span className="text-primary">Abhyuday</span>
            <br />
            Racing
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUpItem}
            className="mt-6 max-w-xl text-sm sm:text-base leading-relaxed text-white/70"
          >
            {siteConfig.college}. Two off-road race vehicles —{" "}
            <span className="font-semibold text-white">self-driving aBAJA</span> &amp;{" "}
            <span className="font-semibold text-white">electric eBAJA</span>.
            Engineered from scratch for BAJA SAEINDIA.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUpItem}
            className="pointer-events-auto mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#apply"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-8 font-mono text-sm font-bold tracking-widest text-black transition-transform hover:scale-105 active:scale-95"
            >
              Join the Team
            </a>

            <a
              href="#about"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/20 bg-transparent px-8 font-mono text-sm font-bold tracking-widest text-white transition-colors hover:bg-white/10"
            >
              Our Story
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
