// Centralized structured-data (schema.org) building blocks.
//
// IMPORTANT: Every fact referenced here must already exist as visible content
// somewhere on walidhasan.com (name, role, organization, social profiles,
// product names/descriptions). Do not add claims here (ratings, awards,
// certifications, review counts) that are not independently verified and
// visibly published on the site. See BLOCKED-USER-INPUT.md before adding
// anything beyond what is listed below.

export const SITE_URL = 'https://walidhasan.com'

// Real, verified profile URLs actually linked from the site's own
// Navbar/Footer/Contact components (see src/components/Navbar.tsx,
// src/components/Footer.tsx). Only URLs that are already published on-site
// are included here — this keeps schema and visible content in sync.
export const SAME_AS: string[] = [
  'https://www.linkedin.com/in/walidhasan-riyad/',
  'https://www.facebook.com/iamwalidhasan',
  'https://www.instagram.com/iamwalidhasan/',
  'https://www.behance.net/walid_hasan',
  'https://www.youtube.com/@walidhasan-r',
  'https://x.com/walidhasan_r',
]

export const PERSON_ID = `${SITE_URL}/#person`
export const ORG_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`

// Areas of expertise. Every entry is covered by visible copy for the four
// services (website design, web development, software development, SEO).
export const KNOWS_ABOUT: string[] = [
  'Website design',
  'Web development',
  'WordPress development',
  'Software development',
  'Search engine optimization',
  'Technical SEO',
  'On-page SEO',
  'Local SEO',
  'Google Business Profile optimization',
]

export const SERVICES_OFFERED = [
  'Website Design',
  'Web Development',
  'Software Development',
  'SEO Services',
] as const

// Person entity — reused (by @id reference) across every page via layout.tsx.
export function personSchema() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Walid Hasan',
    url: SITE_URL,
    image: `${SITE_URL}/assets/og-default.jpg`,
    jobTitle: 'Web Designer, Developer & SEO Specialist',
    description:
      'Walid Hasan designs and builds websites, custom software, and SEO systems for businesses that need a clear online presence and measurable leads.',
    email: 'hello@walidhasan.com',
    telephone: '+8801774340932',
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

// The hire-me practice behind walidhasan.com. Inoviqa LLC is a project
// example on the work page, not the organization this site is selling.
export function organizationSchema() {
  return {
    '@type': 'ProfessionalService',
    '@id': ORG_ID,
    name: 'Walid Hasan',
    url: SITE_URL,
    image: `${SITE_URL}/assets/og-default.jpg`,
    description:
      'Website design, web development, custom software, and SEO services for businesses that need a clear online presence and measurable leads.',
    email: 'hello@walidhasan.com',
    telephone: '+8801774340932',
    founder: { '@id': PERSON_ID },
    knowsAbout: KNOWS_ABOUT,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services',
      itemListElement: SERVICES_OFFERED.map((name) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name,
          provider: { '@id': PERSON_ID },
        },
      })),
    },
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
