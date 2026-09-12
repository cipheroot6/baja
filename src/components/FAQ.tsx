"use client";

import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import { faqs } from "@/lib/content";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-navy">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-6 sm:py-24">
        <SectionHeading
          dark
          align="center"
          eyebrow="FAQ"
          title="Questions? Answered."
        />

        <div className="mt-12 space-y-3">
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            return (
              <div
                key={faq.q}
                className={`overflow-hidden rounded-xl border transition-colors ${
                  open ? "border-primary/50 bg-navy-light" : "border-white/10 bg-navy-dark"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(open ? null : index)}
                  aria-expanded={open}
                  aria-controls={`faq-panel-${index}`}
                  id={`faq-button-${index}`}
                  className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
                >
                  <span className="text-base font-semibold text-white sm:text-lg">
                    {faq.q}
                  </span>
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className={`h-5 w-5 shrink-0 text-accent transition-transform duration-200 ${
                      open ? "rotate-45" : ""
                    }`}
                  >
                    <path d="M5 10h10M10 5v10" />
                  </svg>
                </button>
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-button-${index}`}
                  className={`grid transition-all duration-200 ease-out ${
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-white/70 sm:px-6 sm:text-base">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}