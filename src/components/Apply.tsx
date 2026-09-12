import SectionHeading from "@/components/SectionHeading";
import { applySteps } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export default function Apply() {
  const { formUrl, deadline } = siteConfig.join;

  return (
    <section id="apply" className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-6 sm:py-24">
        <SectionHeading
          align="center"
          eyebrow="Recruitment 2027"
          title="Ready to Race?"
          subtitle={`Applications close ${deadline}. Four steps between you and the garage.`}
        />

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {applySteps.map((step) => (
            <li
              key={step.step}
              className="rounded-2xl border border-navy/10 bg-navy/5 p-6"
            >
              <span className="font-mono text-2xl font-extrabold text-accent">
                {step.step}
              </span>
              <h3 className="mt-2 font-display text-base font-bold text-navy sm:text-lg">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-navy/65">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-12 overflow-hidden rounded-3xl border border-navy/10 bg-navy-dark p-4 sm:p-8">
          <div className="mb-5 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <p className="font-display text-lg font-bold text-white sm:text-xl">
              Team Abhyuday Racing — Recruitment 2027
            </p>
            <span className="rounded-full border border-primary/50 px-4 py-1.5 font-mono text-xs font-semibold tracking-wider text-primary">
              DEADLINE {deadline.toUpperCase()}
            </span>
          </div>

          {formUrl === "#apply" ? (
            <div className="flex min-h-72 flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-white/25 bg-navy px-6 text-center">
              <p className="font-display text-xl font-bold text-white">
                The application form is opening soon.
              </p>
              <p className="max-w-md text-sm leading-relaxed text-white/60">
                We&apos;re finalizing the Google Form link. Meanwhile, save the
                date and follow us on Instagram so you don&apos;t miss the
                announcement.
              </p>
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 text-sm font-bold text-white transition-transform active:scale-[0.98]"
              >
                Follow @teamabhyudayracing
              </a>
            </div>
          ) : (
            <iframe
              src={formUrl}
              title="Team Abhyuday Racing Recruitment Application"
              className="h-[1100px] w-full rounded-2xl bg-white sm:h-[900px]"
            />
          )}
        </div>
      </div>
    </section>
  );
}