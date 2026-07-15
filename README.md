# apps-website

## Adding an app

- **Card** in `index.html`: set `data-name` exactly as the row key in the metrics API (Google Apps Script), e.g. `Split Pacer Pro`.
- **Thumbnail** in `img/`; for Split Pacer Pro the icon is exported from `../SplitPacerPro/resources/drawables/launcher_icon.svg` (512px PNG as `img/split-pacer-pro.png` — regenerate with the `SplitPacerPro` script `npm run export-launcher-icons` or a one-off `node` + `@resvg/resvg-js` resize if the SVG changes).
- **Featured carousel**: first slide uses API field **`app_age_approx_days`** (computed in Apps Script, same rules as the sheet text) or falls back to parsing `app_age` in the browser. **Not** `launch_date`. Ties → higher 7‑day installs, then total downloads. Alongside the all‑time favorite (top app by `total_downloads`), the carousel also features the top app of the **other** category — top data field if the favorite is a watch face, and vice‑versa (`topDataField` / `topWatchFace` reasons, category read from the `#data-fields` / `#watch-faces` section) — so both categories are always represented. Config: [`assets/js/script.js`](assets/js/script.js) (`buildFeaturedCarousel`); reason copy in [`assets/js/i18n.js`](assets/js/i18n.js) (`featuredReasons`). The web app must be **redeployed** after editing [`scripts/garmin-metrics-cache-sync.gs`](scripts/garmin-metrics-cache-sync.gs); run `updateCache()` so the cache sheet matches the source.

## Privacy policy

- **One policy for every app** (all current and future data fields and watch faces). Same document, localized into the site's five languages: `privacy_policy/{de,en,es,fr,pt}/index.html`, each with the site's 🌐 language switcher.
- **Three entry paths, one document.** `/privacy_policy`, `/policy` and `/privacy` are each a small redirect (`<entry>/index.html`) that detects the browser language and forwards to `/privacy_policy/<lang>/` (default `en`). Keep all three in sync — they are generated together (see below). The canonical language pages live only under `/privacy_policy/<lang>/`.
- **Do not hand-edit the eight generated HTML files.** Edit the text in [`scripts/privacy-translations.js`](scripts/privacy-translations.js) (and the shared template/CSS in [`scripts/gen-privacy-policy.js`](scripts/gen-privacy-policy.js)), then regenerate:

  ```sh
  node scripts/gen-privacy-policy.js
  ```

  This rewrites the five localized pages and the three redirect stubs. Bump the "Last updated" date in `privacy-translations.js` when the policy content changes.