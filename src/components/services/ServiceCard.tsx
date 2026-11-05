import type { Service } from "@/types/business";
import styles from "./ServiceCard.module.css";

/** One cell in the services grid. Pure presentation. */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <li className={styles.card} id={`service-${service.id}`}>
      <span className={styles.category}>{service.category}</span>
      <h3 className={styles.name}>{service.name}</h3>
      <p className={styles.summary}>{service.summary}</p>
    </li>
  );
}
