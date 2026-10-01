
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import PageTransition from "../components/PageTransition";

/**
 * The previous version logged the path to the console on every 404. That was
 * both noise in production and non-portable: it reached for `import.meta.env`,
 * which only Vite replaces at build time, so the effect threw under any other
 * bundler or test runner. The devtools network tab already reports the 404, so
 * the log is gone rather than guarded.
 */
const NotFound = () => (
  <PageTransition>
    <main className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="text-center max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-block text-9xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
            404
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl md:text-3xl font-display font-bold mb-4"
        >
          Page Not Found
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground mb-8"
        >
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft size={16} /> Return to Home
          </Link>
        </motion.div>
      </div>
    </main>
  </PageTransition>
);

export default NotFound;
