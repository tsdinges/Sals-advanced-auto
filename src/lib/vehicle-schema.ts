import type { VehicleListing, VehicleStatus } from "@/types/business";

/**
 * Validates one vehicle file. Pure (no file system) so it is unit-testable.
 * Throws a plain-English error naming the file and field, which stops the
 * build instead of publishing a broken listing.
 */
const STATUSES: VehicleStatus[] = ["available", "pending", "sold"];
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function parseVehicle(id: string, raw: unknown): VehicleListing {
  const fail = (msg: string): never => {
    throw new Error(`Vehicle "${id}.json": ${msg}`);
  };
  if (!SLUG.test(id)) fail("file name must be lowercase words joined by dashes");
  if (typeof raw !== "object" || raw === null) fail("file is not a JSON object");
  const r = raw as Record<string, unknown>;

  const num = (k: string): number =>
    typeof r[k] === "number" && Number.isFinite(r[k]) ? (r[k] as number) : fail(`"${k}" must be a number`);
  const str = (k: string): string =>
    typeof r[k] === "string" && (r[k] as string).trim() ? (r[k] as string) : fail(`"${k}" must be text`);
  const optStr = (k: string): string | undefined =>
    r[k] === undefined || r[k] === "" ? undefined : str(k);
  const strList = (k: string): string[] => {
    if (r[k] === undefined) return [];
    if (!Array.isArray(r[k]) || !(r[k] as unknown[]).every((x) => typeof x === "string"))
      fail(`"${k}" must be a list of text values`);
    return r[k] as string[];
  };

  const status = r.status as VehicleStatus;
  if (!STATUSES.includes(status)) fail(`"status" must be one of: ${STATUSES.join(", ")}`);

  const listedOn = str("listedOn");
  if (Number.isNaN(Date.parse(listedOn))) fail(`"listedOn" must be a date like 2026-11-04`);

  const photos = strList("photos");
  photos.forEach((p) => p.startsWith("/") || fail(`photo "${p}" must start with /vehicles/`));

  return {
    id,
    year: num("year"),
    make: str("make"),
    model: optStr("model"),
    trim: optStr("trim"),
    mileage: num("mileage"),
    priceUsd: num("priceUsd"),
    status,
    summary: str("summary"),
    description: optStr("description"),
    features: strList("features"),
    photos,
    listedOn,
  };
}

/** Newest listing first; ties broken by year, newest first. */
export function sortVehicles(list: VehicleListing[]): VehicleListing[] {
  return [...list].sort(
    (a, b) => b.listedOn.localeCompare(a.listedOn) || b.year - a.year,
  );
}

/** "2001 Mercedes-Benz C320 Sport" */
export function vehicleTitle(v: Pick<VehicleListing, "year" | "make" | "model" | "trim">): string {
  return [v.year, v.make, v.model, v.trim].filter(Boolean).join(" ");
}
