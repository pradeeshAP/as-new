import type { Variants } from "framer-motion";
import { useReducedMotion } from "./useReducedMotion";

/** Shared whileInView reveal props: fade + slight vertical rise.
 *  `once: false` re-triggers on every pass — reveals scrolling in, hides scrolling out. */
export function useReveal(delay = 0, once = true) {
  const reduced = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0.01 : 0.8, delay, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once, margin: "-10% 0px -10% 0px" },
    variants,
  } as const;
}

/**
 * Same fade+rise as useReveal but triggers on mount rather than on scroll
 * into view — for above-the-fold content (e.g. the hero) that should
 * animate in immediately instead of waiting on a viewport threshold that
 * may never clear if the element sits near the bottom of the first screen.
 */
export function useEnter(delay = 0) {
  const reduced = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0.01 : 0.8, delay, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return {
    initial: "hidden",
    animate: "visible",
    variants,
  } as const;
}
