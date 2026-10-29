// Centralized structured-data (schema.org) building blocks.
//
// IMPORTANT: Every fact referenced here must already exist as visible content
// somewhere on walidhasan.com (name, role, organization, social profiles,
// product names/descriptions). Do not add claims here (ratings, awards,
// certifications, review counts) that are not independently verified and
// visibly published on the site. See BLOCKED-USER-INPUT.md before adding
// anything beyond what is listed below.

import { SOCIAL_LINKS } from './social'

export const SITE_URL = 'https://walidhasan.com'

// Real, verified profile URLs actually linked from the site's own
// Navbar/Footer/Contact components. Derived from src/lib/social.ts (the
// single source of truth those components also render from) so schema and
// visible content can never drift out of sync.
export const SAME_AS: string[] = SOCIAL_LINKS.map((s) => s.href)

export const PERSON_ID = `${SITE_URL}/#person`
export const ORG_ID = 'https://inoviqa.com/#organization'
export const WEBSITE_ID = `${SITE_URL}/#website`

// Areas of expertise. Every entry below corresponds to a service or product
// that is described in visible page content (see src/views/Services.tsx and
// src/views/Tools.tsx) — this is a summary of published content, not a new
// claim. `knowsAbout` is one of the strongest signals available for telling
// search engines and LLMs what topical domain a Person entity belongs to,
// which is what separates this Walid Hasan from unrelated namesakes.
export const KNOWS_ABOUT: string[] = [
  'Search engine optimization',
  'Local SEO',
  'Google Business Profile optimization',
  'Technical SEO',
  'Web design',
  'WordPress development',
  'Web analytics',
  'Google Analytics 4',
  'Google Tag Manager',
  'Conversion rate optimization',
  'Lead generation',
  'Chrome extension development',
]

// Person entity — reused (by @id reference) across every page via layout.tsx.
export function personSchema() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Walid Hasan',
    url: SITE_URL,
    image: `${SITE_URL}/assets/og-default.png`,
    jobTitle: 'Digital Growth Consultant',
    description:
      'Walid Hasan is a digital growth consultant and founder of Inoviqa LLC, specializing in web design, SEO strategy, web analytics, and conversion rate optimization.',
    worksFor: { '@id': ORG_ID },
    knowsAbout: KNOWS_ABOUT,
    sameAs: SAME_AS,
  }
}

// ProfilePage — schema.org's designated type for "a page about one person".
// Anchoring /about as the ProfilePage whose mainEntity is the shared Person
// @id designates that URL as the authoritative description of this entity.
export function profilePageSchema(path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${SITE_URL}${path}#profilepage`,
    url: `${SITE_URL}${path}`,
    name: 'About Walid Hasan',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': PERSON_ID },
    mainEntity: { '@id': PERSON_ID },
  }
}

// Organization entity for Inoviqa LLC, the agency Walid Hasan founded.
// This is intentionally minimal — only facts published on walidhasan.com
// and inoviqa.com (name, url, founder relationship) are included.
export function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'Inoviqa LLC',
    url: 'https://inoviqa.com/',
    founder: { '@id': PERSON_ID },
  }
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: 'Walid Hasan',
    publisher: { '@id': PERSON_ID },
    inLanguage: 'en',
  }
}

// Root graph injected once in app/layout.tsx so every page shares the same
// Person/Organization/WebSite nodes via @id (avoids duplicate/conflicting
// entities across pages, which is what Google's docs recommend for
// multi-page entity graphs).
export function rootGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [personSchema(), organizationSchema(), websiteSchema()],
  }
}

export type FaqEntry = { q: string; a: string }

// FAQPage schema — only call this with the exact same Q&A pairs that are
// visibly rendered on the page. Do not pass additional/different questions.
export function faqPageSchema(faqs: FaqEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  }
}

export type BreadcrumbEntry = { name: string; path: string }

// BreadcrumbList schema — must be paired with a visible breadcrumb trail
// on the page (see src/components/Breadcrumbs.tsx). Do not use standalone.
export function breadcrumbSchema(items: BreadcrumbEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.path === '' ? SITE_URL : `${SITE_URL}${item.path}`,
    })),
  }
}

export type SoftwareProductEntry = {
  name: string
  description: string
  url: string
  applicationCategory?: string
}

// SoftwareApplication schema for the Chrome extensions listed on /tools.
// No ratings/review counts are included because none are independently
// verified — see BLOCKED-USER-INPUT.md.
export function softwareApplicationSchema(p: SoftwareProductEntry) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: p.name,
    description: p.description,
    url: p.url,
    applicationCategory: p.applicationCategory || 'BrowserApplication',
    operatingSystem: 'Chrome',
    author: { '@id': PERSON_ID },
  }
}
