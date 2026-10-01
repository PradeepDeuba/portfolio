import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASE_EXPO, EASE_SMOOTH } from "@/lib/motion";

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Route transition wrapper, used with AnimatePresence `mode="wait"` in App.tsx.
 *
 * Kept purely presentational: it no longer writes to documentElement/body on
 * mount, which previously fought with an identical effect in App.tsx. Theme and
 * page classes live in index.html.
 *
 * Under reduced motion the translate is dropped and the cross-fade shortened,
 * so navigation stays immediate rather than sliding.
 */
const PageTransition = ({ children }: PageTransitionProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduceMotion ? 0 : -10 }}
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
