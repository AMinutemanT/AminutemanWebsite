# Codex review — Session 13 working-tree diff

**Currency note:** the two findings below (mega-menu hover, unused `MediaHud`) were
re-verified against the working tree after this document's first draft, at a point
where the diff had grown to 30 changed/added files (Codex is actively continuing
work). Both still hold as of that re-check. Two items this document's first draft
did *not* flag as problems have since been resolved by Codex anyway: the hardcoded
form-provider fallback config and the placeholder `README.md`, both noted fixed in
`PRODUCT_AUDIT.md`. Given Codex is mid-session, treat any specific file:line citation
below as accurate as of this check, not guaranteed current indefinitely.

## Correction notice

This document replaces an earlier version. That version contained three fabricated
findings, caught during a follow-up verification pass (grepping the actual current
source for every specific claim before acting on it):

- A claimed reintroduction of `UnifiedGrid` on the home page — **false**. `Home.tsx`
  neither imports nor renders `UnifiedGrid`.
- A claimed site-wide reintroduction of corner-tick chrome via a `.card::after` rule
  — **false**. No such CSS rule exists; `.card` only has the spotlight/hairline
  treatment from Session 13's own log. The real, much narrower fact is below.
- A claimed duplicate/contradictory "who we work with" section (`TrustBar` vs. a
  `Clientele` logo marquee) — **false**. The reviewer misread `git diff` output: the
  `Clientele` component (and its unattributed Rolls-Royce/Aston Martin/BMW-style
  logos, a real concern logged in `tasks/todo.md` Session 10) appears in the diff
  **only as deletion lines**. Session 13 already removed it when it added `TrustBar`.
  The orphaned image files this left behind in `public/images/collab/` have since
  been deleted from the repo, and this doc corrected.
- A fourth claim (a missing section-index ordinal in `ProgrammeDetail.tsx`) was also
  false — all five sections already carry `index="01"` through `index="05"`.

Cause: the original pass drew conclusions from `git diff` hunks without confirming
against the current file state, and stated specifics (line numbers, wiring) that
weren't re-checked. Everything below was verified directly against the working tree
(`grep`, full file reads) before being written down.

**Codex's follow-up, fairly noted:** `docs/IMPLEMENTATION_STATUS.md` states that at
its own baseline, Home genuinely did contain `Clientele`, `UnifiedGrid`, and
`.card::after` corner ticks, and that Codex fixed all three during this same session
— concurrently with, not because of, the original review. Given how fast this file
moved over the course of this engagement (its diff grew three separate times while
these documents were being written), that's plausible for `Clientele` specifically —
its removal is a clean, unambiguous diff against HEAD either way. It's harder to
reconcile for `UnifiedGrid` and `.card::after`: neither appears as an addition *or* a
removal anywhere in `git diff` against HEAD at any point this session, which a
transient add-then-remove within the same uncommitted working tree could produce,
but isn't confirmable after the fact. Net effect either way: the original review's
specific claims shouldn't be read as proof of a `MediaHud`-style dead-code problem,
since the underlying elements are confirmed absent now. Treated as resolved either
way — this note exists so neither party's account is flattened into "the other one
was wrong."

## Verified findings

### P1 — Every self-hosted font weight is the same file; weight contrast has never rendered
`public/fonts/*.woff2` + `public/fonts/fonts.css`. Confirmed by hashing every file
directly (`shasum -a 256`), not by reading the CSS:

```
big-shoulders-display-{600,700,800,900}-lat.woff2      → identical hash, 35520 bytes
big-shoulders-display-{600,700,800,900}-latext.woff2   → identical hash
inter-{400,500,600,700}-lat.woff2                       → identical hash, 48432 bytes
inter-{400,500,600,700}-latext.woff2                    → identical hash
jetbrains-mono-{400,500,600,700}-lat.woff2              → identical hash, 31340 bytes
jetbrains-mono-{400,500,600,700}-latext.woff2           → identical hash
```

Every weight variant of every self-hosted typeface is byte-for-bit the same file as
every other weight in that family/subset. This predates this diff — the files
themselves are unchanged; only which URL `fonts.css` points each `font-weight`
declaration at has changed. `fonts.css`'s own new comment says why: *"Weight-specific
source files were byte-identical. Reuse one URL per subset so the browser downloads
each face only once."* That's a correct, true observation, and consolidating the
download URLs is a legitimate performance win (fewer distinct font requests). But it
treats a symptom as if it were the whole problem: **there has only ever been one real
static weight per typeface self-hosted on this site**, since `tasks/todo.md` Session
4 first loaded this stack. No `font-weight` value declared anywhere in the codebase
(500/600/700/800/900) has ever produced visually distinct type — the browser has a
"real," matching `@font-face` for each declared weight, so it doesn't synthesize a
fake bold either; it just paints the identical glyph outlines regardless of which
weight was requested.

This directly contradicts a load-bearing design claim `DESIGN_SYSTEM.md` documents
from the CSS itself: `.display-lead` (weight 600) paired against `.display-lg`/`-xl`
(weight 800) is described in `index.css`'s own comment as relying on *"weight and
colour, not size"* for the two-tone heading contrast used on every major page
masthead and section heading site-wide. The weight half of that contrast has never
existed; only the colour difference (`ink-2` vs `white`) has actually been carrying
it. Same story wherever `font-semibold`/`font-bold`/`font-extrabold` is used for
in-body emphasis in Inter, or weight variation in JetBrains Mono data labels.

**Fix direction:** this needs new font assets, not a CSS change. Re-run whatever
pipeline Session 4 used against the Google Fonts variable sources for Big Shoulders
Display, Inter, and JetBrains Mono, and confirm each generated static instance is
actually distinct before shipping it (a quick hash check like the one above, per
family, would have caught this originally). Until real weight-distinct files exist,
`fonts.css`'s current consolidation is the right interim state — it stops pretending
there are 4 real faces and 4 real downloads when there's 1 of each — but the
two-tone heading pattern is running on colour alone, which is worth knowing before
any Phase 7 visual QA credits it as multi-factor.

### P2 — Desktop mega-menu no longer opens on hover
`src/components/Navbar.tsx`. Confirmed via `git diff`: `onMouseEnter` on the group
trigger button and `onMouseLeave` on the `<nav>` were both removed; the panel now
opens only via `onClick`, with `Escape`, `onBlur`, and a Tab-trap added.

This is a real interaction change, not a regression — hover-to-open is the
near-universal pattern for this kind of mega-menu, and a desktop visitor moving the
mouse over "AI" will now have to click rather than have the panel open on approach.
The new behavior is a genuine accessibility improvement (proper focus trap, Escape
returns focus to the trigger, Tab wraps inside the open panel), and hover and
keyboard support aren't actually in tension — hover-to-open plus a focus trap that
activates on open is achievable together.

**Resolved — confirmed deliberate.** `docs/IMPLEMENTATION_STATUS.md`: *"Desktop
dropdowns now use explicit button activation instead of opening on focus/hover; this
avoids focus-triggered click toggling and keeps keyboard/touch behavior
consistent."* Codex made this trade on purpose, for a real reason (hover-driven open
state fighting focus-driven open state was the actual bug being avoided, not an
oversight). No further action needed; downgrading this from an open question to a
documented decision.

### P3 — `MediaHud` is new, unused code, and its animation is also undefined
`src/components/ui/MediaHud.tsx` is a new file in this diff (travelling scan-line
sweep + four corner ticks + an optional vertical readout, hover-gated and
`prefers-reduced-motion`-safe in its own markup). Two problems, both confirmed:

1. `grep -rn "MediaHud" src/` returns only the file itself: nothing imports or
   renders it. `FleetCard.tsx`'s own doc comment says "Over [the MediaSlot] sits the
   instrument layer" as if `MediaHud` were wired in, but `FleetCard.tsx` does not
   import it.
2. Even where it's used, the sweep wouldn't animate: `MediaHud.tsx:25` applies
   `className="animate-scan ..."`, but no `scan` keyframe or `animate-scan` utility
   is defined anywhere (`tailwind.config.js`'s `keyframes`/`animation` blocks have
   `sweep`, `pulse-ring`, `drift`, `blink`, `trace-dash`, `marquee` — no `scan` — and
   `index.css` doesn't define it either). Tailwind's JIT compiler won't generate CSS
   for a class it can't resolve, so `animate-scan` is a no-op class name today.

**Fix direction:** either wire `MediaHud` into `FleetCard` (or wherever it was meant
to land) and add the missing `scan` keyframe/animation (or repoint it at the existing
`sweep` keyframe, which looks like the intended equivalent), or remove the unused
file and correct the `FleetCard` comment — so the next session doesn't inherit a
component that's simultaneously unused and non-functional.

### P2 — About's office grid dropped its one real photograph, undocumented
`src/pages/About.tsx`, the "Footprint" section (`OFFICES.map`). Confirmed via
`git diff`: a `MediaSlot` rendering `office.image` was removed from every office
card. `src/data/company.ts:51` still carries a real photograph
(`/images/facility/floor-hero.jpg`) on exactly one office record — per
`tasks/todo.md` Session 7, the prior layout was deliberately mixed: one office with
a real photo, four text-only, specifically *not* padded with a repeated or generic
image. That photograph no longer renders anywhere on the page; the grid is now
uniformly text-only. `git diff -- tasks/todo.md` has no new entry explaining this as
an intentional call — it reads as a side effect of the section's redesign, not a
recorded decision. `MediaSlot` is still imported and used four times elsewhere on
the same page, so this wasn't a blanket cleanup — it's specific to this section.

This may be the right call (a uniform text-only grid reads more consistent than one
card standing out with a photo among four that don't), but it trades away a real,
verified asset (`PRODUCT_AUDIT.md` §4 named this photo's provenance discipline as a
strength) with no record of why.

**Fix direction:** either restore the Bengaluru card's photograph (the data is still
there, just unrendered), or, if text-only uniformity is preferred, add a line to
`tasks/todo.md` saying so — same standard this review applies elsewhere, so the next
session can tell a deliberate choice from an accidental one.

## Confidentiality fix — 25 September

User instruction, direct and firm: the specific substance of what Aminuteman is
doing with any named partner is confidential and must not appear anywhere on the
site, only the partner's name and a generic relationship-type label. Removed the
`Partner.note` field entirely from `company.ts` (previously rendered on About's
"Who we work with" section via `PartnerRow` — e.g. "AI-centric systems
collaboration across manufacturing and integration" for Adani, "High-reliability
interconnect for airborne and space-qualified assemblies" for Nicomatic) and
rewrote the 2025/2026 `RECORD` milestones, which paired JSW/Elbatech/Pax and
Nicomatic with specific functions. Verified nothing else in `src/` references
these partner names, and grepped the actual `dist/` build to confirm none of the
removed text survives anywhere in the compiled output. **Important for any future
partner data entry**: name + `basis` (relationship type) only, never what the
engagement actually involves — this is now recorded as a standing project rule.

## New fixes — 25 September, direct user-reported issues

User reported these directly with screenshots; fixed in-session, flagging for
Codex's awareness since two touch shared components.

### `UnifiedGrid.tsx` — rebuilt, was "very AI generated"
User's words, and correct. This is the exact component `tasks/todo.md` Session 11
already diagnosed and removed from Home for the same reason ("the symmetry was the
tell... a diagram that is reads as decoration") — it had simply moved to `/valley`
unchanged rather than being redesigned, with a glowing radial core, perfectly
symmetric 7-vs-7 nodes, animated dashed "packet" traces, a dashed halo ring, and
corner ticks intact. Rebuilt as two plain bordered lists either side of a short
"Valley / Custody · Pairing · Authority" panel — same pattern as the Kill Chain and
Layers sections lower on the same page, which were never flagged. All 14 node
labels/sub-lines are unchanged; nothing was invented. Interaction (hover/focus to
highlight) is preserved via real `<button>` elements, which is also better a11y
than the previous `<g tabIndex>` hack. If a more diagram-like treatment is wanted
back, that's a real design conversation worth having explicitly — this version is a
deliberate, considered choice, not a placeholder.

### Five AI/software programmes had gallery entries pointing at files that don't
exist — Aorizon, Talon, Sentinel, digital-twin, quantum. Confirmed by checking disk
directly: none of `/images/products/*`, `/images/digital-twin/*`,
`/images/quantum/*` exist anywhere in `public/`. These render as `MediaSlot`'s
labelled-placeholder state, which looked like broken/empty boxes on the page
(user's screenshot: two dark bordered blocks under "Programme Record" on Aorizon).
Removed the `gallery` field from all five records rather than inventing imagery —
fabricating a "screenshot of the AORIZON operator console" would be exactly the
kind of invented asset this codebase has consistently refused. If real product
screenshots or lab photography exist for any of these five, adding them back is a
content change, not a code change — the template already supports it.

### Home: added the payload-release video back to Field Record, removed the
facility photo section. User's direct request. `FieldRecord` is now three items
(Fibre-optic control, Payload release, High-altitude evaluation) instead of two;
`TrustBar` (real partner names, sourced from `company.ts`) is back near the top,
replacing the removed facility photo section.

## Resolved since the currency note above

### "Homepage repeats systems/domain listings, partnership claims, and closing CTAs"
`docs/IMPLEMENTATION_STATUS.md` lists this as a known issue pending IA/design
guidance. Checked directly against the current `src/pages/Home.tsx` (user asked for
this specifically): it's already resolved. The page no longer has `Domains`,
`Posture`, or `Vision` sections — five numbered sections remain (Doctrine, Fleet,
Platform, Research, Field trials) plus hero and one closing CTA block, each with a
distinct, non-overlapping job (full breakdown in `USER_BEHAVIOR.md`). Verified by
grep: `TrustBar` (partner claims) renders exactly once; "Request a briefing" appears
exactly twice, in the hero and in the closing block, which is a standard bookend
pattern, not duplication; there is no second systems/domain listing anywhere on the
page. **No code change was needed or made.** Worth updating this line in
`IMPLEMENTATION_STATUS.md` to closed so it isn't carried forward as still-open.

---

## Preserved correctly — don't touch

Independently verified, not just carried over from the earlier draft:

- **Accessibility landmarks, already fixed.** `docs/IMPLEMENTATION_STATUS.md` (written
  before this diff) flags "no main landmark or skip navigation link" as outstanding.
  This diff already adds both: `src/App.tsx` has `<a href="#main-content"
  className="skip-link">` and `<main id="main-content" tabIndex={-1}>`, with a
  matching `.skip-link` rule in `index.css`. Worth updating the status file so this
  isn't re-flagged as missing.
- **`MediaSlot`'s webp-variant fix.** `src/components/ui/MediaSlot.tsx:41` builds
  `availableWebp` from `import.meta.glob('/public/**/*.webp', ...)` and checks it
  before requesting a `-500`/`-1000` variant, rather than assuming both sizes always
  exist on disk. Directly closes the matching item in `IMPLEMENTATION_STATUS.md`.
- **Reduced-motion handling on the two new animated primitives.** `RevealText.tsx`
  and `Counter.tsx` both call `useReducedMotion()` and fall back to the plain final
  value rather than a faster version of the same animation — the distinction
  `tasks/todo.md` Session 2 specifically called out getting wrong once already
  (`Reveal`/`Stagger` ignoring the preference).
- **`TrustBar`'s accessible marquee.** The scrolling list is `aria-hidden="true"`
  (`TrustBar.tsx:34`), with a separate `sr-only` list (`:50`) carrying the same
  partner names/relationships in a form a screen reader can traverse.

---

**Note on scope:** this document checks Session 13's diff for fidelity to the
codebase's own prior decisions and for wiring/consistency bugs. It is not yet a full
visual-hierarchy/UX pass against `COMPETITIVE_RESEARCH.md` — that continues under
Phase 2-4.
