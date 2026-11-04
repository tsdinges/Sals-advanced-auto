import { Container } from "@/components/ui/Container";
import styles from "./SiteFooter.module.css";

interface SiteFooterProps {
  name: string;
  addressLine: string;
  serviceArea: string;
}

export function SiteFooter({ name, addressLine, serviceArea }: SiteFooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <span>
          © {year} {name} · {addressLine}
        </span>
        <span>Serving {serviceArea}</span>
      </Container>
    </footer>
  );
}
