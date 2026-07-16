# needs-fact.md

Facts the site needs from Jay. Sections shipped complete without them, per
FACTS.md; nothing below blocks the page, everything below would improve it.

- **Contact path.** There is no contact email, booking link, or social
  profile in FACTS.md, so the page currently closes with the company name
  and city and no way to reach you. The buyer brief says the reader decides
  in under two minutes; they need somewhere to land. One real email address
  (and optionally a cal.com link) unlocks a proper close and a contact CTA.
  `lib/site.ts` still carries non-rendered placeholder values for
  SITE_URL, CAL_COM_LINK, CONTACT_EMAIL, X_URL, and LINKEDIN_URL; none of
  them render, but they should be filled or deleted before launch.
