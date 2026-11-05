import type { VehicleStatus } from "@/types/business";
import styles from "./StatusTag.module.css";

/** Only "pending" gets a visible tag; available cars need no label and sold cars are hidden. */
export function StatusTag({ status }: { status: VehicleStatus }) {
  if (status !== "pending") return null;
  return <span className={styles.tag}>Sale pending</span>;
}
