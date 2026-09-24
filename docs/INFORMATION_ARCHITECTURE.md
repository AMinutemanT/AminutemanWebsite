# Information Architecture

Phase 2. Builds on `PRODUCT_AUDIT.md` (Phase 0) and `COMPETITIVE_RESEARCH.md` (Phase 1).
The research conclusion carries directly into this document: Aminuteman's existing IA
(`src/data/nav.ts`, `src/App.tsx`) already matches the pattern that works across every
credible reference in the research set — sparse top-level nav, deep sectioned
mega-menu, no flat list of 15+ items. This document formalizes and lightly refines
that structure; it does not propose replacing it.

## Navigation — four groups, confirmed correct

**[E]**, from `src/data/nav.ts`:

1. **Valley** — the platform thesis (`/valley` + three children: Command & Control,
   Mission Autonomy, Partner Program). Not a programme category; a standalone
   argument for why Aminuteman is an integrator, not just a hardware vendor.
2. **AI** — five programmes in two sub-groups: *Deployable products* (Aorizon, Talon,
   Sentinel) and *Foundations* (digital-twin, quantum).
3. **Systems** — five programmes in three sub-groups: *Air & strike* (Ankosha,
   hypersonics), *Air defence* (counter-UAS, legacy-systems), *Space*
   (orbital-systems).
4. **Company** — About, Careers, Contact.

This matches the recurring pattern in `COMPETITIVE_RESEARCH.md` exactly (Shield AI's
named-product nav, Skylark's two-tier grouped mega-menu). **No change recommended.**

One structural note: the `Category` type in `src/data/programmes.ts` includes
`'platform'` as a third value alongside `'systems'`/`'ai'`, but no programme record
uses it — Valley is a separate page tree, not a programme. This is a harmless unused
type member, not an IA defect; flagging only so nobody spends time hunting for where
`'platform'` is supposed to render.

## Pages and their job

Every page must answer "why does a visitor stay here" (Phase 6 will go deeper on
this). At the IA level, each existing page has a distinct, non-overlapping job
**[E/I]**:

| Page | Job | Primary exit |
|---|---|---|
| Home | Prove the company is real, current, and covers a coherent set of domains; route the visitor to their actual area of interest | Contact, or a domain/programme link |
| `/valley` + 3 children | Make the integration/platform argument — why Aminuteman isn't a single-product vendor | Contact, or a specific programme |
| `/systems`, `/ai` (index) | Let a visitor scan one category without the other | A programme detail page |
| `/systems/:slug`, `/ai/:slug` | Answer a procurement evaluator's real questions: what is it, how mature, what are the specs, how does it plug into Valley | Contact, or a related programme |
| About | Establish who the company is, where it operates, who it has worked with — the trust-building path for someone not yet ready to engage | Contact or Careers |
| Careers | Self-contained application path | Form submission |
| Contact | Convert | Form submission |

No page exists without a clear, distinct job. **No new pages are recommended** — this
matches `PRODUCT_AUDIT.md` §10 ("no unnecessary pages"), and the brief's Phase 2 rule
that every page and section must have a purpose.

## Primary and secondary actions

**[E]**, confirmed in `Navbar.tsx` and programme/Valley pages:

- **Primary CTA, site-wide:** "Request a briefing" → `/contact`. Present in the
  navbar (desktop and mobile) at all times. One consistent primary action across
  every page is correct for this audience — a procurement evaluator or partner
  contact should never have to hunt for how to reach the company.
- **Secondary actions:** "View all Systems/AI" from the mega-menu, "Explore" through
  to programme detail from any `FleetCard`, cross-links via each programme's
  `related` field, and the Valley → Command & Control / Mission Autonomy / Partner
  Program sub-navigation.
- **Careers is not a secondary path off the primary CTA** — it's a distinct funnel
  reachable only from the Company group and (per `tasks/todo.md`) the footer. Correct
  as-is: a candidate and a procurement evaluator are different audiences and
  shouldn't be funneled through the same form.

## Content priority — confirmed by the maturity-status field

**[E]:** every one of the 10 programme records carries a `status` field
(`'In trials' | 'In development' | 'Operational'`, verified by direct read of
`src/data/programmes.ts`), which resolves the open question in `PRODUCT_AUDIT.md` §6/§9
about whether the maturity pill is consistently present — **it is, across all ten
programmes, with no gaps.** This is the single strongest per-programme trust signal on
the site (per `COMPETITIVE_RESEARCH.md`'s finding on named-platform specificity) and it
already has full coverage. No IA change needed here — this is confirmation, not a gap.

Within a programme page, content order (hero → overview → capabilities → specs →
gallery/model → integration → related) is already need-ordered for the procurement
evaluator persona: identity and maturity first, technical depth in the middle,
ecosystem fit last. **[I]** No reordering recommended.

## Responsive behavior

**[E]**, from `Navbar.tsx` and `tailwind.config.js` breakpoints (`sm 481px / md 769px
/ lg 1025px / xl 1280px`):

- Mega-menu collapses to a click-driven full-height drawer below `lg` (1025px), with
  its own focus trap and Escape handling — appropriate; a hover-driven mega-menu has
  no equivalent on touch, so the drawer pattern is the right divergence, not an
  inconsistency.
- The primary CTA ("Request a briefing") is hidden below `sm` in the top bar and
  reappears as a full-width button at the foot of the mobile drawer — reasonable
  given limited top-bar width, though worth confirming in Phase 7 that a visitor who
  never opens the drawer on mobile still has a way to reach Contact quickly (e.g. via
  the persistent menu icon) rather than only inside an opened drawer.
- No content-architecture changes are needed for responsive behavior specifically;
  this is implementation-level (covered in `CODEX_REVIEW.md` and Phase 7), not IA.

## What this document is deliberately not proposing

Per `PRODUCT_AUDIT.md` §10 and the brief's rule against features added for
fashion rather than reason:

- No search/filter UI (content volume doesn't justify it yet).
- No breadcrumb restructuring beyond what already exists (`484633f` added
  BreadcrumbList structured data — that's a search-engine/schema concern, not an IA
  change).
- No new top-level nav group. Four groups, each with a distinct job, is correct at
  current programme count; revisit only if the programme count materially grows past
  what a three-column sub-grouping can hold cleanly (Systems and AI are both already
  at the edge of a clean 2-3 column sub-grouping split).

---

**Next:** `DESIGN_SYSTEM.md` (Phase 3), documenting the token system, type scale, and
component conventions that already exist so Codex has one reference instead of
reconstructing it from `tailwind.config.js` comments and `tasks/todo.md` narrative.
