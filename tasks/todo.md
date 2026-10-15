# Avalonch clone — plan (2026-10-15)

Goal: rebuild aminutemantechnologies.com as a structural clone of avalonch.com (parent),
with Aminuteman's own identity, programmes, partners and contact. Nothing is pushed
until Om says so.

## Layer 1 — PostHog (diagnose)
- [x] Project 662437 ("Default project", created 2026-10-13) has ingested zero events. No funnel,
      recordings or heatmaps exist. Design assumption: the current site's problem is the one Om
      stated — too much information for a defence company — not a measured drop-off.
- [ ] After launch: install the snippet, watch `$pageview` by `#home/#products/#contact` and the
      contact-form submit as the first conversion goal.

## Layer 2 — Context.dev (benchmark = the parent itself)
- [x] Scraped avalonch.com (single-file SPA: nav + 3 hash pages), style guide, brand card, full HTML.
- [x] Tokens confirmed identical to this repo's: #000 ground, #FF8A00 accent, Big Shoulders Display /
      Inter / JetBrains Mono.
- [x] Section inventory: Nav(3 clocks) · Hero(typed h1) · Engagements(5 logo cards) ·
      Products[tabs: Hardware / Software(Valley) / Future Roadmap / R&D] · Contact(form) · Footer.

## Layer 3 — Design (pen.dev unreachable this session; delivered as an HTML artifact)
- [x] Build the clone as a single page with Aminuteman content, desktop + mobile.
- [ ] Om reviews; collect missing inputs (partner logos, hero film, gallery renders, subsidiary wording).

## Implementation (approved by Om 2026-10-15: "works push it")
- [x] React/Tailwind/TS toolchain removed; index.html is the whole site (parent's CSS+JS, Aminuteman content).
- [x] Enquiry form posts to Web3Forms via fetch (key from VITE_WEB3FORMS_ACCESS_KEY at build; mailto fallback).
- [x] Hero loop + fibre-optic trial video wired to the files in public/videos.
- [x] render.yaml: CSP updated (Web3Forms + PostHog US), old routes redirect to hash pages.
- [x] PostHog snippet (project 662437, US) with history_change pageviews; `enquiry_submitted` event.
- [x] Pushed to main.

## Review (2026-10-15, design round)
- Design published as an artifact: https://claude.ai/artifact/CK7hpW8Z8Z7hY8QMWeCNYP (generator kept in the
  session scratchpad as build_clone.py; parent source scraped from avalonch.com the same day).
- Every line of copy is verbatim from src/data/programmes.ts, company.ts, Valley.tsx, Home.tsx,
  About.tsx or Contact.tsx. Only images with an established label/caption in programmes.ts were used.
- Open inputs for Om: partner logos (Alpha Design, Bharat Electronics, Indian Army, Nicomatic),
  captions for the 3 extra Ankosha airframe renders and the 6 extra HGV / 4 extra orbital renders,
  a Valley image, and the exact subsidiary wording ("US subsidiary"?).
- Metric to watch: enquiry_submitted per $pageview session, split by which Products tab was opened.
- 2026-10-16: all 8 partner logos added from each organisation's own site (Indian Army + JSW Group from public-domain Commons files); cards use a fixed 96×60 tile, explicit width/height, and an initials fallback only if the image fails.
- Still open: captions for the extra renders, a Valley image, the "US subsidiary" wording.
