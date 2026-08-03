# apps-website

## Visual identity

This site is one of three sibling sites (mmendelson.com hub,
apps.mmendelson.com, run.mmendelson.com) sharing a standardized visual
identity — same fonts, token structure and brand-bar/footer pattern, each
site keeping its own accent color and its own menus/sections. The plan,
decisions, and phase checklist live in
[`website/BRAND_STANDARDIZATION.md`](https://github.com/mendelson/website/blob/main/BRAND_STANDARDIZATION.md)
(the hub repo).

- **Fonts**: IBM Plex Serif (display headings), IBM Plex Sans (body),
  IBM Plex Mono (wordmark/chrome and numeric surfaces), via Google Fonts.
- **Tokens** (`assets/css/visual.css`, top `:root` block): `--bg #111`,
  `--bg2 #1a1a1a`, `--bg3 #444`, `--bg3-hover #555`, `--fg #eee`,
  `--muted #9a9a9a`, `--line #333`, `--accent #3b82f6` (+ `--accent-dim`,
  `--accent-ink`). The accent is **blue** — it was already the de-facto
  accent of `/tracker/`, `/live_tracker/` and the privacy pages.
  `live_tracker`'s internal orange/blue map colors are functional
  semantics (athlete dot vs. user dot), not brand, and stay as they are.
- **Family chrome**: a slim brand bar (staircase mark + Home/Apps/Run
  switcher — no URL wordmark) above the app's own header/nav, and a
  structured footer (social row + site switcher + localized copyright).
  Both are classed `div`s, deliberately not bare `<header>/<nav>` elements —
  `visual.css` styles those element selectors for the app's own sticky nav.
  The brand bar is static (scrolls away) so the app nav keeps sticky
  `top: 0`. The footer's copyright line keeps `data-i18n="footer"`.
- **Favicon**: `assets/favicon.ico` + `favicon-{32,180,192,512}.png`,
  all derived (resize-only) from the staircase brand image.

## Path map

| Path | What it is |
|---|---|
| `/` | Language detector → redirects to `/{lang}/` |
| `/de/ /en/ /es/ /fr/ /pt/` | The apps showcase. Same page in every language; the crawler-facing head (`<html lang>`, `<title>`, `<meta description>`, self-canonical) is baked per language, the visible text is swapped client-side by `assets/js/i18n.js`. Generated from `index.html` — see below. |
| `/tracker/` | Garmin Tracker Data Field companion (reads `?trackId=…`; migrated here from mmendelson.com/tracker, which redirects here preserving the query) |
| `/live_tracker/` | Real-time Garmin LiveTrack map follower (renamed from `/tracker/`; per-user links `/live_tracker/?user=<user>`) |
| `/tracker/<user>` (legacy) | Caught by `404.html` → `/live_tracker/?user=<user>` (old Live Track share links) |
| `/live_tracker/<user>` | Caught by `404.html` → `/live_tracker/?user=<user>` |
| `/privacy_policy/{lang}/` | Canonical localized privacy policy (generated) |
| `/privacy_policy/ /policy/ /privacy/` | Language-detecting redirect stubs → `/privacy_policy/<lang>/` (generated) |
| `/garmin-pricing/` | Redirect stub → KiezelPay checkout (`kiezelpay.com/code/?s=…`). Centralized here so `mmendelson.com/garmin-pricing` and any other site only ever have to hop through this one URL. |
| `/404.html` | Pretty-URL router (per-user tracker links) + fallback |

**Editing the main page.** `index.html` is the single source (it is also the
English root that redirects `/` → `/{lang}/`). Edit it, then regenerate the
five language copies:

```sh
node scripts/gen-index-pages.js
```

The generator ([`scripts/gen-index-pages.js`](scripts/gen-index-pages.js))
copies `index.html` verbatim into `{de,en,es,fr,pt}/index.html`, stamping only
four head fields per language: `<html lang>`, `<title>`, the meta description,
and a self-`canonical` (`https://apps.mmendelson.com/{lang}/`). This gives each
URL a real per-language identity for search engines and social previews while
the runtime i18n (`assets/js/i18n.js`, which reads the language from the URL
path) keeps translating the visible content. The shared `hreflang` cluster is
identical across all copies (reciprocal, as required); the root `/` keeps its
canonical to `https://apps.mmendelson.com/` as the `x-default`. Per-language
`<title>`/description strings live in the generator's `T` table — bump them
there, not in the generated files. **Do not hand-edit the five generated
`{lang}/index.html` files.**

## Adding an app

- **Card** in `index.html`: set `data-name` exactly as the row key in the metrics API (Google Apps Script), e.g. `Split Pacer Pro`. After editing the cards, run `node scripts/gen-index-pages.js` — it refreshes the `SoftwareApplication` structured data (see "Structured data" below) and the five language copies.
- **Thumbnail** in `img/`; for Split Pacer Pro the icon is exported from `../SplitPacerPro/resources/drawables/launcher_icon.svg` (512px PNG as `img/split-pacer-pro.png` — regenerate with the `SplitPacerPro` script `npm run export-launcher-icons` or a one-off `node` + `@resvg/resvg-js` resize if the SVG changes).
- **Featured carousel**: first slide uses API field **`app_age_approx_days`** (computed in Apps Script, same rules as the sheet text) or falls back to parsing `app_age` in the browser. **Not** `launch_date`. Ties → higher 7‑day installs, then total downloads. Alongside the all‑time favorite (top app by `total_downloads`), the carousel also features the top app of the **other** category — top data field if the favorite is a watch face, and vice‑versa (`topDataField` / `topWatchFace` reasons, category read from the `#data-fields` / `#watch-faces` section) — so both categories are always represented. Config: [`assets/js/script.js`](assets/js/script.js) (`buildFeaturedCarousel`); reason copy in [`assets/js/i18n.js`](assets/js/i18n.js) (`featuredReasons`). The web app must be **redeployed** after editing [`scripts/garmin-metrics-cache-sync.gs`](scripts/garmin-metrics-cache-sync.gs); run `updateCache()` so the cache sheet matches the source.

## Structured data

The home page carries an `ItemList` of `schema.org/SoftwareApplication`
entries — one per app card — so search engines read the pages as a software
catalogue (the query space where this markup helps). It is generated by
[`scripts/gen-index-pages.js`](scripts/gen-index-pages.js), which reads each
`.card` in `index.html` (name, Connect IQ store URL, icon, and category from
the `#data-fields` / `#watch-faces` section) and rewrites the block between the
`<!-- apps-jsonld:start -->` / `<!-- apps-jsonld:end -->` markers. Nothing is
hardcoded — re-run the generator after adding or editing a card. The same block
is language-neutral, so it is copied into all five localized pages.

**Deliberately omitted:** `aggregateRating` and `offers`/`price`. The cards show
download counts, not real star ratings, and prices aren't on the page — so
Google won't render the app *rich result* (stars/price) yet, but the entities
are declared correctly. Add rating/price to the generator **only** when real,
on-page data exists (never invent them — it violates schema policy).

## Privacy policy

- **One policy for every app** (all current and future data fields and watch faces). Same document, localized into the site's five languages: `privacy_policy/{de,en,es,fr,pt}/index.html`, each with the site's 🌐 language switcher.
- **Three entry paths, one document.** `/privacy_policy`, `/policy` and `/privacy` are each a small redirect (`<entry>/index.html`) that detects the browser language and forwards to `/privacy_policy/<lang>/` (default `en`). Keep all three in sync — they are generated together (see below). The canonical language pages live only under `/privacy_policy/<lang>/`.
- **Do not hand-edit the eight generated HTML files.** Edit the text in [`scripts/privacy-translations.js`](scripts/privacy-translations.js) (and the shared template/CSS in [`scripts/gen-privacy-policy.js`](scripts/gen-privacy-policy.js)), then regenerate:

  ```sh
  node scripts/gen-privacy-policy.js
  ```

  This rewrites the five localized pages and the three redirect stubs. Bump the "Last updated" date in `privacy-translations.js` when the policy content changes.