import type { BusinessInfo } from "@/types/business";
import { ShopStatusBadge } from "./ShopStatusBadge";
import styles from "./ShopTicket.module.css";

type TicketInfo = Pick<BusinessInfo, "phone" | "hours" | "timeZone" | "hoursSummary" | "address">;

interface ShopTicketProps {
  info: TicketInfo;
  /** Extra rows, e.g. { label: "Makes", value: "Foreign & domestic" } */
  extraRows?: { label: string; value: string }[];
}

/**
 * The "work order" card: live status, phone, hours, address.
 * Takes only the fields it needs (Interface Segregation), so it can be
 * reused on a future contact page without the full BusinessInfo.
 */
export function ShopTicket({ info, extraRows = [] }: ShopTicketProps) {
  const { address } = info;
  return (
    <aside className={styles.ticket} aria-label="Shop details">
      <div className={styles.inner}>
        <div className={styles.row}>
          <span className={styles.key}>Shop status</span>
          <span className={styles.value}>
            <ShopStatusBadge hours={info.hours} timeZone={info.timeZone} fallback={info.hoursSummary} />
          </span>
        </div>

        <div>
          <div className={styles.key}>Call the shop</div>
          <a href={`tel:${info.phone.e164}`} className={styles.phone}>
            {info.phone.display}
          </a>
        </div>

        <div className={styles.row}>
          <span className={styles.key}>Hours</span>
          <span className={styles.value}>{info.hoursSummary}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.key}>Address</span>
          <span className={styles.value}>
            {address.street}
            <br />
            {address.city}, {address.region} {address.postalCode}
          </span>
        </div>

        {extraRows.map((r) => (
          <div key={r.label} className={styles.row}>
            <span className={styles.key}>{r.label}</span>
            <span className={styles.value}>{r.value}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
