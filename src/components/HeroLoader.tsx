"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function HeroLoader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "done">("loading");

  useEffect(() => {
    // Simulate loading progress — real 3D load fires onDone externally
    const steps = [
      { target: 30,  delay: 120 },
      { target: 55,  delay: 200 },
      { target: 72,  delay: 300 },
      { target: 88,  delay: 200 },
      { target: 100, delay: 400 },
    ];

    let current = 0;
    let timeout: ReturnType<typeof setTimeout>;

    function advance() {
      if (current >= steps.length) return;
      const { target, delay } = steps[current++];
      timeout = setTimeout(() => {
        setProgress(target);
        if (target === 100) {
          setTimeout(() => {
            setPhase("done");
            // give exit animation time, then call parent
            setTimeout(onDone, 600);
          }, 320);
        } else {
          advance();
        }
      }, delay);
    }
    advance();
    return () => clearTimeout(timeout);
  }, [onDone]);

  return (
    <AnimatePresence>
      {phase === "loading" && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-void"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* grid bg */}
          <div className="absolute inset-0 bg-grid opacity-40" />

          {/* central orange radial glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 48%, rgba(255,107,0,0.12), transparent 40%)",
            }}
          />

          {/* top hairline */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          {/* animated scan line on loader */}
          <div
            className="scan-line pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/80 to-transparent"
            style={{ boxShadow: "0 0 18px rgba(255,107,0,0.7)" }}
          />

          {/* content card */}
          <div className="loader-in relative mx-6 w-full max-w-md">
            {/* glow blob behind card */}
            <div
              className="absolute -inset-16 rounded-full blur-3xl"
              style={{ background: "rgba(255,107,0,0.06)" }}
            />

            {/* card with corner brackets */}
            <div className="relative border-x border-white/[0.07] px-8 py-10 text-center sm:px-12 sm:py-12">
              {/* corner — top-left */}
              <svg className="absolute left-0 top-0" width="32" height="32" aria-hidden="true">
                <line x1="0" y1="0" x2="0" y2="28" className="bracket-line" stroke="#ff6b00" strokeWidth="1.5" style={{ animationDelay: "0s" }} />
                <line x1="0" y1="0" x2="28" y2="0" className="bracket-line" stroke="#ff6b00" strokeWidth="1.5" style={{ animationDelay: "0.05s" }} />
              </svg>
              {/* corner — top-right */}
              <svg className="absolute right-0 top-0" width="32" height="32" aria-hidden="true">
                <line x1="32" y1="0" x2="32" y2="28" className="bracket-line" stroke="#ff6b00" strokeWidth="1.5" style={{ animationDelay: "0.1s" }} />
                <line x1="32" y1="0" x2="4"  y2="0"  className="bracket-line" stroke="#ff6b00" strokeWidth="1.5" style={{ animationDelay: "0.15s" }} />
              </svg>
              {/* corner — bottom-left */}
              <svg className="absolute bottom-0 left-0" width="32" height="32" aria-hidden="true">
                <line x1="0" y1="32" x2="0" y2="4"  className="bracket-line" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" style={{ animationDelay: "0.2s" }} />
                <line x1="0" y1="32" x2="28" y2="32" className="bracket-line" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" style={{ animationDelay: "0.25s" }} />
              </svg>
              {/* corner — bottom-right */}
              <svg className="absolute bottom-0 right-0" width="32" height="32" aria-hidden="true">
                <line x1="32" y1="32" x2="32" y2="4"  className="bracket-line" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" style={{ animationDelay: "0.3s" }} />
                <line x1="32" y1="32" x2="4"  y2="32" className="bracket-line" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" style={{ animationDelay: "0.35s" }} />
              </svg>

              {/* team name */}
              <div className="space-y-1">
                <p className="font-display text-2xl font-extrabold tracking-[0.18em] text-white uppercase sm:text-3xl">
                  Team{" "}
                  <span className="neon-orange text-primary">Abhyuday</span>
                </p>
                <p className="font-display text-xl font-extrabold tracking-[0.22em] text-accent uppercase neon-cyan sm:text-2xl">
                  Racing
                </p>
                <p className="mt-3 font-mono text-[9px] font-bold tracking-[0.35em] text-white/40 uppercase">
                  Initializing 3D Configurator
                </p>
              </div>

              {/* progress bar */}
              <div className="mx-auto mt-8 max-w-xs">
                <div className="mb-2 flex items-center justify-between font-mono text-[8px] tracking-[0.24em] text-white/30 uppercase">
                  <span>System ready</span>
                  <span className="text-primary/80">{progress}%</span>
                </div>
                <div className="relative h-px overflow-hidden bg-white/10">
                  {/* fill bar */}
                  <div
                    className="absolute inset-y-0 left-0 bg-primary transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                  {/* shimmer on the fill */}
                  <div
                    className="loader-shimmer absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                    style={{ left: 0 }}
                  />
                </div>
                {/* tick marks */}
                <div className="mt-2 flex justify-between" aria-hidden="true">
                  {Array.from({ length: 13 }, (_, i) => (
                    <span
                      key={i}
                      className={`h-1 w-px ${[0, 3, 6, 9, 12].includes(i) ? "bg-white/35" : "bg-white/12"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* bottom label */}
          <p className="absolute bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[8px] uppercase tracking-[0.32em] text-white/20">
            BAJA SAEINDIA · A10 · 2026
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
