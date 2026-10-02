const fs = require("fs");
const path = require("path");

const SITE = path.join(__dirname, "..");
const ROOT = path.join(SITE, "privacy_policy");
const EMAIL = "mateusmendelson@hotmail.com";
const GARMIN_URL = "https://www.garmin.com/en-US/privacy/connect/";

// The 28 locales of the Connect IQ Store listings — the same set as the
// showcase (assets/js/i18n.js) and run.mmendelson.com. [URL code, native name].
const LANGS = [
  ["de", "Deutsch"],
  ["en", "English"],
  ["es", "Español"],
  ["fr", "Français"],
  ["it", "Italiano"],
  ["pt", "Português (Brasil)"],
  ["ru", "Русский"],
  ["nl", "Nederlands"],
  ["pt-pt", "Português (Portugal)"],
  ["pl", "Polski"],
  ["cs", "Čeština"],
  ["sk", "Slovenčina"],
  ["sl", "Slovenščina"],
  ["hr", "Hrvatski"],
  ["hu", "Magyar"],
  ["el", "Ελληνικά"],
  ["da", "Dansk"],
  ["nb", "Norsk bokmål"],
  ["sv", "Svenska"],
  ["fi", "Suomi"],
  ["ja", "日本語"],
  ["ko", "한국어"],
  ["zh-cn", "简体中文"],
  ["zh-tw", "繁體中文"],
  ["th", "ไทย"],
  ["he", "עברית"],
  ["id", "Bahasa Indonesia"],
  ["ms", "Bahasa Melayu"],
];
// BCP-47 tag for the URL codes that are not one as written; RTL languages.
const HTML_LANG = { "pt-pt": "pt-PT", "zh-cn": "zh-CN", "zh-tw": "zh-TW" };
const RTL = new Set(["he"]);
const tagOf = (code) => HTML_LANG[code] || code;

const CSS = `
  :root {
    --bg: #111; --surface: #1a1a1a; --surface2: #202020; --border: #333;
    --text: #eee; --muted: #9a9a9a; --primary: #3b82f6; --accent: #3b82f6; --maxw: 820px;
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
  .lang-dropdown { display: none; position: absolute; inset-inline-end: 0; top: calc(100% + 6px); background: #1e1e1e;
    border: 1px solid #333; border-radius: 10px; max-height: min(70vh, 560px); overflow-y: auto;
    overscroll-behavior: contain; min-width: 140px;
    box-shadow: 0 8px 24px rgba(0,0,0,.5); z-index: 1001; }
  .lang-selector.open .lang-dropdown { display: block; }
  .lang-option { display: block; padding: 9px 16px; color: #bbb; text-decoration: none; font-size: 14px;
    transition: background .15s, color .15s; }
  .lang-option:hover { background: #2a2a2a; color: #fff; }
  .lang-option.active { color: #fff; font-weight: 600; }

  main { max-width: var(--maxw); margin: 0 auto; padding: 32px 20px 64px; }
  .meta { color: var(--muted); font-size: 14px; margin: 0 0 28px; }
  .intro { background: var(--surface); border: 1px solid var(--border); border-inline-start: 3px solid var(--accent);
    border-radius: 10px; padding: 18px 20px; margin: 0 0 32px; }
  h2 { font-size: 20px; margin: 40px 0 12px; padding-bottom: 8px; border-bottom: 1px solid var(--border); }
  p, li { font-size: 15.5px; }
  ul { padding-inline-start: 22px; }
  li { margin: 6px 0; }
  .table-wrap { overflow-x: auto; margin: 14px 0; }
  table { border-collapse: collapse; width: 100%; min-width: 440px; font-size: 14.5px; }
  th, td { text-align: start; padding: 10px 12px; border: 1px solid var(--border); vertical-align: top; }
  th { background: var(--surface2); }
  .note { color: var(--muted); font-size: 14px; }
  footer.page { border-top: 1px solid var(--border); text-align: center; padding: 24px 20px; color: var(--muted); font-size: 13px; }
  footer.page a { color: var(--muted); }
  .foot-cookies { color: var(--primary); }
  .consent-bar { position: fixed; left: 0; right: 0; bottom: 0; z-index: 2000; display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 12px 20px; padding: 14px 20px; background: var(--surface); border-top: 1px solid var(--border); box-shadow: 0 -6px 20px rgba(0,0,0,.5); }
  .consent-bar[hidden] { display: none; }
  .consent-text { margin: 0; font-size: 13.5px; color: var(--text); max-width: 60ch; }
  .consent-actions { display: flex; gap: 10px; }
  .consent-btn { min-height: 40px; padding: 0 18px; border-radius: 8px; border: 0; cursor: pointer; font: inherit; font-size: 14px; font-weight: 600; background: var(--primary); color: #fff; }
  .consent-btn:hover { filter: brightness(1.1); }
  .consent-btn--ghost { background: none; border: 1px solid var(--border); color: var(--text); font-weight: 500; }
  .consent-btn--ghost:hover { border-color: var(--primary); filter: none; }`;

function fill(str, map) {
  let out = str;
  for (const [k, v] of Object.entries(map)) out = out.split("{" + k + "}").join(v);
  return out;
}

function page(lang, t) {
  const dropdown = LANGS.map(([code, name]) =>
    `<a href="/privacy_policy/${code}/" class="lang-option${code === lang ? " active" : ""}" lang="${tagOf(code)}">${name}</a>`
  ).join("\n        ");
  const altLinks = LANGS.map(([code]) =>
    `<link rel="alternate" hreflang="${tagOf(code)}" href="https://apps.mmendelson.com/privacy_policy/${code}/" />`
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
<html lang="${tagOf(lang)}"${RTL.has(lang) ? ' dir="rtl"' : ""}>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${t.title}</title>
<meta name="description" content="${t.metaDesc}" />
<link rel="canonical" href="https://apps.mmendelson.com/privacy_policy/${lang}/" />
${altLinks}
<link rel="alternate" hreflang="x-default" href="https://apps.mmendelson.com/privacy_policy/" />
<link rel="icon" href="/assets/favicon.ico" sizes="any" />
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32.png" />
<link rel="icon" type="image/png" sizes="192x192" href="/assets/favicon-192.png" />
<link rel="apple-touch-icon" href="/assets/favicon-180.png" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
<style>${CSS}
</style>
<!-- Google Analytics (GA4), Consent Mode v2. ONE measurement ID for the whole
     mmendelson.com family, so a hub -> apps -> run journey is one session:
     the _ga cookies land on .mmendelson.com and every site reads the same
     ones. Which site a hit came from is the built-in Hostname dimension, not
     a parameter. Denied by default -> cookieless pings until the visitor
     accepts. See website/ANALYTICS_TRACKING.md. -->
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('consent', 'default', { ad_storage:'denied', ad_user_data:'denied', ad_personalization:'denied', analytics_storage:'denied', wait_for_update:500 });
  // Consent is shared across the family, so it cannot live in localStorage
  // alone: that is per ORIGIN, and the hub, apps and run are three origins.
  // The record is a cookie on .mmendelson.com; localStorage stays as the
  // fallback for hosts where that domain cannot be set (a local preview, the
  // github.io project URL) and for visitors who answered before this change.
  function mmConsentGet(k){ var m = document.cookie.match('(^|; )' + k + '=([^;]*)');
    if (m) return decodeURIComponent(m[2]);
    try { return localStorage.getItem(k); } catch (e) { return null; } }
  function mmConsentSet(k, v){
    try { localStorage.setItem(k, v); } catch (e) {}
    try { document.cookie = k + '=' + v + '; domain=.mmendelson.com; path=/; max-age=15552000; SameSite=Lax; Secure'; } catch (e) {}
  }
  // mm_consent_v is the banner VERSION the visitor answered. Only '2' — the
  // banner that names the demographic signals — may grant them, so an older
  // 'granted' stays analytics-only until the visitor is asked again.
  try { var mmC = mmConsentGet('mm_consent'), mmV = mmConsentGet('mm_consent_v');
        if (mmC === 'granted') { var mmU = { analytics_storage:'granted' };
          if (mmV === '2') { mmU.ad_storage='granted'; mmU.ad_user_data='granted'; mmU.ad_personalization='granted'; }
          gtag('consent','update', mmU); } } catch(e){}
  // The three things GA4 does not collect by itself: the language actually
  // RENDERED (it only sees the browser's), the colour scheme, and whether this
  // is an installed PWA rather than a tab. They go in the CONFIG call, not
  // gtag('set', …) — measured against the real collect payload, custom keys
  // passed to set() never leave the page, while config params ride along on
  // every event to this destination.
  gtag('config', 'G-0MHS4QK452', { ui_lang: document.documentElement.lang || '', ui_theme: (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light', display_mode: (window.matchMedia && matchMedia('(display-mode: standalone)').matches) ? 'standalone' : 'browser' });
</script>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-0MHS4QK452"></script>
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

  <h2>${t.sTrackTitle}</h2>
  <p>${t.sTrackBody1}</p>
  <p>${t.sTrackBody2}</p>

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
  <h2>${t.sAnalyticsTitle}</h2>
  <p>${t.sAnalyticsBody}</p>
</main>

<footer class="page"><p>${t.footer} · <a href="#" class="foot-cookies" data-consent="reset">Cookies</a></p></footer>

<script>
(function(){var s=document.querySelector(".lang-selector");if(!s)return;var b=s.querySelector(".lang-btn");b.addEventListener("click",function(e){e.stopPropagation();s.classList.toggle("open");});document.addEventListener("click",function(){s.classList.remove("open");});})();
</script>

<div id="consent-bar" class="consent-bar" role="dialog" aria-live="polite" aria-label="Cookies" hidden>
  <p class="consent-text"></p>
  <div class="consent-actions">
    <button type="button" class="consent-btn consent-btn--ghost" data-consent="decline"></button>
    <button type="button" class="consent-btn" data-consent="accept"></button>
  </div>
</div>
<script src="/assets/js/consent.js?v=3"></script>
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
<link rel="icon" href="/assets/favicon.ico" sizes="any" />
<script>
(function(){var s=${JSON.stringify(LANGS.map(([c]) => c)).replace(/"/g, "'")};function t(g){var q=String(g||'').toLowerCase().replace(/_/g,'-').split('-'),b=q[0],u=q.slice(1);function h(a){for(var i=0;i<u.length;i++){if(a.indexOf(u[i])>=0)return true;}return false;}if(b==='pt')return h(['pt','ao','mz','cv','gw','st','tl'])?'pt-pt':'pt';if(b==='zh')return h(['hans'])?'zh-cn':(h(['hant','tw','hk','mo'])?'zh-tw':'zh-cn');if(b==='no'||b==='nn')return 'nb';if(b==='iw')return 'he';if(b==='in')return 'id';return s.indexOf(b)>=0?b:null;}var n=(navigator.languages&&navigator.languages.length)?navigator.languages:[navigator.language],l=null;for(var i=0;i<n.length&&!l;i++){l=t(n[i]);}location.replace('/privacy_policy/'+(l||'en')+'/');})();
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
