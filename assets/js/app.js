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
 * Mapping of app name → column indexes.
 *
 * Format:
 *   title: [ totalDownloadsCol, installs7daysCol, users7daysCol ]
 *
 * These are verified correct from the JSON you sent.
 */
const APP_METRICS = {
  "Live Pace Speed Calculator": [2, 2, 2],   // C row0, C row1, C row2
  "Live Predictor Premium": [6, 6, 6],       // G row0, G row1, G row2
  "Live Time Predictor": [10, 10, 10],       // K row0, K row1, K row2
  "Pacer Data Field": [14, 14, 14],          // O row0, O row1, O row2
  "Route Silhouette": [18, 18, 18],          // S row0, S row1, S row2
  "Solve for X": [22, 22, 22],               // W row0, W row1, W row2
  "Time Across The Galaxy": [26, 26, 26],    // AA row0, AA row1, AA row2
  "Tracker Data Field": [30, 30, 30]         // AE row0, AE row1, AE row2
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

    // There are 3 rows of metrics:
    // Row 0: total downloads
    // Row 1: installs in last 7 days
    // Row 2: users in last 7 days
    const totalRow = json.table.rows[0].c;
    const installRow = json.table.rows[1].c;
    const usersRow = json.table.rows[2].c;

    document.querySelectorAll('.card').forEach(card => {
      const appName = card.dataset.name;
      const metricsBox = card.querySelector('.metrics');

      if (!APP_METRICS[appName]) {
        metricsBox.classList.add('hidden');
        return;
      }

      const [colD, colI, colU] = APP_METRICS[appName];

      const total   = totalRow[colD]?.v || 0;
      const inst7d  = installRow[colI]?.v || 0;
      const user7d  = usersRow[colU]?.v || 0;

      if (!total && !inst7d && !user7d) {
        metricsBox.classList.add('hidden');
        return;
      }

      metricsBox.querySelector('.metric-total').textContent =
        total > 0 ? `Downloads: ${total}` : "";

      metricsBox.querySelector('.metric-installs').textContent =
        inst7d > 0 ? `Installs (7d): ${inst7d}` : "";

      metricsBox.querySelector('.metric-users').textContent =
        user7d > 0 ? `Users (7d): ${user7d}` : "";

      // Hide empty rows
      metricsBox.querySelectorAll('.metric').forEach(m => {
        if (!m.textContent.trim()) m.style.display = 'none';
      });
    });

  } catch (err) {
    console.warn("Metrics failed to load.", err);
    document.querySelectorAll('.metrics').forEach(m => m.classList.add('hidden'));
  }
}


// Load metrics when ready
document.addEventListener("DOMContentLoaded", loadMetrics);
