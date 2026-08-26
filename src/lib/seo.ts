import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/schema'

/**
 * Builds complete, page-specific metadata.
 *
 * Why this exists: previously each page set only `title` / `description` /
 * `canonical`. In the Next.js App Router, `openGraph` and `twitter` objects
 * are inherited wholesale from the parent layout when a page does not define
 * its own — they do NOT automatically pick up the page's own title and
 * description. The result was that every subpage shipped the HOMEPAGE's
 * og:title, og:description and (worst of all) og:url, so sharing
 * /about or /services on LinkedIn, X, Facebook or Slack showed the homepage
 * title and linked back to the homepage.
 *
 * Centralising this also guarantees a consistent og:image, which was missing
 * entirely even though the site declared `twitter:card = summary_large_image`
 * (a large-image card with no image renders as a bare text link).
 */

export const OG_IMAGE = {
  url: '/assets/og-default.png',
  width: 1200,
  height: 630,
  alt: 'Walid Hasan — Digital Growth Consultant, founder of Inoviqa LLC',
}

type PageMetaInput = {
  /** Page title WITHOUT the "| Walid Hasan" suffix (the layout template adds it). */
  title: string
  description: string
  /** Site-root-relative path, e.g. '/about'. Use '/' for the homepage. */
  path: string
  /** Defaults to 'website'; use 'profile' for the personal entity page. */
  ogType?: 'website' | 'profile' | 'article'
  /**
   * Full title used for social cards. Next's title.template only applies to
   * the <title> tag, not og:title, so social titles are set explicitly here.
   */
  socialTitle?: string
}

export function pageMetadata({
  title,
  description,
  path,
  ogType = 'website',
  socialTitle,
}: PageMetaInput): Metadata {
  const url = path === '/' ? SITE_URL : `${SITE_URL}${path}`
  const ogTitle = socialTitle ?? `${title} | Walid Hasan`

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: ogType,
      url,
      siteName: 'Walid Hasan',
      title: ogTitle,
      description,
      images: [OG_IMAGE],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      images: [OG_IMAGE.url],
    },
  }
}
