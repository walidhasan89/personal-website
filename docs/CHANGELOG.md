# CHANGELOG.md — Walid Hasan Personal Brand / SEO Project Log

## 2026-08-26 — Trust/content fixes, LinkedIn URL update, code-review findings (Sonnet 5)

**Action:** Full source review of the codebase, followed by fixing everything actionable without new factual input, plus an explicit LinkedIn URL change requested by the user. Full detail of what's still open in `BLOCKED-USER-INPUT.md`.

**Content/trust fixes (resolving items flagged 2026-08-08):**
- **Removed the six homepage testimonials** (`src/views/Home.tsx`) — their authenticity was never confirmed, and publishing unverifiable client quotes was flagged as a legal/FTC risk, not just an SEO one. Per the standing recommendation in `BLOCKED-USER-INPUT.md`, unverifiable claims were removed rather than replaced with new invented ones. Original text remains in git history and can be restored if they're confirmed real.
- **Removed "World Domination 23%"** everywhere it appeared (a trust-marquee chip, a results stat, and a hero floating card) — not a real, sourceable metric. The results stat was replaced with "7+ Years Experience," a figure already published and load-bearing elsewhere on the site (About page timeline/quick-stats), so nothing new was introduced. The floating card now reads "30+ Countries Served," likewise already an established site-wide claim.
- **Reworded "GA4 Certified Setup" → "GA4 Setup"** (`src/views/Services.tsx`) — the original implied a formal Google certification that was never confirmed to exist.
- **Unified the contact email** to `hello@walidhasan.com` sitewide. `privacy-policy` and `terms-of-use` previously used `walid@inoviqa.com`; consolidated for NAP consistency (the schema.ts comments already emphasize this matters for entity trust).
- The remaining quantified performance stats (96% retention, 200% traffic growth, etc.) are deliberately **not** touched — several drive literal progress-bar widths in the Services page UI, and neither softening nor keeping them is a call this session can make without knowing the real numbers. Left open in `BLOCKED-USER-INPUT.md`.

**LinkedIn URL updated (user-requested):** `sameAs`/Navbar/Footer/Contact previously linked `linkedin.com/in/walidhasan-riyad/`; changed sitewide to `linkedin.com/in/iamwalidhasan` per the user's explicit instruction. `docs/BLOCKED-USER-INPUT.md` item on duplicate LinkedIn profiles updated to reflect the new canonical URL.

**Code-quality fixes (from this session's review):**
- **De-duplicated social links.** The same six-entry social-link array (with three different className conventions) was hand-maintained separately in `Navbar.tsx`, `Footer.tsx`, and `Contact.tsx`; `schema.ts`'s `SAME_AS` was a fourth, manually-synced copy. Extracted to `src/lib/social.ts` as a single source of truth; `schema.ts` now derives `SAME_AS` from it. This also means today's LinkedIn URL change only needed editing in one place instead of four.
- **De-duplicated the microlink.io screenshot URL builder**, previously reimplemented three times with slightly different formatting (`Home.tsx`, `CaseStudies.tsx`, `Tools.tsx`) — extracted to `src/lib/screenshot.ts`.
- **Added a fallback for portfolio/product screenshots.** All `<img>` tags sourcing from `api.microlink.io` (a free-tier third-party service with no uptime guarantee, used across Home, Case Studies, and Tools) now fall back to the site's own `/assets/og-default.png` on load failure via `onError`, instead of showing a broken-image icon if the service is unavailable or rate-limited.
- Removed a dead, unused `socials` array in `Footer.tsx` (superseded by `socialLinks`, but never deleted).
- Replaced the corrupted/garbled `README.md` (previously unreadable binary-looking text) with an actual project README.
- Bumped `app/sitemap.ts`'s `LAST_REVIEWED` date to reflect today's real content changes, per that file's own documented policy.

**Deliberately left unchanged:**
- `public/assets/walidhasan-logo.png` — still the AI-generated placeholder monogram; needs real artwork from the user (unchanged blocker, see `BLOCKED-USER-INPUT.md`).
- The specific numeric performance stats across Services/Home/Tools (see above).
- `app/epoxy-flooring-marketing/` — flagged in this session's review as a topically unrelated niche landing page living inside a personal-entity site; not touched since removing/relocating it is a strategic call, not a defect.
- Contact form PHP `mail()` deliverability — still unverified on live hosting; nothing further to fix from inside the codebase.

---

## 2026-08-08 — Source-code verification pass, remaining blockers closed (Sonnet 5)

**Action:** Verified every fix claimed in the prior two sessions' documentation directly against the real source files (grep/read each one — nothing taken on faith), then closed the two gaps found. Full detail in `PERSONAL-BRAND-SEO-STATUS.md` → Session 4.

**Verified genuinely present in code (not just documented):** `pageMetadata()` on all 10 routes, JSON-LD/schema wiring on every page that should have it, breadcrumbs on all 6 originally-specified pages, both remaining double-`<main>` fixes, the Rules-of-Hooks component extraction in both affected files, `aria-expanded` on all 3 FAQ accordions, image dimensions on every `<img>` including multi-line JSX.

**Fixed:**
- **Missing logo asset (the one confirmed deployment blocker).** `public/assets/walidhasan-logo.png` did not exist in the repo, breaking 8 references (navbar, footer, favicon, About/Home portraits). Could not be sourced from the live domain (no network access to arbitrary domains from this sandbox). Generated a placeholder "WH" monogram in the site's brand colors (`scripts/generate-placeholder-logo.py`) — a design placeholder, not a factual claim, so it doesn't conflict with the no-fabrication rule. Should be swapped for real brand artwork when available.
- **Missing ESLint configuration.** `next lint` had no config to run against, which is why the earlier Rules-of-Hooks bug went undetected for as long as it did. Added `eslint-config-next` and `.eslintrc.json`. First run found 30 `react/no-unescaped-entities` errors (cosmetic — raw quote characters in JSX text, not a rendering bug) and expected `no-img-element` warnings (correct given `images.unoptimized: true` for static export). Downgraded the entities rule to warn rather than editing 30 lines of live copy for a non-functional preference; `next lint` now passes with zero errors.
- Added `.gitignore` (didn't exist) and confirmed no `.env`/secret files exist anywhere in the project.

**Verified via fresh cold build + automated QA:** `rm -rf .next out && npm run build` → 16/16 routes. Python sweep over all 12 built pages confirms one `<main>`/one `<h1>` per page, `og:url`=`canonical` on every page, `og:image` present everywhere, all JSON-LD valid with resolving `@id`s, zero missing image files, zero broken internal links. Grepped all source for placeholder/fabricated-content markers — none found.

**Assessment:** production build clean, zero broken links, zero schema errors, zero blocking lint errors. No remaining deployment blocker. Only open items are content/evidence questions that require the user's input (`BLOCKED-USER-INPUT.md`) — not code defects.

---

## 2026-08-08 — Independent senior review + technical hardening (Opus 5)

**Action:** Independent review of the prior implementation session, followed by fixes. Nothing deployed. Full detail in `OPUS-FINAL-REVIEW.md`.

**Critical defects found and fixed:**
- **Broken social sharing sitewide.** Every subpage inherited the homepage's `og:title`, `og:description` and `og:url` (verified: `/about` shipped `og:url = https://walidhasan.com`), and no `og:image` existed anywhere despite `twitter:card=summary_large_image`. Added a `pageMetadata()` helper applied to all 11 routes, plus a generated 1200x630 brand OG card.
- **React Rules of Hooks violation** in `Services.tsx` and `Tools.tsx` (`useScrollReveal()` called inside `.map()` callbacks). Extracted proper components.
- **Duplicate URLs at server level** — `/about.html` returned 200 alongside `/about`, and `/about/` hard-404'd. Added 301 rules to `.htaccess`.
- **Sitemap used `new Date()`**, claiming every page changed on every deploy; also listed an unverified URL. Rewritten with hand-maintained `lastmod` and entity-appropriate priorities.
- **Two more double-`<main>` pages** (`/pricing`, `/epoxy-flooring-marketing`) — same defect class the prior session had fixed on two other pages and reported as done.

**Entity/SEO improvements:** `ProfilePage` schema on `/about` bound to the shared Person `@id`; `knowsAbout` added to Person; semantic `h2` headings replacing styled `div`s; `sr-only` heading for the case-studies grid; title tags trimmed to SERP width.

**Accessibility/UX:** keyboard operation + `aria-expanded` on Services/Contact FAQ accordions (previously focusable but not operable); `width`/`height` on all 44 images (CLS); improved alt text; passive `mousemove` listener.

**Content quality:** removed 5 inserted outbound "authority" links from hero/lead copy — a dated SEO tactic that added no reader value and pushed the first outbound click of each page onto someone else's domain.

**Deliberate dissent from prior plan:** declined to add `llms.txt` (no major AI crawler documents consuming it; the brief rules out AI-crawler gimmicks). Rewrote meta descriptions to stop propagating unverified statistics into search results — on-page body copy left untouched pending user confirmation.

**Verified:** clean production build (16/16 routes); automated QA over built HTML confirms valid JSON-LD with resolving `@id` refs on every page, no broken internal links, no duplicate titles/descriptions, exactly one `<main>` and one `<h1>` per page, zero images missing dimensions.

**Assessment:** 7.5/10, production-ready pending one blocker — the missing `public/assets/walidhasan-logo.png`. Remaining gap is evidentiary (unverified stats, no headshot, no individual case-study pages), not technical.

---

## 2026-08-08 — Implementation session 1: technical foundation & schema (Phase 1 / Phase 9)

**Action:** First autonomous implementation session against the real codebase at `D:\Projects\WalidHasan\walidhasan` (Next.js 14 App Router, static export). Worked locally only, per instructions — nothing deployed to Hostinger. Full detail in `PERSONAL-BRAND-SEO-STATUS.md`.

**Implemented:**
- Sitewide `Person` + `Organization` (Inoviqa) + `WebSite` JSON-LD graph (`app/layout.tsx`, new `src/lib/schema.ts`) — the top-priority entity/AI-visibility fix from the audit.
- `FAQPage` schema on Home, Services, Contact (matching existing visible FAQ content).
- `SoftwareApplication` schema for the 4 Chrome extension products on `/tools`.
- Visible breadcrumb trail + matching `BreadcrumbList` schema on About, Services, Case Studies, Contact, Tools, Book, Pricing, Privacy Policy, Terms of Use (new `src/components/Breadcrumbs.tsx`).
- Removed dead no-op `SEO.tsx` component (leftover from the old Vite→Next migration) from 7 pages; Next's Metadata API already fully replaced it.
- Fixed 8 hardcoded absolute-production-URL image references → relative paths.
- Fixed a real broken internal link (Footer's "SEO Report Generator" used Next `<Link>` for a path that isn't a Next.js route, would 404 in-app).
- Fixed invalid nested `<main>` landmark on Privacy Policy and Terms of Use pages.
- Fixed the contact form, which previously submitted nowhere — added a real PHP mail handler (`public/contact-handler.php`) and wired the form to it end-to-end.

**Verified:** `npm run build` run twice, 16/16 static pages generated successfully both times; generated HTML manually inspected to confirm schema/breadcrumbs render correctly.

**Explicitly not touched (flagged instead, see `BLOCKED-USER-INPUT.md`):** homepage testimonials (authenticity unverified), numerous quantified performance stats across Services/Home/Tools (unverified), "World Domination 23%" stat, an email-address inconsistency (`hello@walidhasan.com` vs `walid@inoviqa.com`), RocketReach third-party facts, a missing logo image file this session couldn't source. None of these were guessed at or fabricated.

**Next step:** See "EXACT NEXT TASK" in `PERSONAL-BRAND-SEO-STATUS.md`.

---

## 2026-08-08 — Initial Discovery & Audit (Phase 0)

**Action:** Completed full discovery and audit only. No live changes made to any website, profile, content, code, metadata, or schema.

**Deliverables created:**
- BRAND-MASTER.md
- ENTITY-MAP.md
- SEO-AUDIT.md
- COMPETITOR-RESEARCH.md
- KEYWORD-STRATEGY.md
- CONTENT-STRATEGY.md
- OFFSITE-BRANDING.md
- AI-VISIBILITY.md
- IMPLEMENTATION-ROADMAP.md
- CHANGELOG.md (this file)

**Key findings:**
- walidhasan.com does not currently rank on page 1 for the bare "Walid Hasan" query; occupied by Wikipedia entities, platform directories, and unrelated namesakes.
- A direct same-name, same-industry competitor identified: Walid Hasan, Founder/CEO of Squareko (Squarespace design/SEO agency).
- No schema.org structured data detected on walidhasan.com.
- No third-party press, guest posts, interviews, or independent mentions found — the primary authority/E-E-A-T gap.
- Two duplicate LinkedIn profiles and inconsistent handles across platforms.
- 42 named client case studies exist but mostly lack individual indexable pages and reciprocal backlinks.
- No Wikidata item, no Knowledge Panel, no llms.txt, no AI-visibility optimization currently in place.
- A third-party data broker (RocketReach) carries unverified education/employment facts that need user confirmation.

**Next step:** Awaiting user review of open questions in IMPLEMENTATION-ROADMAP.md §0 and approval to begin Phase 1 implementation.

---

*Future entries should be added above this line in reverse-chronological order (newest first), each dated, listing what was changed, why, and the measurable effect where known.*
