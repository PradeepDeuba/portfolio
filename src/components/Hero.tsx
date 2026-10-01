import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import { DURATION, EASE_EXPO } from "@/lib/motion";
import { SectionLabel } from "@/components/SectionLabel";
import { KineticText } from "@/components/KineticText";
import { MagneticButton } from "@/components/MagneticButton";
import { Parallax } from "@/components/Parallax";

/**
 * Hero.
 *
 * Copy is unchanged from the original template. Motion: the headline rises
 * word-by-word, the CTA cluster is magnetic on fine pointers, and the visual
 * panel drifts on scroll. All three degrade to static under reduced motion.
 */
const Hero = () => {
  const reduceMotion = useReducedMotion();

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DURATION.slow, delay: reduceMotion ? 0 : delay, ease: EASE_EXPO },
  });

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-24 pt-32">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 px-5 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
        <div className="lg:col-span-7">
          <motion.div {...enter(0.05)}>
            <SectionLabel>Innovative Solutions</SectionLabel>
          </motion.div>

          <KineticText
            as="h1"
            delay={0.15}
            stagger={0.055}
            segments={[
              { text: "Crafting digital experiences with" },
              { text: "precision and purpose", className: "text-gradient" },
            ]}
            className="mt-6 font-display text-display-md font-semibold tracking-tight"
          />

          <motion.p
            {...enter(0.4)}
            className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Building cutting-edge software solutions that combine elegant design
            with powerful functionality. Transform your ideas into reality with
            our expertise in modern technology.
          </motion.p>

          <motion.div {...enter(0.5)} className="mt-10 flex flex-wrap items-center gap-3">
            <MagneticButton>
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-base ease-expo hover:gap-3 hover:bg-primary/90"
              >
                View Projects
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
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-6 py-3 text-sm font-medium transition-colors duration-base ease-smooth hover:border-primary/40 hover:bg-primary/10"
              >
                Get in Touch
              </Link>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Decorative visual — hidden from assistive tech. */}
        <Parallax distance={34} className="lg:col-span-5">
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: reduceMotion ? 0 : 0.4, ease: EASE_EXPO }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle_at_30%_20%,hsl(var(--azure)/0.28),transparent_60%)] blur-2xl" />

            <div className="glow-card relative overflow-hidden rounded-2xl panel shadow-card">
              <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-primary/60" />
                <span className="ml-3 font-mono text-[10px] tracking-widest text-muted-foreground">
                  SYSTEM.ONLINE
                </span>
              </div>

              <div className="relative p-5">
                <div className="absolute inset-0 grid-overlay opacity-40" />

                {/* Equaliser bars: scaleY only, so this stays on the compositor. */}
                <div className="relative flex h-40 items-end gap-1.5 sm:h-48">
                  {Array.from({ length: 24 }).map((_, index) => (
                    <motion.span
                      key={index}
                      className="flex-1 rounded-full bg-gradient-iris"
                      style={{ transformOrigin: "bottom" }}
                      initial={{ scaleY: 0.12 }}
                      animate={{ scaleY: reduceMotion ? 0.35 : [0.12, 0.9, 0.3, 0.7, 0.16] }}
                      transition={{
                        duration: 4.5,
                        repeat: reduceMotion ? 0 : Infinity,
                        repeatType: "reverse",
                        delay: index * 0.06,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>

                <div className="relative mt-6 space-y-2.5">
                  {[100, 68, 84].map((width, index) => (
                    <div
                      key={width}
                      className="h-2.5 rounded-full bg-white/[0.07]"
                      style={{ width: `${width}%`, opacity: 1 - index * 0.22 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </Parallax>
      </div>

      {/* Scroll hint */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduceMotion ? 0 : 1.1, duration: 0.6 }}
        className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 lg:flex"
      >
        <span className="label-mono">Scroll</span>
        <ArrowDown size={13} className="text-muted-foreground motion-safe:animate-bounce" />
      </motion.div>
    </section>
  );
};

export default Hero;
