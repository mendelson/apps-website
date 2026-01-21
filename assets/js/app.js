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
  window.location.href = "mailto:mateusmendelson@hotmail.com";
});

/* ======================
   METRICS CONFIGURATION
====================== */

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1ss0plcKrV5QZmty1uoQ9AtzKIpd0PE1QwDV9U4NWlmc/gviz/tq?tqx=out:json";

const APP_METRICS = {
  "Live Predictor Premium": [6, 6, 6],
  "Live Time Predictor": [10, 10, 10],
  "Pacer Data Field": [14, 14, 14],
  "Live Pace Speed Calculator": [2, 2, 2],
  "Tracker Data Field": [30, 30, 30],
  "Route Silhouette": [18, 18, 18],
  "Solve for X": [22, 22, 22],
  "Time Across The Galaxy": [26, 26, 26]
};

/* ======================
   MOMENTUM TAG LOGIC
====================== */

function getMomentumTag(total, inst, users) {
  // Hide tag when too low
  if ((inst < 3 && users < 5 && total < 150)) return null;

  // Order of priority
  if (inst > 20 || users > 30) return "Trending Up 🚀";
  if (users / total > 0.15) return "Highly Active 🔥";
  if (total < 300 && inst >= 5) return "New & Rising 🌱";

  return "Stable 👍";
}

/* ======================
   FETCH METRICS
====================== */

async function loadMetrics() {
  try {
    const res = await fetch(SHEET_URL);
    const text = await res.text();
    const json = JSON.parse(text.substring(47).slice(0, -2));

    const totalRow = json.table.rows[0].c;
    const installRow = json.table.rows[1].c;
    const usersRow = json.table.rows[2].c;

    document.querySelectorAll('.card').forEach(card => {
      const appName = card.dataset.name;
      const metricsBox = card.querySelector('.metrics');
      const momentumBox = card.querySelector('.momentum-tag');

      if (!APP_METRICS[appName]) {
        metricsBox.classList.add('hidden');
        momentumBox.classList.add('hidden');
        return;
      }

      const [col] = APP_METRICS[appName];

      const total = totalRow[col]?.v || 0;
      const inst7d = installRow[col]?.v || 0;
      const user7d = usersRow[col]?.v || 0;

      // ---- Momentum Tag ----
      const tag = getMomentumTag(total, inst7d, user7d);
      if (tag) {
        momentumBox.textContent = tag;
        momentumBox.classList.remove('hidden');
      } else {
        momentumBox.classList.add('hidden');
      }

      // ---- Metrics ----
      metricsBox.querySelector('.metric-total').textContent =
        total > 0 ? `Downloads: ${total}` : "";

      metricsBox.querySelector('.metric-installs').textContent =
        inst7d > 0 ? `Installs this week: ${inst7d}` : "";

      metricsBox.querySelector('.metric-users').textContent =
        user7d > 0 ? `Active users: ${user7d}` : "";

      metricsBox.querySelectorAll('.metric').forEach(m => {
        if (!m.textContent.trim()) m.style.display = 'none';
      });
    });

  } catch (err) {
    document.querySelectorAll('.metrics').forEach(m => m.classList.add('hidden'));
    document.querySelectorAll('.momentum-tag').forEach(m => m.classList.add('hidden'));
  }
}

document.addEventListener("DOMContentLoaded", loadMetrics);
