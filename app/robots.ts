import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/schema'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Next.js static export writes an RSC payload sidecar (.txt) next to
      // each HTML page (about.txt, services.txt, ...). Nothing links to
      // them, but they are publicly served and would be low-value duplicate
      // text if a crawler discovered them.
      disallow: ['/_next/static/chunks/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    // NOTE: the non-standard `host` directive was removed. It is a
    // Yandex-only signal that Google and Bing ignore; canonicalisation to
    // the non-www host is already handled correctly by the 301 rules in
    // public/.htaccess plus per-page rel=canonical tags.
  }
}
