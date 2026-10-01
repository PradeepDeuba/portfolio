import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: string;
  className?: string;
  /** Hide the leading rule on very narrow viewports. */
  rule?: boolean;
}

/**
 * The site's section label: a monospace, letter-spaced eyebrow wrapped in
 * brackets with a short accent rule.
 *
 * The brackets and the rule are `aria-hidden`, so assistive tech announces just
 * the label text while the decoration stays purely visual.
 */
export const SectionLabel = ({ children, className, rule = true }: SectionLabelProps) => (
  <span className={cn("label-mono inline-flex items-center gap-2.5", className)}>
    {rule && (
      <span
        aria-hidden="true"
        className="hidden h-px w-8 bg-primary/60 sm:inline-block"
      />
    )}
    <span aria-hidden="true" className="text-primary/50">
      [
    </span>
    {children}
    <span aria-hidden="true" className="text-primary/50">
      ]
    </span>
  </span>
);

export default SectionLabel;
