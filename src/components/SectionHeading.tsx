"use client";

import { motion } from "motion/react";
import { staggerContainer, fadeUpItem, VIEWPORT } from "@/lib/motion-variants";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  dark = false,
  align = "left",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <motion.div
      variants={staggerContainer(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}
    >
      <motion.p
        variants={fadeUpItem}
        className="font-mono text-xs font-bold tracking-[0.25em] text-primary uppercase sm:text-sm"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        variants={fadeUpItem}
        className={`mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-white`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUpItem}
          className={`mt-4 text-base leading-relaxed sm:text-lg text-white/70`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
