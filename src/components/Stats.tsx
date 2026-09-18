"use client";

import { motion, type Variants } from "motion/react";
import { useTrack } from "@/lib/track";
import { trackContent } from "@/lib/content";

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] },
  },
};

export default function Stats() {
  const { track } = useTrack();
  const stats = trackContent[track].stats;

  return (
    <section
      id="stats"
      className="border-y border-white/10 bg-navy"
      aria-label={`${track.toUpperCase()} statistics`}/home/flow2win/Projects/sih
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-6 py-14 sm:px-6 lg:grid-cols-4 lg:py-16"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={item}
            className="flex flex-col items-center gap-2 text-center"
          >
            <span className="font-display text-4xl font-extrabold text-primary sm:text-5xl">
              {stat.value}
            </span>
            <span className="max-w-[12rem] text-sm leading-snug text-white/70">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}