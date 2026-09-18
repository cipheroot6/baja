"use client";

import { motion } from "motion/react";
import { staggerContainer, fadeUpItem, VIEWPORT } from "@/lib/motion-variants";
import SectionHeading from "@/components/SectionHeading";
import { journey2026, journey2027 } from "@/lib/content";

export default function Journey() {
  return (
    <section id="journey" className="bg-navy-dark">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-6 sm:py-24">
        <SectionHeading
          dark
          eyebrow="Our Track Record"
          title={journey2026.headline}
          subtitle={journey2026.summary}
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4"
        >
          {journey2026.metrics.map((metric) => (
            <motion.div
              key={metric.label}
              variants={fadeUpItem}
              className="rounded-2xl border border-white/10 bg-navy p-5 sm:p-7"
            >
              <p className="font-mono text-3xl font-extrabold text-accent sm:text-4xl">
                {metric.score}
              </p>
              <p className="mt-2 font-display text-sm font-bold text-white sm:text-base">
                {metric.label}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-white/60 sm:text-sm">
                {metric.note}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUpItem}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-8 flex flex-col gap-5 rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/15 to-accent/10 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
        >
          <div>
            <h3 className="font-display text-xl font-extrabold text-white sm:text-2xl">
              {journey2027.headline}: {journey2027.score}
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
              {journey2027.note}
            </p>
          </div>
          <a
            href="#apply"
            className="inline-flex h-13 min-h-13 items-center justify-center rounded-xl bg-primary px-7 text-base font-bold text-white shadow-lg shadow-primary/25 transition-transform active:scale-[0.98] sm:h-14 sm:self-center"
          >
            Join the 2027 Run
          </a>
        </motion.div>
      </div>
    </section>
  );
}
