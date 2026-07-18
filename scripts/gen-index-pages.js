#!/usr/bin/env node
/*
 * gen-index-pages.js — regenerate the five language copies of the apps
 * showcase from the canonical source `index.html`.
 *
 * The site's five URLs (/de/ /en/ /es/ /fr/ /pt/) have always existed, but
 * every copy used to be a *byte-identical* clone of the English HTML — the
 * translation happened only client-side in assets/js/i18n.js. To a crawler
 * that is five duplicate English pages: English titles/descriptions in every
 * locale's search results, and no per-URL language signal.
 *
 * This generator stamps the few head fields that must be correct *before*
 * JavaScript runs — the language, the title, the meta description and a
 * self-canonical — into each copy. Everything else (layout, GA, the shared
 * hreflang cluster, the runtime i18n) is preserved verbatim from index.html,
 * so there is still exactly one file to edit for structural changes.
 *
 * The visible page text keeps being translated at runtime by i18n.js (which
 * derives the language from the URL path, matching the <html lang> stamped
 * here). document.title is NOT touched by i18n.js, so the baked <title> is
 * also what the browser tab shows.
 *
 * Run after editing index.html (or the strings below):
 *   node scripts/gen-index-pages.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SITE = "https://apps.mmendelson.com";

// Per-language <title> + <meta name="description">. The rest of the page is
// translated at runtime; only these crawler-facing head strings are baked in.
const T = {
  de: {
    title: "Garmin-Apps – M. Mendelson",
    desc: "Garmin Connect IQ Apps von M. Mendelson. Data Fields und Watch Faces im Connect IQ Store.",
  },
  en: {
    title: "Garmin Apps – M. Mendelson",
    desc: "Garmin Connect IQ apps developed by M. Mendelson. Data fields and watch faces available on the Connect IQ Store.",
  },
  es: {
    title: "Apps de Garmin – M. Mendelson",
    desc: "Apps de Garmin Connect IQ desarrolladas por M. Mendelson. Data fields y watch faces disponibles en la Connect IQ Store.",
  },
  fr: {
    title: "Applications Garmin – M. Mendelson",
    desc: "Applications Garmin Connect IQ développées par M. Mendelson. Champs de données et cadrans disponibles sur le Connect IQ Store.",
  },
  pt: {
    title: "Apps para Garmin – M. Mendelson",
    desc: "Apps Garmin Connect IQ desenvolvidos por M. Mendelson. Data fields e watch faces disponíveis na Connect IQ Store.",
  },
};

// ---------------------------------------------------------------------------
// SoftwareApplication structured data (ItemList of the app cards).
//
// Each static .card in index.html represents a real Garmin Connect IQ app. We
// emit one schema.org/SoftwareApplication per card so search engines recognize
// the pages as a software catalogue (the query space — "garmin pacer data
// field", "garmin watch face free" — where this markup helps). Everything is
// read from the card markup itself (name, store URL, icon, category from the
// section), so it never drifts from the page and holds no hardcoded values.
//
// Deliberately NOT emitted: aggregateRating and offers/price. The cards carry
// download counts, not real star ratings, and the prices are not on the page —
// inventing either would be a schema-policy violation. Without them Google will
// not render the app *rich result* (stars/price), but the entities are still
// declared correctly for categorization; add rating/price here only when real,
// on-page data exists.
// ---------------------------------------------------------------------------
function buildAppsJsonLd(source) {
  const dataFieldsAt = source.indexOf('id="data-fields"');
  const watchFacesAt = source.indexOf('id="watch-faces"');

  const cardRe = /<div class="card" data-name="([^"]+)">([\s\S]*?)(?=<div class="card"|<\/section>)/g;
  const items = [];
  let m;
  while ((m = cardRe.exec(source)) !== null) {
    const name = m[1];
    const body = m[2];
    const pos = m.index;
    // A card is a watch face only if it sits after the #watch-faces section;
    // everything from #data-fields onward (before that) is a data field.
    const isWatchFace = watchFacesAt >= 0 && pos > watchFacesAt;
    const inCatalogue = dataFieldsAt >= 0 && pos > dataFieldsAt;
    if (!inCatalogue) continue; // skip anything before the catalogue (e.g. featured markup)

    const store = /<a class="ciq-badge"[^>]*href="([^"]+)"/.exec(body);
    const thumb = /<img class="thumb" src="([^"]+)"/.exec(body);
    if (!store || !thumb) {
      throw new Error(`card "${name}" is missing a store badge or thumbnail`);
    }
    const img = thumb[1].startsWith("http") ? thumb[1] : SITE + thumb[1];

    items.push({
      "@type": "ListItem",
      position: items.length + 1,
      item: {
        "@type": "SoftwareApplication",
        name,
        applicationCategory: "HealthApplication",
        applicationSubCategory: isWatchFace ? "Watch Face" : "Data Field",
        operatingSystem: "Garmin Connect IQ",
        url: store[1],
        image: img,
        author: {
          "@type": "Person",
          name: "Mateus Mendelson",
          url: "https://mmendelson.com/",
        },
      },
    });
  }

  if (!items.length) throw new Error("no app cards found — refusing to emit an empty ItemList");

  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Garmin Connect IQ apps by M. Mendelson",
    itemListElement: items,
  };
  return (
    '<script type="application/ld+json">\n' +
    JSON.stringify(data, null, 2) +
    "\n</script>"
  );
}

let template = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");

// Refresh the JSON-LD region in the source, then persist it back to index.html
// so the root page carries current structured data too. The five language
// copies inherit the same block (app names/URLs/categories are language-neutral).
{
  const START = "<!-- apps-jsonld:start";
  const END = "<!-- apps-jsonld:end -->";
  const s = template.indexOf(START);
  const e = template.indexOf(END);
  if (s < 0 || e < 0) {
    throw new Error("apps-jsonld markers not found in index.html");
  }
  const startLineEnd = template.indexOf("\n", s) + 1;
  const jsonld = buildAppsJsonLd(template);
  template =
    template.slice(0, startLineEnd) + jsonld + "\n" + template.slice(e);
  fs.writeFileSync(path.join(ROOT, "index.html"), template);
  const count = (jsonld.match(/"@type": "SoftwareApplication"/g) || []).length;
  console.log(`refreshed apps JSON-LD in index.html (${count} SoftwareApplication entries)`);
}

// Sanity-check the four anchors exist exactly once in the source, so a future
// edit that renames them fails loudly instead of silently producing English
// copies.
const anchors = [
  /<html lang="en"/,
  /<title>[^<]*<\/title>/,
  /<meta name="description" content="[^"]*"\s*\/?>/,
  /<link rel="canonical" href="[^"]*"\s*\/?>/,
];
for (const re of anchors) {
  const matches = template.match(new RegExp(re, "g")) || [];
  if (matches.length !== 1) {
    throw new Error(`expected exactly one match for ${re}, found ${matches.length}`);
  }
}

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

for (const [lang, t] of Object.entries(T)) {
  const html = template
    .replace(/<html lang="en"/, `<html lang="${lang}"`)
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(t.title)}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${esc(t.desc)}" />`
    )
    .replace(
      /<link rel="canonical" href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${SITE}/${lang}/" />`
    );

  const dir = path.join(ROOT, lang);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html);
  console.log(`wrote ${lang}/index.html  (lang=${lang}, canonical=${SITE}/${lang}/)`);
}
