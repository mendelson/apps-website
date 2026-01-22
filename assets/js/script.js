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
   GOOGLE SHEET CONFIG — FINAL CONFIRMED
====================== */

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1ss0plcKrV5QZmty1uoQ9AtzKIpd0PE1QwDV9U4NWlmc/gviz/tq?tqx=out:json";

/*
  Verified from json.txt (3):
  Numeric values are in columns:

  2, 6, 10, 14, 18, 22, 26, 30
*/

const APP_METRICS = {
  "Live Predictor Premium":     6,
  "Live Time Predictor":        10,
  "Pacer Data Field":           14,
  "Live Pace Speed Calculator": 2,
  "Tracker Data Field":         30,

  // Watch faces
  "Route Silhouette":           18,
  "Time Across The Galaxy":     26,
  "Solve for X":                22
};

/* ======================
   LOAD METRICS — FINAL VERSION
====================== */

async function loadMetrics() {
  try {
    const res = await fetch(SHEET_URL);
    const text = await res.text();
    const json = JSON.parse(text.substring(47).slice(0, -2));

    const rows = json.table.rows;
    // 0 = total downloads
    // 1 = installs last 7 days
    // 2 = users last 7 days

    document.querySelectorAll('.card').forEach(card => {
      const app = card.dataset.name;
      const col = APP_METRICS[app];

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
        return;
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
