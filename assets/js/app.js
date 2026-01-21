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
  "Live Predictor Premium": [6],
  "Live Time Predictor": [10],
  "Pacer Data Field": [14],
  "Live Pace Speed Calculator": [2],
  "Tracker Data Field": [30],
  "Route Silhouette": [18],
  "Solve for X": [22],
  "Time Across The Galaxy": [26]
};

/* ======================
   MOMENTUM LOGIC
====================== */
function getMomentumTag(total, inst, users) {
  if (total < 150 && inst < 3 && users < 5) return null;
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
      const tooltip = card.querySelector('.tooltip');

      if (!APP_METRICS[appName]) {
        metricsBox.classList.add('hidden');
        momentumBox.classList.add('hidden');
        tooltip.classList.add('hidden');
        return;
      }

      const [col] = APP_METRICS[appName];

      const total = totalRow[col]?.v || 0;
      const inst7d = installRow[col]?.v || 0;
      const user7d = usersRow[col]?.v || 0;

      /* ----- MOMENTUM TAG ----- */
      const tag = getMomentumTag(total, inst7d, user7d);
      if (tag) {
        momentumBox.textContent = tag + " ⓘ";
        momentumBox.classList.remove('hidden');

        tooltip.innerHTML = `
          <strong>This week:</strong><br>
          • ${inst7d} installs<br>
          • ${user7d} active users<br><br>
          Total downloads: ${total}
        `;
      } else {
        momentumBox.classList.add('hidden');
      }

      /* ----- METRIC NUMBERS (hidden, used only for tooltip) ----- */
      metricsBox.querySelector('.metric-total').textContent =
        total > 0 ? `Downloads: ${total}` : "";

      metricsBox.querySelector('.metric-installs').textContent =
        inst7d > 0 ? `Installs this week: ${inst7d}` : "";

      metricsBox.querySelector('.metric-users').textContent =
        user7d > 0 ? `Active users: ${user7d}` : "";

      metricsBox.querySelectorAll('.metric').forEach(m => {
        if (!m.textContent.trim()) m.style.display = 'none';
      });

      /* ----- TOOLTIP BEHAVIOR ----- */
      momentumBox.addEventListener('click', (e) => {
        e.stopPropagation();
        tooltip.classList.toggle('visible');
      });

      momentumBox.addEventListener('mouseenter', () => {
        tooltip.classList.add('visible');
      });

      momentumBox.addEventListener('mouseleave', () => {
        tooltip.classList.remove('visible');
      });

      document.addEventListener('click', () => {
        tooltip.classList.remove('visible');
      });
    });

  } catch (err) {
    document.querySelectorAll('.metrics').forEach(m => m.classList.add('hidden'));
    document.querySelectorAll('.momentum-tag').forEach(m => m.classList.add('hidden'));
    document.querySelectorAll('.tooltip').forEach(t => t.classList.add('hidden'));
  }
}

document.addEventListener("DOMContentLoaded", loadMetrics);
