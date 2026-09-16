"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, type TargetAndTransition } from "motion/react";
import { useTrack } from "@/lib/track";
import {
  getPrefsSnapshot,
  serverPrefs,
  subscribePrefs,
  type TransitionId,
} from "@/lib/preferences";
import Stats from "@/components/Stats";
import Categories from "@/components/Categories";
import Departments from "@/components/Departments";
import Skills from "@/components/Skills";

const TRANSITION_DEFS: Record<
  TransitionId,
  { initial: TargetAndTransition; animate: TargetAndTransition; exit: TargetAndTransition }
> = {
  flip: {
    initial: { opacity: 0, rotateY: -90 },
    animate: { opacity: 1, rotateY: 0 },
    exit: { opacity: 0, rotateY: 90 },
  },
  slide: {
    initial: { opacity: 0, x: "35%" },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "-35%" },
  },
  wipe: {
    initial: { opacity: 1, clipPath: "inset(0 0 100% 0)" },
    animate: { opacity: 1, clipPath: "inset(0 0 0% 0)" },
    exit: { opacity: 1, clipPath: "inset(0 0 100% 0)" },
  },
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timer = window.setTimeout(() => setReduced(query.matches), 0);
    const onChange = () => setReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => {
      window.clearTimeout(timer);
      query.removeEventListener("change", onChange);
    };
  }, []);
  return reduced;
}

export default function TrackStage() {
  const { track } = useTrack();
  const prefs = useSyncExternalStore(subscribePrefs, getPrefsSnapshot, serverPrefs);
  const reduced = usePrefersReducedMotion();
  const transitionId = prefs.transitionId;
  const def = TRANSITION_DEFS[transitionId];
  const duration = reduced ? 0 : 0.5;

  return (
    <div style={{ perspective: transitionId === "flip" ? 1600 : undefined }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={track}
          initial={def.initial}
          animate={def.animate}
          exit={def.exit}
          transition={{ duration, ease: [0.22, 0.61, 0.36, 1], when: "beforeChildren" }}
          style={{ transformStyle: transitionId === "flip" ? "preserve-3d" : undefined }}
        >
          <Stats />
          <Categories />
          <Departments />
          <Skills />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}