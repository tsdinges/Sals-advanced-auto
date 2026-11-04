import type { Service } from "@/types/business";

/**
 * Services offered, merged from the Wix Home, Services and Contact pages
 * (each listed a slightly different set). Order = display order.
 */
export const services: Service[] = [
  {
    id: "state-inspection",
    name: "State Inspections",
    category: "NH State Inspection",
    summary:
      "Brakes, tires, suspension, lights and emissions checked against New Hampshire requirements.",
  },
  {
    id: "oil-change",
    name: "Oil Changes",
    category: "Maintenance",
    summary:
      "Fresh oil keeps every moving part lubricated, cooler and clean. Quick turnaround.",
  },
  {
    id: "brakes",
    name: "Brake Service",
    category: "Safety",
    summary:
      "Squealing, grinding or a soft pedal? We inspect, replace pads and rotors, and bleed the system.",
  },
  {
    id: "tires",
    name: "Tire Repair & Replacement",
    category: "Tires · TPMS",
    summary:
      "TPMS light on, lost air, or hit something on the road? We'll tell you if it's a repair or a replacement.",
  },
  {
    id: "check-engine",
    name: "Check Engine Light",
    category: "Diagnostics",
    summary:
      "We read the codes and find the actual cause before recommending any repair.",
  },
  {
    id: "engine-repair",
    name: "Engine Repair",
    category: "Engine",
    summary:
      "From sensor and gasket work to larger repairs, handled by experienced technicians.",
  },
  {
    id: "battery",
    name: "Battery Testing",
    category: "Electrical",
    summary:
      "Slow starts or a dash light? Get it tested before a cold morning leaves you stranded.",
  },
  {
    id: "ac-service",
    name: "A/C Service",
    category: "Climate",
    summary:
      "Leak checks, recharges and component repair so the A/C works when summer hits the lake.",
  },
  {
    id: "tune-up",
    name: "Tune-Ups",
    category: "Maintenance",
    summary:
      "Plugs, filters, belts and fluids, matched to your vehicle's schedule and how you drive.",
  },
];

/** The 30/60/90k schedule referenced on the Wix Services page. */
export const maintenanceIntervals = [
  { miles: "30k", items: "Fluids, filters, inspection" },
  { miles: "60k", items: "Brakes, belts, battery" },
  { miles: "90k", items: "Plugs, timing, major service" },
] as const;
