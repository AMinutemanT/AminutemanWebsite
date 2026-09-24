# Implementation status

Updated 24 September 2026. Final UX audit addressed and local QA complete; production configuration and deployment remain.

## Completed

- Audited the existing React/Vite application, content models, navigation, assets, styles, configuration and forms before changing it. Preserved the substantial pre-existing uncommitted work.
- Retained the established black/orange palette, local typography, authentic imagery, programme architecture, legacy redirects and optional 3D views.
- Simplified Home to five numbered sections: mandate, systems, Valley, research and field trials. Removed the redundant domain grid, repeated statistics, duplicated leadership block, unverifiable logo marquee and extra footer CTA. Relevant programme and company content remains available on its dedicated pages.
- Removed decorative corner ticks and scan sweeps. The detailed UnifiedGrid remains on Valley, where the visitor has chosen to explore the platform.
- Presented named relationships with their basis in a static, readable list. Added programme maturity labels to homepage AI products; described trial footage as recorded evidence rather than deployments.
- Improved the supplied logo's usable display area with CSS cropping, without altering the artwork. Added direct mobile Contact access and current-page navigation states.
- Added a main landmark, skip link, visible focus, named navigation/breadcrumb landmarks, accessible animated-heading text, mobile focus containment/Escape, inert background content, responsive drawer reset and reliable focus transfer after navigation.
- Corrected unknown-programme routing to show NotFound; valid programmes in the wrong category redirect to their canonical route. Programme lookups cannot resolve inherited object keys such as `constructor`.
- Removed hardcoded form-account fallbacks. Missing configuration shows an email enquiry/application path. Added timeouts, submission locking, autocomplete, announced status messages and actionable telephone/email links.
- Fixed stale CV state after invalid replacement, empty/oversized/mismatched file validation, and upload reuse when retrying a failed application submission.
- Added hero playback controls, offscreen/background pausing and a still fallback. Trial footage is user-played with native controls; its controls are no longer nested in a navigation link.
- Deferred the homepage formation until near the viewport. CAD views default to still, provide keyboard-operable rotate/zoom controls and optional rotation, and isolate model-loading failure from the rest of the page.
- Limited responsive image candidates to existing files and recorded their measured intrinsic widths. Claude subsequently replaced the duplicate font assets with distinct static weight instances; retained the weight-specific URLs and verified all twelve declared family/weight combinations render differently in Chromium.
- Removed the homepage's first-screen text reveal delay after measuring its effect on mobile loading.
- Corrected build/typecheck to check referenced TypeScript projects. Replaced the corrupted README and outdated forms documentation with setup and release guidance.

## Validation completed

- `npm run build`: passes, including TypeScript project checks and generation of 20 sitemap URLs / 19 route metadata shells.
- `npm run lint`, `npm run typecheck`, `git diff --check`: pass. No formatter or permanent automated test suite was configured in the original project.
- Chromium production browser sweep: all 20 current routes plus NotFound at 1440, 1280, 1024, 768, 480 and 375 px, with both normal-motion and reduced-motion passes. Scroll-loaded imagery inspected. No persistent document overflow, broken rendered images or unexpected runtime/console errors.
- Keyboard checks: skip link, mobile focus wrap in both directions, inert background, Escape restoration, desktop disclosure activation, new-route focus, and CAD rotation/zoom. Screenshot comparison confirmed that the rotation button changes the rendered geometry.
- Playback checks: hero pause/play, reduced-motion still hero; Three.js is absent from initial homepage resource requests.
- Routing checks: legacy redirects, unknown programmes, prototype-like slugs and correct-category redirects. Failed-model injection displays a fallback while preserving programme content.
- Mocked provider checks: contact failure/retained values/retry/success; role preselection; invalid, empty and oversized CV rejection; upload failure without sending an application; retained upload on submission retry; complete successful reset; missing-configuration email paths. No test enquiries or resumes were sent to real providers.
- Historical homepage browser capture before the final font replacement: three font requests, approximately 767 kB transferred including the hero film and nearby imagery. The optional Three.js chunk remains 864 kB uncompressed, deliberately deferred; the build-size warning is retained rather than hidden.
- Historical local simulated mobile measurement before the final font replacement, at 375×812, 150 ms latency, 1.6 Mbps download and 4× CPU slowdown: LCP 2.59 seconds, CLS 0. Before removing the headline reveal delay, the same setup recorded 2.96 seconds. These are individual local lab observations, not Lighthouse scores or field guarantees.
- Browser scripts and captures are retained under `/tmp/aminuteman-qa/` for this session. An earlier MIME check flagged cached responses without content-type headers; rendered images were verified through their natural dimensions and the all-route media sweep.

## Currently working / review handoff

Read Claude's `FINAL_UX_AUDIT.md` and verified the resulting shared-workspace fixes. Programme ordinals now follow visible sections; all three Valley detail routes use numbered headings. The replacement static fonts render distinct, progressively heavier strokes at every declared weight. A fresh production sweep covered all 20 routes at all six requested widths: sequential section ordinals, exactly one H1, no document overflow and no page errors. Inspected the updated partner-page heading at desktop and mobile sizes. Build, lint and diff checks pass. No remaining local P0/P1 issue was found.

Production preview: http://localhost:4173. The development server is on port 5173. Server access can require local sandbox approval.

## Release limits and remaining external work

- No deployment was performed. The production artifact is in `dist/`; deployment instructions and hosting settings are in README and `render.yaml`.
- Provider configuration is absent locally. Email paths work; enabling hosted forms requires publishable Web3Forms and Cloudinary values in the build environment. Actual inbox delivery and provider-account restrictions have not been verified.
- Hosting rewrite precedence, route-specific social metadata delivery and security headers must be checked on the actual deployment. Local preview does not verify the hosting dashboard.
- Existing company/product factual claims are repository-supplied; no new testimonials, customers, performance claims or endorsements were fabricated. Independent company approval of existing claims remains outside the local engineering verification.

## Design decisions and research deviations

- Read PRODUCT_AUDIT, COMPETITIVE_RESEARCH, INFORMATION_ARCHITECTURE, DESIGN_SYSTEM, USER_BEHAVIOR and CODEX_REVIEW as they arrived.
- Desktop dropdowns deliberately use explicit activation instead of opening on hover/focus. This avoids accidental opening and conflicting click/focus state while keeping keyboard and touch behavior consistent. Claude acknowledged this choice in the available review.
- Home is shorter than USER_BEHAVIOR's older six-section snapshot. Browser inspection showed repeated programme listings, statistics and leadership content lengthening the primary journey; the dedicated pages preserve the useful detail.
- TrustBar is static rather than the marquee described in the design snapshot. Names and relationship bases are easier to inspect without motion, and a duplicate screen-reader list is unnecessary.
- Correction to PRODUCT_AUDIT: Madhya Pradesh is present in the supplied `OFFICES` data as a test/integration site. No new location claim was introduced.
- Coordination correction: CODEX_REVIEW's later correction notice reflects concurrent implementation changes. At the original baseline, Home did contain Clientele and UnifiedGrid, `.card::after` did draw corner ticks, and Related lacked its ordinal. These were verified and fixed during this session, rather than being imaginary original findings.

## Next highest-impact work

1. Optional final visual sign-off on the browser-verified audit fixes; the P1 findings are resolved.
2. Configure the intended production provider accounts if hosted forms are required.
3. Deploy `dist/` through the chosen hosting workflow, then verify direct route loads, metadata, headers and actual enquiry delivery.

## Final audit decisions

- About uses consistent text-only office entries because most locations had no supplied photograph. Authentic facility photography remains in the dedicated facility section; no replacement stock imagery or implied site documentation was invented.
- Kept the shared 29.5 kB logo asset and existing CSS crop. A supplied vector master would be the appropriate future optimization; this optional P2 refinement does not block the core journey.
- Earlier loading measurements above predate the replacement font assets and should not be presented as measurements of the final build. The font correction prioritizes the intended typography over deduplicating genuinely different weights.

## Human-design revision — 24 September 2026

User rejected the earlier visual direction as too template-like and requested avalonch.com as a reference. Inspected that site in Chromium after its entrance animation. Adopted its simpler opening composition and product emphasis; retained Aminuteman identity and existing company-supplied facts. Did not copy engagement names, add endorsements, or claim global operations.

- Rebuilt Home around a strong opening, editorial company introduction, prominent authentic engineering-floor photograph, three selected programmes, Valley integration links, and original field evidence.
- Replaced repeated numbered heading/card grids with varied layouts, quieter sentence-case Inter section typography, photographic captions and one warm neutral platform section.
- Removed homepage counter tiles, floating formation presentation, duplicate manifesto and partner strip. Detailed programme/research/company information remains on its existing routes.
- Removed global cursor-following glow and background grid washes. Shared section ordinals are small wayfinding labels; shared section headings display immediately. Removed the repeated footer slogan and made primary desktop navigation more legible.
- Preserved video controls, reduced-motion stills, responsive image infrastructure, navigation accessibility, routes, forms and optional programme CAD.
- Production build and lint pass. Homepage inspected at 1440, 1280, 1024, 768, 480 and 375 px with no overflow, broken images or runtime errors. Desktop and mobile full-page screenshots inspected. QA captures: `/tmp/aminuteman-qa/editorial-*.png`.
- This explicitly supersedes the earlier five-numbered-section homepage design decision and earlier final-design sign-off. Deployment and real provider verification remain outstanding.
