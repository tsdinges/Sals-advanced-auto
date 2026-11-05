import type { Metadata } from "next";
import { site } from "@/config/site";
import { getListedVehicles } from "@/lib/vehicles";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import styles from "./vehicles.module.css";

export const metadata: Metadata = {
  title: "Used Cars for Sale in Wolfeboro, NH",
  description: `Used vehicles for sale at ${site.name} in Wolfeboro, NH. Every car is inspected by our own technicians.`,
  alternates: { canonical: "/vehicles" },
};

export default function VehiclesPage() {
  const vehicles = getListedVehicles();

  return (
    <section className={styles.page} aria-labelledby="vehicles-title">
      <Container>
        <SectionHeading
          id="vehicles-title"
          title="Vehicles for sale"
          intro={`Inspected by our own technicians. Call ${site.phone.display} to confirm availability or set up a time to see a car.`}
        />

        {vehicles.length > 0 ? (
          <ul className={styles.grid}>
            {vehicles.map((v, i) => (
              <VehicleCard key={v.id} vehicle={v} priority={i === 0} />
            ))}
          </ul>
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>No cars listed right now</p>
            <p>New cars come in regularly. Call the shop to ask what&apos;s coming up.</p>
            <Button href={`tel:${site.phone.e164}`}>Call {site.phone.display}</Button>
          </div>
        )}
      </Container>
    </section>
  );
}
