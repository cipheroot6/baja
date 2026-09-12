import SectionHeading from "@/components/SectionHeading";
import { departments } from "@/lib/content";

export default function Departments() {
  return (
    <section id="departments" className="bg-navy">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-6 sm:py-24">
        <SectionHeading
          dark
          align="center"
          eyebrow="Find Your Team"
          title="Six Departments. One Finish Line."
          subtitle="Every department matters equally — the trophy needs all of them."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((department) => (
            <article
              key={department.name}
              className="group rounded-2xl border border-white/10 bg-navy-light/60 p-6 transition-colors hover:border-accent/50"
            >
              <p className="font-mono text-xs font-bold tracking-[0.2em] text-accent uppercase">
                {department.role}
              </p>
              <h3 className="mt-2 font-display text-lg font-bold text-white">
                {department.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                {department.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}