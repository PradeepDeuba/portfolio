import { useEffect, useState } from "react";

/**
 * Subscribe to a CSS media query.
 *
 * Used to gate pointer-dependent effects (hover previews, magnetic buttons,
 * the custom cursor) rather than sniffing user agents. Always returns `false`
 * on the first render so that server-rendered or pre-hydration markup matches
 * the no-effect branch.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const list = window.matchMedia(query);
    const update = () => setMatches(list.matches);

    update();
    list.addEventListener("change", update);
    return () => list.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/** True only for devices with a real pointer, e.g. a mouse or trackpad. */
export const useFinePointer = () => useMediaQuery("(hover: hover) and (pointer: fine)");
