import { useCallback, useEffect, useState, type ReactNode } from "react";
import { DEFAULT_THEME, isThemeId, type ThemeId } from "@/lib/themes";
import { ThemeContext } from "@/lib/theme-context";

const STORAGE_KEY = "portfolio-theme";

/**
 * Applies the selected theme as `data-theme` on <html>.
 *
 * Switching is one attribute write, so the five different design directions
 * share a single component tree and a single bundle — nothing re-renders to
 * change theme. An inline script in index.html sets the same attribute before
 * first paint so the saved theme doesn't flash the default first.
 *
 * The context and useTheme hook live in src/lib/theme-context.ts so this file
 * exports a component and nothing else.
 */
const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    if (typeof window === "undefined") return DEFAULT_THEME;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return isThemeId(stored) ? stored : DEFAULT_THEME;
    } catch {
      // localStorage throws in private mode on some browsers.
      return DEFAULT_THEME;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;

    // Keep the browser/OS UI colour in step with the active theme.
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    const background = getComputedStyle(root).getPropertyValue("--background").trim();
    if (meta && background) {
      meta.content = `hsl(${background})`;
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* non-fatal: the theme still applies for this session */
    }
  }, [theme]);

  const setTheme = useCallback((id: ThemeId) => setThemeState(id), []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
