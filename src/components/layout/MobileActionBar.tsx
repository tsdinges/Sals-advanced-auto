import { Button } from "@/components/ui/Button";
import styles from "./MobileActionBar.module.css";

interface MobileActionBarProps {
  phoneE164: string;
  bookHref: string;
}

/** Fixed bottom bar on phones: the two actions customers need most. */
export function MobileActionBar({ phoneE164, bookHref }: MobileActionBarProps) {
  return (
    <div className={styles.bar} aria-label="Quick actions" role="region">
      <Button href={`tel:${phoneE164}`} variant="brand">
        Call the shop
      </Button>
      <Button href={bookHref} variant="primary">
        Book service
      </Button>
    </div>
  );
}
