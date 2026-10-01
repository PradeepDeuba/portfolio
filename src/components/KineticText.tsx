import { createElement } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface KineticSegment {
  text: string;
  /** Applied to every word in this segment, e.g. the gradient accent. */
  className?: string;
}

interface KineticTextProps {
  /** One entry for a plain headline, several to style part of it differently. */
  segments: KineticSegment[];
  className?: string;
  /** Seconds before the first word starts. */
  delay?: number;
  /** Seconds between words. */
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  /** Lets a section point at this heading with aria-labelledby. */
  id?: string;
}

/**
 * Word-by-word headline reveal: each word sits in an overflow-hidden box and
 * slides up from below its own baseline, so words appear to rise out of the
 * line rather than fading in.
 *
 * Words are real text nodes separated by real spaces, so the headline reads
 * correctly to screen readers, search crawlers and text selection — splitting
 * into per-letter spans with margin-based spacing (a common pattern) would
 * break all three.
 *
 * Under reduced motion the translate is dropped and only opacity animates.
 */
export const KineticText = ({
  segments,
  className,
  delay = 0,
  stagger = 0.045,
  as = "h2",
  id,
}: KineticTextProps) => {
  const reduceMotion = useReducedMotion();

  const words = segments.flatMap((segment, segmentIndex) =>
    segment.text
      .split(" ")
      .filter(Boolean)
      .map((word, wordIndex) => ({
        word,
        className: segment.className,
        key: `${segmentIndex}-${wordIndex}`,
      }))
  );

  return createElement(
    as,
    { className, id },
    words.map((item, index) => (
      <span key={item.key}>
        <span className="inline-block overflow-hidden pb-[0.14em] align-bottom">
          <motion.span
            className={cn("inline-block [will-change:transform]", item.className)}
            initial={{ y: reduceMotion ? 0 : "110%", opacity: reduceMotion ? 0 : 1 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: reduceMotion ? 0.3 : 0.8,
              delay: reduceMotion ? 0 : delay + index * stagger,
              ease: EASE_EXPO,
            }}
          >
            {item.word}
          </motion.span>
        </span>
        {index < words.length - 1 ? " " : null}
      </span>
    ))
  );
};

export default KineticText;
