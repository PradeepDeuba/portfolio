import { Link, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import PageTransition from "../components/PageTransition";
import BlogPost from "../components/BlogPost";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { Markdown } from "@/lib/markdown";
import NotFound from "./NotFound";
import { getPostById, posts } from "@/data/posts";
import { DURATION, EASE_EXPO } from "@/lib/motion";

/**
 * Renders the post's real markdown body with src/lib/markdown.tsx. The body is
 * the owner's own writing, verbatim from the live site.
 */
const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const post = getPostById(id);
  const reduceMotion = useReducedMotion();

  if (!post) {
    return <NotFound />;
  }

  const related = posts.filter((item) => item.id !== post.id).slice(0, 3);

  return (
    <PageTransition>
      <main id="main">
        <article className="pt-32 sm:pt-36">
          <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.base, ease: EASE_EXPO }}
            >
              <Link
                to="/blog"
                className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors duration-base ease-smooth hover:text-foreground"
              >
                <ArrowLeft
                  size={14}
                  aria-hidden="true"
                  className="transition-transform duration-base ease-expo group-hover:-translate-x-0.5"
                />
                All articles
              </Link>
            </motion.div>

            {post.topics.length > 0 && (
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: DURATION.base, delay: reduceMotion ? 0 : 0.06 }}
                className="mt-8 flex flex-wrap gap-2"
              >
                {post.topics.map((topic) => (
                  <li
                    key={topic}
                    className="rounded-full border border-line bg-panel px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                  >
                    {topic}
                  </li>
                ))}
              </motion.ul>
            )}

            <motion.h1
              initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.slow, delay: reduceMotion ? 0 : 0.1, ease: EASE_EXPO }}
              className="mt-5 font-display text-display-sm font-semibold tracking-tight"
            >
              {post.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: DURATION.base, delay: reduceMotion ? 0 : 0.16 }}
              className="mt-6 flex items-center gap-3 font-mono text-xs tracking-wide text-muted-foreground"
            >
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={13} aria-hidden="true" />
                {post.date}
              </span>
              <span aria-hidden="true" className="text-line">
                /
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={13} aria-hidden="true" />
                {post.readTime}
              </span>
            </motion.div>
          </div>

          <Reveal className="mx-auto mt-14 max-w-4xl px-5 sm:px-6 lg:px-10">
            <div className="glow-card relative overflow-hidden rounded-2xl border border-line">
              <img
                src={post.cover}
                alt=""
                className="aspect-[16/9] w-full object-cover"
              />
            </div>
          </Reveal>

          <div className="mx-auto mt-14 max-w-3xl px-5 sm:px-6 lg:px-10">
            <Reveal>
              <p className="font-display text-lg leading-relaxed text-foreground sm:text-xl">
                {post.excerpt}
              </p>
            </Reveal>

            <Reveal delay={0.06} className="mt-10">
              <Markdown content={post.content} />
            </Reveal>
          </div>
        </article>

        {related.length > 0 && (
          <section className="mt-28 border-t border-line pt-20" aria-labelledby="more-articles">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
              <SectionHeading eyebrow="More" id="more-articles" title="More articles" />
              <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {related.map((item, index) => (
                  <BlogPost key={item.id} post={item} index={index} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </PageTransition>
  );
};

export default BlogDetail;
