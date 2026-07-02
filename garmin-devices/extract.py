#!/usr/bin/env python3
"""Extract Garmin Connect IQ part number -> device name mappings.

Scrapes https://developer.garmin.com/connect-iq/device-reference/ and its
per-device article pages, then maintains three files in this folder:

  garmin-pn-map.json  state file: one entry per part number, with the date
                      it was first (and last) seen on Garmin's site
  garmin-pn-map.tsv   copy/paste-friendly "Part number<TAB>Model" table
  README.md           human-readable table including the first-seen date

Part numbers that disappear from Garmin's site are kept (historical record);
only their lastSeen date stops advancing.
"""

import html
import json
import re
import sys
import unicodedata
from concurrent.futures import ThreadPoolExecutor
from datetime import date, datetime, timezone
from pathlib import Path
from urllib.error import HTTPError
from urllib.request import Request, urlopen

BASE = "https://developer.garmin.com"
INDEX_URL = f"{BASE}/connect-iq/device-reference/"
ARTICLE_URL = f"{BASE}/connect-iq/articles/device-reference/{{}}.html"
USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
)
# Abort without touching the files if the scrape looks broken/truncated.
MIN_EXPECTED_DEVICES = 100

DIR = Path(__file__).resolve().parent
STATE_FILE = DIR / "garmin-pn-map.json"
TSV_FILE = DIR / "garmin-pn-map.tsv"
README_FILE = DIR / "README.md"


def fetch(url, allow_404=False):
    req = Request(url, headers={"User-Agent": USER_AGENT})
    last_err = None
    for _ in range(3):
        try:
            with urlopen(req, timeout=30) as resp:
                return resp.read().decode("utf-8", "replace")
        except HTTPError as e:
            if e.code == 404 and allow_404:
                return None
            last_err = e
        except Exception as e:  # transient network errors -> retry
            last_err = e
    raise RuntimeError(f"failed to fetch {url}: {last_err}")


def fetch_article(slug):
    # Article filenames don't always match the page slug: some use
    # underscores instead of hyphens (edge-1000 -> edge_1000.html).
    for candidate in (slug, slug.replace("-", "_"), slug.replace("-", "")):
        body = fetch(ARTICLE_URL.format(candidate), allow_404=True)
        if body is not None:
            return body
    print(f"WARNING: no article found for slug '{slug}'", file=sys.stderr)
    return None


def parse_article(slug, src):
    h1 = re.search(r"<h1[^>]*>(.*?)</h1>", src, re.S)
    name = html.unescape(re.sub(r"<[^>]+>", "", h1.group(1)).strip()) if h1 else slug
    ids = re.findall(r">Id</td><td[^>]*>([^<]+)</td>", src)
    part_numbers = re.findall(r"Part Number\s*([0-9A-Za-z-]+)", src)
    device_id = ids[0] if ids else slug
    return [
        {"partNumber": pn, "deviceName": name, "deviceId": device_id, "slug": slug}
        for pn in part_numbers
    ]


def scrape():
    index = fetch(INDEX_URL)
    slugs = sorted(set(re.findall(r'href="/connect-iq/device-reference/([^"#?/]+)/"', index)))
    if len(slugs) < MIN_EXPECTED_DEVICES:
        raise RuntimeError(f"only {len(slugs)} device pages found; aborting")

    rows = []
    with ThreadPoolExecutor(max_workers=8) as pool:
        for slug, body in zip(slugs, pool.map(fetch_article, slugs)):
            if body:
                rows.append((slug, body))

    entries = []
    for slug, body in rows:
        entries.extend(parse_article(slug, body))
    if len({e["partNumber"] for e in entries}) < MIN_EXPECTED_DEVICES:
        raise RuntimeError(f"only {len(entries)} part numbers found; aborting")
    return entries


def sort_key_model(entry):
    name = unicodedata.normalize("NFKD", entry["deviceName"])
    name = name.encode("ascii", "ignore").decode().lower()
    return (name, entry["partNumber"])


def add_event(entry, event):
    """Append a dated change event, keeping the list free of exact duplicates."""
    events = entry.setdefault("events", [])
    if event not in events:
        events.append(event)


def reconcile(state, scraped, today):
    """Fold today's scrape into the persistent state, recording dated events.

    Events (besides the first sighting, which is derived from firstSeen):
      renamed   Garmin changed the model name for a part number
      removed   a part number dropped off Garmin's site
      relisted  a previously removed part number came back
    """
    scraped_by_pn = {e["partNumber"]: e for e in scraped}

    for pn, e in scraped_by_pn.items():
        prev = state.get(pn)
        if prev is None:
            state[pn] = {**e, "firstSeen": today, "lastSeen": today}
            continue
        if prev["deviceName"] != e["deviceName"]:
            add_event(
                prev,
                {"date": today, "type": "renamed",
                 "from": prev["deviceName"], "to": e["deviceName"]},
            )
        if prev.pop("removedOn", None):
            add_event(prev, {"date": today, "type": "relisted"})
        prev.update(e)  # deviceName / deviceId / slug may have changed
        prev["lastSeen"] = today

    # Anything in state but absent from today's scrape just left Garmin's site.
    for pn, entry in state.items():
        if pn not in scraped_by_pn and not entry.get("removedOn"):
            entry["removedOn"] = today
            add_event(entry, {"date": today, "type": "removed"})


def build_changelog(entries):
    """date -> {'added': [...], 'renamed': [...], 'removed': [...], 'relisted': [...]}"""
    log = {}

    def slot(date, kind):
        return log.setdefault(
            date, {"added": [], "renamed": [], "removed": [], "relisted": []}
        )[kind]

    for e in entries:
        slot(e["firstSeen"], "added").append(e)
        for ev in e.get("events", []):
            slot(ev["date"], ev["type"]).append((e, ev))
    return log


def render_readme(entries, changelog, today, listed_today):
    lines = [
        "# Garmin Connect IQ — Part Number → Device",
        "",
        "Mapeamento extraído automaticamente da "
        "[referência de dispositivos do Connect IQ]"
        "(https://developer.garmin.com/connect-iq/device-reference/).",
        "",
        f"- **Part numbers:** {len(entries)} "
        f"({len(listed_today)} listados hoje no site da Garmin)",
        f"- **Última atualização:** {today}",
        "- Arquivo para copiar/colar em planilha: "
        "[`garmin-pn-map.tsv`](garmin-pn-map.tsv)",
        "- Cada seção abaixo é um dia em que algo mudou (mais recente no topo): "
        "dispositivos vistos pela 1ª vez, renomeados, removidos do site ou "
        "que voltaram a aparecer. Part numbers removidos são mantidos como "
        "registro histórico.",
        "",
        "## Histórico de alterações",
    ]

    for date in sorted(changelog, reverse=True):
        day = changelog[date]
        added = sorted(day["added"], key=sort_key_model)
        renamed = sorted(day["renamed"], key=lambda x: sort_key_model(x[0]))
        removed = sorted(day["removed"], key=lambda x: sort_key_model(x[0]))
        relisted = sorted(day["relisted"], key=lambda x: sort_key_model(x[0]))

        counts = []
        if added:
            counts.append(f"{len(added)} novo(s)")
        if renamed:
            counts.append(f"{len(renamed)} renomeado(s)")
        if removed:
            counts.append(f"{len(removed)} removido(s)")
        if relisted:
            counts.append(f"{len(relisted)} reincluído(s)")
        lines += ["", f"### {date} — {', '.join(counts)}"]

        if added:
            lines += [
                "",
                "**Vistos pela primeira vez**",
                "",
                "| Part number | Device |",
                "|---|---|",
            ]
            lines += [f"| {e['partNumber']} | {e['deviceName']} |" for e in added]
        if renamed:
            lines += ["", "**Renomeados**", ""]
            lines += [
                f"- `{e['partNumber']}`: \"{ev['from']}\" → \"{ev['to']}\""
                for e, ev in renamed
            ]
        if removed:
            lines += ["", "**Removidos do site da Garmin**", ""]
            lines += [f"- `{e['partNumber']}`: {e['deviceName']}" for e, ev in removed]
        if relisted:
            lines += ["", "**Voltaram a ser listados**", ""]
            lines += [f"- `{e['partNumber']}`: {e['deviceName']}" for e, ev in relisted]

    return "\n".join(lines) + "\n"


def main():
    today = datetime.now(timezone.utc).date().isoformat()

    state = {}
    if STATE_FILE.exists():
        for e in json.loads(STATE_FILE.read_text(encoding="utf-8")):
            state[e["partNumber"]] = e

    scraped = scrape()
    reconcile(state, scraped, today)

    entries = sorted(state.values(), key=sort_key_model)

    STATE_FILE.write_text(
        json.dumps(entries, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )

    # utf-8-sig: the BOM makes Excel/LibreOffice detect UTF-8 when opening
    with TSV_FILE.open("w", encoding="utf-8-sig") as f:
        f.write("Part number\tModel\n")
        for e in entries:
            f.write(f"{e['partNumber']}\t{e['deviceName']}\n")

    listed_today = {e["partNumber"] for e in scraped}
    changelog = build_changelog(entries)
    README_FILE.write_text(
        render_readme(entries, changelog, today, listed_today), encoding="utf-8"
    )

    new_today = [e for e in entries if e.get("firstSeen") == today]
    print(f"{len(entries)} part numbers total; {len(new_today)} first seen today")


if __name__ == "__main__":
    main()
