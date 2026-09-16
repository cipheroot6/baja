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
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] },
  },
};

export default function Skills() {
  const { track } = useTrack();
  const skills = trackContent[track].skills;
  const label = track === "abaja" ? "Autonomous" : "Electric";

  return (
    <section id="skills" className="bg-white">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="mx-auto max-w-6xl px-6 py-16 sm:px-6 sm:py-24"
      >
        <motion.div variants={item}>
          <SectionHeading
            align="center"
            eyebrow="What You'll Learn"
            title="Every Skill the Ecosystem Needs"
            subtitle="We don't care about your CGPA. We care about your passion — we'll teach you the rest."
          />
        </motion.div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {skills.map((group) => (
            <motion.div
              key={`${label}-${group.group}`}
              variants={item}
              className="rounded-2xl border border-navy/10 bg-navy/5 p-6 sm:p-8"
            >
              <h3 className="font-display text-base font-extrabold text-navy sm:text-lg">
                {group.group}
              </h3>
              <p className="mt-2 text-sm font-semibold text-navy/50">
                {label} skills
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-primary/30 bg-white px-4 py-1.5 font-mono text-sm font-medium text-navy"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}