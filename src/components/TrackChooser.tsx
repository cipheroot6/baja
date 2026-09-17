"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useTrack, type Track } from "@/lib/track";

interface CardContent {
  id: Track;
  code: string;
  name: string;
  promised: string;
  blurb: string;
  accent: boolean;
}

const CARDS: CardContent[] = [
  {
    id: "abaja",
    code: "aBAJA",
    name: "Autonomous",
    promised: "Teach a machine to race itself.",
    blurb:
      "Perception, AI and drive-by-wire. Build the stack that steers, sees and decides — with zero humans in the loop.",
    accent: true,
  },
  {
    id: "ebaja",
    code: "eBAJA",
    name: "Electric",
    promised: "Build a race-ready electric brute.",
    blurb:
      "Powertrain, high-voltage safety and hard dynamics. Engineer a machine that swallows the toughest terrain.",
    accent: false,
  },
];

function TiltCard({ card, onSelect }: { card: CardContent; onSelect: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const { track } = useTrack();
  const active = track === card.id;

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const spring = { type: "spring" as const, stiffness: 260, damping: 22 };
  const smoothX = useSpring(rotateX, spring);
  const smoothY = useSpring(rotateY, spring);

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 16);
    rotateX.set(-(py - 0.5) * 16);
    glowX.set(px * 100);
    glowY.set(py * 100);
  };

  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div style={{ perspective: 1200 }} className="group relative">
      <motion.button
        ref={ref}
        role="radio"
        aria-checked={active}
        aria-label={`Choose ${card.code}`}
        onClick={onSelect}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: smoothX, rotateY: smoothY, transformStyle: "preserve-3d" }}
        className={`relative w-full overflow-hidden rounded-3xl border-2 p-7 text-left shadow-xl transition-colors sm:p-9 ${
          active
            ? card.accent
              ? "border-primary bg-navy-light/40"
              : "border-accent bg-navy-light/40"
            : "border-white/10 bg-white/5 hover:bg-white/10"
        }`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(240px circle at ${
              (glowX.get() / 100) * 100
            }% ${(glowY.get() / 100) * 100}%, ${
              card.accent ? "rgba(255,107,0,0.18)" : "rgba(0,212,255,0.18)"
            }, transparent 70%)`,
          }}
          aria-hidden="true"
        />

        <div className="relative flex items-center justify-between">
          <span
            className={`rounded-full px-4 py-1.5 font-mono text-base font-extrabold tracking-wide ${
              card.accent ? "bg-primary text-white" : "bg-accent text-navy"
            }`}
          >
            {card.code}
          </span>
          {active && (
            <span className="flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1 text-xs font-bold text-white/85">
              <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden="true" />
              Active track
            </span>
          )}
        </div>

        <h3 className="mt-5 font-display text-2xl font-extrabold text-white sm:text-3xl">
          {card.name}
        </h3>
        <p className="mt-1 font-display text-sm font-semibold text-white/70 sm:text-base">
          {card.promised}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base">
          {card.blurb}
        </p>

        <span
          className={`mt-6 inline-flex h-12 items-center justify-center rounded-xl px-6 text-sm font-bold transition-transform ${
            card.accent ? "bg-primary text-white" : "bg-accent text-navy"
          }`}
        >
          {active ? "Viewing" : `Enter ${card.code}`}
        </span>
      </motion.button>
    </motion.div>
  );
}

export default function TrackChooser() {
  const { setTrack } = useTrack();

  return (
    <section id="track" className="border-b border-white/10 bg-navy-dark">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-6 sm:py-24">
        <p className="text-center font-mono text-xs font-bold tracking-[0.25em] text-primary uppercase sm:text-sm">
          Choose Your Machine
        </p>
        <h2 className="mx-auto mt-3 max-w-2xl text-center font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Which world do you want to enter?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-base leading-relaxed text-white/60 sm:text-lg">
          Choose Your Machine
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2" role="radiogroup" aria-label="Competition track">
          {CARDS.map((card) => (
            <TiltCard key={card.id} card={card} onSelect={() => setTrack(card.id)} />
          ))}
        </div>
      </div>
    </section>
  );
}