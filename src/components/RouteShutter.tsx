import { useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_EXPO } from "@/lib/motion";

/**
 * Route-change shutter: a short accent sweep along the top edge that plays once
 * per navigation.
 *
 * Keyed on pathname so React remounts it and the animation replays on every
 * route change, with no transition state machine to coordinate against
 * AnimatePresence. Sits directly below the scroll-progress bar so the two
 * never overlap. Skipped entirely under reduced motion.
 */
export const RouteShutter = () => {
  const { pathname } = useLocation();
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-[2px] z-[69] h-[2px] overflow-hidden"
    >
      <motion.div
        key={pathname}
        className="h-full w-1/4 rounded-full bg-gradient-iris"
        initial={{ x: "-120%" }}
        animate={{ x: "420%" }}
        transition={{ duration: 0.75, ease: EASE_EXPO }}
      />
    </div>
  );
};

export default RouteShutter;
