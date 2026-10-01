/**
 * Project catalogue.
 *
 * Previously this array was duplicated verbatim in `pages/Index.tsx` and
 * `pages/Projects.tsx`, so the two lists could drift apart. It now lives here
 * and both pages (plus the /projects/:id detail page) read from it.
 *
 * TODO: `githubUrl` below is the template placeholder ("https://github.com").
 * Point it at the real repository, or set it to `undefined` to hide the icon.
 * `demoUrl` is an in-app route and resolves to the detail page.
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  /** In-app route for the detail page. */
  demoUrl?: string;
  /** External repository link. */
  githubUrl?: string;
  /**
   * Optional long-form sections rendered on /projects/:id.
   * Left empty in the template — add your own copy and the page picks it up.
   */
  overview?: string[];
}

export const projects: Project[] = [
  {
    id: "ai-platform",
    title: "AI Research Platform",
    description:
      "A collaborative platform for AI researchers to share models, datasets, and findings with an intuitive interface.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    tags: ["React", "TensorFlow", "API"],
    demoUrl: "/projects/ai-platform",
    githubUrl: "https://github.com",
  },
  {
    id: "fintech-dashboard",
    title: "FinTech Analytics Dashboard",
    description:
      "Real-time financial analytics dashboard with predictive modeling and customizable visualization tools.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    tags: ["TypeScript", "D3.js", "Node.js"],
    demoUrl: "/projects/fintech-dashboard",
    githubUrl: "https://github.com",
  },
  {
    id: "iot-platform",
    title: "IoT Management Platform",
    description:
      "Secure platform for managing IoT devices across industrial settings with real-time monitoring capabilities.",
    image:
      "https://images.unsplash.com/photo-1563770660941-3bdc58a5a55c?auto=format&fit=crop&q=80&w=800",
    tags: ["React", "MQTT", "GraphQL"],
    demoUrl: "/projects/iot-platform",
    githubUrl: "https://github.com",
  },
  {
    id: "health-app",
    title: "Health Monitoring App",
    description:
      "Mobile application for tracking health metrics with personalized insights and healthcare provider integration.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    tags: ["React Native", "HealthKit", "Firebase"],
    demoUrl: "/projects/health-app",
    githubUrl: "https://github.com",
  },
  {
    id: "ecommerce-platform",
    title: "E-commerce Platform",
    description:
      "Scalable e-commerce solution with advanced inventory management and powerful analytics capabilities.",
    image:
      "https://images.unsplash.com/photo-1629397586330-ced1d0e4f8bf?auto=format&fit=crop&q=80&w=800",
    tags: ["Next.js", "PostgreSQL", "Stripe"],
    demoUrl: "/projects/ecommerce-platform",
    githubUrl: "https://github.com",
  },
  {
    id: "education-portal",
    title: "Education Portal",
    description:
      "Interactive learning platform with progress tracking, assessments, and collaborative learning spaces.",
    image:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800",
    tags: ["Vue.js", "Express", "MongoDB"],
    demoUrl: "/projects/education-portal",
    githubUrl: "https://github.com",
  },
];

/** Projects shown on the home page. */
export const featuredProjects = projects.slice(0, 3);

export const getProjectById = (id?: string): Project | undefined =>
  projects.find((project) => project.id === id);
