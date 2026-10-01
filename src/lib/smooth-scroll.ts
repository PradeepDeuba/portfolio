import type Lenis from "lenis";

/**
 * Holds the active Lenis instance so non-React code (route-change scroll reset)
 * can drive it without threading a context through the tree.
 *
 * Lenis works by calling window.scrollTo with an interpolated position each
 * frame rather than transforming a wrapper, which is why `position: sticky`,
 * IntersectionObserver and framer-motion's useScroll all keep working normally.
 */
let instance: Lenis | null = null;

export const setLenis = (value: Lenis | null): void => {
  instance = value;
};

export const getLenis = (): Lenis | null => instance;

/**
 * Jump to the top of the page.
 *
 * When Lenis is active, a bare window.scrollTo would be immediately overridden
 * by its interpolation, so the jump goes through Lenis instead. `immediate`
 * skips the smoothing — a route change should not animate the scroll position.
 */
export const scrollToTop = (immediate = true): void => {
  if (instance) {
    instance.scrollTo(0, { immediate });
    return;
  }
  window.scrollTo(0, 0);
};
