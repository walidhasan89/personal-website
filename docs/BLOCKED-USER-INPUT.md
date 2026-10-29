# BLOCKED / USER INPUT REQUIRED

Last updated: 2026-08-26

This file lists everything found during implementation that requires information, a decision, credentials, or access only you have. Per your no-fabrication rule, none of these have been guessed at or invented — the code either leaves them untouched, or is fixed at a purely technical level while the underlying factual/business question stays open here. Nothing below blocks the rest of the implementation; independent work continues in parallel.

Items 1, 3, and 4 below (and the "GA4 Certified" part of item 2) were resolved on 2026-08-26 — see `CHANGELOG.md`. Items 1 and 3 were resolved using the "if unverifiable, remove" default this file already recommended; if the testimonials were in fact real and you have permission to publish them, they can be restored (git history has the original text) along with something that lets me verify them — a name-verifiable source, photo, or LinkedIn link strengthens them anyway.

## High priority — trust/legal risk

### 1. Quantified performance stats throughout the site
`src/views/Services.tsx`, `src/views/Home.tsx`, and `src/views/Tools.tsx` still contain many specific numbers presented as facts: "96% Client Retention," "200% Avg Traffic Growth," "45% Avg Conversion Lift," "92% Map Pack Ranking Rate," "40+ Leads/Month Avg," "3x ROI Improvement," "65% Cost Reduction," "98% Client Satisfaction," "100+ Tests Run," and similar. (The one item in this group with a clear, narrow fix — "GA4 Certified Setup" implying a formal certification — has been reworded to "GA4 Setup"; see CHANGELOG.md.) These remaining ones are untouched.

Note that several of these numbers also drive the width of visible progress bars (e.g. `bar:{label:'Client Retention',value:96}` in `Services.tsx`), so softening them into ranges like "60–90%" isn't a text-only edit — it needs the bar/metric-card UI reworked too, not just new copy.

**I need from you:** For each, either confirm it's a real, measured figure (and roughly how it was measured, so it can be phrased defensibly), or say which ones to soften/remove. Doing this without your input risks either keeping unverifiable claims live or fabricating new "safer-sounding" ones in their place — both of which this project's own no-fabrication rule rules out as something to guess at.
**Recommendation (unchanged):** Keep directionally true claims phrased as ranges or "typical" outcomes rather than precise percentages that can't be sourced.

## Medium priority — factual accuracy / consistency

### 2. RocketReach third-party data (carried over from the audit phase)
RocketReach lists education (BSc EEE, Southeast University, 2017–2021; Dhaka Polytechnic, 2013–2017) and an Inoviqa tenure of "2020–2023" that don't match your own site's timeline (Inoviqa founded 2023, ongoing). See `docs/ENTITY-MAP.md` §7.
**I need from you:** Which facts are accurate? This determines whether we add education to your About page/schema, and whether to pursue a correction with RocketReach.

### 3. Brand logo asset — placeholder generated, still needs your real artwork (RESOLVED, temporarily)
`public/assets/walidhasan-logo.png` did not exist anywhere in this codebase, so every reference to it (navbar, footer, About/Home portrait frames, favicon, apple-touch-icon) was broken. This session generated a functional placeholder — a square "WH" monogram in the site's own brand colors — via `scripts/generate-placeholder-logo.py`, and it now renders correctly in the build (verified: favicon/apple-touch-icon tags resolve, all `<img>` references resolve, no 404s). This is a design placeholder only; no factual/biographical content was invented.
**I need from you:** Replace `public/assets/walidhasan-logo.png` with your real logo or headshot artwork whenever you have it (same filename, ideally square, 512×512 or larger works for both favicon and in-page use). Until then the site is fully functional and visually consistent, just with a placeholder mark instead of your actual brand asset.

### 4. `/seo-report-generator/` tool status
`public/.htaccess` explicitly preserves this path as "an existing real file/folder" separate from the Next.js app, implying a working tool already lives there on your Hostinger server (outside this codebase). I fixed a bug where the footer linked to it using Next's client-side router (which would have 404'd inside the app even though the real file exists) — it's now a plain external link, consistent with how `src/views/Tools.tsx` already treated it.
**I need from you:** Confirm this tool is still live and working at that path on your server. If you'd like it migrated into this Next.js codebase for consistent branding/design, that's a real feature-build task I can take on once you share what it should do (I don't have its original source).

### 5. Contact form now sends via PHP `mail()` — needs live testing
The contact form previously did nothing (`onSubmit` just showed a fake "sent" state — no data ever left the browser). I've wired it to POST to a new `public/contact-handler.php`, which uses PHP's built-in `mail()` to send to `hello@walidhasan.com` (now the single contact address used sitewide, including on the legal pages — see CHANGELOG.md 2026-08-26). This only works once deployed to a PHP-capable host (Hostinger shared hosting supports this by default).
**I need from you:** After deployment, send a real test submission and confirm the email arrives (check spam too — `mail()` deliverability varies by host and is generally weaker than a transactional email API like Resend/Postmark). If it's unreliable, tell me and I'll switch it to an API-based provider (needs an account/API key from you).

## Off-site / not fixable from inside this codebase

### 6. Duplicate LinkedIn profiles (carried over from audit; URL updated 2026-08-26)
As of 2026-08-08 both `linkedin.com/in/walidhasan-riyad/` and `linkedin.com/in/walidhasan-r/` surfaced for your name, diluting/confusing your entity. On 2026-08-26 you provided a third URL, `linkedin.com/in/iamwalidhasan`, which is now the one linked sitewide (schema `sameAs`, Navbar, Footer, Contact — see CHANGELOG.md). I have not verified whether the other two profiles still exist or still resolve to you; if either of the older URLs is still live and publicly associated with your name, it's still worth resolving directly on LinkedIn (merging, redirecting, or taking it down) so search engines and AI systems converge on the one current profile.

### 7. Missing brand image (see item 3) also needed for any off-site profile consistency work.

---
*New items get added above as they're found; resolved items get moved to CHANGELOG.md with the outcome, not deleted from history.*
