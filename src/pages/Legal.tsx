import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import PageTransition from "../components/PageTransition";
import PageHeader from "../components/PageHeader";
import { Reveal } from "../components/Reveal";
import { site } from "@/data/site";

/**
 * The footer previously linked to /privacy, /terms and /cookies — none of which
 * had a route, so all three rendered the 404 page. Until real policy text is
 * written those links point here.
 *
 * TODO: replace this page with your actual policies. Nothing here is legal
 * advice or a real policy — it exists so the links resolve.
 */
const documents = ["Privacy Policy", "Terms of Service", "Cookie Policy"];

const Legal = () => (
  <PageTransition>
    <main id="main">
      <PageHeader
        eyebrow="Legal"
        title="Legal"
        description="The legal documents for this site have not been published yet."
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-10">
          <Reveal>
            <div className="rounded-2xl border border-line bg-card p-6 sm:p-8">
              <h2 className="flex items-center gap-3 font-display text-lg font-semibold tracking-tight">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-panel text-primary">
                  <FileText size={18} aria-hidden="true" />
                </span>
                Documents still to be added
              </h2>

              <ul className="mt-6 divide-y divide-line border-t border-line">
                {documents.map((document) => (
                  <li key={document} className="py-3.5 text-muted-foreground">
                    {document}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="mt-8">
            <p className="text-muted-foreground">
              If you need to get in touch about how your data is handled in the
              meantime, email{" "}
              <a
                href={`mailto:${site.contact.email}`}
                className="link-underline text-primary"
              >
                {site.contact.email}
              </a>
              .
            </p>
          </Reveal>

          <Reveal delay={0.14} className="mt-12">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary transition-colors duration-base ease-smooth hover:text-primary/80"
            >
              Return home
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  </PageTransition>
);

export default Legal;
