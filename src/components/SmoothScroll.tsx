import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { setLenis } from "@/lib/smooth-scroll";

/**
 * Momentum smooth-scrolling.
 *
 * This is the single biggest difference between how this kind of site feels and
 * a normal page: the scroll position eases toward the wheel input instead of
 * snapping to it. The reference site gets it from GSAP's ScrollSmoother.
 *
 * Implementation notes:
 * - Imported dynamically, so it is a separate chunk and is never downloaded at
 *   all when the user prefers reduced motion.
 * - Not instantiated under `prefers-reduced-motion`, where native scrolling is
 *   the correct behaviour.
 * - `syncTouch: false` leaves touch devices on native scrolling, which is what
 *   they expect and what keeps iOS momentum/bounce intact.
 * - Easing is easeOutQuint, matching the cubic-bezier(.22, 1, .36, 1) the
 *   reference uses — same family as this site's existing easeOutExpo token.
 */
const SmoothScroll = () => {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let frame = 0;
    let cancelled = false;

    void (async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;

      const instance = new Lenis({
        duration: 1.05,
        easing: (t: number) => 1 - Math.pow(1 - t, 5),
        smoothWheel: true,
        syncTouch: false,
        // Lets in-page anchors (the skip link) route through Lenis.
        anchors: true,
      });

      lenis = instance;
      setLenis(instance);

      const raf = (time: number) => {
        instance.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      setLenis(null);
      lenis?.destroy();
    };
  }, [reduceMotion]);

  return null;
};

export default SmoothScroll;
