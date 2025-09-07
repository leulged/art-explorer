# Art Explorer – The Met Collection

Small demo app built with Next.js 15 (App Router), TypeScript, Tailwind and shadcn/ui.
It lists highlighted artworks from The Metropolitan Museum of Art API and provides a detail page
with optimized images and basic SEO.

Live link: (to be added after deploy)

## Tech stack

- Next.js 15 (App Router), TypeScript (strict)
- Tailwind v4 + shadcn/ui (Card, Skeleton)
- Vitest + React Testing Library (minimal smoke tests)

## Features

- Server-rendered list with ISR (revalidate hourly)
- Detail page with SSG (`generateStaticParams`) and dynamic `generateMetadata`
- Optimized images via `next/image`
- Loading/Error states and defensive fallbacks (Unknown Artist, etc.)
- SEO: Open Graph/Twitter, canonical URLs, JSON‑LD (CreativeWork/ItemList), robots + sitemap
- Accessibility: semantic headings, focus rings, skip link, reduced-motion friendly skeletons

## Getting started

1. Install deps

```bash
npm install
```

2. Create `.env.local`

```bash
MET_BASE_URL=https://collectionapi.metmuseum.org/public/collection/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

3. Dev server

```bash
npm run dev
```

4. Tests

```bash
npm run test
```

## Project structure

- `src/app` – routes (home, artwork/[id], loading/error/not-found)
- `src/components` – UI pieces (cards, grid, skeletons, header/footer)
- `src/lib/metApi.ts` – Met API client
- `src/types/artwork.ts` – API types + card mapping

## SEO notes

- List page: `export const metadata`, ItemList JSON‑LD
- Detail page: `generateMetadata`, CreativeWork JSON‑LD, OG/Twitter image when available
- `robots.ts` and `sitemap.ts` are included; set `NEXT_PUBLIC_SITE_URL` in env for correct canonical/OG

## Decisions & limitations

- We seed search by well-known terms and prefer highlight/public-domain items for quality images
- Images come directly from The Met; availability varies by object

## Next improvements

- Search and filters (department, culture, date range)
- Pagination/infinite scroll on the homepage
- Favorites (local storage) and shareable links
- More robust error boundaries and prefetching
- Broader JSON‑LD coverage and a sitemap for categories

## Deployment

Deploy on Vercel:

1. Push to GitHub
2. Create new Vercel project and import the repo
3. Add env vars: `MET_BASE_URL`, `NEXT_PUBLIC_SITE_URL` (your production URL)
4. Deploy – Vercel will handle build and previews
