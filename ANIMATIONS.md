# Animation, Transition & Effect Inventory — Ascending Software

Complete catalog of every animation, transition, and visual effect in the codebase, organized by component. Libraries used: **Framer Motion**, **GSAP**, **Three.js**, plus plain CSS `@keyframes` / `transition`.

---

## Global foundations

**`src/styles/tokens.css`** — shared motion tokens consumed everywhere:
- `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)` — the site's signature "premium decel" easing
- `--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)` — used for looping/breathing animations
- `--dur-fast: 0.3s`, `--dur-med: 0.6s`, `--dur-slow: 0.9s` — standard CSS transition durations
- `--grain` — data-URI noise texture used by the `.grain` utility class

**`src/styles/global.css`**
- `.grain::after` — film-grain overlay (`mix-blend-mode: overlay`, opacity 0.05) on Hero, ContactHero, Industries, FinalCta, ContactInfo card, SelectedWork circle scrim
- `html { scroll-behavior: smooth }` — smooth in-page anchor scrolling
- Global `@media (prefers-reduced-motion: reduce)` kill-switch — forces all animation/transition durations to `0.01ms`
- `.custom-cursor` — hides native cursor when `CursorDot` is active

**Shared hooks:**
- `src/hooks/useReducedMotion.ts` — reduced-motion detector, checked by nearly every animated component
- `src/hooks/useScrollReveal.ts` — `useReveal()` (fade+rise on scroll into view via `whileInView`) and `useEnter()` (fade+rise on mount via `animate`); used on nearly every section site-wide
- `src/components/icons/useIconHover.ts` — hover-to-play trigger that arms the icon micro-animation CSS keyframes

---

## Component-by-component

### `src/components/Hero.tsx` + `Hero.module.css`
- **`kenburns`** — slow continuous zoom/pan (scale 1.06→1.14) on hero background image, 24s infinite alternate
- **`orbDrift`** — ambient gold glow orb drifting/scaling, 16s infinite alternate
- **`featureBob`** — feature icons bobbing vertically, staggered per-icon, 4.5s infinite, paused on hover
- Framer Motion: scroll parallax on image (`useScroll`/`useTransform`), cursor-parallax on image + orb (`useMotionValue`/`useSpring`), staggered `useEnter` reveals (eyebrow/description/actions/stats bar), capability tile hover lift
- `Magnetic` wraps both hero CTA buttons; `RollingText` for the heading
- `.bar` uses `backdrop-filter: blur(14px)` glassmorphism

### `src/components/Nav.tsx` + `Nav.module.css`
- Framer Motion `AnimatePresence`: dropdown flyout panel on hover/focus; full-screen mobile overlay with staggered link entrance
- CSS transitions: nav shrinks/solidifies on scroll, hides on scroll-down; logo rotates+scales on hover; icon-ring gold glow on link hover/active; "more" button rotates 90°; hamburger-to-X morph; overlay link hover slide
- `Magnetic` wraps every nav link and CTA

### `src/components/Button.tsx` + `Button.module.css`
Pure CSS — hover lift (`translateY(-2px)`), color/border transitions, arrow icon slides on hover

### `src/components/Magnetic.tsx`
Reusable Framer Motion wrapper: cursor-follow "magnetic pull" (`useMotionValue`+`useSpring`), plus `whileHover={{scale:1.03}}` / `whileTap={{scale:0.98}}`. Wraps nearly every button/link site-wide.

### `src/components/CursorDot.tsx` + `CursorDot.module.css`
Custom trailing cursor dot (imperative rAF lerp, not React state), grows into a translucent ring when hovering interactive elements. Enabled only on fine-pointer devices, disabled under reduced motion.

### `src/components/RollingText.tsx` + `RollingText.module.css`
**GSAP**-driven letter-by-letter 3D "drum roll" text reveal (`perspective`/`preserve-3d`/`rotateX` faces). Used for nearly every heading site-wide: Hero, Industries, WhyChooseUs, SelectedWork, FinalCta, ContactHero, Solutions' SectionLabel.

### `src/components/ScrollProgress.tsx` + `ScrollProgress.module.css`
- Fixed top progress bar — `transform: scaleX(progress)` tracks scroll fraction
- Scroll-to-top button — SVG `stroke-dashoffset` circular progress ring, fades/scales in past 400px scroll, arrow nudges on hover

### `src/components/icons/Icons.tsx` + `icons.module.css`
30 one-shot, hover-triggered `@keyframes` (armed via `useIconHover`), one per icon:

| Icon | Keyframe(s) | Effect |
|---|---|---|
| HeartPulseIcon | `heartBeat`, `pulseSweep` | heart beats, ECG line draws in |
| CoinsIcon | `coinBounce` | coin bounces/squashes |
| GraduationCapIcon | `capToss`, `tasselSwing` | cap tosses, tassel swings |
| ShoppingBagIcon | `bagSwing` | bag swings like on a hook |
| CartIcon | `cartRoll` | cart rocks forward/back |
| FactoryIcon | `smokeDrift` | smoke puffs drift up + fade |
| GearIcon | `gearSpin` | gear rotates 120° |
| TruckIcon | `truckBounce`, `wheelSpin` | truck bounces, wheels spin |
| BuildingIcon | `windowGlow` | windows light up in sequence |
| HandshakeIcon | `handLeftShake`, `handRightShake` | hands shake toward each other |
| BriefcaseIcon | `claspPop` | clasp pops open |
| LayersIcon | `layerShift`, `layerShiftSoft` | layers shuffle apart |
| CubeIcon | `cubeOpenLeft`, `cubeOpenRight` | faces nudge out (assembling) |
| SparkleIcon | `sparklePulse`, `sparkleTwinkle` | sparkle pulses + companion twinkle |
| GalleryIcon | `sunGlow`, `mountainRise` | sun glows, mountain lifts |
| PaperPlaneIcon | `planeDart` | plane darts forward+up |
| DotsIcon | `dotHop` | dots hop in a wave |
| ZapIcon | `boltFlicker` | bolt flickers opacity |
| MailIcon | `flapOpen` | envelope flap opens |
| PhoneIcon | `phoneRing` | handset rocks like ringing |
| MapPinIcon | `pinDrop` | pin drops and settles (bounce ease) |
| CheckIcon | `checkPop` | checkmark scale-pops |

`icons/TechIcons.tsx` (AWS/Azure/GCP/Kubernetes/Docker/etc.) is fully static — no animation.

### `src/components/Industries.tsx` + `Industries.module.css`
- **`globeSpin`** — decorative globe rotates continuously, 90s linear infinite
- **`orbitFloat1/2/3`** — three dots drifting in elliptical paths around the globe with opacity pulses
- **`centerBreathe`** — box-shadow glow ring breathes on the centered carousel card
- Framer Motion: card entrance stagger (fade+rise+scale), cursor-tilt per card (`rotateX/Y` springs), centered card continuous scale "breathe" loop (`repeat: Infinity`)
- CSS: hover shine-sweep across card (`cardShine`), icon scale/rotate on hover, image grayscale→color on hover/center
- Ambient `HexagonBackground`

### `src/components/Solutions.tsx` + `Solutions.module.css`
- Framer Motion: row stagger-in on scroll; `AnimatePresence` accordion expand/collapse (mobile); crossfading right-side image (`mode="sync"`) as active row changes
- CSS: row hover translateX + opacity, arrow rotates 45° + fills gold on active/hover
- `.right` sticky image panel on desktop

### `src/components/WhyChooseUs.tsx` + `WhyChooseUs.module.css`
- **`tagFloat`** — floating annotation tags bob vertically, staggered
- Framer Motion: scroll parallax on portrait image (`useScroll`/`useTransform`), staggered list reveal via `staggerChildren` on a single `whileInView`
- CSS: CTA hover fill+slide, reason-row hover background+slide, icon invert on hover
- `.imageFrame` static `clip-path` notch

### `src/components/SelectedWork.tsx` + `SelectedWork.module.css`
- **`ringSpin`** — dashed decorative ring rotates 360°, 60s linear infinite
- **`cueBob`** — scroll-cue button bobs vertically, 2.6s infinite
- Framer Motion: staggered entry cascade (number→heading→image), circular preview image crossfade on active project (IntersectionObserver-driven), animated progress bar width
- `TiltImage` wraps each project image; `.left` sticky panel on desktop

### `src/components/TechStack.tsx` + `TechStack.module.css`
- **`glowDrift`** — ambient gradient blobs drift+scale+fade, 10s/13s infinite (one reversed)
- **`sweep`** — gold gradient line sweeps across each panel's top edge, 7s linear infinite
- Framer Motion: scroll-linked parallax on glow blobs + grid layer, re-triggering reveal (`viewport:{once:false}`) on panels/chips
- CSS: panel/chip hover lift, chip icon scale/rotate/color on hover

### `src/components/TiltImage.tsx`
Reusable Framer Motion 3D cursor-tilt wrapper (spring-smoothed `rotateX`/`rotateY`), resets to center on mouse-leave. No-ops under reduced motion.

### `src/components/HexagonBackground.tsx` + `HexagonBackground.module.css`
Ambient hex-grid backdrop — deliberately **not** keyframe-animated (rewritten away from that for performance). Imperative `mousemove` handler glows nearby hexagons via a `--hex-glow` CSS variable, with `content-visibility: auto` and an `IntersectionObserver` gate. Used in Industries, WhyChooseUs, TechStack.

### `src/components/Marquee.tsx` + `Marquee.module.css`
Reusable seamless infinite-scroll marquee — **`scroll`** keyframe translates a duplicated track -50%, speed configurable via prop, pauses on hover, edge-faded via `mask-image`. Disabled under reduced motion. Used in `TrustStrip` (speed 38) and `FinalCta` (speed 26, ghost-text company name).

### `src/components/TrustStrip.tsx` + `TrustStrip.module.css`
- **`dotPulse`** — separator dot scales/fades, 2.4s infinite
- Outlined (`-webkit-text-stroke`) client statement text fills gold on hover

### `src/components/FinalCta.tsx` + `FinalCta.module.css`
- **`ctaGlowPulse`** — large ambient background glow orb scales/drifts/fades, 8s infinite
- `Marquee` ghost-text row, `RollingText` heading, `Magnetic` CTA button, staggered `useReveal`

### `src/components/Footer.tsx` + `Footer.module.css`
- Scroll-scrubbed **clip-path wipe**: `useScroll`+`useSpring`+`useTransform` reveal the giant gold wordmark left-to-right as the section scrolls into view (and hide it scrolling back up) — the standout effect in this component
- Staggered `useReveal` for wordmark row + columns
- CSS: link hover color+slide, contact link underline on hover

### `src/components/SectionLabel.tsx` + `SectionLabel.module.css`
Staggered `useReveal` for eyebrow/heading/description. Used inside Solutions and ContactFaq. No CSS animation of its own.

### `src/components/ContactHero.tsx` + `ContactHero.module.css`
- **`cueFlow`** — vertical gradient scroll-cue line scales/fades, 2.2s infinite
- Framer Motion: scroll parallax on 3D scene wrapper, staggered `useEnter` (mount-triggered) for breadcrumb/description/quick-links
- `RollingText` heading, `Magnetic` quick-link pills, `backdrop-filter: blur(10px)` glass pills

### `src/components/ContactHeroScene.tsx` + `ContactHeroScene.module.css` — Three.js
Animated gold envelope (idle sway rotation, not a spin) + 22 drifting additive-blended sparkle particles, with pointer-parallax tilt on the whole scene. Pauses on tab hidden, disabled under reduced motion (static frame). Canvas fades in via **`fadeIn`** keyframe on mount.

**Fallback `ContactHeroArt.tsx` + `ContactHeroArt.module.css`** (non-WebGL, pure SVG):
- **`bgPulse`** — background glow circle scales/fades, 9s infinite
- **`spinCw`/`spinCcw`** — three concentric orbit rings rotate at different speeds/directions
- **`nodePulse`** — 6 orbit nodes pulse, staggered
- **`flowMove`** — 6 signal lines animate `stroke-dashoffset` to simulate inward flow
- **`haloBreathe`** — central hub halo ring scales/fades
- **`particleFloat`** — 5 loose particles float vertically with opacity pulse, staggered

### `src/components/ContactForm.tsx` + `ContactForm.module.css`
- **`glowPulse`** — ambient gold blob behind the card, 9s infinite
- **`spin`** — submit-button loading spinner, 0.7s linear infinite (swaps to `steps(8)` under reduced motion rather than disabling — spinner must still communicate loading state)
- Framer Motion: `AnimatePresence mode="wait"` swaps form↔success state; animated SVG checkmark stroke-draw (`pathLength: 0→1`)
- CSS: floating-label inputs (Material-style), chip hover lift + checkmark width-reveal, submit button hover lift+arrow slide

### `src/components/ContactInfo.tsx` + `ContactInfo.module.css`
- **`badgePulse`** — status dot box-shadow ripple, 1.8s infinite
- Scroll-scrubbed vertical timeline fill line (`useScroll`+`useSpring`→`scaleY`), mirrors the Footer wordmark technique
- CSS: contact-row hover background+slide, icon invert on hover

### `src/components/ContactFaq.tsx` + `ContactFaq.module.css`
Framer Motion `AnimatePresence` accordion answer reveal (`height`+`opacity`). CSS: question hover color shift, chevron rotates 180° + fills gold when expanded. No keyframes.

### Pages
- `src/pages/Home.tsx` — no animation of its own; composes sections; instant (non-smooth) scroll for cross-page hash anchors
- `src/pages/Contact.tsx` + `Contact.module.css` — no animation of its own; static radial-gradient background glow decoration
- `src/App.tsx` — no animation; mounts `CursorDot`, `ScrollProgress`, `Nav`, routed pages, `Footer`; instant scroll reset on route change

---

## Summary

- **~58 distinct CSS `@keyframes` blocks** across 13 files (icons.module.css alone has 30 — one per icon micro-interaction)
- **GSAP** — used in exactly one place: `RollingText.tsx` (letter-drum 3D roll-in/hover-reroll effect)
- **Three.js** — used in exactly one place: `ContactHeroScene.tsx` (animated gold envelope + sparkle particles), with `ContactHeroArt.tsx` as a pure CSS/SVG fallback for non-WebGL browsers
- **Framer Motion** is the dominant system: scroll reveals (`useReveal`/`useEnter`), scroll-linked parallax (`useScroll`+`useTransform` — Hero, WhyChooseUs, TechStack, ContactHero, plus scroll-scrubbed wipe/fill effects in Footer and ContactInfo), cursor-follow springs (`Magnetic`, `TiltImage`, Hero orb/image parallax, Industries card tilt), and `AnimatePresence` for mount/unmount transitions (Nav flyout/mobile menu, Solutions accordion+image crossfade, SelectedWork image crossfade, ContactForm success state, ContactFaq accordion)
- **Reduced-motion handling** is systematic: a global CSS media-query kill switch plus a shared `useReducedMotion()` hook checked individually in nearly every animated component
