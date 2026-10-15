# Lessons

- 2026-10-15 — When replacing an element's opening tag by searching for `>`, remember attributes
  (inline handlers, arrow functions) can contain `>`. Anchor on the real terminator (`">`) and
  verify with a screenshot of the affected section; the contact page shipped a leaked handler
  fragment in the first local build before this was caught.
- 2026-10-15 — Headless Chrome at a 390px window is not a phone: the parent site shows the same
  nav/hero overflow there while a real mobile browser renders it fine. Compare against the parent
  before "fixing" a mobile layout.
