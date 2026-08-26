import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/schema'

/**
 * Sitemap.
 *
 * `lastModified` is intentionally a fixed, hand-maintained date per route
 * rather than `new Date()`. Using the build timestamp told search engines
 * that EVERY page changed on EVERY deploy, which is inaccurate and causes
 * crawlers to discount the lastmod signal entirely (Google's documentation
 * is explicit that lastmod must reflect the last *significant* content
 * change). Update the constant below — or a specific route's date — when
 * that page's content actually changes.
 */
const LAST_REVIEWED = '2026-08-08'

type Route = {
  path: string
  priority: number
  changeFrequency: 'weekly' | 'monthly' | 'yearly'
  lastModified?: string
}

// Priorities reflect this site's purpose as a personal entity hub:
// the homepage and the About (Person entity) page rank highest, followed by
// proof-of-work and offering pages, then conversion pages, then legal pages.
const ROUTES: Route[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/case-studies', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/tools', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/pricing', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/epoxy-flooring-marketing', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/book', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms-of-use', priority: 0.3, changeFrequency: 'yearly' },
]

// NOTE: /seo-report-generator/ was previously listed here but has been
// removed. It is not part of this Next.js application (it lives on the
// server outside the build, preserved by public/.htaccess) and its current
// status could not be verified. Listing an unverified URL in a sitemap
// risks reporting a soft 404 to Google. Re-add it here once its presence
// on the production server is confirmed — see docs/BLOCKED-USER-INPUT.md.

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: route.path === '/' ? SITE_URL : `${SITE_URL}${route.path}`,
    lastModified: route.lastModified ?? LAST_REVIEWED,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
