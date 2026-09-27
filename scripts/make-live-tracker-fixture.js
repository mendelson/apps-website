#!/usr/bin/env node
/*
 * make-live-tracker-fixture.js — turn a REAL Garmin LiveTrack session page
 * into the anonymised fixture that scripts/check-live-tracker.js parses.
 *
 * Why a generator and not a hand-written fixture: the fixture's only value is
 * that it has the exact shape Garmin serves. When Garmin changes that shape
 * again (it did in Sept 2026 — see live_tracker/README.md), save a fresh page
 * and regenerate, so the offline check tests today's shape, not a remembered
 * one:
 *
 *   curl -sS -o /tmp/page.html 'https://livetrack.garmin.com/session/<id>/token/<token>'
 *   node scripts/make-live-tracker-fixture.js /tmp/page.html
 *
 * The repo is public, so nothing personal survives: ids, token, names, the
 * publisher block, the HERE maps token and profile images are replaced or
 * dropped, heart rate and cadence are removed, altitude is made relative, and
 * the route is moved to Greenwich and thinned to every 10th point (plus the
 * last, which carries the END event).
 */
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "fixtures", "live-tracker-session.html");
const MARKER = '"mutations":[],"queries":[';

const src = process.argv[2];
if (!src) {
  console.error("usage: node scripts/make-live-tracker-fixture.js <saved-garmin-page.html>");
  process.exit(2);
}
const html = fs.readFileSync(src, "utf8");

// Same flight-data extraction the app does (parseGarminPageData).
let payload = "";
const re = /self\.__next_f\.push\(\[(?:1|2),"((?:[^"\\]|\\.)*)"\]\)/g;
let m;
while ((m = re.exec(html)) !== null) {
  try { payload += JSON.parse('"' + m[1] + '"'); } catch (_) {}
}

const queries = [];
let from = 0;
for (;;) {
  const mi = payload.indexOf(MARKER, from);
  if (mi === -1) break;
  const start = mi + MARKER.length - 1;
  let depth = 0, i;
  for (i = start; i < payload.length; i++) {
    if (payload[i] === "[") depth++;
    else if (payload[i] === "]") { depth--; if (depth === 0) break; }
  }
  from = i + 1;
  queries.push(...JSON.parse(payload.substring(start, i + 1)));
}
if (!queries.length) {
  console.error("No dehydrated queries found — is this a live session page?");
  process.exit(1);
}

const ID = "00000000-0000-4000-8000-000000000000";
const TOKEN = "TESTTOKEN0000000000000000000000";
const GUID = "11111111-1111-4111-8111-111111111111";
const NAME = "Test Athlete";

// Real identifiers, read off the page itself, each replaced everywhere in the
// output as plain text — so a field Garmin adds later that echoes one of them
// is caught too, not just the fields named below.
const sessionKey = queries.find(q => q.queryKey?.[0] === "session")?.queryKey || [];
const profileKey = queries.find(q => q.queryKey?.[0] === "user")?.queryKey || [];
const REAL = [[sessionKey[1], ID], [sessionKey[2], TOKEN], [profileKey[1], GUID]]
  .filter(([real]) => typeof real === "string" && real.length > 8);

let alt0 = null;   // first altitude, so heights become relative
let origin = null; // first track point, used to move the route to Greenwich
const move = p => {
  if (!origin) origin = { lat: p.lat, lon: p.lon };
  return { lat: 51.4779 + (p.lat - origin.lat), lon: -0.0015 + (p.lon - origin.lon) };
};

const out = [];
for (const q of queries) {
  const k = q.queryKey || [];
  const d = q.state?.data;
  if (k[0] === "here-maps") continue; // carries a live access token
  const key = k;
  let data = d;
  if (k.includes("track-points")) {
    data = {
      ...d,
      pages: d.pages.map(pg => {
        const pts = pg.trackPoints;
        const kept = pts.filter((_, i) => i % 10 === 0 || i === pts.length - 1);
        return { ...pg, trackPoints: kept.map(pt => {
          // Heart rate and cadence are health data and the app reads neither;
          // absolute altitude would place the route, so it is made relative.
          const { heartRateBeatsPerMin, cadenceCyclesPerMin, ...rest } = pt;
          if (alt0 == null && rest.altitude != null) alt0 = rest.altitude;
          if (rest.altitude != null) rest.altitude = +(10 + rest.altitude - alt0).toFixed(2);
          return { ...rest, position: move(rest.position) };
        }) };
      }),
      pageParams: d.pageParams,
    };
  } else if (k[0] === "session") {
    data = {
      ...d,
      sessionId: ID,
      sessionToken: TOKEN,
      url: `https://livetrack.garmin.com/session/${ID}/token/${TOKEN}`,
      userDisplayName: NAME,
      sessionName: "Test Run",
      publisher: { type: d.publisher?.type ?? "WEARABLE" },
      unitId: 0,
      position: { lat: 51.4779, lon: -0.0015 },
    };
  } else if (k[0] === "user") {
    data = { name: NAME, location: "Greenwich" };
  } else {
    continue; // unknown query: nothing the app reads, and possibly personal
  }
  out.push({ ...q, queryKey: key, queryHash: JSON.stringify(key), state: { ...q.state, data } });
}

let json = JSON.stringify(out);
for (const [real, fake] of REAL) json = json.split(real).join(fake);
const chunk = `1f:["$","$L20",null,{"state":{${MARKER}${json.slice(1)}}}]\n`;
const body =
  "<!DOCTYPE html>\n" +
  "<!-- Anonymised Garmin LiveTrack page, generated by scripts/make-live-tracker-fixture.js.\n" +
  `     Source captured ${new Date().toISOString().slice(0, 10)}. Do not edit by hand; regenerate. -->\n` +
  `<html><body><script>self.__next_f.push([1,${JSON.stringify(chunk)}])</script></body></html>\n`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, body);
const tp = out.find(q => q.queryKey.includes("track-points"));
console.log(`wrote ${path.relative(process.cwd(), OUT)}: ${out.length} queries, ` +
  `${tp ? tp.state.data.pages.reduce((n, p) => n + p.trackPoints.length, 0) : 0} track points`);
