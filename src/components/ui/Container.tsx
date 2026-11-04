import type { ElementType, ReactNode } from "react";
import styles from "./Container.module.css";

interface ContainerProps {
  children: ReactNode;
  /** Render as a different element, e.g. "nav" or "footer" */
  as?: ElementType;
  className?: string;
}

/** Centers content at the site's max width with safe-area side gutters. */
export function Container({ children, as: Tag = "div", className }: ContainerProps) {
  return <Tag className={[styles.container, className].filter(Boolean).join(" ")}>{children}</Tag>;
}
