# Samflex Automobiles — Next.js E‑commerce

React + TypeScript + Next.js App Router storefront with cart, demo checkout, SEO, and the original Samflex typography (Manrope + DM Sans).

## Quick start

```bash
cd samflex-next
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Features

- **Home** — hero carousel, search, featured cars, categories, why us, process
- **Inventory** — filters, sort, URL query params, vehicle cards
- **Vehicle detail** — gallery, specs, features, Add to cart, enquire
- **Cart** — persistent (localStorage), remove items
- **Checkout** — customer details, fulfilment preference, **demo payment**:
  - Pay on inspection
  - Bank transfer (demo)
  - Card (demo — always succeeds)
- **About / Contact / FAQ**
- **SEO** — metadata, JSON-LD (AutoDealer + Car), sitemap.xml, robots.txt
- **Performance** — static data layer, CSS design system, image remotePatterns (AVIF/WebP ready)

## Design system

Same fonts and tokens as the original HTML prototype:

- **Display:** Manrope
- **Body:** DM Sans
- **Colors:** `--ink #111b28`, `--blue #2d6cdf`, `--paper #f7f7f5`

## Data

- 24 demo vehicles in `lib/vehicles-data.ts`
- Site copy in `lib/site-content.ts`
- Orders saved to **browser localStorage** in demo mode (no database required to run)

## Database (optional / production)

`prisma/schema.prisma` is ready for PostgreSQL (vehicles, images, enquiries, orders, users, settings).

```bash
# when you have a DATABASE_URL
npm install prisma @prisma/client
npx prisma db push
```

## SEO notes

1. Replace `https://samflexautomobiles.com` in `lib/seo.ts`, `app/sitemap.ts`, and `app/robots.ts` with your real domain.
2. Add real phone, WhatsApp, email in `lib/site-content.ts`.
3. Replace Unsplash images with owned photography.
4. Submit sitemap in Google Search Console after deploy.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Run production build |

## Project structure

See `app/`, `components/`, `lib/`, `store/`, `types/`, `prisma/`.
