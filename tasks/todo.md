# Aminuteman Technologies — Defence Site Rebuild

Reference set: Anduril (Lattice), Palantir, Airbus, Boeing, Lockheed, Raphe mPhibr,
Veda Aeronautics, Adani Defence, Solar Defence, Avalon (parent).

Tone: institutional, restrained, dark. Military first, civilian never. No superlatives,
no "best/leading/world-class" claims. Motion is deliberate and technical — HUD, telemetry,
reticles — never playful.

## 0. Foundations
- [x] Audit existing codebase (Vite + React 18 + TS + Tailwind + framer-motion)
- [x] Design tokens: void blacks, panel greys, accent blue, signal amber, nominal mint
- [x] Typography: Barlow Condensed (display) / Inter (body) / IBM Plex Mono (telemetry)
- [x] Base CSS: grid backdrop, scanlines, corner brackets, noise, reduced-motion guards

## 1. Primitives (src/components/ui)
- [x] `Reveal` — scroll reveal, replaces per-page IntersectionObserver boilerplate
- [x] `MediaSlot` — labelled drop-in placeholder for imagery/video (renders real src if given)
- [x] `HUD` — Eyebrow, SectionHeading, CornerFrame, Rule
- [x] `SpecTable` — classification-aware (CLASSIFIED / ON REQUEST states)
- [x] `Stat` — counter tiles
- [x] `GridBackdrop` — animated tactical grid

## 2. Signature motion
- [x] `AnkoshaCross` — canvas flythrough: the Ankosha family in cross formation flying
      through the screen from depth, reticle lock + telemetry callouts per model
- [x] `UnifiedGrid` — interactive SVG kill-web: sensors -> Valley -> effectors
- [x] `EmbodimentTransfer` — AI transferring between airframes over RF / quantum link

## 3. Content model
- [x] `src/data/systems.ts` — every programme as a record (hero, thesis, capabilities,
      specs, media slots, related). Drives all detail pages from one template.
- [x] `src/data/nav.ts` — IA for navbar + footer

Programmes covered:
- Ankosha family (A / B / C / J jet-powered) — loitering munitions
- Counter-UAS: RYDER (effector) + INDRASTRA (grid/C2)
- Loitering munitions + jet-powered loitering munitions
- Digital twins for weapons
- Space: kamikaze satellites + bodyguard satellites
- Nuclear: small modular reactors
- HAPS — high altitude pseudo satellites
- Hypersonics: glide vehicles + balloon-launched hypersonic weapons
- Propulsion: turbojets, 60–240 kg thrust class
- Directed energy weapons
- Valley — integration platform / unified grid
- Products: AORIZON, TALON, SENTINEL
- Quantum technologies
- Advanced AI for defence (embodied AI transfer over RF + quantum)

## 4. Pages
- [x] Home — hero flythrough, deterrence band, domain matrix, Valley grid, products,
      Ankosha strip, posture stats, vision, clientele, CTA
- [x] Valley platform page (the Lattice/Palantir moment)
- [x] Templated system/technology/product detail pages
- [x] Navbar + Footer rebuilt around new IA
- [x] Legacy routes redirect to new ones

## 5. Verification
- [x] `npm run typecheck`
- [x] `npm run build`
- [x] `npm run lint`

## Review
See bottom of file after implementation.

---

## Review — session 2 (2026-08-30)

The previous session built the content model, primitives and Home page but left the
site un-wired: `App.tsx` still routed the old IA, the Valley page did not exist, and
no real imagery had been connected. This session closed that and removed the
remaining stock-photo pages.

### Routing & IA
- [x] `App.tsx` rebuilt on the content model — `/systems|/technologies|/products`
      indexes plus `/<category>/<slug>` detail, `/valley` + three children
- [x] `/valley` page written (the platform thesis: problem → grid → kill chain →
      layers → edge posture → ATMAN → products → spec → sub-pages)
- [x] Legacy URLs redirect (`/kamikaze`, `/jet-engines/*`, `/air-systems/*`, `/wingmans`)
- [x] Footer rebuilt in the site's language and driven by `NAV_GROUPS`
- [x] Deleted stale pages (`air-systems/`, `jet-engines/`, `Wingmans`) and nine
      orphaned legacy components

### Imagery — the customer's own hardware, no stock
- [x] 25 assets processed from the supplied CAD/photography into `public/images/`
- [x] CAD renders knocked out to transparency (white and viewport-grey backgrounds),
      small connected components dropped to remove axis gizmos, then trimmed
- [x] HAPS elevations luminance-lifted so the near-black airframe reads as a white
      GA line drawing against the void
- [x] `MediaSlot` + programme hero gained `fit: 'contain'` so cut-out renders are
      never cropped; they sit on the tactical grid
- [x] Removed third-party stock imagery misrepresenting our hardware:
      - `public/images/HAPS/*` were photographs of the Airbus Zephyr
      - About / Contact / Careers / Valley children hotlinked Unsplash
      - `assetPreloader.ts` (unused) preloaded eight more Unsplash images

### Pages rebuilt off the B2B template
- [x] About — mandate, six commitments, capability spine, founder, record
- [x] Contact — programme office; Web3Forms submission preserved verbatim
- [x] Careers — role list wired to the form; Cloudinary upload + validation preserved
- [x] Valley C2 / Mission Autonomy / Partner Program — replaced "Business Growth"
      and "Network Access" boilerplate with the actual engineering argument

### Fixes found by verification
- [x] `fetchPriority` is a React 19 prop — on React 18 it warned on every page with
      imagery. Switched to the lowercase DOM attribute.
- [x] `Reveal` / `Stagger` / `StaggerItem` / `PageTransition` ignored
      `prefers-reduced-motion` — the CSS guard cannot override framer-motion's
      inline `opacity: 0`, so content animated regardless. Now render plainly.
- [x] ESLint was completely broken (typescript-eslint 8.8.1 vs ESLint 9.38 —
      `no-unused-expressions` threw before linting any file). Updated the plugin.
- [x] `sitemap.xml` / `robots.txt` listed dead routes — regenerated from the
      content model (26 URLs)
- [x] `og:image` pointed at a non-existent `logo-og.png` — generated a real
      1200×630 share card; meta copy rewritten off "AI-Powered Intelligence"

### Verification
- `npm run typecheck` — 0 errors
- `npm run lint` — 0 problems (was 1 error + 6 warnings, and before that, crashing)
- `npm run build` — clean
- Headless crawl of all 29 routes incl. legacy redirects: **0 broken images,
  0 failed requests, 0 console errors**; every internal link target resolves
- Mobile 390×844: no horizontal overflow on home or programme pages

### Still outstanding (needs the customer, not code)
- Leadership section beyond the founder. The photographs in `src/images/` are
  informal snapshots with no recorded names or titles — deliberately not shipped.
  Add headshots + names to `LEADERSHIP` in `About.tsx`.
- Programmes with no imagery still render labelled placeholder slots showing the
  path to drop a file at: directed-energy, nuclear, digital-twin, quantum,
  autonomy-ai, aorizon, talon, sentinel.

---

## Review, session 3 (2026-08-30)

### Tagline and typography
- [x] "Shaping the Deterrence" adopted as the company tagline: navbar strap, footer,
      home hero, About lede, page titles and the OG share card
- [x] **Every em dash removed from the codebase.** 141 occurrences replaced
      individually rather than by blanket substitution, so each reads correctly:
      colons where an elaboration follows, full stops before an independent clause,
      commas for appositives, and parentheses for the 12 parenthetical pairs.
      En dashes in numeric ranges normalised too ("60 to 240 kg"), so no dash
      ambiguity remains. Verified 0 in source and 0 in rendered page text.

### Live 3D from the STEP files
- [x] STEP assemblies tessellated with FreeCAD, decimated and Draco-compressed
      through Blender, served as GLB:
      Ankosha-A 386 kB (257k triangles reduced to 120k), Ryder 74 kB,
      HAPS 196 kB, co-orbital vehicle 665 kB
- [x] `ModelViewer` with orbit control, auto-rotate until first touch, HUD readouts,
      progress bar, WebGL fallback and reduced-motion support
- [x] `LazyModelViewer` defers the renderer until scrolled near
- [x] Removed `three` from `manualChunks`: naming it there was pulling the 887 kB
      renderer into the entry preload on **every** page. Now only pages with a
      model fetch it (verified by request capture)
- [x] Draco decoder self-hosted at /draco rather than Google's CDN

### Content from the source documents
- [x] Ankosha-A specifications replaced with the real 2025 product-sheet figures:
      2,600 mm, under 135 kg MTOW, 1,000 km range, 8 h endurance, 20 kg warhead,
      165 km/h, 29,000 ft, NavIC, 100 TOPS, SLAM and DETR, Jet Fuel A, rotary engine
- [x] New programme: **Sovereign Foundation Model**, from the iDEX ADITI DISC 14
      PS 34 submission. Sparse MoE, 8 experts of 3B, ~13B active, 64K context,
      ~1.5T tokens, three hardened profiles, ~512 H100-class on India AI Mission,
      14 months, 5 gates, IP transferred to the customer
- [x] New programme: **Intergalactic Weapon Systems (VYOMA)**, stated plainly as a
      concept programme, built around latency-tolerant authority, decade-class
      power and treaty-aware architecture
- [x] `src/data/company.ts`: offices, partners, record and achievements as data

### Offices, partners, achievements
- [x] Four locations wired through About, Contact and the footer: Pune (HQ, works
      and R&D), New Delhi (programme office), Bengaluru (avionics and autonomy),
      Madhya Pradesh (test and integration)
- [x] Partners, from the iDEX submission: Adani Defence & Aerospace, Alpha Design
      Technologies, Bharat Electronics, Indian Army, JSW Group, Elbatech Group,
      Pax Intelligence
- [x] International agreements, as supplied: Airbus, EDGE Group (UAE),
      Nicomatic (France), Akika (Poland)
- [x] Achievements band on Home and About: iDEX ADITI, 22 engineers, Turbo Quant
      Engine, TRL 5/4/3 for Talon/Aorizon/Sentinel, edge hardware lab, GPU allocation

### Verification
- `npm run typecheck` 0 errors · `npm run lint` 0 problems · `npm run build` clean
- Headless crawl of all 31 routes against the production build: 0 broken images,
  0 failed requests, 0 console errors, 0 em dashes in rendered text
- three.js confirmed absent from / and /about, present only where a model renders
- Sitemap regenerated: 28 URLs including the two new programmes

### Supplied in the message but not received
- **Office photographs.** No image attachments arrived with the request and none
  appeared in ~/Downloads. The five office cards render labelled placeholders
  printing the exact drop path (`/images/offices/<city>.jpg`), so adding them is a
  file copy. Same for the additional achievement images.
- **Other chats.** I have no access to other conversations, so anything only
  recorded there is missing. Everything above came from the iDEX ADITI PDF, the
  Ankosha-A product sheet, or this conversation.
- **Named people.** Only Aniruddha Narayan (Founder & CEO) is recorded anywhere in
  the supplied material. The other team photographs in `src/images/` still carry no
  names, so the leadership section remains founder-only by design.

---

## Review, session 4 (2026-08-30)

### Retheme to the Avalonch design system
Rather than approximating from the poster, I pulled avalonch.com and read its CSS
custom properties, then adopted the token set exactly:

- Surfaces `#000000` / `#060608` / `#0A0A0C` / `#16161A`, hairlines `#1F1F24` and
  `#2A2A30`. Neutral black, not the blue-tinted black we had, so the accent is the
  only chromatic note on the page.
- **Orange `#FF8A00` is now the primary accent**, with `#FFAE42` and `#FF7A3F`.
  Blue `#5AB6FF` demoted to an informational role. This inverts what we had, where
  blue led and orange was the secondary signal colour.
- Ink ramp `#FFFFFF` / `#E8E8EC` / `#B8B8BF` / `#8C8C94` / `#5A5A62`, wired into
  Tailwind as `ink-0..3` and `ink-dim` and swept through all 19 components.
- Status colours `#5DFF6A` nominal, `#FF5A5A` critical.
- Primary button is now the accent rather than white.

### Typography
- **The display and mono fonts were never actually being loaded.** `index.html`
  only ever requested Inter, so Barlow Condensed and IBM Plex Mono silently fell
  back to Inter, and every heading on the site had been rendering as bold Inter.
- Now loading Avalonch's stack: **Big Shoulders Display** (600 to 900),
  **Inter**, **JetBrains Mono**, and retuned the display scale for it: heavier
  weights, tighter negative tracking, one step larger throughout.

### The facility
- [x] Eight on-site photographs processed and graded to sit on the dark theme
- [x] New "Where the hardware sits" gallery on About: rotary bench, fixed-wing
      article, integration positions, work floor and the secure area
- [x] Office cards now carry real photographs rather than placeholders
- [x] **Full Pune street addresses removed** everywhere, as asked. Locality and
      postcode only (Dhanori 411015, Akurdi Nigdi 411044). Nothing in the footer,
      contact page or company data carries the building or street any more.

### 3D
- [x] Ankosha-A, Ryder and the co-orbital vehicle all load and orbit; lighting
      retuned to a neutral key with an orange rim to match the theme
- [x] **`High altitude UAV.step` reassigned to Hypersonics.** Despite the
      filename it contains no wing: rendered orthographically from above it is a
      pointed lifting body ~10.1 m by 3.6 m, matching the HGV gallery renders.
      Unwired from HAPS (where it contradicted that programme's GA drawings) and,
      on the customer's confirmation, attached to Hypersonics as `hgv.glb` with
      length, span, regime and release readouts.

### Verification
- `npm run typecheck` 0 errors · `npm run lint` 0 problems · `npm run build` clean
- Full crawl of all 31 routes: 0 broken images, 0 failed requests, 0 console
  errors, 0 em dashes in rendered text
- Mobile 390px across five pages: no horizontal overflow with the larger display type
- three.js still absent from pages without a model

### Outstanding
- The correct HAPS STEP assembly, to give that programme a 3D view of its own.
  Its GA drawings are accurate and remain in place meanwhile.
- Names and titles for the leadership section.

---

## Review, session 5 (2026-08-30)

### Hero flythrough rebuilt on real geometry
The home hero and the Ankosha strip were a hand-rolled 2D canvas drawing wing and
fin outlines with a manual perspective projection. They are now the actual
Ankosha-A airframe.

- [x] `ankosha_lod.glb`, a 9k-triangle hero LOD cut from the same STEP-derived
      mesh as the 120k-triangle model on the programme page. 69 kB, so five
      simultaneous copies cost about 45k triangles.
- [x] `AnkoshaScene` flies five airframes in cruciform formation out of depth and
      past the camera on a 15 second loop, with per-element phase, a spread that
      opens as the formation nears, slow bank, distance fog, and drei `Html`
      callouts tracking each airframe.
- [x] `AnkoshaFlythrough` code-splits the renderer so the hero still paints
      immediately on the grid backdrop.
- [x] Reduced motion renders a single static frame rather than the loop.
- [x] `AnkoshaCross.tsx` deleted.

Three things needed fixing along the way:
- The airframes rendered nearly black. `metalness: 0.75` with no environment map
  has nothing to reflect, so the metal read as void. Dropped to a semi-rough
  painted finish that actually catches the directional rig.
- Fog started at 40 units with the run beginning at 110, so the formation was
  invisible for most of its approach. Run shortened and fog pushed back.
- At full scale the formation flew straight through the headline. The axis is
  now offset to the right of frame (`axisX`), so the run occupies the empty half
  of the hero and the copy stays legible without heavy dimming. `axisX` and
  `scale` are props, and the centred strip lower down passes different values.

### Verification
- `npm run typecheck` 0 errors · `npm run lint` 0 problems · `npm run build` clean
- Full crawl of all 31 routes: 0 broken images, 0 failed requests, 0 console errors
- Mobile 390px across five pages: no horizontal overflow
- Request capture: the 3D chunk and the airframe GLB load on `/` (by design, the
  hero needs them) and on programme pages with a model. `/about` and `/contact`
  still load neither.

### Trade-off worth knowing
The home page now pulls the three.js chunk, which it did not before. That is the
direct cost of putting real geometry in the hero rather than drawn shapes. It is
code-split and non-blocking, so first paint is unaffected, but on a cold cache the
formation fades in a moment after the text.

---

## Review, session 6 (2026-08-30)

### Formation was flying tail-first
The airframes were reversed. I had inferred the nose direction from where the
mesh centroid sat, and got it backwards: the pointed nose is more densely
tessellated than the trailing edge, so the centroid pulls toward the nose, not
away from it.

Measured it properly instead. Sampling cross-sections at each end of the model:
the -X end spans 0.18, the +X end spans the full 1.52 wing. So -X is the nose,
and the rotation needed to be +90 degrees about Y, not -90. Fixed, and the
reasoning is now recorded in the file so the next person does not re-derive it.

### Finish pass
The site was wearing too much simulated instrumentation, which is what read as
generated rather than designed. Removed, keeping the typography and the content:

- [x] The "OPERATIONAL" status pill above the hero headline. It was decoration,
      not information. Status tags remain on programme pages, where "IN TRIALS"
      or "IN DEVELOPMENT" is a real statement about maturity.
- [x] The scrolling telemetry ticker ("GRID NOMINAL", "09 ELEMENTS AIRBORNE").
      Replaced with a static strip of the actual capability areas.
- [x] The scanline film. Removed from every surface and the utility deleted.
- [x] The instrument framing ticks and corner brackets around the hero.
- [x] The floating per-airframe callouts in the 3D formation. Clean geometry
      reads more expensive than geometry with labels stuck to it.
- [x] The wireframe grid backdrop dropped from 30 to 60 per cent opacity down to
      12 to 20 per cent across every header and section, so it registers as
      texture rather than as a diagram.
- [x] The programme grid had 14 tiles in a three-column layout, leaving a dead
      cell in the last row. It is now an "All programmes" index tile.

### Verification
- `npm run typecheck` 0 errors · `npm run lint` 0 problems · `npm run build` clean
- Full crawl of all 31 routes: 0 broken images, 0 failed requests, 0 console errors
- Mobile 390px across five pages: no horizontal overflow
- Close-pass frames captured to confirm the formation now flies nose-first

---

## Review, session 7 (2026-08-30)

### Confidentiality purge
Every reference to the customer programme and its commercial terms is gone from
the codebase, verified by grep across `src/`, `public/` and `index.html`:

- [x] iDEX ADITI, DISC 14, Problem Statement 34, and the named service customer
- [x] The commercial figure, the funding split and the 14-month delivery schedule
- [x] The four phases and five written milestone gates
- [x] The accelerator allocation and GPU-hour figures
- [x] The contract KPI table (accuracy, citation, hallucination, jailbreak,
      leakage and reproducibility targets), and the model's parameter counts,
      context window, corpus size and per-profile latencies

The Sovereign Foundation Model page still describes the capability, because that
is what a customer needs to understand, but its schedule and performance
envelope now read ON REQUEST. The company record refers to a sovereign model
programme for a service customer without naming the competition or the service.

### Corner frames
- [x] Removed from all 12 files that used them and the `CornerFrame` primitive
      deleted. The orphaned `tone` prop on `MediaSlot` went with it.

### Office photography
- [x] Photography exists for the Bengaluru floor only, so only Bengaluru carries
      a photograph. Pune, Delhi and Madhya Pradesh render text-only cards rather
      than repeating one interior under four city names.

### New photography
- [x] `field/`: Army officer being walked through the airframe at the trial site,
      the Surya Dronathon 2025 stage, high-altitude operations at 10,700 feet,
      and the Sumdo award plaque
- [x] `exhibitions/`: the company stand with airframes and live detection running,
      briefing visitors, the Aeronautical Society of India in Pune, and the
      industry forum floor
- [x] Two new About sections: "Where it actually gets judged" (service evaluation)
      and "In the room" (ecosystem standing). Surya Dronathon 2025 replaces the
      withdrawn programme entry in the achievements band.

### Deliberately not used
- Two unlabelled office interiors, because they cannot be attributed to a city.
- One interior carrying another company's wall branding, which would have
  misrepresented the facility.
- The red VTOL render, which I could not confirm as ours.

### Verification
- `npm run typecheck` 0 errors · `npm run lint` 0 problems · `npm run build` clean
- Full crawl of 31 routes: 0 broken images, 0 failed requests, 0 console errors
- Mobile 390px: no horizontal overflow

## Session 8, C-UAS imagery, programme removals, trial footage

- [x] Replaced the counter-UAS hero and lead gallery item with the interceptor render supplied by the user. The two existing field photographs show a multirotor sensor node, not Ryder, so they were recaptioned as sensor-node and trial-site imagery rather than left labelled "RYDER / AIRFRAME".
- [x] Removed five programmes and every reference to them: Jet-Powered Loitering Munition (ankosha-j), High Altitude Pseudo-Satellite (haps), Small Turbojet Propulsion (propulsion), Compact Nuclear Systems (nuclear), Intergalactic Weapon Systems (deep-space). Seventeen programmes down to twelve.
- [x] Scrubbed the words nuclear, intergalactic, HAPS, jet engine, jet-powered and turbojet from all copy, meta tags, structured data and the sitemap. "Jet Fuel A" in the Ankosha powerplant spec became "heavy fuel". "Stratospheric" survives only where it describes the hypersonic balloon launch.
- [x] Ankosha family is now four airframes (A, B, C, S). The hero flythrough flies four, with phases respaced.
- [x] Home domain matrix rebuilt at twelve tiles, so the grid closes without the index tile. Posture figures corrected to 12 programmes and 5 domains.
- [x] Added two trial videos to the About field section: a fibre-optic control test and a payload release run.
- [x] Cropped 72 px off the bottom of both clips to remove the burned-in GPS coordinates of the trial site before publishing.
- [x] Re-cut the payload clip to start just before release so the battery-warning overlay is mostly off screen.
- [x] MediaSlot now holds video sources back behind an IntersectionObserver and honours reduced motion, so the About page no longer fetches ~5 MB of footage on load.

### Verification
- `npx tsc --noEmit`, `npm run lint`, `npm run build` all clean.
- Full 31-route crawl of the production build: 0 pages with issues, 0 broken images, 0 console errors, 0 em dashes, 0 banned-term hits.
- Removed routes fall through to the systems index rather than 404.
- Both videos confirmed decoding and playing at 640x408 in the browser.

## Session 9, two more programme removals and a navigation rebuild

- [x] Removed Directed Energy Weapons (VIDYUT) and Transferable Embodied Intelligence (ATMAN). Twelve programmes down to ten.
- [x] ATMAN was not only a page. Deleted the ATMAN band from the home page and from the Valley page, deleted `EmbodimentTransfer.tsx`, repointed the Valley mission-autonomy link, and rewrote the passages in the quantum programme that framed quantum links as the agent-transfer channel.
- [x] Directed energy also appeared as an effector option in Talon, Sentinel, the counter-UAS specs, the Valley effector list and the grid schematic. All removed, since the site should not advertise a layer with no programme behind it.
- [x] Navigation rebuilt around two capability groups. Products and Technologies merged into AI; Systems keeps the hardware. Four groups now: Valley, AI, Systems, Company.
- [x] Category model reduced from four to three (`systems | ai | platform`). Routes are `/systems`, `/systems/:slug`, `/ai`, `/ai/:slug`.
- [x] `/technologies` and `/products` redirect to `/ai`, and their detail URLs carry the slug across via a `LegacySlugRedirect` rather than a hand-listed map.
- [x] Mega-menu fixes: the panel was translucent and let the page headline bleed through, now opaque; and a group whose link count was not a multiple of three left grey dead cells, now closed with a single spanning filler.
- [x] Home domain matrix rebalanced to ten programme tiles plus an "All systems" and an "All AI" index tile, closing the three-column grid at twelve. Posture figures corrected to 10 programmes and 4 domains. Section indices renumbered after the ATMAN band came out.

### Defect found and fixed while verifying
The home page rendered blank whenever WebGL was unavailable. `AnkoshaScene` created its Canvas unguarded, so a failed context threw during render and took the whole app down rather than just the hero. Added a WebGL probe matching the one already in `ModelViewer`, plus an error boundary in `AnkoshaFlythrough` so a lost context, a refused driver or a failed chunk falls back to the grid backdrop. Confirmed by rendering in headless Chrome, where the page went from 0 to 83k of DOM.

### Verification
- `npx tsc --noEmit`, `npm run lint`, `npm run build` all clean.
- 29-route crawl covering the new paths, both legacy prefixes, and the five removed slugs: 0 pages with issues, 0 em dashes, 0 banned-term hits. Every legacy URL lands on the right target.
- Mobile pass at 390px across 9 routes: no horizontal overflow anywhere; drawer expands the AI group correctly.

## Session 10, three partner names removed and the partner grids reclosed

- [x] Removed Airbus, EDGE Group and Akika from `INTERNATIONAL_PARTNERS`. The international list is now Nicomatic alone; the domestic list of seven is untouched. Eleven partner entries down to eight.
- [x] The names also appeared in the 2026 milestone in `RECORD`, which read "International agreements concluded with Airbus, EDGE Group, Nicomatic and Akika." Rewritten to name only the agreement that still stands.
- [x] Home clientele grid reclosed. Eleven tiles in a `grid-cols-2 sm:grid-cols-3 lg:grid-cols-6` grid had already been leaving a dead cell at every breakpoint; at eight tiles the six-column row would have left four. Now `grid-cols-2 sm:grid-cols-4`, and eight divides both, so the grid closes exactly at every width.
- [x] About partners section rebalanced. The India and International lists sat in an even `lg:grid-cols-2` split, which put seven rows against one and left half the section empty. Moved to the `lg:grid-cols-12` idiom already used elsewhere in the file, 7 columns for India and 5 for International, so the column widths track the content weight.

### Verification
- `npx tsc --noEmit`, `npm run lint`, `npm run build` all clean.
- Headless Chrome render of `/` and `/about`: neither DOM contains Airbus, Akika or EDGE Group. Both pages render (88k and 74k of DOM), so nothing was taken down with the removal.
- Counted in the rendered DOM rather than the source: the clientele grid holds exactly 8 tiles and carries `sm:grid-cols-4`; the About section holds 8 partner rows across the 7/5 split.
- Grepped the built `dist/` for all three names: clean.
- Both grid changes are `sm:` and `lg:` only, so layout below 640px is byte-identical to before.

### Not changed, needs a decision
The "Working with" logo marquee on the home page carries Rolls-Royce, Aston Martin and BMW logos, all captioned "Partner organisation". None of the three appears anywhere in the partner data. Left in place because it was outside what was asked, but it is the same class of claim as the three names just removed.

### Blocked
Deployment. Not a git repository, no Vercel/Netlify config in the project, and the Vercel CLI's `auth.json` is empty, so the CLI is not logged in.
