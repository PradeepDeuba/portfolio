import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import PageTransition from "../components/PageTransition";
import { DURATION, EASE_EXPO } from "@/lib/motion";

/**
 * The previous version logged the path to the console on every 404. That log is
 * gone: it was noise in production and non-portable, because it read
 * `import.meta.env` — which only Vite replaces at build time — and so threw
 * under any other bundler or test runner. See the note in App.tsx.
 */
const NotFound = () => {
  const reduceMotion = useReducedMotion();

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DURATION.slow, delay: reduceMotion ? 0 : delay, ease: EASE_EXPO },
  });

  return (
    <PageTransition>
      <main
        id="main"
        className="flex min-h-[100svh] items-center justify-center px-5 py-24 sm:px-6"
      >
        <div className="w-full max-w-lg text-center">
          <motion.p {...enter(0)} className="label-mono">
            Error 404
          </motion.p>

          <motion.p
            {...enter(0.06)}
            aria-hidden="true"
            className="mt-6 font-display text-display-lg font-semibold leading-none tracking-tight text-gradient"
          >
            404
          </motion.p>

          <motion.h1
            {...enter(0.12)}
            className="mt-6 font-display text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Page not found
          </motion.h1>

          <motion.p {...enter(0.18)} className="mt-5 text-muted-foreground">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </motion.p>

          <motion.div {...enter(0.24)} className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-base ease-expo hover:gap-3 hover:bg-primary/90"
            >
              <ArrowLeft
                size={16}
                aria-hidden="true"
                className="transition-transform duration-base ease-expo group-hover:-translate-x-0.5"
              />
              Return home
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-6 py-3 text-sm font-medium transition-colors duration-base ease-smooth hover:border-primary/40 hover:bg-primary/10"
            >
              Browse projects
            </Link>
          </motion.div>
        </div>
      </main>
    </PageTransition>
  );
};

export default NotFound;
