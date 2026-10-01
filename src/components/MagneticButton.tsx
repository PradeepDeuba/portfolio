import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useFinePointer } from "@/hooks/use-media-query";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  /** Fraction of the pointer offset the child follows. 0.3 is a subtle pull. */
  strength?: number;
}

/**
 * Magnetic hover: the child drifts toward the pointer while it is inside the
 * hit area, then springs back on leave.
 *
 * Only `transform` is animated, so this stays on the compositor. Disabled for
 * coarse pointers (there is no hover on touch) and under reduced motion, where
 * it renders a plain wrapper instead.
 */
export const MagneticButton = ({
  children,
  className,
  strength = 0.28,
}: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const finePointer = useFinePointer();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 260, damping: 22, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 260, damping: 22, mass: 0.5 });

  const active = finePointer && !reduceMotion;

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!active || !ref.current) return;

    const bounds = ref.current.getBoundingClientRect();
    rawX.set((event.clientX - (bounds.left + bounds.width / 2)) * strength);
    rawY.set((event.clientY - (bounds.top + bounds.height / 2)) * strength);
  };

  const reset = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <div
      ref={ref}
      className={className}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onBlur={reset}
    >
      <motion.div style={active ? { x, y } : undefined} className="inline-flex">
        {children}
      </motion.div>
    </div>
  );
};

export default MagneticButton;
