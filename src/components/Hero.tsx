"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

const Vehicle3D = dynamic(() => import("@/components/Vehicle3D"), {
  ssr: false,
  loading: () => (
    <div
      className="flex h-full w-full items-center justify-center bg-navy"
      aria-label="Loading 3D model"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
    </div>
  ),
});

const CATEGORIES = [
  { code: "aBAJA", label: "Autonomous", accent: true },
  { code: "eBAJA", label: "Electric", accent: false },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="grid min-h-[100svh] bg-navy-dark md:grid-cols-2"
    >
      <div className="relative h-[48svh] md:h-full" aria-hidden="true">
        {siteConfig.heroImage ? (
          <div className="relative h-full w-full overflow-hidden bg-navy-dark">
            <Image
              src={siteConfig.heroImage}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              preload
              className="object-contain object-center"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-dark/60 via-transparent to-navy-dark/40 md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-navy-dark/60" />
          </div>
        ) : (
          <Vehicle3D modelUrl={siteConfig.model.url} />
        )}
      </div>

      <div className="flex flex-col justify-center gap-6 px-6 py-12 sm:px-10 md:px-14 md:py-20 lg:px-16">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <span
              key={category.code}
              className={`rounded-full border px-4 py-1.5 font-mono text-xs font-semibold tracking-widest uppercase ${
                category.accent
                  ? "border-primary text-primary"
                  : "border-accent text-accent"
              }`}
            >
              {category.code} · {category.label}
            </span>
          ))}
        </div>

        <h1 className="font-display text-5xl leading-[0.95] font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
          Team
          <span className="mt-1 block text-primary">Abhyuday</span>
          <span className="block text-accent">Racing</span>
        </h1>

        <p className="max-w-md text-lg font-medium text-white/90 sm:text-2xl">
          {siteConfig.tagline}
        </p>
        <p className="max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
          {siteConfig.college}. Two vehicles — one self-driving{" "}
          <span className="text-primary">aBAJA</span>, one electric{" "}
          <span className="text-accent">eBAJA</span>. We design, build and race
          them at BAJA SAEINDIA.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={siteConfig.join.formUrl}
            className="flex h-14 items-center justify-center rounded-xl bg-primary px-8 text-base font-bold text-white shadow-lg shadow-primary/25 transition-transform active:scale-[0.98] sm:px-10"
          >
            Apply Now
          </a>
          <a
            href="#about"
            className="flex h-14 items-center justify-center rounded-xl border border-white/20 px-8 text-base font-semibold text-white transition-colors hover:border-accent hover:text-accent"
          >
            Discover Our Story
          </a>
        </div>
      </div>
    </section>
  );
}