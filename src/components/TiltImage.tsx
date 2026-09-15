import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface TiltImageProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

/** Wraps an image/card so it tilts toward the cursor — a subtle premium hover effect. */
export function TiltImage({ children, className, intensity = 10 }: TiltImageProps) {
  const reduced = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smx = useSpring(mx, { stiffness: 220, damping: 22 });
  const smy = useSpring(my, { stiffness: 220, damping: 22 });
  const rotateX = useTransform(smy, [0, 1], [intensity, -intensity]);
  const rotateY = useTransform(smx, [0, 1], [-intensity, intensity]);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - rect.left) / rect.width);
        my.set((e.clientY - rect.top) / rect.height);
      }}
      onMouseLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
    >
      {children}
    </motion.div>
  );
}
