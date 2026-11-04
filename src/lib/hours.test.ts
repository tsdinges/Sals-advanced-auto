import { describe, expect, it } from "vitest";
import { formatClock, getShopStatus } from "./hours";
import { site } from "@/config/site";

const TZ = site.timeZone;
const at = (iso: string) => new Date(iso);

describe("getShopStatus", () => {
  it("is open mid-morning on a weekday", () => {
    // Wed 2026-11-04 10:00 EST = 15:00Z
    const s = getShopStatus(at("2026-11-04T15:00:00Z"), site.hours, TZ);
    expect(s).toEqual({ isOpen: true, label: "Open now · closes 5 pm" });
  });

  it("is closed before opening and opens later today", () => {
    // Wed 07:30 EST
    const s = getShopStatus(at("2026-11-04T12:30:00Z"), site.hours, TZ);
    expect(s).toEqual({ isOpen: false, label: "Closed · opens 8 am" });
  });

  it("closes exactly at 5 pm and opens tomorrow", () => {
    // Wed 17:00 EST
    const s = getShopStatus(at("2026-11-04T22:00:00Z"), site.hours, TZ);
    expect(s).toEqual({ isOpen: false, label: "Closed · opens tomorrow 8 am" });
  });

  it("points to Monday over the weekend", () => {
    // Sat 2026-11-07 12:00 EST
    const s = getShopStatus(at("2026-11-07T17:00:00Z"), site.hours, TZ);
    expect(s).toEqual({ isOpen: false, label: "Closed · opens Mon 8 am" });
  });

  it("uses shop time, not UTC, across midnight UTC", () => {
    // Fri 2026-11-06 20:30 EST = Sat 01:30Z
    const s = getShopStatus(at("2026-11-07T01:30:00Z"), site.hours, TZ);
    expect(s.label).toBe("Closed · opens Mon 8 am");
  });
});

describe("formatClock", () => {
  it("formats on-the-hour and half-hour times", () => {
    expect(formatClock(0)).toBe("12 am");
    expect(formatClock(720)).toBe("12 pm");
    expect(formatClock(510)).toBe("8:30 am");
  });
});
