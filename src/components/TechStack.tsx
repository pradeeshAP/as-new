import type { ReactElement } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { techStack } from "../data/content";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useReveal } from "../hooks/useScrollReveal";
import {
  AngularIcon,
  AwsIcon,
  AzureIcon,
  DockerIcon,
  DotNetIcon,
  GoogleCloudIcon,
  JavaIcon,
  KafkaIcon,
  KubernetesIcon,
  MongoDbIcon,
  NodeJsIcon,
  PostgresIcon,
  PythonIcon,
  RabbitMqIcon,
  ReactIcon,
  RedisIcon,
} from "./icons/TechIcons";
import { DotsIcon } from "./icons/Icons";
import { HexagonBackground } from "./HexagonBackground";
import styles from "./TechStack.module.css";

const ICONS: Record<string, (size?: number) => ReactElement> = {
  AWS: (size) => <AwsIcon size={size} />,
  Azure: (size) => <AzureIcon size={size} />,
  "Google Cloud": (size) => <GoogleCloudIcon size={size} />,
  Kubernetes: (size) => <KubernetesIcon size={size} />,
  Docker: (size) => <DockerIcon size={size} />,
  Kafka: (size) => <KafkaIcon size={size} />,
  RabbitMQ: (size) => <RabbitMqIcon size={size} />,
  Python: (size) => <PythonIcon size={size} />,
  Java: (size) => <JavaIcon size={size} />,
  ".NET": (size) => <DotNetIcon size={size} />,
  "Node.js": (size) => <NodeJsIcon size={size} />,
  React: (size) => <ReactIcon size={size} />,
  Angular: (size) => <AngularIcon size={size} />,
  PostgreSQL: (size) => <PostgresIcon size={size} />,
  MongoDB: (size) => <MongoDbIcon size={size} />,
  Redis: (size) => <RedisIcon size={size} />,
};

function itemIcon(name: string) {
  const render = ICONS[name];
  if (render) return render(18);
  return <DotsIcon size={16} />;
}

export function TechStack() {
  const reduced = useReducedMotion();
  // once=false — the header and panels reveal scrolling in and hide scrolling back out,
  // rather than playing once and sitting static for the rest of the visit.
  const revealEyebrow = useReveal(0, false);
  const revealHeading = useReveal(0.08, false);
  const revealDescription = useReveal(0.16, false);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  // Continuous scroll-linked drift on the ambient glows and grid, on top of the discrete
  // reveal/hide triggers below — motion that tracks scroll position itself, not just entry.
  const glowAY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const glowBY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const gridY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <section className={styles.section} ref={sectionRef}>
      <HexagonBackground hexagonSize={56} className={styles.hexagons} />
      <motion.div
        className={styles.gridLines}
        aria-hidden="true"
        style={reduced ? undefined : { y: gridY }}
      />
      {/* Scroll-parallax lives on an absolutely-positioned wrapper (matching `.section`'s
          box, so the glow's own top/left/right/bottom still resolve the same way), not
          the glow div itself — that div already runs a CSS keyframe animation on
          `transform`, which would win the cascade over an inline style and silently
          swallow the scroll-linked motion. */}
      <motion.div
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, ...(reduced ? undefined : { y: glowAY }) }}
      >
        <div className={styles.glowA} />
      </motion.div>
      <motion.div
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, ...(reduced ? undefined : { y: glowBY }) }}
      >
        <div className={styles.glowB} />
      </motion.div>

      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <motion.span {...revealEyebrow} className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            {techStack.label}
          </motion.span>
          <motion.h2 {...revealHeading} className={styles.heading}>
            {splitHeading(techStack.heading)}
          </motion.h2>
          <motion.p {...revealDescription} className={styles.description}>
            {techStack.description}
          </motion.p>
        </div>

        <div className={styles.panels}>
          {techStack.groups.map((group, gi) => (
            <motion.div
              key={group.title}
              className={styles.panel}
              initial={{ opacity: 0, y: reduced ? 0 : 36, scale: reduced ? 1 : 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
              transition={{
                duration: reduced ? 0.01 : 0.7,
                delay: reduced ? 0 : gi * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span className={styles.panelTopline} aria-hidden="true" />
              <div className={styles.panelHeader}>
                <span className={styles.panelIndex}>{String(gi + 1).padStart(2, "0")}</span>
                <h3 className={styles.panelTitle}>{group.title}</h3>
                <span className={styles.panelCount} aria-hidden="true">
                  {group.items.length} tools
                </span>
              </div>

              <div className={styles.chipGrid}>
                {group.items.map((item, i) => (
                  <motion.div
                    key={item}
                    className={styles.chip}
                    initial={{ opacity: 0, y: reduced ? 0 : 10, scale: reduced ? 1 : 0.94 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
                    transition={{
                      duration: reduced ? 0.01 : 0.4,
                      delay: reduced ? 0 : Math.min(i * 0.035, 0.4),
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <span className={styles.chipIcon}>{itemIcon(item)}</span>
                    <span className={styles.chipLabel}>{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function splitHeading(text: string) {
  const marker = "not the hype";
  const idx = text.toLowerCase().indexOf(marker);
  if (idx === -1) return text;
  const before = text.slice(0, idx);
  const match = text.slice(idx, idx + marker.length);
  const after = text.slice(idx + marker.length);
  return (
    <>
      {before}
      <span className={`${styles.headingAccent} serif`}>{match}</span>
      {after}
    </>
  );
}
