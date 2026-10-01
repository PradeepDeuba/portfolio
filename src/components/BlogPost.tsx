
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import type { Post } from "@/data/posts";

interface BlogPostProps {
  post: Post;
  index: number;
}

const BlogPost = ({ post, index }: BlogPostProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  const titleVariants = {
    hover: {
      color: "hsl(var(--primary))",
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.article
      initial="initial"
      animate="animate"
      whileHover="hover"
      variants={cardVariants}
      className="group bg-card border border-border rounded-xl overflow-hidden flex flex-col h-full shadow-sm"
    >
      <div className="relative overflow-hidden w-full pt-[56.25%]">
        <div className="image-blur-wrapper absolute inset-0">
          <motion.img
            variants={imageVariants}
            src={post.image}
            alt={post.title}
            className={`absolute inset-0 w-full h-full object-cover ${
              imageLoaded ? "image-blur loaded" : "image-blur"
            }`}
            loading="lazy"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <motion.div 
          className="absolute top-3 left-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            delay: 0.2 + index * 0.1,
            duration: 0.4, 
            ease: "easeOut" 
          }}
        >
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/80 text-white backdrop-blur-sm">
            {post.category}
          </span>
        </motion.div>
      </div>

      <div className="flex flex-col flex-grow p-5">
        <motion.div 
          className="flex items-center text-xs text-muted-foreground mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            delay: 0.3 + index * 0.1,
            duration: 0.4 
          }}
        >
          <span className="flex items-center">
            <Calendar size={14} className="mr-1" /> {post.date}
          </span>
          <span className="mx-2">•</span>
          <span className="flex items-center">
            <Clock size={14} className="mr-1" /> {post.readTime}
          </span>
        </motion.div>

        <motion.h3 
          variants={titleVariants}
          className="text-xl font-semibold mb-3"
        >
          {post.title}
        </motion.h3>

        <motion.p 
          className="text-muted-foreground text-sm mb-4 flex-grow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            delay: 0.4 + index * 0.1,
            duration: 0.4 
          }}
        >
          {post.excerpt}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 0.5 + index * 0.1,
            duration: 0.4 
          }}
        >
          <Link
            to={`/blog/${post.id}`}
            className="inline-flex mt-auto items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors link-underline"
          >
            Read More
          </Link>
        </motion.div>
      </div>
    </motion.article>
  );
};

export default BlogPost;
