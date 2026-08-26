# BLOCKED / USER INPUT REQUIRED

Last updated: 2026-08-08

This file lists everything found during implementation that requires information, a decision, credentials, or access only you have. Per your no-fabrication rule, none of these have been guessed at or invented — the code either leaves them untouched, or is fixed at a purely technical level while the underlying factual/business question stays open here. Nothing below blocks the rest of the implementation; independent work continues in parallel.

## High priority — trust/legal risk

### 1. Testimonials on the homepage may not be real
`src/views/Home.tsx` (`TESTIMONIALS` array) contains six client quotes attributed to first-name + last-initial people with company/role and specific results ("leads tripled," "ranking #1," "40+ qualified inquiries a month"). I have no way to verify these are real, consented-to quotes from actual clients versus placeholder copy written during initial site build. I have **not** removed or altered them — deleting real testimonials would be as wrong as fabricating fake ones, and I can't tell which this is.
**I need from you:** Confirm whether these are real client quotes you have permission to publish. If yes, no action needed (though real testimonials are stronger evidence when tied to a name, photo, or LinkedIn link — optional upgrade). If no, tell me and I'll remove them; publishing fabricated testimonials is a genuine legal/FTC risk in most jurisdictions, not just an SEO issue.
**My recommendation:** If unverifiable, remove rather than replace with new invented ones.

### 2. Quantified performance stats throughout the site
`src/views/Services.tsx`, `src/views/Home.tsx`, and `src/views/Tools.tsx` contain many specific numbers presented as facts: "96% Client Retention," "200% Avg Traffic Growth," "45% Avg Conversion Lift," "92% Map Pack Ranking Rate," "40+ Leads/Month Avg," "3x ROI Improvement," "65% Cost Reduction," "98% Client Satisfaction," "100+ Tests Run," "GA4 Certified Setup" (this one implies a formal certification), and similar. I have not touched these.
**I need from you:** For each, either confirm it's a real, measured figure (and roughly how it was measured, so I can phrase it defensibly), or tell me to soften/remove it. "GA4 Certified Setup" in particular implies you hold a certification — please confirm whether you do; if not, this should be reworded (e.g., "GA4 Setup" without "Certified").
**My recommendation:** Keep directionally true claims phrased as ranges or "typical" outcomes rather than precise percentages you can't cite a source for; this is both more defensible and, per Google's guidance, more trustworthy than suspiciously precise unsourced numbers.

### 3. "World Domination 23%"
Appears three times in `src/views/Home.tsx` (a trust chip, a results stat, and a floating card). This isn't a real, meaningful metric and reads as either an inside joke or a placeholder that was never replaced.
**I need from you:** Is this intentional brand personality, or should it be removed/replaced with a real stat? I left it untouched since removing a possibly-intentional brand element isn't my call to make.

## Medium priority — factual accuracy / consistency

### 4. Two different contact emails
The site uses `hello@walidhasan.com` everywhere (footer, contact page, navbar) except `src/views/../app/privacy-policy/page.tsx` and `app/terms-of-use/page.tsx`, which both use `walid@inoviqa.com` for privacy/legal inquiries and as the CTA email link.
**I need from you:** Is `walid@inoviqa.com` intentional (e.g., legal inquiries route differently) or should it be `hello@walidhasan.com` for consistency? NAP/contact consistency matters for entity trust signals — I didn't change it without confirming intent.

### 5. RocketReach third-party data (carried over from the audit phase)
RocketReach lists education (BSc EEE, Southeast University, 2017–2021; Dhaka Polytechnic, 2013–2017) and an Inoviqa tenure of "2020–2023" that don't match your own site's timeline (Inoviqa founded 2023, ongoing). See `docs/ENTITY-MAP.md` §7.
**I need from you:** Which facts are accurate? This determines whether we add education to your About page/schema, and whether to pursue a correction with RocketReach.

### 6. Brand logo asset — placeholder generated, still needs your real artwork (RESOLVED, temporarily)
`public/assets/walidhasan-logo.png` did not exist anywhere in this codebase, so every reference to it (navbar, footer, About/Home portrait frames, favicon, apple-touch-icon) was broken. This session generated a functional placeholder — a square "WH" monogram in the site's own brand colors — via `scripts/generate-placeholder-logo.py`, and it now renders correctly in the build (verified: favicon/apple-touch-icon tags resolve, all `<img>` references resolve, no 404s). This is a design placeholder only; no factual/biographical content was invented.
**I need from you:** Replace `public/assets/walidhasan-logo.png` with your real logo or headshot artwork whenever you have it (same filename, ideally square, 512×512 or larger works for both favicon and in-page use). Until then the site is fully functional and visually consistent, just with a placeholder mark instead of your actual brand asset.

### 7. `/seo-report-generator/` tool status
`public/.htaccess` explicitly preserves this path as "an existing real file/folder" separate from the Next.js app, implying a working tool already lives there on your Hostinger server (outside this codebase). I fixed a bug where the footer linked to it using Next's client-side router (which would have 404'd inside the app even though the real file exists) — it's now a plain external link, consistent with how `src/views/Tools.tsx` already treated it.
**I need from you:** Confirm this tool is still live and working at that path on your server. If you'd like it migrated into this Next.js codebase for consistent branding/design, that's a real feature-build task I can take on once you share what it should do (I don't have its original source).

### 8. Contact form now sends via PHP `mail()` — needs live testing
The contact form previously did nothing (`onSubmit` just showed a fake "sent" state — no data ever left the browser). I've wired it to POST to a new `public/contact-handler.php`, which uses PHP's built-in `mail()` to send to `hello@walidhasan.com` (or `walid@inoviqa.com` — see item 4). This only works once deployed to a PHP-capable host (Hostinger shared hosting supports this by default).
**I need from you:** After deployment, send a real test submission and confirm the email arrives (check spam too — `mail()` deliverability varies by host and is generally weaker than a transactional email API like Resend/Postmark). If it's unreliable, tell me and I'll switch it to an API-based provider (needs an account/API key from you).

## Off-site / not fixable from inside this codebase

### 9. Duplicate LinkedIn profiles (carried over from audit)
`linkedin.com/in/walidhasan-riyad/` and `linkedin.com/in/walidhasan-r/` both surface for your name. The site only ever links to `walidhasan-riyad`, which is good, but the second profile still exists publicly and dilutes/confuses your entity. This can only be resolved on LinkedIn directly by you.

### 10. Missing brand image (see item 6) also needed for any off-site profile consistency work.

---
*New items get added above as they're found; resolved items get moved to CHANGELOG.md with the outcome, not deleted from history.*
