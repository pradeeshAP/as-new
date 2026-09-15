import { motion } from "framer-motion";
import { company, finalCta } from "../data/content";
import { useReveal } from "../hooks/useScrollReveal";
import { Button } from "./Button";
import { Magnetic } from "./Magnetic";
import { Marquee } from "./Marquee";
import { RollingText } from "./RollingText";
import styles from "./FinalCta.module.css";

export function FinalCta() {
  const revealEyebrow = useReveal();
  const revealHeading = useReveal(0.1);
  const revealDescription = useReveal(0.2);
  const revealCta = useReveal(0.3);

  return (
    <section id="contact" className={`${styles.section} grain`}>
      <div className={styles.ghostRow} aria-hidden="true">
        <Marquee speed={26}>
          <span className={styles.ghostText}>{company.name}&nbsp;</span>
        </Marquee>
      </div>

      <div className={`container ${styles.inner}`}>
        <motion.div {...revealEyebrow} className={`eyebrow ${styles.eyebrow}`}>
          {finalCta.label}
        </motion.div>
        <motion.h2 {...revealHeading} className={styles.heading}>
          <RollingText as="span" text={finalCta.heading} />
        </motion.h2>
        <motion.p {...revealDescription} className={styles.description}>
          {finalCta.description}
        </motion.p>
        <motion.div {...revealCta} className={styles.cta}>
          <Magnetic>
            <Button href="mailto:info@ascendingsoftware.com" onDark>
              {finalCta.cta}
            </Button>
          </Magnetic>
        </motion.div>
      </div>
      <span className={styles.corner}>ASC / 2026</span>
    </section>
  );
}
