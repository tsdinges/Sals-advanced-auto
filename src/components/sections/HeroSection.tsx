import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import styles from "./HeroSection.module.css";

interface HeroSectionProps {
  eyebrow: string;
  /** Headline; the final word is highlighted in brand yellow */
  headline: string;
  lede: string;
  promises: readonly string[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  /** Right-hand panel, e.g. <ShopTicket />. Composition keeps Hero generic. */
  aside?: ReactNode;
}

/** Splits "Finally, a mechanic you can trust." into lead text + last word. */
function splitLastWord(text: string): [string, string] {
  const i = text.trimEnd().lastIndexOf(" ");
  return i === -1 ? ["", text] : [text.slice(0, i + 1), text.slice(i + 1)];
}

export function HeroSection({
  eyebrow,
  headline,
  lede,
  promises,
  primaryCta,
  secondaryCta,
  aside,
}: HeroSectionProps) {
  const [lead, last] = splitLastWord(headline);

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <Container className={styles.grid}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1 id="hero-title" className={styles.title}>
            {lead}
            <mark className={styles.mark}>{last}</mark>
          </h1>
          <p className={styles.lede}>{lede}</p>
          <div className={styles.ctas}>
            <Button href={primaryCta.href}>{primaryCta.label}</Button>
            <Button href={secondaryCta.href} variant="outline">
              {secondaryCta.label}
            </Button>
          </div>
          <ul className={styles.promises}>
            {promises.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
        {aside}
      </Container>
    </section>
  );
}
