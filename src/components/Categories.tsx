"use client";

import { motion, type Variants } from "motion/react";
import SectionHeading from "@/components/SectionHeading";
import { trackContent } from "@/lib/content";
import { useTrack } from "@/lib/track";

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] },
  },
};

export default function Categories() {
  const { track } = useTrack();
  const category = trackContent[track].category;

  return (
    <section id="categories" className="bg-navy-dark">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto max-w-6xl px-6 py-16 sm:px-6 sm:py-24"
      >
        <motion.div variants={item}>
          <SectionHeading
            align="center"
            eyebrow="What We Build"
            title={`The ${track === "abaja" ? "Autonomous" : "Electric"} Machine`}
            subtitle={
              track === "abaja"
                ? "The formula of driverless engineering — an 8km endurance run with only a stack of code in the driver seat."
                : "A race-built 3x4 vehicle packing power and suspension into a machine that never wastes a joule."
            }
          />
        </motion.div>

        <motion.article
          variants={item}
          className="relative mt-12 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8"
        >
          <div
            className={`absolute inset-y-0 left-0 w-1.5 ${
              category.id === "abaja" ? "bg-primary" : "bg-accent"
            }`}
            aria-hidden="true"
          />
          <div className="flex flex-wrap items-center gap-3 pl-2">
            <span
              className={`rounded-full px-4 py-1.5 font-mono text-base font-extrabold tracking-wide ${
                category.id === "abaja"
                  ? "bg-primary/20 text-primary"
                  : "bg-white/20 text-white"
              }`}
            >
              {category.name}
            </span>
            <span className="text-sm font-semibold text-white/60">{category.fullName}</span>
          </div>
          <p className="mt-4 pl-2 text-base leading-relaxed text-white/75 sm:text-lg">
            {category.blurb}
          </p>
          <div className="mt-6 grid gap-4 pl-2 sm:grid-cols-2">
            {category.points.map((point) => (
              <div key={point.label} className="flex flex-col gap-1">
                <span className="font-display text-sm font-bold text-white sm:text-base">
                  {point.label}
                </span>
                <span className="text-sm leading-relaxed text-white/65">{point.body}</span>
              </div>
            ))}
          </div>
        </motion.article>
      </motion.div>
    </section>
  );
}