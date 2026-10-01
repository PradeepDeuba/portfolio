/**
 * Ambient background.
 *
 * Every layer is rendered once and each theme reveals only its own via CSS
 * (`[data-theme="…"] .fx-* { display: none }` in index.css). Doing it in CSS
 * rather than React means switching themes never re-renders this tree, and
 * hidden layers cost nothing — `display: none` also stops their animations.
 *
 * Which theme shows what:
 *   circuit   grid + grain
 *   terminal  CRT scanline
 *   editorial nothing
 *   brutalist nothing
 *   kinetic   grid + aurora + grain
 *
 * All motion is transform-only, so it stays on the compositor. Under
 * prefers-reduced-motion the global CSS guard cancels the animations and hides
 * the scanline.
 */
const AmbientBackground = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
  >
    {/* Fine technical grid */}
    <div className="fx-grid absolute inset-0 opacity-60" />

    {/* Aurora fields */}
    <div className="fx-aurora absolute -left-[12%] -top-[28%] h-[42rem] w-[42rem] bg-[radial-gradient(circle_at_center,hsl(var(--azure)/0.20),transparent_62%)] animate-drift-a" />
    <div className="fx-aurora absolute -right-[14%] top-[6%] h-[38rem] w-[38rem] bg-[radial-gradient(circle_at_center,hsl(var(--iris)/0.18),transparent_62%)] animate-drift-b" />
    <div className="fx-aurora absolute bottom-[-18%] left-[24%] h-[34rem] w-[34rem] bg-[radial-gradient(circle_at_center,hsl(var(--plasma)/0.14),transparent_62%)] animate-drift-a" />

    {/* CRT scanline sweep */}
    <div className="fx-scan absolute inset-x-0" />

    {/* Top light beam — anchors the hero on the dark themes */}
    <div className="absolute inset-x-0 top-0 h-64 bg-[linear-gradient(180deg,hsl(var(--azure)/0.08),transparent)]" />

    {/* Vignette fades the edges back to the theme background */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,transparent_38%,hsl(var(--background))_100%)]" />
  </div>
);

export default AmbientBackground;
