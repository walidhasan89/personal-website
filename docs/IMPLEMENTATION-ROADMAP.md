# IMPLEMENTATION-ROADMAP.md — Phased Plan

Last updated: 2026-08-08 (implementation session 1)
Status: **Implementation underway** — see `PERSONAL-BRAND-SEO-STATUS.md` for the live, detailed checkpoint (current phase, completed work, exact next task). This file stays as the high-level phase plan; the status file is now the operational source of truth. The numbered phases below are the older high-level plan from the audit phase — the full 16-phase breakdown the user later specified for implementation supersedes the phase numbering here; treat "Phase 1" below as covering both technical fixes and schema work.

## Progress summary (session 1)

Technical foundation (schema.org Person/Organization/WebSite/FAQPage/SoftwareApplication/BreadcrumbList, dead-code cleanup, broken-link fixes, contact form functionality) is implemented, build-verified, and committed to the project. None of the §0 decisions below have been answered yet by the user — they remain open in `BLOCKED-USER-INPUT.md` (which is now the actively-maintained version of this list; new items have been added there since this file was first written, e.g. testimonial/stat authenticity, an email inconsistency). Positioning/content work (old Phase 2 below, and the user's later Phase 2–7) is intentionally paused until those are answered, since most of the affected copy is exactly what's in question.

## 0. Decisions Needed From You Before Implementation Starts

1. **Personal brand vs. Inoviqa relationship** — should walidhasan.com narrow to "founder/consultant" positioning that funnels into Inoviqa for agency work, or continue operating as a broader independent consulting brand alongside Inoviqa? (BRAND-MASTER.md §5)
2. **Name/handle consolidation** — confirm canonical full name (e.g., is "Walid Hasan Riyad" or "Md Walid Hasan" a real/preferred variant, or should those threads be dropped?), and pick one LinkedIn profile and one consistent handle pattern across platforms. (BRAND-MASTER.md §5, ENTITY-MAP.md §1)
3. **RocketReach/aggregator facts** — confirm or deny the education and employment history details currently floating in third-party data. (ENTITY-MAP.md §7)
4. **Disambiguation stance on Squareko's Walid Hasan** — compete on qualified terms only (recommended) vs. adopt a distinguishing tagline. (BRAND-MASTER.md §6)
5. **Content capacity** — realistic time/budget for ongoing case-study publishing and content cadence. (CONTENT-STRATEGY.md §5)

## Phase 1 — Foundation (Weeks 1–4)

- Confirm decisions in §0 above.
- Implement `Person`/`Organization`/`FAQPage` JSON-LD schema on walidhasan.com (and Organization schema on inoviqa.com).
- Consolidate LinkedIn to one profile; align handles across platforms where feasible.
- Verify sitemap.xml validity; confirm full index coverage in Search Console.
- Run PageSpeed Insights / Core Web Vitals check (not available to this audit) and fix any critical technical issues found.
- Establish AI-visibility T0 baseline (manual prompts across ChatGPT/Gemini/Perplexity/Copilot).

## Phase 2 — Content & Proof Expansion (Weeks 3–10, overlaps Phase 1)

- Give each of the 42 case studies a dedicated, indexable detail page.
- Launch a blog/insights section; publish first pillar pieces (see CONTENT-STRATEGY.md §3).
- Reach out to past clients for reciprocal footer/credit links (OFFSITE-BRANDING.md §2 — 30+ targets identified).
- Complete/verify all secondary profiles (GitHub, Upwork, Dribbble personal, Chrome Web Store developer page).

## Phase 3 — Off-Site Authority (Months 2–6)

- Identify and pitch 5–10 realistic guest-post/interview/podcast targets.
- Pursue inclusion in relevant "top SEO/web design experts" roundup content.
- Create and source a Wikidata item once enough independent citations exist to support it.
- Claim/correct third-party aggregator listings (RocketReach and similar).

## Phase 4 — Entity Consolidation & Monitoring (Ongoing from Month 3+)

- Recurring quarterly AI-visibility prompt testing, logged in CHANGELOG.md.
- Recurring Google Alerts / namesake monitoring.
- Recurring backlink profile checks (Search Console + a paid tool if available).
- Iterate KEYWORD-STRATEGY.md and CONTENT-STRATEGY.md based on what's actually moving.

## Success Metrics to Track Going Forward

- walidhasan.com appears in top 5 for all Tier 1 branded queries (KEYWORD-STRATEGY.md §1).
- Emergence of a Google Knowledge Panel.
- AI engines correctly and confidently identify Walid Hasan (Inoviqa) when asked, without conflating him with namesakes.
- Growth in referring domains / third-party backlinks (baseline currently near-zero third-party links found).
- Growth in indexed pages carrying his byline.

## Immediate Next Step

Review the 9 companion files (BRAND-MASTER, ENTITY-MAP, SEO-AUDIT, COMPETITOR-RESEARCH, KEYWORD-STRATEGY, CONTENT-STRATEGY, OFFSITE-BRANDING, AI-VISIBILITY, and this roadmap), answer the open questions in §0, and confirm you'd like to move into Phase 1 implementation.
