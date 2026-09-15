import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { company, footer } from "../data/content";
import { useReveal } from "../hooks/useScrollReveal";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { MailIcon, MapPinIcon, PhoneIcon } from "./icons/Icons";
import styles from "./Footer.module.css";

const QUICK_LINK_HREFS: Record<string, string> = {
  Home: "#top",
  "About Us": "#why-us",
  Services: "#solutions",
  Contact: "#contact",
};

export function Footer() {
  const reduced = useReducedMotion();
  const revealWordmark = useReveal();
  const revealCol0 = useReveal(0.05);
  const revealCol1 = useReveal(0.1);
  const revealCol2 = useReveal(0.15);
  const revealCol3 = useReveal(0.2);

  // The gold reveal is scrubbed directly off scroll position rather than a timed animation:
  // scrollYProgress tracks how far the wordmark has travelled through the viewport, a soft
  // spring smooths that raw scroll input, and a clip-path wipe is a live 1:1 transform of it —
  // letters are invisible until the sweep reaches them, appearing gold left-to-right as you
  // scroll down, finishing well before the wordmark reaches the top of the screen, and hiding
  // again if you scroll back up.
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wordmarkRef, offset: ["start end", "center center"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 34, damping: 20, mass: 0.6 });
  const fillClip = useTransform(smoothProgress, [0, 1], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);

  return (
    <footer className={`${styles.footer} grain`}>
      <motion.div {...revealWordmark} className={`container ${styles.wordmarkRow}`} ref={wordmarkRef}>
        <span className={styles.wordmarkWrap}>
          <motion.span
            className={styles.wordmarkFill}
            style={{ clipPath: reduced ? "inset(0 0% 0 0)" : fillClip }}
          >
            {company.name}
          </motion.span>
        </span>
      </motion.div>

      <div className={`container ${styles.top}`}>
        <motion.div {...revealCol0}>
          <p className={styles.description}>{footer.description}</p>
        </motion.div>

        <motion.div {...revealCol1}>
          <div className={styles.colTitle}>Quick Links</div>
          <nav className={styles.colLinks}>
            {footer.quickLinks.map((link) => (
              <a key={link} href={QUICK_LINK_HREFS[link] ?? "#top"}>
                {link}
              </a>
            ))}
          </nav>
        </motion.div>

        <motion.div {...revealCol2}>
          <div className={styles.colTitle}>Services</div>
          <nav className={styles.colLinks}>
            {footer.services.map((service) => (
              <a key={service} href="#solutions">
                {service}
              </a>
            ))}
          </nav>
        </motion.div>

        <motion.div {...revealCol3}>
          <div className={styles.colTitle}>Contact</div>
          <address className={styles.contact} style={{ fontStyle: "normal" }}>
            <a href={`mailto:${footer.contact.email}`} className={styles.contactLine}>
              <MailIcon size={16} />
              {footer.contact.email}
            </a>
            <a href={`tel:${footer.contact.phone.replace(/\s/g, "")}`} className={styles.contactLine}>
              <PhoneIcon size={16} />
              {footer.contact.phone}
            </a>
            <span className={styles.contactLine}>
              <MapPinIcon size={16} />
              <span>
                {footer.contact.address.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </span>
            </span>
          </address>
        </motion.div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <span className={styles.copyright}>{footer.legal.copyright}</span>
        <div className={styles.legalLinks}>
          {footer.legal.links.map((link) => (
            <a key={link} href="#top">
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
