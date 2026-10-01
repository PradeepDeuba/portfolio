import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

interface CopyEmailProps {
  className?: string;
  /** Truncates the label on narrow viewports when false. */
  showIcon?: boolean;
}

/**
 * Click-to-copy email, mirroring the interaction pattern on the reference site.
 *
 * Falls back to opening the mail client when the Clipboard API is unavailable —
 * it requires a secure context, so plain http or an older browser would
 * otherwise silently do nothing.
 */
export const CopyEmail = ({ className, showIcon = true }: CopyEmailProps) => {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(site.contact.email);
      setCopied(true);
      toast.success("Email address copied");
      window.clearTimeout(resetTimer.current);
      resetTimer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${site.contact.email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy email address ${site.contact.email}`}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-full border border-line bg-panel px-4 py-2.5 text-left font-mono text-xs tracking-wide transition-colors duration-base ease-smooth hover:border-primary/40 hover:bg-primary/10",
        className
      )}
    >
      <span className="truncate">{site.contact.email}</span>
      {showIcon && (
        <span className="shrink-0 text-muted-foreground transition-colors group-hover:text-primary">
          {copied ? <Check size={13} className="text-primary" /> : <Copy size={13} />}
        </span>
      )}
      {/* Announced to assistive tech without stealing focus. */}
      <span className="sr-only" role="status">
        {copied ? "Copied" : ""}
      </span>
    </button>
  );
};

export default CopyEmail;
