import type { OpeningWindow, Weekday } from "@/types/business";

/**
 * Pure open/closed logic. No React, no globals: pass in the time,
 * the schedule and the shop's time zone. Easy to unit test.
 */

export interface ShopStatus {
  isOpen: boolean;
  /** Short label for display, e.g. "Open now · closes 5 pm" */
  label: string;
}

const WEEKDAY_INDEX: Record<string, Weekday> = {
  Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7,
};
const WEEKDAY_SHORT = ["", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/** Wall-clock weekday and minutes-since-midnight in a given time zone. */
export function zonedParts(date: Date, timeZone: string): { day: Weekday; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const day = WEEKDAY_INDEX[get("weekday")];
  if (!day) throw new Error(`Unrecognized weekday for ${timeZone}`);
  return { day, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

/** "08:00" -> 480 */
export function toMinutes(hhmm: string): number {
  const [h = "0", m = "0"] = hhmm.split(":");
  return Number(h) * 60 + Number(m);
}

/** 480 -> "8 am", 1020 -> "5 pm", 510 -> "8:30 am" */
export function formatClock(minutes: number): string {
  const h24 = Math.floor(minutes / 60);
  const m = minutes % 60;
  const suffix = h24 >= 12 ? "pm" : "am";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return m === 0 ? `${h12} ${suffix}` : `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}

/** Finds the next opening after `day/minutes`, looking up to a week ahead. */
function nextOpening(
  hours: OpeningWindow[],
  day: Weekday,
  minutes: number,
): { day: Weekday; opens: number; daysAhead: number } | null {
  for (let offset = 0; offset <= 7; offset++) {
    const d = (((day - 1 + offset) % 7) + 1) as Weekday;
    const windows = hours
      .filter((w) => w.day === d)
      .map((w) => toMinutes(w.opens))
      .filter((opens) => offset > 0 || opens > minutes)
      .sort((a, b) => a - b);
    if (windows[0] !== undefined) return { day: d, opens: windows[0], daysAhead: offset };
  }
  return null;
}

export function getShopStatus(
  now: Date,
  hours: OpeningWindow[],
  timeZone: string,
): ShopStatus {
  const { day, minutes } = zonedParts(now, timeZone);

  const current = hours.find(
    (w) => w.day === day && minutes >= toMinutes(w.opens) && minutes < toMinutes(w.closes),
  );
  if (current) {
    return { isOpen: true, label: `Open now · closes ${formatClock(toMinutes(current.closes))}` };
  }

  const next = nextOpening(hours, day, minutes);
  if (!next) return { isOpen: false, label: "Closed" };

  const when =
    next.daysAhead === 0
      ? formatClock(next.opens)
      : next.daysAhead === 1
        ? `tomorrow ${formatClock(next.opens)}`
        : `${WEEKDAY_SHORT[next.day]} ${formatClock(next.opens)}`;
  return { isOpen: false, label: `Closed · opens ${when}` };
}
