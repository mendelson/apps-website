const fs = require("fs");
const path = require("path");

const SITE = path.join(__dirname, "..");
const ROOT = path.join(SITE, "privacy_policy");
const EMAIL = "mateusmendelson@hotmail.com";
const GARMIN_URL = "https://www.garmin.com/en-US/privacy/connect/";

const LANGS = [
  ["de", "Deutsch"],
  ["en", "English"],
  ["es", "Español"],
  ["fr", "Français"],
  ["pt", "Português"],
];

const CSS = `
  :root {
    --bg: #111; --surface: #1a1a1a; --surface2: #202020; --border: #333;
    --text: #eee; --muted: #9a9a9a; --primary: #3b82f6; --accent: #f97316; --maxw: 820px;
  }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: 'IBM Plex Sans', system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    background: var(--bg); color: var(--text); line-height: 1.65; -webkit-text-size-adjust: 100%; }
  a { color: var(--primary); }
  a:hover { color: #60a5fa; }

  header.page { text-align: center; padding: 24px 20px; border-bottom: 1px solid var(--border); background: var(--surface); }
  .header-top { display: flex; justify-content: flex-end; }
  header.page h1 { margin: 8px 0 6px; font-size: clamp(24px, 5vw, 34px); }
  header.page .sub { margin: 0; color: var(--muted); font-size: 15px; }
  .home-link { display: inline-block; margin-top: 16px; font-size: 14px; text-decoration: none;
    padding: 7px 14px; border: 1px solid var(--border); border-radius: 999px; color: var(--text); }
  .home-link:hover { border-color: var(--primary); color: var(--primary); }

  /* Language selector — mirrors the site header control */
  .lang-selector { position: relative; display: inline-flex; align-items: center; }
  .lang-btn { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.18);
    border-radius: 50%; width: 34px; height: 34px; font-size: 18px; line-height: 1; cursor: pointer;
    transition: background .2s; display: flex; align-items: center; justify-content: center; padding: 0; color: inherit; }
  .lang-btn:hover { background: rgba(255,255,255,0.18); }
  .lang-dropdown { display: none; position: absolute; right: 0; top: calc(100% + 6px); background: #1e1e1e;
    border: 1px solid #333; border-radius: 10px; overflow: hidden; min-width: 140px;
    box-shadow: 0 8px 24px rgba(0,0,0,.5); z-index: 1001; }
  .lang-selector.open .lang-dropdown { display: block; }
  .lang-option { display: block; padding: 9px 16px; color: #bbb; text-decoration: none; font-size: 14px;
    transition: background .15s, color .15s; }
  .lang-option:hover { background: #2a2a2a; color: #fff; }
  .lang-option.active { color: #fff; font-weight: 600; }

  main { max-width: var(--maxw); margin: 0 auto; padding: 32px 20px 64px; }
  .meta { color: var(--muted); font-size: 14px; margin: 0 0 28px; }
  .intro { background: var(--surface); border: 1px solid var(--border); border-left: 3px solid var(--accent);
    border-radius: 10px; padding: 18px 20px; margin: 0 0 32px; }
  h2 { font-size: 20px; margin: 40px 0 12px; padding-bottom: 8px; border-bottom: 1px solid var(--border); }
  p, li { font-size: 15.5px; }
  ul { padding-left: 22px; }
  li { margin: 6px 0; }
  .table-wrap { overflow-x: auto; margin: 14px 0; }
  table { border-collapse: collapse; width: 100%; min-width: 440px; font-size: 14.5px; }
  th, td { text-align: left; padding: 10px 12px; border: 1px solid var(--border); vertical-align: top; }
  th { background: var(--surface2); }
  .note { color: var(--muted); font-size: 14px; }
  footer.page { border-top: 1px solid var(--border); text-align: center; padding: 24px 20px; color: var(--muted); font-size: 13px; }
  footer.page a { color: var(--muted); }`;

function fill(str, map) {
  let out = str;
  for (const [k, v] of Object.entries(map)) out = out.split("{" + k + "}").join(v);
  return out;
}

function page(lang, t) {
  const dropdown = LANGS.map(([code, name]) =>
    `<a href="/privacy_policy/${code}/" class="lang-option${code === lang ? " active" : ""}">${name}</a>`
  ).join("\n        ");
  const altLinks = LANGS.map(([code]) =>
    `<link rel="alternate" hreflang="${code}" href="https://apps.mmendelson.com/privacy_policy/${code}/" />`
  ).join("\n");
  const rows = t.rows.map(r => `      <tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join("\n");
  const s4b = t.s4Bullets.map(b => `    <li>${b}</li>`).join("\n");
  const s7b = t.s7Bullets.map(b => `    <li>${b}</li>`).join("\n");

  const garminLink = `<a href="${GARMIN_URL}" target="_blank" rel="noopener">${t.garminLinkText}</a>`;
  const emailLink = `<a href="mailto:${EMAIL}">${EMAIL}</a>`;
  const garminPara = fill(t.garminPara, { GARMIN: garminLink });
  const s1Body = fill(t.s1Body, { EMAIL: emailLink });
  const s9Body = fill(t.s9Body, { EMAIL: emailLink });

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${t.title}</title>
<meta name="description" content="${t.metaDesc}" />
<link rel="canonical" href="https://apps.mmendelson.com/privacy_policy/${lang}/" />
${altLinks}
<link rel="alternate" hreflang="x-default" href="https://apps.mmendelson.com/privacy_policy/" />
<link rel="icon" type="image/jpeg" href="/assets/favicon.jpg" />
<link rel="apple-touch-icon" href="/assets/favicon.jpg" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
<style>${CSS}
</style>
</head>
<body>

<header class="page">
  <div class="header-top">
    <div class="lang-selector">
      <button class="lang-btn" aria-label="${t.langLabel}">🌐</button>
      <div class="lang-dropdown">
        ${dropdown}
      </div>
    </div>
  </div>
  <h1>${t.headerTitle}</h1>
  <p class="sub">${t.headerSub}</p>
  <a class="home-link" href="/${lang}/">${t.backToApps}</a>
</header>

<main>
  <p class="meta">${t.lastUpdated}</p>

  <div class="intro"><p style="margin:0;">${t.intro}</p></div>

  <p>${garminPara}</p>

  <h2>${t.s1Title}</h2>
  <p>${s1Body}</p>

  <h2>${t.s2Title}</h2>
  <p>${t.s2Intro}</p>
  <div class="table-wrap">
  <table>
    <thead><tr><th>${t.thData}</th><th>${t.thSource}</th><th>${t.thPurpose}</th></tr></thead>
    <tbody>
${rows}
    </tbody>
  </table>
  </div>
  <p class="note">${t.s2Note}</p>

  <h2>${t.sIdTitle}</h2>
  <p>${t.sIdBody}</p>

  <h2>${t.s4Title}</h2>
  <ul>
${s4b}
  </ul>
  <p>${t.s4NoSell}</p>

  <h2>${t.s5Title}</h2>
  <p>${t.s5Body}</p>

  <h2>${t.s6Title}</h2>
  <p>${t.s6Body}</p>

  <h2>${t.s7Title}</h2>
  <ul>
${s7b}
  </ul>

  <h2>${t.s8Title}</h2>
  <p>${t.s8Body}</p>

  <h2>${t.s9Title}</h2>
  <p>${s9Body}</p>
</main>

<footer class="page"><p>${t.footer}</p></footer>

<script>
(function(){var s=document.querySelector(".lang-selector");if(!s)return;var b=s.querySelector(".lang-btn");b.addEventListener("click",function(e){e.stopPropagation();s.classList.toggle("open");});document.addEventListener("click",function(){s.classList.remove("open");});})();
</script>

</body>
</html>
`;
}

const T = require("./privacy-translations.js");

for (const [lang] of LANGS) {
  const dir = path.join(ROOT, lang);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), page(lang, T[lang]));
  console.log("wrote", path.join(lang, "index.html"));
}

// Redirect entry at /privacy_policy/ → detected language
const redirect = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Privacy Policy – Garmin Apps by M. Mendelson</title>
<link rel="canonical" href="https://apps.mmendelson.com/privacy_policy/en/" />
<link rel="icon" type="image/jpeg" href="/assets/favicon.jpg" />
<script>
(function(){var s=['de','en','es','fr','pt'],b=(navigator.language||'').toLowerCase().split('-')[0],l=s.indexOf(b)>=0?b:'en';location.replace('/privacy_policy/'+l+'/');})();
</script>
<meta http-equiv="refresh" content="0; url=/privacy_policy/en/" />
</head>
<body>
<p style="font-family:system-ui,sans-serif;background:#111;color:#eee;margin:0;padding:24px;">
Redirecting to the Privacy Policy… If you are not redirected, <a href="/privacy_policy/en/" style="color:#3b82f6;">open it here</a>.
</p>
</body>
</html>
`;
// Same detection redirect from every public entry path so /privacy_policy,
// /policy and /privacy all resolve to the same localized document.
for (const entry of ["privacy_policy", "policy", "privacy"]) {
  const dir = path.join(SITE, entry);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), redirect);
  console.log("wrote", entry + "/index.html (redirect)");
}
