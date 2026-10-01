/**
 * Ambient background: drifting aurora fields, a technical grid and film grain.
 *
 * Deliberately CSS-only. The previous implementation was a canvas particle
 * field driven by requestAnimationFrame, which held a main-thread loop open for
 * the whole session and was only mounted on the home page. Everything here is
 * composited by the GPU from a single static texture, so it costs no JavaScript
 * per frame, and it is mounted once at the app level so every route shares it.
 *
 * Reduced motion: the drift animations are cancelled by the global guard in
 * index.css, leaving a static gradient field.
 */
const AmbientBackground = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
  >
    {/* Technical grid, masked so it fades out before reaching the content. */}
    <div className="absolute inset-0 grid-overlay opacity-60" />

    {/* Aurora fields. transform-only animation keeps these on the compositor. */}
    <div className="absolute -left-[12%] -top-[28%] h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--azure)/0.20),transparent_62%)] blur-3xl [will-change:transform] animate-drift-a" />
    <div className="absolute -right-[14%] top-[6%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--iris)/0.18),transparent_62%)] blur-3xl [will-change:transform] animate-drift-b" />
    <div className="absolute bottom-[-18%] left-[24%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--plasma)/0.14),transparent_62%)] blur-3xl [will-change:transform] animate-drift-a" />

    {/* Top light beam — anchors the hero without adding a scroll cost. */}
    <div className="absolute inset-x-0 top-0 h-64 bg-[linear-gradient(180deg,hsl(var(--azure)/0.10),transparent)]" />

    {/* Vignette keeps the edges dark so long pages do not read as flat. */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,transparent_35%,hsl(var(--background))_100%)]" />
  </div>
);

export default AmbientBackground;
