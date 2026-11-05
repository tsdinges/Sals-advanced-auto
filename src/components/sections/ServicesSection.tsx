import type { Service } from "@/types/business";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { MaintenanceSchedule } from "@/components/services/MaintenanceSchedule";
import styles from "./ServicesSection.module.css";

interface ServicesSectionProps {
  services: readonly Service[];
  intervals: readonly { miles: string; items: string }[];
}

/** "What we fix": heading, services grid, maintenance timeline. */
export function ServicesSection({ services, intervals }: ServicesSectionProps) {
  return (
    <section id="services" className={styles.section} aria-labelledby="services-title">
      <Container>
        <SectionHeading
          id="services-title"
          title="What we fix"
          intro="Routine maintenance through engine work, all under one roof. Not sure what you need? Call and describe what's happening."
        />
        <ServiceGrid services={services} />
        <MaintenanceSchedule
          title="The 30 · 60 · 90 maintenance schedule"
          intervals={intervals}
          note="Every vehicle wears differently. We'll check yours and tell you what's actually due."
        />
      </Container>
    </section>
  );
}
