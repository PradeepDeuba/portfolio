import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { toast } from "sonner";
import { CheckCircle2, Loader2, Send } from "lucide-react";

const fieldClasses =
  "w-full rounded-xl border border-white/[0.09] bg-white/[0.03] px-4 py-3 text-sm outline-none transition-colors duration-base ease-smooth placeholder:text-muted-foreground/60 focus:border-primary/50 focus:bg-white/[0.05]";

const labelClasses = "mb-2 block font-mono text-xs uppercase tracking-wider text-muted-foreground";

/**
 * Contact form.
 *
 * Submission is still simulated — see the TODO below. Validation uses the
 * browser's native constraint validation (`required`, `type="email"`), which is
 * unchanged, and the field ids/labels are kept so the markup stays accessible.
 */
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const resetTimeout = useRef<number | undefined>(undefined);
  const isMounted = useRef(true);
  const reduceMotion = useReducedMotion();

  // Neither timer used to be cleared, so the 3s reset could fire after the
  // component had already unmounted.
  useEffect(
    () => () => {
      isMounted.current = false;
      window.clearTimeout(resetTimeout.current);
    },
    []
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: replace with a real submission endpoint. This only simulates a
    // network round-trip and always reports success — no message is sent.
    await new Promise((resolve) => setTimeout(resolve, 1500));
    if (!isMounted.current) return;

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Message sent successfully! We'll get back to you soon.");

    resetTimeout.current = window.setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="w-full">
      {isSubmitted ? (
        <div className="rounded-2xl border border-white/[0.07] bg-card/50 px-6 py-14 text-center" role="status">
          <motion.div
            initial={{ scale: reduceMotion ? 1 : 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 16 }}
            className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary"
          >
            <CheckCircle2 size={26} aria-hidden="true" />
          </motion.div>
          <h3 className="mt-6 font-display text-xl font-semibold">Message sent!</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Thank you for reaching out. We&rsquo;ll get back to you as soon as
            possible.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className={labelClasses}>
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                className={fieldClasses}
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className={labelClasses}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={fieldClasses}
                placeholder="Your email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className={labelClasses}>
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              value={formData.subject}
              onChange={handleChange}
              className={fieldClasses}
              placeholder="Subject of your message"
            />
          </div>

          <div>
            <label htmlFor="message" className={labelClasses}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className={`${fieldClasses} resize-none`}
              placeholder="Your message"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-all duration-base ease-expo hover:gap-3 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={17} aria-hidden="true" className="animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send message
                <Send
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-base ease-expo group-hover:translate-x-0.5"
                />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
