# SEO-AUDIT.md — walidhasan.com Technical, On-Page & Entity SEO Audit

Last updated: 2026-08-08
Method note: Audited via rendered-content fetches (site JS-rendered content, not raw source) plus robots.txt. Raw HTML source (for a full JSON-LD/schema line-by-line check, header response audit, and Core Web Vitals lab data) could not be retrieved by this session's tools — flagged wherever that limits confidence, with a recommended manual/PageSpeed Insights follow-up.

## 1. Indexability & Crawl Basics

- **robots.txt:** `User-Agent: * / Allow: /` plus a Sitemap directive — fully permissive, no blocking issues found. Good.
- **Sitemap:** Present at /sitemap.xml but returned as binary/gzip to this session's fetcher, so contents couldn't be listed directly. Recommend verifying in Google Search Console that it's a valid, non-corrupted XML sitemap and that all key pages (/, /about, /services, /case-studies, /tools, /contact, /book-a-call, /seo-report-generator, each /portfolio/* page) are included.
- **HTTPS:** Site serves over HTTPS. Good.
- **Known indexed pages (from search results):** /, /about, /contact, /book-a-call, /portfolio/cleaning-website-design, /seo-report-generator, /services, /case-studies, /tools, /privacy-policy, /terms-of-use.
- **Search visibility for site's own name query:** A `site:walidhasan.com`-style query did not reliably return only walidhasan.com pages in this tool's results (returned unrelated Wikipedia entries), which itself may indicate weak site-specific authority/indexing depth relative to competing content, or a tooling limitation — **recommend the user personally run `site:walidhasan.com` in Google directly** to get a true page count and confirm indexing is healthy.

## 2. On-Page / Metadata

- **Homepage title:** "Walid Hasan — Digital Growth Consultant \| Web Design, SEO & Growth Systems." Reasonable length, keyword-relevant, but does not include location ("Dhaka" / "Bangladesh") or the agency name ("Inoviqa"), both of which would help disambiguation and local relevance.
- **Meta description:** Present, mentions 500+ projects / 30+ countries. Good use of trust signals.
- **OG/Twitter card tags:** Present (og:type=website, twitter:card=summary_large_image). Good for social share previews — should verify an actual OG image is set and is a real photo of Walid Hasan (a real headshot materially helps entity/knowledge-panel eligibility later).
- **H1:** "I Build Growth Systems That Generate Leads, Authority & Revenue" — strong conversion copy, but it is not name-anchored. For entity SEO, a page's H1 not containing the entity's name is a missed reinforcement opportunity, especially on /about.
- **About page:** No formal education, no explicit disambiguating detail (e.g., full name, "not to be confused with," professional headshot/date-of-birth-free bio facts) found in the extracted content. Career timeline (2017–2025) is present and useful — this is good raw material for schema and for a Wikipedia-style "Career" section, but it currently lives only as marketing copy, not as structured, quotable fact-statements.

## 3. Structured Data / Schema.org

- **No JSON-LD Person, Organization, ProfessionalService, or WebSite schema was detected** in the fetched homepage/about content. (Caveat: this session's fetch tool renders to Markdown and strips `<script>` tags, so this is a strong signal but not 100% conclusive — confirm with Google's Rich Results Test or Schema Markup Validator before treating as final.)
- This is the single highest-leverage technical fix available: a `Person` schema block (name, alternateName, jobTitle, url, sameAs[] linking every verified social/profile URL, worksFor → Organization/Inoviqa, image) is exactly the machine-readable signal Google's Knowledge Graph and AI crawlers use to disambiguate one "Walid Hasan" from another. Currently absent = currently invisible to that layer.
- No `BreadcrumbList`, `FAQPage` (despite an FAQ section existing on /services — a real missed win, FAQ schema is high-CTR and easy), or `Review`/`AggregateRating` schema detected despite testimonials existing on-site.
- Inoviqa.com not checked for schema in this pass — recommended as a fast follow-up given it's the paired entity.

## 4. Internal Linking & Site Architecture

- Clear, shallow nav: Home / Services / Case Studies / About / Tools / Contact / Book — good for both users and crawlers (everything ≤2 clicks from home).
- /case-studies lists 42 projects but individual case-study detail pages were only confirmed for at least one URL pattern (`/portfolio/cleaning-website-design`) — unclear if all 42 have dedicated indexable detail pages or if most are just list entries. If most projects lack their own URL, that's 40+ missed pages of unique, indexable, name-anchored content ("Walid Hasan's SEO work for [Client]") — a major content/SEO opportunity, not just a listing convenience.
- Cross-linking between walidhasan.com and inoviqa.com exists (Inoviqa credits "Founded by Walid Hasan" with a link; walidhasan.com references Inoviqa as a case study/portfolio entry) — the reciprocal link is present but not reinforced with consistent anchor text or schema `sameAs`/`founder` markup.
- No blog / articles section was found on walidhasan.com. All content is commercial/service-page content. There is no long-form, evergreen, name-anchored expertise content (guides, opinion pieces, data studies) that typically earns backlinks, topical authority, and AI-answer citations.

## 5. E-E-A-T Signals (Experience, Expertise, Authoritativeness, Trust)

**Present:**
- Concrete numbers (500+ projects, 200+ clients, 30+ countries, 4.9★/292 reviews on Fiverr).
- Named, detailed case studies (42 client projects across recognizable industries).
- Direct, verifiable contact info (email, WhatsApp, booking link).
- Cross-platform profiles (LinkedIn, Behance, Instagram, X, YouTube, Facebook, Fiverr) that at least gesture at a real, consistent person.
- Legal/trust pages present (privacy policy, terms of use).

**Missing (the real gap):**
- Zero third-party validation: no press mentions, no guest-published articles on external authority sites, no podcast/video interviews, no "featured in" logos, no awards/certifications displayed (e.g., Google Analytics/Ads certifications, HubSpot, Meta Blueprint — even if held, none surfaced).
- No author byline presence anywhere off-site (no Medium, no LinkedIn articles/newsletter, no guest posts on SEO/marketing publications).
- No client-side proof beyond text testimonials — no video testimonials, no LinkedIn recommendations surfaced, no case-study pages with client logos/link-outs to the live client sites (which would double as backlink-attraction and credibility proof simultaneously).
- No visible professional photo confirmed in this pass (OG image content not independently verified) — a real, consistent headshot across all platforms is a basic but important trust and entity-recognition signal.

## 6. Off-Site Authority / Backlink Profile

No third-party backlinks to walidhasan.com were found via search in this pass beyond his own owned profiles (Behance, Fiverr, LinkedIn, Pinterest) and one agency cross-link (Inoviqa). This session's tools cannot pull a full backlink index (that requires Ahrefs/Semrush/Moz-type data) — **recommend running walidhasan.com and inoviqa.com through Ahrefs Site Explorer, Google Search Console → Links report, or Semrush Backlink Analytics** to get the authoritative picture; treat this audit's finding as "no easily discoverable third-party links," not "zero links exist."

## 7. Data Accuracy / Entity Contamination Risk

RocketReach aggregates a "Walid Hasan" record with details (education, Inoviqa tenure "2020–2023," "TK Publishing LLC") not published anywhere on your own properties — see ENTITY-MAP.md §7. Uncontrolled third-party aggregators like this are a known source of Knowledge Graph confusion; Google and AI models sometimes pull from them when your own site lacks explicit structured facts. Priority: publish your own authoritative structured facts (schema + About page) so search engines prefer your source over aggregator guesses, and separately claim/correct the RocketReach listing once the facts are confirmed with you.

## 8. Local SEO (Personal + Inoviqa)

- Inoviqa targets home-service niches with location-based content — not audited in depth this pass (out of primary scope: personal brand), but flagged: if Walid Hasan personally wants local Dhaka/Bangladesh visibility as a consultant, a personal Google Business Profile (as a professional service) plus NAP-consistent citations would help both the personal and agency entity simultaneously, since Google increasingly links founder-to-company local relevance.

## 9. Summary Priority List (technical/on-page only — full roadmap in IMPLEMENTATION-ROADMAP.md)

1. Add `Person` + `Organization` + `FAQPage` JSON-LD schema sitewide, with a complete `sameAs[]` array.
2. Verify/fix sitemap.xml validity and submit in Search Console; confirm real index coverage via `site:walidhasan.com`.
3. Give each of the 42 case studies its own indexable URL with unique content (not just list entries).
4. Add a blog/insights section for evergreen, name-anchored expertise content.
5. Consolidate the two LinkedIn profiles into one canonical URL.
6. Add explicit disambiguation content ("Walid Hasan, based in Dhaka, founder of Inoviqa — not to be confused with...") is not recommended as visible page copy (looks defensive) but should live in schema `alternateName`/structured facts and be reflected in title-tag specificity.
7. Confirm/verify RocketReach and other aggregator data with the user; correct or claim listings.
8. Get PageSpeed Insights / Core Web Vitals lab+field data pulled directly (not available to this audit) before implementation.
