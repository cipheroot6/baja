"use client";

import { motion } from "motion/react";
import { staggerContainer, fadeUpItem, VIEWPORT } from "@/lib/motion-variants";
import SectionHeading from "@/components/SectionHeading";
import { whyJoin } from "@/lib/content";

export default function WhyJoin() {
  return (
    <section id="why-join" className="bg-navy-dark">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-6 sm:py-24">
        <SectionHeading
          dark
          eyebrow="Why Join Us"
          title="Ten Reasons to Race With Abhyuday"
        />

        <motion.ol
          variants={staggerContainer(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-2"
        >
          {whyJoin.map((reason, index) => (
            <motion.li
              key={reason}
              variants={fadeUpItem}
              className="flex items-start gap-4 rounded-xl border border-white/10 bg-navy p-5"
            >
              <span className="font-mono text-2xl font-extrabold text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="pt-1 text-sm leading-relaxed text-white/80 sm:text-base">
                {reason}
              </span>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
