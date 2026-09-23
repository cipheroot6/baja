"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

export interface MotionPref {
  reduced: boolean;
  duration: (ms: number) => number;
  loop: boolean;
}

export function usePrefersReducedMotion(): MotionPref {
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

  const duration = useCallback(
    (ms: number) => (reduced ? 0 : ms),
    [reduced],
  );

  return useMemo(
    () => ({
      reduced,
      duration,
      loop: !reduced,
    }),
    [reduced, duration],
  );
}