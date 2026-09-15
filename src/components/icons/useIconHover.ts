import { useRef, useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const MAX_PLAY_MS = 1200;

/**
 * Self-contained hover-to-play trigger for icon micro-animations.
 * Plays the CSS animation once per hover (class removed on end so it can
 * replay on the next hover) and is a no-op under prefers-reduced-motion.
 * A timeout backstops onAnimationEnd in case an event is missed (e.g. a
 * backgrounded tab throttling the animation timeline).
 */
export function useIconHover() {
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef<number | undefined>(undefined);

  const stop = () => {
    window.clearTimeout(timerRef.current);
    setPlaying(false);
  };

  const start = () => {
    window.clearTimeout(timerRef.current);
    setPlaying(true);
    timerRef.current = window.setTimeout(stop, MAX_PLAY_MS);
  };

  return {
    playing: playing && !reduced,
    handlers: {
      onMouseEnter: start,
      onMouseLeave: stop,
      onAnimationEnd: stop,
    },
  };
}
