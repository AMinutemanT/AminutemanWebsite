# Enquiry form

The single enquiry form on `#contact` posts to [Web3Forms](https://web3forms.com)
from the browser (`fetch`, JSON). The access key is public by design and is
written into `index.html` at build time from `VITE_WEB3FORMS_ACCESS_KEY`
(Vite's `%VITE_*%` HTML replacement). Set it in the Render dashboard under
Environment, or in a local `.env`.

- Fields sent: `name`, `organisation`, `email`, `subject` (the enquiry type),
  `message`, plus `form_type = "Contact Form"` and `from_name`.
- A hidden `botcheck` checkbox is the honeypot; a filled one is dropped client-side.
- With no key configured the form opens a pre-filled `mailto:` to the programme
  office instead, so the page never swallows an enquiry.
- A successful send fires the PostHog event `enquiry_submitted` with the subject.
