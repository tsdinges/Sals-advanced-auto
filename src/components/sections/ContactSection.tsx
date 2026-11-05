import type { BusinessInfo } from "@/types/business";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactDetails } from "@/components/contact/ContactDetails";
import { ContactForm } from "@/components/contact/ContactForm";
import styles from "./ContactSection.module.css";

interface ContactSectionProps {
  info: BusinessInfo;
  serviceOptions: readonly string[];
}

/** "Get in touch": details on the left, request form on the right. */
export function ContactSection({ info, serviceOptions }: ContactSectionProps) {
  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <Container className={styles.grid}>
        <div>
          <SectionHeading id="contact-title" title="Get in touch" />
          <ContactDetails info={info} />
        </div>
        <ContactForm serviceOptions={serviceOptions} fallbackPhone={info.phone.display} />
      </Container>
    </section>
  );
}
