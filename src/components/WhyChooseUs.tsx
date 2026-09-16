import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import { trust, whyChooseUs } from "../data/content";
import { whyChooseUsImage } from "../data/media";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useReveal } from "../hooks/useScrollReveal";
import { BriefcaseIcon, CubeIcon, GearIcon, HandshakeIcon, LayersIcon, SparkleIcon } from "./icons/Icons";
import { HexagonBackground } from "./HexagonBackground";
import { Magnetic } from "./Magnetic";
import { RollingText } from "./RollingText";
import styles from "./WhyChooseUs.module.css";

const REASON_ICONS = [SparkleIcon, CubeIcon, LayersIcon, HandshakeIcon, GearIcon, BriefcaseIcon];

/** Splits the heading and wraps the "solution" phrase in the gold italic-serif accent style. */
function AccentHeading({ text }: { text: string }) {
  const accent = "solution";
  const idx = text.toLowerCase().indexOf(accent);
  if (idx === -1) return <RollingText as="span" text={text} />;
  const before = text.slice(0, idx);
  const match = text.slice(idx, idx + accent.length);
  const after = text.slice(idx + accent.length);
  return (
    <>
      {before && <RollingText as="span" text={before} seedOffset={0} />}
      <span className={`${styles.accent} serif`}>
        <RollingText as="span" text={match} seedOffset={before.length} />
      </span>
      {after && <RollingText as="span" text={after} seedOffset={before.length + match.length} />}
    </>
  );
}

export function WhyChooseUs() {
  const reduced = useReducedMotion();
  const revealEyebrow = useReveal();
  const revealHeading = useReveal(0.08);
  const revealDescription = useReveal(0.16);
  const revealCta = useReveal(0.24);
  const revealImage = useReveal(0.1);
  const revealPanel = useReveal(0.2);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  // Parent-driven stagger — one viewport trigger cascades every row in a single,
  // unified sweep instead of each row racing its own independent observer.
  const listVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduced ? 0 : 0.09, delayChildren: reduced ? 0 : 0.05 } },
  };
  const rowVariants: Variants = {
    hidden: { opacity: 0, x: reduced ? 0 : -22, scale: reduced ? 1 : 0.98 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: reduced ? 0.01 : 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="why-us" className={styles.section} ref={sectionRef}>
      <HexagonBackground tone="light" hexagonSize={72} className={styles.hexagons} />

      <div className="container">
        <div className={styles.grid}>
          <div className={styles.left}>
            <motion.div {...revealEyebrow} className="eyebrow">
              {whyChooseUs.label}
            </motion.div>
            <motion.h2 {...revealHeading} className={styles.heading}>
              <AccentHeading text={whyChooseUs.heading} />
            </motion.h2>
            <motion.p {...revealDescription} className={styles.description}>
              {whyChooseUs.description}
            </motion.p>
            <motion.div {...revealCta} className={styles.ctaRow}>
              <Magnetic>
                <a href="#contact" className={styles.ctaBtn}>
                  <span>{whyChooseUs.cta}</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path
                      d="M2 12L12 2M12 2H4M12 2V10"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </Magnetic>
            </motion.div>
          </div>

          <div className={styles.right}>
            <motion.div {...revealImage} className={styles.imageFrame}>
              <motion.img
                src={whyChooseUsImage.src}
                alt={whyChooseUsImage.alt}
                className={styles.image}
                loading="lazy"
                // Zooming from the image's own center (the default transform-origin)
                // crops evenly off every edge — including straight through the top of
                // his head, since he's framed close to the top of the source photo.
                // Anchoring the zoom near the top instead spends nearly all of that
                // crop on the (empty) floor at the bottom, where it doesn't matter.
                style={
                  reduced
                    ? undefined
                    : { y: imageY, scale: 1.2, transformOrigin: "50% 10%" }
                }
              />
              <div className={styles.imageScrim} aria-hidden="true" />
            </motion.div>

            <span className={`${styles.noteTag} serif`} aria-hidden="true">
              Ideas
              <br />
              Build
              <br />
              Better
              <br />
              Tomorrows
              <span className={styles.noteUnderline} />
            </span>

            <span className={styles.techTag} aria-hidden="true">
              Technology
              <br />
              People
              <br />
              Progress
            </span>

            <motion.div {...revealPanel} className={styles.panel}>
              <motion.ul
                className={styles.reasonList}
                variants={listVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              >
                {whyChooseUs.reasons.map((reason, i) => {
                  const Icon = REASON_ICONS[i % REASON_ICONS.length];
                  return (
                    <motion.li key={reason} className={styles.reasonRow} variants={rowVariants}>
                      <span className={styles.reasonIcon}>
                        <Icon size={20} />
                      </span>
                      <span className={styles.reasonText}>{reason}</span>
                      <span className={styles.reasonNumber}>{String(i + 1).padStart(2, "0")}</span>
                    </motion.li>
                  );
                })}
              </motion.ul>

              <div className={styles.panelFooter}>
                <Magnetic>
                  <a href="#contact" className={styles.footerLink}>
                    <span className={styles.footerArrow}>
                      <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path
                          d="M2 12L12 2M12 2H4M12 2V10"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className={`${styles.footerText} serif`}>{trust.cta}</span>
                  </a>
                </Magnetic>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
