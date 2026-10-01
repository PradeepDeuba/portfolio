/**
 * Single source of truth for site identity, contact details and navigation.
 *
 * The values below are the placeholders that shipped with the original
 * template. They are collected here so there is exactly one place to edit.
 * Anything marked `TODO` still needs your real value — see README.md.
 */
export const site = {
  name: "Innovo",
  tagline:
    "Creating innovative tech solutions with a focus on clean design, intuitive user experience, and cutting-edge technology.",

  /** TODO: replace with your real contact details. */
  contact: {
    email: "hello@innovo.com",
    phone: "+1 (555) 123-4567",
    phoneHref: "tel:+15551234567",
    address: "123 Innovation Drive, San Francisco, CA 94103",
  },

  /** TODO: replace with full URLs to your own profiles. */
  social: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },

  nav: [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ],
} as const;

/** Site URL used for absolute social/meta tags. TODO: set your production domain. */
export const SITE_URL = "";
