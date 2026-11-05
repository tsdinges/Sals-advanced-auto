import type { BusinessInfo } from "@/types/business";
import { CopyButton } from "@/components/ui/CopyButton";
import { formatAddressLine } from "@/lib/format";
import styles from "./ContactDetails.module.css";

type DetailsInfo = Pick<BusinessInfo, "phone" | "email" | "address" | "hoursSummary" | "social">;

/** Phone, email, address (with directions link), hours, social. */
export function ContactDetails({ info }: { info: DetailsInfo }) {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    formatAddressLine(info.address),
  )}`;

  return (
    <dl className={styles.list}>
      <div>
        <dt>Phone</dt>
        <dd>
          <a href={`tel:${info.phone.e164}`}>{info.phone.display}</a>
          <CopyButton text={info.phone.display} label="phone number" />
        </dd>
      </div>
      <div>
        <dt>Email</dt>
        <dd className={styles.wrap}>
          <a href={`mailto:${info.email}`}>{info.email}</a>
          <CopyButton text={info.email} label="email address" />
        </dd>
      </div>
      <div>
        <dt>Visit</dt>
        <dd>
          {info.address.street}
          <br />
          {info.address.city}, {info.address.region} {info.address.postalCode}
          <br />
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className={styles.small}>
            Get directions →
          </a>
        </dd>
      </div>
      <div>
        <dt>Hours</dt>
        <dd>
          {info.hoursSummary}
          <br />
          <span className={styles.muted}>Closed Saturday &amp; Sunday</span>
        </dd>
      </div>
      {info.social.length > 0 && (
        <div>
          <dt>Follow</dt>
          <dd>
            {info.social.map((s) => (
              <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer">
                {s.handle}
              </a>
            ))}
          </dd>
        </div>
      )}
    </dl>
  );
}
