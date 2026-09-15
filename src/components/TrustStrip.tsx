import { trust } from "../data/content";
import { Marquee } from "./Marquee";
import styles from "./TrustStrip.module.css";

export function TrustStrip() {
  return (
    <section className={`${styles.section} grain`}>
      <Marquee speed={38}>
        {trust.statements.map((s) => (
          <span key={s} className={styles.item}>
            {s}
            <span className={styles.dot} aria-hidden="true" />
          </span>
        ))}
      </Marquee>
      <p className={styles.cta}>{trust.cta}</p>
    </section>
  );
}
