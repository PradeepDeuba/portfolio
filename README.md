# pradeepdeuba.com.np

Personal portfolio for **Pradeep Deuba** — IoT developer and full stack engineer,
Kathmandu, Nepal. Built with Vite, React and Tailwind.

All content is real: the bio, education, projects, repositories and the four
blog posts come from the live site's Supabase tables. Nothing is placeholder.

## Five design directions, one codebase

The site ships as **five switchable themes** so the direction can be chosen on
the real content rather than from mockups. A floating switcher (bottom-right)
changes between them; the choice is remembered in `localStorage`.

| Theme | Premise |
|---|---|
| **Circuit** | Embedded / PCB — solder-mask green, copper accents, mono headings, 2px corners |
| **Terminal** | CLI session — phosphor green on near-black, all-monospace, scanlines, 0px corners |
| **Editorial** | Print / Swiss — warm paper, serif throughout, ruled columns, no gradient or glow |
| **Brutalist** | Anti-design — flat white, 3px black rules, hard offset shadows, system sans |
| **Kinetic** | Type-led dark — glass panels, gradient accents, large kinetic headlines |

How it works: every colour, font, radius and shadow is a CSS variable, and each
theme re-declares that set under `[data-theme="…"]` in `src/index.css`.
`ThemeProvider` writes one attribute on `<html>`:

```
localStorage["portfolio-theme"] → <html data-theme="circuit">
```

So switching costs one attribute write and nothing re-renders. An inline script
in `index.html` applies the saved theme before first paint, so it doesn't flash
the default. Decoration (grid, aurora, scanline, grain) is rendered once and
each theme reveals only its own layer in CSS — hidden layers are `display: none`,
so they don't even animate.

**To settle on one direction**, delete `src/components/ThemeSwitcher.tsx`, its
render site in `App.tsx`, and `src/lib/themes.ts`; keep the token block you want.

## Stack

| | |
|---|---|
| Build | Vite 5 |
| UI | React 18, TypeScript 5, Tailwind CSS 3 |
| Routing | react-router-dom 6 |
| Motion | framer-motion |
| Content | Local data modules, rendered from real source data |
| Markdown | `src/lib/markdown.tsx` — purpose-built, no dependency |

## Getting started

```sh
npm ci
npm run dev
```

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server on `localhost:8080` with HMR |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` over the app and node projects |
| `npm run lint` | ESLint |

`build` is `vite build` only — it does **not** type-check. Run `npm run typecheck`
in CI so type errors can't ship.

## Routes

`/`, `/about`, `/projects`, `/projects/:id`, `/blog`, `/blog/:id`, `/contact`,
`/legal`, and a catch-all rendering the 404 page.

## Project structure

```
src/
  data/                 Content — edit these, not the pages
    site.ts             Identity, contact, socials, education, nav
    projects.ts         4 real projects (+ featuredProjects, allTags, getProjectById)
    posts.ts            4 real posts, markdown bodies verbatim (GENERATED — see below)
  pages/                One component per route
  components/
    ui/                 shadcn-ui primitives (upstream — avoid editing)
    ThemeProvider       Applies data-theme to <html>
    ThemeSwitcher       Floating direction picker (review aid — removable)
    AmbientBackground   Grid / aurora / scanline / grain, one layer per theme
    Reveal              Scroll-triggered entrance
    KineticText         Word-by-word masked headline reveal
    Parallax            Scroll-linked translate
    MagneticButton      Pointer-attracted CTA
    WorkIndex           Numbered project index with pointer-following preview
    Marquee             Seamless two-half transform marquee
    SectionLabel        Bracketed monospace eyebrow
    SectionHeading      Shared eyebrow/title/description
    PageHeader          Shared inner-page header (auto-numbered from site.nav)
    RouteShutter        Accent sweep per navigation
    CopyEmail           Click-to-copy email
    PageTransition      Route cross-fade
    Navbar / Footer / Hero / ProjectCard / BlogPost / CustomCursor / ContactForm
  hooks/                use-media-query, use-toast
  lib/
    themes.ts           Theme metadata (5 directions)
    theme-context.ts    Theme context + useTheme
    markdown.tsx        Markdown renderer for the real post bodies
    motion.ts           Motion tokens (durations, easings, variants)
    utils.ts            cn()
```

### Regenerating posts

`src/data/posts.ts` is generated from the live Supabase `posts` table — titles,
excerpts, cover images, read times, dates and markdown bodies are copied
verbatim. It is checked in so the build has no runtime dependency on Supabase.

The one field that is not from the source data is `topics`: the table has no
category column, so those are editorial groupings. Change them freely.

## Motion

| Effect | Where | Degrades to |
|---|---|---|
| Word-by-word headline reveal | Hero, all headings | Opacity only |
| Scroll parallax | Hero portrait, section visuals | `y` pinned to 0 |
| Magnetic CTAs | Hero, section actions | Plain wrapper (coarse pointer) |
| Pointer-following preview | Work index | Inline thumbnails per row |
| Contextual cursor labels | Work index, cards | No custom cursor at all |
| Route shutter sweep | Every navigation | Not rendered |
| Marquees | Tech strip, footer | Parked at origin |
| Ambient layers | Grid / aurora / scanline | Static gradients |

## Performance

- Only `transform`, `opacity` and `border-color` are animated. Nothing animates
  `box-shadow`, `width`, `height` or `top/left`.
- Card hover transitions the *opacity of a masked pseudo-element* rather than a
  box-shadow, so hover never repaints.
- The ambient background is CSS-only. It replaced a canvas particle field that
  held a `requestAnimationFrame` loop open for the whole session.
- Marquees translate a `w-max` track by `-50%` in two halves, so the loop is
  seamless; the duplicate half is `aria-hidden`.
- Fonts load via `<link>` behind two `preconnect` hints rather than a blocking
  `@import`. Editorial and brutalist use system serif/sans stacks — no extra
  request at all.
- The markdown renderer is ~150 lines of local code instead of
  react-markdown + remark-gfm (~50 kB gzipped) for constructs the content
  doesn't use.
- Bundle: 500 kB JS (157 kB gzipped), 89 kB CSS (16 kB gzipped).

## Accessibility

- `prefers-reduced-motion` is handled at both layers: a global CSS guard
  neutralises CSS animation/transition and parks marquees, while every
  framer-motion animation checks `useReducedMotion()` and drops its transform.
- The custom cursor and the magnetic/pointer effects only mount for
  `(hover: hover) and (pointer: fine)` without reduced motion.
- The native cursor is hidden only while the custom cursor actually renders.
- Skip-to-content link; one `<nav aria-label="Primary">` landmark;
  `aria-current` on the active route; `aria-expanded` + `aria-controls` on the
  menu and switcher toggles; Escape closes the menu with focus returned.
- Decorative layers (background, cursor, marquees, hero visual) are
  `aria-hidden`; every content image has meaningful `alt`.

## Deploying

Client-side routed SPA, so the host must serve `index.html` for unknown paths or
deep links 404. Both mechanisms are already in the repo:

- **Netlify / Cloudflare Pages** — `public/_redirects` (`/*  /index.html  200`),
  plus `public/_headers` for security headers and asset caching.
- **GitHub Pages** — `dist/404.html`, emitted by the `spaFallback404` plugin in
  `vite.config.ts`. Note Pages serves deep links with an HTTP 404 status.

`base` is read from `VITE_BASE_PATH` (default `/`), and the router derives its
`basename` from `import.meta.env.BASE_URL`, so one tree builds for either a
domain root or a sub-path:

```sh
npm run build                               # base "/" — for pradeepdeuba.com.np
VITE_BASE_PATH=/portfolio/ npm run build    # base "/portfolio/" — Pages project site
```

### Temporary preview

Published from the **`gh-pages`** branch at
**<https://pradeepdeuba.github.io/portfolio/>** — generated output only, force
pushed, never merged. `main` stays the source of truth.

```sh
git push origin --delete gh-pages
gh api -X DELETE repos/PradeepDeuba/portfolio/pages
```

## Known issues

- `tsconfig.app.json` sets `strict: false`, `noUnusedLocals: false` and
  `noImplicitAny: false`. All *app* code compiles clean under `strict` +
  `noUncheckedIndexedAccess`; the shadcn files in `src/components/ui` do not.
- **44 of the 49 files in `src/components/ui` are unreachable** from
  `src/main.tsx`, as are 36 of the 50 declared dependencies. Left in place
  deliberately — they are regenerable upstream code. Note the coupling: the
  unused Radix packages can't be dropped without first deleting the unused
  `ui/` files that import them.
- `npm audit` reports vulnerabilities inherited from the template. Most are
  build-time only. The one that reaches the browser is
  **`react-router-dom@6.27.0`** (open-redirect / XSS); a patched **6.30.6**
  exists and upgrading stays within the major version.
- `src/components/ContactForm.tsx` **simulates** its submission — it waits 1.5 s
  and always reports success. It sends nothing. Wire it to a real endpoint.
- `og:image` points at the portrait (a 4:5 source). A purpose-made 1200×630 crop
  would give better link previews.
- `favicon.ico` is a single 16×16 icon — no 32×32, `apple-touch-icon` or web
  manifest.
- `src/pages/Legal.tsx` contains no real policy text.
