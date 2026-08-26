# ENTITY-MAP.md — Walid Hasan Entity & Asset Map

Last updated: 2026-08-08 (implementation session 1)
Implementation note: the "Owned Properties" table's URLs (§1) are now the exact `sameAs[]` list encoded in `src/lib/schema.ts` and rendered sitewide via JSON-LD — see `PERSONAL-BRAND-SEO-STATUS.md`. The duplicate-LinkedIn issue (§1/§5) and the RocketReach data-accuracy issue (§7) are unchanged/unresolved and now tracked operationally in `BLOCKED-USER-INPUT.md`.

## 1. Owned Properties (confirmed)

| Asset | URL | Role | Links back to walidhasan.com? | Notes |
|---|---|---|---|---|
| Personal website | https://walidhasan.com | Hub / primary entity anchor | N/A (is the hub) | 8 known pages: /, /about, /services, /case-studies, /tools, /contact, /book-a-call, /seo-report-generator, /portfolio/* |
| Agency site | https://inoviqa.com | Agency (local SEO, home services) | Yes — "Founded by Walid Hasan" links to walidhasan.com | Different niche focus than personal site |
| LinkedIn (primary?) | linkedin.com/in/walidhasan-riyad/ | Professional profile | Unconfirmed (blocked from automated fetch) | "Fiverr \| Web Designer" headline surfaced in search |
| LinkedIn (duplicate) | linkedin.com/in/walidhasan-r/ | Professional profile | Unconfirmed | Duplicate account — needs consolidation |
| Facebook | facebook.com/iamwalidhasan | Personal/professional | Unconfirmed | |
| Instagram | instagram.com/iamwalidhasan/ | Personal/professional | Unconfirmed (blocked from automated fetch) | |
| X / Twitter | x.com/walidhasan_r | Professional | Unconfirmed | |
| YouTube | youtube.com/@walidhasan-r | Education/tutorials | Unconfirmed | WordPress/Shopify/GA4/GTM tutorial content |
| Behance | behance.net/walid_hasan | Portfolio | Yes — site listed | 46 followers, 7,479 project views, "Verified on LinkedIn" |
| Dribbble | dribbble.com/inoviqa | Portfolio (agency account, not personal) | — | Listed under Inoviqa's social links, not personal handle |
| Fiverr | fiverr.com/walidhasan89 | Freelance storefront | Unconfirmed | 4.9★, 292 reviews, "offline" at time of audit |
| Pinterest | pinterest.com/iamwalidhasan/ | — | Unconfirmed | Labeled "Md Walid Hasan" — full-name data point |
| Upwork | Referenced via RocketReach, not independently confirmed URL | Freelance storefront | Unconfirmed | Listed as "Senior Web Developer since 2018" |
| GitHub | Mentioned as existing on Behance's "online presence" list | — | Not verified | URL not yet located — needs confirmation |

## 2. Products / SaaS & Chrome Extensions

| Product | Type | Status | Linked to Walid Hasan publicly? |
|---|---|---|---|
| ReplyChief | Chrome extension — reply/communication workflow (also described as "AI-powered LinkedIn engagement tool" on Behance) | Live | Yes, on walidhasan.com and Behance |
| Shopify AdminPalette | Chrome extension — Shopify admin productivity | Live | Yes |
| RFQ AutoPilot | Chrome extension — procurement/RFQ automation | Live | Yes |
| Site Audit Pilot | Chrome extension — one-click SEO audit | Live/new | Yes |
| Free SEO Report Generator | Web tool at /seo-report-generator | Live | Yes (on-site only) |

**Gap:** None of the four Chrome extensions were checked for their actual Chrome Web Store listings (developer name, reviews, install counts) in this pass — recommended as a fast follow-up, since Chrome Web Store developer pages are a legitimate, high-trust entity signal Google indexes well.

## 3. Companies / Client Projects Referenced in Case Studies

Corporate & agency work Walid Hasan/Inoviqa has publicly claimed credit for (from /case-studies): Inoviqa LLC, My New Warehouse, Enginious (UAE), BTR Services Inc, Pason Global, Matar Bin Fraih (UAE), Caidwin, Gherrino SRL (Italy), Flawless Women, Conceptual Architecture, Curious Tom (South Africa), Fulfill My Orders, Redesign Fitout, Evergreen Land Investing, The Ultimate Astrologer, Talently, The Dog Ranch (NZ), NoSpot WY, Rapid Response Testing, Kayak Backpack, Leadership Compass, Dr. Carla Manly, Bay Road Development, VB Family Law, CBT Fit Training, The BYOB Firm, The Cleaning Mavens, Silk Waters, Bubba Gump Seafood, Devoid Moda, Deus Boxing, Leds N Baggs, Little Red Pepper (UK).

**Finding:** This is a strong body of proof-of-work (42 named projects), but almost none of these client sites appear to link back to walidhasan.com or credit him in their own footer/credits ("Site by Walid Hasan"). This is a large, low-effort backlink opportunity — see OFFSITE-BRANDING.md §2.

## 4. Confirmed Third-Party Mentions

Outside of his own owned/controlled profiles, **no independent press mentions, guest posts, podcast appearances, "best of" list inclusions, or interviews were found** in this research pass. Every search for "Walid Hasan" + interview/podcast/guest post/testimonial surfaced either his own properties or entirely unrelated people (a comedian named Hasan Minhaj, etc.). This is the single biggest E-E-A-T/authority gap identified in this audit — see SEO-AUDIT.md §6 and OFFSITE-BRANDING.md.

## 5. Same-Name / Confusable Entities (competition for the "Walid Hasan" query)

| Name/Entity | Who they are | Overlap risk | URL |
|---|---|---|---|
| **Walid Hasan — Squareko** | Founder/CEO of Squareko, a Squarespace design & SEO agency, 12 yrs experience, 8,500+ clients claimed | **High — direct niche competitor** (web design + SEO, same name) | squareko.com, linkedin.com/in/shamswalidhasan/, 99designs.com/profiles/WalidHasan |
| Walid Hassan (comedian) | Iraqi comedian/actor, Wikipedia entry | Medium — high-authority Wikipedia page will likely keep outranking for the bare name for a long time | en.wikipedia.org/wiki/Walid_Hassan_(comedian) |
| Walid Mostafa | Unrelated Wikipedia entity (politician/other) | Medium — currently the #1 organic result for "Walid Hasan" | en.wikipedia.org/wiki/Walid_Mostafa |
| Walid Hasan (Instagram, @walidhasans) | Different individual, unrelated content | Low-medium — handle collision (`walidhasans` vs. client's `iamwalidhasan`) | instagram.com/walidhasans |
| Walid Hasan (IMDb actor) | Actor, unrelated | Low | imdb.com/name/nm14130619/ |
| Walid Hasan (Google Scholar) | Academic author, unrelated field | Low-medium — could confuse AI engines synthesizing "who is Walid Hasan" | scholar.google.com/citations?user=A02BSlsAAAAJ |
| Md Walid Hasan (ResearchGate/BUET) | Mechanical Engineering researcher at BUET, unrelated | Low | researchgate.net/profile/Md-Walid-Hasan |
| Walid Hasan (fiverr.com/devgeni) | Different Fiverr seller currently using display name "Walid Hasan" on a differently-named handle | **Medium — same platform as client's own Fiverr presence**, could confuse buyers | fiverr.com/devgeni |
| Walid Hasan — KSH Solutions | Independent contractor, LinkedIn, unrelated field | Low | linkedin.com/in/walid-hasan-726b65a/ |
| Walid Hasan — BRAC University physics undergrad | Student, unrelated | Low | linkedin.com/in/walid-hasan/ |
| Walid Hasan — Multimedia Specialist | Different creative professional, LinkedIn | Low-medium — adjacent creative field | linkedin.com/in/walidhasan/ |
| 200+ more "Walid Hasan" LinkedIn profiles | General name collision | Structural — LinkedIn's own directory page ranks for the bare name | linkedin.com/pub/dir/Walid/Hasan |
| Facebook "people named Walid Hasan" directory | General name collision | Structural | facebook.com/public/Walid-Hasan |

**Implication:** "Walid Hasan" alone is not a winnable head term in the short term — Wikipedia entities and platform directory pages occupy too much of page 1 structurally. The realistic, winnable targets are qualified queries: "Walid Hasan Inoviqa," "Walid Hasan SEO consultant," "Walid Hasan Dhaka," "Walid Hasan web designer," "Walid Hasan digital growth," etc. Full targeting logic in KEYWORD-STRATEGY.md.

## 6. Entity Graph Gaps (no presence found)

- No Wikipedia page (expected/normal at this stage — not recommended to pursue directly per Wikipedia notability rules; see AI-VISIBILITY.md).
- No Wikidata item — this is achievable independent of Wikipedia and directly feeds Google's Knowledge Graph and several AI models' entity resolution.
- No Google Knowledge Panel currently.
- No Crunchbase / AngelList-type founder profile for Inoviqa.
- No structured data (JSON-LD `Person`/`Organization` schema) detected on walidhasan.com's homepage or about page content as fetched.
- No `llms.txt` file (emerging convention some AI crawlers check).
- No press/media coverage or "as seen in" signal anywhere.
- No podcast or video interview presence outside his own YouTube tutorials.
- No claimed Google Business Profile found tied to "Walid Hasan" personally (Inoviqa may have one for local presence — not confirmed in this pass).

## 7. Data Accuracy Issue Flagged for You

RocketReach's aggregated record for "Walid Hasan" (rocketreach.co/walid-hasan-email_713737256) lists: BSc Electrical & Electronics Engineering, Southeast University (2017–2021); Dhaka Polytechnic Institute (2013–2017); roles at Upwork, Fiverr, Inoviqa Agency (2020–2023), and "TK Publishing LLC." Some of these details (dates, "TK Publishing LLC") do not appear anywhere on your own site or profiles and may be (a) accurate but never published by you, (b) merged/contaminated with a different Walid Hasan's data by RocketReach's scraper, or (c) outdated. **Please confirm which of these facts are true** — this determines whether we correct/claim the RocketReach listing or actively dispute it, and whether education becomes part of your canonical bio.
