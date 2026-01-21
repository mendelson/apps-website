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
   METRICS CONFIG
====================== */

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1ss0plcKrV5QZmty1uoQ9AtzKIpd0PE1QwDV9U4NWlmc/gviz/tq?tqx=out:json";

const APP_METRICS = {
  "Live Pace Speed Calculator": [2, 3, 4],
  "Live Predictor Premium": [6, 7, 8],
  "Live Time Predictor": [10, 11, 12],
  "Route Silhouette": [18, 19, 20],
  "Pacer Data Field": [14, 15, 16],
  "Solve for X": [22, 23, 24],
  "Time Across The Galaxy": [26, 27, 28],
  "Tracker Data Field": [30, 31, 32]
};

/* ======================
   LOAD METRICS
====================== */

async function loadMetrics() {
  try {
    const res = await fetch(SHEET_URL);
    const text = await res.text();
    const json = JSON.parse(text.substring(47).slice(0, -2));
    const row = json.table.rows[0].c;

    document.querySelectorAll('.card').forEach(card => {
      const appName = card.dataset.name;
      const metricsBox = card.querySelector('.metrics');
      const tag = card.querySelector(".momentum-tag");
      const tip = card.querySelector(".tooltip");

      if (!APP_METRICS[appName]) return;

      const [tCol, iCol, uCol] = APP_METRICS[appName];

      const total = row[tCol]?.v || 0;
      const installs = row[iCol]?.v || 0;
      const users = row[uCol]?.v || 0;

      if (!total && !installs && !users) return;

      // Raw metrics
      metricsBox.querySelector(".metric-total").textContent = `Downloads: ${total}`;
      metricsBox.querySelector(".metric-installs").textContent = `Installs: ${installs}`;
      metricsBox.querySelector(".metric-users").textContent = `Users: ${users}`;

      // Momentum label logic
      if (installs >= 50) {
        tag.textContent = "Trending Hot 🔥";
        tag.classList.remove("hidden");
        tag.classList.add("momentum-hot");
        tip.textContent = "This app is having a very strong week.";
      } else if (installs >= 10) {
        tag.textContent = "Trending Up 🚀";
        tag.classList.remove("hidden");
        tag.classList.add("momentum-strong");
        tip.textContent = "This app is gaining momentum.";
      } else if (installs >= 1) {
        tag.textContent = "Getting Attention 👀";
        tag.classList.remove("hidden");
        tag.classList.add("momentum-positive");
        tip.textContent = "This app has some activity this week.";
      } else {
        return;
      }

      // Tooltip toggle
      tag.addEventListener("click", () => {
        tip.classList.toggle("hidden");
      });
    });

  } catch (err) {
    console.warn("Failed to load metrics:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadMetrics);
