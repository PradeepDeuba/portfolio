import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import PageTransition from "../components/PageTransition";
import PageHeader from "../components/PageHeader";
import BlogPost from "../components/BlogPost";
import { posts, topics } from "@/data/posts";
import { cn } from "@/lib/utils";

/**
 * Filters by `topics` rather than the template's `category`. The real posts
 * table has no category column, so topics are the editorial groupings noted in
 * src/data/posts.ts.
 */
const Blog = () => {
  const [query, setQuery] = useState("");
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesQuery =
        needle === "" ||
        post.title.toLowerCase().includes(needle) ||
        post.excerpt.toLowerCase().includes(needle);
      const matchesTopic = activeTopic ? post.topics.includes(activeTopic) : true;
      return matchesQuery && matchesTopic;
    });
  }, [query, activeTopic]);

  const filters = [
    { label: "All Topics", value: null as string | null },
    ...topics.map((topic) => ({ label: topic, value: topic as string | null })),
  ];

  return (
    <PageTransition>
      <main id="main">
        <PageHeader
          eyebrow="Blog"
          title="Notes from the bench"
          description="Write-ups from projects I've actually built — the wiring decisions, the measurements, and what broke."
        />

        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
            <div className="relative max-w-2xl">
              <label htmlFor="blog-search" className="sr-only">
                Search articles
              </label>
              <Search
                size={17}
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                id="blog-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search articles..."
                className="w-full rounded-full border border-line bg-panel py-3.5 pl-11 pr-4 text-sm outline-none transition-colors duration-base ease-smooth placeholder:text-muted-foreground/70 focus:border-primary/50"
              />
            </div>

            <div className="-mx-5 mt-6 px-5 sm:mx-0 sm:px-0">
              <div
                role="group"
                aria-label="Filter articles by topic"
                className="hides-scrollbar flex gap-2 overflow-x-auto pb-1"
              >
                {filters.map(({ label, value }) => {
                  const isActive = activeTopic === value;

                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setActiveTopic(value)}
                      aria-pressed={isActive}
                      className={cn(
                        "shrink-0 rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors duration-base ease-smooth",
                        isActive
                          ? "border-primary/50 bg-primary/15 text-foreground"
                          : "border-line bg-panel text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      )}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="mt-6 font-mono text-xs tracking-wide text-muted-foreground" role="status">
              {filtered.length} {filtered.length === 1 ? "article" : "articles"}
            </p>

            {filtered.length > 0 ? (
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((post, index) => (
                  <BlogPost key={post.id} post={post} index={index} />
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-2xl border border-line bg-card px-6 py-20 text-center">
                <p className="text-muted-foreground">
                  No articles found matching your criteria.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setActiveTopic(null);
                  }}
                  className="link-underline mt-4 text-sm font-medium text-primary"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </PageTransition>
  );
};

export default Blog;
