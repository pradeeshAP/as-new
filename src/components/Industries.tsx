import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { industries } from "../data/content";
import { industriesMeta } from "../data/industriesMeta";
import { globeImage, industryImages } from "../data/media";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useReveal } from "../hooks/useScrollReveal";
import { Magnetic } from "./Magnetic";
import { RollingText } from "./RollingText";
import styles from "./Industries.module.css";

const AUTOPLAY_DELAY = 4200;
const DRAG_THRESHOLD = 6;

interface IndustryCardProps {
  item: string;
  index: number;
  isCenter: boolean;
  reduced: boolean;
  registerRef: (el: HTMLDivElement | null) => void;
}

/** One carousel card — owns its own cursor-tilt spring so hover math never leaks between cards. */
function IndustryCard({ item, index, isCenter, reduced, registerRef }: IndustryCardProps) {
  const meta = industriesMeta[item];
  const Icon = meta?.Icon;
  const image = industryImages[item];

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smx = useSpring(mx, { stiffness: 260, damping: 24 });
  const smy = useSpring(my, { stiffness: 260, damping: 24 });
  const rotateX = useTransform(smy, [0, 1], [8, -8]);
  const rotateY = useTransform(smx, [0, 1], [-8, 8]);

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const resetTilt = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      ref={registerRef}
      className={styles.cardOuter}
      initial={{ opacity: 0, y: reduced ? 0 : 80, scale: reduced ? 1 : 0.82, filter: reduced ? "none" : "blur(14px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{
        duration: reduced ? 0.01 : 1.8,
        delay: reduced ? 0 : Math.min(index * 0.22, 1.5),
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Tilt/lift lives on its own motion node so it never fights the entrance transform above. */}
      <motion.div
        className={`${styles.card} ${isCenter ? styles.cardCenter : ""}`}
        onMouseLeave={resetTilt}
        onMouseMove={handleMouseMove}
        animate={
          reduced
            ? undefined
            : isCenter
              ? { y: -10, scale: [1.11, 1.15] }
              : { y: 0, scale: 1 }
        }
        transition={
          isCenter
            ? {
                y: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                scale: { duration: 2.6, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" },
              }
            : { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
        }
        style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 800, zIndex: isCenter ? 2 : 1 }}
      >
        <span className={styles.cardShine} aria-hidden="true" />
        <div className={styles.cardTop}>
          <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
          {Icon && (
            <span className={styles.cardIcon}>
              <Icon size={26} />
            </span>
          )}
        </div>
        <h3 className={styles.cardTitle}>{item}</h3>
        {meta?.subtitle && <p className={styles.cardSubtitle}>{meta.subtitle}</p>}
        {image && (
          <div className={styles.cardImageWrap}>
            <img src={image.src} alt={image.alt} className={styles.cardImage} loading="lazy" draggable={false} />
            <div className={styles.cardImageScrim} aria-hidden="true" />
            <div className={styles.cardImageGlow} aria-hidden="true" />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export function Industries() {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const dragState = useRef({ dragging: false, moved: false, startX: 0, startScroll: 0 });

  const revealEyebrow = useReveal();
  const revealHeading = useReveal(0.08);
  const revealDescription = useReveal(0.16);

  // Scrolls so that card i's own center lands on the track's visual center (not its left edge).
  const scrollToIndex = (i: number) => {
    const track = trackRef.current;
    const el = cardRefs.current[i];
    if (!track || !el) return;
    const trackRect = track.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const elLeftInTrack = elRect.left - trackRect.left + track.scrollLeft;
    const target = elLeftInTrack + elRect.width / 2 - track.clientWidth / 2;
    track.scrollTo({ left: target, behavior: reduced ? "auto" : "smooth" });
  };

  const scrollBy = (dir: 1 | -1) => {
    const next = Math.min(Math.max(active + dir, 0), industries.items.length - 1);
    scrollToIndex(next);
  };

  // Whichever card's center is closest to the track's visual center becomes "active" —
  // recomputed continuously during scroll/drag so the pop-out follows the eye, not the index.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    const measure = () => {
      const trackRect = track.getBoundingClientRect();
      const centerX = trackRect.left + trackRect.width / 2;
      let closestIndex = 0;
      let closestDist = Infinity;
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.left + rect.width / 2 - centerX);
        if (dist < closestDist) {
          closestDist = dist;
          closestIndex = i;
        }
      });
      setActive(closestIndex);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    measure();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Autoplay — advances one card at a time, re-arming off the real active index so it never
  // drifts out of sync with whatever the visitor just scrolled or dragged to.
  useEffect(() => {
    if (reduced || paused) return;
    const id = window.setTimeout(() => {
      const next = active + 1 >= industries.items.length ? 0 : active + 1;
      scrollToIndex(next);
    }, AUTOPLAY_DELAY);
    return () => window.clearTimeout(id);
  }, [reduced, paused, active]);

  // Click-and-drag scrolling — native overflow-x only responds to touch, so desktop needs this.
  // Touch/pen pointers are left alone so native touch scrolling keeps its momentum feel.
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || reduced || e.pointerType !== "mouse") return;
    dragState.current = { dragging: true, moved: false, startX: e.clientX, startScroll: track.scrollLeft };
    track.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    const state = dragState.current;
    if (!track || !state.dragging) return;
    const delta = e.clientX - state.startX;
    if (Math.abs(delta) > DRAG_THRESHOLD) state.moved = true;
    track.scrollLeft = state.startScroll - delta;
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    const state = dragState.current;
    if (track?.hasPointerCapture(e.pointerId)) track.releasePointerCapture(e.pointerId);
    if (state.moved) {
      // Swallow the click that follows a drag so it doesn't also fire a navigation.
      const suppressClick = (ev: MouseEvent) => ev.stopPropagation();
      track?.addEventListener("click", suppressClick, { capture: true, once: true });
    }
    dragState.current = { dragging: false, moved: false, startX: 0, startScroll: 0 };
  };

  return (
    <section id="industries" className={`${styles.section} grain`}>
      <div className={styles.globe} aria-hidden="true">
        <div className={styles.globeClip}>
          <img src={globeImage.src} alt="" className={styles.globeImg} />
          <div className={styles.globeGlow} />
        </div>
        <span className={`${styles.orbitDot} ${styles.orbitDot1}`} />
        <span className={`${styles.orbitDot} ${styles.orbitDot2}`} />
        <span className={`${styles.orbitDot} ${styles.orbitDot3}`} />
      </div>

      <div className={styles.sideLine} aria-hidden="true">
        <span className={styles.sideLineText}>
          Ideas
          <br />
          Industries
          <br />
          Impact
        </span>
        <svg viewBox="0 0 2 220" preserveAspectRatio="none" className={styles.sideLineSvg}>
          <line x1="1" y1="0" x2="1" y2="220" stroke="var(--ink-line-strong)" strokeWidth="1" />
        </svg>
      </div>

      <span className={styles.techKicker} aria-hidden="true">
        TECH
        <br />
        PEOPLE
        <br />
        PROGRESS
        <span className={styles.techKickerDash} />
      </span>

      <div className="container">
        <div className={styles.header}>
          <motion.div {...revealEyebrow} className={`${styles.eyebrowRow} eyebrow`}>
            <span>{industries.label}</span>
          </motion.div>
          <motion.h2 {...revealHeading} className={styles.heading}>
            <RollingText as="span" text={industries.heading} />
          </motion.h2>
          <motion.p {...revealDescription} className={styles.description}>
            {industries.description}
          </motion.p>
        </div>
      </div>

      <div
        className={styles.carousel}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <Magnetic>
          <button
            type="button"
            className={`${styles.navBtn} ${styles.navPrev}`}
            onClick={() => scrollBy(-1)}
            aria-label="Previous industries"
          >
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
              <path
                d="M12 2 2 12M2 12h8M2 12V4"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </Magnetic>

        <div
          className={styles.track}
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
        >
          {industries.items.map((item, i) => (
            <IndustryCard
              key={item}
              item={item}
              index={i}
              reduced={reduced}
              isCenter={active === i}
              registerRef={(el) => {
                cardRefs.current[i] = el;
              }}
            />
          ))}
        </div>

        <Magnetic>
          <button
            type="button"
            className={`${styles.navBtn} ${styles.navNext}`}
            onClick={() => scrollBy(1)}
            aria-label="Next industries"
          >
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 12 12 2M12 2H4M12 2v8"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </Magnetic>
      </div>

      <div className={styles.dots} role="tablist" aria-label="Select industry">
        {industries.items.map((item, i) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={active === i}
            aria-label={item}
            className={`${styles.dot} ${active === i ? styles.dotActive : ""}`}
            onClick={() => scrollToIndex(i)}
          />
        ))}
      </div>

      <div className="container">
        <div className={styles.footerRow}>
          <span className={styles.footerKicker}>Building solutions across what moves the world</span>
          <span className={styles.footerLine} aria-hidden="true" />
          <Magnetic>
            <a href="#solutions" className={styles.exploreBtn}>
              <span>Explore All Industries</span>
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true">
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
        </div>
      </div>

      <div className={styles.pagination} aria-hidden="true">
        <span className={styles.paginationLine} />
        <span
          className={styles.paginationDot}
          style={{
            transform: `translateY(${(active / Math.max(industries.items.length - 1, 1)) * 60}px)`,
          }}
        />
      </div>
    </section>
  );
}
