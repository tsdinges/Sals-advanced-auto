import type { ReactNode } from "react";
import styles from "./SectionHeading.module.css";

interface SectionHeadingProps {
  title: string;
  /** Optional supporting line shown beside (desktop) or under (phone) the title */
  intro?: ReactNode;
  /** id of the heading, so the parent <section> can use aria-labelledby */
  id?: string;
}

/** Consistent big uppercase heading used at the top of each home-page section. */
export function SectionHeading({ title, intro, id }: SectionHeadingProps) {
  return (
    <div className={styles.head}>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {intro ? <p className={styles.intro}>{intro}</p> : null}
    </div>
  );
}
