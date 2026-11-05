import type { BusinessInfo } from "@/types/business";

/**
 * Single source of truth for business details.
 * Migrated from salsadvancedauto.com (Wix) on 2026-11-04.
 * Change hours, phone or address here and every component updates.
 */
export const site: BusinessInfo = {
  name: "Sal's Advanced Auto",
  shortName: "Sal's",
  tagline: "Finally, a mechanic you can trust.",
  description:
    "Sal's Advanced Auto is a full-service auto repair shop in Wolfeboro, NH, offering state inspections, oil changes, brakes, tires, diagnostics, engine repair and A/C service for drivers throughout the Lakes Region.",
  url: "https://www.salsadvancedauto.com",
  phone: { display: "(603) 569-7763", e164: "+16035697763" },
  email: "salsadvancedauto@gmail.com",
  address: {
    street: "486 Center St",
    city: "Wolfeboro",
    region: "NH",
    postalCode: "03894",
    country: "US",
  },
  timeZone: "America/New_York",
  hours: [1, 2, 3, 4, 5].map((day) => ({
    day: day as 1 | 2 | 3 | 4 | 5,
    opens: "08:00",
    closes: "17:00",
  })),
  hoursSummary: "Mon–Fri, 8 am – 5 pm",
  yearsInBusiness: "20+",
  serviceArea: "Wolfeboro and the Lakes Region",
  social: [
    {
      network: "instagram",
      handle: "@sals.advancedauto",
      url: "https://www.instagram.com/sals.advancedauto/",
    },
  ],
};

/** Primary navigation. Anchors point at home-page sections. */
export const navItems = [
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Cars for Sale", href: "/vehicles" },
  { label: "Contact", href: "/#contact" },
] as const;
