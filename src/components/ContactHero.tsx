import { motion, useScroll, useTransform } from "framer-motion";
import { lazy, Suspense, useRef } from "react";
import { Link } from "react-router-dom";
import { contactPage, footer } from "../data/content";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useEnter } from "../hooks/useScrollReveal";
import styles from "./ContactHero.module.css";
import { MailIcon, PhoneIcon } from "./icons/Icons";
import { Magnetic } from "./Magnetic";
import { RollingText } from "./RollingText";

// Three.js is a heavy dependency used only on this page — code-split so the homepage
// bundle stays light, showing the flat SVG illustration while the WebGL chunk loads.
const ContactHeroScene = lazy(() =>
  import("./ContactHeroScene").then((mod) => ({ default: mod.ContactHeroScene })),
);

export function ContactHero() {
  const reduced = useReducedMotion();
  const revealBreadcrumb = useEnter();
  const revealDescription = useEnter(0.2);
  const revealLinks = useEnter(0.3);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const artY = useTransform(scrollYProgress, [0, 1], ["-4%", "8%"]);

  return (
    <section id="top" className={styles.hero} ref={sectionRef}>
      <div className={styles.media}>
        <motion.div style={{ y: reduced ? undefined : artY, position: "absolute", inset: 0 }}>
          {/* No fallback illustration here on purpose — swapping one fully-drawn scene
              for another (the flat SVG, then the WebGL envelope) was the visible flash.
              The section's own dark background already covers the brief load window;
              the canvas fades in (see its CSS) once the WebGL scene is ready. */}
          <Suspense fallback={null}>
            <ContactHeroScene reduced={reduced} />
          </Suspense>
        </motion.div>
        <div className={styles.scrim} aria-hidden="true" />
        <div className={`${styles.grainLayer} grain`} aria-hidden="true" />
      </div>

      <div className={`container ${styles.content}`}>
        <motion.div {...revealBreadcrumb} className={styles.breadcrumb}>
          <Link to="/">Home</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbCurrent}>Contact</span>
        </motion.div>

        <motion.div {...revealBreadcrumb} className={`${styles.eyebrowRow} eyebrow`}>
          <span>{contactPage.eyebrow}</span>
        </motion.div>

        <h1 className={styles.heading}>
          <RollingText as="span" text={contactPage.heading} />
        </h1>

        <motion.p {...revealDescription} className={styles.description}>
          {contactPage.description}
        </motion.p>

        <motion.div {...revealLinks} className={styles.quickLinks}>
          <Magnetic strength={0.25} maxOffset={10}>
            <a href={`mailto:${footer.contact.email}`} className={styles.quickLink}>
              <MailIcon size={16} />
              {footer.contact.email}
            </a>
          </Magnetic>
          <Magnetic strength={0.25} maxOffset={10}>
            <a href={`tel:${footer.contact.phone.replace(/\s/g, "")}`} className={styles.quickLink}>
              <PhoneIcon size={16} />
              {footer.contact.phone}
            </a>
          </Magnetic>
        </motion.div>
      </div>

      <div className={styles.scrollCue}>
        <span>Scroll</span>
        <span className={styles.scrollCueLine} aria-hidden="true" />
      </div>
    </section>
  );
}
