import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "brand" | "outline";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  /** Stretch to fill the parent's width */
  block?: boolean;
  className?: string;
}

/** Renders a link when `href` is given, otherwise a <button>. */
type ButtonProps =
  | (BaseProps & { href: string })
  | (BaseProps & { href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>);

export function Button(props: ButtonProps) {
  const { children, variant = "primary", block, className, ...rest } = props;
  const classes = [styles.button, styles[variant], block && styles.block, className]
    .filter(Boolean)
    .join(" ");

  if ("href" in rest && rest.href !== undefined) {
    const { href } = rest;
    // Plain <a> for tel:/mailto:/external; Next <Link> for internal routes.
    const isInternal = href.startsWith("/") || href.startsWith("#");
    return isInternal ? (
      <Link href={href} className={classes}>
        {children}
      </Link>
    ) : (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type="button" {...buttonProps} className={classes}>
      {children}
    </button>
  );
}
