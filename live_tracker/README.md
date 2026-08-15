# Garmin Live Track

A single-page web app for following a Garmin LiveTrack session in real time — with map tracking, pace/distance calculations, and navigation to the athlete.

## Stack

| Layer | Technology |
|---|---|
| Runtime | Static HTML/CSS/JS — no build step, no framework |
| Map | [Leaflet](https://leafletjs.com/) 1.9.4 with OpenStreetMap tiles |
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
`END`/`STOP`/`FINISH` event on the newest point is treated as the finish. Which
token Garmin actually writes there has not been observed yet — no finished
session has been captured — so `sessionStatus` remains the fallback.
