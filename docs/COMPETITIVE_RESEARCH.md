# Competitive / Reference Research

Phase 1 of the product/UX/design director engagement. Follows `PRODUCT_AUDIT.md`
(Phase 0). Evidence tiers used throughout, per the brief:
**A** = published research (NN/g, Baymard, web.dev, a named case study).
**B** = public reporting/verifiable secondary source (news, company disclosure).
**C** = my own direct observation of the live site (via fetch).
**D** = my own inference, not directly evidenced.

No fabricated engagement statistics appear anywhere below. Where a claim would need
tier-A evidence and none was found, it is stated as tier D inference and labelled as
such.

## Method and a finding worth stating up front

I attempted to fetch 11 sites directly. Two Indian direct comparables named in
`tasks/todo.md`'s original reference list — **Veda Aeronautics** and **Solar Defence
and Aerospace Ltd** — have **no dedicated public marketing website** I could locate;
Veda's public presence is LinkedIn/X only, and Solar Defence's is a subpage of its
parent conglomerate's site (`solargroup.com/defence.html`), not a purpose-built
product site. **[C]** This is itself a data point: at the direct-competitor tier in
India, a considered, purpose-built site is not table stakes yet — Aminuteman's site
already clears a bar most of its closest local comparables haven't attempted. It
changes who the realistic bar-setters are: not local peers, but the better-funded
international defence-tech firms and the primes.

Anduril, Palantir, SpaceX, and Helsing blocked automated fetching (empty response,
429 rate-limit, or bot protection). Anduril's design is described below from public
secondary sources (Fonts In Use, Behance case study), not a live fetch — flagged
**[B]** and kept deliberately thin rather than invented.

## References

| Site | Category | Verification |
|---|---|---|
| Avalonch (avalonch.com) | Direct competitor — parent co. of Aminuteman's own former reference | Fetched **[C]** |
| Skylark Labs (skylarklabs.ai) | Best-in-class adjacent (defense AI/autonomy) | Fetched **[C]** |
| Shield AI (shield.ai) | Best-in-class adjacent (defense autonomy) | Fetched **[C]** |
| Adani Defence & Aerospace (adanidefence.com) | Direct competitor (Indian defence manufacturer, and a named Aminuteman partner) | Fetched **[C]** |
| Lockheed Martin (lockheedmartin.com) | High-trust institution / prime | Fetched **[C]** |
| Boeing Defense (boeing.com/defense) | High-trust institution / prime | Fetched **[C]** |
| Anduril (anduril.com) | Best-in-class adjacent, editorial-design exemplar | Secondary sources only **[B]**, live fetch blocked |
| Helsing (helsing.ai) | Best-in-class adjacent (European defense AI) | Fetch blocked (429); named/scoped from secondary listing only, not analyzed |
| Veda Aeronautics | Direct competitor (named in original brief) | No public site found — see finding above |
| Solar Defence and Aerospace | Direct competitor (named in original brief) | No dedicated site — parent-company subpage only |
| Palantir (palantir.com) | Best-in-class adjacent | Fetch blocked, not analyzed |
| SpaceX (spacex.com) | Editorial-design exemplar (restrained aerospace identity) | Fetch blocked, not analyzed |

Eight references have real observations below (six fetched directly, Anduril from
secondary sources, plus the absence-of-site finding for two). Palantir, SpaceX, and
Helsing are listed as attempted but excluded from the analysis rather than filled in
with inference — consistent with the brief's instruction not to invent what wasn't
seen.

## Per-reference observations

**Avalonch** — the exact source of Aminuteman's current color tokens. **[C]** Linear
narrative scroll (hero → client logos → product categories → hardware gallery → AI
software → roadmap → R&D validation → contact → footer). Sparse three-item text nav.
High-contrast monochrome (charcoal/black, white text), no gradients. Client logos
(JSW Group, Adani, Indian Armed Forces) as monochrome badges. Military-technical
section labels ("Mission Tempo," "System Variant") rather than marketing language.
Single hero CTA ("Explore Products"). Video used narrowly, for one field-test clip,
not as ambient background.

**Skylark Labs** — the source of Aminuteman's current page structure (numbered
01–06 sections). **[C]** No video masthead; hero is pure typography ("AI that keeps
learning. For places too dangerous for people.") with "Book a Demo" fixed top-right.
Mega-menu groups products into named sub-categories (EDGE AI / AUTONOMOUS SYSTEMS),
matching the grouping pattern Aminuteman's nav already replicates. Dense client-logo
grid (12+ orgs incl. Indian Navy, US Air Force) plus named press mentions (Forbes,
Fast Company). Footer opens on a restated mission line before the link columns.

**Shield AI** — US defense-autonomy company, comparable AI+hardware combination to
Aminuteman (Valley/Aorizon + Ankosha/counter-UAS). **[C]** Product-named nav items
(Hivemind, X-BAT, V-BAT, Aechelon) rather than generic categories — mirrors
Aminuteman's approach of naming Aorizon/Talon/Sentinel/Ankosha directly instead of
using generic labels like "our AI platform." Social-proof section names specific,
verifiable named partnerships (DARPA's X-62 VISTA, General Atomics' MQ-20, Kratos'
MQM-178) rather than a logo wall — each program is a distinct card with its own
one-line description, not a flattened badge grid.

**Adani Defence & Aerospace** — Indian direct competitor and a named Aminuteman
partner. **[C]** Navy/white corporate palette, not restrained black — closer to a
conventional industrial-conglomerate site than a defense-tech startup site. Trust
built through volume of third-party press logos (20+, dated) rather than design
restraint. Autoplaying hero video of a facility/leadership visit. This is the
"institutional-conglomerate" register — legible and credible, but is not the register
Aminuteman's own design history has chosen (todo.md sessions repeatedly moved away
from anything reading as generic-corporate).

**Lockheed Martin / Boeing Defense** — primes, high-trust institutions. **[C]**
Both: full mega-menus with 6-8 top-level categories and dozens of sub-items, global
region/language selectors, hero video backgrounds behind a single clear headline,
restrained accent color (deep blue at Lockheed, near-none at Boeing), 16:9 photography
throughout, specific-platform naming (F-15EX, MQ-25 Stingray) as a trust mechanism,
and footers with 40+ organized links across investor/press/careers/legal. Neither
site is materially "restrained" — they're comprehensive by necessity, serving
investors, suppliers, and 100k+ employees simultaneously. Their trust signal isn't
minimalism, it's exhaustive specificity and institutional completeness.

**Anduril** — described from Fonts In Use and a Behance case-study, not a direct
fetch. **[B]** Publicly documented as black-and-white with a single lime-green
signature accent (`#DFF140`) and Helvetica Now throughout — i.e., the same
"one neutral ramp + exactly one accent color" discipline Aminuteman's own token
system already independently arrived at (orange `#FF8A00` playing Anduril's lime
role). Worth naming to Codex explicitly: this isn't a coincidence to chase further,
it's validation that the existing choice is in the right family, not a gap to close.

## Recurring patterns across references

1. **One accent color, applied narrowly to CTAs and interactive states, on a
   near-monochrome base** — true at Avalonch, Skylark Labs, Anduril (secondary), and
   in a duller form at Lockheed. Adani and Boeing are exceptions and read more
   conventional-corporate as a result. **[C/B]**
2. **Named, specific proof over generic trust badges.** Shield AI's named-program
   cards, Skylark's named press mentions, Boeing's named-platform copy (MQ-25
   Stingray, not "our unmanned systems") all substitute specificity for superlative
   claims. **[C]**
3. **Sparse primary nav, deep mega-menu.** Every fetched site keeps the visible top
   nav to 3-8 words but expands into a structured, sectioned dropdown on hover —
   never a flat 15-20 item list. **[C]**
4. **Hero is either pure typography or one real, specific image/video — never a
   generic stock or abstract-gradient hero.** Skylark has no hero imagery at all;
   Avalonch and Boeing use one real photograph/video tied to an actual product or
   event. **[C]**
5. **Footer as a final statement, not just a sitemap.** Skylark and Avalonch both
   open the footer with a restated line of identity before the link columns. **[C]**

## Anti-patterns observed

- **Logo-wall trust signaling without attribution of relationship type** (seen at
  Adani, partially at Skylark) — a grid of names with no indication of what the
  relationship actually is (customer? evaluator? MoU?) reads as padding once a
  reader notices it. Aminuteman's own history already identified and avoided this
  exact failure mode: session 13's `tasks/todo.md` notes explicitly chose to print
  partner *names with the basis of the relationship* rather than a logo wall,
  specifically because "reproducing partner marks would imply an endorsement none of
  them has given." **[C, cross-referenced against E in PRODUCT_AUDIT.md]**
- **Conventional-corporate over-completeness** (Adani, and to a lesser extent
  Lockheed/Boeing, which have structural reasons to be exhaustive) — dozens of nav
  items and footer links, present because the organization genuinely has that many
  audiences (investors, suppliers, 100k+ employees). Aminuteman does not have those
  audiences yet, and copying this density would manufacture false institutional
  scale rather than communicate real capability.
- **Autoplaying, ambient hero video used as decoration rather than evidence**
  (Adani's rotating banners) — contrasts with Avalonch's single, purposeful field-
  test clip. The pattern that reads as considered is video used to *prove* something
  happened, not to fill visual space.

## Opportunities specific to Aminuteman

- Aminuteman's real local competitive set (Veda Aeronautics, Solar Defence) has
  **no purpose-built site at all**. This means the actual comparison set a Indian
  procurement evaluator will make is not "Aminuteman vs. other Indian drone
  startups' websites" but "Aminuteman vs. a LinkedIn page and a conglomerate
  subpage." The site itself is close to a unique credibility asset in this specific
  market segment right now — worth stating plainly to Codex so effort isn't spent
  chasing competitors who aren't actually threats on this axis. **[C, D]**
- Shield AI's named-program social-proof pattern (specific platform + specific
  partner + one-line description, as a card, not a logo) is directly adoptable for
  Aminuteman's own verified achievements (iDEX ADITI, Surya Dronathon 2025, the
  partner list) — and the site's existing `TrustBar`/`PressStrip` primitives already
  point this direction; the opportunity is making sure every trust claim on the site
  follows this specific-attribution pattern rather than a bare logo, matching what
  session 13 already started.
- None of the fetched references use a live 3D model viewer or a real-geometry hero
  flythrough — Aminuteman's STEP-derived GLB models and `AnkoshaScene` flythrough are
  a genuine differentiator versus this reference set, not just versus generic
  templates. Worth protecting, not diluting, in any future redesign pass. **[C]**

## What increases comprehension

- **Evidenced [B]:** Named, specific claims (platform names, partner names, dated
  events) rather than generic capability language — visible as the dominant pattern
  across every fetched reference and consistent with what Nielsen Norman Group's
  general findings on scannable, specific web copy would predict, though no
  Aminuteman-specific or defense-sector-specific NN/g study was located to cite
  directly; treat the NN/g alignment as directional, not as sourced evidence for
  this exact claim.
- **Observed [C]:** Section-level numbering/labeling (Skylark's 01-06, Aminuteman's
  own existing convention) gives a reader a sense of total scope and progress
  through a long page without requiring a nav interaction.
- **Inferred [D]:** For a technically literate, skeptical evaluator, a spec table
  with explicit "CLASSIFIED / ON REQUEST" states (which Aminuteman's `SpecTable`
  already implements) likely reads as more credible than omitting the row entirely,
  because it signals the company knows exactly what it's withholding and why, rather
  than appearing to not have the information.

## What increases trust

- **Observed [C]:** Specific, attributed relationships (Shield AI's named DARPA/GA/
  Kratos programs; Aminuteman's own existing named-partner + relationship-basis
  approach) consistently outperform anonymous logo walls in every reference that
  uses both patterns side by side (Skylark has both, and the named press mentions
  read stronger than the logo grid).
- **Observed [C]:** A restrained, disciplined palette correlates with a "considered"
  read across Avalonch, Skylark, and Anduril (secondary source); the conventional
  full-color corporate sites (Adani, Boeing) don't read as less credible, but they
  read as a different register entirely — "large institution" rather than
  "specialist." Given Aminuteman's actual size and stage, the specialist register is
  the more honest one, not just the more fashionable one.
- **Inferred [D]:** Real, licensed, attributed photography of relevant hardware
  (which prior Aminuteman sessions already prioritized, including rejecting three
  candidate photos on provenance grounds per `PRODUCT_AUDIT.md` §4) is more
  persuasive to a technically literate buyer than any render or stock image would
  be, because this buyer segment is specifically trained to notice generic imagery.

## What increases exploration

- **Observed [C]:** A sparse top-level nav with a deep, well-labeled mega-menu
  (present at every fetched site except Adani's flatter dropdown) lets a visitor
  self-select into the one relevant area without scanning an intimidating flat list
  — this matches Aminuteman's own four-group nav (Valley / AI / Systems / Company).
- **Inferred [D]:** Numbered sections with descriptive labels (not just "Section 3")
  give a scanning reader permission to skip to the numbered area relevant to their
  role (e.g., a procurement evaluator skipping straight to a spec-bearing section)
  without reading linearly — this is a plausible mechanism, not something measured
  on this specific site.

## What should NOT be copied

Explicitly checked against `PRODUCT_AUDIT.md` §8's locked constraints:

- **Adani's and the primes' nav density and footer link count** — would contradict
  nothing in §8 directly, but would work against the "restrained" positioning and
  manufacture false institutional scale Aminuteman doesn't have. Not recommended.
- **Any logo-wall-only trust pattern** — directly conflicts with the site's own
  already-decided position (§4, session 13: naming relationship basis over
  reproducing marks). Do not regress to a bare logo grid even if it would be faster
  to build.
- **Autoplaying ambient hero video used as texture rather than evidence** (Adani's
  pattern) — conflicts with the existing discipline of only using video/motion that
  carries information (§8: "no decoration that doesn't carry information").
- **A second chromatic accent color for any reason** (e.g., a status-green or
  info-blue promoted to equal weight with the orange accent) — every restrained
  reference in this set (Avalonch, Skylark, Anduril) enforces exactly one accent;
  introducing a second would be a regression against both the reference set and
  Aminuteman's own §8 constraint.
- **Superlative capability language** ("leading," "world-class," "best-in-class") —
  appears nowhere in any fetched reference's hero copy either; this isn't only an
  Aminuteman-specific rule, it's consistent with how every credible reference in
  this set actually writes.

---

**Next:** `INFORMATION_ARCHITECTURE.md` (Phase 2) and `DESIGN_SYSTEM.md` (Phase 3),
which should treat this research as confirming and refining the current system
(one accent, named/specific trust signals, sparse-nav-deep-menu, numbered sections)
rather than as license to redesign it.
