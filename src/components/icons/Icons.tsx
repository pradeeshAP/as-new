import type { SVGProps } from "react";
import styles from "./icons.module.css";
import { useIconHover } from "./useIconHover";

interface IconProps {
  size?: number;
  className?: string;
}

const svgBase: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 24 24",
  fill: "none",
  "aria-hidden": true,
};

/** Heartbeat: heart shape scales like a pulse, the ECG line sweeps in beside it. */
export function HeartPulseIcon({ size = 22, className }: IconProps) {
  const { playing, handlers } = useIconHover();
  return (
    <span className={`${styles.wrap} ${playing ? styles.playing : ""} ${className ?? ""}`} {...handlers}>
      <svg {...svgBase} width={size} height={size} className={styles.svg}>
        <path
          className={styles.heart}
          d="M12 20s-7.2-4.6-9.6-9.4C.9 7.2 2.4 3.8 5.6 3.2c1.9-.4 3.7.5 4.9 2.1L12 6.9l1.5-1.6c1.2-1.6 3-2.5 4.9-2.1 3.2.6 4.7 4 3.2 7.4C19.2 15.4 12 20 12 20Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          className={styles.pulseLine}
          d="M3 12h3l1.4-2.6L9.4 15 11 9l1.6 6.4L14 12h7"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/** Finance: stacked coins, the top coin bounces like it just landed. */
export function CoinsIcon({ size = 22, className }: IconProps) {
  const { playing, handlers } = useIconHover();
  return (
    <span className={`${styles.wrap} ${playing ? styles.playing : ""} ${className ?? ""}`} {...handlers}>
      <svg {...svgBase} width={size} height={size} className={styles.svg}>
        <ellipse cx="12" cy="18.5" rx="8" ry="2.4" stroke="currentColor" strokeWidth="1.4" />
        <ellipse cx="12" cy="14.5" rx="8" ry="2.4" stroke="currentColor" strokeWidth="1.4" />
        <g className={styles.coinTop}>
          <ellipse cx="12" cy="10.2" rx="8" ry="2.4" stroke="currentColor" strokeWidth="1.4" />
          <path d="M12 7.8v4.8M9.8 8.8h4.4M9.6 11.4h4.8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        </g>
      </svg>
    </span>
  );
}

/** Education: mortarboard cap tosses, tassel swings independently. */
export function GraduationCapIcon({ size = 22, className }: IconProps) {
  const { playing, handlers } = useIconHover();
  return (
    <span className={`${styles.wrap} ${playing ? styles.playing : ""} ${className ?? ""}`} {...handlers}>
      <svg {...svgBase} width={size} height={size} className={styles.svg}>
        <g className={styles.capTop}>
          <path
            d="M12 4 2.5 8.5 12 13l9.5-4.5L12 4Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path d="M6 10.6v3.6c0 1.4 2.7 2.6 6 2.6s6-1.2 6-2.6v-3.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </g>
        <g className={styles.tassel}>
          <path d="M20 9v5.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          <circle cx="20" cy="15.4" r="1.1" fill="currentColor" />
        </g>
      </svg>
    </span>
  );
}

/** Retail: shopping bag swings from its handles like it's hanging on a hook. */
export function ShoppingBagIcon({ size = 22, className }: IconProps) {
  const { playing, handlers } = useIconHover();
  return (
    <span className={`${styles.wrap} ${playing ? styles.playing : ""} ${className ?? ""}`} {...handlers}>
      <svg {...svgBase} width={size} height={size} className={styles.svg}>
        <g className={styles.bag}>
          <path d="M8.5 8V6a3.5 3.5 0 0 1 7 0v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path
            d="M5.5 8h13l.9 11.2a1.5 1.5 0 0 1-1.5 1.6H6.1a1.5 1.5 0 0 1-1.5-1.6L5.5 8Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </span>
  );
}

/** Retail (cart glyph): cart rolls forward, wheels spin independently. */
export function CartIcon({ size = 22, className }: IconProps) {
  const { playing, handlers } = useIconHover();
  return (
    <span className={`${styles.wrap} ${playing ? styles.playing : ""} ${className ?? ""}`} {...handlers}>
      <svg {...svgBase} width={size} height={size} className={styles.svg}>
        <g className={styles.cartBody}>
          <path
            d="M3 4h2l2.2 11.2a1.6 1.6 0 0 0 1.6 1.3h7.8a1.6 1.6 0 0 0 1.6-1.3L20 8H6.2"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <g className={styles.wheel}>
          <circle cx="9.5" cy="19.5" r="1.3" stroke="currentColor" strokeWidth="1.2" />
        </g>
        <g className={styles.wheel}>
          <circle cx="16" cy="19.5" r="1.3" stroke="currentColor" strokeWidth="1.2" />
        </g>
      </svg>
    </span>
  );
}

/** Manufacturing (factory glyph): smoke puffs drift up from the chimney. */
export function FactoryIcon({ size = 22, className }: IconProps) {
  const { playing, handlers } = useIconHover();
  return (
    <span className={`${styles.wrap} ${playing ? styles.playing : ""} ${className ?? ""}`} {...handlers}>
      <svg {...svgBase} width={size} height={size} className={styles.svg}>
        <path
          d="M3 20.5V12l5 3V12l5 3V8l5 3v9.5Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path d="M18 11V6.5h2.2V11" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M3 20.5h18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <circle className={styles.smoke} cx="19.1" cy="5" r="0.9" fill="currentColor" />
        <circle className={styles.smoke} cx="20.4" cy="3.2" r="0.7" fill="currentColor" />
      </svg>
    </span>
  );
}

/** Manufacturing (alt / solutions use): gear spins on hover. */
export function GearIcon({ size = 22, className }: IconProps) {
  const { playing, handlers } = useIconHover();
  return (
    <span className={`${styles.wrap} ${playing ? styles.playing : ""} ${className ?? ""}`} {...handlers}>
      <svg {...svgBase} width={size} height={size} className={styles.svg}>
        <g className={styles.gear}>
          <path
            d="M12 3.4c.6 0 1.2.05 1.7.15l.5 2.1 1.9.8 1.9-1.1c.9.7 1.7 1.5 2.4 2.4l-1.1 1.9.8 1.9 2.1.5c.1.55.15 1.1.15 1.7s-.05 1.15-.15 1.7l-2.1.5-.8 1.9 1.1 1.9c-.7.9-1.5 1.7-2.4 2.4l-1.9-1.1-1.9.8-.5 2.1c-.55.1-1.1.15-1.7.15s-1.15-.05-1.7-.15l-.5-2.1-1.9-.8-1.9 1.1c-.9-.7-1.7-1.5-2.4-2.4l1.1-1.9-.8-1.9-2.1-.5c-.1-.55-.15-1.1-.15-1.7s.05-1.15.15-1.7l2.1-.5.8-1.9-1.1-1.9c.7-.9 1.5-1.7 2.4-2.4l1.9 1.1 1.9-.8.5-2.1c.55-.1 1.1-.15 1.7-.15Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.2" />
        </g>
      </svg>
    </span>
  );
}

/** Logistics: delivery truck bounces, wheels spin. */
export function TruckIcon({ size = 22, className }: IconProps) {
  const { playing, handlers } = useIconHover();
  return (
    <span className={`${styles.wrap} ${playing ? styles.playing : ""} ${className ?? ""}`} {...handlers}>
      <svg {...svgBase} width={size} height={size} className={styles.svg}>
        <g className={styles.truckBody}>
          <path d="M2.5 6.5h10v9h-10z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M12.5 10h4l3 3v2.5h-7V10Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        </g>
        <g className={styles.wheel}>
          <circle cx="6" cy="17.3" r="1.7" stroke="currentColor" strokeWidth="1.3" />
          <path d="M6 16.1v.6M6 17.9v.6M4.8 17.3h.6M6.6 17.3h.6" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
        </g>
        <g className={styles.wheel}>
          <circle cx="16.5" cy="17.3" r="1.7" stroke="currentColor" strokeWidth="1.3" />
          <path d="M16.5 16.1v.6M16.5 17.9v.6M15.3 17.3h.6M17.1 17.3h.6" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
        </g>
      </svg>
    </span>
  );
}

/** Real estate: building windows light up in sequence. */
export function BuildingIcon({ size = 22, className }: IconProps) {
  const { playing, handlers } = useIconHover();
  return (
    <span className={`${styles.wrap} ${playing ? styles.playing : ""} ${className ?? ""}`} {...handlers}>
      <svg {...svgBase} width={size} height={size} className={styles.svg}>
        <path d="M5 20.5V4.5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M15 20.5v-9l4 1.6v7.4" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <rect className={styles.window} x="7" y="6" width="2" height="2" fill="currentColor" />
        <rect className={styles.window} x="11" y="6" width="2" height="2" fill="currentColor" />
        <rect className={styles.window} x="7" y="10.5" width="2" height="2" fill="currentColor" />
        <rect className={styles.window} x="11" y="10.5" width="2" height="2" fill="currentColor" />
        <path d="M3 20.5h18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </span>
  );
}

/** Non-profit: two hands shake — each rotates toward the other independently. */
export function HandshakeIcon({ size = 22, className }: IconProps) {
  const { playing, handlers } = useIconHover();
  return (
    <span className={`${styles.wrap} ${playing ? styles.playing : ""} ${className ?? ""}`} {...handlers}>
      <svg {...svgBase} width={size} height={size} className={styles.svg}>
        <g className={styles.handLeft}>
          <path d="M2 9.5 6 7l3.2 2-2 3.2-3.4 1.6L2 12Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        </g>
        <g className={styles.handRight}>
          <path d="M22 9.5 18 7l-3.2 2 2 3.2 3.4 1.6L22 12Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        </g>
        <path
          d="M9.2 9 12 11.4l2.8-2.4M7.2 12.2l2.6 2.4a1.4 1.4 0 0 0 2 0l.2-.2a1.3 1.3 0 0 0 1.9.1l2.9-2.5"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/** Enterprise: briefcase clasp pops open. */
export function BriefcaseIcon({ size = 22, className }: IconProps) {
  const { playing, handlers } = useIconHover();
  return (
    <span className={`${styles.wrap} ${playing ? styles.playing : ""} ${className ?? ""}`} {...handlers}>
      <svg {...svgBase} width={size} height={size} className={styles.svg}>
        <rect x="3" y="8.5" width="18" height="11" rx="1.6" stroke="currentColor" strokeWidth="1.4" />
        <path d="M3 13.5h18" stroke="currentColor" strokeWidth="1.4" />
        <g className={styles.clasp}>
          <rect x="9.5" y="11.5" width="5" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.3" fill="var(--bg,#fff)" />
        </g>
        <path d="M8.5 8.5V6.8a1.8 1.8 0 0 1 1.8-1.8h3.4a1.8 1.8 0 0 1 1.8 1.8v1.7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </span>
  );
}

/** Industries / microservices: stacked layers shuffle apart and settle. */
export function LayersIcon({ size = 22, className }: IconProps) {
  const { playing, handlers } = useIconHover();
  return (
    <span className={`${styles.wrap} ${playing ? styles.playing : ""} ${className ?? ""}`} {...handlers}>
      <svg {...svgBase} width={size} height={size} className={styles.svg}>
        <path d="M12 15.5 3 11 12 6.5 21 11Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path className={styles.layerMid} d="M3 14.5 12 19l9-4.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path className={styles.layerTop} d="M3 11l9 4.5 9-4.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/** Solutions: wireframe cube — side faces nudge apart like it's assembling. */
export function CubeIcon({ size = 22, className }: IconProps) {
  const { playing, handlers } = useIconHover();
  return (
    <span className={`${styles.wrap} ${playing ? styles.playing : ""} ${className ?? ""}`} {...handlers}>
      <svg {...svgBase} width={size} height={size} className={styles.svg}>
        <path d="M12 3.5 20.5 8 12 12.5 3.5 8Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        <g className={styles.cubeFaceLeft}>
          <path d="M3.5 8v8L12 20.5v-8Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        </g>
        <g className={styles.cubeFaceRight}>
          <path d="M20.5 8v8L12 20.5v-8Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        </g>
      </svg>
    </span>
  );
}

/** Why Us / Intelligent: sparkle twinkles with a small companion glint. */
export function SparkleIcon({ size = 22, className }: IconProps) {
  const { playing, handlers } = useIconHover();
  return (
    <span className={`${styles.wrap} ${playing ? styles.playing : ""} ${className ?? ""}`} {...handlers}>
      <svg {...svgBase} width={size} height={size} className={styles.svg}>
        <path
          className={styles.sparkleMain}
          d="M12 2.5c.4 3 1 4.9 2.2 6.1 1.2 1.2 3.1 1.8 6.1 2.2-3 .4-4.9 1-6.1 2.2-1.2 1.2-1.8 3.1-2.2 6.1-.4-3-1-4.9-2.2-6.1C8.6 12 6.7 11.4 3.7 11c3-.4 4.9-1 6.1-2.2 1.2-1.2 1.8-3.1 2.2-6.3Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          className={styles.sparkleMini}
          d="M19 16c.2 1.4.5 2.2 1.1 2.8.6.6 1.4.9 2.8 1.1-1.4.2-2.2.5-2.8 1.1-.6.6-.9 1.4-1.1 2.8-.2-1.4-.5-2.2-1.1-2.8-.6-.6-1.4-.9-2.8-1.1 1.4-.2 2.2-.5 2.8-1.1.6-.6.9-1.4 1.1-2.8Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}

/** Work / gallery: sun glows, mountain line lifts slightly. */
export function GalleryIcon({ size = 22, className }: IconProps) {
  const { playing, handlers } = useIconHover();
  return (
    <span className={`${styles.wrap} ${playing ? styles.playing : ""} ${className ?? ""}`} {...handlers}>
      <svg {...svgBase} width={size} height={size} className={styles.svg}>
        <rect x="2.5" y="4" width="19" height="16" rx="1.8" stroke="currentColor" strokeWidth="1.4" />
        <circle className={styles.sun} cx="8" cy="9.5" r="1.8" stroke="currentColor" strokeWidth="1.3" />
        <path className={styles.mountain} d="M3.5 18 9 12.5l3.5 3.5 3-3L20.5 18" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </span>
  );
}

/** Contact: paper plane darts forward and up. */
export function PaperPlaneIcon({ size = 22, className }: IconProps) {
  const { playing, handlers } = useIconHover();
  return (
    <span className={`${styles.wrap} ${playing ? styles.playing : ""} ${className ?? ""}`} {...handlers}>
      <svg {...svgBase} width={size} height={size} className={styles.svg}>
        <g className={styles.plane}>
          <path d="M21 3 3 10.6l6.8 2.4L21 3Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M9.8 13 21 3l-4.4 12.2-3.4-3.4Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M9.8 13v5l3-3.4" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        </g>
      </svg>
    </span>
  );
}

/** More menu: three dots hop in a wave. */
export function DotsIcon({ size = 20, className }: IconProps) {
  const { playing, handlers } = useIconHover();
  return (
    <span className={`${styles.wrap} ${playing ? styles.playing : ""} ${className ?? ""}`} {...handlers}>
      <svg {...svgBase} width={size} height={size} className={styles.svg}>
        <circle className={styles.dot} cx="5" cy="12" r="1.7" fill="currentColor" />
        <circle className={styles.dot} cx="12" cy="12" r="1.7" fill="currentColor" />
        <circle className={styles.dot} cx="19" cy="12" r="1.7" fill="currentColor" />
      </svg>
    </span>
  );
}

/** Event-driven: lightning bolt flickers. */
export function ZapIcon({ size = 20, className }: IconProps) {
  const { playing, handlers } = useIconHover();
  return (
    <span className={`${styles.wrap} ${playing ? styles.playing : ""} ${className ?? ""}`} {...handlers}>
      <svg {...svgBase} width={size} height={size} className={styles.svg}>
        <path
          className={styles.bolt}
          d="M13 2 4 13.5h6.5L10 22l9-12h-6.5L13 2Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/** Footer: envelope flap opens. */
export function MailIcon({ size = 18, className }: IconProps) {
  const { playing, handlers } = useIconHover();
  return (
    <span className={`${styles.wrap} ${playing ? styles.playing : ""} ${className ?? ""}`} {...handlers}>
      <svg {...svgBase} width={size} height={size} className={styles.svg}>
        <rect x="2.5" y="5.5" width="19" height="13" rx="1.6" stroke="currentColor" strokeWidth="1.3" />
        <path className={styles.flap} d="M3 6.5 12 13l9-6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/** Footer: phone handset rings. */
export function PhoneIcon({ size = 18, className }: IconProps) {
  const { playing, handlers } = useIconHover();
  return (
    <span className={`${styles.wrap} ${playing ? styles.playing : ""} ${className ?? ""}`} {...handlers}>
      <svg {...svgBase} width={size} height={size} className={styles.svg}>
        <path
          className={styles.handset}
          d="M6.5 3.5c1 0 1.9.6 2.3 1.5l.8 1.9c.3.8.1 1.7-.5 2.3l-1 1c1 2 2.6 3.6 4.6 4.6l1-1c.6-.6 1.5-.8 2.3-.5l1.9.8c.9.4 1.5 1.3 1.5 2.3v1.7c0 1.4-1.3 2.4-2.6 2-4.6-1.4-8.3-5.1-9.7-9.7-.4-1.3.6-2.6 2-2.6h-2.6Z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/** Footer: map pin drops and settles with a small bounce. */
export function MapPinIcon({ size = 18, className }: IconProps) {
  const { playing, handlers } = useIconHover();
  return (
    <span className={`${styles.wrap} ${playing ? styles.playing : ""} ${className ?? ""}`} {...handlers}>
      <svg {...svgBase} width={size} height={size} className={styles.svg}>
        <g className={styles.pin}>
          <path
            d="M12 21s6.5-6.1 6.5-11A6.5 6.5 0 0 0 5.5 10c0 4.9 6.5 11 6.5 11Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.2" />
        </g>
      </svg>
    </span>
  );
}

/** Checkmark: quick scale pop, used for capability/reason lists. */
export function CheckIcon({ size = 16, className }: IconProps) {
  const { playing, handlers } = useIconHover();
  return (
    <span className={`${styles.wrap} ${playing ? styles.playing : ""} ${className ?? ""}`} {...handlers}>
      <svg {...svgBase} width={size} height={size} className={styles.svg}>
        <path
          className={styles.checkMark}
          d="M4 12.5 9 17 20 6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
