"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import {
  getPrefsSnapshot,
  resetPrefs,
  serverPrefs,
  subscribePrefs,
  TRANSITION_OPTIONS,
  writePrefs,
} from "@/lib/preferences";

interface Palette {
  id: string;
  name: string;
  primary: string;
  accent: string;
  base: string;
}

interface FontPair {
  id: string;
  name: string;
  heading: string;
  body: string;
  sample: string;
}

const PALETTES: Palette[] = [
  {
    id: "midnight-gold",
    name: "Midnight Gold",
    primary: "#d4af37",
    accent: "#f0c75e",
    base: "#0a0f2c",
  },
  {
    id: "royal-amethyst",
    name: "Royal Amethyst",
    primary: "#8b5cf6",
    accent: "#f5c05a",
    base: "#150c34",
  },
  {
    id: "emerald-noir",
    name: "Emerald Noir",
    primary: "#10b981",
    accent: "#6ee7b7",
    base: "#041f1a",
  },
  {
    id: "crimson-court",
    name: "Crimson Court",
    primary: "#e11d48",
    accent: "#fb8fa3",
    base: "#1f0510",
  },
  {
    id: "oceanic-steel",
    name: "Oceanic Steel",
    primary: "#2f6fdc",
    accent: "#7eb6ff",
    base: "#081228",
  },
  {
    id: "champagne",
    name: "Champagne",
    primary: "#e4c081",
    accent: "#f9e7bf",
    base: "#14100a",
  },
  {
    id: "ivory-onyx",
    name: "Ivory & Onyx",
    primary: "#e8e4d8",
    accent: "#d4af37",
    base: "#101014",
  },
  {
    id: "sapphire-luxe",
    name: "Sapphire Luxe",
    primary: "#3b6fe0",
    accent: "#9cc3ff",
    base: "#070f26",
  },
  {
    id: "burgundy-velvet",
    name: "Burgundy Velvet",
    primary: "#be123c",
    accent: "#f8a5b8",
    base: "#190409",
  },
  {
    id: "forest-estate",
    name: "Forest Estate",
    primary: "#caa53d",
    accent: "#f6d877",
    base: "#07110a",
  },
  {
    id: "midnight-purple",
    name: "Midnight Purple",
    primary: "#a855f7",
    accent: "#e9d5ff",
    base: "#150b29",
  },
  {
    id: "rose-quartz",
    name: "Rose Quartz",
    primary: "#ec4899",
    accent: "#fbcfe8",
    base: "#210715",
  },
  {
    id: "oxblood-gold",
    name: "Oxblood & Gold",
    primary: "#c08a3e",
    accent: "#dead6f",
    base: "#1a0505",
  },
  {
    id: "mint-lapis",
    name: "Mint & Lapis",
    primary: "#5eead4",
    accent: "#a7c7f4",
    base: "#0a1426",
  },
];

const FONT_PAIRS: FontPair[] = [
  {
    id: "playfair-inter",
    name: "Classic Luxury",
    heading: "var(--font-playfair), Georgia, 'Times New Roman', serif",
    body: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
    sample: "Playfair Display",
  },
  {
    id: "cormorant-jost",
    name: "Editorial",
    heading: "var(--font-cormorant), Georgia, serif",
    body: "var(--font-jost), ui-sans-serif, system-ui, sans-serif",
    sample: "Cormorant Garamond",
  },
  {
    id: "cinzel-manrope",
    name: "Regal",
    heading: "var(--font-cinzel), Georgia, serif",
    body: "var(--font-manrope), ui-sans-serif, system-ui, sans-serif",
    sample: "CINZEL",
  },
  {
    id: "marcellus-open",
    name: "Elegant Clean",
    heading: "var(--font-marcellus), Georgia, serif",
    body: "var(--font-open-sans), ui-sans-serif, system-ui, sans-serif",
    sample: "Marcellus",
  },
  {
    id: "lora-inter",
    name: "Timeless Serif",
    heading: "var(--font-lora), Georgia, serif",
    body: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
    sample: "Lora",
  },
  {
    id: "playfair-manrope",
    name: "Modern Luxe",
    heading: "var(--font-playfair), Georgia, 'Times New Roman', serif",
    body: "var(--font-manrope), ui-sans-serif, system-ui, sans-serif",
    sample: "Playfair Modern",
  },
  {
    id: "cormorant-inter",
    name: "High Fashion",
    heading: "var(--font-cormorant), Georgia, serif",
    body: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
    sample: "Cormorant",
  },
  {
    id: "cinzel-open",
    name: "Aristocratic",
    heading: "var(--font-cinzel), Georgia, serif",
    body: "var(--font-open-sans), ui-sans-serif, system-ui, sans-serif",
    sample: "CINZEL",
  },
  {
    id: "marcellus-manrope",
    name: "Couture",
    heading: "var(--font-marcellus), Georgia, serif",
    body: "var(--font-manrope), ui-sans-serif, system-ui, sans-serif",
    sample: "Marcellus",
  },
  {
    id: "fraunces-grotesk",
    name: "Modern Heritage",
    heading: "var(--font-fraunces), Georgia, serif",
    body: "var(--font-space-grotesk), ui-sans-serif, system-ui, sans-serif",
    sample: "Fraunces",
  },
  {
    id: "bodoni-inter",
    name: "Fashion House",
    heading: "var(--font-bodoni), Georgia, serif",
    body: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
    sample: "Bodoni Moda",
  },
  {
    id: "italiana-sora",
    name: "Minimal Elite",
    heading: "var(--font-italiana), Georgia, serif",
    body: "var(--font-sora), ui-sans-serif, system-ui, sans-serif",
    sample: "ITALIANA",
  },
  {
    id: "fraunces-spectral",
    name: "Editorial Luxe",
    heading: "var(--font-fraunces), Georgia, serif",
    body: "var(--font-spectral), Georgia, serif",
    sample: "Fraunces",
  },
  {
    id: "bodoni-manrope",
    name: "Couture Modern",
    heading: "var(--font-bodoni), Georgia, serif",
    body: "var(--font-manrope), ui-sans-serif, system-ui, sans-serif",
    sample: "Bodoni",
  },
];

function mix(hexA: string, hexB: string, t: number): string {
  const a = [1, 3, 5].map((i) => parseInt(hexA.slice(i, i + 2), 16));
  const b = [1, 3, 5].map((i) => parseInt(hexB.slice(i, i + 2), 16));
  const out = a.map((channel, index) =>
    Math.round(channel + (b[index] - channel) * t).toString(16).padStart(2, "0"),
  );
  return `#${out.join("")}`;
}

export default function ThemeCustomizer() {
  const [open, setOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const { reduced } = usePrefersReducedMotion();

  const prefs = useSyncExternalStore(subscribePrefs, getPrefsSnapshot, serverPrefs);
  const paletteId = prefs.paletteId;
  const fontId = prefs.fontId;
  const transitionId = prefs.transitionId;

  const applyPalette = (id: string) => {
    const palette = PALETTES.find((p) => p.id === id) ?? PALETTES[0];
    const root = document.documentElement;
    root.style.setProperty("--tb-primary", palette.primary);
    root.style.setProperty("--tb-primary-dark", mix(palette.primary, "#000000", 0.28));
    root.style.setProperty("--tb-accent", palette.accent);
    root.style.setProperty("--tb-navy-dark", palette.base);
    root.style.setProperty("--tb-navy", mix(palette.base, "#ffffff", 0.05));
    root.style.setProperty("--tb-navy-light", mix(palette.base, "#ffffff", 0.16));
  };

  const applyFonts = (id: string) => {
    const fonts = FONT_PAIRS.find((f) => f.id === id) ?? FONT_PAIRS[0];
    const root = document.documentElement;
    root.style.setProperty("--tb-font-heading", fonts.heading);
    root.style.setProperty("--tb-font-body", fonts.body);
  };

  useEffect(() => {
    applyPalette(paletteId);
  }, [paletteId]);

  useEffect(() => {
    applyFonts(fontId);
  }, [fontId]);

  const confirm = () => {
    setConfirmed(true);
    setOpen(false);
    window.setTimeout(() => setConfirmed(false), 1600);
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed right-4 bottom-4 z-[60] flex h-14 items-center gap-2 rounded-full bg-primary px-5 text-sm font-bold text-white shadow-2xl shadow-black/50 transition-transform active:scale-95 sm:right-6 sm:bottom-6"
          aria-label="Open customize panel"
          aria-expanded={open}
          aria-controls="theme-customizer"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="7" cy="7" r="2.4" />
            <circle cx="12" cy="17.5" r="2.4" />
            <circle cx="17.5" cy="7" r="2.4" />
            <path d="M7 9.4v3.6M7 16.6v2M12 14.6v2M12 10v.01M17.5 9.4v3.6M17.5 12v3" />
          </svg>
          Theme
        </button>
      )}

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[70]">
            <motion.div
              className="absolute inset-0 bg-black/70"
              onClick={() => setOpen(false)}
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.2 }}
            />
            <motion.aside
              id="theme-customizer"
              role="dialog"
              aria-label="Customize colors, fonts and transitions"
              className="absolute inset-y-0 left-0 flex w-full max-w-2xl flex-col border-r border-white/10 bg-neutral-950 shadow-2xl shadow-black/60"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 300, damping: 30 }
              }
            >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <p className="font-mono text-[0.65rem] font-bold tracking-[0.25em] text-primary uppercase">
                  Live Preview
                </p>
                <h2 className="font-display text-lg font-extrabold text-white">
                  Colors, Fonts &amp; Transitions
                </h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Close customize panel"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-sm font-bold tracking-wide text-white/90 uppercase">
                  Palette
                </h3>
                <span className="font-mono text-[0.65rem] text-white/40">
                  {PALETTES.length} options
                </span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2.5 md:grid-cols-3">
                {PALETTES.map((palette) => {
                  const selected = palette.id === paletteId;
                  return (
                    <button
                      key={palette.id}
                      onClick={() => writePrefs({ paletteId: palette.id })}
                      className={`group overflow-hidden rounded-xl border text-left transition-colors ${
                        selected
                          ? "border-white bg-white/10"
                          : "border-white/10 bg-white/5 hover:bg-white/10"
                      }`}
                      aria-pressed={selected}
                      aria-label={`Use ${palette.name} palette`}
                    >
                      <span className="flex h-20 w-full">
                        <span className="flex-1" style={{ backgroundColor: palette.primary }} />
                        <span className="flex-1" style={{ backgroundColor: palette.accent }} />
                        <span className="flex-1" style={{ backgroundColor: palette.base }} />
                      </span>
                      <span className="flex items-center justify-between px-3 py-2.5">
                        <span className="text-sm font-semibold text-white/85">
                          {palette.name}
                        </span>
                        {selected && (
                          <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <h3 className="font-display text-sm font-bold tracking-wide text-white/90 uppercase">
                  Fonts
                </h3>
                <span className="font-mono text-[0.65rem] text-white/40">
                  {FONT_PAIRS.length} options
                </span>
              </div>
              <div className="mt-3 flex flex-col gap-2.5">
                {FONT_PAIRS.map((pair) => {
                  const selected = pair.id === fontId;
                  return (
                    <button
                      key={pair.id}
                      onClick={() => writePrefs({ fontId: pair.id })}
                      className={`flex items-center justify-between rounded-xl border px-4 py-4 text-left transition-colors ${
                        selected
                          ? "border-white bg-white/10"
                          : "border-white/10 bg-white/5 hover:bg-white/10"
                      }`}
                      aria-pressed={selected}
                      aria-label={`Use ${pair.name} fonts`}
                    >
                      <span>
                        <span
                          className="block font-display text-xl font-extrabold text-white"
                          style={{ fontFamily: pair.heading }}
                        >
                          {pair.sample}
                        </span>
                        <span
                          className="mt-1 block text-sm text-white/55"
                          style={{ fontFamily: pair.body }}
                        >
                          The quick brown fox
                        </span>
                      </span>
                      <span className="text-sm font-semibold text-white/60">
                        {pair.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <h3 className="font-display text-sm font-bold tracking-wide text-white/90 uppercase">
                  Track Transition
                </h3>
                <span className="font-mono text-[0.65rem] text-white/40">
                  {TRANSITION_OPTIONS.length} styles
                </span>
              </div>
              <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                {TRANSITION_OPTIONS.map((option) => {
                  const selected = option.id === transitionId;
                  return (
                    <button
                      key={option.id}
                      onClick={() => writePrefs({ transitionId: option.id })}
                      className={`flex flex-col items-start rounded-xl border px-4 py-3.5 text-left transition-colors ${
                        selected
                          ? "border-primary bg-primary/15"
                          : "border-white/10 bg-white/5 hover:bg-white/10"
                      }`}
                      aria-pressed={selected}
                      aria-label={`Use ${option.name} track transition`}
                    >
                      <span className="flex w-full items-center justify-between">
                        <span className="text-sm font-bold text-white">{option.name}</span>
                        {selected && (
                          <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                        )}
                      </span>
                      <span className="mt-1 text-xs leading-relaxed text-white/60">
                        {option.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-2 border-t border-white/10 px-5 py-4">
              <button
                onClick={confirm}
                className="flex h-12 flex-1 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white transition-transform active:scale-[0.98]"
              >
                {confirmed ? "Saved!" : "Confirm choice"}
              </button>
              <button
                onClick={resetPrefs}
                className="flex h-12 items-center justify-center rounded-xl border border-white/15 px-4 text-sm font-semibold text-white/80 transition-colors hover:bg-white/10"
              >
                Reset
              </button>
            </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}