import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { site } from "@/data/site";
import { EASE_EXPO } from "@/lib/motion";

const SESSION_KEY = "portfolio-intro-shown";

/**
 * Intro curtain, matching the full-screen overlay the reference site mounts at
 * z-index 9998 before revealing the page.
 *
 * Deliberately restrained:
 * - Plays at most once per browser session. Returning to the tab or navigating
 *   between routes never replays it.
 * - Never renders under `prefers-reduced-motion`.
 * - Fixed ~1s timeline rather than waiting on load events, so a slow image can
 *   never hold the page hostage.
 * - `aria-hidden` and pointer-events-free, so it delays nothing for screen
 *   readers or keyboard users — content underneath is already interactive.
 */
const IntroCurtain = () => {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;

    let seen = false;
    try {
      seen = window.sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      /* private mode: treat as not seen, the curtain still only mounts once */
    }
    if (seen) return;

    setVisible(true);
    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* non-fatal */
    }

    const timer = window.setTimeout(() => setVisible(false), 1050);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.75, ease: EASE_EXPO }}
          className="pointer-events-none fixed inset-0 z-[9998] flex flex-col justify-between bg-background px-6 py-8 sm:px-10"
        >
          <span className="label-mono">{site.name}</span>

          <div className="flex items-end justify-between gap-6">
            <p className="max-w-xs font-display text-lg leading-snug text-muted-foreground sm:text-xl">
              {site.title}
            </p>
            <p className="label-mono">Loading</p>
          </div>

          {/* Progress rail — a 1s linear fill, not tied to real load progress
              so it can never stall. */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: "linear" }}
            className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-iris"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroCurtain;
