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

/* ======================
   LOAD METRICS — ROBUST
====================== */
async function loadMetrics() {
  try {
    const res = await fetch(SHEET_URL);
    const text = await res.text();
    const json = JSON.parse(text.substring(47).slice(0, -2));
    const rows = json.table.rows;
    const cols = json.table.cols;

    // Build a map of column index → app name
    const labelRow = rows.find(r =>
      r.c.some(cell => cell && typeof cell.v === 'string')
    );
    if (!labelRow) return;

    const colAppMap = {};
    labelRow.c.forEach((cell, index) => {
      if (!cell || !cell.v) return;
      const text = cell.v.toString().trim();
      // If this cell text matches an app name in your dataset
      document.querySelectorAll('.card h3').forEach(h3 => {
        if (h3.textContent.trim() === text) {
          colAppMap[index] = text;
        }
      });
    });

    // Find rows that represent totals / installs / users
    const totalRow = rows.find(r =>
      r.c.some(cell => cell && cell.v && /total downloads/i.test(cell.v.toString()))
    );
    const installsRow = rows.find(r =>
      r.c.some(cell => cell && cell.v && /installs last 7 days/i.test(cell.v.toString()))
    );
    const usersRow = rows.find(r =>
      r.c.some(cell => cell && cell.v && /users last 7 days/i.test(cell.v.toString()))
    );

    if (!totalRow || !installsRow || !usersRow) {
      console.warn("Could not find metrics rows in sheet");
      return;
    }

    document.querySelectorAll('.card').forEach(card => {
      const appName = card.dataset.name;
      const colIndex = Object.keys(colAppMap).find(k => colAppMap[k] === appName);

      if (colIndex === undefined) return;

      const total = totalRow.c[colIndex]?.v || 0;
      const installs = installsRow.c[colIndex]?.v || 0;
      const users = usersRow.c[colIndex]?.v || 0;

      const metricsBox = card.querySelector('.metrics');
      const tag = card.querySelector(".momentum-tag");
      const tip = card.querySelector(".tooltip");

      metricsBox.querySelector(".metric-total").textContent = `Downloads: ${total}`;
      metricsBox.querySelector(".metric-installs").textContent = `Installs: ${installs}`;
      metricsBox.querySelector(".metric-users").textContent = `Users: ${users}`;

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
    console.warn("Failed to load metrics:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadMetrics);
