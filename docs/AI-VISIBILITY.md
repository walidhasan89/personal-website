# AI-VISIBILITY.md — AI Search / LLM Answer-Engine Optimization

Last updated: 2026-08-08
Scope note: This session cannot directly query ChatGPT, Gemini, Perplexity, Copilot, or Claude's own consumer search surface to capture live current answers — findings here are based on (a) what raw material currently exists for those systems to draw on, and (b) general, verifiable mechanics of how AI answer engines source entity information. Recommend a manual T0 baseline test (see COMPETITOR-RESEARCH.md §5) as a fast follow-up.

## 1. What AI Engines Currently Have to Work With

AI answer engines (ChatGPT/Gemini/Perplexity/Copilot/Claude) generally synthesize answers from a mix of: their training data, live web search/retrieval, Wikipedia/Wikidata, and structured data (schema.org) embedded on pages they crawl. Based on this audit:

- **No Wikipedia page** → no high-trust free-text summary source for AI training/retrieval.
- **No Wikidata item** → no structured, machine-readable entity record (name, occupation, founded-organization, sameAs links) for AI systems and Google's Knowledge Graph to pull from directly.
- **No schema.org Person/Organization markup detected on walidhasan.com** → the page itself doesn't hand AI crawlers a clean, unambiguous fact block.
- **No third-party citations** (press, guest posts, interviews) → nothing independent for an AI model to cross-reference and increase confidence that claims on walidhasan.com are accurate/notable.
- **Name collision with Squareko's Walid Hasan** and several Wikipedia-notable "Walid Hassan/Hasan/Mostafa" individuals → real risk that an AI model asked "Who is Walid Hasan?" either declines to answer confidently, blends facts from multiple people, or surfaces the wrong one first.

**Net assessment:** Walid Hasan is very likely currently near-invisible or ambiguous to AI answer engines for his own name, despite having substantial real, legitimate professional substance (500+ projects, real products, real client base) that most people asking "who is a good SEO/web design consultant" would actually want surfaced. The gap is structural/technical, not a lack of underlying credibility.

## 2. Priority Fixes for AI Visibility

1. **Ship complete schema.org `Person` markup** on walidhasan.com (ideally on / and /about), including: `name`, `alternateName` (if "Walid Hasan Riyad" or "Md Walid Hasan" are legitimate variants — confirm with user), `jobTitle`, `worksFor` (Organization: Inoviqa), `url`, `image`, and a full `sameAs[]` array listing every verified profile URL (LinkedIn — one consolidated profile, Behance, YouTube, X, Instagram, Facebook, Fiverr). This is the single most direct lever available and is entirely within the site's own control.
2. **Add `Organization` schema for Inoviqa** with `founder` pointing to the Person entity — this two-way relationship (Person→worksFor→Org, Org→founder→Person) is exactly the pattern Google's Knowledge Graph and AI knowledge bases use to confirm founder/company relationships.
3. **Create a Wikidata item.** Unlike Wikipedia, Wikidata has a lower and more mechanical bar and directly feeds Google's Knowledge Panel eligibility and many AI systems' entity resolution. This is a concrete, achievable near-term action (subject to Wikidata's own sourcing/notability requirements — will need at least a few independent citations to support it, tying back to the third-party-mention gap in OFFSITE-BRANDING.md).
4. **Publish clear, declarative, quotable fact statements** — AI systems favor content phrased as verifiable facts ("Walid Hasan founded Inoviqa in 2023" / "Walid Hasan has delivered 500+ web design and SEO projects since 2017") over pure marketing language ("I build growth systems that generate leads"). Recommend an About-page rewrite pass (in the implementation phase) that keeps the persuasive copy but adds a clean, fact-dense summary block.
5. **~~Consider an `llms.txt` file~~ — REVIEWED AND DECLINED (2026-08-08).** See the review note at the foot of this file.
6. **Third-party citations remain the biggest lever.** AI models weight independent corroboration heavily — every guest post, interview, directory listing, or "featured in" mention identified in OFFSITE-BRANDING.md compounds AI-visibility, not just classic backlink SEO.
7. **FAQ-style content answering likely AI-directed questions** (see KEYWORD-STRATEGY.md §5) — structured as actual Q&A (ideally with `FAQPage` schema) rather than only prose, since this format is both AI- and rich-result-friendly.

## 3. Monitoring Plan (once implementation begins)

Establish a recurring check (quarterly is reasonable) of: "Who is Walid Hasan?" and 4-5 other name/entity prompts across ChatGPT, Gemini, Perplexity, and Copilot, logged with screenshots/transcripts, to track whether AI-visibility work is measurably changing what these systems say over time. This becomes a section of CHANGELOG.md going forward.

## 4. Explicit Non-Actions

No schema, llms.txt, Wikidata item, or content has been created or published in this phase — this file documents the plan only, pending approval.

---

## Review note (2026-08-08, independent review — Opus 5)

**Recommendation 5 (`llms.txt`) was reviewed and declined.** No major AI crawler
(OpenAI, Google, Anthropic, Perplexity) publicly documents consuming `llms.txt`.
It remains a speculative community proposal, and the project brief explicitly
excludes tactics aimed only at AI crawlers. Describing it as "no downside"
understates the real cost: a file that must be kept factually in sync with the
site forever, in exchange for no demonstrated retrieval benefit.

**What was implemented instead**, all of which demonstrably affects how AI
systems resolve and describe an entity:

- `Person`, `Organization` and `WebSite` nodes sharing stable `@id`s, so the
  founder ↔ company relationship is machine-readable and bidirectional.
- A dedicated `ProfilePage` on `/about` whose `mainEntity` points at the Person
  `@id` — this explicitly designates one URL as the authoritative description of
  the Walid Hasan entity, which is the core disambiguation problem this project
  exists to solve.
- `knowsAbout` on the Person node, listing twelve topics each backed by visible
  page content — the clearest available signal of topical domain.
- Corrected semantic structure (one `<main>`, one `<h1>`, real `<h2>` headings)
  so content-extraction pipelines parse the pages correctly.
- Per-page metadata that no longer misidentifies every subpage as the homepage.

**The genuine remaining constraint on AI visibility is not on-site.** LLMs weight
independent corroboration heavily, and there is still no third-party source that
describes Walid Hasan. Until mentions exist on domains he does not control, AI
systems have only self-published claims to work from and will stay appropriately
hedged. That work is in `OFFSITE-BRANDING.md` and cannot be solved in the repo.
