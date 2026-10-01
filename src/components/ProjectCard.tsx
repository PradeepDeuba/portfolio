import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/data/projects";
import { DURATION, EASE_EXPO, staggerDelay } from "@/lib/motion";

interface ProjectCardProps {
  project: Project;
  index: number;
}

/**
 * Project tile.
 *
 * Hover state animates only `transform`, `opacity` and `border-color`; the
 * gradient hairline is a pseudo-element on `.glow-card` so no box-shadow is
 * interpolated. The image zoom is a CSS transition, not a JS animation.
 */
const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [loaded, setLoaded] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: DURATION.slow,
        delay: reduceMotion ? 0 : staggerDelay(index),
        ease: EASE_EXPO,
      }}
      className="group relative"
    >
      <div className="glow-card flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card transition-transform duration-slow ease-expo hover:-translate-y-1.5">
        <div className="relative aspect-[16/10] overflow-hidden" data-cursor="View">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            className={`h-full w-full object-cover transition-[transform,filter,opacity] duration-slow ease-expo group-hover:scale-[1.04] ${
              loaded ? "opacity-100 blur-0" : "opacity-0 blur-lg"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-80" />

          <span className="absolute left-4 top-4 font-mono text-[11px] tracking-widest text-muted-foreground tnum">
            {String(index + 1).padStart(2, "0")}
          </span>

          <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-line bg-background/60 opacity-0 backdrop-blur-md transition-all duration-slow ease-expo group-hover:opacity-100 group-hover:rotate-0 rotate-[-30deg]">
            <ArrowUpRight size={15} aria-hidden="true" />
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <ul className="mb-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-line bg-panel px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>

          <h3 className="font-display text-xl font-semibold tracking-tight transition-colors duration-base ease-smooth group-hover:text-primary">
            {project.title}
          </h3>
          <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
            {project.demoUrl ? (
              <Link
                to={project.demoUrl}
                data-cursor="Open"
                className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors duration-base ease-smooth hover:text-primary/80"
              >
                View project
                <ArrowUpRight
                  size={15}
                  aria-hidden="true"
                  className="transition-transform duration-base ease-expo group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                />
              </Link>
            ) : (
              <span />
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} source code on GitHub`}
                className="text-muted-foreground transition-colors duration-base ease-smooth hover:text-primary"
              >
                <Github size={17} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
