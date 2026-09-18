"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { siteConfig } from "@/lib/site-config";

const ITEMS = [
  siteConfig.tagline,
  "aBAJA · eBAJA",
  "Design · Fabricate · Test · Race",
  `Building since ${siteConfig.founded}`,
  "BAJA SAEINDIA",
];

export default function Marquee() {
  const { loop } = usePrefersReducedMotion();

  const content = ITEMS.map((item, index) => (
    <span
      key={index}
      className="flex items-center gap-8 font-mono text-sm font-bold tracking-[0.25em] whitespace-nowrap text-white/40 uppercase"
    >
      {item}
      <span className="text-primary">✦</span>
    </span>
  ));

  if (!loop) {
    return (
      <div
        className="flex flex-wrap justify-center gap-8 overflow-hidden border-y border-white/10 bg-navy px-6 py-3"
        aria-hidden="true"
      >
        {content}
      </div>
    );
  }

  return (
    <div
      className="overflow-hidden border-y border-white/10 bg-navy py-3"
      aria-hidden="true"
    >
      <motion.div
        className="flex w-max items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
      >
        <div className="flex shrink-0 items-center gap-8 pr-8">{content}</div>
        <div className="flex shrink-0 items-center gap-8 pr-8">{content}</div>
      </motion.div>
    </div>
  );
}