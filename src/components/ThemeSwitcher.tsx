import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Palette, X } from "lucide-react";
import { THEMES } from "@/lib/themes";
import { useTheme } from "@/lib/theme-context";
import { cn } from "@/lib/utils";
import { EASE_EXPO } from "@/lib/motion";

/**
 * Floating theme switcher.
 *
 * This exists so the five design directions can be compared on the real site
 * with real content, rather than from screenshots. It is the only piece of UI
 * here that is not part of the portfolio itself — delete this component, its
 * render site in App.tsx and the ThemeProvider if you settle on one direction.
 *
 * Rendered outside PageTransition so it persists across navigation, and above
 * the nav sheet so it stays reachable while the mobile menu is open.
 */
export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const current = THEMES.find((item) => item.id === theme) ?? THEMES[0];

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="fixed bottom-4 right-4 z-[80] sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="theme-panel"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 12, scale: reduceMotion ? 1 : 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : 8, scale: reduceMotion ? 1 : 0.98 }}
            transition={{ duration: reduceMotion ? 0.15 : 0.28, ease: EASE_EXPO }}
            className="panel mb-3 w-[min(20rem,calc(100vw-2rem))] overflow-hidden shadow-lift"
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <p className="label-mono">Design direction</p>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  toggleRef.current?.focus();
                }}
                aria-label="Close theme switcher"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <X size={15} aria-hidden="true" />
              </button>
            </div>

            <ul className="max-h-[60vh] overflow-y-auto p-2" role="list">
              {THEMES.map((item) => {
                const isActive = item.id === theme;

                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setTheme(item.id)}
                      aria-pressed={isActive}
                      className={cn(
                        "flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors duration-base ease-smooth",
                        isActive ? "bg-primary/12" : "hover:bg-panel"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex h-7 w-7 shrink-0 overflow-hidden rounded-full border border-line"
                      >
                        <span
                          className="h-full w-1/2"
                          style={{ backgroundColor: item.swatch[0] }}
                        />
                        <span
                          className="h-full w-1/2"
                          style={{ backgroundColor: item.swatch[1] }}
                        />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="font-display text-sm font-semibold">
                            {item.label}
                          </span>
                          {isActive && (
                            <Check size={13} className="text-primary" aria-hidden="true" />
                          )}
                        </span>
                        <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                          {item.blurb}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <p className="border-t border-line px-4 py-3 text-xs leading-relaxed text-muted-foreground">
              Your choice is remembered. This panel is a review aid and is removed
              once you pick a direction.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="theme-panel"
        className="panel ml-auto flex items-center gap-2.5 px-4 py-3 shadow-lift transition-colors duration-base ease-smooth hover:border-primary/40"
      >
        <Palette size={16} className="text-primary" aria-hidden="true" />
        <span className="label-mono">{current.label}</span>
      </button>
    </div>
  );
};

export default ThemeSwitcher;
