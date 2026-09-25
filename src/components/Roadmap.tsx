"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  EASE,
  staggerContainer,
  fadeUpItem,
  VIEWPORT,
} from "@/lib/motion-variants";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import SectionHeading from "@/components/SectionHeading";
import { roadmap } from "@/lib/content";

export default function Roadmap() {
  const lastIndex = roadmap.length - 1;
  const listRef = useRef<HTMLOListElement>(null);
  const lineInView = useInView(listRef, { once: true, amount: 0.15 });
  const { reduced } = usePrefersReducedMotion();

  return (
    <section id="roadmap" className="bg-navy-dark">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-6 sm:py-24">
        <SectionHeading
          align="center"
          eyebrow="Road to BAJA 2027"
          title="From Freshman to Finish Line"
        />

        <motion.ol
          ref={listRef}
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="relative mt-14 ml-4 border-l-2 border-primary/30 sm:ml-6"
        >
          <motion.span
            aria-hidden="true"
            className="absolute top-0 left-0 h-full w-[2px] origin-top bg-gradient-to-b from-primary to-accent"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: reduced || lineInView ? 1 : 0 }}
            transition={
              reduced
                ? { duration: 0 }
                : { duration: 1.2, ease: EASE }
            }
          />
          {roadmap.map((phase, index) => (
            <motion.li
              key={phase.title}
              variants={fadeUpItem}
              className="relative pb-10 pl-8 sm:pl-10"
            >
              <span
                className={`absolute top-0 left-0 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-primary bg-navy-dark ${
                  index === lastIndex
                    ? "bg-primary shadow-lg shadow-primary/40"
                    : ""
                }`}
              />
              <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-5">
                <span className="font-mono text-sm font-bold whitespace-nowrap text-primary">
                  {phase.period}
                </span>
                <h3 className="font-display text-lg font-bold text-white">
                  {phase.title}
                </h3>
              </div>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
                {phase.body}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
