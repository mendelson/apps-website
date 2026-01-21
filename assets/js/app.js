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
   EMAIL PROTECTION
====================== */
document.getElementById('emailBtn').addEventListener('click', () => {
  const user = "mateusmendelson";
  const domain = "hotmail.com";
  window.location.href = "mailto:" + user + "@" + domain;
});


/* ======================
   METRICS CONFIGURATION
====================== */

/**
 * Public spreadsheet containing ONLY safe metrics.
 */
const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1ss0plcKrV5QZmty1uoQ9AtzKIpd0PE1QwDV9U4NWlmc/gviz/tq?tqx=out:json";

/**
 * Mapping of app name → column indexes in the sheet data.
 * (Taken directly from your screenshots.)
 *
 * Format:
 *   title: [ totalDownloadsCol, installs7daysCol, users7daysCol ]
 *
 * Column numbers refer to the *zero-based* array returned by Google Sheets.
 */
const APP_METRICS = {
  "Live Pace Speed Calculator": [2, 3, 4],   // C,D,E
  "Live Predictor Premium": [6, 7, 8],      // G,H,I
  "Live Time Predictor": [10, 11, 12],      // K,L,M
  "Route Silhouette": [18, 19, 20],         // S,T,U
  "Pacer Data Field": [14, 15, 16],         // O,P,Q
  "Solve for X": [22, 23, 24],              // W,X,Y
  "Time Across The Galaxy": [26, 27, 28],   // AA,AB,AC
  "Tracker Data Field": [30, 31, 32]        // AE,AF,AG
};


/* ======================
   FETCH METRICS
====================== */

async function loadMetrics() {
  try {
    const res = await fetch(SHEET_URL);
    const text = await res.text();

    // Extract JSON from Google Visualization format
    const json = JSON.parse(text.substring(47).slice(0, -2));
    const rows = json.table.rows[0].c; // Row 1 holds metrics for all apps

    document.querySelectorAll('.card').forEach(card => {
      const appName = card.dataset.name;
      const metricsBox = card.querySelector('.metrics');

      if (!APP_METRICS[appName]) {
        metricsBox.classList.add('hidden');
        return;
      }

      const [totalCol, installsCol, usersCol] = APP_METRICS[appName];

      const total = rows[totalCol]?.v || 0;
      const installs = rows[installsCol]?.v || 0;
      const users = rows[usersCol]?.v || 0;

      // Hide metrics if all are missing or zero
      if (!total && !installs && !users) {
        metricsBox.classList.add('hidden');
        return;
      }

      // Render metrics
      metricsBox.querySelector('.metric-total').textContent =
        total > 0 ? `Downloads: ${total}` : "";

      metricsBox.querySelector('.metric-installs').textContent =
        installs > 0 ? `Installs (7d): ${installs}` : "";

      metricsBox.querySelector('.metric-users').textContent =
        users > 0 ? `Users (7d): ${users}` : "";

      // If any line ends up empty, hide it entirely
      metricsBox.querySelectorAll('.metric').forEach(m => {
        if (!m.textContent.trim()) m.style.display = 'none';
      });

    });

  } catch (err) {
    console.warn("Metrics failed to load.", err);
    // If fail: hide all metric blocks to preserve layout
    document.querySelectorAll('.metrics').forEach(m => m.classList.add('hidden'));
  }
}


// Load metrics once page is ready
document.addEventListener("DOMContentLoaded", loadMetrics);
