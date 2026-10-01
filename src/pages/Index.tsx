import { Link } from "react-router-dom";
import { ArrowRight, Code, Cpu, Globe, Lightbulb, Zap } from "lucide-react";
import PageTransition from "../components/PageTransition";
import Hero from "../components/Hero";
import { Reveal } from "../components/Reveal";
import { Marquee } from "../components/Marquee";
import { SectionHeading } from "../components/SectionHeading";
import { WorkIndex } from "../components/WorkIndex";
import { MagneticButton } from "../components/MagneticButton";
import { featuredProjects, projects } from "@/data/projects";
import { staggerDelay } from "@/lib/motion";

const services = [
  {
    icon: <Code className="h-5 w-5" aria-hidden="true" />,
    title: "Custom Software Development",
    description:
      "Building tailored software solutions to address your specific business challenges and requirements.",
  },
  {
    icon: <Globe className="h-5 w-5" aria-hidden="true" />,
    title: "Web Application Development",
    description:
      "Creating responsive, intuitive web applications that provide seamless user experiences across devices.",
  },
  {
    icon: <Cpu className="h-5 w-5" aria-hidden="true" />,
    title: "AI & Machine Learning",
    description:
      "Implementing intelligent algorithms and data models to unlock insights and automate complex processes.",
  },
  {
    icon: <Lightbulb className="h-5 w-5" aria-hidden="true" />,
    title: "UX/UI Design",
    description:
      "Designing user-centered interfaces that balance aesthetics with functionality for optimal user satisfaction.",
  },
  {
    icon: <Zap className="h-5 w-5" aria-hidden="true" />,
    title: "Performance Optimization",
    description:
      "Enhancing application speed, responsiveness, and efficiency through careful optimization techniques.",
  },
];

/** Derived from the project catalogue so the strip can never drift from the data. */
const techStack = Array.from(new Set(projects.flatMap((project) => project.tags)));

const Index = () => (
  <PageTransition>
    <main id="main">
      <Hero />

      {/* Technology marquee. Decorative, so it is hidden from assistive tech. */}
      <div aria-hidden="true" className="border-y border-white/[0.07] py-7">
        <Marquee items={techStack} durationSec={52} itemClassName="text-lg md:text-2xl text-white/25" />
      </div>

      {/* Services */}
      <section className="relative py-24 md:py-32" aria-labelledby="services-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <SectionHeading
            eyebrow="Services"
            id="services-heading"
            title="Innovative solutions for modern challenges"
            description="We provide end-to-end development services that help transform your ideas into powerful, scalable solutions."
          />

          <ul className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal as="li" key={service.title} delay={staggerDelay(index)} className="group relative">
                <div className="glow-card flex h-full flex-col rounded-2xl border border-white/[0.07] bg-card/50 p-6 transition-transform duration-slow ease-expo hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-primary transition-colors duration-base ease-smooth group-hover:border-primary/40 group-hover:bg-primary/10">
                      {service.icon}
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-mono text-[11px] tracking-widest text-muted-foreground/50 tnum"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-lg font-semibold tracking-tight">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured work — presented as an index rather than a card grid. */}
      <section className="relative border-t border-white/[0.07] py-24 md:py-32" aria-labelledby="work-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <SectionHeading
            eyebrow="Projects"
            id="work-heading"
            title="Featured work"
            description="Explore our recent projects showcasing our expertise and innovative approaches to solving complex problems."
            action={
              <MagneticButton>
                <Link
                  to="/projects"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-5 py-2.5 text-sm font-medium transition-colors duration-base ease-smooth hover:border-primary/40 hover:bg-primary/10"
                >
                  View all projects
                  <ArrowRight
                    size={15}
                    aria-hidden="true"
                    className="transition-transform duration-base ease-expo group-hover:translate-x-0.5"
                  />
                </Link>
              </MagneticButton>
            }
          />

          <Reveal delay={0.1}>
            <WorkIndex projects={featuredProjects} className="mt-14" />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 md:py-28" aria-labelledby="cta-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <Reveal>
            <div className="glow-card relative overflow-hidden rounded-3xl panel px-6 py-16 text-center sm:px-12 md:py-20">
              <div aria-hidden="true" className="absolute inset-0 grid-overlay opacity-40" />
              <div
                aria-hidden="true"
                className="absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--iris)/0.28),transparent_65%)] blur-3xl"
              />

              <div className="relative">
                <h2
                  id="cta-heading"
                  className="mx-auto max-w-3xl font-display text-display-sm font-semibold tracking-tight"
                >
                  Ready to build something amazing?
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Whether you have a specific project in mind or just want to
                  explore possibilities, we&rsquo;re here to help bring your ideas
                  to life.
                </p>
                <MagneticButton className="mt-9">
                  <Link
                    to="/contact"
                    className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-base ease-expo hover:gap-3 hover:bg-primary/90"
                  >
                    Start a conversation
                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                      className="transition-transform duration-base ease-expo group-hover:translate-x-0.5"
                    />
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  </PageTransition>
);

export default Index;
