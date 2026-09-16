import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { contactPage, footer } from "../data/content";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useReveal } from "../hooks/useScrollReveal";
import styles from "./ContactInfo.module.css";
import { MailIcon, MapPinIcon, PhoneIcon } from "./icons/Icons";

export function ContactInfo() {
  const reduced = useReducedMotion();
  const revealBadge = useReveal();
  const revealCard = useReveal(0.1);
  const revealProcess = useReveal(0.2);

  const stepsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stepsRef, offset: ["start end", "end center"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 34, damping: 20, mass: 0.6 });
  const lineScale = useTransform(smoothProgress, [0, 1], [0, 1]);

  return (
    <div className={styles.col}>
      <motion.div {...revealBadge} className={styles.badge}>
        <span className={styles.badgeDot} aria-hidden="true" />
        Replies within 1 business day
      </motion.div>

      <motion.div {...revealCard} className={`${styles.card} grain`}>
        <h2 className={styles.cardTitle}>{contactPage.info.heading}</h2>
        <p className={styles.cardDescription}>{contactPage.info.description}</p>

        <div className={styles.contactList}>
          <a href={`mailto:${footer.contact.email}`} className={styles.contactRow}>
            <span className={styles.contactIcon}>
              <MailIcon size={18} />
            </span>
            <span className={styles.contactText}>
              <span className={styles.contactLabel}>Email</span>
              <span className={styles.contactValue}>{footer.contact.email}</span>
            </span>
          </a>

          <a href={`tel:${footer.contact.phone.replace(/\s/g, "")}`} className={styles.contactRow}>
            <span className={styles.contactIcon}>
              <PhoneIcon size={18} />
            </span>
            <span className={styles.contactText}>
              <span className={styles.contactLabel}>Phone</span>
              <span className={styles.contactValue}>{footer.contact.phone}</span>
            </span>
          </a>

          <div className={styles.contactRow}>
            <span className={styles.contactIcon}>
              <MapPinIcon size={18} />
            </span>
            <span className={styles.contactText}>
              <span className={styles.contactLabel}>Office</span>
              <span className={styles.contactValue}>
                {footer.contact.address.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </span>
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div {...revealProcess} className={styles.processCard}>
        <h3 className={styles.processTitle}>{contactPage.process.heading}</h3>
        <div className={styles.steps} ref={stepsRef}>
          <div className={styles.stepLine} aria-hidden="true">
            <motion.div
              className={styles.stepLineFill}
              style={{ scaleY: reduced ? 1 : lineScale }}
            />
          </div>
          {contactPage.process.steps.map((step, i) => (
            <div className={styles.step} key={step.title}>
              <span className={styles.stepIndex}>{i + 1}</span>
              <span className={styles.stepBody}>
                <span className={styles.stepTitle}>{step.title}</span>
                <span className={styles.stepDetail}>{step.detail}</span>
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
