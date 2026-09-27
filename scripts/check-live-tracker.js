#!/usr/bin/env node
/*
 * check-live-tracker.js — does live_tracker/ still work?
 *
 * Both outages of Sept 2026 were upstream and silent: Garmin changed the
 * shape of the data in its session page (the parser found nothing and threw),
 * and CARTO started answering every map tile with an "API KEY REQUIRED" image
 * — HTTP 200, so nothing ever errored. Neither needed a change in this repo to
 * break, so only a check that runs on a schedule, against the real services,
 * could have caught them. This is that check. .github/workflows/
 * live-tracker-check.yml runs it daily; it runs the same way on a desktop:
 *
 *   node scripts/check-live-tracker.js                  # offline + live, local index.html
 *   node scripts/check-live-tracker.js --offline        # no network at all
 *   node scripts/check-live-tracker.js --source https://apps.mmendelson.com/live_tracker/
 *
 * Everything is read out of the page under test — the parser, the tile URL,
 * the proxy URL — never copied here, so the check cannot drift from the app.
 *
 * OFFLINE
 *   syntax    every inline <script> of the page compiles
 *   parser    parseGarminPageData() reads the fixture (an anonymised real
 *             Garmin page, scripts/fixtures/) — the current key shape AND the
 *             pre-Sept-2026 one — and returns null, not a throw, on an empty page
 * LIVE
 *   tiles     three tiles of three different cities come back as real,
 *             DISTINCT images (a placeholder is one image served for all)
 *   proxy     the Apps Script proxy answers and still passes Garmin's page
 *             through as Next.js flight data, the format the parser reads
 *   session   a REAL session, fetched the way the app fetches it, parses to
 *             track points. Needs one: LIVETRACK_URL, or LIVETRACK_USER (the
 *             proxy's registry returns that user's session of the last 24 h).
 *             Without one it is reported SKIPPED, by name, never as a pass.
 *
 * Exit 0 only if nothing failed. The summary line always says how many checks
 * ran, passed and were skipped, because a green run that ran nothing is the
 * worst kind.
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const crypto = require("crypto");

const ROOT = path.join(__dirname, "..");
const FIXTURE = path.join(__dirname, "fixtures", "live-tracker-session.html");
const UA = "apps.mmendelson.com live-tracker-check (+https://github.com/mendelson/apps-website)";

const args = process.argv.slice(2);
const OFFLINE = args.includes("--offline");
const srcIdx = args.indexOf("--source");
const SOURCE = srcIdx >= 0 ? args[srcIdx + 1] : path.join(ROOT, "live_tracker", "index.html");

const results = []; // { name, status: 'pass'|'fail'|'skip', detail }
const record = (name, status, detail) => {
  results.push({ name, status, detail });
  const tag = { pass: "PASS", fail: "FAIL", skip: "SKIP" }[status];
  console.log(`${tag}  ${name}${detail ? ` — ${detail}` : ""}`);
};
async function check(name, fn) {
  try {
    const r = await fn();
    if (r && r.skip) record(name, "skip", r.skip);
    else record(name, "pass", r || "");
  } catch (e) {
    record(name, "fail", e.message);
  }
}
const assert = (cond, msg) => { if (!cond) throw new Error(msg); };

async function get(url, opts = {}) {
  const resp = await fetch(url, {
    redirect: "follow",
    signal: AbortSignal.timeout(opts.timeout ?? 30_000),
    headers: { "User-Agent": UA, ...(opts.headers || {}) },
  });
  return resp;
}

// ── The page under test ──────────────────────────────────────────────────────
async function loadPage() {
  if (/^https?:/.test(SOURCE)) {
    const r = await get(`${SOURCE}${SOURCE.includes("?") ? "&" : "?"}cb=${Date.now()}`);
    assert(r.ok, `GET ${SOURCE} → HTTP ${r.status}`);
    return r.text();
  }
  return fs.readFileSync(SOURCE, "utf8");
}

function extractFunction(html, name) {
  const start = html.indexOf(`\nfunction ${name}(`);
  assert(start >= 0, `function ${name}() not found in the page`);
  const end = html.indexOf("\n}\n", start);
  assert(end > start, `could not find the end of ${name}()`);
  return html.slice(start + 1, end + 2);
}

function extractConst(html, name) {
  const m = html.match(new RegExp(`const ${name}\\s*=\\s*'([^']+)'`));
  assert(m, `const ${name} not found in the page`);
  return m[1];
}

function loadParser(html) {
  const ctx = vm.createContext({});
  vm.runInContext(`"use strict";\n${extractFunction(html, "parseGarminPageData")}`, ctx);
  return ctx.parseGarminPageData;
}

// ── Offline checks ───────────────────────────────────────────────────────────
function checkSyntax(html) {
  const blocks = [...html.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g)]
    // JavaScript only: a JSON-LD or template block is not meant to compile.
    .filter(m => !/\btype=["']?(?!text\/javascript|module)[^"'\s>]+/i.test(m[1]))
    .map(m => m[2])
    .filter(code => code.trim());
  assert(blocks.length > 0, "no inline <script> found");
  blocks.forEach((code, i) => {
    try { new vm.Script(code, { filename: `inline-script-${i}.js` }); }
    catch (e) { throw new Error(`inline script #${i}: ${e.message}`); }
  });
  return `${blocks.length} inline scripts compile`;
}

function checkParser(html) {
  // "use strict" on purpose: an undeclared variable (the Sept 2026 bug) is a
  // ReferenceError here even when the key it depends on happens to match.
  const parse = loadParser(html);
  const page = fs.readFileSync(FIXTURE, "utf8");

  const r = parse(page);
  assert(r, "fixture: returned null");
  assert(r.trackPoints && r.trackPoints.length === 23, `fixture: expected 23 track points, got ${r.trackPoints?.length ?? 0}`);
  assert(r.sessionInfo?.userName === "Test Athlete", `fixture: userName is ${JSON.stringify(r.sessionInfo?.userName)}`);
  assert(r.sessionInfo?.sessionName === "Test Run", `fixture: sessionName is ${JSON.stringify(r.sessionInfo?.sessionName)}`);
  const last = r.trackPoints[r.trackPoints.length - 1];
  assert(last.metaData.EVENT_TYPES === "END", `fixture: last point EVENT_TYPES is ${JSON.stringify(last.metaData.EVENT_TYPES)}`);
  assert(r.trackPoints.every(p => Number.isFinite(p.latitude) && Number.isFinite(p.longitude) && p.timestamp > 0),
    "fixture: a track point has no position or time");

  // The key shape before Garmin appended {garminGuid} (pre Sept 2026).
  const legacy = page.replace(/,\{\\"garminGuid\\":\\"[^"\\]*\\"\}\]/g, "]");
  assert(legacy !== page, "could not derive the legacy-shape fixture");
  const rl = parse(legacy);
  assert(rl?.trackPoints?.length === 23, `legacy key shape: expected 23 track points, got ${rl?.trackPoints?.length ?? 0}`);

  assert(parse("<html></html>") === null, "empty page: expected null");
  return "23 points (current shape), 23 (legacy shape), null on an empty page";
}

// ── Live checks ──────────────────────────────────────────────────────────────
// z12 tiles of three far-apart cities: a placeholder served for every tile
// hashes the same three times.
const TILES = [
  { city: "Brasília", lat: -15.7939, lon: -47.8828 },
  { city: "London",   lat: 51.5072,  lon: -0.1276 },
  { city: "New York", lat: 40.7128,  lon: -74.0060 },
].map(c => {
  const z = 12, n = 2 ** z, rad = c.lat * Math.PI / 180;
  return {
    ...c, z,
    x: Math.floor((c.lon + 180) / 360 * n),
    y: Math.floor((1 - Math.asinh(Math.tan(rad)) / Math.PI) / 2 * n),
  };
});

async function checkTiles(html) {
  const m = html.match(/L\.tileLayer\(\s*'([^']+)'/);
  assert(m, "L.tileLayer('…') not found in the page");
  const tpl = m[1];
  const hashes = new Set();
  for (const t of TILES) {
    const url = tpl.replace("{s}", "a").replace("{z}", t.z).replace("{x}", t.x).replace("{y}", t.y).replace("{r}", "");
    const r = await get(url, { headers: { Referer: "https://apps.mmendelson.com/" } });
    assert(r.ok, `${t.city}: HTTP ${r.status} from ${url}`);
    const type = r.headers.get("content-type") || "";
    assert(type.startsWith("image/"), `${t.city}: content-type ${type} from ${url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    assert(buf.length > 1000, `${t.city}: only ${buf.length} bytes from ${url}`);
    hashes.add(crypto.createHash("sha256").update(buf).digest("hex"));
  }
  assert(hashes.size === TILES.length,
    `${TILES.length} different places returned ${hashes.size} distinct image(s) — the tile server is serving a placeholder (${tpl})`);
  return `${TILES.length} distinct tiles from ${new URL(tpl.replace("{s}", "a")).host}`;
}

async function checkProxy(html) {
  const gas = extractConst(html, "GAS_PROXY");
  // A session that cannot exist: Garmin still renders its Next.js page (with
  // a NEXT_NOT_FOUND digest), which is enough to prove the proxy passes the
  // page through and the page is still flight data.
  const probe = "https://livetrack.garmin.com/session/00000000-0000-4000-8000-000000000000/token/TESTTOKEN0000000000000000000000";
  const r = await get(`${gas}?url=${encodeURIComponent(probe)}`, { timeout: 60_000 });
  assert(r.ok, `proxy: HTTP ${r.status}`);
  const body = await r.text();
  if (body.trim().startsWith("{")) {
    let j; try { j = JSON.parse(body); } catch (_) {}
    if (j?.__gasError != null) throw new Error(`proxy reached Garmin, which answered ${j.__gasError}: ${String(j.__gasBody || "").slice(0, 120)}`);
  }
  assert(body.includes("self.__next_f.push("),
    `proxy answered ${body.length} bytes without Next.js flight data (self.__next_f.push) — Garmin's page format changed?`);
  return `proxy → Garmin page as flight data (${body.length} bytes)`;
}

async function findSession(html) {
  if (process.env.LIVETRACK_URL) return { url: process.env.LIVETRACK_URL, from: "LIVETRACK_URL" };
  const user = (process.env.LIVETRACK_USER || "").trim().toLowerCase();
  if (!user) return { skip: "no session to test — set LIVETRACK_URL, or LIVETRACK_USER for the proxy's registry" };
  const gas = extractConst(html, "GAS_PROXY");
  const r = await get(`${gas}?action=session&user=${encodeURIComponent(user)}`, { timeout: 60_000 });
  assert(r.ok, `registry: HTTP ${r.status}`);
  const j = await r.json();
  if (!j.url) {
    const age = j.ts ? `last one ${Math.round((Date.now() - j.ts) / 3600000)} h ago` : "none on record";
    return { skip: `no LiveTrack session for "${user}" in the last 24 h (${age})` };
  }
  return { url: j.url, from: `registry (${user})` };
}

async function checkSession(html) {
  const s = await findSession(html);
  if (s.skip) return s;
  const m = s.url.match(/livetrack\.garmin\.com\/session\/([^/\s?#]+)\/token\/([^/\s?#]+)/i);
  assert(m, `not a LiveTrack session URL: ${s.url}`);
  const url = `https://livetrack.garmin.com/session/${m[1]}/token/${m[2]}`;
  // Same path the app takes first: Garmin's page through the proxy.
  const gas = extractConst(html, "GAS_PROXY");
  const r = await get(`${gas}?url=${encodeURIComponent(url)}`, { timeout: 60_000 });
  assert(r.ok, `proxy: HTTP ${r.status}`);
  const body = await r.text();
  if (body.includes("NEXT_NOT_FOUND") && !body.includes('"queries":[{')) {
    return { skip: `session from ${s.from} is no longer served by Garmin (expired)` };
  }
  const parsed = loadParser(html)(body);
  assert(parsed, `session from ${s.from}: the parser found no session data in Garmin's page — its shape changed? Run live_tracker/diag.html`);
  const n = parsed.trackPoints?.length ?? 0;
  assert(n > 0, `session from ${s.from}: session found but 0 track points — its shape changed? Run live_tracker/diag.html`);
  return `${n} track points from a real session (${s.from}, ${parsed.sessionInfo.sessionStatus})`;
}

// ── Main ─────────────────────────────────────────────────────────────────────
(async () => {
  console.log(`live_tracker check — page: ${SOURCE}${OFFLINE ? " (offline)" : ""}\n`);
  let html;
  try { html = await loadPage(); }
  catch (e) { record("load page", "fail", e.message); }

  if (html) {
    await check("syntax", () => checkSyntax(html));
    await check("parser", () => checkParser(html));
    if (OFFLINE) {
      for (const n of ["tiles", "proxy", "session"]) record(n, "skip", "--offline");
    } else {
      await check("tiles", () => checkTiles(html));
      await check("proxy", () => checkProxy(html));
      await check("session", () => checkSession(html));
    }
  }

  const count = s => results.filter(r => r.status === s).length;
  const ran = results.length - count("skip");
  const line = `${results.length} checks: ${count("pass")} passed, ${count("fail")} failed, ${count("skip")} skipped`;
  console.log(`\n${line}`);

  if (process.env.GITHUB_STEP_SUMMARY) {
    const icon = { pass: "✅", fail: "❌", skip: "⏭️" };
    const md = [
      `### Live tracker check — ${count("fail") ? "FAILING" : "OK"}`,
      "",
      `Page under test: \`${SOURCE.replace(ROOT + path.sep, "")}\``,
      "",
      "| | Check | Detail |",
      "| :-- | :-- | :-- |",
      ...results.map(r => `| ${icon[r.status]} | ${r.name} | ${String(r.detail || "").replace(/\|/g, "\\|")} |`),
      "",
      line,
      "",
    ].join("\n");
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, md);
  }

  process.exit(count("fail") > 0 || ran === 0 ? 1 : 0);
})();
