import type { CSSProperties, ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  /** Scroll right-to-left (default) or left-to-right. */
  reverse?: boolean;
  /** Seconds for one full cycle. Longer = slower. */
  durationSec?: number;
  className?: string;
  itemClassName?: string;
  separator?: ReactNode;
  /** Renders once, centred and static. Used for the reduced-motion fallback. */
  static?: boolean;
  /**
   * Offset the row by scroll velocity, so the marquee drags as the page moves.
   * This is the "skew on scroll" behaviour the reference site uses GSAP's
   * Observer plugin for.
   */
  velocity?: boolean;
}

const ROW_CLASS =
  "flex shrink-0 items-center whitespace-nowrap font-display text-xl font-medium tracking-tight md:text-3xl";

/**
 * Velocity offset.
 *
 * Its own component so the hooks run unconditionally — Marquee can then mount
 * it conditionally without breaking the rules of hooks.
 *
 * Velocity is spring-smoothed before use, and clamped, so a fast flick cannot
 * throw the row hundreds of pixels off-screen.
 */
const VelocityOffset = ({ children }: { children: ReactNode }) => {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothed = useSpring(velocity, { stiffness: 300, damping: 50, mass: 0.6 });
  const x = useTransform(smoothed, [-2600, 0, 2600], [-64, 0, 64], { clamp: true });

  if (reduceMotion) return <>{children}</>;

  return (
    <motion.div style={{ x }} className="[will-change:transform]">
      {children}
    </motion.div>
  );
};

/**
 * Seamless marquee.
 *
 * Two identical halves sit in a `w-max` track translated by -50%, so the loop
 * has no visible seam. Only `transform` animates. The second half is
 * `aria-hidden` so screen readers announce the list once rather than twice.
 *
 * Under reduced motion the global guard in index.css parks the track at the
 * origin and the velocity offset is not rendered.
 */
export const Marquee = ({
  items,
  reverse = false,
  durationSec = 46,
  className,
  itemClassName,
  separator = "·",
  static: isStatic = false,
  velocity = false,
}: MarqueeProps) => {
  const renderRow = (hidden = false) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, index) => (
        <span key={`${item}-${index}`} className={cn(ROW_CLASS, itemClassName)}>
          {item}
          <span aria-hidden="true" className="mx-5 text-primary/40 md:mx-8">
            {separator}
          </span>
        </span>
      ))}
    </div>
  );

  if (isStatic) {
    return (
      <div className={cn("flex flex-wrap items-center gap-x-5 gap-y-2", className)}>
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className={cn("flex items-center font-display text-xl font-medium tracking-tight md:text-3xl", itemClassName)}
          >
            {item}
            <span aria-hidden="true" className="ml-5 text-primary/40 md:ml-8">
              {separator}
            </span>
          </span>
        ))}
      </div>
    );
  }

  const track = (
    <div
      className={cn(
        "marquee-track flex w-max [will-change:transform]",
        reverse ? "animate-marquee-reverse" : "animate-marquee"
      )}
      style={{ "--marquee-duration": `${durationSec}s` } as CSSProperties}
    >
      {renderRow()}
      {renderRow(true)}
    </div>
  );

  return (
    <div className={cn("marquee-mask w-full overflow-hidden", className)}>
      {velocity ? <VelocityOffset>{track}</VelocityOffset> : track}
    </div>
  );
};

export default Marquee;
