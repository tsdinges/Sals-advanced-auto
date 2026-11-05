import { Container } from "@/components/ui/Container";
import styles from "./AboutSection.module.css";

interface AboutSectionProps {
  /** Big figure, e.g. "20+" */
  years: string;
  yearsLabel: string;
  title: string;
  paragraphs: readonly string[];
}

/** Dark band with the years-in-business figure and the shop's story. */
export function AboutSection({ years, yearsLabel, title, paragraphs }: AboutSectionProps) {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <Container className={styles.grid}>
        <p className={styles.years}>
          {years}
          <small className={styles.yearsLabel}>{yearsLabel}</small>
        </p>
        <div className={styles.copy}>
          <h2 id="about-title" className={styles.title}>
            {title}
          </h2>
          {paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Container>
    </section>
  );
}
