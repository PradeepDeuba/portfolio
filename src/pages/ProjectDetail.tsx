import { Link, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import PageTransition from "../components/PageTransition";
import ProjectCard from "../components/ProjectCard";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import NotFound from "./NotFound";
import { getProjectById, projects } from "@/data/projects";
import { DURATION, EASE_EXPO } from "@/lib/motion";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = getProjectById(id);
  const reduceMotion = useReducedMotion();

  // Unknown id: render the 404 page rather than an empty shell. This is
  // unchanged behaviour from the previous implementation.
  if (!project) {
    return <NotFound />;
  }

  const related = projects.filter((item) => item.id !== project.id).slice(0, 3);

  return (
    <PageTransition>
      <main id="main">
        <article className="pt-32 sm:pt-36">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.base, ease: EASE_EXPO }}
            >
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors duration-base ease-smooth hover:text-foreground"
              >
                <ArrowLeft
                  size={14}
                  aria-hidden="true"
                  className="transition-transform duration-base ease-expo group-hover:-translate-x-0.5"
                />
                All projects
              </Link>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: DURATION.base, delay: reduceMotion ? 0 : 0.06 }}
              className="mt-8 flex flex-wrap gap-2"
            >
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-line bg-panel px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                >
                  {tag}
                </li>
              ))}
            </motion.ul>

            <motion.h1
              initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.slow, delay: reduceMotion ? 0 : 0.1, ease: EASE_EXPO }}
              className="mt-6 max-w-4xl font-display text-display-md font-semibold tracking-tight"
            >
              {project.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.slow, delay: reduceMotion ? 0 : 0.16, ease: EASE_EXPO }}
              className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {project.description}
            </motion.p>
          </div>

          <Reveal className="mx-auto mt-16 max-w-7xl px-5 sm:px-6 lg:px-10">
            <div className="glow-card relative overflow-hidden rounded-3xl border border-line">
              <img
                src={project.image}
                alt={project.title}
                className="aspect-[16/9] w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent"
              />
            </div>
          </Reveal>

          <div className="mx-auto mt-16 max-w-7xl px-5 sm:px-6 lg:px-10">
            {/* The template carried an optional `overview` prose field that was
                always empty. Projects now link to the matching write-up instead,
                which is where the real detail lives. */}
            {project.postSlug && (
              <Reveal className="max-w-3xl">
                <Link
                  to={`/blog/${project.postSlug}`}
                  className="group inline-flex items-center gap-2 text-sm font-medium text-primary"
                >
                  Read the full write-up
                  <ArrowUpRight
                    size={15}
                    aria-hidden="true"
                    className="transition-transform duration-base ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </Reveal>
            )}

            <Reveal className="mt-12 flex flex-wrap items-center gap-3 border-t border-line pt-10">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors duration-base ease-smooth hover:bg-primary/90"
                >
                  <Github size={16} aria-hidden="true" />
                  View source
                </a>
              )}
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full border border-line bg-panel px-6 py-3 text-sm font-medium transition-colors duration-base ease-smooth hover:border-primary/40 hover:bg-primary/10"
              >
                Discuss a project
                <ArrowUpRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-base ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </Reveal>
          </div>
        </article>

        {related.length > 0 && (
          <section className="mt-28 border-t border-line pt-20" aria-labelledby="related-heading">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
              <SectionHeading eyebrow="More" id="related-heading" title="More projects" />
              <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {related.map((item, index) => (
                  <ProjectCard key={item.id} project={item} index={index} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </PageTransition>
  );
};

export default ProjectDetail;
