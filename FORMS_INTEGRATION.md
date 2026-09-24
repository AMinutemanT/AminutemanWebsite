# Enquiries and applications

Contact submits enquiries through Web3Forms. Careers uploads the CV to Cloudinary
and submits its returned URL with the application through Web3Forms. Both are
browser-side integrations; no server secrets belong in this repository.

## Configuration

Copy `.env.example` to `.env.local` for local development. Set the same publishable
values in the deployment's build environment:

```env
VITE_WEB3FORMS_ACCESS_KEY=
VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=
```

The Web3Forms key is tied to the intended recipient's account. Cloudinary must use
an unsigned upload preset in the intended company account. Configure that preset
for the accepted document formats (PDF, DOC, DOCX), a 5 MB size limit and the
appropriate application-upload folder. The browser's validation is a convenience;
provider-side restrictions must also be configured.

All `VITE_` values are public in the generated bundle. Never include a Cloudinary
API secret, private API key or signing credential. Restart the development server
after changing variables, and rebuild for production changes.

There are no embedded fallback account values. Without a Web3Forms key, Contact
offers a direct email enquiry path. Without all three values, Careers offers an
email application path with the selected role included in the subject. This keeps
the user journey available on unconfigured preview deployments.

## Submission behavior

- Required fields use browser validation and persistent labels.
- Fields and submit buttons lock while a request is pending.
- Failures retain entered values; status messages are announced to assistive technology.
- Enquiry requests time out after 30 seconds; CV uploads after 60 seconds.
- A successful upload is retained if the application submission fails, so retrying
  does not upload the same CV twice.
- Selecting an invalid replacement clears the previous CV and upload URL.
- Success resets all inputs, including the native file input.

## Verification

Use intercepted/mock requests for routine browser testing. Cover contact failure,
retry and success; job selection; invalid type and oversize CVs; upload failure;
submission failure after upload; retry without duplicate upload; successful reset;
and the missing-configuration email paths.

A real delivery check must be performed against the configured deployment and
verified in the intended recipient's inbox. Local mocked checks establish UI and
request behavior, not inbox delivery or provider-account configuration. Avoid
sending unsolicited test enquiries or personal documents during automated QA.
