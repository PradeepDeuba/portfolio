import {
  Award,
  Clock,
  HeartHandshake,
  LineChart,
  Shield,
  Users,
} from "lucide-react";
import PageTransition from "../components/PageTransition";
import PageHeader from "../components/PageHeader";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { staggerDelay } from "@/lib/motion";

const values = [
  {
    icon: <HeartHandshake className="h-5 w-5" aria-hidden="true" />,
    title: "Client Partnership",
    description:
      "We believe in building long-term relationships with our clients, working as partners rather than just service providers.",
  },
  {
    icon: <Shield className="h-5 w-5" aria-hidden="true" />,
    title: "Quality Assurance",
    description:
      "We maintain rigorous quality standards across all projects, ensuring reliable, secure, and maintainable solutions.",
  },
  {
    icon: <LineChart className="h-5 w-5" aria-hidden="true" />,
    title: "Continuous Improvement",
    description:
      "We constantly evolve our skills, methodologies, and technologies to deliver the best possible outcomes.",
  },
  {
    icon: <Users className="h-5 w-5" aria-hidden="true" />,
    title: "Collaborative Innovation",
    description:
      "We foster a collaborative environment where diverse perspectives lead to innovative solutions.",
  },
  {
    icon: <Clock className="h-5 w-5" aria-hidden="true" />,
    title: "Timely Delivery",
    description:
      "We respect deadlines and deliver high-quality work within agreed-upon timeframes.",
  },
  {
    icon: <Award className="h-5 w-5" aria-hidden="true" />,
    title: "Technical Excellence",
    description:
      "We strive for excellence in all technical aspects, from architecture to implementation to optimization.",
  },
];

const stats = [
  { value: "200+", label: "Projects Completed" },
  { value: "50+", label: "Happy Clients" },
  { value: "15+", label: "Team Members" },
  { value: "8+", label: "Years Experience" },
];

const team = [
  {
    name: "Alex Morgan",
    role: "Founder & CEO",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800",
    bio: "Alex founded Innovo with a vision to create software that combines technical excellence with intuitive design.",
  },
  {
    name: "Sarah Chen",
    role: "CTO",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800",
    bio: "Sarah oversees our technical strategy and ensures we stay at the forefront of emerging technologies.",
  },
  {
    name: "Miguel Rodriguez",
    role: "Lead Designer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800",
    bio: "Miguel brings products to life through thoughtful, user-centered design that enhances functionality.",
  },
  {
    name: "Priya Patel",
    role: "Head of Engineering",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
    bio: "Priya leads our engineering team, implementing best practices and scalable architectures.",
  },
];

const About = () => (
  <PageTransition>
    <main id="main">
      <PageHeader
        eyebrow="About"
        title="Crafting digital excellence since 2015"
        description="Innovo is a team of passionate engineers, designers, and problem solvers dedicated to creating impactful digital solutions. We combine technical expertise with creative thinking to build software that makes a difference."
      />

      {/* Stats */}
      <section className="border-b border-white/[0.07] py-14" aria-label="Company statistics">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Reveal key={stat.label} delay={staggerDelay(index)}>
                <dt className="label-mono">{stat.label}</dt>
                <dd className="mt-3 font-display text-display-sm font-semibold tracking-tight text-gradient tnum">
                  {stat.value}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Team image */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <Reveal>
            <div className="glow-card relative overflow-hidden rounded-3xl border border-white/[0.07]">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200"
                alt="The Innovo team collaborating in the studio"
                loading="lazy"
                decoding="async"
                className="aspect-[21/9] w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="relative border-t border-white/[0.07] py-24 md:py-28" aria-labelledby="values-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <SectionHeading
            eyebrow="Our Values"
            title={<span id="values-heading">Principles that guide our work</span>}
            description="These core values shape our approach to projects, client relationships, and our own internal culture."
          />

          <ul className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <Reveal as="li" key={value.title} delay={staggerDelay(index)}>
                <div className="glow-card h-full rounded-2xl border border-white/[0.07] bg-card/50 p-6 transition-transform duration-slow ease-expo hover:-translate-y-1">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-primary">
                    {value.icon}
                  </span>
                  <h3 className="mt-6 font-display text-lg font-semibold tracking-tight">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Team */}
      <section className="relative border-t border-white/[0.07] py-24 md:py-28" aria-labelledby="team-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <SectionHeading
            eyebrow="Our Team"
            title={<span id="team-heading">Meet the innovators</span>}
            description="Our diverse team brings together expertise across technology, design, and strategy to create exceptional digital experiences."
          />

          <ul className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <Reveal as="li" key={member.name} delay={staggerDelay(index)} className="group">
                <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-card/40">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    decoding="async"
                    className="aspect-square w-full object-cover transition-transform duration-slow ease-expo group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent"
                  />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">
                  {member.name}
                </h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-wider text-primary">
                  {member.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {member.bio}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </main>
  </PageTransition>
);

export default About;
