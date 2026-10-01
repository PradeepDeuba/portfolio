import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUp, Facebook, Github, Mail } from "lucide-react";
import { site } from "@/data/site";
import { CopyEmail } from "@/components/CopyEmail";
import { Marquee } from "@/components/Marquee";
import { DURATION, EASE_EXPO } from "@/lib/motion";

/**
 * Footer. All identity and contact details come from src/data/site.ts so there
 * is a single place to edit them.
 */
const Footer = () => {
  const reduceMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();

  // Only profiles that actually exist. The source data's linkedin_url was the
  // bare "https://linkedin.com/", so it is excluded rather than shipped dead.
  const socials = [
    { label: "GitHub", href: site.social.github, Icon: Github },
    { label: "Facebook", href: site.social.facebook, Icon: Facebook },
    { label: "Email", href: `mailto:${site.contact.email}`, Icon: Mail },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <footer className="relative z-10 mt-24 border-t border-line">
      {/* Oversized wordmark band. Decorative, so it is hidden from AT. */}
      <div aria-hidden="true" className="border-b border-line py-8">
        <Marquee
          items={[site.name, site.tagline]}
          durationSec={60}
          velocity
          itemClassName="text-3xl md:text-5xl text-muted-foreground/25"
          separator="/"
        />
      </div>

      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-10">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: DURATION.slow, ease: EASE_EXPO }}
            className="md:col-span-6"
          >
            <h2 className="font-display text-display-sm font-semibold tracking-tight">
              Let&rsquo;s build something.
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">{site.tagline}</p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <CopyEmail />
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors duration-base ease-smooth hover:bg-primary/90"
              >
                Start a project
              </Link>
            </div>
          </motion.div>

          <div className="md:col-span-3 md:col-start-8">
            <h2 className="label-mono mb-5">Navigate</h2>
            <ul className="space-y-3">
              {site.nav.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="link-underline text-sm text-muted-foreground transition-colors duration-base ease-smooth hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h2 className="label-mono mb-5">Elsewhere</h2>
            <ul className="space-y-3">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 text-sm text-muted-foreground transition-colors duration-base ease-smooth hover:text-foreground"
                  >
                    <Icon
                      size={15}
                      aria-hidden="true"
                      className="transition-colors duration-base group-hover:text-primary"
                    />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs tracking-wide text-muted-foreground">
            &copy; {currentYear} {site.name}
          </p>

          <div className="flex items-center gap-6">
            <Link
              to="/legal"
              className="link-underline font-mono text-xs tracking-wide text-muted-foreground transition-colors duration-base ease-smooth hover:text-foreground"
            >
              Legal &amp; policies
            </Link>
            <button
              type="button"
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2 font-mono text-xs tracking-wide text-muted-foreground transition-colors duration-base ease-smooth hover:text-foreground"
            >
              Back to top
              <ArrowUp
                size={13}
                aria-hidden="true"
                className="transition-transform duration-base ease-expo group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
