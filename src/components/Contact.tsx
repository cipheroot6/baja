"use client";

import { motion } from "motion/react";
import { staggerContainer, fadeUpItem, VIEWPORT } from "@/lib/motion-variants";
import SectionHeading from "@/components/SectionHeading";
import { siteConfig } from "@/lib/site-config";

const CONTACTS = [
  {
    label: "Email",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    label: "WhatsApp",
    value: "Chat with the team",
    href: siteConfig.contact.whatsapp,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-navy-dark">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-6 sm:py-24">
        <SectionHeading
          dark
          align="center"
          eyebrow="Let's Connect"
          title="Your Journey Starts Here"
          subtitle="Questions, collaborations, sponsorship — we want to hear from you."
        />

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-12 grid gap-4 sm:grid-cols-2"
        >
          {CONTACTS.map((contact) => (
            <motion.a
              key={contact.label}
              href={contact.href}
              variants={fadeUpItem}
              className="flex min-h-28 flex-col justify-center gap-1 rounded-2xl border border-white/10 bg-navy p-6 text-center transition-colors hover:border-accent/50"
            >
              <span className="font-mono text-xs font-bold tracking-[0.2em] text-accent uppercase">
                {contact.label}
              </span>
              <span className="mt-1 text-base font-semibold break-all text-white sm:text-lg">
                {contact.value}
              </span>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {[
            {
              label: "Instagram",
              href: siteConfig.socials.instagram,
            },
            {
              label: "LinkedIn",
              href: siteConfig.socials.linkedin,
            },
            {
              label: "Facebook",
              href: siteConfig.socials.facebook,
            },
            {
              label: "YouTube",
              href: siteConfig.socials.youtube,
            },
          ].map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUpItem}
              className="flex h-12 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-semibold text-white/80 transition-colors hover:border-primary hover:text-primary"
            >
              {social.label}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
