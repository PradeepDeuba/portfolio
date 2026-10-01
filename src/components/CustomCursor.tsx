import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SPRING_POINTER } from "@/lib/motion";
import { cn } from "@/lib/utils";

type HoverKind = "link" | "text" | "image";

const LINK_SELECTOR = "a, button, [role=button], input, textarea, select, label";
const TEXT_SELECTOR = "p, h1, h2, h3, h4, h5, h6, span, li, dd, dt";
const MEDIA_SELECTOR = "img, video, canvas, svg";

/** Applied to <html> only while the custom cursor is actually rendered. */
const HIDE_NATIVE_CURSOR_CLASS = "cursor-none-active";

/**
 * Full class strings per state, so Tailwind's scanner can see them. Colour is
 * changed by a CSS transition rather than by animating a colour value in
 * framer-motion — that keeps the palette in the design tokens, avoids colour
 * parsing on every pointer move, and means the change is governed by the same
 * reduced-motion rule as everything else.
 */
const RING_HOVER: Record<HoverKind, string> = {
  link: "border-iris",
  text: "border-azure",
  image: "border-plasma",
};

const DOT_HOVER: Record<HoverKind, string> = {
  link: "bg-iris",
  text: "bg-azure",
  image: "bg-plasma",
};

const HOVER_SCALE: Record<HoverKind, number> = { link: 1.75, text: 1.25, image: 1.45 };

/**
 * Custom pointer.
 *
 * Renders only on hover-capable pointers and never against a reduced-motion
 * preference — a spring-following cursor is exactly the motion that setting is
 * meant to suppress.
 */
const CustomCursor = () => {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [pressed, setPressed] = useState(false);
  const [hover, setHover] = useState<HoverKind | null>(null);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: no-preference)");

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
  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;
    root.classList.add(HIDE_NATIVE_CURSOR_CLASS);
    return () => root.classList.remove(HIDE_NATIVE_CURSOR_CLASS);
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const onMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setHidden(false);
    };
    const onMouseDown = () => setPressed(true);
    const onMouseUp = () => setPressed(false);
    const onEnter = () => setHidden(false);
    const onLeave = () => setHidden(true);

    /**
     * One delegated listener rather than listeners bound to every element. The
     * original implementation walked the DOM once, one second after mount, and
     * attached mouseenter/mouseleave to every element it found — so after any
     * client-side route change the freshly mounted elements had none and the
     * cursor silently stopped reacting.
     */
    const onMouseOver = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (!target || typeof target.closest !== "function") return;

      if (target.closest(LINK_SELECTOR)) setHover("link");
      else if (target.closest(MEDIA_SELECTOR)) setHover("image");
      else if (target.closest(TEXT_SELECTOR)) setHover("text");
      else setHover(null);
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
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

  if (!enabled || prefersReducedMotion) return null;

  const scale = pressed ? 0.8 : hover ? HOVER_SCALE[hover] : 1;

  return (
    <div aria-hidden="true" className={hidden ? "opacity-0" : "opacity-100"}>
      <motion.div
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-[9999] h-7 w-7 rounded-full border-2 mix-blend-difference transition-colors duration-base ease-smooth",
          hover ? RING_HOVER[hover] : "border-azure"
        )}
        animate={{ x: position.x - 14, y: position.y - 14, scale }}
        transition={SPRING_POINTER}
      />
      <motion.div
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-[9999] h-2.5 w-2.5 rounded-full mix-blend-difference transition-colors duration-base ease-smooth",
          hover ? DOT_HOVER[hover] : "bg-azure"
        )}
        animate={{ x: position.x - 5, y: position.y - 5, scale: pressed ? 1.3 : 1 }}
        transition={SPRING_POINTER}
      />
    </div>
  );
};

export default CustomCursor;
