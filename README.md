# Innovo — Portfolio

A dark-themed personal/studio portfolio built with Vite, React and shadcn-ui.

> The copy, project entries, blog posts, team members and contact details in this
> repository are still **template placeholders**. See
> [Placeholders to replace](#placeholders-to-replace) before publishing.

## Stack

| | |
|---|---|
| Build | Vite 5 |
| UI | React 18, TypeScript 5, Tailwind CSS 3, shadcn-ui (Radix UI) |
| Routing | react-router-dom 6 |
| Motion | framer-motion, tailwindcss-animate |
| Data | TanStack Query, react-hook-form + zod, recharts |
| Misc | lucide-react, sonner, next-themes |

## Getting started

Requires Node.js and npm ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)).

```sh
git clone <YOUR_GIT_URL>
cd portfolio
npm ci
npm run dev
```

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server on port 8080 with HMR |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | `tsc --noEmit` over the app and node projects |
| `npm run lint` | ESLint |

Note that `build` is `vite build` only — it does **not** type-check. Run
`npm run typecheck` (or wire it into CI) to catch type errors before they ship.

## Routes

`/`, `/about`, `/projects`, `/projects/:id`, `/blog`, `/blog/:id`, `/contact`,
`/legal`, and a catch-all that renders the 404 page.

## Project structure

```
src/
  data/            Content lives here — edit these, not the pages
    site.ts        Name, tagline, contact details, social links, nav items
    projects.ts    Project catalogue (+ featuredProjects, getProjectById)
    posts.ts       Blog catalogue (+ categories, getPostById)
  pages/           One component per route
  components/      Layout and feature components
    ui/            shadcn-ui primitives (upstream — avoid editing)
  hooks/           Shared hooks
  lib/             Utilities
```

Content is centralised in `src/data/`. The project list used to be duplicated
verbatim between the home page and the projects page, so the two could drift
apart; both now read from `src/data/projects.ts`.

## Placeholders to replace

Search the repo for `TODO` — everything marked is a placeholder:

| Location | Placeholder |
|---|---|
| `src/data/site.ts` | Site name, email, phone, address, social URLs |
| `src/data/projects.ts` | All 6 projects, and `githubUrl` which points at bare `https://github.com` |
| `src/data/posts.ts` | All 6 posts; `body` is empty, so `/blog/:id` shows only the excerpt |
| `src/pages/About.tsx` | Team members, stats ("200+ Projects"), stock photos |
| `src/pages/Contact.tsx` | Embedded Google Map (points at San Francisco) |
| `src/pages/Hero.tsx`, `src/pages/Index.tsx` | Hero and services copy |
| `index.html` | `og:url` / `og:image` use `https://example.com` — set your domain |
| `src/pages/Legal.tsx` | Stands in for privacy/terms/cookie policies; contains no real policy text |

`src/components/ContactForm.tsx` fakes a 1.5s submission and always reports
success — no message is actually sent. Wire it to a real endpoint before relying
on it.

## Deploying

The app is a single-page app with client-side routes, so the host must rewrite
all unknown paths to `/index.html`, otherwise deep links such as `/projects/ai-platform`
return a host-level 404.

- **Netlify** — add `public/_redirects` containing `/*  /index.html  200`
- **Vercel** — add a rewrite of `/(.*)` to `/index.html`
- **GitHub Pages** — copy `dist/index.html` to `dist/404.html` after building

`og:image` is at `public/og-image.png`.

## Lovable

This repository is connected to a Lovable project:
<https://lovable.dev/projects/79464821-ff6e-4b27-98ed-2a956fc49b19>

Changes made via Lovable are committed to this repo automatically, and pushed
changes are reflected back in Lovable. You can also edit files directly on
GitHub or in a Codespace.

To publish through Lovable, open the project and use **Share → Publish**. Lovable
does not support custom domains; their docs recommend Netlify
([Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)).

Because of this connection, `index.html` still loads
`https://cdn.gpteng.co/gptengineer.js` (Lovable's editor bridge) and carries a
comment saying not to remove it. That script also ships in production builds —
remove it once you stop editing through Lovable.

## Known issues

- `tsconfig.app.json` sets `strict: false`, `noUnusedLocals: false` and
  `noImplicitAny: false`, so `tsc` will not catch dead code or implicit `any`.
  Tightening these is worthwhile but will surface errors across `src/components/ui`.
- `npm audit` reports 23 vulnerabilities (3 low, 5 moderate, 15 high) inherited
  from the template's dependency ranges. Review with `npm audit` rather than
  running `npm audit fix` blind, which can pull breaking majors.
- The production bundle is a single ~526 kB chunk. Route-level `React.lazy`
  would cut the initial payload.
