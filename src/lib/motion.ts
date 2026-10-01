/**
 * Shared motion tokens.
 *
 * Every animation in the app pulls its timing from here so durations and
 * easings stay consistent, and so they can be tuned in one place.
 * Mirrors the CSS custom properties in src/index.css.
 */
import type { Transition, Variants } from "framer-motion";

/** Long, decelerating ease. The default for entrances and hovers. */
export const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Symmetric ease for state changes that reverse. */
export const EASE_SMOOTH: [number, number, number, number] = [0.4, 0, 0.2, 1];

export const DURATION = {
  fast: 0.16,
  base: 0.28,
  slow: 0.5,
  page: 0.42,
} as const;

/** Used for pointer-tracking elements where a spring reads better than an ease. */
export const SPRING_POINTER: Transition = {
  type: "spring",
  stiffness: 700,
  damping: 32,
  mass: 0.35,
};

export const SPRING_SOFT: Transition = {
  type: "spring",
  stiffness: 240,
  damping: 28,
  mass: 0.7,
};

/** Stagger helper — returns the delay for the nth item in a list. */
export const staggerDelay = (index: number, step = 0.07, max = 0.35): number =>
  Math.min(index * step, max);

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_EXPO },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.slow, ease: EASE_EXPO } },
};

export const fadeUpSmall: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_EXPO },
  },
};

/** Page enter/exit. Kept short so navigation never feels sluggish. */
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 14 },
  enter: { opacity: 1, y: 0, transition: { duration: DURATION.page, ease: EASE_EXPO } },
  exit: { opacity: 0, y: -10, transition: { duration: DURATION.fast, ease: EASE_SMOOTH } },
};
