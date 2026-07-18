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

const template = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");

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
