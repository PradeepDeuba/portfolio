import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { KineticText } from "@/components/KineticText";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  /** Plain text so it can be split for the word-by-word reveal. */
  title: string;
  /** Applied to the heading element, so a section can point at it with aria-labelledby. */
  id?: string;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  /** Optional right-hand slot, e.g. a "view all" link on wide screens. */
  action?: ReactNode;
}

/**
 * Section heading used by every page, so eyebrow/title/description spacing and
 * type scale stay identical across the site instead of being restated per page.
 *
 * The title is a plain string rather than a node: KineticText needs to split it
 * into words, and pages point at the resulting heading with aria-labelledby
 * using `id`.
 */
export const SectionHeading = ({
  eyebrow,
  title,
  id,
  description,
  align = "left",
  className,
  action,
}: SectionHeadingProps) => (
  <div
    className={cn(
      "flex flex-col gap-6",
      align === "center" ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
      className
    )}
  >
    <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
      <Reveal>
        <SectionLabel>{eyebrow}</SectionLabel>
      </Reveal>

      <KineticText
        as="h2"
        id={id}
        segments={[{ text: title }]}
        delay={0.05}
        className="mt-5 font-display text-display-sm font-semibold tracking-tight"
      />

      {description && (
        <Reveal delay={0.12}>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </div>

    {action && (
      <Reveal delay={0.16} className="shrink-0">
        {action}
      </Reveal>
    )}
  </div>
);

export default SectionHeading;
