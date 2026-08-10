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

- **Layout.** `/{de,en,es,fr,pt}/` are the generated showcase pages (from the
  root `index.html` via `scripts/gen-index-pages.js`); the rest are standalone
  apps: `fm-pair/`, `tracker/`, `live_tracker/`, `garmin-devices/`,
  `garmin-pricing/`, `privacy*/`.
- **Site i18n.** `assets/js/i18n.js` holds the showcase translations and its
  `SUPPORTED` list is `de/en/es/fr/pt`. Language comes from the `/xx/` path,
  then `navigator.language`, then English, and `data-i18n` attributes are
  applied on load.
- **A companion page for a watch app ships the union of two language sets** —
  the site's five plus `ru`, which the apps ship and the site does not — using a
  **page-local** dictionary. Widening `SUPPORTED` instead would make every other
  page detect Russian and render English under `lang="ru"`. `fm-pair/index.html`
  is the reference; the rule is in `AI-Instructions/docs/LOCALIZATION.md`.
- **`fm-pair/`** is the pairing page for the Football Matches watch face: enter
  the code the watch shows, pick teams, set their priority order. It calls the
  `matches` Apps Script backend over **JSONP** (`callback=`), because Apps Script
  sends no CORS headers. It performs **exactly one write per visit** — the whole
  selection, in priority order, at the end — since `saveTeams` replaces the
  stored list wholesale.
- **`fm-pair/catalog-index.json`** is generated in the private `matches` repo and
  pushed here by its "Sync team catalog to apps-website" workflow. Do not edit it
  by hand.
