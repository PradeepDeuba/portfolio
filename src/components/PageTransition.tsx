import { useEffect, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASE_EXPO, EASE_SMOOTH } from "@/lib/motion";

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Tracks whether any page has mounted yet, so the very first render can skip
 * the wrapper's entrance without disabling entrance animations everywhere else.
 */
let hasMountedOnce = false;

/**
 * Route transition wrapper, used with AnimatePresence `mode="wait"` in App.tsx.
 *
 * Note on `initial={false}`: it used to live on the AnimatePresence in App.tsx,
 * which silently broke this site's entrance animations. AnimatePresence passes
 * `initial: false` down through the motion context, so *every* nested motion
 * component — KineticText's words, Reveal's sections, every card, every
 * RevealImage — rendered straight at its final state and never animated in.
 *
 * The desired behaviour (no page-level fade on the very first paint) is kept,
 * but scoped to this wrapper via `isFirstMount`, so descendants are untouched.
 */
const PageTransition = ({ children }: PageTransitionProps) => {
  const reduceMotion = useReducedMotion();
  const isFirstMount = !hasMountedOnce;

  useEffect(() => {
    hasMountedOnce = true;
  }, []);

  const enter = { opacity: 0, y: reduceMotion ? 0 : 14 };
  const settled = { opacity: 1, y: 0 };
  const leave = { opacity: 0, y: reduceMotion ? 0 : -10 };

  return (
    <motion.div
      initial={isFirstMount ? false : enter}
      animate={settled}
      exit={leave}
      transition={{
        duration: reduceMotion ? 0.18 : DURATION.page,
        ease: reduceMotion ? EASE_SMOOTH : EASE_EXPO,
      }}
      className="relative z-10 min-h-screen w-full overflow-x-hidden"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
