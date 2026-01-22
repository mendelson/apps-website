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

/*  
   Correct spreadsheet layout (from screenshot):

   Row 4: Total downloads
   Row 5: Installs last 7 days
   Row 6: Users last 7 days

   App columns (C, F, I, L, O, R, U, X):
   C  = 2
   F  = 5
   I  = 8
   L  = 11
   O  = 14
   R  = 17
   U  = 20
   X  = 23
*/

const TOTAL_ROW    = 4;
const INSTALLS_ROW = 5;
const USERS_ROW    = 6;

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
   LOAD METRICS
====================== */

async function loadMetrics() {
  try {
    const res = await fetch(SHEET_URL);
    const text = await res.text();

    // Extract JSON safely
    const json = JSON.parse(text.substring(47).slice(0, -2));

    // Loop over all app cards
    document.querySelectorAll('.card').forEach(card => {
      const appName = card.dataset.name;
      const col = APP_METRICS[appName];
      if (col === undefined) return;

      const total    = json.table.rows[TOTAL_ROW]?.c[col]?.v    || 0;
      const installs = json.table.rows[INSTALLS_ROW]?.c[col]?.v || 0;
      const users    = json.table.rows[USERS_ROW]?.c[col]?.v    || 0;

      const metricsBox = card.querySelector('.metrics');
      const tag = card.querySelector(".momentum-tag");
      const tip = card.querySelector(".tooltip");

      // Show raw numbers (your current expected behavior)
      metricsBox.querySelector(".metric-total").textContent    = `Downloads: ${total}`;
      metricsBox.querySelector(".metric-installs").textContent = `Installs: ${installs}`;
      metricsBox.querySelector(".metric-users").textContent    = `Users: ${users}`;

      // M O M E N T U M  T A G  L O G I C
      if (installs >= 50) {
        tag.textContent = "Trending Hot 🔥";
        tag.classList.add("momentum-hot");
        tip.textContent = "This app is having a very strong week.";
      } 
      else if (installs >= 10) {
        tag.textContent = "Trending Up 🚀";
        tag.classList.add("momentum-strong");
        tip.textContent = "This app is gaining momentum.";
      } 
      else if (installs >= 1) {
        tag.textContent = "Getting Attention 👀";
        tag.classList.add("momentum-positive");
        tip.textContent = "This app has some activity this week.";
      } 
      else {
        return; // no installs → no momentum
      }

      // Show the momentum tag now that we have valid installs
      tag.classList.remove("hidden");

      // Toggle tooltip on click
      tag.addEventListener("click", () => {
        tip.classList.toggle("hidden");
      });

    });

  } catch (err) {
    console.warn("Failed to load metrics:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadMetrics);
