import type { Service } from "@/types/business";
import { ServiceCard } from "./ServiceCard";
import styles from "./ServiceGrid.module.css";

/** Ruled grid of services: 3 columns desktop, 2 tablet, 1 phone. */
export function ServiceGrid({ services }: { services: readonly Service[] }) {
  return (
    <ul className={styles.grid}>
      {services.map((s) => (
        <ServiceCard key={s.id} service={s} />
      ))}
    </ul>
  );
}
