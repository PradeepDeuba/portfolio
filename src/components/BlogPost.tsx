import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import type { Post } from "@/data/posts";
import { DURATION, EASE_EXPO, staggerDelay } from "@/lib/motion";

interface BlogPostProps {
  post: Post;
  index: number;
}

/** Blog tile. Same hover/entry contract as ProjectCard for visual consistency. */
const BlogPost = ({ post, index }: BlogPostProps) => {
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
      <div className="glow-card flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-card/60 transition-transform duration-slow ease-expo hover:-translate-y-1.5">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            className={`h-full w-full object-cover transition-[transform,filter,opacity] duration-slow ease-expo group-hover:scale-[1.04] ${
              loaded ? "opacity-100 blur-0" : "opacity-0 blur-lg"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent opacity-80" />

          <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-background/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider backdrop-blur-md">
            {post.category}
          </span>

          <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-background/60 opacity-0 backdrop-blur-md transition-all duration-slow ease-expo rotate-[-30deg] group-hover:rotate-0 group-hover:opacity-100">
            <ArrowUpRight size={15} aria-hidden="true" />
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="mb-4 flex items-center gap-3 font-mono text-[11px] tracking-wide text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={12} aria-hidden="true" />
              {post.date}
            </span>
            <span aria-hidden="true" className="text-white/20">
              /
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={12} aria-hidden="true" />
              {post.readTime}
            </span>
          </div>

          <h3 className="font-display text-lg font-semibold leading-snug tracking-tight transition-colors duration-base ease-smooth group-hover:text-primary">
            {post.title}
          </h3>
          <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>

          <Link
            to={`/blog/${post.id}`}
            className="group/link mt-6 inline-flex w-fit items-center gap-1.5 border-t border-white/[0.07] pt-5 text-sm font-medium text-primary transition-colors duration-base ease-smooth hover:text-primary/80"
          >
            Read article
            <ArrowUpRight
              size={15}
              aria-hidden="true"
              className="transition-transform duration-base ease-expo group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default BlogPost;
