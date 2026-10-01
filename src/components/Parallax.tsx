import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxProps {
  children: ReactNode;
  /**
   * Peak travel in px in each direction. Positive moves the element up as the
   * page scrolls down. Keep this small — it is a depth cue, not an effect.
   */
  distance?: number;
  className?: string;
}

/**
 * Scroll-linked parallax.
 *
 * Position is derived from the element's own progress through the viewport, so
 * it stays correct regardless of where in the page the element sits. Only
 * `transform: translateY` is animated, which the compositor can handle without
 * layout or paint work.
 *
 * Disabled entirely under `prefers-reduced-motion`: parallax is precisely the
 * kind of motion that setting exists to suppress.
 */
export const Parallax = ({ children, distance = 40, className }: ParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [distance, -distance]
  );

  return (
    // `relative` is required, not cosmetic: useScroll measures the target's
    // offset from its offsetParent, and framer-motion warns (and mis-measures)
    // when that container is statically positioned.
    <div ref={ref} className={cn("relative", className)}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
};

export default Parallax;
