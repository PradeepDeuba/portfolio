import type { CSSProperties, ReactNode } from "react";
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
}

/**
 * Seamless marquee.
 *
 * Two identical halves sit in a `w-max` track that is translated by -50%, so the
 * loop has no visible seam. Only `transform` is animated, which the compositor
 * handles without layout or paint work.
 *
 * The second half is `aria-hidden` so screen readers announce the list once
 * rather than twice. Under `prefers-reduced-motion` the global guard in
 * index.css parks the track at the origin, which is why the duplicate exists in
 * the markup rather than being generated in JS.
 */
export const Marquee = ({
  items,
  reverse = false,
  durationSec = 46,
  className,
  itemClassName,
  separator = "·",
  static: isStatic = false,
}: MarqueeProps) => {
  const renderRow = () => (
    <>
      {items.map((item, index) => (
        <span
          key={`${item}-${index}`}
          className={cn(
            "flex shrink-0 items-center whitespace-nowrap font-display text-xl font-medium tracking-tight md:text-3xl",
            itemClassName
          )}
        >
          {item}
          <span aria-hidden="true" className="mx-5 text-primary/40 md:mx-8">
            {separator}
          </span>
        </span>
      ))}
    </>
  );

  if (isStatic) {
    return (
      <div className={cn("flex flex-wrap items-center gap-x-5 gap-y-2", className)}>
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className={cn(
              "flex items-center font-display text-xl font-medium tracking-tight md:text-3xl",
              itemClassName
            )}
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

  return (
    <div className={cn("marquee-mask w-full overflow-hidden", className)}>
      <div
        className={cn(
          "marquee-track flex w-max [will-change:transform]",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
        style={{ "--marquee-duration": `${durationSec}s` } as CSSProperties}
      >
        <div className="flex shrink-0 items-center">{renderRow()}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {renderRow()}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
