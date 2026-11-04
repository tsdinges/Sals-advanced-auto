/**
 * Domain types for the shop's business data.
 * Content files in src/content and src/config implement these shapes,
 * so components never depend on where the data comes from.
 */

/** ISO weekday: 1 = Monday ... 7 = Sunday */
export type Weekday = 1 | 2 | 3 | 4 | 5 | 6 | 7;

/** One open window on a given day, in 24h "HH:MM" shop-local time. */
export interface OpeningWindow {
  day: Weekday;
  opens: string;
  closes: string;
}

export interface PostalAddress {
  street: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
}

export interface PhoneNumber {
  /** Human-readable, e.g. "(603) 569-7763" */
  display: string;
  /** E.164 for tel: links, e.g. "+16035697763" */
  e164: string;
}

export interface SocialLink {
  network: "instagram" | "facebook" | "google";
  handle: string;
  url: string;
}

export interface BusinessInfo {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  url: string;
  phone: PhoneNumber;
  email: string;
  address: PostalAddress;
  /** IANA time zone used for open/closed logic */
  timeZone: string;
  hours: OpeningWindow[];
  /** Human summary of hours for display, e.g. "Mon–Fri, 8 am – 5 pm" */
  hoursSummary: string;
  yearsInBusiness: string;
  serviceArea: string;
  social: SocialLink[];
}

export interface Service {
  /** Stable slug, safe for anchors and future /services/[slug] routes */
  id: string;
  name: string;
  /** Short category tag shown above the name */
  category: string;
  summary: string;
}

export interface VehicleListing {
  id: string;
  year: number;
  make: string;
  model?: string;
  mileage: number;
  priceUsd: number;
  description: string;
  available: boolean;
  /** Path under /public, once photos are provided */
  imageSrc?: string;
}
