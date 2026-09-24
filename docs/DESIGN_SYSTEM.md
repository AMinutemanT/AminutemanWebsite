# Design System

Phase 3. This is the one reference document `PRODUCT_AUDIT.md` §5 identified as
missing — Codex previously had to reconstruct the system from `tailwind.config.js`
comments and `tasks/todo.md` narrative. Everything below is documenting what already
exists and is confirmed working (`tailwind.config.js`, `src/index.css`), not proposing
a new system. Per `PRODUCT_AUDIT.md` §10 and `COMPETITIVE_RESEARCH.md`'s conclusion,
this token system is already in the right family as the strongest references in the
category (Anduril: one neutral ramp + one accent; Avalonch: the literal source of
these tokens) — it should be extended and filled in, not replaced.

## Design philosophy

Institutional, restrained, dark. Military first, civilian never. No superlatives. The
governing test, stated repeatedly across `tasks/todo.md`'s 13 sessions in different
words: **does this element carry information, or is it decoration performing
"technical"?** Every removal in the site's history (scanlines, tickers, symmetric
diagrams, always-on corner brackets) failed this test. Every element that survived
carries a real state (a spec value, a maturity status, a partner relationship, a
real photograph).

## Color

**[E]**, `tailwind.config.js`:

| Token | Value | Role |
|---|---|---|
| `void` | `#000000` | Base background |
| `abyss` | `#060608` | Media-frame background (`MediaSlot`, `ModelViewer`, programme hero panels) — the "letterbox" tone behind imagery/3D, distinct from `panel` |
| `panel` | `#0A0A0C` | Card/panel surface |
| `steel` | `#16161A` | Raised surface |
| `line` / `line-bright` | `#1F1F24` / `#2A2A30` | Hairline borders, default / hover |
| `accent` / `accent-soft` / `accent-deep` | `#FF8A00` / `#FFAE42` / `#FF7A3F` | **The only chromatic accent.** CTAs, active states, focus rings, data highlights |
| `signal` | alias of `accent` | Kept for existing call sites; do not introduce as a second distinct hue |
| `nominal` | `#5DFF6A` | Status: good/operational |
| `critical` | `#FF5A5A` | Status: fault/critical |
| `info` | `#5AB6FF` | Informational only, demoted below accent — do not promote to equal visual weight (session 4 explicitly demoted blue from its former primary role) |
| `ink-0..3`, `ink-dim` | `#FFFFFF` → `#82828B` | Text ramp. `ink-dim` was deliberately raised from `#5A5A62` (3.07:1) to `#82828B` (5.52:1) to pass WCAG AA for small mono labels — **do not darken this token back down** |

**Rule, non-negotiable per `PRODUCT_AUDIT.md` §8 and confirmed by every restrained
reference in `COMPETITIVE_RESEARCH.md`:** exactly one chromatic accent. `nominal`,
`critical`, and `info` are status semantics, not a second brand color — they appear
only attached to a real state (a spec row, a form error), never as decoration.

## Typography

**[E]**, `tailwind.config.js` + `index.css`:

- **Display:** Big Shoulders Display, self-hosted, declared at weights 600-900. Used
  for all headings (`h1-h3` default to `font-display` at the base layer). Extra-bold,
  uppercase, tight negative tracking (-0.02 to -0.03em), tight leading (0.86-0.95).
- **Body:** Inter.
- **Mono:** JetBrains Mono — reserved for "instrument" text: eyebrows, data labels,
  spec values, designations, nav labels. Never used for body copy or headings.

**Known defect, verified by hashing every font file directly (`CODEX_REVIEW.md`):**
every declared weight of all three typefaces is currently the same physical file —
there is exactly one real static weight self-hosted per family, not the 600-900 (or
400-700) range the CSS declares. No `font-weight` value anywhere on the site
currently produces visually distinct type. The `.display-lead` vs `.display-lg`/`-xl`
pairing below is written as if it relies on weight *and* colour contrast (matching
`index.css`'s own comment) — in the shipped site today it is running on colour alone.
Treat every "weight" reference in this document as the declared intent, not a
confirmed visual result, until new correctly-generated font files land.

**Composed classes** (`index.css` `@layer components`), already built and ready to
reuse rather than re-derive per page:

- `.display-xl` / `.display-lg` / `.display-md` — the three heading scale steps.
- `.display-lead` / `.display-lead-xl` — the lighter, `ink-2`-colored upper line of a
  two-tone heading, sized to pair with `.display-lg` and `.display-xl` respectively.
  **Use the matching pair** (`-lead` with `-lg`, `-lead-xl` with `-xl`) — the doc
  comment in `index.css` explains why: at the `-xl` scale, `.display-lead` alone
  reads as a caption, not a first line.
- `.eyebrow` — mono, uppercase, ultra-wide tracking, `accent-soft/80`. The small
  label above a section heading.
- `.section-index` — the ghosted numeral (white at 7% opacity) behind each numbered
  section. This is the site's signature wayfinding device (Home's own comment: *"A
  reader scrolling fast should be able to tell where they are in the argument from
  the left edge of the page alone"*) — every top-level section on every major page
  should carry one; `CODEX_REVIEW.md` confirms `ProgrammeDetail.tsx` already does,
  across all five of its sections.
- `.data-label` / `.data-value` — mono key/value pairs for specs and telemetry-style
  readouts.

## Spacing, grid, layout

**[E]:**

- Content container: `.container` in `index.css`, `max-width: 92rem` (1472px),
  responsive side padding from `1rem` to `4rem`. This is the one container class —
  don't introduce a second max-width convention.
- `.section` — vertical rhythm unit, `py-20 sm:py-28 lg:py-32`. Every major page
  section should use this rather than a bespoke padding value.
- Breakpoints (custom, not Tailwind defaults): `xs 320 / sm 481 / md 769 / lg 1025 /
  xl 1280 / 2xl 1536`. Note these are offset by 1px from round numbers — this is
  intentional (avoids the common off-by-one where a device at exactly 480px or
  1024px falls into the wrong bucket) and should be preserved if breakpoints are
  ever touched.
- Grid backdrop: `body::after` in `index.css`, a fixed 96px hairline grid at 3%
  white opacity, masked to fade out toward the bottom of the viewport. This is
  intentionally near-subliminal (session 6 dropped it from 30-60% down to 12-20%,
  now effectively ~1.5% given the 0.5 opacity multiplier on the 3% lines) — texture,
  not diagram. Do not increase its visibility; that is the exact failure mode
  earlier sessions corrected.

## Borders, radius, shadows

**[E]:**

- Radius: effectively **none**, with one deliberate exception. `.pill` (the hero
  eyebrow chip) is the only `rounded-full` shape on the site, and its own doc
  comment states why: *"it is a control, and it should not be mistaken for the
  square instrument chrome around it."* Every other surface — cards, panels,
  buttons, inputs — is square-cornered. **Do not add rounded corners elsewhere**;
  it would erase the one signal `.pill` currently carries.
- Borders: hairline only (`border-line` / `border-line-bright`), never a heavy or
  colored border except the accent rule that draws in on card hover.
- Shadows: none observed in the token system or component CSS. Depth comes from
  border-color/background-opacity shifts on hover (`.card:hover`), not elevation
  shadows. Consistent with the "restrained" positioning — don't introduce
  box-shadow-based elevation.

## Cards

**[E]**, `index.css` `.card` + `SpotlightCard.tsx` + `useCardSpotlight.ts`:

The card system is a single primitive that every grid on the site opts into via one
class: quiet base state (hairline border, `panel/40` background), a cursor-tracking
radial spotlight, and an accent rule that draws across the bottom edge on hover/focus
— all driven by one delegated `pointermove` listener on `window` (not per-card
listeners), skipped entirely on coarse/touch pointers. This is efficient and correct;
extend it, don't duplicate it. `SpecTable` and `PressStrip` deliberately opt out of
the card treatment (they're data surfaces, using the plain `.hairline` treatment
instead) — that distinction (card = a clickable/explorable unit, hairline = a data
table) is worth preserving when building new components.

**Not part of `.card` itself, and should not be assumed present:** corner-tick
"instrument" chrome. `CODEX_REVIEW.md` confirms no such rule exists on `.card` today
— it exists only inside `MediaHud.tsx`, currently unused, scoped to media
frames specifically (where an instrument-reading-a-feed metaphor has some
motivation), not to generic content tiles.

## Buttons and forms

**[E]:** `.btn-primary` (filled accent, void text), `.btn-secondary` (outlined,
accent on hover), `.btn-ghost` (borderless). One filled/primary button visible at a
time in any given chrome region (the navbar's "Request a briefing" is the only
`.btn-primary` in the nav) — don't introduce a second competing filled CTA in the
same view. `.form-input` is the one input treatment: transparent fill, hairline
border, accent border + slight fill lift on focus.

## Motion

**[E]:** Framer Motion for scroll-reveal and page transitions; a small set of CSS
keyframes in `tailwind.config.js` (`sweep`, `pulse-ring`, `drift`, `blink`,
`trace-dash`, `marquee`) plus `index.css` (`rise-in`, `scroll`). All CSS animation is
disabled globally under `prefers-reduced-motion: reduce` (`index.css:374-383`,
`animation-duration: 0.01ms !important`) — this is a blanket, correctly-implemented
guard; individual components (`RevealText`, `Counter`) additionally use
`useReducedMotion()` from Framer Motion for JS-driven animation, which the CSS
media-query guard can't reach. **Any new animated component must do the same
two-part check** (CSS guard is automatic; JS-driven motion needs the explicit hook).

Motion rule, carried from `PRODUCT_AUDIT.md` §8: motion must carry information (a
counter reaching its real value, a reveal establishing reading order, an accent rule
confirming an interactive state) — never ambient/decorative looping for its own sake.
`.animate-scroll`'s partner marquee is a borderline-acceptable exception because it
carries real content (partner names) and pauses on hover/is duplicated in an
accessible list — not because looping motion is generally fine.

## Responsive breakpoints (component-level)

**[E]:** the mega-menu's hover/click divergence between desktop (`lg:` and up) and
the mobile drawer (below `lg`) is the main structural responsive branch in the
system; most other components respond via Tailwind's stacked-to-grid utility
patterns (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` etc.) rather than separate
mobile/desktop component trees. Continue that convention — don't introduce a second
divergent component tree unless a pattern (like the mega-menu) genuinely can't be
expressed as one responsive component.

## Gaps this document does not paper over

One real, small inconsistency worth a deliberate decision rather than silent drift,
confirmed while writing this document:

- `MediaHud`'s corner-tick/scan-sweep language and `.brackets` (an unused two-corner
  utility class already present in `index.css` before this diff) are two different,
  currently-dead implementations of a similar "instrument corner" idea. If that
  motif is wanted anywhere, pick one implementation and remove the other rather than
  carrying both forward.

---

**Next:** Phase 4 (human-design test) and Phase 6 (user behavior model) apply this
system and the IA to a walk-through of the actual live pages.
