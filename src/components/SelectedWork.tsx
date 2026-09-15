import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { selectedWork } from "../data/content";
import { selectedWorkImages } from "../data/media";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useReveal } from "../hooks/useScrollReveal";
import { Magnetic } from "./Magnetic";
import { RollingText } from "./RollingText";
import { TiltImage } from "./TiltImage";
import styles from "./SelectedWork.module.css";

/** One dedicated image per project, shared by the circle preview and its card. */
const PROJECT_IMAGES = selectedWorkImages;

/** Splits the heading and wraps the closing phrase in the gold accent style. */
function AccentHeading({ text }: { text: string }) {
  const accent = "we've shipped";
  const idx = text.toLowerCase().indexOf(accent);
  if (idx === -1) return <RollingText as="span" text={text} />;
  const before = text.slice(0, idx);
  const match = text.slice(idx, idx + accent.length);
  return (
    <>
      {before && <RollingText as="span" text={before} seedOffset={0} />}
      <span className={styles.accent}>
        <RollingText as="span" text={match} seedOffset={before.length} />
      </span>
    </>
  );
}

const ARROW_PATH = "M2 12L12 2M12 2H4M12 2V10";

export function SelectedWork() {
  const reduced = useReducedMotion();
  const revealEyebrow = useReveal();
  const revealHeading = useReveal(0.08);
  const revealDescription = useReveal(0.16);
  const revealArtwork = useReveal(0.24);

  const [active, setActive] = useState(0);
  const entryRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const idx = entryRefs.current.indexOf(entry.target as HTMLDivElement);
          if (idx !== -1) setActive(idx);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    for (const el of entryRefs.current) if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const progressPct = (active / Math.max(selectedWork.projects.length - 1, 1)) * 100;

  return (
    <section id="work" className={styles.section}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.left}>
          <motion.div {...revealEyebrow} className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            {selectedWork.label}
          </motion.div>

          <motion.h2 {...revealHeading} className={styles.heading}>
            <AccentHeading text={selectedWork.heading} />
          </motion.h2>

          <motion.p {...revealDescription} className={styles.description}>
            {selectedWork.description}
          </motion.p>

          <motion.div {...revealArtwork} className={styles.artwork}>
            <span className={styles.ring} aria-hidden="true" />

            <span className={`${styles.sideTag} serif`} aria-hidden="true">
              Ideas
              <br />
              We Build
              <br />
              Brands
              <br />
              We Elevate
              <span className={styles.sideTagUnderline} />
            </span>

            <div className={styles.circleFrame}>
              <AnimatePresence mode="sync">
                {PROJECT_IMAGES.map(
                  (image, i) =>
                    active === i && (
                      <motion.img
                        key={i}
                        src={image.src}
                        alt={image.alt}
                        className={styles.circleImg}
                        initial={{ opacity: 0, scale: reduced ? 1 : 1.12 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: reduced ? 0.01 : 0.9, ease: [0.16, 1, 0.3, 1] }}
                      />
                    ),
                )}
              </AnimatePresence>
              <div className={`${styles.circleScrim} grain`} aria-hidden="true" />
            </div>

            <span className={styles.footTag} aria-hidden="true">
              Better
              <br />
              Communities
              <br />
              Brighter
              <br />
              Tomorrows
            </span>

            <div className={styles.progress} aria-hidden="true">
              <span className={styles.progressTrack}>
                <motion.span
                  className={styles.progressFill}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: reduced ? 0.01 : 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </span>
              <div className={styles.progressDots}>
                {selectedWork.projects.map((project, i) => (
                  <span
                    key={project.number}
                    className={`${styles.progressDot} ${active === i ? styles.progressDotActive : ""}`}
                  >
                    {project.number}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className={styles.right}>
          {selectedWork.projects.map((project, i) => (
            <motion.div
              key={project.name}
              ref={(el) => {
                entryRefs.current[i] = el;
              }}
              className={`${styles.entry} ${active === i ? styles.entryActive : ""}`}
              initial={{ opacity: 0, y: reduced ? 0 : 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              transition={{
                duration: reduced ? 0.01 : 0.65,
                delay: reduced ? 0 : Math.min(i * 0.08, 0.4),
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span className={styles.entryDot} aria-hidden="true" />
              <span className={styles.entryNumber}>{project.number}</span>

              <a href="#contact" className={styles.entryContent}>
                <div className={styles.entryHead}>
                  <h3 className={styles.entryName}>{project.name}</h3>
                  <span className={styles.entryType}>{project.type}</span>
                </div>

                <TiltImage className={styles.entryVisual} intensity={4}>
                  <img
                    src={PROJECT_IMAGES[i % PROJECT_IMAGES.length].src}
                    alt={PROJECT_IMAGES[i % PROJECT_IMAGES.length].alt}
                    className={styles.entryImg}
                    loading="lazy"
                  />
                  <div className={styles.entryScrim} aria-hidden="true" />
                  <span className={styles.entryTagline} aria-hidden="true">
                    {project.tagline.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </span>
                  <span className={styles.entryArrow} aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                      <path
                        d={ARROW_PATH}
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </TiltImage>
              </a>
            </motion.div>
          ))}

          <motion.div
            className={styles.scrollCue}
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: reduced ? 0.01 : 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.scrollCueText}>Scroll to Explore</span>
            <span className={styles.scrollCueLine} aria-hidden="true" />
            <Magnetic>
              <a href="#contact" className={styles.scrollCueBtn} aria-label="Go to contact">
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path
                    d="M7 2v10M7 12 2 7M7 12l5-5"
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
      </div>
    </section>
  );
}
