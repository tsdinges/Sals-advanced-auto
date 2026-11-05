import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { getListedVehicles, getVehicle } from "@/lib/vehicles";
import { vehicleTitle } from "@/lib/vehicle-schema";
import { formatMiles, formatPrice } from "@/lib/format";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { VehiclePhoto } from "@/components/vehicles/VehiclePhoto";
import { VehicleSpecs } from "@/components/vehicles/VehicleSpecs";
import { StatusTag } from "@/components/vehicles/StatusTag";
import styles from "./vehicle.module.css";

type Params = Promise<{ id: string }>;

/** Pre-build one page per listed car. Sold or deleted cars return 404. */
export function generateStaticParams() {
  return getListedVehicles().map((v) => ({ id: v.id }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const v = getVehicle((await params).id);
  if (!v) return {};
  const title = vehicleTitle(v);
  return {
    title: `${title} for Sale, ${formatPrice(v.priceUsd)}`,
    description: `${title}, ${formatMiles(v.mileage)} miles, ${formatPrice(v.priceUsd)}. ${v.summary}`,
    alternates: { canonical: `/vehicles/${v.id}` },
    openGraph: v.photos?.[0] ? { images: [v.photos[0]] } : undefined,
  };
}

export default async function VehicleDetailPage({ params }: { params: Params }) {
  const v = getVehicle((await params).id);
  if (!v) notFound();

  const title = vehicleTitle(v);
  const paragraphs = (v.description ?? v.summary).split(/\n\s*\n/);
  const [cover, ...morePhotos] = v.photos ?? [];

  return (
    <article className={styles.page}>
      <Container>
        <Link href="/vehicles" className={styles.back}>
          ← All vehicles for sale
        </Link>

        <div className={styles.layout}>
          <div className={styles.media}>
            <VehiclePhoto src={cover} alt={title} year={v.year} make={v.make} priority sizes="(max-width: 860px) 100vw, 60vw" />
            {morePhotos.length > 0 && (
              <ul className={styles.thumbs}>
                {morePhotos.map((src, i) => (
                  <li key={src}>
                    <VehiclePhoto src={src} alt={`${title}, photo ${i + 2}`} year={v.year} make={v.make} sizes="(max-width: 860px) 50vw, 30vw" />
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={styles.info}>
            <StatusTag status={v.status} />
            <h1 className={styles.title}>{title}</h1>
            <VehicleSpecs mileage={v.mileage} priceUsd={v.priceUsd} size="lg" />

            <div className={styles.copy}>
              {paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            {v.features && v.features.length > 0 && (
              <ul className={styles.features}>
                {v.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            )}

            <div className={styles.cta}>
              <p className={styles.ctaLabel}>Interested? Call the shop</p>
              <p className={styles.phone}>{site.phone.display}</p>
              <Button href={`tel:${site.phone.e164}`} block>
                Call about this car
              </Button>
              <p className={styles.hours}>{site.hoursSummary} · {site.address.street}, {site.address.city}</p>
            </div>
          </div>
        </div>
      </Container>
    </article>
  );
}
