import Link from "next/link";
import { Container } from "@/components/ui/Container";
import styles from "./SiteHeader.module.css";

interface NavItem {
  label: string;
  href: string;
}

interface SiteHeaderProps {
  name: string;
  locality: string;
  phone: { display: string; e164: string };
  navItems: readonly NavItem[];
}

/**
 * Sticky top bar: brand, section links and a call button.
 * On phones the call button hides (MobileActionBar takes over)
 * and links become a swipeable row under the brand.
 */
export function SiteHeader({ name, locality, phone, navItems }: SiteHeaderProps) {
  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Link href="/" className={styles.brand}>
          {name}
          <small className={styles.locality}>{locality}</small>
        </Link>

        <nav aria-label="Main" className={styles.nav}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={styles.link}>
              {item.label}
            </Link>
          ))}
          <a href={`tel:${phone.e164}`} className={styles.call}>
            {phone.display}
          </a>
        </nav>
      </Container>
    </header>
  );
}
