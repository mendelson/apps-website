# Garmin Tracker Data Field — web companion

A single static page that reads a **Track ID** (from the `?trackId=` query
parameter or the input box) and shows the latest records shared by the
[Garmin Tracker Data Field](https://apps.mmendelson.com/#data-fields) app,
auto-refreshing every 5 minutes.

- Runtime: static HTML/CSS/JS, no build step. Everything is in `index.html`.
- Data: a Google Apps Script endpoint (`?trackId=<id>` → latest rows).
- Countdown: driven by an absolute target timestamp, so it stays correct when
  the tab is backgrounded (re-evaluated on `visibilitychange`).

Migrated from `mmendelson.com/tracker` (that path now redirects here,
preserving the `?trackId=` parameter). Not to be confused with the real-time
map follower at [`/live_tracker/`](../live_tracker/).
