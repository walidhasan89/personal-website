# Next.js SEO Migration Notes

This project has been converted from a Vite + React SPA to a Next.js App Router project.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Production build

```bash
npm run build
npm run start
```

## SEO improvements added

- Real Next.js routes for `/`, `/services`, `/case-studies`, `/about`, `/tools`, `/contact`, and `/book`
- Page-level metadata using Next.js `metadata`
- Canonical URLs
- `sitemap.xml` via `app/sitemap.ts`
- `robots.txt` via `app/robots.ts`
- Removed React Router dependency from active pages/components
- Removed runtime-only `react-helmet-async`; metadata is now handled by Next.js

## Best deployment option

Deploy to Vercel for the easiest Next.js setup. If using cPanel/normal hosting, you need Node.js hosting for `next start`, or you need a static export setup.
