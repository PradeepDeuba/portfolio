import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  /** Optional right-hand slot, e.g. a "view all" link on wide screens. */
  action?: ReactNode;
}

/**
 * Section heading used by every page, so eyebrow/title/description spacing and
 * type scale stay identical across the site instead of being restated per page.
 */
export const SectionHeading = ({
  eyebrow,
  title,
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
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto")}>
      <span className="label-mono inline-flex items-center gap-3">
        <span aria-hidden="true" className="h-px w-8 bg-primary/60" />
        {eyebrow}
      </span>
      <h2 className="mt-5 font-display text-display-sm font-semibold tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </Reveal>

    {action && (
      <Reveal delay={0.1} className="shrink-0">
        {action}
      </Reveal>
    )}
  </div>
);

export default SectionHeading;
