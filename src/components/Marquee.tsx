import type { ReactNode } from "react";
import styles from "./Marquee.module.css";

interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
}

/** Seamless infinite horizontal scroller — content is duplicated and animated -50%. */
export function Marquee({ children, speed = 32, reverse = false, className }: MarqueeProps) {
  return (
    <div className={`${styles.marquee} ${className ?? ""}`}>
      <div
        className={`${styles.track} ${reverse ? styles.reverse : ""}`}
        style={{ animationDuration: `${speed}s` }}
      >
        <div className={styles.group}>{children}</div>
        <div className={styles.group} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
