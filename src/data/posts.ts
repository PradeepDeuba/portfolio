/**
 * Blog catalogue.
 *
 * TODO: every post below is template placeholder copy. Replace the titles,
 * excerpts, dates and images with your own, and fill in `body` — the
 * /blog/:id detail page renders `body` when present and falls back to the
 * excerpt when it is not, so nothing is invented for you.
 */
export interface Post {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
  /** Optional article paragraphs rendered on /blog/:id. */
  body?: string[];
}

export const posts: Post[] = [
  {
    id: "future-of-ai",
    title: "The Future of AI in Software Development",
    excerpt:
      "Exploring how artificial intelligence is transforming the way we build and maintain software applications.",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    date: "October 15, 2023",
    readTime: "8 min read",
    category: "AI",
  },
  {
    id: "ux-design-principles",
    title: "Essential UX Design Principles for Modern Applications",
    excerpt:
      "Key design principles that can significantly improve user experience and engagement in digital products.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800",
    date: "September 28, 2023",
    readTime: "6 min read",
    category: "Design",
  },
  {
    id: "cloud-security",
    title: "Cloud Security Best Practices for Enterprise Applications",
    excerpt:
      "Comprehensive guide to implementing robust security measures for cloud-based enterprise applications.",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=800",
    date: "September 12, 2023",
    readTime: "10 min read",
    category: "Security",
  },
  {
    id: "microservices",
    title: "Adopting Microservices Architecture: Benefits and Challenges",
    excerpt:
      "An in-depth look at the advantages and potential pitfalls of migrating to a microservices architecture.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
    date: "August 29, 2023",
    readTime: "7 min read",
    category: "Architecture",
  },
  {
    id: "typescript-tips",
    title: "Advanced TypeScript Tips for React Developers",
    excerpt:
      "Practical TypeScript techniques to enhance type safety and developer experience in React applications.",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
    date: "August 15, 2023",
    readTime: "9 min read",
    category: "Development",
  },
  {
    id: "performance-optimization",
    title: "Web Performance Optimization Techniques",
    excerpt:
      "Strategies and tools to improve the loading speed and runtime performance of web applications.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    date: "July 22, 2023",
    readTime: "5 min read",
    category: "Performance",
  },
];

export const categories: string[] = Array.from(
  new Set(posts.map((post) => post.category))
);

export const getPostById = (id?: string): Post | undefined =>
  posts.find((post) => post.id === id);
