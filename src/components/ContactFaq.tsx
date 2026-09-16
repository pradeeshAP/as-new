import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { contactPage } from "../data/content";
import { SectionLabel } from "./SectionLabel";
import styles from "./ContactFaq.module.css";

export function ContactFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <SectionLabel eyebrow="FAQ" heading={contactPage.faq.heading} headingLevel="h2" />

        <div className={styles.list}>
          {contactPage.faq.items.map((item, i) => {
            const open = openIndex === i;
            return (
              <div className={styles.item} key={item.q}>
                <button
                  type="button"
                  className={styles.question}
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? null : i)}
                >
                  {item.q}
                  <span className={`${styles.toggle} ${open ? styles.toggleOpen : ""}`} aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M6 10l6 6 6-6"
                        stroke={open ? "var(--ink)" : "var(--text)"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      className={styles.answerWrap}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className={styles.answer}>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
