"use client";

import { motion } from "motion/react";
import { staggerContainer, fadeUpItem, VIEWPORT } from "@/lib/motion-variants";
import SectionHeading from "@/components/SectionHeading";
import { aboutPoints } from "@/lib/content";

export default function About() {
  return (
    <section id="about" className="bg-white">
      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:gap-20"
      >
        <motion.div variants={fadeUpItem} className="space-y-5 self-center">
          <SectionHeading
            eyebrow="Who We Are"
            title="Engineering Excellence, Driven by Students"
          />
          <p className="text-base leading-relaxed text-navy/75 sm:text-lg">
            Team Abhyuday Racing is a student-led team at GHRCEM Pune building
            electric (eBAJA) and autonomous (aBAJA) all-terrain vehicles. We
            combine innovation, sustainability and teamwork to create
            high-performance EVs and AVs — from powertrains to perception
            systems.
          </p>
          <p className="text-base leading-relaxed text-navy/75 sm:text-lg">
            Through hands-on design, fabrication and testing, we bridge the gap
            between theory and real-world application, preparing the next
            generation of automotive engineers. No experience needed — we train
            you.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUpItem}
          className="flex flex-col justify-center gap-4"
          role="list"
        >
          {aboutPoints.map((point) => (
            <div
              key={point.title}
              className="rounded-2xl border border-navy/10 bg-navy/5 p-6"
              role="listitem"
            >
              <h3 className="font-display text-lg font-bold text-navy sm:text-xl">
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-navy/70 sm:text-base">
                {point.body}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
