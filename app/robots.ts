import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/schema'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    // NOTE: the non-standard `host` directive was removed. It is a
    // Yandex-only signal that Google and Bing ignore; canonicalisation to
    // the non-www host is already handled correctly by the 301 rules in
    // public/.htaccess plus per-page rel=canonical tags.
  }
}
