import styles from "./ContactHeroArt.module.css";

/**
 * Original generative illustration for the Contact hero — an abstract network of
 * orbiting nodes converging on a central hub, rendered as a self-animating inline SVG
 * (no external image asset). Visualizes "getting in touch": signals travelling inward
 * along connecting lines toward one point of contact.
 */
export function ContactHeroArt() {
  return (
    <div className={styles.art} aria-hidden="true">
      <svg viewBox="0 0 900 900" preserveAspectRatio="xMidYMid slice" className={styles.svg}>
        <defs>
          <radialGradient id="hubGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--gold-soft)" />
            <stop offset="55%" stopColor="var(--gold)" />
            <stop offset="100%" stopColor="var(--gold-dark)" />
          </radialGradient>
          <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle className={styles.bgGlow} cx="450" cy="450" r="360" fill="url(#glowGrad)" />

        {/* Flow lines: signal travelling inward from each orbit toward the hub */}
        <g className={styles.flowLines} stroke="var(--gold)" strokeOpacity="0.4" fill="none" strokeWidth="1.4">
          <path className={styles.flow1} d="M450 450 L450 120" />
          <path className={styles.flow2} d="M450 450 L730 300" />
          <path className={styles.flow3} d="M450 450 L730 610" />
          <path className={styles.flow4} d="M450 450 L450 790" />
          <path className={styles.flow5} d="M450 450 L170 610" />
          <path className={styles.flow6} d="M450 450 L170 300" />
        </g>

        {/* Orbit rings, each rotating at a different speed / direction */}
        <g className={styles.ring1}>
          <circle cx="450" cy="450" r="330" fill="none" stroke="var(--ink-line-strong)" strokeWidth="1" strokeDasharray="2 10" />
          <circle className={`${styles.node} ${styles.node1}`} cx="450" cy="120" r="10" fill="url(#hubGrad)" />
          <circle className={`${styles.node} ${styles.node2}`} cx="730" cy="300" r="7" fill="var(--gold-soft)" />
        </g>

        <g className={styles.ring2}>
          <circle cx="450" cy="450" r="230" fill="none" stroke="var(--ink-line-strong)" strokeWidth="1" strokeDasharray="1 8" />
          <circle className={`${styles.node} ${styles.node3}`} cx="730" cy="610" r="8" fill="var(--gold)" />
          <circle className={`${styles.node} ${styles.node4}`} cx="170" cy="610" r="6" fill="var(--gold-soft)" />
        </g>

        <g className={styles.ring3}>
          <circle cx="450" cy="450" r="180" fill="none" stroke="var(--ink-line-strong)" strokeWidth="1" strokeDasharray="3 12" />
          <circle className={`${styles.node} ${styles.node5}`} cx="450" cy="790" r="9" fill="var(--gold-soft)" />
          <circle className={`${styles.node} ${styles.node6}`} cx="170" cy="300" r="6" fill="var(--gold)" />
        </g>

        {/* Central hub */}
        <g className={styles.hub}>
          <circle cx="450" cy="450" r="70" fill="none" stroke="var(--gold)" strokeOpacity="0.3" strokeWidth="1" className={styles.hubHalo} />
          <circle cx="450" cy="450" r="46" fill="url(#hubGrad)" />
          <path
            d="M430 462 L444 476 L474 428"
            stroke="var(--ink)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>

        {/* Loose floating particles for atmosphere */}
        <circle className={`${styles.particle} ${styles.p1}`} cx="240" cy="180" r="3" fill="var(--gold-soft)" />
        <circle className={`${styles.particle} ${styles.p2}`} cx="660" cy="180" r="2.4" fill="var(--gold)" />
        <circle className={`${styles.particle} ${styles.p3}`} cx="720" cy="500" r="2.8" fill="var(--gold-soft)" />
        <circle className={`${styles.particle} ${styles.p4}`} cx="220" cy="700" r="3.2" fill="var(--gold)" />
        <circle className={`${styles.particle} ${styles.p5}`} cx="600" cy="740" r="2.4" fill="var(--gold-soft)" />
      </svg>
    </div>
  );
}
