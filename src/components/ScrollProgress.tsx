import { useEffect, useState } from "react";
import styles from "./ScrollProgress.module.css";

const RADIUS = 19;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(scrollTop / max, 1) : 0);
      setVisible(scrollTop > 400);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const offset = CIRCUMFERENCE * (1 - progress);

  return (
    <>
      <div className={styles.topBar} aria-hidden="true">
        <div className={styles.topBarFill} style={{ transform: `scaleX(${progress})` }} />
      </div>
      <button
        type="button"
        className={`${styles.button} ${visible ? styles.visible : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >
        <svg width="44" height="44" viewBox="0 0 44 44">
          <circle cx="22" cy="22" r={RADIUS} fill="none" stroke="var(--border-strong)" strokeWidth="2" />
          <circle
            cx="22"
            cy="22"
            r={RADIUS}
            fill="none"
            stroke="var(--gold)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            transform="rotate(-90 22 22)"
          />
        </svg>
        <span className={styles.arrow} aria-hidden="true">
          ↑
        </span>
      </button>
    </>
  );
}
