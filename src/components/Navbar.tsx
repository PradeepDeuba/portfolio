import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";
import { DURATION, EASE_EXPO, SPRING_SOFT } from "@/lib/motion";

/**
 * Site header.
 *
 * Responsive strategy: inline links from `lg` up, and a full-screen sheet below
 * that. The previous version used a dropdown menu at every viewport width,
 * which gave a 5-page site no persistent navigation on desktop and a cramped
 * control on mobile.
 *
 * Accessibility: `aria-expanded` on the toggle, Escape closes the sheet, body
 * scroll is locked while it is open, focus returns to the toggle on close, and
 * the active route is marked with `aria-current`.
 */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the sheet whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Lock background scroll and wire up Escape while the sheet is open.
  useEffect(() => {
    if (!menuOpen) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    // Move focus into the sheet so keyboard and screen-reader users land there.
    const firstLink = sheetRef.current?.querySelector<HTMLAnchorElement>("a");
    firstLink?.focus();

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Scroll progress. Purely decorative, so it is hidden from AT. */}
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-iris"
        />
      )}

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-base ease-smooth",
          scrolled
            ? "panel border-x-0 border-t-0 border-b"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-6 lg:px-10"
        >
          <Link
            to="/"
            onClick={closeMenu}
            className="group flex items-center gap-2.5"
            aria-label={`${site.name} — home`}
          >
            <span
              aria-hidden="true"
              className="relative flex h-2 w-2 shrink-0 items-center justify-center"
            >
              <span className="absolute inset-0 rounded-full bg-primary" />
              <span className="absolute inset-0 rounded-full bg-primary animate-pulse-ring" />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">
              <span className="text-gradient">{site.name}</span>
            </span>
          </Link>

          {/* Desktop / large-tablet inline navigation */}
          <ul className="hidden items-center gap-1 lg:flex">
            {site.nav.map((item) => {
              const isCurrent = location.pathname === item.path;

              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    aria-current={isCurrent ? "page" : undefined}
                    className={cn(
                      "relative block rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-base ease-smooth",
                      isCurrent ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.name}
                    {isCurrent && (
                      <motion.span
                        layoutId="nav-active"
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 rounded-full bg-panel ring-1 ring-inset ring-line"
                        transition={reduceMotion ? { duration: 0 } : SPRING_SOFT}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              to="/contact"
              className="group relative hidden overflow-hidden rounded-full border border-line bg-panel px-4 py-2 text-sm font-medium transition-colors duration-base ease-smooth hover:border-primary/40 hover:bg-primary/10 sm:block"
            >
              <span className="relative z-10">Start a project</span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-20deg] bg-panel opacity-0 transition-opacity duration-base group-hover:opacity-100 group-hover:animate-shimmer"
              />
            </Link>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-panel text-foreground transition-colors duration-base ease-smooth hover:border-primary/40 hover:bg-primary/10 lg:hidden"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile / tablet sheet */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            ref={sheetRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.15 : DURATION.base, ease: EASE_EXPO }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex h-full flex-col justify-center px-6 pb-16 pt-20 sm:px-10">
              <p className="label-mono mb-8">Navigation</p>

              <ul className="space-y-1">
                {site.nav.map((item, index) => {
                  const isCurrent = location.pathname === item.path;

                  return (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.45,
                        delay: reduceMotion ? 0 : 0.04 + index * 0.06,
                        ease: EASE_EXPO,
                      }}
                      className="border-b border-line"
                    >
                      <Link
                        to={item.path}
                        onClick={closeMenu}
                        aria-current={isCurrent ? "page" : undefined}
                        className={cn(
                          "flex items-baseline justify-between py-4 font-display text-display-sm font-semibold tracking-tight transition-colors duration-base ease-smooth",
                          isCurrent ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {item.name}
                        <span className="label-mono tnum">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <motion.a
                href={`mailto:${site.contact.email}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: reduceMotion ? 0 : 0.4 }}
                className="label-mono mt-10 link-underline w-fit"
              >
                {site.contact.email}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
