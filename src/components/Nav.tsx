import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { finalCta, hero, industries, selectedWork, solutions, whyChooseUs } from "../data/content";
import { Button } from "./Button";
import {
  CubeIcon,
  DotsIcon,
  GalleryIcon,
  LayersIcon,
  PaperPlaneIcon,
  SparkleIcon,
} from "./icons/Icons";
import { Magnetic } from "./Magnetic";
import styles from "./Nav.module.css";

interface NavItem {
  label: string;
  href: string;
  Icon: typeof LayersIcon;
  preview: string;
  /** True for a dedicated page route rather than an in-page anchor. */
  route?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Industries",
    href: "#industries",
    Icon: LayersIcon,
    preview: industries.description,
  },
  {
    label: "Solutions",
    href: "#solutions",
    Icon: CubeIcon,
    preview: solutions.description,
  },
  {
    label: "Why Us",
    href: "#why-us",
    Icon: SparkleIcon,
    preview: whyChooseUs.description,
  },
  {
    label: "Work",
    href: "#work",
    Icon: GalleryIcon,
    preview: selectedWork.description,
  },
  {
    label: "Contact",
    href: "/contact",
    Icon: PaperPlaneIcon,
    preview: finalCta.description,
    route: true,
  },
];

export function Nav() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeFlyout, setActiveFlyout] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState("");
  const closeTimer = useRef<number | undefined>(undefined);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > lastY.current && y > 160);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const sections = NAV_ITEMS.filter((item) => !item.route)
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const openFlyout = (i: number) => {
    window.clearTimeout(closeTimer.current);
    setActiveFlyout(i);
  };

  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setActiveFlyout(null), 140);
  };

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ""} ${hidden ? styles.hidden : ""}`}>
      <div className={`container ${styles.inner}`}>
        {isHome ? (
          <a href="#top" className={styles.logo}>
            <span className={styles.mark} aria-hidden="true">
              A
            </span>
            <span className={styles.logoText}>Ascending Software</span>
          </a>
        ) : (
          <Link to="/" className={styles.logo}>
            <span className={styles.mark} aria-hidden="true">
              A
            </span>
            <span className={styles.logoText}>Ascending Software</span>
          </Link>
        )}

        <span className={styles.kicker} aria-hidden="true">
          {hero.supportingStatement}
        </span>

        <nav className={styles.links} aria-label="Primary" onMouseLeave={scheduleClose}>
          <div className={styles.arcLine} aria-hidden="true">
            <svg viewBox="0 0 480 60" preserveAspectRatio="none">
              <path d="M0 46 C 80 6, 400 6, 480 46" fill="none" stroke="var(--gold)" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="1 7" strokeLinecap="round" />
            </svg>
          </div>

          {NAV_ITEMS.map((item, i) => (
            <div
              key={item.href}
              className={styles.item}
              onMouseEnter={() => openFlyout(i)}
              onFocus={() => openFlyout(i)}
            >
              <Magnetic strength={0.35} maxOffset={8}>
                {item.route ? (
                  <Link
                    to={item.href}
                    className={`${styles.link} ${
                      activeFlyout === i || (activeFlyout === null && location.pathname === item.href)
                        ? styles.linkActive
                        : ""
                    }`}
                  >
                    <span className={styles.iconRing}>
                      <item.Icon size={18} />
                    </span>
                    <span className={styles.linkLabel}>{item.label}</span>
                  </Link>
                ) : (
                  <a
                    href={isHome ? item.href : `/${item.href}`}
                    className={`${styles.link} ${
                      activeFlyout === i || (activeFlyout === null && isHome && activeSection === item.href)
                        ? styles.linkActive
                        : ""
                    }`}
                  >
                    <span className={styles.iconRing}>
                      <item.Icon size={18} />
                    </span>
                    <span className={styles.linkLabel}>{item.label}</span>
                  </a>
                )}
              </Magnetic>

              <AnimatePresence>
                {activeFlyout === i && (
                  <motion.div
                    className={styles.flyout}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className={`${styles.flyoutPreview} serif`}>{item.preview}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          <div className={styles.item}>
            <button
              type="button"
              className={styles.moreButton}
              aria-label="Open full menu"
              onClick={() => setOpen(true)}
            >
              <DotsIcon size={16} />
            </button>
          </div>
        </nav>

        <div className={styles.actions}>
          <Magnetic>
            <Button to="/contact" showArrow={false} className={styles.navCta}>
              Start a Project
            </Button>
          </Magnetic>
          <button
            className={`${styles.menuToggle} ${open ? styles.open : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <nav className={styles.overlayLinks} aria-label="Mobile">
              {NAV_ITEMS.map((link, i) =>
                link.route ? (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link to={link.href} className={styles.overlayLink} onClick={() => setOpen(false)}>
                      <link.Icon size={22} className={styles.overlayIcon} />
                      {link.label}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.a
                    key={link.href}
                    href={isHome ? link.href : `/${link.href}`}
                    className={styles.overlayLink}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <link.Icon size={22} className={styles.overlayIcon} />
                    {link.label}
                  </motion.a>
                ),
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
