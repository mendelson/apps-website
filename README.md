# apps-website

## Adding an app

- **Card** in `index.html`: set `data-name` exactly as the row key in the metrics API (Google Apps Script), e.g. `Split Pacer Pro`.
- **Thumbnail** in `img/`; for Split Pacer Pro the icon is exported from `../SplitPacerPro/resources/drawables/launcher_icon.svg` (512px PNG as `img/split-pacer-pro.png` — regenerate with the `SplitPacerPro` script `npm run export-launcher-icons` or a one-off `node` + `@resvg/resvg-js` resize if the SVG changes).
- **Featured carousel**: first slide uses API field **`app_age_approx_days`** (computed in Apps Script, same rules as the sheet text) or falls back to parsing `app_age` in the browser. **Not** `launch_date`. Ties → higher 7‑day installs, then total downloads. Config: [`assets/js/script.js`](assets/js/script.js). The web app must be **redeployed** after editing [`scripts/garmin-metrics-cache-sync.gs`](scripts/garmin-metrics-cache-sync.gs); run `updateCache()` so the cache sheet matches the source.