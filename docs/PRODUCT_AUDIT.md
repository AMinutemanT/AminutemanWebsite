# Product Audit

Written by Claude, acting as product/UX/design director. Codex is the implementation
engineer on this repo; this document is Phase 0 of that collaboration
(`docs/IMPLEMENTATION_STATUS.md` shows Codex has already done a technical baseline pass
and is explicitly waiting on this guidance before touching hierarchy/composition).

Evidence markers used throughout: **[E]** = observed directly in this repo (code, data,
git history). **[I]** = my inference, not directly evidenced. Nothing here cites external
user-behavior statistics; that only happens in `COMPETITIVE_RESEARCH.md`, sourced.

---

## 1. Product understanding

Aminuteman Technologies is an Indian defence-hardware and defence-AI company. **[E]**
The site (`src/data/company.ts`, `src/data/programmes.ts`) documents:

- Five physical sites: Pune (HQ/works, Dhanori), Pune (R&D, Akurdi), New Delhi
  (programme office), Bengaluru (avionics/autonomy), and Madhya Pradesh (test and
  integration) — confirmed present in current `OFFICES` by Codex
  (`docs/IMPLEMENTATION_STATUS.md`), correcting this audit's earlier uncertainty.
- Ten live programmes split into two categories: **Systems** (hardware — Ankosha
  loitering-munition family, counter-UAS effector, hypersonics, legacy/manned systems,
  orbital systems) and **AI** (Aorizon fused foundation model, Talon, Sentinel,
  digital-twin, quantum). **[E]**
- **Valley**: a C2/integration platform with three sub-pages (Command & Control,
  Mission Autonomy, Partner Program) — this is the platform thesis, not a product SKU.
  **[E]**
- Partners named: seven domestic (Adani Defence & Aerospace, Alpha Design
  Technologies, Bharat Electronics, Indian Army, JSW Group, Elbatech Group, Pax
  Intelligence) and one international (Nicomatic, France) — `tasks/todo.md` session 10
  records that Airbus/EDGE Group/Akika were deliberately removed. **[E]**
- A confidentiality history: the Sovereign Foundation Model programme's schedule,
  funding, and KPI figures were deliberately scrubbed (session 7) because they were
  under a named customer's competition terms. This means **specificity has a ceiling on
  this site by design** — some things read "ON REQUEST" on purpose, not as an oversight.
  **[E]**

**Inferred positioning [I]:** This is a B2G/B2B credibility site for a company
competing for Indian MoD/Army procurement and partnership relationships (RFI-stage
references to LVCCS, iDEX ADITI mentioned in history), not a consumer or
developer-facing product. The buyer is a procurement officer, a partner-company
technical evaluator, or a potential recruit — not a self-serve purchaser. There is no
pricing, no signup, no dashboard. The entire site is a **qualification and
first-impression instrument**: it has to make a technically literate, skeptical,
security-conscious reader trust the company enough to take a meeting or apply for a job.

## 2. Target users

Inferred from IA and content, not from analytics (none exist) **[I]**:

1. **Procurement / programme evaluators** (Army, MoD, allied primes) — arrive via
   direct link or search, go straight to a specific programme page, read specs, look
   for maturity signals (TRL, "IN TRIALS" vs "IN DEVELOPMENT"), then go to Contact.
2. **Partner-company technical staff** — evaluate Valley's integration story
   (Partner Program page exists specifically for this).
3. **Candidates** — Careers page, resume upload via Cloudinary.
4. **Press / ecosystem** — the Press strip and About "In the room" section exist for
   this audience; low-frequency but reputation-relevant.

No investor or general-public journey is built out, which is consistent with a
privately-held defence contractor rather than a company courting public capital.
**[I]**

## 3. Core user journeys

Read from the nav structure and route table (`src/App.tsx`, `src/data/nav.ts`) **[E]**:

- **Home → domain (Systems/AI) → programme detail → Contact.** The primary
  conversion path. Every programme page and the Valley pages end in a CTA toward
  Contact (needs verification per-page in Phase 7).
- **Home → Valley → Command & Control / Mission Autonomy / Partner Program.** The
  "platform" pitch, for a reader trying to understand what makes this company
  different from a single-product OEM.
- **Home → About → Contact/Careers.** The trust-building path for anyone not yet
  sure the company is real/credible before engaging further.
- **Careers → application form.** Self-contained, does not depend on programme
  content.

## 4. Existing strengths — do not unnecessarily rewrite

This is the most important section of this audit given the brief's instruction to
preserve good existing work. `tasks/todo.md`'s 13 logged sessions show real design
discipline already applied, not template output:

- **Deliberate restraint, iteratively enforced.** Session 6 explicitly *removed*
  decorative chrome (status pills, scanlines, telemetry tickers, corner brackets,
  per-airframe HUD callouts) because it "read as generated rather than designed."
  Session 11 removed a symmetric schematic diagram for the same reason ("real
  architectures are not bilaterally symmetric, and a diagram that is reads as
  decoration"). This is exactly the muscle Phase 4 of the brief asks for — it has
  already been exercised repeatedly on this codebase. **[E]**
- **Real assets over stock/generated.** Session 2 removed Unsplash hotlinks and a
  misattributed Airbus Zephyr photo used for the HAPS programme. Session 12 replaced
  a drawn schematic with GODL-India-licensed photography of in-service Indian Army
  equipment, with attribution in captions, after rejecting three other candidate
  photos for provenance/nationality problems. This is unusually careful sourcing
  discipline for a marketing site. **[E]**
- **A real design system, not ad hoc styling.** Tokens are centralized in
  `tailwind.config.js`: a neutral (non-blue-tinted) black ramp, one chromatic accent
  (`#FF8A00`), an ink ramp corrected for a measured WCAG contrast failure (`ink.dim`
  raised from 3.07:1 to 5.52:1 — session 4). Typography is Big Shoulders Display /
  Inter / JetBrains Mono, self-hosted. One `.card` primitive in `index.css` drives
  spotlight/hairline/corner-tick treatment site-wide via a single delegated
  `pointermove` listener rather than per-card JS. **[E]**
- **Content model, not hand-written pages.** Every programme is one record in
  `src/data/programmes.ts` driving a shared template (`ProgrammePage.tsx` +
  `ProgrammeDetail.tsx`); nav, footer, sitemap, and mega-menu all derive from
  `nav.ts`/`programmes.ts` rather than being maintained in parallel. Adding or
  removing a programme is a data change, not a page rewrite. **[E]**
- **Verification discipline already exists.** Every session ends with
  typecheck/lint/build + a route crawl checking for broken images, console errors,
  and (recently) banned-term/em-dash checks. Codex inherits this convention already
  (`IMPLEMENTATION_STATUS.md` opens with a build/lint baseline). **[E]**
- **Honest placeholders instead of fake content.** `MediaSlot` renders a labelled
  "drop imagery here at `<path>`" placeholder rather than stock art when a photo is
  missing (e.g. legacy-systems hero, several achievement images). This is the
  opposite of the fabricated-testimonial/fake-metric failure mode the brief warns
  against in Phase 7. **[E]**

**Conclusion for Codex:** the visual language, token system, and content architecture
are already sound and specific to this product. The highest-risk failure mode for this
engagement is a director role that overrides this considered work with generic
"modern SaaS" conventions. Guidance in later phases should refine and fill gaps, not
replace the system.

## 5. Existing weaknesses

Verified in code, not just claimed by Codex's own status file **[E]**:

- **No `<main>` landmark and no skip-navigation link.** Grepped `App.tsx`, `Navbar.tsx`,
  `Home.tsx` for `<main`/`role="main"`/skip patterns — none found. Confirmed as a real
  defect, matching what Codex's status file flagged.
- ~~**Hardcoded credential-shaped fallbacks in source.**~~ **Fixed by Codex since this
  audit was written.** `src/utils/cloudinary.ts` no longer has fallback values;
  it now exports `enquiryFormAvailable`/`applicationFormAvailable` booleans and
  throws explicit errors when unconfigured, and `README.md` documents the required
  `VITE_*` env vars and states "No fallback service accounts are embedded in
  source." Verified directly against current source, not carried over stale.
- **Confirmed large diff sitting uncommitted.** `git diff --stat` shows 21 modified
  files (1,101 insertions / 522 deletions) plus 9 new untracked `src/components/ui/*`
  files and a new `hero-loop.{mp4,webm,jpg,webp}` asset set — this is
  `tasks/todo.md` "Session 13" (the Skylark Labs restructure), not yet committed to
  git. This is a real, immediate Phase 5 review target, separate from anything new
  Codex builds going forward.
- **`three.js` GLTF chunk is 864 kB uncompressed** (`tasks/todo.md` session 13 "Open"
  note), pre-existing and already code-split behind the lazy 3D components, but
  unverified against a real Lighthouse/perf run in this audit.
- **No automated test suite.** Verification today is manual (typecheck/lint/build +
  a scripted headless crawl). Fine for a site this size, but regressions in
  interaction logic (form validation, nav keyboard behavior) rely entirely on someone
  remembering to check by hand.
- **Design-system documentation lives only in `tailwind.config.js` comments and
  `tasks/todo.md` narrative**, not in one reference doc. `DESIGN_SYSTEM.md` (Phase 3)
  will fix this — Codex currently has to reconstruct the system by reading commit
  history rather than a spec.

## 6. Missing functionality

Read against the two user journeys above **[I]** unless marked [E]:

- No search or filtering across ten programmes plus Valley — not yet a problem at
  this content volume, but worth a "not worth building" call now (see §9) rather than
  silently adding it later.
- No mechanism to distinguish live/trial-proven claims from planned/conceptual ones
  beyond a status pill per programme — worth confirming this pill is used
  consistently across all ten programme records before Phase 7. **[E, partially:
  the pill exists in `SpecTable`/programme data; consistency not yet verified.]**
- ~~`README.md` is corrupted/placeholder~~ **Fixed by Codex since this audit was
  written** — now a real, accurate project README covering setup, forms
  configuration, verification, deployment, and a pointer to `docs/` for design
  guidance. Verified directly against current source.

## 7. Technical constraints

**[E]**, from `package.json` and repo state:

- Vite 7 + React 18 + TypeScript + Tailwind 3 + Framer Motion 11 + React Three
  Fiber/drei/three for the 3D hero and model viewers. No server framework — this is a
  static SPA with a build-time SEO prerender step (`scripts/build-seo.mjs`).
- No CMS. All content is TypeScript data files, hand-edited. This is appropriate at
  current content volume (10 programmes) and should not be replaced with a CMS
  without a real editorial-frequency reason.
- Git repo has only 19 commits total for what `tasks/todo.md` describes as 13 work
  sessions — most work has been committed in large multi-session batches, and a
  substantial chunk (Session 13) is currently uncommitted working tree state, not a
  branch. Any review/handoff process should account for the fact that "the branch"
  and "the working tree" are not the same thing right now.
- `render.yaml` present — deployed via Render, not Vercel (a Vercel CLI reference in
  `tasks/todo.md` session 10 was apparently abandoned in favor of Render).

## 8. Design constraints

**[E]**, largely self-imposed by prior sessions and worth stating explicitly so Codex
and I don't relitigate them:

- Tone: institutional, restrained, dark. Military first, civilian never. No
  superlatives ("best/leading/world-class" banned).
- One chromatic accent only (`#FF8A00`); black ramp stays neutral, not blue-tinted.
- No decoration that doesn't carry information — corner brackets, scanlines,
  telemetry tickers, and symmetric diagrams have each been tried and explicitly
  removed for reading as "generated."
- Every image on the site must be real (company-owned photography/CAD, or properly
  licensed and attributed third-party photography of equipment the company doesn't
  own but is discussing) — never stock, never AI-generated, never hotlinked.
- Confidentiality ceiling: some figures are permanently "ON REQUEST" and must stay
  that way regardless of how much better a specific number would read.

## 9. Highest-impact improvements

Prioritized for what actually moves trust/comprehension for the identified users, not
generic polish **[I]**, building on verified weaknesses in §5:

1. **Accessibility landmarks and keyboard nav** (`<main>`, skip link, mobile menu
   Escape/focus trap) — P0/P1 class, cheap, and a procurement evaluator or accessible-
   tooling reviewer hitting a keyboard trap is a credibility failure, not a cosmetic
   one.
2. **Land Session 13's uncommitted diff properly** — it's a real structural upgrade
   (Skylark Labs-referenced masthead, card system, hero video) sitting unreviewed and
   uncommitted. Reviewing and committing it is higher leverage right now than any new
   design work, since it's already built.
3. **Fail loudly, not silently, on missing form config** — replace the hardcoded
   Cloudinary/Web3Forms fallbacks with an explicit error/log path so a misconfigured
   deploy is caught in the browser console or CI, not discovered when a job
   applicant's resume vanishes.
4. **One reference `DESIGN_SYSTEM.md`** so Codex stops reconstructing the system from
   `tailwind.config.js` comments and todo-history narrative (Phase 3, forthcoming).
5. **Verify the maturity-status pill (TRL / IN TRIALS / IN DEVELOPMENT) is present
   and consistent across all ten programmes** — this is the single strongest trust
   signal available to a procurement evaluator and is worth confirming it isn't
   missing anywhere before investing in anything else visual.

## 10. Things NOT worth spending time on

Explicit per the brief's "don't endlessly iterate on low-impact details" and "don't
add features because they're fashionable" rules **[I]**:

- **No CMS migration.** Ten programmes, edited rarely, by people who can write
  TypeScript records — a CMS adds infrastructure without solving a real problem.
- **No search/filter UI** for ten programmes — a flat, well-grouped mega-menu already
  serves this volume; revisit only if the programme count roughly doubles.
- **No investor-relations or general-public storytelling section** — not evidenced
  as part of this company's actual audience from the content model; would be
  speculative scope addition.
- **No automated visual-regression/E2E suite build-out** in this engagement — the
  existing manual typecheck/lint/build/crawl discipline is adequate at this size and
  churn rate; a real test suite is a good idea but is a distinct, separately-scoped
  investment, not part of a 9-10 hour design/UX pass.
- **No redesign of the token/type/color system.** It is already coherent, licensed
  from a specific reference (Avalonch), measured for contrast, and has survived
  multiple rounds of deliberate simplification. Phase 3 will document it, not replace
  it.

---

**Next:** `COMPETITIVE_RESEARCH.md` (Phase 1) will focus specifically on Indian/global
defence-tech and adjacent high-trust B2G sites, not generic "best websites" — and on
Phase 5, reviewing the concrete Session 13 diff already sitting in the working tree,
since that is real, immediately actionable work rather than a new proposal.
