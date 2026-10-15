# Aminuteman Technologies — website

Single-page site for [aminutemantechnologies.com](https://aminutemantechnologies.com),
a structural clone of the parent company's site, [avalonch.com](https://www.avalonch.com),
carrying Aminuteman's own programmes, partners and contact details.

## Layout

```
index.html        the whole site: head, inline CSS, markup, inline JS
public/           served as-is at the root (images, videos, fonts, favicons, sitemap)
render.yaml       Render static-site blueprint: headers, CSP, redirects
docs/             design notes from the previous multi-page build (historical)
tasks/            working notes
```

The page has three hash routes: `/#home`, `/#products` (tabs: Hardware, Software,
Future Roadmap, Research & Development) and `/#contact`. The old multi-page URLs
redirect to the matching hash in `render.yaml`.

## Working on it

```
npm install
npm run dev        # http://localhost:5173
npm run build      # writes dist/
npm run preview    # serves dist/ on :4173
```

Vite is used only to copy `public/` and to substitute `%VITE_WEB3FORMS_ACCESS_KEY%`
into `index.html`. There is no bundling step; edit `index.html` directly.

## Content rules

- Programme copy, partner names and contact details are the only things that
  differ from the parent site. Keep the structure identical.
- Partners are listed by name only. Never describe the work done with a named partner.
- Do not caption an image unless what it shows has been confirmed.

## Forms and analytics

See `FORMS_INTEGRATION.md`. Analytics is PostHog (US cloud); the snippet lives in
the head of `index.html`, and the enquiry form fires `enquiry_submitted`.
