import gsap from "gsap";
import { useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import styles from "./RollingText.module.css";

// Matches the --ease-out token in tokens.css — kept in sync since GSAP needs a JS-readable value.
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const ENTER_DURATION = 1.15;
const ENTER_STAGGER = 0.05;
const ENTER_FROM_ROTATE = 90;
const ENTER_FROM_Y_PERCENT = 16;
const HOVER_DURATION = 1.1;

function supportsHover() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

interface LetterReelProps {
  char: string;
  index: number;
  reduced: boolean;
  hoverReroll: boolean;
  start: boolean;
}

/**
 * A single character rendered as a two-faced 3D drum (front + back copies of the same
 * glyph, offset by translateZ and pre-rotated 180deg apart). Rotating the drum around X
 * rolls one face away and the other into view — a continuous cylinder roll rather than a
 * flat spin or fade. The outer `.letter` box is sized by an invisible sizer span so the
 * drum can be absolutely positioned without ever affecting layout/kerning.
 */
function LetterReel({ char, index, reduced, hoverReroll, start }: LetterReelProps) {
  const letterRef = useRef<HTMLSpanElement>(null);
  const drumRef = useRef<HTMLSpanElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // Sizing runs before paint so there's never a flash of unsized letters.
  useLayoutEffect(() => {
    const letterEl = letterRef.current;
    if (!letterEl) return;

    const applyStep = () => {
      const fontSize = parseFloat(getComputedStyle(letterEl).fontSize);
      const step = Math.round(fontSize * 1.4);
      letterEl.style.setProperty("--step", `${step}px`);
    };
    applyStep();

    const ro = new ResizeObserver(applyStep);
    ro.observe(letterEl.parentElement ?? letterEl);
    return () => ro.disconnect();
  }, []);

  // Rolls in whenever the heading scrolls into view, and resets to the folded pose
  // whenever it scrolls back out — so the roll replays every time it re-enters.
  useLayoutEffect(() => {
    const drumEl = drumRef.current;
    if (!drumEl || reduced) return;

    tweenRef.current?.kill();

    if (start) {
      tweenRef.current = gsap.to(drumEl, {
        rotateX: 0,
        yPercent: 0,
        duration: ENTER_DURATION,
        delay: index * ENTER_STAGGER,
        ease: EASE,
      });
    } else {
      gsap.set(drumEl, { rotateX: ENTER_FROM_ROTATE, yPercent: ENTER_FROM_Y_PERCENT });
    }

    return () => {
      tweenRef.current?.kill();
    };
  }, [reduced, start, index]);

  const handleMouseEnter = () => {
    if (reduced || !hoverReroll || !supportsHover()) return;
    const drumEl = drumRef.current;
    if (!drumEl) return;

    // Snap to the resting pose first so a hover mid-entrance (or a rapid re-hover)
    // always starts the roll from the exact same base — no stacking, no drift.
    tweenRef.current?.kill();
    gsap.set(drumEl, { rotateX: 0, yPercent: 0 });
    tweenRef.current = gsap.to(drumEl, {
      rotateX: -360,
      duration: HOVER_DURATION,
      ease: EASE,
      onComplete: () => gsap.set(drumEl, { rotateX: 0 }),
    });
  };

  return (
    <span className={styles.letter} ref={letterRef} onMouseEnter={handleMouseEnter}>
      <span className={styles.sizer}>{char}</span>
      <span className={styles.drum} ref={drumRef}>
        <span className={styles.face}>{char}</span>
        <span className={`${styles.face} ${styles.faceBack}`}>{char}</span>
      </span>
    </span>
  );
}

interface RollingTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  hoverReroll?: boolean;
  seedOffset?: number;
}

/** Letter-by-letter 3D roll reveal, with an independent single-letter roll on hover. */
export function RollingText({ text, as = "span", className, hoverReroll = true, seedOffset = 0 }: RollingTextProps) {
  const reduced = useReducedMotion();
  const Tag = as;
  const rootRef = useRef<HTMLSpanElement | null>(null);
  const [start, setStart] = useState(false);
  const tokens = text.split(/(\s+)/);
  let index = seedOffset;

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setStart(entry.isIntersecting);
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag className={`${styles.rollingText} ${className ?? ""}`}>
      <span className="visually-hidden">{text}</span>
      <span aria-hidden="true" ref={rootRef}>
        {tokens.map((token, ti) => {
          if (token === "") return null;
          if (/^\s+$/.test(token)) {
            return (
              <span key={ti} className={styles.space}>
                {token}
              </span>
            );
          }
          return (
            <span key={ti} className={styles.word}>
              {[...token].map((char) => {
                const charIndex = index++;
                return (
                  <LetterReel
                    key={charIndex}
                    char={char}
                    index={charIndex}
                    reduced={reduced}
                    hoverReroll={hoverReroll}
                    start={start}
                  />
                );
              })}
            </span>
          );
        })}
      </span>
    </Tag>
  );
}
