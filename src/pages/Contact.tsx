import { Mail, MapPin, Phone } from "lucide-react";
import PageTransition from "../components/PageTransition";
import PageHeader from "../components/PageHeader";
import ContactForm from "../components/ContactForm";
import { Reveal } from "../components/Reveal";
import { site } from "@/data/site";
import { staggerDelay } from "@/lib/motion";

const contactInfo = [
  {
    icon: <Mail className="h-5 w-5" aria-hidden="true" />,
    title: "Email",
    details: site.contact.email,
    link: `mailto:${site.contact.email}`,
    external: false,
  },
  {
    icon: <Phone className="h-5 w-5" aria-hidden="true" />,
    title: "Phone",
    details: site.contact.phone,
    link: site.contact.phoneHref,
    external: false,
  },
  {
    icon: <MapPin className="h-5 w-5" aria-hidden="true" />,
    title: "Office",
    details: site.contact.address,
    link: "https://maps.google.com",
    external: true,
  },
];

const officeHours = [
  { days: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
  { days: "Saturday", hours: "By appointment" },
  { days: "Sunday", hours: "Closed" },
];

const Contact = () => (
  <PageTransition>
    <main id="main">
      <PageHeader
        eyebrow="Contact"
        title="Let’s start a conversation"
        description="Have a project in mind or just want to explore possibilities? We&rsquo;re here to help turn your ideas into reality."
      />

      <section className="py-16 md:py-20" aria-label="Contact details">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {contactInfo.map((item, index) => (
              <Reveal as="li" key={item.title} delay={staggerDelay(index)}>
                <a
                  href={item.link}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="glow-card group flex h-full flex-col rounded-2xl border border-white/[0.07] bg-card/50 p-6 transition-transform duration-slow ease-expo hover:-translate-y-1"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-primary transition-colors duration-base ease-smooth group-hover:border-primary/40 group-hover:bg-primary/10">
                    {item.icon}
                  </span>
                  <h2 className="mt-6 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    {item.title}
                  </h2>
                  <p className="mt-2 font-display text-base font-medium break-words">
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
              Send us a message
            </h2>
            <p className="mt-5 max-w-lg text-muted-foreground">
              Fill out the form below and we&rsquo;ll get back to you as soon as
              possible. We&rsquo;re excited to hear about your project!
            </p>
            <div className="mt-10">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="lg:sticky lg:top-28">
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.07]">
                <iframe
                  title={`Map showing the ${site.name} office in San Francisco`}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100940.14245968247!2d-122.43759999999999!3d37.75769999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1646244219503!5m2!1sen!2sus"
                  className="h-80 w-full grayscale-[0.35] contrast-[1.05] sm:h-96 lg:h-[26rem]"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="mt-6 rounded-2xl border border-white/[0.07] bg-card/50 p-6">
                <h2 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Office hours
                </h2>
                <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4">
                  {officeHours.map((entry) => (
                    <div key={entry.days} className={entry.days === "Sunday" ? "col-span-2" : undefined}>
                      <dt className="text-sm font-medium">{entry.days}</dt>
                      <dd className="mt-0.5 text-sm text-muted-foreground">{entry.hours}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  </PageTransition>
);

export default Contact;
