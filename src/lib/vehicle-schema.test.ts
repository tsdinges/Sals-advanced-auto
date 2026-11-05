import { describe, expect, it } from "vitest";
import { parseVehicle, sortVehicles, vehicleTitle } from "./vehicle-schema";

const base = {
  year: 2015,
  make: "Ford",
  model: "F-150",
  mileage: 98000,
  priceUsd: 18500,
  status: "available",
  summary: "One-owner truck.",
  listedOn: "2026-11-04",
};

describe("parseVehicle", () => {
  it("accepts a valid file and fills defaults", () => {
    const v = parseVehicle("2015-ford-f150", base);
    expect(v.id).toBe("2015-ford-f150");
    expect(v.photos).toEqual([]);
    expect(v.features).toEqual([]);
  });

  it("names the file and field when a price is typed as text", () => {
    expect(() => parseVehicle("2015-ford-f150", { ...base, priceUsd: "$18,500" })).toThrow(
      'Vehicle "2015-ford-f150.json": "priceUsd" must be a number',
    );
  });

  it("rejects an unknown status", () => {
    expect(() => parseVehicle("x", { ...base, status: "for sale" })).toThrow(/status/);
  });

  it("rejects file names with spaces or capitals", () => {
    expect(() => parseVehicle("Ford F150", base)).toThrow(/file name/);
  });
});

describe("sortVehicles / vehicleTitle", () => {
  it("lists newest first", () => {
    const a = parseVehicle("a", { ...base, listedOn: "2026-10-01" });
    const b = parseVehicle("b", { ...base, listedOn: "2026-11-01" });
    expect(sortVehicles([a, b]).map((v) => v.id)).toEqual(["b", "a"]);
  });

  it("builds a readable title, skipping blanks", () => {
    expect(vehicleTitle({ year: 2001, make: "Mercedes-Benz" })).toBe("2001 Mercedes-Benz");
    expect(vehicleTitle({ year: 2015, make: "Ford", model: "F-150", trim: "XLT" })).toBe("2015 Ford F-150 XLT");
  });
});
