"use client";

import { useShopStatus } from "@/hooks/useShopStatus";
import type { OpeningWindow } from "@/types/business";
import styles from "./ShopStatusBadge.module.css";

interface ShopStatusBadgeProps {
  hours: OpeningWindow[];
  timeZone: string;
  /** Text shown before the client clock is known (server render). */
  fallback: string;
}

/** Live "Open now / Closed" pill. Data comes in through props, not imports. */
export function ShopStatusBadge({ hours, timeZone, fallback }: ShopStatusBadgeProps) {
  const status = useShopStatus(hours, timeZone);

  const tone = status === null ? styles.unknown : status.isOpen ? styles.open : styles.closed;
  return (
    <span className={`${styles.badge} ${tone}`} aria-live="polite">
      <span className={styles.dot} aria-hidden="true" />
      {status?.label ?? fallback}
    </span>
  );
}
