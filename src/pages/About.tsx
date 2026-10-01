import { CircuitBoard, Cpu, GraduationCap, Layers, Radio, Wrench } from "lucide-react";
import PageTransition from "../components/PageTransition";
import PageHeader from "../components/PageHeader";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { site } from "@/data/site";
import { staggerDelay } from "@/lib/motion";

/**
 * The template's About page carried four invented team members and four
 * invented statistics ("200+ Projects Completed"). All of it is gone — this is
 * one person, and nothing is stated here that their own published work doesn't
 * support.
 *
 * `expertise` groups technologies that genuinely appear across the four real
 * posts and repositories (ESP32, TDS/DS18B20/HC-SR04 sensing, 74HC595 and
 * ULN2803 driving, SSD1306 displays, full-stack web). They are groupings of the
 * owner's own subjects, not claims about years or client counts.
 */
const expertise = [
  {
    icon: <Cpu className="h-5 w-5" aria-hidden="true" />,
    title: "Embedded firmware",
    description:
      "ESP32 and ESP32-C3 in C++ — ADC noise handling, pin budgeting, timing that doesn't drift, and getting work off the main loop.",
  },
  {
    icon: <Radio className="h-5 w-5" aria-hidden="true" />,
    title: "Sensing & instrumentation",
    description:
      "TDS, DS18B20 and HC-SR04 sensing, with the wiring, decoupling and calibration that make the readings trustworthy.",
  },
  {
    icon: <CircuitBoard className="h-5 w-5" aria-hidden="true" />,
    title: "Displays & drivers",
    description:
      "SSD1306 OLEDs and large 7-segment panels — shift registers, current-sinking drivers and multiplex loops written from scratch.",
  },
  {
    icon: <Layers className="h-5 w-5" aria-hidden="true" />,
    title: "Full-stack web",
    description:
      "Front-end and back-end work, including the dashboards the hardware publishes into.",
  },
  {
    icon: <Wrench className="h-5 w-5" aria-hidden="true" />,
    title: "Diagnostics",
    description:
      "Reading live ECU data and working through service procedures properly rather than guessing at a fault.",
  },
  {
    icon: <GraduationCap className="h-5 w-5" aria-hidden="true" />,
    title: "Information technology",
    description:
      "Bachelor in Information Technology, Texas College of Management & IT, Kathmandu.",
  },
];

const About = () => (
  <PageTransition>
    <main id="main">
      <PageHeader
        eyebrow="About"
        title="IoT developer in Kathmandu"
        description={site.tagline}
      />

      <section className="py-16 md:py-20" aria-label="Profile">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
          <Reveal className="lg:col-span-5">
            <div className="glow-card overflow-hidden rounded-2xl panel">
              <img
                src={site.portrait}
                alt={`${site.name}, ${site.title}`}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="border-t border-line px-5 py-4">
                <p className="font-display text-lg font-semibold">{site.name}</p>
                <p className="mt-1 font-mono text-xs uppercase tracking-wider text-primary">
                  {site.title}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                What I work on
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                I build hardware that reports on itself. Most of my work sits
                where firmware meets the physical world — a sensor that has to be
                wired and decoupled properly before its numbers mean anything, a
                display that has to be driven fast enough to look smooth, a
                device that has to keep running after I stop watching it.
              </p>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                Everything published here comes with the details that usually get
                left out: the bill of materials, the wiring decisions, the
                measurements taken before and after an optimisation, and what
                broke in the enclosure after six months.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-10">
              <h2 className="label-mono">Education</h2>
              <ul className="mt-5 space-y-5">
                {site.education.map((entry) => (
                  <li key={entry.degree} className="border-l-2 border-primary pl-5">
                    <p className="font-display text-lg font-semibold">{entry.degree}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {entry.school} · {entry.location}
                    </p>
                    <p className="mt-1 font-mono text-xs tracking-wide text-muted-foreground">
                      {entry.period}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-24 md:py-28" aria-labelledby="expertise-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <SectionHeading
            eyebrow="Expertise"
            id="expertise-heading"
            title="The ground I cover"
            description="Grouped from the subjects that appear across my published projects and write-ups."
          />

          <ul className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {expertise.map((item, index) => (
              <Reveal as="li" key={item.title} delay={staggerDelay(index)} className="group">
                <div className="glow-card h-full rounded-2xl border border-line bg-card p-6 transition-transform duration-slow ease-expo hover:-translate-y-1">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-panel text-primary">
                    {item.icon}
                  </span>
                  <h3 className="mt-6 font-display text-lg font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </main>
  </PageTransition>
);

export default About;
