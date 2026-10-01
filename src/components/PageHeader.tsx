import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/data/site";
import { DURATION, EASE_EXPO } from "@/lib/motion";
import { SectionLabel } from "@/components/SectionLabel";
import { KineticText } from "@/components/KineticText";

interface PageHeaderProps {
  /** Must match a name in site.nav for the mono index to resolve. */
  eyebrow: string;
  /** Plain text so it can be split for the word-by-word reveal. */
  title: string;
  description?: ReactNode;
  children?: ReactNode;
}

/**
 * Shared header for every inner route. The mono index (01–05) is derived from
 * the existing site.nav order rather than hard-coded per page, so adding a route
 * to src/data/site.ts keeps the numbering correct automatically.
 */
export const PageHeader = ({ eyebrow, title, description, children }: PageHeaderProps) => {
  const reduceMotion = useReducedMotion();

  const navIndex = site.nav.findIndex((item) => item.name === eyebrow);
  const indexLabel = navIndex >= 0 ? String(navIndex + 1).padStart(2, "0") : null;

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DURATION.slow, delay: reduceMotion ? 0 : delay, ease: EASE_EXPO },
  });

  return (
    <header className="relative border-b border-line pb-12 pt-32 sm:pt-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        <motion.div {...enter(0)} className="flex items-center gap-4">
          <SectionLabel>{eyebrow}</SectionLabel>
          {indexLabel && (
            <span aria-hidden="true" className="font-mono text-label text-muted-foreground/50 tnum">
              / {indexLabel}
            </span>
          )}
        </motion.div>

        <KineticText
          as="h1"
          delay={0.1}
          segments={[{ text: title }]}
          className="mt-6 max-w-4xl font-display text-display-md font-semibold tracking-tight"
        />

        {description && (
          <motion.p
            {...enter(0.34)}
            className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {description}
          </motion.p>
        )}

        {children && (
          <motion.div {...enter(0.42)} className="mt-9">
            {children}
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default PageHeader;
