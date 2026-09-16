import type { AnchorHTMLAttributes } from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.css";

interface ButtonProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  variant?: "primary" | "secondary";
  onDark?: boolean;
  showArrow?: boolean;
  href?: string;
  /** Internal route to navigate to via client-side routing, instead of a plain href. */
  to?: string;
}

export function Button({
  variant = "primary",
  onDark = false,
  showArrow = true,
  className,
  children,
  href,
  to,
  ...rest
}: ButtonProps) {
  const classes = [styles.btn, styles[variant], onDark ? styles.onDark : "", className]
    .filter(Boolean)
    .join(" ");

  const arrow = showArrow && (
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
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        <span>{children}</span>
        {arrow}
      </Link>
    );
  }

  return (
    <a className={classes} href={href} {...rest}>
      <span>{children}</span>
      {arrow}
    </a>
  );
}
