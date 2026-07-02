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


def main():
    today = datetime.now(timezone.utc).date().isoformat()

    state = {}
    if STATE_FILE.exists():
        for e in json.loads(STATE_FILE.read_text(encoding="utf-8")):
            state[e["partNumber"]] = e

    scraped = scrape()
    for e in scraped:
        prev = state.get(e["partNumber"])
        if prev:
            prev.update(e)  # names occasionally change on Garmin's side
            prev["lastSeen"] = today
        else:
            state[e["partNumber"]] = {**e, "firstSeen": today, "lastSeen": today}

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
    # newest firstSeen on top; alphabetical by model within the same date
    by_first_seen = sorted(
        entries,
        key=lambda e: tuple(-int(p) for p in e.get("firstSeen", "0-0-0").split("-"))
        + sort_key_model(e),
    )

    lines = [
        "# Garmin Connect IQ — Part Number → Device",
        "",
        "Mapeamento extraído automaticamente da "
        "[referência de dispositivos do Connect IQ]"
        "(https://developer.garmin.com/connect-iq/device-reference/).",
        "",
        f"- **Part numbers:** {len(entries)}",
        f"- **Última atualização:** {today}",
        "- Part numbers removidos do site da Garmin são mantidos aqui como "
        "registro histórico (coluna *Listado hoje?*).",
        "",
        "Arquivo para copiar/colar em planilha: "
        "[`garmin-pn-map.tsv`](garmin-pn-map.tsv)",
        "",
        "| Part number | Device | Visto pela 1ª vez | Listado hoje? |",
        "|---|---|---|---|",
    ]
    for e in by_first_seen:
        listed = "sim" if e["partNumber"] in listed_today else "não"
        lines.append(
            f"| {e['partNumber']} | {e['deviceName']} | {e.get('firstSeen', '?')} | {listed} |"
        )
    README_FILE.write_text("\n".join(lines) + "\n", encoding="utf-8")

    new_today = [e for e in entries if e.get("firstSeen") == today]
    print(f"{len(entries)} part numbers total; {len(new_today)} first seen today")


if __name__ == "__main__":
    main()
