import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useReveal } from "../hooks/useScrollReveal";
import styles from "./SectionLabel.module.css";

interface SectionLabelProps {
  eyebrow: string;
  heading: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  headingLevel?: "h2" | "h3";
  onDark?: boolean;
}

export function SectionLabel({
  eyebrow,
  heading,
  description,
  align = "left",
  headingLevel = "h2",
  onDark = false,
}: SectionLabelProps) {
  const revealEyebrow = useReveal();
  const revealHeading = useReveal(0.08);
  const revealDescription = useReveal(0.16);
  const Heading = headingLevel;

  return (
    <div className={`${styles.wrap} ${align === "center" ? styles.center : ""} ${onDark ? styles.onDark : ""}`}>
      <motion.div {...revealEyebrow} className={`${styles.eyebrowRow} eyebrow`}>
        <span>{eyebrow}</span>
      </motion.div>
      <motion.div {...revealHeading}>
        <Heading className={styles.heading}>{heading}</Heading>
      </motion.div>
      {description && (
        <motion.p {...revealDescription} className={styles.description}>
          {description}
        </motion.p>
      )}
    </div>
  );
}
