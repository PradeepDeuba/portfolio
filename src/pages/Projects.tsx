import { useMemo, useState } from "react";
import PageTransition from "../components/PageTransition";
import PageHeader from "../components/PageHeader";
import ProjectCard from "../components/ProjectCard";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

const Projects = () => {
  const [activeTag, setActiveTag] = useState<string>("all");

  const tags = useMemo(
    () => Array.from(new Set(projects.flatMap((project) => project.tags))),
    []
  );

  const filtered = useMemo(
    () =>
      activeTag === "all"
        ? projects
        : projects.filter((project) => project.tags.includes(activeTag)),
    [activeTag]
  );

  const filters = [{ label: "All Projects", value: "all" }, ...tags.map((tag) => ({ label: tag, value: tag }))];

  return (
    <PageTransition>
      <main id="main">
        <PageHeader
          eyebrow="Projects"
          title="Our projects"
          description="Explore our portfolio of innovative solutions across various domains and technologies."
        />

        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
            {/* Filter row. Horizontally scrollable on narrow viewports rather
                than wrapping into a tall stack of pills. */}
            <div className="-mx-5 px-5 sm:mx-0 sm:px-0">
              <div
                role="group"
                aria-label="Filter projects by technology"
                className="hides-scrollbar flex gap-2 overflow-x-auto pb-1"
              >
                {filters.map(({ label, value }) => {
                  const isActive = activeTag === value;

                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setActiveTag(value)}
                      aria-pressed={isActive}
                      className={cn(
                        "shrink-0 rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors duration-base ease-smooth",
                        isActive
                          ? "border-primary/50 bg-primary/15 text-foreground"
                          : "border-white/[0.08] bg-white/[0.02] text-muted-foreground hover:border-white/20 hover:text-foreground"
                      )}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Result count, announced politely for screen readers. */}
            <p className="mt-6 font-mono text-xs tracking-wide text-muted-foreground" role="status">
              {filtered.length} {filtered.length === 1 ? "project" : "projects"}
            </p>

            {filtered.length > 0 ? (
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-2xl border border-white/[0.07] bg-card/40 px-6 py-20 text-center">
                <p className="text-muted-foreground">
                  No projects found with the selected filter.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTag("all")}
                  className="link-underline mt-4 text-sm font-medium text-primary"
                >
                  Clear filter
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </PageTransition>
  );
};

export default Projects;
