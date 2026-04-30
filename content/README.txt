Site copy (English strings)

- Editable website UI text (one JSON file): `public/data/WebsiteTextVariables.json` (served at `/data/WebsiteTextVariables.json`; also imported at build time via `#website-text-variables`).
- Legal / privacy GDPR sections 2–11 and full General Terms (GTC): `content/site-copy.legal.en.json`.

Dynamic data (salon address from the artist portal, FAQ items from the database, service prices, reviews) still comes from your existing content pipeline, not from these files.
