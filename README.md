# apps-website

## Adding an app

- **Card** in `index.html`: set `data-name` exactly as the row key in the metrics API (Google Apps Script), e.g. `Split Pacer Pro`.
- **Thumbnail** in `img/`; for Split Pacer Pro the icon is exported from `../SplitPacerPro/resources/drawables/launcher_icon.svg` (512px PNG as `img/split-pacer-pro.png` — regenerate with the `SplitPacerPro` script `npm run export-launcher-icons` or a one-off `node` + `@resvg/resvg-js` resize if the SVG changes).
- **Featured carousel**: first slide spotlights the app with the **smallest parsed `app_age`** (youngest by that string, not launch date). Remaining slides are unique picks by installs / totals / users — **each `.card` appears at most once**. Config: [`assets/js/script.js`](assets/js/script.js).