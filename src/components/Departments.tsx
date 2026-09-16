"use client";

import { motion, type Variants } from "motion/react";
import SectionHeading from "@/components/SectionHeading";
import { trackContent } from "@/lib/content";
import { useTrack } from "@/lib/track";

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24, rotateX: -6 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] },
  },
};

export default function Departments() {
  const { track } = useTrack();
  const departments = trackContent[track].departments;
  const label = track === "abaja" ? "Autonomous" : "Electric";

  return (
    <section id="departments" className="bg-navy">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="mx-auto max-w-6xl px-6 py-16 sm:px-6 sm:py-24"
      >
        <motion.div variants={item}>
          <SectionHeading
            dark
            align="center"
            eyebrow={`${label} Teams`}
            title="Six Departments. One Finish Line."
            subtitle="Every department matters equally — the trophy needs all of them."
          />
        </motion.div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((department) => (
            <motion.article
              key={department.name}
              variants={item}
              className="group rounded-2xl border border-white/10 bg-navy-light/60 p-6 transition-colors hover:border-accent/50"
            >
              <p className="font-mono text-xs font-bold tracking-[0.2em] text-accent uppercase">
                {department.role}
              </p>
              <h3 className="mt-2 font-display text-lg font-bold text-white">
                {department.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{department.body}</p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}