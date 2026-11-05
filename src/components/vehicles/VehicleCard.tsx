import Link from "next/link";
import type { VehicleListing } from "@/types/business";
import { vehicleTitle } from "@/lib/vehicle-schema";
import { VehiclePhoto } from "./VehiclePhoto";
import { VehicleSpecs } from "./VehicleSpecs";
import { StatusTag } from "./StatusTag";
import styles from "./VehicleCard.module.css";

/** List-page card. The whole card links to the car's detail page. */
export function VehicleCard({ vehicle, priority }: { vehicle: VehicleListing; priority?: boolean }) {
  const title = vehicleTitle(vehicle);
  return (
    <li className={styles.card}>
      <Link href={`/vehicles/${vehicle.id}`} className={styles.link}>
        <VehiclePhoto
          src={vehicle.photos?.[0]}
          alt={title}
          year={vehicle.year}
          make={vehicle.make}
          priority={priority}
          sizes="(max-width: 700px) 100vw, 50vw"
        />
        <div className={styles.body}>
          <StatusTag status={vehicle.status} />
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.summary}>{vehicle.summary}</p>
          <VehicleSpecs mileage={vehicle.mileage} priceUsd={vehicle.priceUsd} />
          <span className={styles.more}>See details →</span>
        </div>
      </Link>
    </li>
  );
}
