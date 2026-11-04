"use client";

import { useEffect, useState } from "react";
import { getShopStatus, type ShopStatus } from "@/lib/hours";
import type { OpeningWindow } from "@/types/business";

const REFRESH_MS = 60_000;

/**
 * Live open/closed status, refreshed every minute.
 * Returns null on the server and first client render, so the
 * server HTML never disagrees with the visitor's clock (no hydration mismatch).
 */
export function useShopStatus(hours: OpeningWindow[], timeZone: string): ShopStatus | null {
  const [status, setStatus] = useState<ShopStatus | null>(null);

  useEffect(() => {
    const update = () => setStatus(getShopStatus(new Date(), hours, timeZone));
    update();
    const id = window.setInterval(update, REFRESH_MS);
    return () => window.clearInterval(id);
  }, [hours, timeZone]);

  return status;
}
