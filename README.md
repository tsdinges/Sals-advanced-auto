# Sal's Advanced Auto — website

Next.js 15 (App Router) + TypeScript. Replaces the Wix site at salsadvancedauto.com.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run check      # typecheck + lint + unit tests
npm run build      # production build
```

## Where things live

```
src/
  app/                 Routes and page composition only (no business logic)
    layout.tsx         Shell: header, footer, mobile bar, SEO, JSON-LD
    page.tsx           Home page: assembles section components
  components/
    ui/                Generic, reusable building blocks (Button, Container)
    layout/            Site chrome (SiteHeader, SiteFooter, MobileActionBar)
    shop/              Shop-specific widgets (ShopStatusBadge)
    sections/          Home-page sections (Hero, Services, ...)
    services/          Services grid and maintenance schedule
    vehicles/          Car cards, photos, specs for /vehicles pages
  config/site.ts       Business details: name, phone, hours, address, nav
  content/             Editable content: services, vehicles for sale
  hooks/               Client-side React hooks (useShopStatus)
  lib/                 Pure logic and helpers, unit-tested (hours, format, SEO)
  styles/              Design tokens and global base styles
  types/               Shared TypeScript domain types
```

**Rules of thumb**

- Components get data through props. Only `app/` imports from `config/` and `content/`.
- Logic that doesn't need React goes in `lib/` with a `*.test.ts` next to it.
- Colors, fonts and spacing come from `styles/tokens.css`. No hard-coded hex in components.

## Common edits

| Change | File |
| --- | --- |
| Hours, phone, email, address | `src/config/site.ts` |
| Add/remove a service | `src/content/services.ts` |
| Car for sale | One `.json` file per car in `src/content/vehicles/` (see the README there) |
| Brand colors / fonts | `src/styles/tokens.css` |

## Migration notes

- Old Wix URLs `/services`, `/about-us` and `/contact-us` redirect to home-page sections (`next.config.ts`). `/vehicles` keeps its address as a real page.
- Still needed from the owner: logo file, shop/team photos, car photos, confirmation the Mercedes is still for sale.
