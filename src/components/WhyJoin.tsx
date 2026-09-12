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

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {whyJoin.map((reason, index) => (
            <li
              key={reason}
              className="flex items-start gap-4 rounded-xl border border-white/10 bg-navy p-5"
            >
              <span className="font-mono text-2xl font-extrabold text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="pt-1 text-sm leading-relaxed text-white/80 sm:text-base">
                {reason}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}