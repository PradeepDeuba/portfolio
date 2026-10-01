import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageTransition from "../components/PageTransition";
import Hero from "../components/Hero";
import { Reveal } from "../components/Reveal";
import { Marquee } from "../components/Marquee";
import { SectionHeading } from "../components/SectionHeading";
import { WorkIndex } from "../components/WorkIndex";
import { MagneticButton } from "../components/MagneticButton";
import BlogPost from "../components/BlogPost";
import { featuredProjects, allTags } from "@/data/projects";
import { posts } from "@/data/posts";

/**
 * Home page.
 *
 * The template's "services" grid (five agency offerings with invented
 * descriptions) is gone — an individual engineer doesn't sell services that
 * way. In its place: the real work as an index, and the real writing, both
 * driven entirely by src/data.
 */
const Index = () => (
  <PageTransition>
    <main id="main">
      <Hero />

      {/* Technologies actually used across the projects. Decorative repetition,
          so it is hidden from assistive tech. */}
      <div aria-hidden="true" className="border-y border-line py-7">
        <Marquee
          items={allTags}
          durationSec={52}
          velocity
          itemClassName="text-lg md:text-2xl text-muted-foreground/40"
        />
      </div>

      {/* Selected work */}
      <section className="relative py-24 md:py-32" aria-labelledby="work-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <SectionHeading
            eyebrow="Projects"
            id="work-heading"
            title="Things I've built"
            description="Hardware I designed, wired and wrote the firmware for — plus a few where the interesting part was making it faster."
            action={
              <MagneticButton>
                <Link
                  to="/projects"
                  className="group inline-flex items-center gap-2 rounded-full border border-line bg-panel px-5 py-2.5 text-sm font-medium transition-colors duration-base ease-smooth hover:border-primary/50"
                >
                  All projects
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

      {/* Recent writing */}
      <section className="relative border-t border-line py-24 md:py-32" aria-labelledby="writing-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <SectionHeading
            eyebrow="Writing"
            id="writing-heading"
            title="Notes from the bench"
            description="Long-form write-ups with the bill of materials, the wiring decisions and the measurements that actually mattered."
            action={
              <MagneticButton>
                <Link
                  to="/blog"
                  className="group inline-flex items-center gap-2 rounded-full border border-line bg-panel px-5 py-2.5 text-sm font-medium transition-colors duration-base ease-smooth hover:border-primary/50"
                >
                  All articles
                  <ArrowRight
                    size={15}
                    aria-hidden="true"
                    className="transition-transform duration-base ease-expo group-hover:translate-x-0.5"
                  />
                </Link>
              </MagneticButton>
            }
          />

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 3).map((post, index) => (
              <BlogPost key={post.id} post={post} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 md:py-28" aria-labelledby="cta-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <Reveal>
            <div className="glow-card relative overflow-hidden rounded-3xl panel px-6 py-16 text-center sm:px-12 md:py-20">
              <div aria-hidden="true" className="absolute inset-0 fx-grid opacity-40" />
              <div
                aria-hidden="true"
                className="absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--iris)/0.22),transparent_65%)] blur-3xl"
              />

              <div className="relative">
                <h2
                  id="cta-heading"
                  className="mx-auto max-w-3xl font-display text-display-sm font-semibold tracking-tight"
                >
                  Got a hardware problem worth solving?
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Whether it&rsquo;s a sensor that won&rsquo;t settle, firmware
                  that&rsquo;s fighting the Wi-Fi stack, or a build you want a
                  second pair of eyes on — I&rsquo;m happy to talk it through.
                </p>
                <MagneticButton className="mt-9">
                  <Link
                    to="/contact"
                    className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-base ease-expo hover:gap-3 hover:bg-primary/90"
                  >
                    Get in touch
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
