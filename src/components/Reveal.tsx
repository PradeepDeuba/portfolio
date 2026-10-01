import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASE_EXPO } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds of delay, for hand-staggered lists. */
  delay?: number;
  /** Travel distance in px. 0 gives a pure cross-fade. */
  y?: number;
  /** Render as a semantic element rather than a plain div. */
  as?: "div" | "section" | "article" | "li" | "header" | "footer";
}

/**
 * Scroll-triggered reveal.
 *
 * Replaces the previous approach, where Index.tsx queried `.reveal-section`
 * elements once on mount and toggled a CSS class via IntersectionObserver. That
 * only worked on the home page, lost its targets on every route change, and
 * left content at `opacity: 0` if the observer never fired. This uses
 * framer-motion's own viewport observer, so every section on every page gets
 * the same behaviour from one mechanism.
 *
 * The translate is dropped when the user prefers reduced motion; the fade
 * remains, since an opacity change is not vestibular motion.
 */
export const Reveal = ({ children, className, delay = 0, y = 22, as = "div" }: RevealProps) => {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: reduceMotion ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{
        duration: reduceMotion ? 0.2 : DURATION.slow,
        delay: reduceMotion ? 0 : delay,
        ease: EASE_EXPO,
      }}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;
