import { useMemo, useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import PageTransition from "../components/PageTransition";
import PageHeader from "../components/PageHeader";
import ProjectCard from "../components/ProjectCard";
import { WorkIndex } from "../components/WorkIndex";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

type View = "grid" | "list";

const Projects = () => {
  const [activeTag, setActiveTag] = useState<string>("all");
  const [view, setView] = useState<View>("grid");

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

  const filters = [
    { label: "All Projects", value: "all" },
    ...tags.map((tag) => ({ label: tag, value: tag })),
  ];

  const views: { id: View; label: string; Icon: typeof LayoutGrid }[] = [
    { id: "grid", label: "Grid view", Icon: LayoutGrid },
    { id: "list", label: "List view", Icon: List },
  ];

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
            <div className="flex flex-wrap items-center gap-4">
              {/* Filter row. Horizontally scrollable on narrow viewports rather
                  than wrapping into a tall stack of pills. */}
              <div className="-mx-5 min-w-0 flex-1 px-5 sm:mx-0 sm:px-0">
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

              {/* View switch: the same projects as a grid of tiles or as a
                  numbered index. */}
              <div
                role="group"
                aria-label="Change project layout"
                className="flex shrink-0 items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.02] p-1"
              >
                {views.map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setView(id)}
                    aria-pressed={view === id}
                    title={label}
                    className={cn(
                      "grid h-8 w-8 place-items-center rounded-full transition-colors duration-base ease-smooth",
                      view === id
                        ? "bg-primary/15 text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon size={15} aria-hidden="true" />
                    <span className="sr-only">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Result count, announced politely for screen readers. */}
            <p className="mt-6 font-mono text-xs tracking-wide text-muted-foreground" role="status">
              {filtered.length} {filtered.length === 1 ? "project" : "projects"}
            </p>

            {filtered.length > 0 ? (
              view === "grid" ? (
                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filtered.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                  ))}
                </div>
              ) : (
                <WorkIndex projects={filtered} className="mt-8" />
              )
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
