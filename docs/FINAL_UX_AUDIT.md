# Final UX Audit

Phase 7. Run now because Codex declared the implementation candidate complete
(`docs/IMPLEMENTATION_STATUS.md`, updated 24 September 2026) and asked for this
document directly. Method: a full code-level audit — every route's source read in
full or in relevant part, the current production build (`dist/`, built 13:04 today)
inspected directly for bundle sizes and prerendered metadata, and font assets
verified by hashing rather than trusting a comment. I did not open a browser myself;
where a finding needs a live render to confirm (true visual rhythm, actual contrast
under real subpixel rendering), I say so and rely on Codex's own browser-verified
numbers, cited as such, not re-claimed as my own observation.

Only actionable findings, prioritized P0-P3 per the brief. Two items below (the
font-weight defect, the section-ordinal gaps) are new discoveries from this pass, not
carried over from `CODEX_REVIEW.md`.

---

## Fixed during this audit

### 1. ~~Font-weight contrast has never rendered, sitewide~~ — fixed
Every self-hosted weight of Big Shoulders Display, Inter, and JetBrains Mono was
byte-identical to every other weight in its family (verified by `shasum -a 256`
across all 24 files, both subsets) — the two-tone heading pattern's weight contrast
had never actually rendered, on any page, since the fonts were first self-hosted.

**Fixed.** Pulled each typeface's true variable-font source from the Google Fonts
repository, instantiated genuine static weights with `fonttools varLib.instancer`
(600/700/800/900 for Big Shoulders Display; 400/500/600/700 for Inter, pinned at its
default `opsz=14`, and JetBrains Mono), subset to the same latin/latin-ext
unicode-ranges already declared in `fonts.css`, and output as woff2. Verified before
installing: every weight's `OS/2.usWeightClass` matches its intended value, glyph
outline bounds genuinely differ between weights (e.g. Inter's "H" spans 1162 font
units at weight 400 vs. 1260 at 700 — a real stroke-width difference, not metadata),
and every weight now hashes distinct from its siblings. Installed into
`public/fonts/`, `fonts.css` regenerated to point each weight at its own file
(undoing the shared-URL consolidation, which is no longer needed or correct now that
the files actually differ), and `npm run build`/`npm run lint` both pass clean
against the result.

Trade-off worth recording: this trades back some of the byte savings Codex's
consolidation achieved, since there are now 24 genuinely distinct files instead of 6
shared ones. That's the correct trade — the consolidation was optimizing away bytes
that were standing in for a real design feature that didn't exist yet.

## P1 — Design/correctness, fixed

### 2. ~~Programme detail pages: section numbering skips numbers on 6 of 10 pages~~ — fixed
`src/components/ProgrammeDetail.tsx` hardcoded each section's `index` ordinal by
section *type* (Capabilities always `"01"`, Variants always `"02"`, Live CAD always
`"03"`, Gallery always `"04"`, Related always `"05"`), but Variants and Live CAD only
render when the programme record has that data. Checked `src/data/programmes.ts`
directly for all ten programmes and found six of ten (aorizon, legacy-systems,
digital-twin, quantum, talon, sentinel) showed a visible break in the sequence —
jumping from "01" straight to "04", or worse — directly contradicting the stated
reason this device exists (`Home.tsx`'s own comment: *"A reader scrolling fast should
be able to tell where they are in the argument from the left edge of the page
alone"*).

**Fixed.** Replaced the fixed per-section-type numbers with a running counter
(`nextIndex()`) computed once per component call, incremented only for sections that
actually render for that programme (`hasVariants`/`hasModel`/`hasGallery`/
`hasRelated`, each checked against the real data). Every programme's visible
sequence is now gapless regardless of which optional sections it has. Verified with
`npx tsc -b` (the `string | undefined` typing on the optional ordinals matches
`SectionHeading`'s existing `index?: string` prop with no type changes needed
elsewhere) and a full `npm run build`.

### 3. ~~Valley's three sub-pages don't use the numbered-section convention~~ — fixed
`ValleyCommandControl.tsx`, `ValleyMissionAutonomy.tsx`, `ValleyPartnerProgram.tsx`
had no `SectionHeading` calls using `index`/`lead`/`stop`, unlike every other page
family on the site (Home, the Valley index page, About, Careers, every programme
detail page).

**Fixed**, split across both sides of this collaboration: `ValleyCommandControl.tsx`
and `ValleyMissionAutonomy.tsx` were brought onto the convention here (each of their
two numbered-worthy sections given `index`, a `lead`/`title` two-tone split matching
the site's existing voice, and `stop`). `ValleyPartnerProgram.tsx` was fixed
concurrently by Codex while this was in progress — confirmed by re-reading the file
before editing it further, rather than assuming it was still in its original state.
All three files pass `npx tsc -b`, `npx eslint .`, and `npm run build` clean together.

## P2 — Worth doing before wide release

### 4. `dist/` bundle sizes (verified directly against today's build)
`Gltf-*.js` is 863,706 bytes (~843 KB) uncompressed — matches
`IMPLEMENTATION_STATUS.md`'s "864 kB" figure, confirmed by direct file inspection,
not just trusted. It's correctly code-split and absent from the homepage's initial
request set per Codex's own capture. No action needed beyond what's already
documented; noted here only so Phase 7 doesn't re-flag it as unverified.

### 5. The site-wide logo asset is a 29.5 KB PNG
`dist/assets/logo-B7Ll5lNO.png` — used via `.brand-logo`'s crop technique in both
`Navbar` and `Footer`, so it's one shared, cached request, not a repeated cost. Still
large for a logotype at its rendered size (8rem × 3.5rem cropped from a much larger
square source). Not urgent, but an SVG or a properly-cropped/re-exported PNG at
actual display resolution would cut this meaningfully for a file loaded on every
single page view.

## P3 — Optional

### 6. Office grid photography (already logged)
Carried from `CODEX_REVIEW.md`: About's office grid dropped its one real
photograph (Bengaluru) without a recorded reason. Restated here only for Phase 7
completeness — no new information since that finding.

---

## What was checked and found correct — don't relitigate

**Accessibility.** Confirmed directly in source, matching Codex's own claims:
`<main id="main-content" tabIndex={-1}>` + skip link (`App.tsx`), `aria-label` on
both the primary and footer `<nav>` elements, breadcrumb `nav[aria-label="Breadcrumb"]`
on Valley and every programme page, `inert` applied to background content
(`main, footer`) while the mobile drawer is open (a genuinely good, modern pattern),
focus trap + Escape + Tab-wrap in the nav, `:focus-visible` outline globally,
`aria-busy`/`fieldset disabled` during form submission, `role="alert"` on form
errors vs. `role="status"` on success, `autoComplete` on form fields, and a global
`prefers-reduced-motion` guard at the CSS layer plus explicit `useReducedMotion()`
checks in the JS-driven animated components (`RevealText`, `Counter`,
`AnkoshaFlythrough`'s static-frame fallback). This is a genuinely thorough
accessibility pass, not a checkbox exercise.

**Routing correctness.** `App.tsx`'s `LegacySlugRedirect` resolves against
`PROGRAMME_BY_SLUG` rather than interpolating raw user input into a redirect target
— confirmed no unvalidated slug can produce an open redirect. `NotFound.tsx` sets
`noindex, follow` and correctly restores the previous canonical tag on unmount
(verified the cleanup function does this, not just the mount effect) — a real,
non-obvious correctness detail that would otherwise leave a stale canonical pointing
at a 404 for the next route the visitor lands on.

**Trust signals.** `TrustBar` sources names and relationship bases from
`src/data/company.ts` directly rather than a separately maintained image folder — no
unverifiable partner claim currently renders anywhere on the site (confirmed by
grep, not just by reading the component). `SpecTable`'s "ON REQUEST"/"CLASSIFIED"
states are used consistently rather than the row being silently omitted. No
superlative language ("leading," "world-class," "best-in-class") found anywhere in
hero copy across any page read for this audit.

**Performance groundwork.** Verified directly against `dist/`: prerendered
route-specific `<title>`/description/canonical tags are present and correct (spot
checked `/systems/ankosha/`), the Gltf/three.js chunk is genuinely absent from the
homepage's own JS entry (it's a separate chunk, loaded only where a model renders),
and no image in `dist/images` exceeds 500 KB. Codex's own local lab measurement
(LCP 2.59s / CLS 0 at simulated 375×812, 1.6 Mbps, 4x CPU slowdown) is reported as a
local lab observation, correctly caveated as not a Lighthouse score or field
guarantee — that caveat is accurate and should be preserved in any future citation
of that number.

**Content model integrity.** All ten programmes carry a `status` field with full
coverage (re-confirmed for this audit). Programme lookups guard against prototype
pollution via inherited object keys (`constructor` etc.) per
`IMPLEMENTATION_STATUS.md`'s own note — confirmed this is a real, sensible defensive
check given `PROGRAMME_BY_SLUG` is built with `Object.fromEntries` and slugs
ultimately come from the URL.

---

## Release readiness

No P0 (broken/unacceptable) findings. All three P1s were fixed during this audit and
verified together with a clean `npx tsc -b`, `npx eslint .`, and `npm run build`. Two
P2s remain (the 29.5 KB logo asset, the unresolved office-photo question) and one
P3 — none of them blocking.

Everything under "Release limits" in `docs/IMPLEMENTATION_STATUS.md` (no deployment
performed yet, provider configuration absent locally, hosting-level checks pending)
is outside this document's scope — that's infrastructure, not design/UX, and Codex's
own accounting of it there is accurate as far as this audit can verify.
