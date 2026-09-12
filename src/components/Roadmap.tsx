import SectionHeading from "@/components/SectionHeading";
import { roadmap } from "@/lib/content";

export default function Roadmap() {
  const lastIndex = roadmap.length - 1;
  return (
    <section id="roadmap" className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-6 sm:py-24">
        <SectionHeading
          align="center"
          eyebrow="Road to BAJA 2027"
          title="From Freshman to Finish Line"
        />

        <ol className="relative mt-14 ml-4 border-l-2 border-primary/30 sm:ml-6">
          {roadmap.map((phase, index) => (
            <li
              key={phase.title}
              className="relative pb-10 pl-8 sm:pl-10"
            >
              <span
                className={`absolute top-0 left-0 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-primary bg-white ${
                  index === lastIndex ? "bg-primary shadow-lg shadow-primary/40" : ""
                }`}
              />
              <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-5">
                <span className="font-mono text-sm font-bold whitespace-nowrap text-primary">
                  {phase.period}
                </span>
                <h3 className="font-display text-lg font-bold text-navy">
                  {phase.title}
                </h3>
              </div>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-navy/70 sm:text-base">
                {phase.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}