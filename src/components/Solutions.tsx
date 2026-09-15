import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { solutions } from "../data/content";
import { solutionImages } from "../data/media";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { RollingText } from "./RollingText";
import { SectionLabel } from "./SectionLabel";
import styles from "./Solutions.module.css";

export function Solutions() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  return (
    <section id="solutions" className={styles.section}>
      <div className={styles.layout}>
        <div className={styles.left}>
          <div className={styles.header}>
            <SectionLabel
              eyebrow={solutions.label}
              heading={<RollingText as="span" text={solutions.heading} />}
              description={solutions.description}
              onDark
            />
          </div>

          <div className={styles.list}>
            {solutions.items.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: reduced ? 0 : -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{ duration: reduced ? 0.01 : 0.55, delay: reduced ? 0 : i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  type="button"
                  className={`${styles.row} ${active === i ? styles.active : ""}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-expanded={active === i}
                >
                  <span className={styles.rowNumber}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.rowTitle}>{item.title}</span>
                  <span className={styles.rowArrow} aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M2 12L12 2M12 2H4M12 2V10"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {active === i && (
                    <motion.div
                      className={styles.capsWrap}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className={styles.capsInner}>
                        {item.capabilities.map((cap, ci) => (
                          <motion.span
                            key={cap}
                            className={styles.cap}
                            initial={{ opacity: 0, x: reduced ? 0 : -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: reduced ? 0.01 : 0.35, delay: reduced ? 0 : ci * 0.05, ease: [0.16, 1, 0.3, 1] }}
                          >
                            {cap}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        <div className={styles.right}>
          <AnimatePresence mode="sync">
            {solutions.items.map(
              (_, i) =>
                active === i && (
                  <motion.img
                    key={i}
                    src={solutionImages[i % solutionImages.length].src}
                    alt={solutionImages[i % solutionImages.length].alt}
                    className={styles.image}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  />
                ),
            )}
          </AnimatePresence>
          <div className={styles.imageScrim} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
