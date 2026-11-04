import type { BusinessInfo, Weekday } from "@/types/business";

/**
 * Builds schema.org AutoRepair JSON-LD so Google can show hours,
 * phone and address directly in search results.
 */
const SCHEMA_DAY: Record<Weekday, string> = {
  1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday",
  5: "Friday", 6: "Saturday", 7: "Sunday",
};

export function buildLocalBusinessJsonLd(info: BusinessInfo) {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: info.name,
    description: info.description,
    url: info.url,
    telephone: info.phone.e164,
    email: info.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: info.address.street,
      addressLocality: info.address.city,
      addressRegion: info.address.region,
      postalCode: info.address.postalCode,
      addressCountry: info.address.country,
    },
    areaServed: info.serviceArea,
    openingHoursSpecification: info.hours.map((w) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: SCHEMA_DAY[w.day],
      opens: w.opens,
      closes: w.closes,
    })),
    sameAs: info.social.map((s) => s.url),
  };
}
