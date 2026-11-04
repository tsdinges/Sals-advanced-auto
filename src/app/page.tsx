import { site } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { ShopStatusBadge } from "@/components/shop/ShopStatusBadge";

/**
 * Home page. Section 1 ships the shell only; the hero, services,
 * about, for-sale and contact sections are built next, one per commit,
 * as components under src/components/sections.
 */
export default function HomePage() {
  return (
    <Container>
      <section style={{ paddingBlock: 64, display: "grid", gap: 16 }}>
        <h1 style={{ fontSize: "clamp(48px, 9vw, 96px)" }}>{site.tagline}</h1>
        <ShopStatusBadge hours={site.hours} timeZone={site.timeZone} fallback={site.hoursSummary} />
      </section>
    </Container>
  );
}
