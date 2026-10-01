import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE_EXPO } from "@/lib/motion";

interface RevealImageProps {
  src: string;
  alt: string;
  className?: string;
  /** Applied to the img element itself. */
  imgClassName?: string;
  /** Seconds to wait after entering the viewport. */
  delay?: number;
  /** Set for the one image above the fold, so it plays immediately. */
  priority?: boolean;
}

/**
 * Curtain image reveal: a panel in the theme's background colour wipes upward
 * off the image while the image itself eases down from a slight overscale.
 *
 * Uses `translateY` and `scale` only — no `clip-path`, which is not
 * compositor-friendly on large images and would repaint every frame.
 *
 * Deliberately avoids framer's `variants` + string-label form: the props here
 * are plain objects, which is the pattern the rest of this codebase uses and
 * the one verified to animate reliably. Under reduced motion nothing moves.
 */
export const RevealImage = ({
  src,
  alt,
  className,
  imgClassName,
  delay = 0,
  priority = false,
}: RevealImageProps) => {
  const reduceMotion = useReducedMotion();

  const from = { scale: reduceMotion ? 1 : 1.12, y: reduceMotion ? "0%" : "3%" };
  const to = { scale: 1, y: "0%" };

  // Above-the-fold images must not wait on scroll observation.
  const viewportGate = priority
    ? { animate: to }
    : { whileInView: to, viewport: { once: true, margin: "-60px" as const } };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        initial={from}
        {...viewportGate}
        transition={{
          duration: reduceMotion ? 0.3 : 1.1,
          delay: reduceMotion ? 0 : delay,
          ease: EASE_EXPO,
        }}
        className={cn("h-full w-full object-cover", imgClassName)}
      />

      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          initial={{ y: "0%" }}
          {...(priority
            ? { animate: { y: "-100%" } }
            : {
                whileInView: { y: "-100%" },
                viewport: { once: true, margin: "-60px" as const },
              })}
          transition={{ duration: 0.9, delay, ease: EASE_EXPO }}
          className="absolute inset-0 bg-background"
        />
      )}
    </div>
  );
};

export default RevealImage;
