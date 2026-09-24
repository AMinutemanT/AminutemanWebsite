# Humanization Review

Review of the site as it stands after Codex's 25 Sep typographic pass, against the
question: *would a defence procurement professional, an aerospace engineer or a
technical investor believe these people actually build things?*

Reviewed at commit `cfa81cc` plus Codex's uncommitted working-tree changes
(22 files, +303 / −698). Screenshots taken at 1440px and 390px with
`prefers-reduced-motion` forced, so scroll-revealed content renders in place.

---

## Verdict

**The typographic problem is substantially solved.** Codex moved `h2`/`h3` off the
condensed display face onto sentence-case Inter, dropped the accent-coloured full
stop, removed the wide-tracked mono eyebrow, and lowercased the `title` props so
the two-part headings now concatenate into real sentences — "Who we work with.",
"The unified grid.", "How an engagement closes." The Valley page in particular now
reads as a document written by someone who understands the problem.

**What remains is no longer mostly a design problem.** The highest-severity items
below are factual and contractual, not stylistic. A procurement reader will not
bounce off this site because of its typography; they will bounce off an airframe
published as operating 3,800 m above its own stated service ceiling, and off a
`gmail.com` address in the footer.

This document therefore ranks by *what costs credibility*, not by what looks
generated.

### What must not be touched

Carried forward from `docs/PRODUCT_AUDIT.md` §8 and `docs/COMPETITIVE_RESEARCH.md`
— these are deliberate, defended decisions, and re-opening them would be the
failure mode `PRODUCT_AUDIT.md:122-126` warns about:

- Named partners with a relationship `basis`, never a logo wall.
- One chromatic accent (`#FF8A00`). A second accent is a regression.
- `ink-dim` stays at `#82828B` (5.52:1 WCAG AA).
- Square corners except `.pill`; no shadows, no elevation.
- The grid backdrop stays near-subliminal.
- `UnifiedGrid` stays two plain bordered lists.
- `ON REQUEST` / `CLASSIFIED` spec rows stay as they are.

Also protect the writing. These are the best lines on the site and they read as a
working engineer, not a copywriter:

| Location | Line |
|---|---|
| `programmes.ts:242` | "…a system costing lakhs is routinely spent on a threat costing thousands, and the side with the cheaper magazine wins by arithmetic alone." |
| `programmes.ts:355-356` | The Operation Sindoor paragraph, and "A gun does not need to be replaced to be scheduled…" |
| `programmes.ts:439` | "We publish where the programme is, not where it will be." |
| `programmes.ts:703` | "…expected to work perfectly, once, on a day nobody scheduled." |
| `Valley.tsx:196` | "The track existed. The magazine existed. The path between them did not." |
| `ValleyMissionAutonomy.tsx:132` | "An autonomous system that needs its link is a remotely piloted one with extra steps." |
| `ValleyPartnerProgram.tsx:59` | "Uncertainty is required, not optional. The grid cannot fuse a claim it cannot weigh." |
| `About.tsx` PRINCIPLES | "A machine may propose; a human commits." |

---

## P0 — Seriously damages credibility

### 1. Ankosha operates 3,800 m above its own service ceiling

**Location** `src/data/programmes.ts:166-167`

```
{ label: 'Operating altitude', value: '29,000 ft', note: 'Launch altitude to 15,000 ft AMSL' }
{ label: 'Service ceiling',    value: '5,000 m AMSL', note: 'Without payload' }
```

**Problem** 29,000 ft is 8,839 m. The stated service ceiling is 5,000 m
(16,404 ft). The aircraft is published as operating 3,839 m above the altitude it
is published as being unable to exceed. The two figures are also in different
units, which is how the contradiction survived.

**Why it damages credibility** This is the first thing a flight-test or airworthiness
reader checks, and it is checkable in four seconds without leaving the page. It
converts every other figure in the table into a number that has to be verified
rather than read.

**Recommended change** Decide which figure is real and delete or correct the other.
Express both in the same unit. If 29,000 ft is a launch-and-glide profile rather
than a powered operating altitude, say so in the note.

---

### 2. "Aural signature: Not detectable"

**Location** `src/data/programmes.ts:177`

```
{ label: 'Aural signature', value: 'Not detectable', note: 'Loitering at 200 m overhead' }
```

**Problem** An absolute, unfalsifiable claim, on an airframe whose powerplant is a
heavy-fuel rotary engine (`:168`). It is disproved by one person standing on a
range with a sound level meter.

**Why it damages credibility** Every other row in this table is disciplined — the
site uses `ON REQUEST` and `CLASSIFIED` honestly elsewhere, and `programmes.ts:11-12`
states the editorial policy explicitly. This one line breaks that policy and makes
the discipline look like presentation rather than principle.

**Recommended change** Replace with a measured figure and its condition
(`"dB(A) at 200 m AGL — ON REQUEST"`), or delete the row. The site's own rule
already covers this case.

**Priority** P0.

---

### 3. "Including battery" on a heavy-fuel rotary-engine aircraft

**Location** `src/data/programmes.ts:160` against `:168`

**Problem** `'Max take-off mass', 'Under 135 kg', note: 'Including battery'` — but the
powerplant row is a heavy-fuel rotary engine. The note is residue from an earlier
electric configuration. On a combustion airframe the mass note should reference
fuel.

**Why it damages credibility** It reveals the spec table as edited rather than
derived. A reader who spots it stops treating the table as a mass statement.

**Recommended change** Change to fuel state (`'Including full fuel and 20 kg warhead'`)
or drop the note.

---

### 4. A `gmail.com` address is published as a company contact

**Location** `src/components/Footer.tsx:52`, and `index.html` structured data
(`contactPoint.email`)

**Problem** `aminutemantechnologies@gmail.com` appears in the footer *beside* the
corporate `admincontrols@aminutemantechnologies.com`, and is the sole address in the
Organization schema. The schema also sets `contactType: "customer service"`.

**Why it damages credibility** For a company asking to be trusted with munitions
programmes and end-user certification, a free consumer mailbox is the single
cheapest negative signal on the site. Listing both addresses is worse than listing
either alone, because it invites the question of which one is actually monitored.
`"customer service"` is a generic-schema default that does not describe any
relationship this company has.

**Recommended change** Remove the gmail address from both the footer and the
structured data. Use the corporate domain only. Set `contactType` to `"sales"` and
add a second `contactPoint` for the programme office if the distinction matters.

---

### 5. Valley is "Operational" while everything it is made of is "In trials"

**Location** `src/pages/Valley.tsx:81`, `:169`, `:182-183`; against `programmes.ts:821`
(Aorizon), `:915` (Talon), `:978` (Sentinel)

**Problem** The Valley masthead carries `Operational` and "Deployed on customer
infrastructure". `Valley.tsx:388` states Valley reaches a customer as three products.
All three of those products are `In trials`. `ValleyMissionAutonomy.tsx` is also
`In trials`.

**Why it damages credibility** An operational platform composed entirely of systems
in trials is not a status, it is a contradiction — and it is visible by clicking two
links. It also sits directly under the most prominent status tag on the site.

**Recommended change** Either qualify the Valley status (`"In trials — first
deployment on customer infrastructure"`) or reconcile the component statuses. The
phrase "Deployed on customer infrastructure" appears twice on one page
(`:81`, `:169`); once is enough, and only if it is true of a named, dated deployment.

---

### 6. The registered address in structured data is an engineering college

**Location** `index.html`, Organization schema `address`

**Problem** `streetAddress: "Dr. D.Y. Patil Institute of Engineering, Akurdi, Nigdi"`,
while `src/data/company.ts:24-32` gives "Headquarters and works" as Dhanori, Pune
411015. The schema address is the one Google surfaces in a knowledge panel.

**Why it damages credibility** The About page explains the institute co-location
honestly (`company.ts:37` — "co-located with the institute laboratories"), which is a
perfectly good fact. Publishing it as the *registered address* while the site says
HQ is elsewhere reads as either a discrepancy or a virtual office.

**Recommended change** Put the Dhanori works address in the schema as the primary
address and keep the institute as a secondary `location`. Make it agree with the
About page.

---

## P1 — Visibly makes the site feel generated

### 7. One rhetorical move, used 45 times

**Location** Sitewide. Representative: `programmes.ts:362` `'Retrofit, not replacement'`;
`:1015` `'Commander informed, not consumed'`; `ValleyMissionAutonomy.tsx:29`
`'Fails safe, not silent'`; `ValleyCommandControl.tsx:28` `'Effector pairing, not
platform tasking'`; `Valley.tsx:114` and `ValleyCommandControl.tsx:64` both
`note: 'Enforced in software, not in policy'`.

**Problem** The antithesis "X, not Y" occurs 45 times across nine files. It appears
in headings, card titles, body copy — and in neutral spec-table notes, where it has
no business being.

**Why it feels AI-generated** A house voice is good. A house voice with exactly one
sentence shape is a template. It is the strongest remaining tell precisely because
the individual instances are well written — the pattern only becomes visible in
aggregate, which is how a reader experiences a site.

**Recommended change** Keep it where it carries the argument (the Careers and
Principles instances earn it). Remove it entirely from spec-table notes — a spec note
should state the condition, not argue. Target roughly 12–15 instances sitewide, and
vary the rest into plain declaratives.

---

### 8. `kamikaze_sat.glb` contradicts the copy describing it

**Location** `src/data/programmes.ts:668` against `:597`

**Problem** The orbital programme's 3D asset is `/models/kamikaze_sat.glb`, while the
copy calls the capability "a proportionate co-orbital response option". The asset path
is visible in any browser's network tab.

**Why it damages credibility** The filename states a kinetic ASAT intent that the
copy is carefully phrased to avoid. Whichever is the true positioning, the site
currently publishes both, and the one in the network tab looks like the unguarded one.

**Recommended change** Rename the asset to match the published positioning
(`prahari-bus.glb` or similar) and update the reference. This is a rename, not a
repositioning.

---

### 9. PRAHARI is described in the present tense but does not exist

**Location** `src/data/programmes.ts:578`, status at `:565`

**Problem** "PRAHARI is a bodyguard satellite: a manoeuvrable escort that keeps
station…" — flat present tense, under status `In development`. The copy never says
"is designed to" or "will".

**Why it damages credibility** The hypersonics programme handles exactly this
situation correctly (`:439` "We publish where the programme is, not where it will be",
plus `CLASSIFIED` / `Programme phase: Development` rows). Orbital does not, so the two
programmes apply different honesty standards on the same site.

**Recommended change** Apply the hypersonics treatment to orbital. Present tense for
what exists, future or design-intent tense for what does not.

---

### 10. "Decision at the speed of the fight" survives in the navigation

**Location** `src/data/nav.ts:75`

**Problem** Codex replaced this phrase where it was the C2 page H1, but it remains as
the mega-menu descriptor, so it still appears on every page of the site.

**Why it feels AI-generated** "At the speed of X" is the most recognisable marketing
construction in defence tech. It is also the only such phrase on an otherwise
exceptionally clean site — zero instances of next-generation, revolutionary,
seamless, robust, leverage, or unlock, and zero em-dashes in body copy.

**Recommended change** Replace with what the page actually covers, e.g.
"Operator surface, tracks and commit authority".

---

### 11. The site's strongest line now appears twice

**Location** `src/pages/Careers.tsx:67` and `src/pages/About.tsx:32`

**Problem** Careers: "Every programme exists because the alternative was an import
licence." About: "Every capability on this site exists because the alternative was an
import licence, a foreign end-use certificate, or a lead time set by somebody else."
Same shape, same closing clause, two pages apart.

**Why it feels AI-generated** Repetition turns a conviction into a slogan. The line is
excellent once and formulaic twice.

**Recommended change** Keep it on Careers, where it is doing recruitment work.
Rewrite the About principle to make its own argument.

---

### 12. The `lead` / `title` split is now vestigial

**Location** `src/components/ui/HUD.tsx` `SectionHeading`, and ~20 call sites

**Problem** Codex's fix concatenates the two props into one string:
`{lead && <>{lead}{' '}</>}{title}{stop && '.'}`. Both halves now render in the same
`display-lg` span with identical styling. The two-prop API produces one sentence and
no visual distinction.

**Why it matters** It is dead abstraction left over from the two-tone treatment, and
it keeps the headings split at arbitrary grammatical joints in source
(`lead="Written" title="about"`). Anyone editing a heading has to know which half to
edit.

**Recommended change** Collapse to a single `title` prop holding the full sentence.
Mechanical, ~20 call sites, no visual change. While doing it, rewrite the two
headings that are still weak as sentences: "Written about." and "In the room."

---

### 13. The masthead is still ~6.5:1 over body text, condensed and uppercase

**Location** `src/index.css` `.display-xl`

**Problem** `clamp(3.25rem, 6.5vw, 6.5rem)`, Big Shoulders Display, uppercase, against
a ~1.05rem body. Codex reduced this from the previous `text-9xl` but kept the
treatment.

**Evidence** Across 13 defence, aerospace, semiconductor and instrumentation sites
whose stylesheets were parsed directly: **none** uses a condensed display face, and
all-caps `h1`–`h3` is effectively zero (the only hits are acronyms — X-BAT, V-BAT).
Uppercase is industry-wide a *label* treatment at ~0.75rem. Anduril — the presumed
reference — uses a **wide** Helvetica Now Display, a **lime** accent, ships a light
theme, and its actual `.HomeHero h1` is `font-size: .75rem`, smaller than its body
text. Typical heading-to-body ratios in the set run 2×–3.5×.

**Why this is not a simple fix** See the strategic question below. This is the one
item in this document I do not recommend changing unilaterally.

**Recommended change** Decide the Avalon question first. If the answer is "keep the
inherited brand", this becomes a deliberate, defensible exception and should be
documented as one rather than left implicit.

---

## P2 — Noticeable polish

### 14. 34 MB of dead video ships in the build

**Location** `public/videos/Kamikaze.mp4`

**Problem** Referenced nowhere in `src/`. Everything in `public/` is copied to `dist/`,
so it deploys — and is publicly fetchable at a guessable path under a filename the
site's copy deliberately avoids.

**Recommended change** Delete, or move out of `public/` if it is wanted for future use.

### 15. Dead components and one dead CSS idea

**Location** `src/components/ui/StatementBand.tsx`, `PressStrip.tsx`,
`useCardSpotlight.ts`, `src/components/AnkoshaFlythrough.tsx` (which is the only
consumer of `AnkoshaScene.tsx`); `MediaHud.tsx` with its undefined `animate-scan`
class; the unused `.brackets` utility in `index.css`.

**Problem** None are imported. `DESIGN_SYSTEM.md:182-191` already asked for the
`.brackets` / `MediaHud` duplication to be resolved and it has not been.
`SpotlightCard.tsx`'s doc comment still describes "the warm spotlight tracking the
cursor" — an interaction that no longer exists anywhere in the CSS.

**Recommended change** Delete the unused components and the `.brackets` utility.
Correct the `SpotlightCard` comment, or rename the component, since it no longer
spotlights anything.

### 16. Stale TRL comment in `Counter.tsx`

**Location** `src/components/ui/Counter.tsx:10,14`

**Problem** References "TRL 5 / 4 / 3" as example values. Those statistics were
deliberately removed from the site. The comment is the only remaining place TRL
levels appear and could mislead a future editor into reinstating them.

**Recommended change** Delete the comment, or `Counter` itself if the removal of the
statistics band left it unused in practice.

### 17. The Valley masthead is half empty

**Location** `src/pages/Valley.tsx` masthead, after `GraphicBackdrop` was reduced

**Problem** Removing the procedural contour backdrop was correct — it was decoration
performing "technical", and it implied terrain data that did not exist. But the right
half of the masthead is now plain void with nothing in it.

**Recommended change** Either narrow the masthead so the emptiness reads as a margin
rather than a gap, or put something real in it — the three product names, or the
status and its date.

---

## The strategic question: Avalon

This sits above the P-list because it cannot be resolved by editing files.

`tasks/todo.md:4` names **Avalon (avalonch.com)** as the parent company.
`tasks/todo.md:210-233` records that its CSS custom properties were read and "adopted
exactly" — the surfaces `#000000`/`#060608`/`#0A0A0C`/`#16161A`, the accent
`#FF8A00`/`#FFAE42`/`#FF7A3F`, and the Big Shoulders Display / Inter / JetBrains Mono
stack all come from there. `DESIGN_SYSTEM.md:9` calls it "the literal source of these
tokens". `IMPLEMENTATION_STATUS.md:72` records that the user rejected an earlier
direction as "too template-like" and requested avalonch.com as the reference.

The tension is direct: the inherited token set — black ground, single warm accent,
condensed uppercase display — is, on the evidence gathered from 13 credible
engineering companies, a look almost nobody in this industry actually uses. The only
genuine practitioner in the reference set is Rocket Lab, which has a public flight
record to spend on decoration. The aesthetic is also, for exactly that reason, the one
an image or site generator converges on when prompted with "defence tech".

So "look like the parent" and "stop looking generated" currently pull in opposite
directions, and the brief asks for both.

One further ambiguity to resolve: `docs/COMPETITIVE_RESEARCH.md:36` describes Avalonch
as "Direct competitor — parent co. of Aminuteman's own former reference", which
contradicts `tasks/todo.md:4`'s plain "(parent)". Parent and competitor imply opposite
design strategies — inherit the house style, or differentiate from it.

**This needs a decision from the company, not from a reviewer.** The three coherent
positions:

1. **Corporate family.** Keep the inherited tokens deliberately, document them as a
   group identity, and accept the heading treatment as brand rather than fashion.
   Then item 13 is closed, not deferred.
2. **Independent identity.** Keep the black ground and the single accent — they are
   well executed — but move the masthead to the same sentence-case face as the rest of
   the site, at 3–4rem. Reserve the condensed face and uppercase for labels.
3. **Differentiate deliberately.** If Avalonch is a competitor rather than a parent,
   sharing its exact palette and type stack is the problem, not the solution.

---

## What a small company with a thin record should do instead

Relevant because Aminuteman's public record is genuinely thin — one syndicated press
story, one Army trial, a set of programmes mostly pre-hardware — and the site's instinct
so far has been to fill that space with treatment.

The closest analogue in the reference set is **Castelion**: founded 2022, one weapon
programme, ~570 homepage words, and *one* `text-transform: uppercase` declaration in
261 KB of CSS. No black, no grid overlay, no corner brackets. What it uses instead:

- A stated engineering doctrine in place of capability claims — three phrases about
  *how* they work, which a thin record can honestly support. Aminuteman already has
  this, and better: the six Principles on About are the strongest asset on the site and
  are currently buried at section 03.
- Dated news carrying named contracts and values.
- Concrete present-tense commitments substituting for track record — acreage,
  headcount, "26% of roles already filled as of fall 2026", investment figures.
- Named humans on record.

The pattern across the credible set is the same: **specificity that is dated, named and
falsifiable.** Shield AI names the third-party aircraft it has flown (X-62 VISTA,
MQ-20 Avenger). Saronic publishes its vessel at two load states — 5,400 nm base load,
4,100 nm max — because a real engineering organisation qualifies a number against its
operating condition. A generated site never does that.

Aminuteman has exactly one asset of this class and it is excellent: the Operation
Sindoor paragraph at `programmes.ts:355`. It is the only externally checkable fact on
the site. It should be far more prominent than it is.

The Ankosha spec table is the same opportunity inverted. Qualified against conditions —
range *at* a load and altitude, endurance *at* a cruise speed, acoustic figure *at* a
measured distance — it would be the most credible thing on the site. As currently
written, with an impossible altitude pair and an unfalsifiable acoustic claim, it is the
least.

---

## Applied — 25 Sep

Confirmed by `npm run typecheck`, `npm run lint` and `npm run build` (all clean), and
by screenshot at 1440px. Avalon confirmed by the user as the group's US entity, so the
inherited brand — black ground, `#FF8A00`, the condensed uppercase masthead — is kept
deliberately. Item 13 is therefore **closed, not deferred**: the masthead treatment is
group identity, and this document should not be read as arguing against it.

| # | Change | File |
|---|---|---|
| 1 | Impossible altitude pair replaced. `Launch altitude: To 4,570 m AMSL (15,000 ft)` + `Service ceiling: ON REQUEST` | `programmes.ts:166-167` |
| 2 | `Aural signature` → `ON REQUEST`, note `Measured dB(A), loitering at 200 m overhead` | `programmes.ts:177` |
| 3 | Mass note `Including battery` → `At launch, fuelled` | `programmes.ts:160` |
| 4 | `gmail.com` removed from footer, Contact page and Organization schema; `contactType` → `sales` | `Footer.tsx`, `Contact.tsx:26`, `index.html` |
| 6 | Schema address → Dhanori works; institute demoted to a secondary `location` | `index.html` |
| 8 | `kamikaze_sat.glb` → `prahari-bus.glb` | `public/models/`, `programmes.ts:668` |
| 10 | "Decision at the speed of the fight" → "What the operator sees, and who commits" | `nav.ts:75` |
| 11 | About's "Build it here" rewritten so it no longer duplicates `Careers.tsx:67` | `About.tsx:32` |
| 14 | `Kamikaze.mp4` (34 MB, unreferenced) removed from `public/`. `dist` 57 MB → 23 MB | `public/videos/` |
| — | Footer legal line out of all-caps mono into readable sentence case, warmer opening | `Footer.tsx` |

**No figure was invented.** Where a number could not be verified it was moved behind the
site's own `ON REQUEST` convention rather than guessed. Two of these are placeholders
awaiting a real value from the company:

- **Service ceiling.** The original rows claimed 29,000 ft operating altitude against a
  5,000 m AMSL ceiling. The launch altitude (15,000 ft) was stated consistently and was
  kept, converted to metres to match. The true ceiling still needs supplying.
- **Aural signature.** Needs a measured dB(A) figure, or the row should be deleted.

### Deliberately not changed

- **Item 5, the Valley status contradiction.** `Operational` / "deployed on customer
  infrastructure" against three constituent products at `In trials` is a factual claim
  about what is actually fielded. Only the company can resolve it.
- **`programmes.ts:175` "generative targeting."** Flagging rather than editing: it reads
  as a machine selecting targets, which contradicts the doctrine the site states twice
  ("A machine may propose; a human commits", and the footer line). If the intent is
  generative *perception* feeding a human commit step, the wording undersells the
  safeguard and oversells the autonomy.
- **Item 7, the 45 "X, not Y" constructions.** Mechanical but touches many files, and
  several instances are load-bearing. Worth a dedicated pass.
- **Item 12, the vestigial `lead`/`title` split.** ~20 call sites in files the
  typographic pass had just rewritten; left alone to avoid churn.
- **The accent full stop on page mastheads.** Retained as brand. Worth noting that in
  Big Shoulders Display the period is a square glyph, so at masthead size it reads more
  like a small orange block than punctuation.

---

## Suggested order

1. Items 1, 2, 3 — the Ankosha spec table. One file, no design impact, removes the
   worst exposure on the site. `programmes.ts` was untouched by the typographic pass,
   so there is no conflict risk.
2. Items 4, 6 — contact address and structured data. Ten minutes.
3. Item 5 — the Valley status contradiction. Needs a factual decision about what is
   actually deployed.
4. The Avalon question. Blocks item 13.
5. Items 8, 9, 10, 11 — copy corrections.
6. Items 7, 12 — the antithesis count and the vestigial prop. Mechanical but touches
   many files.
7. Items 14–17 — cleanup.

Stop after 1–6. The site does not need another styling pass.
