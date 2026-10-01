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
  data/                 Content lives here — edit these, not the pages
    site.ts             Name, tagline, contact details, social links, nav, SITE_URL
    projects.ts         Project catalogue (+ featuredProjects, getProjectById)
    posts.ts            Blog catalogue (+ categories, getPostById)
  pages/                One component per route
  components/
    ui/                 shadcn-ui primitives (upstream — avoid editing)
    AmbientBackground   Fixed aurora + grid + grain backdrop (CSS only)
    Reveal              Scroll-triggered entrance wrapper
    Marquee             Seamless two-half transform marquee
    SectionLabel        Bracketed monospace eyebrow
    SectionHeading      Shared eyebrow/title/description block
    PageHeader          Shared inner-page header (auto-numbered from site.nav)
    KineticText         Word-by-word masked headline reveal
    Parallax            Scroll-linked translate wrapper
    MagneticButton      Pointer-attracted CTA wrapper
    WorkIndex           Numbered project index with pointer-following preview
    RouteShutter        Accent sweep played on each navigation
    CopyEmail           Click-to-copy email micro-interaction
    PageTransition      Route cross-fade
    Navbar / Footer / Hero / ProjectCard / BlogPost / CustomCursor / ContactForm
  hooks/
    use-media-query.ts  useMediaQuery / useFinePointer
    use-toast.ts        Toast store
  lib/
    motion.ts           Motion tokens (durations, easings, variants)
    utils.ts            cn()
```

Content is centralised in `src/data/`. The project list used to be duplicated
verbatim between the home page and the projects page, so the two could drift
apart; both now read from `src/data/projects.ts`.

## Design system

Visual direction: dark, technical, editorial — oversized display type, monospace
labels, hairline borders and gradient accents. (Inspired by the layout
principles of milancompain.com; no branding, copy or assets were taken from it.)

**Tokens** live in `src/index.css` and are surfaced through `tailwind.config.ts`:

| Token | Purpose |
|---|---|
| `--azure` `--iris` `--plasma` `--cyan` | Gradient stops and glow sources |
| `--line` | Hairline used by the technical grid overlay |
| `--ease-expo` / `--ease-smooth` | The only two easings used in the app |
| `duration-fast/base/slow` | 150 / 250 / 450 ms |
| `display-xl…sm` | Fluid `clamp()` type scale — no heading breakpoints |

**Utility classes:** `.label-mono`, `.text-gradient`, `.panel`, `.grid-overlay`,
`.grain`, `.glow-card`, `.link-underline`, `.marquee-mask`, `.hides-scrollbar`,
`.tnum`.

Motion tokens are mirrored in `src/lib/motion.ts` so JS and CSS animations stay
in step.

## Motion

| Effect | Where | How it degrades |
|---|---|---|
| Word-by-word headline reveal | Hero, all section/page headings | Reduced motion: opacity only |
| Scroll-linked parallax | Hero visual | Reduced motion: `y` pinned to 0 |
| Magnetic CTAs | Hero, section actions | Coarse pointer or reduced motion: plain wrapper |
| Pointer-following project preview | Home + Projects list view | Coarse pointer or reduced motion: inline thumbnails per row |
| Contextual cursor labels (`data-cursor`) | Work index, cards, project links | No custom cursor at all |
| Route shutter sweep | Every navigation | Not rendered |
| Page cross-fade | Every route | Shorter, transform dropped |
| Marquees | Tech strip, footer wordmark | Parked at origin (global CSS guard) |
| Scroll progress bar | Header | Not rendered |

## Motion and performance

- Only `transform`, `opacity` and `border-color` are animated. Nothing animates
  `box-shadow`, `width`, `height` or `top/left`, all of which force layout or paint.
- The hover glow on cards is a pseudo-element whose **opacity** transitions, not a
  `box-shadow` that would repaint each frame.
- The background is pure CSS: static gradients and a grid, animated with
  `translate3d`. It replaced a canvas particle field that held a
  `requestAnimationFrame` loop open for the whole session.
- Marquees duplicate their row once and translate a `w-max` track by `-50%`, so
  the loop is seamless and the duplicate is `aria-hidden`.
- Fonts moved from a blocking `@import` in CSS to a `<link>` in `index.html`
  behind two `preconnect` hints.
- Card and hero images use `loading="lazy"` + `decoding="async"`, with a blur-up
  fade on load.
- Removed `@tanstack/react-query` (mounted but never queried) and `next-themes`
  (used only to compute a value that was always overridden). Bundle:
  **525 kB → 477 kB** (164 kB → 148 kB gzipped).

## Accessibility

- `prefers-reduced-motion` is respected twice over: a global CSS guard
  neutralises CSS animation/transition and parks marquees, while every
  framer-motion animation checks `useReducedMotion()` and drops its transform.
- The custom cursor only mounts on `(hover: hover) and (pointer: fine)` with
  reduced motion *not* requested, and the native cursor is hidden only while it
  is actually rendered.
- Skip-to-content link, one `<nav aria-label="Primary">` landmark, `aria-current`
  on the active route, `aria-expanded`/`aria-controls` on the menu toggle,
  Escape to close with focus returned to the toggle, and body scroll lock.
- Decorative layers (background, cursor, marquees, hero visual) are
  `aria-hidden`; every image has meaningful `alt`.
- Visible `:focus-visible` ring on all interactive elements.

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

This is a single-page app with client-side routes, so the host must serve
`index.html` for unknown paths, otherwise deep links such as
`/projects/ai-platform` return a host-level 404 even though the route exists.
Both mechanisms are already in the repo:

- **Netlify / Cloudflare Pages** — `public/_redirects` (`/*  /index.html  200`)
- **GitHub Pages** — `dist/404.html`, emitted automatically as a copy of
  `index.html` by the `spaFallback404` plugin in `vite.config.ts`

`og:image` is at `public/og-image.png`.

### Building for a sub-path

`base` is read from `VITE_BASE_PATH` (default `/`), and the router derives its
`basename` from the same value via `import.meta.env.BASE_URL`, so one source
tree serves both a domain root and a project sub-path:

```sh
npm run build                          # base "/" — for pradeepdeuba.com.np
VITE_BASE_PATH=/portfolio/ npm run build   # base "/portfolio/" — for a Pages project site
```

### Temporary preview (GitHub Pages)

A throwaway preview is published from the **`gh-pages`** branch at
**<https://pradeepdeuba.github.io/portfolio/>**. It is generated output only —
`dist/` plus `.nojekyll` — and is force-pushed, so it never needs merging and
`main` stays the source of truth.

To refresh it after a change:

```sh
VITE_BASE_PATH=/portfolio/ npm run build
# then publish dist/ to the gh-pages branch
```

To remove it entirely, delete the branch and disable Pages:

```sh
git push origin --delete gh-pages
gh api -X DELETE repos/PradeepDeuba/portfolio/pages
```

Note that GitHub Pages serves deep links with an HTTP 404 status (the body is
the SPA shell, so the app still boots and routes correctly). A host with
`_redirects` returns 200 for the same URL — one reason the production deploy
should not be GitHub Pages.

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
  `noImplicitAny: false`, so `tsc` will not catch dead code or implicit `any`
  in that project. All *app* code compiles clean under `strict` +
  `noUncheckedIndexedAccess`; the shadcn files in `src/components/ui` do not.
- `npm audit` reports vulnerabilities inherited from the template's dependency
  ranges. Most are build-time only (`vite`, `rollup`, `esbuild`, `browserslist`,
  `ajv`, `js-yaml`, `flatted`). The one that actually reaches the browser is
  **`react-router-dom@6.27.0`** (open-redirect / XSS advisories); a patched
  **6.30.6** exists and upgrading stays within the major version. Most of the
  reported count comes from `tailwindcss-animate` being listed in
  `dependencies` rather than `devDependencies`, which drags the Tailwind build
  toolchain into the production tree.
- **44 of the 49 files in `src/components/ui` are unreachable** from
  `src/main.tsx`, as are 36 of the 50 declared dependencies. They are left in
  place deliberately — they are regenerable upstream code and removing them is
  a separate decision. Note the coupling: the unused Radix packages cannot be
  dropped without first deleting the unused `ui/` files that import them.
- The production bundle is a single ~477 kB chunk (148 kB gzipped).
  Route-level `React.lazy` would cut the initial payload, since `framer-motion`
  and the Radix primitives are only needed once a page renders.
- `src/pages/Contact.tsx` embeds a Google Map `<iframe>` that loads on every
  visit to that route.
