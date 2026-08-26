# BRAND-MASTER.md — Walid Hasan Personal Brand Master File

Last updated: 2026-08-08 (implementation session 1)
Status: Implementation underway on the codebase (`D:\Projects\WalidHasan\walidhasan`). The canonical bio and positioning below have NOT yet been applied to on-site copy (Home/About/Services text is unchanged) — that work (old "Phase 2") is intentionally paused until the open questions in `BLOCKED-USER-INPUT.md` are answered, since the existing copy contains unverified stats/testimonials that overlap with where this positioning would need to go. What HAS shipped: this file's factual claims (name, jobTitle, worksFor Inoviqa, sameAs profile list) are now encoded as schema.org `Person`/`Organization` JSON-LD sitewide (`src/lib/schema.ts`), so the entity signals described here are already machine-readable even though the visible page copy hasn't been rewritten yet. The disambiguation decision in §6 and the handle-consolidation question in §5 are both still open — see `BLOCKED-USER-INPUT.md`.

## 1. Identity Snapshot

| Field | Value | Source | Confidence |
|---|---|---|---|
| Public name | Walid Hasan | Site, all socials | High |
| Full/legal name variant | Md Walid Hasan / Md. Walid Hasan | Pinterest handle "iamwalidhasan" labeled "Md Walid Hasan" | Medium — needs owner confirmation |
| Handle used across platforms | walidhasan / iamwalidhasan / walidhasan_r / walidhasan-r / walidhasan-riyad | Site + socials | High |
| Location | Dhaka, Bangladesh | Site, Behance, Fiverr | High |
| Primary site | https://walidhasan.com | — | High |
| Agency | Inoviqa LLC — https://inoviqa.com | Site, Behance | High |
| Current one-line positioning (site) | "Digital Growth Consultant — Web Design, SEO & Growth Systems" | walidhasan.com meta title | High |
| Years active | Since 2017 (self-taught web dev) | About page timeline | High |

## 2. The Core Problem This Project Exists to Solve

"Walid Hasan" / "Walid Hassan" is a common transliterated Arabic/Bengali name. A plain search for "Walid Hasan" today returns, in order: a Wikipedia actor/politician (Walid Mostafa), an IMDb actor, an Instagram account for a different "walidhasans," the Behance profile (position 4), a Wikipedia comedian, a Google Scholar academic, a LinkedIn directory of 200+ people named Walid Hasan, an unrelated Fiverr profile, and a Facebook "people named Walid Hasan" directory. **walidhasan.com itself does not appear on page 1 for the bare name query.** There is also a same-name, same-niche competitor (Walid Hasan, founder/CEO of Squareko, a Squarespace design agency) who competes directly for the same commercial intent ("Walid Hasan" + web design/SEO).

The brand project's job is to make one entity — this Walid Hasan, digital growth consultant and founder of Inoviqa — unambiguously dominant for his name plus his professional context, across Google, Bing, and AI answer engines, while clearly disambiguating from namesakes.

## 3. Canonical Bio (to be used verbatim/adapted everywhere for consistency)

**Short (bio-line, ~25 words):**
Walid Hasan is a Dhaka-based digital growth consultant and founder of Inoviqa, helping service businesses win more customers through strategic web design, SEO, and conversion systems.

**Medium (~60 words):**
Walid Hasan is a digital growth consultant and the founder of Inoviqa, a local-SEO agency serving home-service businesses. Since 2017 he has delivered 500+ web design, SEO, and analytics projects for clients in 30+ countries, and built multiple Chrome extensions (ReplyChief, Site Audit Pilot, RFQ AutoPilot, Shopify AdminPalette). He is based in Dhaka, Bangladesh.

**Long (~150 words, for About pages / press bios):**
Walid Hasan is a Dhaka, Bangladesh-based digital growth consultant, web designer, and SEO strategist who has spent the last several years turning websites into full growth systems rather than static brochures. He is the founder of Inoviqa, an agency specializing in local SEO for home-service niches such as septic systems, well drilling, basement waterproofing, and drainage. Independently, under his own name, he works directly with SaaS founders, e-commerce brands, and service businesses on web design, technical and local SEO, GA4/GTM analytics implementation, conversion rate optimization, and lead-generation systems — with 500+ projects delivered for 200+ clients across 30+ countries since 2017. He also builds Chrome extension products, including ReplyChief, Site Audit Pilot, RFQ AutoPilot, and Shopify AdminPalette. His work has been rated 4.9/5 across nearly 300 reviews on Fiverr and Upwork.

**Note:** No formal education is currently mentioned on walidhasan.com's About page, but a third-party data broker (RocketReach) lists a BSc in Electrical & Electronics Engineering from Southeast University (2017–2021) and secondary education at Dhaka Polytechnic Institute (2013–2017) tied to a "Walid Hasan" record. **This must be verified with you directly** before we use or dispute it anywhere — see SEO-AUDIT.md §7 and ENTITY-MAP.md §5 for the data-accuracy issue this raises.

## 4. Brand Pillars (proposed — confirm/adjust in approval step)

1. **Growth-systems web design** — sites built to generate leads, not just look good.
2. **Local & technical SEO execution** — measurable ranking and call/lead outcomes, especially local-service niches (via Inoviqa) and SaaS/e-commerce (via personal brand).
3. **Builder of tools, not just services** — Chrome extensions and free SEO tools as proof-of-expertise assets.
4. **Data-driven, partnership-based delivery** — GA4/GTM rigor, transparent reporting, long-term retainers over one-off gigs.

## 5. Positioning Inconsistencies Found (to resolve during strategy phase)

- **Personal brand vs. agency brand overlap.** walidhasan.com and inoviqa.com currently target overlapping-but-different things: the personal site pitches broad "digital growth consultant" services (web design, SEO, CRO, analytics for SaaS/e-commerce/service businesses globally); Inoviqa pitches a narrow local-SEO-for-home-services niche. Right now they share a Behance and Dribbble account and cross-link, but the relationship ("Walid Hasan personally does X; Inoviqa the agency does Y") is not clearly stated anywhere. This is a strategic decision needed from you — see the open question in IMPLEMENTATION-ROADMAP.md.
- **Two LinkedIn profiles.** `linkedin.com/in/walidhasan-riyad/` and `linkedin.com/in/walidhasan-r/` both surface in search tied to "Walid Hasan" + Fiverr/Inoviqa. Having two profiles for one person splits authority, confuses Google, and risks a platform ToS issue (duplicate personal profiles). One must become canonical and the other retired or turned into a company/creator page.
- **Handle inconsistency.** Instagram/Facebook use "iamwalidhasan," YouTube uses "walidhasan-r," X uses "walidhasan_r," LinkedIn uses "walidhasan-riyad," Behance uses "walid_hasan." No single consistent handle across platforms — this weakens pattern-matching for both Google's entity resolution and AI crawlers trying to confirm "same person, different platform."
- **"Riyad" identity thread.** "Riyad" appears in the LinkedIn URL and YouTube handle but nowhere in the on-site bio/name. If "Walid Hasan Riyad" is your full/preferred name, it should be stated explicitly and consistently; if not, it should be scrubbed from handles to avoid Google treating "Walid Hasan Riyad" as a third, separate entity.
- **RocketReach discrepancy.** RocketReach shows Inoviqa founding dates (2020–2023, "left") that conflict with your own site/Behance (founded 2023, current). Third-party aggregator data like this actively muddies your entity graph and needs a correction/claim request.

## 6. Naming & Disambiguation Decision Needed

Multiple other real people share "Walid Hasan" / "Walid Hassan," most importantly a **direct-niche competitor**: Walid Hasan, Founder/CEO of Squareko (Squarespace design/SEO agency, 12 years' experience, 8,500+ clients). Full detail in COMPETITOR-RESEARCH.md and ENTITY-MAP.md §5. Recommend deciding now whether to:

- (a) Compete head-on for "Walid Hasan" as-is and out-signal every namesake through volume, structured data, and authority, or
- (b) Adopt a distinguishing tagline/qualifier consistently (e.g., "Walid Hasan — Inoviqa" or "Walid Hasan, Dhaka") to speed up disambiguation in search and AI answers.

This decision affects title-tag conventions, schema `alternateName`, and social bio wording sitewide — flagged for your input before implementation.
