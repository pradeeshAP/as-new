import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import type { MouseEvent as ReactMouseEvent } from "react";
import { useRef } from "react";
import { hero } from "../data/content";
import { heroImage } from "../data/media";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useEnter } from "../hooks/useScrollReveal";
import { Button } from "./Button";
import { RollingText } from "./RollingText";
import { LayersIcon, SparkleIcon, ZapIcon } from "./icons/Icons";
import { Magnetic } from "./Magnetic";
import styles from "./Hero.module.css";

const FEATURE_ICONS = [ZapIcon, LayersIcon, SparkleIcon];

/** Splits the heading and wraps the "real-world impact" phrase in the gold accent style. */
function AccentHeading({ text }: { text: string }) {
  const accent = "real-world impact";
  const idx = text.toLowerCase().indexOf(accent);
  if (idx === -1) return <RollingText as="span" text={text} />;
  const before = text.slice(0, idx);
  const match = text.slice(idx, idx + accent.length);
  const after = text.slice(idx + accent.length);
  return (
    <>
      {before && <RollingText as="span" text={before} seedOffset={0} />}
      <span className={styles.accent}>
        <RollingText as="span" text={match} seedOffset={before.length} />
      </span>
      {after && <RollingText as="span" text={after} seedOffset={before.length + match.length} />}
    </>
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  const revealEyebrow = useEnter();
  const revealDescription = useEnter(0.22);
  const revealActions = useEnter(0.32);
  const revealBar = useEnter(0.2);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  // Cursor-reactive parallax — the image drifts opposite the pointer, the glow orb drifts with it.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spx = useSpring(px, { stiffness: 60, damping: 18 });
  const spy = useSpring(py, { stiffness: 60, damping: 18 });
  const imgParallaxX = useTransform(spx, [0, 1], ["1.5%", "-1.5%"]);
  const orbX = useTransform(spx, [0, 1], ["-3%", "3%"]);
  const orbY = useTransform(spy, [0, 1], ["-3%", "3%"]);

  const handlePointerMove = (e: ReactMouseEvent<HTMLElement>) => {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const featureTags = hero.eyebrow.split(" · ");

  return (
    <section id="top" className={styles.hero} ref={sectionRef} onMouseMove={handlePointerMove}>
      <div className={styles.media}>
        <motion.div
          className={styles.parallaxLayer}
          style={{ y: imgY, x: reduced ? undefined : imgParallaxX }}
        >
          <img src={heroImage.src} alt={heroImage.alt} className={styles.img} loading="eager" />
        </motion.div>
        <div className={styles.scrim} aria-hidden="true" />
        <motion.div
          className={styles.glowOrb}
          style={reduced ? undefined : { x: orbX, y: orbY }}
          aria-hidden="true"
        />
        <div className={`${styles.grainLayer} grain`} aria-hidden="true" />
      </div>

      <div className={`container ${styles.content}`}>
        <motion.div {...revealEyebrow} className={`${styles.eyebrowRow} eyebrow`}>
          <span>{hero.eyebrow}</span>
        </motion.div>
        <h1 className={styles.heading}>
          <AccentHeading text={hero.heading} />
        </h1>
        <motion.p {...revealDescription} className={styles.description}>
          {hero.description}
        </motion.p>
        <motion.div {...revealActions} className={styles.actions}>
          <Magnetic>
            <Button href="#contact">{hero.primaryCta}</Button>
          </Magnetic>
          <Magnetic>
            <Button href="#solutions" variant="secondary" onDark>
              {hero.secondaryCta}
            </Button>
          </Magnetic>
        </motion.div>

        <div className={styles.features}>
          {featureTags.map((tag, i) => {
            const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length];
            return (
              <motion.div
                key={tag}
                className={styles.feature}
                initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduced ? 0.01 : 0.6, delay: reduced ? 0 : 0.5 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className={styles.featureIcon} style={{ animationDelay: `${i * 0.6}s` }}>
                  <Icon size={20} />
                </span>
                <span className={styles.featureText}>{tag}</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      <motion.div {...revealBar} className={styles.bar}>
        <div className={`container ${styles.barInner}`}>
          <p className={`${styles.statement} serif`}>{hero.supportingStatement}</p>
          <div className={styles.capabilities}>
            {hero.capabilities.map((cap, i) => (
              <motion.div
                key={cap.label}
                className={styles.capability}
                initial={{ opacity: 0, y: reduced ? 0 : 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{ duration: reduced ? 0.01 : 0.5, delay: reduced ? 0 : i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={reduced ? undefined : { y: -3 }}
              >
                <div className={styles.capabilityLabel}>{cap.label}</div>
                <div className={styles.capabilityDetail}>{cap.detail}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
