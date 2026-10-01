/**
 * The six design directions.
 *
 * Each one is a distinct *premise*, not a colour swap — they differ in
 * typography, surface treatment, shape language, decoration and motion
 * character. All of them share the same components, routes and content; the
 * differences live in the token blocks in src/index.css keyed by
 * `[data-theme="…"]`.
 *
 * This file only carries the metadata the switcher needs. Adding a theme means
 * adding an entry here and a matching token block in index.css.
 */
export type ThemeId =
  | "signal"
  | "circuit"
  | "terminal"
  | "editorial"
  | "brutalist"
  | "kinetic";

export interface ThemeMeta {
  id: ThemeId;
  label: string;
  /** One-line description shown in the switcher. */
  blurb: string;
  /** Which way the token block leans, shown as a hint in the UI. */
  mode: "dark" | "light";
  /** Two swatch colours used for the switcher preview dot. */
  swatch: [string, string];
}

export const THEMES: ThemeMeta[] = [
  {
    id: "circuit",
    label: "Circuit",
    blurb: "Embedded / PCB. Solder-mask green, copper accents, trace lines, mono type.",
    mode: "dark",
    swatch: ["#03110c", "#d98b4a"],
  },
  {
    id: "terminal",
    label: "Terminal",
    blurb: "CLI session. Phosphor green on near-black, scanlines, hard 0px corners.",
    mode: "dark",
    swatch: ["#020604", "#39ff88"],
  },
  {
    id: "editorial",
    label: "Editorial",
    blurb: "Print / Swiss. Warm paper, serif display type, ruled columns, zero glow.",
    mode: "light",
    swatch: ["#f7f4ee", "#b3341f"],
  },
  {
    id: "brutalist",
    label: "Brutalist",
    blurb: "Anti-design. Flat white, 3px black borders, hard offset shadows, system sans.",
    mode: "light",
    swatch: ["#ffffff", "#1a1aff"],
  },
  {
    id: "kinetic",
    label: "Kinetic",
    blurb: "Type-led dark. Glass panels, gradient accents, large kinetic headlines.",
    mode: "dark",
    swatch: ["#06070b", "#8b5cf6"],
  },
  {
    id: "signal",
    label: "Signal",
    blurb:
      "Near-black, one chartreuse accent, high-contrast serif display over a neutral sans, hairlines only. Typography does all the work.",
    mode: "dark",
    swatch: ["#08090a", "#d9ff5b"],
  },
];

export const DEFAULT_THEME: ThemeId = "signal";

export const isThemeId = (value: string | null | undefined): value is ThemeId =>
  !!value && THEMES.some((theme) => theme.id === value);
