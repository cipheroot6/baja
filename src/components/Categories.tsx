import SectionHeading from "@/components/SectionHeading";
import { categories } from "@/lib/content";

export default function Categories() {
  return (
    <section id="categories" className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-6 sm:py-24">
        <SectionHeading
          align="center"
          eyebrow="What We Build"
          title="Two Vehicles. One Team."
          subtitle="Pick the machine that fires you up — or work across both."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {categories.map((category) => (
            <article
              key={category.id}
              className="flex flex-col rounded-3xl border border-navy/10 p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-4 py-1.5 font-mono text-base font-extrabold tracking-wide ${
                    category.id === "abaja"
                      ? "bg-primary-soft text-primary-dark"
                      : "bg-accent-soft text-navy"
                  }`}
                >
                  {category.name}
                </span>
                <span className="text-sm font-semibold text-navy/60">
                  {category.fullName}
                </span>
              </div>
              <p className="mt-4 text-base leading-relaxed text-navy/75 sm:text-lg">
                {category.blurb}
              </p>
              <ul className="mt-6 space-y-4">
                {category.points.map((point) => (
                  <li key={point.label} className="flex flex-col gap-1">
                    <span className="font-display text-sm font-bold text-navy sm:text-base">
                      {point.label}
                    </span>
                    <span className="text-sm leading-relaxed text-navy/65">
                      {point.body}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}