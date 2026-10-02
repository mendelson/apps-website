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
- **`live_tracker/` is NOT the Live Tracker watch app** and shares nothing with
  it but the name. It is a standalone web page that follows a Garmin LiveTrack
  share link (`livetrack.garmin.com/session/…`) by reading Garmin's public page
  through the Apps Script proxy — no watch code, no Connect IQ, no store
  listing. Do not go looking for it in the watch repos, and do not apply watch
  rules (devices, tiers, `.iq`) to it. Its own notes: `live_tracker/README.md`.
  It depends on services that change under it without notice (Garmin's page,
  the map tiles), so `live-tracker-check.yml` tests it against them daily —
  run `node scripts/check-live-tracker.js` after touching it.
- **Site i18n.** `assets/js/i18n.js` holds the showcase translations and its
  `SUPPORTED` list carries the **28 Connect IQ Store locales** (the set rule 30
  puts on every listing), under URL codes, not Store codes: `pt` (Brazil),
  `pt-pt`, `zh-cn`, `zh-tw`, `he` (Store `iw`), `id` (Store `in`), `nb`, and the
  plain two-letter rest. Language comes from the first `/xx/` or `/xx-yy/` path
  segment, then `navigator.languages` (each tag through `langFromTag`, which
  maps `pt-PT`/`pt-AO`… to `pt-pt`, `zh-Hant`/`TW`/`HK`/`MO` to `zh-tw`,
  `no`/`nn` to `nb`, `iw` to `he`, `in` to `id`), then English. `HTML_LANG`
  turns the three lower-case codes into real BCP 47 tags (`pt-PT`, `zh-CN`,
  `zh-TW`), and `he` also gets `dir="rtl"` — so anything new that positions
  with `left`/`right` breaks the Hebrew pages; use `inset-inline-*`,
  `margin-inline-*` and `text-align: start`.
- **The site, its companion pages and the Store listings ship the SAME 28**
  since 2026-10-02 (before that the site had seven: `ru` and `it` came on
  2026-08-10). Every surface carries them: the showcase, `consent.js`, the
  privacy policy, `fm-pair/`, `live_tracker/` and `tracker/`. The run site
  (`corridas`) carries the same 28 under the same URL codes.
- **Widening `SUPPORTED` is only safe once every page has the strings**: a code
  in that list makes every page detect the language and then render English
  under `<html lang="xx">` if it has no dictionary. The order is translate,
  then widen, then load each page in that language and look.
- **`fm-pair/` and `tracker/` keep their own page-local dictionaries** (a `t()`
  helper plus a `?lang=` override) because a single-URL companion page — the
  watch links straight to it — has no `/xx/` path to read and no language
  switcher. `live_tracker/` has its own `TRANSLATIONS` and a menu, and
  remembers the choice in `localStorage['gt-lang']`. On `tracker/`, "Track ID"
  is left in English in every language on purpose: it is the label the watch
  shows. On `fm-pair/`, national-team names come from `team-names-i18n.json`,
  which the `matches` repo generates for only six languages; `pt-pt` reads the
  `pt` column (`TEAM_LANG`), and the rest show the English name until that
  generator is widened.
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
  `scripts/privacy-translations.js` (all 28 languages; Russian is stored
  `\uXXXX`-escaped) and the pages are generated — never edit
  `privacy_policy/*/index.html` by hand.
