import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import PageTransition from "../components/PageTransition";
import { site } from "@/data/site";

/**
 * Previously the footer linked to /privacy, /terms and /cookies — none of which
 * had a route, so all three rendered the 404 page. Until real policy text is
 * written, those three links now point here instead of failing.
 *
 * TODO: replace this page with your actual policies. Nothing here is legal
 * advice or a real policy — it exists so the links resolve.
 */
const Legal = () => {
  return (
    <PageTransition>
      <main className="pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-6">
              <FileText size={24} />
            </span>

            <h1 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Legal
            </h1>

            <p className="text-lg text-muted-foreground mb-10">
              The legal documents for this site have not been published yet.
            </p>

            <div className="rounded-xl border border-border bg-card p-6 mb-6">
              <h2 className="text-lg font-semibold mb-3">
                Documents still to be added
              </h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
              </ul>
            </div>

            <p className="text-muted-foreground">
              If you need to get in touch about how your data is handled in the
              meantime, email{" "}
              <a
                href={`mailto:${site.contact.email}`}
                className="text-primary hover:text-primary/80 transition-colors"
              >
                {site.contact.email}
              </a>
              .
            </p>

            <Link
              to="/"
              className="inline-flex items-center gap-2 mt-10 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Return home
            </Link>
          </motion.div>
        </div>
      </main>
    </PageTransition>
  );
};

export default Legal;
