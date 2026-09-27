# Garmin Live Track

A single-page web app for following a Garmin LiveTrack session in real time — with map tracking, pace/distance calculations, and navigation to the athlete.

## Stack

| Layer | Technology |
|---|---|
| Runtime | Static HTML/CSS/JS — no build step, no framework |
| Map | [Leaflet](https://leafletjs.com/) 1.9.4 with OpenStreetMap tiles (keyless; darkened by a CSS filter on the tile pane) |
| Hosting | GitHub Pages |
| Data | Garmin LiveTrack public session URL (polled via `fetch`) |
| CORS proxy | Google Apps Script (primary) + public fallbacks — bypasses Garmin's cross-origin restrictions |
| Favicon | PNG + multi-size ICO (converted from source image) |

## Features

- Real-time athlete position on an interactive map
- Live / paused / finished detection, with a timer counting how long the pause has lasted ([how it works](#how-a-pause-is-detected))
- Straight-line distance between you and the athlete, updated on every trackpoint and every GPS fix
- Auto-follow modes: athlete, my location, route, or all
- Pace / distance / time / speed calculator (bottom-sheet modal)
  - Per-field unit selection: km, m, mi / /km, /mi / km/h, mi/h
  - Smart recalculation based on the last two fields edited
- One-tap navigation to athlete via Google Maps (FAB button)
- Multilingual: Português, English, Español, Français, Deutsch
- Dark theme, mobile-first layout with safe-area support

## Usage

Open `index.html` directly in a browser, or visit the GitHub Pages URL. Paste a Garmin LiveTrack session URL (or share link) into the input field to start tracking.

To test with mock data, append `?mock=true` to the URL. `?mock=paused` opens onto
an activity paused five minutes ago, reproducing the feed shape a real pause has.

## How a pause is detected

Garmin's session payload has **no pause flag** — `sessionStatus` is derived from
`end`, which sits 24 h after `start` and so stays `InProgress` long after the
athlete stops. The pause has to be read off the trackpoints.

What a real paused session looks like, measured against a live one on
2026-08-15 (`38a3f3b6…`, 30-minute pause):

- **The feed does not stop.** 179 points arrived during the pause, one every
  ~10 s, same as while moving. Anything keyed on silence alone misses it.
- **`totalDurationSecs` freezes** — held at `2031` for the whole pause — and so
  does `totalDistanceMeters` (`2166.57`). On resume both advance again, which is
  how the pause ends. That freeze is the signal.
- **`pointStatus` is not it.** The same session went `STATIONARY` seven times
  with the timer still running (traffic lights). `STATIONARY` means *not
  moving*; only the frozen timer means *paused*.
- **`eventTypes` carries `BEGIN`** on the first point and nothing on the rest —
  no pause or resume event is emitted.

So: a run of points sharing one `TOTAL_DURATION`, spanning at least 45 s, is a
pause, and the first point of that run is when it started — which is what the
timer counts from, so it reads the same whether you watched it happen or opened
the page mid-pause. A feed that goes silent for 2 min is the secondary signal
(watch off, phone out of range), dated to the last point received.

**Finished** is the weak one: `sessionStatus` only flips a day later, so an
`END`/`STOP`/`FINISH` event on the newest point is treated as the finish. The
token is **`END`** — observed on a finished session on 2026-09-27
(`c0d96844…`), on the last point, whose `pointStatus` was `STATIONARY`. That
session's `end` was also the real finish time rather than start + 24 h, so
`sessionStatus` remains the fallback.

## Where the data comes from — and how it broke

The legacy `/services/` REST API is gone (404). What works is fetching the
session page through the Apps Script proxy and reading the TanStack Query
cache Next.js streams into it (`self.__next_f.push(...)`), in
`parseGarminPageData`. Queries are identified **by content, not by key shape**:
in Sept 2026 Garmin appended a `{garminGuid}` object to both session keys
(`['session', id, token, 'track-points', {…}]`), the old
`k[k.length - 1] === 'track-points'` / `k.length <= 3` tests matched nothing,
and every session loaded with no athlete. `diag.html` dumps every query key
the page carries — start there the next time it breaks.

Map tiles were CARTO's `dark_all` until the same month, when CARTO began
requiring an API key: every tile still answers HTTP 200, but with an
"API KEY REQUIRED" image, so Leaflet reports no error at all.

## Automated check (daily)

`.github/workflows/live-tracker-check.yml` runs `scripts/check-live-tracker.js`
every day at 21:07 UTC against the **published** page, and on any PR touching
`live_tracker/` against the PR's own copy. A failure opens an issue titled
*"Live tracker check is failing"*; the next green run closes it. It reads the
parser, the tile URL and the proxy URL out of `index.html` itself, so it cannot
drift from the app. It checks:

| Check | Catches |
|---|---|
| `syntax` | a script block that no longer compiles |
| `parser` | `parseGarminPageData` against an anonymised real Garmin page (`scripts/fixtures/`), in the current key shape and the pre-Sept-2026 one, under `"use strict"` |
| `tiles` | a tile server that errors, or serves one placeholder for everywhere (the CARTO failure) |
| `proxy` | the Apps Script proxy down, or Garmin's page no longer Next.js flight data |
| `session` | a **real** session no longer parsing to track points (the Garmin failure) |

`session` needs a real session, and Garmin only serves one for ~24 h after it
ends. The repo variable `LIVETRACK_USER` (the proxy registry's `+tag`) makes
every day with an activity an end-to-end test; without it, or on a day with no
activity, `session` is reported **SKIPPED**, never passed.

Run it locally the same way: `node scripts/check-live-tracker.js`
(`--offline` for no network, `--source <url>` to test the published page,
`LIVETRACK_URL=<link>` for a specific session). When Garmin changes its page
again, save a real session page and regenerate the fixture with
`node scripts/make-live-tracker-fixture.js <saved.html>` — it anonymises it.
