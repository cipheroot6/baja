import type { Variants } from "motion/react";

export const EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

export const VIEWPORT = { once: true, amount: 0.25 } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.5, ease: EASE },
  },
};

export const slideInLeft: Variants = {
  hidden: { x: "-100%" },
  show: {
    x: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

export function staggerContainer(stagger = 0.1, delayChildren = 0): Variants {
  return {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}