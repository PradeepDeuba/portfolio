import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

/**
 * Emits dist/404.html as a copy of dist/index.html.
 *
 * Needed for any host that has no rewrite support: GitHub Pages serves
 * 404.html for unknown paths, so a deep link such as /portfolio/projects/ai-platform
 * boots the SPA (which then resolves the route) instead of showing a host error
 * page. Netlify and Cloudflare Pages ignore this file in favour of
 * public/_redirects, so it is harmless there.
 */
function spaFallback404() {
  return {
    name: "spa-fallback-404",
    apply: "build" as const,
    closeBundle() {
      const outDir = path.resolve(__dirname, "dist");
      const index = path.join(outDir, "index.html");
      if (fs.existsSync(index)) {
        fs.copyFileSync(index, path.join(outDir, "404.html"));
      }
    },
  };
}

/**
 * `base` is configurable so the same source can be built for a domain root
 * (`/`, the default) or for a sub-path preview such as GitHub Pages
 * (`/portfolio/`). The router reads the same value via import.meta.env.BASE_URL,
 * so no code changes are needed between the two targets.
 */
const base = process.env.VITE_BASE_PATH || "/";

export default defineConfig(() => ({
  base,
  server: {
    // Loopback only: the default "::" also exposed the dev server to the LAN.
    host: "localhost",
    port: 8080,
  },
  preview: {
    host: "localhost",
    port: 4173,
  },
  plugins: [react(), spaFallback404()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
