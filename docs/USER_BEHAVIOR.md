# User Behavior Model

Phase 6. Qualitative only, per the brief's explicit rule — no invented dwell-time or
engagement statistics anywhere below. Everything is tagged **[E]** (evidenced in
code/content/history), or **[I]** (my inference from the product and audience, stated
as a hypothesis, not a measurement). Builds on the primary persona from
`PRODUCT_AUDIT.md` §2: a procurement/programme evaluator, a partner-company technical
reader, or a candidate — not a self-serve consumer.

## The primary journey: Home → domain → programme → Contact

### 1. What makes the user understand the site?

**[I]** A procurement evaluator arriving at Home needs three things fast: what kind
of company this is, what it actually makes, and whether it's real. The current
structure gets to all three quickly — hero (identity), `TrustBar` right under it
(real named relationships, not a logo wall — established as more comprehension-
building than a generic badge grid per `COMPETITIVE_RESEARCH.md`), then the numbered
`.section-index` rhythm that lets a fast scroller track "where am I in the argument"
without reading linearly (documented in `DESIGN_SYSTEM.md`).

**[E]** The maturity `status` field ("In trials" / "In development" / "Operational")
present on every one of the 10 programmes is the single clearest comprehension aid
for this specific reader — it answers "is this real or a concept" without them
having to infer it from prose tone.

### 2. What makes them trust it?

**[E/I]** Per `COMPETITIVE_RESEARCH.md`'s trust findings: specific, attributed claims
outperform generic ones for this audience. Aminuteman's existing practice already
follows this — named partners with relationship basis (not logos), real licensed
photography with rejected-candidate discipline (`PRODUCT_AUDIT.md` §4), and an
explicit "ON REQUEST" state for figures under confidentiality rather than omitting
the row silently (`SpecTable`). A technically literate evaluator is specifically
trained to notice generic stock imagery or vague capability language — this audience
is the *most* sensitive to exactly the tells this site's design history has been
removing.

**[I]** Trust likely erodes fastest at the first sign of overclaiming or fabrication
— which is why the corrected finding in `CODEX_REVIEW.md` (the near-miss with the
unattributed logo marquee) mattered disproportionately: for this specific audience,
one unverifiable partner logo is a worse trust event than an entire page of plain
typography.

### 3. What makes them continue scrolling/exploring?

**[E]** The numbered-section convention (confirmed in `DESIGN_SYSTEM.md`, and
verified present across all sections of `ProgrammeDetail.tsx`) gives an explicit
sense of total scope — a reader knows there are, say, five sections and can judge
whether continuing is worth their time. **[I]** This matters more for this audience
than for a casual consumer visitor: a procurement evaluator's time-cost calculation
is explicit ("is the rest of this page worth reading") rather than impulsive.

**[E]** Cross-links via each programme's `related` field and the Valley sub-nav let
someone who came in through one entry point (e.g. a specific programme link shared
by a colleague) discover the rest of the site without returning to Home — this
matters because this audience is more likely to land deep (a shared link, a
procurement document citation) than to start at Home.

### 4. What makes them hesitate?

**[I], hypothesis only:**
- A figure marked "ON REQUEST" or "CLASSIFIED" on a spec they specifically need is a
  natural hesitation point — not a defect (the confidentiality ceiling is a real,
  deliberate constraint per `PRODUCT_AUDIT.md` §8), but worth knowing that `Contact`
  needs to make "ask us directly" feel like the obvious next step at exactly that
  moment, not a dead end. Worth checking in Phase 7 whether spec tables link or
  gesture toward Contact near classified rows, or leave the reader to find it
  themselves.
- A reader evaluating whether to trust an early-stage company (`status: 'In
  development'` programmes) may hesitate if development-stage programmes are
  presented with the same visual confidence as operational ones. The maturity pill
  already exists to address this — worth confirming in Phase 7 that it's visually
  prominent enough to actually change how a "In development" programme *reads*, not
  just present as a label.

### 5. What creates cognitive load?

**[E/I]** Relatively little, by design — this is one of the site's stronger
properties. The IA is flat and non-overlapping (`INFORMATION_ARCHITECTURE.md`: four
nav groups, each with one clear job), the token system enforces one accent color so
nothing competes for attention arbitrarily, and prior sessions have repeatedly
*removed* load-adding chrome (symmetric diagrams, tickers, always-on brackets) rather
than added it. The main residual load risk, per `CODEX_REVIEW.md`'s real finding, is
inconsistency introduced by an interaction change (mega-menu hover→click) that a
returning desktop visitor familiar with the old behavior would have to notice and
adjust to — a small, real cost, not a structural one.

### 6. What causes abandonment?

**[I], hypothesis, no data exists to confirm:**
- Broken trust signals (the near-miss just corrected) are the highest-leverage
  abandonment risk for this specific audience — more than slow load or visual
  roughness, because the entire site's value proposition to this reader *is*
  credibility.
- A keyboard-trap or missing landmark (flagged in `IMPLEMENTATION_STATUS.md`, now
  confirmed fixed per `CODEX_REVIEW.md`) would cause hard abandonment for anyone
  using assistive tech or keyboard navigation — not a large fraction of this
  audience by volume, but a real one, and unrecoverable when it happens (they simply
  can't get past the nav).

### 7. What action should naturally happen next?

**[E]** "Request a briefing" → `/contact`, consistently available in the nav on
every page. **[I]** For the procurement/partner audience this is the correct single
next action — there is no self-serve transaction to complete, so the site's whole
job funnels toward a human conversation. For the Careers audience, the form itself
*is* the completion, which is why it correctly sits outside the main CTA funnel
(`INFORMATION_ARCHITECTURE.md`).

## Section-by-section: "what is the user's reason for staying here?"

**Updated to match the current file** — an earlier draft of this table described a
since-removed structure (`Domains`, `Posture`, `Vision` sections). Codex cut those
three between drafts, independently of this document, specifically for section
redundancy (`docs/IMPLEMENTATION_STATUS.md` flagged "Homepage repeats systems/domain
listings, partnership claims, and closing CTAs" as a known issue; verified in-session
that this is now resolved — see `CODEX_REVIEW.md`). Home is currently five numbered
sections plus hero and closing matter **[E, `src/pages/Home.tsx`]**:

| Section | Reason to stay |
|---|---|
| Hero | Establish identity and the primary CTA within one screen |
| 01 Doctrine | The mandate/thesis in one line, plus a path to About for anyone not ready to go deeper yet |
| 02 Fleet | See the actual hardware — the concrete, verifiable part of the pitch — plus the Ankosha flagship given room of its own |
| 03 Platform | Understand the integration argument (Valley) and the three deployable AI products that run on it |
| Statement band | A single real photograph + one line, breathing room between the two card-grid sections above and Research below |
| 04 Research | Verified frontier-model facts and press mentions — named, dated, attributed |
| 05 Field trials | Evidence the hardware has actually flown/been evaluated (real trial footage, dated) — the single strongest proof-of-maturity content on the page |
| Closing CTA | Convert, or exit with a clear final impression |

No section fails the "reason to stay" test in the current structure — each has a
distinct job and none is redundant with another. "Request a briefing" appears
exactly twice, in Hero and in the closing block — a deliberate bookend, not
repetition (confirmed by grep: no other CTA duplication, no other partner mention
beyond the single `TrustBar` call, no duplicate domain/systems listing).

---

**Note on what's still open:** Phase 7 (Final Design QA) is explicitly gated on
Codex considering the site complete — `IMPLEMENTATION_STATUS.md` shows Codex is still
mid-pass (baseline browser inspection, defect repair). Phase 7 should run once Codex
signals it's ready, not preemptively, per the brief's own sequencing.
