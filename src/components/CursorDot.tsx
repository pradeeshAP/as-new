import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import styles from "./CursorDot.module.css";

const INTERACTIVE_SELECTOR = "a, button, [role='button'], input, textarea";

export function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const isFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const on = isFine && !reduced;
    setEnabled(on);
    document.documentElement.classList.toggle("custom-cursor", on);
    return () => document.documentElement.classList.remove("custom-cursor");
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    if (!dot) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;

    // Pure coordinate tracking — kept as cheap as possible since it runs on every
    // native mousemove event (uncoupled from rendering, which happens in the rAF tick).
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    // Hover state lives on its own listener (fires only on element-boundary crossings,
    // not per pixel) and toggles the class imperatively, so hovering the page never
    // triggers a React re-render or runs a DOM `closest()` walk on every mousemove.
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      dot.classList.toggle(styles.hovering, Boolean(target.closest?.(INTERACTIVE_SELECTOR)));
    };

    const tick = () => {
      x += (tx - x) * 0.3;
      y += (ty - y) * 0.3;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return <div ref={dotRef} className={styles.dot} aria-hidden="true" />;
}
