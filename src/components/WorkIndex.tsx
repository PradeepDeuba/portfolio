import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { useFinePointer } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { EASE_EXPO } from "@/lib/motion";

interface WorkIndexProps {
  projects: Project[];
  className?: string;
}

/**
 * Numbered work index — an index, not a card grid.
 *
 * On a fine pointer a single image preview follows the cursor and cross-fades
 * between projects, so the list stays typographic and uninterrupted. On coarse
 * pointers (and under reduced motion) each row instead carries its own small
 * thumbnail, because there is no hover to reveal anything with.
 *
 * The preview is driven by two spring-smoothed motion values, so pointer
 * movement never triggers a React render — only the active index does.
 */
export const WorkIndex = ({ projects, className }: WorkIndexProps) => {
  const containerRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const finePointer = useFinePointer();
  const reduceMotion = useReducedMotion();

  const showPreview = finePointer && !reduceMotion;

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 220, damping: 26, mass: 0.6 });
  const y = useSpring(pointerY, { stiffness: 220, damping: 26, mass: 0.6 });

  const handlePointerMove = (event: React.PointerEvent<HTMLUListElement>) => {
    if (!showPreview || !containerRef.current) return;

    const bounds = containerRef.current.getBoundingClientRect();
    pointerX.set(event.clientX - bounds.left);
    pointerY.set(event.clientY - bounds.top);
  };

  const activeProject = activeIndex === null ? null : projects[activeIndex];

  return (
    <div className={cn("relative", className)}>
      <ul
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setActiveIndex(null)}
        className="border-t border-line"
      >
        {projects.map((project, index) => (
          <li key={project.id} className="border-b border-line">
            <Link
              to={project.demoUrl ?? "/projects"}
              onPointerEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onBlur={() => setActiveIndex(null)}
              data-cursor="View"
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-6 transition-colors duration-base ease-smooth sm:gap-6 sm:py-7"
            >
              <span
                aria-hidden="true"
                className="font-mono text-xs text-muted-foreground transition-colors duration-base ease-smooth group-hover:text-primary tnum"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="min-w-0">
                <span className="block font-display text-xl font-semibold tracking-tight transition-transform duration-slow ease-expo group-hover:translate-x-1.5 sm:text-2xl md:text-3xl">
                  {project.title}
                </span>

                <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </span>
              </span>

              <span className="flex items-center gap-4">
                {/* Coarse pointer / reduced motion: inline thumbnail stands in
                    for the hover preview. */}
                {!showPreview && (
                  <img
                    src={project.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="hidden h-14 w-14 rounded-lg object-cover sm:block"
                  />
                )}
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-panel text-muted-foreground transition-all duration-slow ease-expo group-hover:border-primary/40 group-hover:bg-primary/10 group-hover:text-primary">
                  <ArrowUpRight size={16} aria-hidden="true" />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Floating preview. Decorative, so hidden from assistive tech. */}
      {showPreview && (
        <motion.div
          aria-hidden="true"
          style={{ x, y }}
          className="pointer-events-none absolute left-0 top-0 z-20 hidden lg:block"
        >
          <AnimatePresence>
            {activeProject && (
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, scale: 0.92, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, rotate: -3 }}
                exit={{ opacity: 0, scale: 0.96, rotate: -3 }}
                transition={{ duration: 0.35, ease: EASE_EXPO }}
                className="w-72 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-line shadow-lift"
              >
                <img
                  src={activeProject.image}
                  alt=""
                  className="aspect-[16/10] w-full object-cover"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default WorkIndex;
