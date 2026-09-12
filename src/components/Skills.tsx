import SectionHeading from "@/components/SectionHeading";
import { skillGroups } from "@/lib/content";

export default function Skills() {
  return (
    <section id="skills" className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-6 sm:py-24">
        <SectionHeading
          align="center"
          eyebrow="What You'll Learn"
          title="20+ Skills. Zero Experience Required."
          subtitle="We don't care about your CGPA. We care about your passion — we'll teach you the rest."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div
              key={group.group}
              className="rounded-2xl border border-navy/10 bg-navy/5 p-6 sm:p-8"
            >
              <h3 className="font-display text-base font-extrabold text-navy sm:text-lg">
                {group.group}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-primary/30 bg-white px-4 py-1.5 font-mono text-sm font-medium text-navy"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}