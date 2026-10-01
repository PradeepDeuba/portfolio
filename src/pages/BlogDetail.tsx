import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import PageTransition from "../components/PageTransition";
import BlogPost from "../components/BlogPost";
import NotFound from "./NotFound";
import { getPostById, posts } from "@/data/posts";

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const post = getPostById(id);

  if (!post) {
    return <NotFound />;
  }

  const related = posts.filter((item) => item.id !== post.id).slice(0, 3);

  return (
    <PageTransition>
      <main className="pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-10"
          >
            <ArrowLeft size={16} /> All Articles
          </Link>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-5">
              {post.category}
            </span>

            <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-6">
              {post.title}
            </h1>

            <div className="flex items-center text-sm text-muted-foreground mb-10">
              <span className="flex items-center">
                <Calendar size={14} className="mr-1" /> {post.date}
              </span>
              <span className="mx-2">&bull;</span>
              <span className="flex items-center">
                <Clock size={14} className="mr-1" /> {post.readTime}
              </span>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-border aspect-video mb-10">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-lg text-foreground/90 leading-relaxed mb-6">
              {post.excerpt}
            </p>

            {post.body?.map((paragraph, index) => (
              <p
                key={index}
                className="text-muted-foreground leading-relaxed mb-6"
              >
                {paragraph}
              </p>
            ))}
          </motion.article>
        </div>

        {related.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 lg:px-10 mt-24">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-10">
              More Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((item, index) => (
                <BlogPost key={item.id} post={item} index={index} />
              ))}
            </div>
          </section>
        )}
      </main>
    </PageTransition>
  );
};

export default BlogDetail;
