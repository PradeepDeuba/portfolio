import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type HoverKind = "link" | "text" | "image" | null;

const LINK_SELECTOR = "a, button, [role=button], input, textarea, select";
const TEXT_SELECTOR = "p, h1, h2, h3, h4, h5, h6, span";
const MEDIA_SELECTOR = "img, video, canvas, svg";

/** Applied to <html> only while the custom cursor is actually rendered. */
const HIDE_NATIVE_CURSOR_CLASS = "cursor-none-active";

const HOVER_COLOR: Record<"link" | "text" | "image", string> = {
  link: "#8B5CF6",
  text: "#60A5FA",
  image: "#EC4899",
};

const HOVER_SCALE: Record<"link" | "text" | "image", number> = {
  link: 1.8,
  text: 1.3,
  image: 1.5,
};

const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [hover, setHover] = useState<HoverKind>(null);
  const [hidden, setHidden] = useState(true);

  // Only run on hover-capable pointers, and never against a user's
  // reduced-motion preference — a spring-following cursor is exactly the kind
  // of motion that setting is meant to suppress.
  useEffect(() => {
    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia(
      "(prefers-reduced-motion: no-preference)"
    );

    const sync = () => setEnabled(hoverQuery.matches && motionQuery.matches);

    sync();
    hoverQuery.addEventListener("change", sync);
    motionQuery.addEventListener("change", sync);

    return () => {
      hoverQuery.removeEventListener("change", sync);
      motionQuery.removeEventListener("change", sync);
    };
  }, []);

  // The native cursor is hidden only while this component is on screen.
  // PageTransition used to apply `cursor-none` unconditionally, which would
  // leave touch and reduced-motion users with no visible cursor at all.
  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;
    root.classList.add(HIDE_NATIVE_CURSOR_CLASS);
    return () => root.classList.remove(HIDE_NATIVE_CURSOR_CLASS);
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };
    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);
    const onEnter = () => setHidden(false);
    const onLeave = () => setHidden(true);

    /**
     * One delegated listener, rather than listeners bound to every element.
     * The previous implementation walked the DOM once inside a
     * `setTimeout(..., 1000)` and attached mouseenter/mouseleave to every
     * a/button/p/span/img/canvas/svg. After any client-side route change the
     * freshly mounted elements had no listeners, so the cursor silently
     * stopped reacting to links, text and images.
     */
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target || typeof target.closest !== "function") return;

      if (target.closest(LINK_SELECTOR)) setHover("link");
      else if (target.closest(MEDIA_SELECTOR)) setHover("image");
      else if (target.closest(TEXT_SELECTOR)) setHover("text");
      else setHover(null);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.documentElement.addEventListener("mouseenter", onEnter);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", onMouseOver);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  const borderColor = hover ? HOVER_COLOR[hover] : HOVER_COLOR.text;
  const ringScale = clicked ? 0.8 : hover ? HOVER_SCALE[hover] : 1;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-[9999] h-7 w-7 rounded-full border-2 border-primary mix-blend-difference ${
          hidden ? "opacity-0" : "opacity-100"
        }`}
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: ringScale,
          borderColor,
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 20,
          mass: 0.3,
        }}
      />
      <motion.div
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-[9999] h-3 w-3 rounded-full bg-primary mix-blend-difference ${
          hidden ? "opacity-0" : "opacity-100"
        }`}
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          scale: clicked ? 1.2 : 1,
          backgroundColor: borderColor,
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 20,
          mass: 0.2,
        }}
      />
    </>
  );
};

export default CustomCursor;
