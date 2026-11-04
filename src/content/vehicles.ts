import type { VehicleListing } from "@/types/business";

/**
 * Vehicles for sale. Migrated from the Wix /vehicles page.
 * TODO(owner): confirm this car is still available and send photos.
 * Set `available: false` to hide a listing without deleting it.
 */
export const vehicles: VehicleListing[] = [
  {
    id: "2001-mercedes",
    year: 2001,
    make: "Mercedes-Benz",
    mileage: 44000,
    priceUsd: 6500,
    description: "Great condition with very low miles for its age.",
    available: true,
  },
];

export const availableVehicles = (): VehicleListing[] =>
  vehicles.filter((v) => v.available);
