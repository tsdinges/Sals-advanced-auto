import "server-only";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import type { VehicleListing } from "@/types/business";
import { parseVehicle, sortVehicles } from "./vehicle-schema";

/**
 * Data access for vehicles. Reads src/content/vehicles/*.json at build time.
 * Components never touch the file system; they call these functions.
 * To move listings to a CMS later, only this file changes.
 */
const VEHICLES_DIR = path.join(process.cwd(), "src", "content", "vehicles");

function loadAll(): VehicleListing[] {
  const files = readdirSync(VEHICLES_DIR).filter((f) => f.endsWith(".json"));
  return files.map((file) => {
    const id = file.replace(/\.json$/, "");
    const raw: unknown = JSON.parse(readFileSync(path.join(VEHICLES_DIR, file), "utf8"));
    return parseVehicle(id, raw);
  });
}

/** Cars shown on the site (available + pending), newest first. */
export function getListedVehicles(): VehicleListing[] {
  return sortVehicles(loadAll().filter((v) => v.status !== "sold"));
}

export function getVehicle(id: string): VehicleListing | undefined {
  return getListedVehicles().find((v) => v.id === id);
}
