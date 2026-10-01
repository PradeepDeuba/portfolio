import { createContext, useContext } from "react";
import type { ThemeId } from "@/lib/themes";

/**
 * Theme context, kept out of ThemeProvider.tsx so that file exports only a
 * component — a module that exports both a component and a hook breaks React
 * Fast Refresh, which is what the react-refresh/only-export-components rule
 * warns about.
 */
export interface ThemeContextValue {
  theme: ThemeId;
  setTheme: (id: ThemeId) => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside a ThemeProvider");
  }
  return context;
};
