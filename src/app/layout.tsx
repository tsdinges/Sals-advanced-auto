import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

// Self-hosted fonts (no request to Google at runtime).
import "@fontsource/big-shoulders-display/700";
import "@fontsource/big-shoulders-display/900";
import "@fontsource/public-sans/400";
import "@fontsource/public-sans/600";
import "@fontsource/public-sans/700";
import "@fontsource/ibm-plex-mono/400";
import "@fontsource/ibm-plex-mono/500";
import "@/styles/globals.css";

import { site, navItems } from "@/config/site";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { formatAddressLine } from "@/lib/format";
import { buildLocalBusinessJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Auto Repair in Wolfeboro, NH | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `Auto Repair in Wolfeboro, NH | ${site.name}`,
    description: site.description,
    url: site.url,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#132029",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const jsonLd = buildLocalBusinessJsonLd(site);

  return (
    <html lang="en">
      <body>
        <SiteHeader
          name={site.name}
          locality={`${site.address.city} · ${site.address.region}`}
          phone={site.phone}
          navItems={navItems}
        />
        <main id="top">{children}</main>
        <SiteFooter
          name={site.name}
          addressLine={formatAddressLine(site.address)}
          serviceArea={site.serviceArea}
        />
        <MobileActionBar phoneE164={site.phone.e164} bookHref="/#contact" />
        <script
          type="application/ld+json"
          // JSON-LD must be injected as raw JSON; data is our own static config.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
