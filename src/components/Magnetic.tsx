import { motion, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  maxOffset?: number;
}

const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Wraps a button/link so it eases toward the cursor while hovered (magnetic pull),
 * then springs back to rest on leave. Layer of press/hover scale feedback lives here too.
 */
export function Magnetic({ children, className, strength = 0.3, maxOffset = 14 }: MagneticProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 14, mass: 0.15 });
  const springY = useSpring(y, { stiffness: 150, damping: 14, mass: 0.15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    const clamp = (v: number) => Math.max(-maxOffset, Math.min(maxOffset, v * strength));
    x.set(clamp(relX));
    y.set(clamp(relY));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY, display: "inline-block" }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: PREMIUM_EASE }}
    >
      {children}
    </motion.div>
  );
}
