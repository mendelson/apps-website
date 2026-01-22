/* ======================
   SEARCH
====================== */
document.getElementById('search').addEventListener('input', e => {
  const q = e.target.value.toLowerCase();
  document.querySelectorAll('.card').forEach(c => {
    c.style.display = c.dataset.name.toLowerCase().includes(q) ? '' : 'none';
  });
});

/* ======================
   EMAIL
====================== */
document.getElementById('emailBtn').addEventListener('click', () => {
  window.location.href = "mailto:mateusmendelson@hotmail.com";
});

/* ======================
   DROPDOWN FIX
====================== */
document.querySelectorAll(".versions button").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.parentElement.classList.toggle("open");
  });
});

/* ======================
   FINAL, VERIFIED GOOGLE SHEETS CONFIG
====================== */

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1ss0plcKrV5QZmty1uoQ9AtzKIpd0PE1QwDV9U4NWlmc/gviz/tq?tqx=out:json";

/*
  FINAL VERIFIED COLUMN INDEXES FROM YOUR REAL JSON:

  App #1 → col 2
  App #2 → col 5
  App #3 → col 8
  App #4 → col 11
  App #5 → col 14
  App #6 → col 17
  App #7 → col 20
  App #8 → col 23
*/

const APP_METRICS = {
  "Live Pace Speed Calculator": 2,
  "Live Predictor Premium":     5,
  "Live Time Predictor":        8,
  "Pacer Data Field":           11,
  "Route Silhouette":           14,
  "Solve for X":                17,
  "Time Across The Galaxy":     20,
  "Tracker Data Field":         23
};

/* ======================
   LOAD METRICS — FINAL VERSION
====================== */

async function loadMetrics() {
  try {
    const res = await fetch(SHEET_URL);
    const text = await res.text();
    const json = JSON.parse(text.substring(47).slice(0, -2));

    // rows:
    // 0 = total downloads
    // 1 = installs last 7 days
    // 2 = users last 7 days

    const rows = json.table.rows;

    document.querySelectorAll('.card').forEach(card => {
      const name = card.dataset.name;
      const col = APP_METRICS[name];

      if (col === undefined) return;

      const total    = rows[0].c[col]?.v || 0;
      const installs = rows[1].c[col]?.v || 0;
      const users    = rows[2].c[col]?.v || 0;

      const metrics = card.querySelector(".metrics");
      const tag = card.querySelector(".momentum-tag");
      const tip = card.querySelector(".tooltip");

      metrics.querySelector(".metric-total").textContent    = `Downloads: ${total}`;
      metrics.querySelector(".metric-installs").textContent = `Installs: ${installs}`;
      metrics.querySelector(".metric-users").textContent    = `Users: ${users}`;

      // Momentum logic
      if (installs >= 50) {
        tag.textContent = "Trending Hot 🔥";
        tag.classList.add("momentum-hot");
        tip.textContent = "This app is having a very strong week.";
      } else if (installs >= 10) {
        tag.textContent = "Trending Up 🚀";
        tag.classList.add("momentum-strong");
        tip.textContent = "This app is gaining momentum.";
      } else if (installs >= 1) {
        tag.textContent = "Getting Attention 👀";
        tag.classList.add("momentum-positive");
        tip.textContent = "This app has some activity this week.";
      } else {
        return; // no momentum → do not display the tag
      }

      tag.classList.remove("hidden");

      tag.addEventListener("click", () => {
        tip.classList.toggle("hidden");
      });
    });

  } catch (err) {
    console.error("Failed to load metrics:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadMetrics);
