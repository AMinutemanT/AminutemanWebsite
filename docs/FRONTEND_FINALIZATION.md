# Frontend finalization — 25 September 2026

## Baseline and reference

Inspected the repository, build configuration, route model, shared UI, local fonts, imagery, motion, forms and current working-tree changes. Built and ran the production preview, captured every route on desktop and mobile, then checked all six requested widths. Existing company-data and About corrections were preserved.

The requested ANTI_SLOP_AUDIT, PARENT_REFERENCE, HUMANIZATION_PLAN and HUMANIZATION_REVIEW files were absent at the start and at the final documentation check. This is an implementation report, not a substitute attributed to the design reviewer. Existing design/IA/review documents and the user brief guided the work. The Avalonch reference was inspected in the previous session, including its loaded desktop page: condensed masthead typography, restrained black/orange palette and straightforward navigation are retained as family traits. Its pages, imagery, engagement claims and entrance animation were not copied.

## Findings and changes

- **Typography:** condensed capitals previously competed at masthead, section, card, specification and body-statement levels. Big Shoulders now anchors mastheads; Inter handles section headings, technical subheadings and data. The scale is smaller, line height is more generous, and section labels share one line with their ordinal. Labels/statuses are readable text instead of repeated outlined badges.
- **Software catalogue:** five empty image placeholders and a filler enquiry tile made the AI index feel unfinished. Programme summaries now form a text-led list with explicit maturity and details links. The hardware index uses image/text rows, keeping supplied product material visible without imposing identical tiles on both categories.
- **Programme detail:** imagery sits beside the title and description. Software pages no longer invent terrain or reserve space for a missing image. Specifications follow the overview, with a working jump link from the header. Specifications use semantic description lists and tabular numerals. Capability lists retain their content with simpler rules rather than boxed cards.
- **Tone:** Contact, Careers, About and Valley entry headings are more descriptive. Several campaign-style statements were simplified. No capability figures, customers, awards or endorsements were added. The homepage film is explicitly identified as a CAD visualisation.
- **Motion:** removed per-block scroll/stagger reveals and masthead word reveals. Content is immediately present; existing wrappers preserve layout. Navigation, playback, interactive models and the short route transition retain useful feedback and reduced-motion handling.
- **Decoration and interaction:** removed contour backdrops, orange washes and the Valley ghost wordmark. Non-functional hover-only diagram buttons are now informational list items. Fleet links retain real imagery with less enclosing chrome and no hover zoom.
- **Spacing:** compacted mastheads and default sections; technical rows, specifications, product imagery and the homepage field record use different compositions. Mobile reflows image/text pairs and catalogue rows rather than squeezing columns.
- **Provenance:** retained the pre-existing corrections to office photography and company records. Office alt text describes an office interior; it does not imply assembly or secure engineering facilities.

## Verification

- Build (including TypeScript), lint and whitespace checks pass.
- All 20 sitemap routes checked at 1440, 1280, 1024, 768, 480 and 375 px in both normal and reduced-motion modes; no page or console errors in the final normal-motion sweep. Desktop/mobile scroll sweeps report no broken images or overflow. Full-page screenshots reviewed across route families and individual programme pages.
- Skip link, mobile inert background/Escape/focus restoration, hero pause, specifications jump and CAD rotate/zoom pass.
- Mocked Contact: failure, retained values, retry and success pass.
- Mocked Careers: role preselection, invalid/empty/oversized CV rejection, upload failure without submission, retained upload on retry and successful reset pass. No real provider messages or uploads were made.
- Published routes, product data, legacy redirects, programme links and form processing are preserved.
- No dependencies added. Main application JS reduced from approximately 207.86 kB to 199.93 kB raw in the inspected builds; CSS from 44.04 kB to 39.38 kB. The optional CAD renderer remains a deferred 889 kB chunk and retains its build warning. These are bundle measurements, not field performance scores.

## Release boundaries

Local implementation and QA do not verify company claims, production form delivery or hosting configuration. Existing company-supplied factual claims remain subject to company review. The requested new design review is unavailable rather than assumed approved. No deployment was performed. Preview: http://localhost:4173.
