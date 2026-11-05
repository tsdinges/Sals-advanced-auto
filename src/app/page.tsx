import { site } from "@/config/site";
import { services, maintenanceIntervals } from "@/content/services";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ShopTicket } from "@/components/shop/ShopTicket";

/**
 * Home page = composition only. Data comes from config/ and content/,
 * presentation from components/. Remaining sections (About, For Sale,
 * Contact) are added in later commits.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection
        eyebrow={`Auto repair · ${site.address.city}, ${site.address.region} · ${site.yearsInBusiness} years`}
        headline={site.tagline}
        lede="Squeaky brakes, a leaky radiator, a check-engine light that won't quit. Bring it to Sal's and we'll get you back on the road."
        promises={["Experienced mechanics", "Quality service", "Fair prices"]}
        primaryCta={{ label: "Book a service", href: "/#contact" }}
        secondaryCta={{ label: "See what we fix", href: "/#services" }}
        aside={<ShopTicket info={site} extraRows={[{ label: "Makes", value: "Foreign & domestic" }]} />}
      />
      <ServicesSection services={services} intervals={maintenanceIntervals} />
    </>
  );
}
