import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

/**
 * Previously this wrapper called `useTheme()` from next-themes. No
 * ThemeProvider was ever mounted in this app, so it always returned its context
 * default and the value was then overridden anyway — App.tsx passes
 * `theme="dark"` explicitly, which wins through the spread below. next-themes
 * was only in the bundle to compute a discarded fallback, so the dependency is
 * gone and the dark default is stated directly.
 */
const Toaster = ({ ...props }: ToasterProps) => (
  <Sonner
    theme="dark"
    className="toaster group"
    toastOptions={{
      classNames: {
        toast:
          "group toast group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-white/[0.09] group-[.toaster]:shadow-lg group-[.toaster]:rounded-xl",
        description: "group-[.toast]:text-muted-foreground",
        actionButton:
          "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
        cancelButton:
          "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
      },
    }}
    {...props}
  />
);

export { Toaster };
