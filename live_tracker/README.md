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
- Auto-follow modes: athlete, my location, route, or all
- Pace / distance / time / speed calculator (bottom-sheet modal)
  - Per-field unit selection: km, m, mi / /km, /mi / km/h, mi/h
  - Smart recalculation based on the last two fields edited
- One-tap navigation to athlete via Google Maps (FAB button)
- Multilingual: Português, English, Español, Français, Deutsch
- Dark theme, mobile-first layout with safe-area support

## Usage

Open `index.html` directly in a browser, or visit the GitHub Pages URL. Paste a Garmin LiveTrack session URL (or share link) into the input field to start tracking.

To test with mock data, append `?mock=true` to the URL.
