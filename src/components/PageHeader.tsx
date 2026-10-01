import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/data/site";
import { DURATION, EASE_EXPO } from "@/lib/motion";

interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}

/**
 * Shared header for every inner route. The mono index (01–05) is derived from
 * the existing site.nav order rather than being hard-coded per page, so adding
 * a route to src/data/site.ts keeps the numbering correct automatically.
 */
export const PageHeader = ({ eyebrow, title, description, children }: PageHeaderProps) => {
  const reduceMotion = useReducedMotion();

  const navIndex = site.nav.findIndex((item) => item.name === eyebrow);
  const indexLabel = navIndex >= 0 ? String(navIndex + 1).padStart(2, "0") : null;

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: DURATION.slow,
      delay: reduceMotion ? 0 : delay,
      ease: EASE_EXPO,
    },
  });

  return (
    <header className="relative border-b border-white/[0.07] pb-12 pt-32 sm:pt-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        <motion.div {...enter(0)} className="flex items-center gap-4">
          <span className="label-mono inline-flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-primary/60" />
            {eyebrow}
          </span>
          {indexLabel && (
            <span aria-hidden="true" className="font-mono text-label text-muted-foreground/50 tnum">
              / {indexLabel}
            </span>
          )}
        </motion.div>

        <motion.h1
          {...enter(0.08)}
          className="mt-6 max-w-4xl font-display text-display-md font-semibold tracking-tight"
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            {...enter(0.16)}
            className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {description}
          </motion.p>
        )}

        {children && (
          <motion.div {...enter(0.24)} className="mt-9">
            {children}
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default PageHeader;
