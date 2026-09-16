import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent } from "react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { industries } from "../data/content";
import { industriesMeta } from "../data/industriesMeta";
import { globeImage, industryImages } from "../data/media";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useReveal } from "../hooks/useScrollReveal";
import { HexagonBackground } from "./HexagonBackground";
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
      initial={{ opacity: 0, y: reduced ? 0 : 80, scale: reduced ? 1 : 0.82 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{
        duration: reduced ? 0.01 : 1.1,
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
  const [paused, setPaused] = useState(false);
  const dragState = useRef({ dragging: false, moved: false, startX: 0, startScroll: 0 });

  const revealEyebrow = useReveal();
  const revealHeading = useReveal(0.08);
  const revealDescription = useReveal(0.16);

  // Real card count, and a tripled list (prev-set / real-set / next-set) so the carousel can
  // scroll infinitely in either direction — the clones make the wrap invisible.
  const count = industries.items.length;
  const displayItems = useMemo(
    () => [...industries.items, ...industries.items, ...industries.items],
    [],
  );
  // "activePos" indexes into displayItems (always kept within the middle set's [count, 2*count)
  // range right after any scroll settles), so it directly tells each card whether it's centered.
  const [activePos, setActivePos] = useState(count);
  const activeReal = ((activePos % count) + count) % count;

  // Scrolls so that displayItems[i]'s own center lands on the track's visual center.
  const scrollToPos = (i: number, smooth: boolean) => {
    const track = trackRef.current;
    const el = cardRefs.current[i];
    if (!track || !el) return;
    const trackRect = track.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const elLeftInTrack = elRect.left - trackRect.left + track.scrollLeft;
    const target = elLeftInTrack + elRect.width / 2 - track.clientWidth / 2;
    if (smooth && !reduced) {
      track.scrollTo({ left: target, behavior: "smooth" });
    } else {
      track.scrollLeft = target;
    }
  };

  const goToPos = (i: number) => {
    scrollToPos(i, true);
    setActivePos(i);
  };

  const scrollBy = (dir: 1 | -1) => goToPos(activePos + dir);

  // Jumps to whichever occurrence of real index j is nearest the current position, so clicking
  // a dot never triggers an unnecessarily long scroll across the whole tripled track.
  const scrollToRealIndex = (j: number) => {
    const candidates = [j, count + j, 2 * count + j];
    let best = candidates[0];
    let bestDist = Infinity;
    for (const c of candidates) {
      const dist = Math.abs(c - activePos);
      if (dist < bestDist) {
        bestDist = dist;
        best = c;
      }
    }
    goToPos(best);
  };

  // Center the very first card before paint so the initial frame never flashes the wrong set.
  useLayoutEffect(() => {
    scrollToPos(count, false);
    setActivePos(count);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Whichever card's center is closest to the track's visual center becomes "active" —
  // recomputed continuously during scroll/drag so the pop-out follows the eye, not the index.
  // Once scrolling settles, if that card sits in a clone set, silently re-center on the
  // equivalent card in the real (middle) set — identical content, so the jump is invisible —
  // which is what makes the loop continue forever instead of stopping at either end.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    let settleTimer = 0;

    const closestIndex = () => {
      const trackRect = track.getBoundingClientRect();
      const centerX = trackRect.left + trackRect.width / 2;
      let closest = 0;
      let closestDist = Infinity;
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.left + rect.width / 2 - centerX);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      return closest;
    };

    const measure = () => {
      setActivePos(closestIndex());
    };

    const settle = () => {
      const closest = closestIndex();
      if (closest >= 2 * count) {
        scrollToPos(closest - count, false);
        setActivePos(closest - count);
      } else if (closest < count) {
        scrollToPos(closest + count, false);
        setActivePos(closest + count);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(settle, 140);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
      window.clearTimeout(settleTimer);
    };
  }, [count]);

  // Autoplay — advances one card at a time, re-arming off the real active position so it never
  // drifts out of sync with whatever the visitor just scrolled or dragged to. Never clamps, so
  // the carousel just keeps moving — the settle-effect above makes the wrap seamless.
  useEffect(() => {
    if (reduced || paused) return;
    const id = window.setTimeout(() => {
      goToPos(activePos + 1);
    }, AUTOPLAY_DELAY);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, paused, activePos]);

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
      <HexagonBackground hexagonSize={84} className={styles.hexagons} />

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
          {displayItems.map((item, i) => (
            <IndustryCard
              key={`${item}-${i}`}
              item={item}
              index={i % count}
              reduced={reduced}
              isCenter={activePos === i}
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
            aria-selected={activeReal === i}
            aria-label={item}
            className={`${styles.dot} ${activeReal === i ? styles.dotActive : ""}`}
            onClick={() => scrollToRealIndex(i)}
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
            transform: `translateY(${(activeReal / Math.max(count - 1, 1)) * 60}px)`,
          }}
        />
      </div>
    </section>
  );
}
