<!-- ai-instructions:reference — rule M. Do not replace with copied rules. -->

## Authoritative instructions — read them, they are NOT here

The account-wide rules live in **[`mendelson/AI-Instructions`](https://github.com/mendelson/AI-Instructions)**
and that repo is the single source of truth. **Read its `README.md` at the start
of every session**, before planning work in this repo. If the session does not
have it attached, attach it first (`add_repo` → `mendelson/AI-Instructions`);
the rules are not optional context.

Start with `README.md` (the rules themselves), then the `docs/` page for
whatever you are touching — build, tests, localization, warnings, tiering,
Apps Script, verification method.

**This file does not restate those rules, and must never be edited to.** A copy
here is correct the day it is written and silently wrong afterwards, because
nothing keeps it in sync — that is rule M, and it was written after a repo's
mirrored copy quietly dropped a rule and ran a whole session without it.

What belongs here instead: **facts about THIS repo** — its layout, its build
quirks, the findings that cost someone a day, and *how* a rule lands here
(naming a rule and pointing at the file it applies to is a reference; explaining
what the rule is, is a copy).

**If this file ever contains restated rules, or is missing this header, fix it
in the session you notice** — do not file it as future work. Procedure:
`AI-Instructions/docs/INSTRUCTIONS-SOURCING.md`.
---

## This repo

Static site on GitHub Pages (`apps.mmendelson.com`), plain HTML/CSS/JS — **no
build step and no dependencies**. Anything added has to work as a file the
browser loads directly.

- **Layout.** `/{de,en,es,fr,it,pt,ru}/` are the generated showcase pages (from the
  root `index.html` via `scripts/gen-index-pages.js`); the rest are standalone
  apps: `fm-pair/`, `tracker/`, `live_tracker/`, `garmin-devices/`,
  `garmin-pricing/`, `privacy*/`.
- **Site i18n.** `assets/js/i18n.js` holds the showcase translations and its
  `SUPPORTED` list is `de/en/es/fr/it/pt/ru` — **seven, matching the apps**
  (rule G). Language comes from the `/xx/` path, then `navigator.language`, then
  English, and `data-i18n` attributes are applied on load.
- **The site and the apps ship the SAME set, and that is new.** They used to
  differ — the site had `es` and no `ru`, the apps had `ru` and no `es` — so
  whichever of the two a customer spoke, one half of the product answered in
  English. `ru` and `it` were added here on 2026-08-10 in the same pass that
  added `spa`/`ita` to the watch face.
- **Widening `SUPPORTED` is only safe once every page has the strings**, which
  is why it could not be done before: a code in that list makes every page
  detect the language and then render English under `<html lang="ru">` if it has
  no dictionary. The order is translate, then widen, then load each page in that
  language and look.
- **`fm-pair/` keeps its own page-local dictionary** (a `t()` helper plus a
  `?lang=` override) because a single-URL companion page has no `/xx/` path to
  read and no language switcher. It carries all seven too.
- **`fm-pair/`** is the pairing page for the Football Matches watch face: enter
  the code the watch shows, pick teams, set their priority order. It calls the
  `matches` Apps Script backend over **JSONP** (`callback=`), because Apps Script
  sends no CORS headers. It performs **exactly one write per visit** — the whole
  selection, in priority order, at the end — since `saveTeams` replaces the
  stored list wholesale.
- **`fm-pair/catalog-index.json`** is generated in the private `matches` repo and
  pushed here by its "Sync team catalog to apps-website" workflow. Do not edit it
  by hand.
- **Analytics is family-wide and hand-duplicated.** The GA4 head block sits in
  **19 HTML files plus `scripts/gen-privacy-policy.js`** — all byte identical,
  and the generator's copy is the one that silently reverts an edit if you miss
  it, because the policy pages are regenerated. All three family sites send to
  the **same measurement id**, which is what makes a visit across apps/hub/run
  one session. Consent is a cookie on `.mmendelson.com`
  (`mmConsentGet`/`mmConsentSet`, defined in that head block, used by
  `assets/js/consent.js`), never `localStorage` — that is per-origin and made
  each site ask again. Bump the `consent.js?v=` cache-buster when the helper
  changes, and re-run **both** generators (`gen-index-pages.js`,
  `gen-privacy-policy.js`) after touching `index.html` or the policy strings.
- **The privacy policy is the family's, not this site's.** It covers all three
  domains and is the page every consent banner links to, including the ones on
  the hub and run, which have no policy page of their own. Its text lives in
  `scripts/privacy-translations.js` (seven languages, Russian stored
  `\uXXXX`-escaped) and the pages are generated — never edit
  `privacy_policy/*/index.html` by hand.
