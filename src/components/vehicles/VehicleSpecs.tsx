import { formatMiles, formatPrice } from "@/lib/format";
import styles from "./VehicleSpecs.module.css";

interface VehicleSpecsProps {
  mileage: number;
  priceUsd: number;
  size?: "md" | "lg";
}

/** Big mileage + price figures. Shared by the card and the detail page. */
export function VehicleSpecs({ mileage, priceUsd, size = "md" }: VehicleSpecsProps) {
  return (
    <dl className={`${styles.specs} ${size === "lg" ? styles.lg : ""}`}>
      <div>
        <dt>Asking</dt>
        <dd>{formatPrice(priceUsd)}</dd>
      </div>
      <div>
        <dt>Miles</dt>
        <dd>{formatMiles(mileage)}</dd>
      </div>
    </dl>
  );
}
