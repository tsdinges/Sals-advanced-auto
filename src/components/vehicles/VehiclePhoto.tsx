import Image from "next/image";
import styles from "./VehiclePhoto.module.css";

interface VehiclePhotoProps {
  src?: string;
  alt: string;
  /** Shown on the placeholder when there is no photo yet */
  year: number;
  make: string;
  /** Load eagerly (use for the first image a visitor sees) */
  priority?: boolean;
  sizes?: string;
}

/** 4:3 photo, or a branded placeholder plate until photos are added. */
export function VehiclePhoto({ src, alt, year, make, priority, sizes = "100vw" }: VehiclePhotoProps) {
  return (
    <div className={styles.frame}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={styles.img} />
      ) : (
        <div className={styles.placeholder} role="img" aria-label={`${alt}, photo coming soon`}>
          <span className={styles.year}>{year}</span>
          <span className={styles.make}>{make}</span>
          <span className={styles.soon}>Photos coming soon</span>
        </div>
      )}
    </div>
  );
}
