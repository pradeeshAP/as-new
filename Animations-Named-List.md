# Animations, Effects & Transitions — Named List

Every animation/effect with its exact name, the component it belongs to, and which technology powers it.

**Technologies used:** CSS (`@keyframes` / `transition`), **Framer Motion**, **GSAP**, **Three.js**

---

## Site-Wide Components

| Component | Effect Name | Technology | What it does |
|---|---|---|---|
| Nav | Flyout dropdown | Framer Motion (`AnimatePresence`) | Menu dropdown preview fade/scale in-out |
| Nav | Mobile menu overlay | Framer Motion (`AnimatePresence`) | Full-screen mobile menu fade in, staggered link entrance |
| Nav | Nav shrink/hide on scroll | CSS transition | Padding/background/shadow change on scroll |
| Nav | Hamburger-to-X morph | CSS transition | Menu icon lines rotate into an X |
| Magnetic | Magnetic pull | Framer Motion (`useMotionValue` + `useSpring`) | Buttons/links shift toward cursor on hover |
| Magnetic | Hover/tap scale | Framer Motion (`whileHover` / `whileTap`) | Scale up on hover, down on tap |
| CursorDot | Trailing cursor dot | Custom (JS `requestAnimationFrame` loop) | Gold dot follows mouse with lag |
| CursorDot | Hover ring | CSS transition | Dot grows into a ring over interactive elements |
| RollingText | Letter drum-roll reveal | **GSAP** | Heading letters roll in like a flip clock |
| ScrollProgress | Top progress bar | CSS transition (`scaleX`) | Bar fills as you scroll the page |
| ScrollProgress | Scroll-to-top ring | CSS (`stroke-dashoffset`) | Circular progress ring around the back-to-top button |
| ScrollProgress | Button fade/scale in | CSS transition | Back-to-top button appears after 400px scroll |
| global.css | `.grain` texture | CSS (static overlay) | Film-grain noise texture on select sections |

---

## Icon Micro-Animations (`icons.module.css`) — all CSS `@keyframes`, triggered on hover

| Icon | Keyframe Name(s) |
|---|---|
| Heart Pulse | `heartBeat`, `pulseSweep` |
| Coins | `coinBounce` |
| Graduation Cap | `capToss`, `tasselSwing` |
| Shopping Bag | `bagSwing` |
| Cart | `cartRoll` |
| Factory | `smokeDrift` |
| Gear | `gearSpin` |
| Truck | `truckBounce`, `wheelSpin` |
| Building | `windowGlow` |
| Handshake | `handLeftShake`, `handRightShake` |
| Briefcase | `claspPop` |
| Layers | `layerShift`, `layerShiftSoft` |
| Cube | `cubeOpenLeft`, `cubeOpenRight` |
| Sparkle | `sparklePulse`, `sparkleTwinkle` |
| Gallery | `sunGlow`, `mountainRise` |
| Paper Plane | `planeDart` |
| Dots | `dotHop` |
| Zap | `boltFlicker` |
| Mail | `flapOpen` |
| Phone | `phoneRing` |
| Map Pin | `pinDrop` |
| Check | `checkPop` |

(`TechIcons.tsx` — AWS, Azure, GCP, Kubernetes, Docker, etc. — has no animation.)

---

## Home Page

### Hero
| Effect Name | Technology | What it does |
|---|---|---|
| `kenburns` | CSS `@keyframes` | Background image slow zoom/pan |
| `orbDrift` | CSS `@keyframes` | Gold glow orb drifts/scales |
| `featureBob` | CSS `@keyframes` | Feature icons bob up/down |
| Scroll parallax (`useScroll` + `useTransform`) | Framer Motion | Background image shifts as you scroll |
| Cursor parallax (`useMotionValue` + `useSpring`) | Framer Motion | Image & orb drift toward cursor |
| Mount reveal (`useEnter`) | Framer Motion | Eyebrow/description/actions/stats fade+rise on load |
| Capability tile hover lift | Framer Motion (`whileHover`) | Tiles lift on hover |
| Heading roll-in | GSAP (via `RollingText`) | Heading letters roll into place |

### Trust Strip
| Effect Name | Technology | What it does |
|---|---|---|
| `scroll` (Marquee track) | CSS `@keyframes` | Continuous horizontal ticker scroll |
| `dotPulse` | CSS `@keyframes` | Separator dot pulses |
| Outline-text hover fill | CSS transition | Text fills gold on hover |

### Industries
| Effect Name | Technology | What it does |
|---|---|---|
| `globeSpin` | CSS `@keyframes` | Globe graphic rotates continuously |
| `orbitFloat1` / `orbitFloat2` / `orbitFloat3` | CSS `@keyframes` | Orbit dots drift around globe |
| `centerBreathe` | CSS `@keyframes` | Glow ring pulse on centered card |
| Card entrance stagger | Framer Motion (`whileInView`) | Cards fade+scale in on scroll |
| Cursor 3D tilt | Framer Motion (`useMotionValue` + `useSpring`) | Card tilts toward cursor |
| Centered-card breathing loop | Framer Motion (`animate`, `repeat: Infinity`) | Active card scales in/out continuously |
| `cardShine` hover sweep | CSS transition | Light shine sweeps across card on hover |
| Image grayscale→color | CSS transition | Card photo gains color on hover/center |
| Hexagon field cursor glow | Custom (JS, `HexagonBackground`) | Background hex grid glows near cursor |

### Solutions
| Effect Name | Technology | What it does |
|---|---|---|
| Row stagger-in | Framer Motion (`whileInView`) | Rows fade in from the side |
| Accordion expand/collapse | Framer Motion (`AnimatePresence`) | Mobile row detail expands |
| Image crossfade | Framer Motion (`AnimatePresence`, `mode="sync"`) | Right-side photo swaps per active row |
| Row hover slide | CSS transition | Title shifts, arrow rotates 45° |

### Why Choose Us
| Effect Name | Technology | What it does |
|---|---|---|
| `tagFloat` | CSS `@keyframes` | Floating tags bob near portrait |
| Scroll parallax | Framer Motion (`useScroll` + `useTransform`) | Portrait image drifts on scroll |
| Staggered list reveal | Framer Motion (`staggerChildren`) | Reason list cascades in |
| Reason row hover | CSS transition | Background + icon invert on hover |
| Hexagon field cursor glow | Custom (JS) | Same ambient hex background as Industries |

### Tech Stack
| Effect Name | Technology | What it does |
|---|---|---|
| `glowDrift` | CSS `@keyframes` | Ambient background blobs drift |
| `sweep` | CSS `@keyframes` | Gold line sweeps across panel tops |
| Scroll-linked parallax | Framer Motion (`useScroll` + `useTransform`) | Glow blobs + grid shift on scroll |
| Panel/chip reveal | Framer Motion (`whileInView`, re-triggering) | Panels/chips fade+rise, replay each scroll pass |
| Panel/chip hover lift | CSS transition | Lift + gold tint on hover |

### Selected Work
| Effect Name | Technology | What it does |
|---|---|---|
| `ringSpin` | CSS `@keyframes` | Dashed ring rotates around artwork |
| `cueBob` | CSS `@keyframes` | Scroll-cue button bobs |
| Entry cascade | Framer Motion (`staggerChildren`) | Number → heading → image reveal |
| Circular image crossfade | Framer Motion (`AnimatePresence`) | Active project photo swaps |
| Progress bar fill | Framer Motion (`animate`, width) | Bar tracks active project |
| 3D cursor tilt | Framer Motion (`TiltImage`) | Project image tilts toward cursor |

### Final CTA
| Effect Name | Technology | What it does |
|---|---|---|
| `ctaGlowPulse` | CSS `@keyframes` | Background glow orb pulses/drifts |
| Marquee ghost text | CSS `@keyframes` (`scroll`) | Oversized outlined company name scrolls behind content |
| Staggered reveal | Framer Motion (`useReveal`) | Heading/description/CTA fade+rise in |
| Heading roll-in | GSAP (via `RollingText`) | Heading letters roll in |

### Footer
| Effect Name | Technology | What it does |
|---|---|---|
| Wordmark clip-path wipe | Framer Motion (`useScroll` + `useSpring` + `useTransform`) | Giant gold wordmark reveals left-to-right as you scroll |
| Staggered column reveal | Framer Motion (`useReveal`) | Columns fade+rise in |
| Link hover slide | CSS transition | Links shift + underline on hover |

---

## Contact Page

### Contact Hero
| Effect Name | Technology | What it does |
|---|---|---|
| Envelope scene | **Three.js** | 3D gold envelope with idle sway rotation |
| Sparkle particles | **Three.js** (`THREE.Points`) | 22 particles drifting around the envelope |
| Cursor-parallax tilt | **Three.js** (custom render loop) | Whole 3D scene tilts toward cursor |
| `fadeIn` (canvas) | CSS `@keyframes` | 3D canvas fades in on load |
| Fallback illustration | CSS `@keyframes` (`bgPulse`, `spinCw`, `spinCcw`, `nodePulse`, `flowMove`, `haloBreathe`, `particleFloat`) | Flat animated illustration shown when 3D isn't supported |
| `cueFlow` | CSS `@keyframes` | Scroll-cue line pulses |
| Scroll parallax | Framer Motion (`useScroll` + `useTransform`) | 3D scene shifts on scroll |
| Heading roll-in | GSAP (via `RollingText`) | Heading letters roll in |

### Contact Info
| Effect Name | Technology | What it does |
|---|---|---|
| Scroll-scrubbed timeline fill | Framer Motion (`useScroll` + `useSpring`, `scaleY`) | Vertical line fills as you scroll the steps |
| `badgePulse` | CSS `@keyframes` | Status dot ripple pulse |
| Contact row hover | CSS transition | Background + icon invert on hover |

### Contact Form
| Effect Name | Technology | What it does |
|---|---|---|
| `glowPulse` | CSS `@keyframes` | Ambient glow behind the form card |
| `spin` | CSS `@keyframes` | Loading spinner on submit button |
| Form → success swap | Framer Motion (`AnimatePresence mode="wait"`) | Form fades out, success message fades in |
| Checkmark stroke-draw | Framer Motion (`motion.path`, `pathLength`) | Success checkmark draws itself |
| Floating labels | CSS transition | Input labels move up/shrink on focus |
| Chip check-reveal | CSS transition | Checkmark width-reveals on selected chip |

### Contact FAQ
| Effect Name | Technology | What it does |
|---|---|---|
| Accordion reveal | Framer Motion (`AnimatePresence`) | Answer expands/collapses |
| Chevron rotate | CSS transition | Arrow rotates 180° when open |

---

## Technology Totals

| Technology | Count / Usage |
|---|---|
| CSS `@keyframes` | ~58 animations across the site |
| CSS `transition` | Used for nearly all hover/focus states |
| **Framer Motion** | Scroll reveals, parallax, cursor-springs, mount/unmount transitions — used in nearly every component |
| **GSAP** | Used only for the letter-roll heading effect (`RollingText`) |
| **Three.js** | Used only for the animated 3D envelope scene on the Contact page |
