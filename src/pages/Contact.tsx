import { Facebook, Github, Mail, MapPin } from "lucide-react";
import PageTransition from "../components/PageTransition";
import PageHeader from "../components/PageHeader";
import ContactForm from "../components/ContactForm";
import { CopyEmail } from "../components/CopyEmail";
import { Reveal } from "../components/Reveal";
import { site } from "@/data/site";
import { staggerDelay } from "@/lib/motion";

/**
 * The template advertised a phone number, an office address, office hours and
 * an embedded map of San Francisco. None of that was real, and the real data has
 * none of it either — so it is gone rather than replaced with something made up.
 * What remains is only verifiable contact information.
 */
const channels = [
  {
    icon: <Mail className="h-5 w-5" aria-hidden="true" />,
    title: "Email",
    details: site.contact.email,
    link: `mailto:${site.contact.email}`,
    external: false,
  },
  {
    icon: <Github className="h-5 w-5" aria-hidden="true" />,
    title: "GitHub",
    details: "github.com/PradeepDeuba68",
    link: site.social.github,
    external: true,
  },
  {
    icon: <Facebook className="h-5 w-5" aria-hidden="true" />,
    title: "Facebook",
    details: "facebook.com/pradeep.deuba.2025",
    link: site.social.facebook,
    external: true,
  },
];

const Contact = () => (
  <PageTransition>
    <main id="main">
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        description="Questions about a build, a sensor that won't settle, or a project worth talking through — the form and the address below both reach me."
      />

      <section className="py-16 md:py-20" aria-label="Contact channels">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {channels.map((item, index) => (
              <Reveal as="li" key={item.title} delay={staggerDelay(index)}>
                <a
                  href={item.link}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="glow-card group flex h-full flex-col rounded-2xl border border-line bg-card p-6 transition-transform duration-slow ease-expo hover:-translate-y-1"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-panel text-primary transition-colors duration-base ease-smooth group-hover:border-primary/50">
                    {item.icon}
                  </span>
                  <h2 className="mt-6 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    {item.title}
                  </h2>
                  <p className="mt-2 break-words font-display text-base font-medium">
                    {item.details}
                  </p>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="pb-24 md:pb-28" aria-labelledby="contact-form-heading">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-5 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
          <Reveal>
            <h2
              id="contact-form-heading"
              className="font-display text-display-sm font-semibold tracking-tight"
            >
              Send a message
            </h2>
            <p className="mt-5 max-w-lg text-muted-foreground">
              Tell me what you&rsquo;re working on and I&rsquo;ll get back to you.
              If the form gives you trouble, the email address works too.
            </p>
            <div className="mt-10">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="lg:sticky lg:top-28">
              <div className="rounded-2xl border border-line bg-card p-6 sm:p-8">
                <h2 className="label-mono">Direct</h2>
                <div className="mt-5">
                  <CopyEmail />
                </div>

                <dl className="mt-8 space-y-5 border-t border-line pt-8">
                  <div>
                    <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      Based in
                    </dt>
                    <dd className="mt-1.5 inline-flex items-center gap-2 font-display text-base font-medium">
                      <MapPin size={15} aria-hidden="true" className="text-primary" />
                      {site.location}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      Role
                    </dt>
                    <dd className="mt-1.5 font-display text-base font-medium">{site.title}</dd>
                  </div>
                </dl>

                <p className="mt-8 border-t border-line pt-6 text-xs leading-relaxed text-muted-foreground">
                  Prefer to read first? The write-ups on the blog cover most of
                  what I get asked about.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  </PageTransition>
);

export default Contact;
