import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { DURATION, EASE_EXPO } from "@/lib/motion";
import { SectionLabel } from "@/components/SectionLabel";
import { KineticText } from "@/components/KineticText";
import { MagneticButton } from "@/components/MagneticButton";
import { RevealImage } from "@/components/RevealImage";
import { site } from "@/data/site";

/**
 * Hero.
 *
 * Copy is the real hero_content from the live site; the portrait is the real
 * one. Motion: the headline rises word-by-word, then the whole block is
 * scroll-scrubbed — it drifts down and fades as the section leaves, and the
 * portrait scales up slightly behind it. That scrubbed coupling (progress tied
 * to scroll position rather than a one-shot trigger) is what the reference
 * site uses ScrollTrigger scrub for.
 *
 * All three of those degrade to static under reduced motion.
 */
const Hero = () => {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // `target` requires a positioned ancestor for accurate measurement; the
  // section below is `relative`.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "26%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.85], [1, reduceMotion ? 1 : 0]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 1.08]);

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DURATION.slow, delay: reduceMotion ? 0 : delay, ease: EASE_EXPO },
  });

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-24 pt-32"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 px-5 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-10">
        <motion.div style={{ y: textY, opacity: textOpacity }} className="lg:col-span-7">
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
        </motion.div>

        <motion.div
          style={{ scale: portraitScale }}
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: reduceMotion ? 0 : 0.3, ease: EASE_EXPO }}
          className="relative mx-auto w-full max-w-sm [will-change:transform] lg:col-span-5"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle_at_30%_20%,hsl(var(--azure)/0.22),transparent_62%)] blur-2xl"
          />

          <div className="glow-card relative overflow-hidden rounded-2xl panel shadow-card">
            <RevealImage
              src={site.portrait}
              alt={`${site.name}, ${site.title}`}
              priority
              delay={0.35}
              className="aspect-[4/5] w-full"
            />

            <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3">
              <span className="font-display text-sm font-semibold">{site.name}</span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                <MapPin size={11} aria-hidden="true" />
                Kathmandu
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
