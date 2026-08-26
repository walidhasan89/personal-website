// Canonical list of social profile links, actually published across the
// site's Navbar, Footer, and Contact page. Single source of truth — also
// consumed by src/lib/schema.ts so the `sameAs` structured-data values can
// never drift out of sync with what's visibly linked on-site (see the note
// in schema.ts about why that matters).
export type SocialLink = {
  label: string
  short: string
  href: string
  /** Suffix used to build per-network CSS classes, e.g. `social-${key}`. */
  key: string
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'LinkedIn', short: 'in', href: 'https://www.linkedin.com/in/iamwalidhasan', key: 'linkedin' },
  { label: 'Facebook', short: 'fb', href: 'https://www.facebook.com/iamwalidhasan', key: 'facebook' },
  { label: 'Instagram', short: 'ig', href: 'https://www.instagram.com/iamwalidhasan/', key: 'instagram' },
  { label: 'Behance', short: 'be', href: 'https://www.behance.net/walid_hasan', key: 'behance' },
  { label: 'YouTube', short: 'yt', href: 'https://www.youtube.com/@walidhasan-r', key: 'youtube' },
  { label: 'X', short: 'x', href: 'https://x.com/walidhasan_r', key: 'x' },
]
