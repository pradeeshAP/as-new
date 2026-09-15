import type { AnchorHTMLAttributes } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "secondary";
  onDark?: boolean;
  showArrow?: boolean;
}

export function Button({
  variant = "primary",
  onDark = false,
  showArrow = true,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = [styles.btn, styles[variant], onDark ? styles.onDark : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <a className={classes} {...rest}>
      <span>{children}</span>
      {showArrow && (
        <svg
          className={styles.icon}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2 12L12 2M12 2H4M12 2V10"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </a>
  );
}
