/**
 * Site identity and contact details — real values, taken from the live
 * portfolio's Supabase `hero_content` / `education` tables.
 *
 * Nothing here is invented. Fields that had no real value in the source data
 * are omitted rather than filled with a placeholder, so nothing on the site
 * links somewhere that doesn't exist.
 */
export const site = {
  name: "Pradeep Deuba",
  /** From hero_content.title */
  title: "IoT Developer & Full Stack Engineer",
  /** From hero_content.description */
  tagline:
    "Based in Kathmandu, Nepal. I specialize in IoT development, frontend and backend technologies, creating innovative solutions for the digital world.",

  location: "Kathmandu, Nepal",
  /** From hero_content.image_url */
  portrait: "https://i.imgur.com/v5XPH7T.jpeg",

  contact: {
    /** From the site's contact handler */
    email: "pradeepdeuba68@gmail.com",
  },

  /**
   * hero_content also carried `linkedin_url: "https://linkedin.com/"` — the bare
   * domain, i.e. not a real profile — so LinkedIn is deliberately left out
   * rather than shipped as a dead link. Add it here once there's a real URL.
   */
  social: {
    github: "https://github.com/PradeepDeuba68",
    facebook: "https://facebook.com/pradeep.deuba.2025",
  },

  /** From the `education` table. */
  education: [
    {
      degree: "Bachelor in Information Technology",
      field: "IT",
      school: "Texas College of Management & IT",
      location: "Chabahil, Kathmandu",
      period: "2021 — 2025",
    },
  ],

  nav: [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Blog", path: "/blog" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ],
} as const;

/** Canonical production origin, used for absolute links and meta tags. */
export const SITE_URL = "https://pradeepdeuba.com.np";
