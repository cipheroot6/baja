import { stats } from "@/lib/content";

export default function Stats() {
  return (
    <section
      id="stats"
      className="border-y border-white/10 bg-navy"
      aria-label="Team statistics"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-6 py-14 sm:px-6 lg:grid-cols-4 lg:py-16">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-2 text-center">
            <span className="font-display text-4xl font-extrabold text-primary sm:text-5xl">
              {stat.value}
            </span>
            <span className="max-w-[12rem] text-sm leading-snug text-white/70">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}