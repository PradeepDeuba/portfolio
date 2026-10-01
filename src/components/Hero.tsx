import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { DURATION, EASE_EXPO } from "@/lib/motion";
import { SectionLabel } from "@/components/SectionLabel";
import { KineticText } from "@/components/KineticText";
import { MagneticButton } from "@/components/MagneticButton";
import { Parallax } from "@/components/Parallax";
import { site } from "@/data/site";

/**
 * Hero.
 *
 * Copy is the real hero_content from the live site. The visual slot holds the
 * owner's actual portrait rather than the template's abstract panel, with a
 * monogram fallback in case the image host refuses to serve it.
 */
const Hero = () => {
  const reduceMotion = useReducedMotion();
  const [portraitFailed, setPortraitFailed] = useState(false);

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DURATION.slow, delay: reduceMotion ? 0 : delay, ease: EASE_EXPO },
  });

  const initials = site.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-24 pt-32">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 px-5 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-10">
        <div className="lg:col-span-7">
          <motion.div {...enter(0.05)}>
            <SectionLabel>{site.location}</SectionLabel>
          </motion.div>

          <KineticText
            as="h1"
            delay={0.12}
            stagger={0.06}
            segments={[
              { text: "IoT developer &" },
              { text: "full stack engineer", className: "text-gradient" },
            ]}
            className="mt-6 font-display text-display-md font-semibold tracking-tight"
          />

          <motion.p
            {...enter(0.34)}
            className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {site.tagline}
          </motion.p>

          <motion.div {...enter(0.44)} className="mt-10 flex flex-wrap items-center gap-3">
            <MagneticButton>
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-base ease-expo hover:gap-3 hover:bg-primary/90"
              >
                View projects
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-base ease-expo group-hover:translate-x-0.5"
                />
              </Link>
            </MagneticButton>

            <MagneticButton>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-6 py-3 text-sm font-medium transition-colors duration-base ease-smooth hover:border-primary/50"
              >
                Get in touch
              </Link>
            </MagneticButton>
          </motion.div>

          <motion.p
            {...enter(0.52)}
            className="mt-8 font-mono text-xs tracking-wide text-muted-foreground"
          >
            {site.title}
          </motion.p>
        </div>

        <Parallax distance={30} className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: reduceMotion ? 0 : 0.3, ease: EASE_EXPO }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle_at_30%_20%,hsl(var(--azure)/0.22),transparent_62%)] blur-2xl"
            />

            <div className="glow-card relative overflow-hidden rounded-2xl panel shadow-card">
              {portraitFailed ? (
                <div
                  aria-hidden="true"
                  className="grid aspect-[4/5] w-full place-items-center bg-panel"
                >
                  <span className="font-display text-display-sm font-semibold text-muted-foreground">
                    {initials}
                  </span>
                </div>
              ) : (
                <img
                  src={site.portrait}
                  alt={`${site.name}, ${site.title}`}
                  onError={() => setPortraitFailed(true)}
                  className="aspect-[4/5] w-full object-cover"
                />
              )}

              <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3">
                <span className="font-display text-sm font-semibold">{site.name}</span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  <MapPin size={11} aria-hidden="true" />
                  Kathmandu
                </span>
              </div>
            </div>
          </motion.div>
        </Parallax>
      </div>
    </section>
  );
};

export default Hero;
