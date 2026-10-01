import { useEffect, useRef } from "react";

interface ParticleBackgroundProps {
  color?: string;
  maxParticles?: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  directionX: number;
  directionY: number;
  opacity: number;
}

/**
 * Roughly one particle per 20,000px² of viewport.
 *
 * The previous formula was `width * height / (20000 / density)` with
 * density = 50, i.e. `width * height / 400` — 5,184 particles on a 1920x1080
 * screen, each issuing its own beginPath/arc/fill every frame (about 311,000
 * draw calls per second). The cap below keeps that bounded on large displays.
 */
const PX_PER_PARTICLE = 20000;
const MIN_PARTICLES = 20;
const DEFAULT_MAX_PARTICLES = 160;

/** Mobile browsers fire `resize` continuously while the URL bar collapses. */
const RESIZE_DEBOUNCE_MS = 150;

const buildParticles = (
  width: number,
  height: number,
  maxParticles: number
): Particle[] => {
  const count = Math.min(
    maxParticles,
    Math.max(MIN_PARTICLES, Math.round((width * height) / PX_PER_PARTICLE))
  );

  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 4 + 1,
    directionX: Math.random() * 0.4 - 0.2,
    directionY: Math.random() * 0.4 - 0.2,
    opacity: Math.random() * 0.5 + 0.2,
  }));
};

const ParticleBackground = ({
  color = "rgba(59, 130, 246, 0.1)",
  maxParticles = DEFAULT_MAX_PARTICLES,
}: ParticleBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let frameId: number | undefined;
    let resizeTimer: number | undefined;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const particle of particles) {
        particle.x += particle.directionX;
        particle.y += particle.directionY;

        // Wrap around canvas
        if (particle.x > width) particle.x = 0;
        if (particle.x < 0) particle.x = width;
        if (particle.y > height) particle.y = 0;
        if (particle.y < 0) particle.y = height;

        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    const loop = () => {
      draw();
      frameId = requestAnimationFrame(loop);
    };

    const stop = () => {
      if (frameId !== undefined) {
        cancelAnimationFrame(frameId);
        frameId = undefined;
      }
    };

    const start = () => {
      if (frameId !== undefined || prefersReducedMotion) return;
      frameId = requestAnimationFrame(loop);
    };

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      particles = buildParticles(width, height, maxParticles);

      // Reduced motion gets a single static frame instead of an animation.
      if (prefersReducedMotion) draw();
    };

    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, RESIZE_DEBOUNCE_MS);
    };

    // Don't rasterise an invisible canvas in a backgrounded tab.
    const handleVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

    resize();
    start();
    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stop();
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [color, maxParticles]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default ParticleBackground;
