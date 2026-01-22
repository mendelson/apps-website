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
   EMAIL BUTTON
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
   GOOGLE SHEET CONFIG — VERIFIED
====================== */

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1ss0plcKrV5QZmty1uoQ9AtzKIpd0PE1QwDV9U4NWlmc/gviz/tq?tqx=out:json";

/*
  From your actual JSON:
  Correct numeric columns:
  2, 6, 10, 14, 18, 22, 26, 30
*/

const APP_COL = {
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
    // 1 = installs (7d)
    // 2 = users (7d)

    document.querySelectorAll('.card').forEach(card => {
      const name = card.dataset.name;
      const col = APP_COL[name];

      if (col === undefined) return;

      const total    = rows[0].c[col]?.v || 0;
      const installs = rows[1].c[col]?.v || 0;
      const users    = rows[2].c[col]?.v || 0;

      const tag = card.querySelector(".momentum-tag");
      const tip = card.querySelector(".tooltip");

      /* ================
         MOMENTUM LOGIC
      ================= */
      let msg = "";

      if (installs >= 50) {
        tag.textContent = "Trending Hot 🔥";
        tag.classList.add("momentum-hot");
        msg = "🔥 This app is having a very strong week.";
      }
      else if (installs >= 10) {
        tag.textContent = "Trending Up 🚀";
        tag.classList.add("momentum-strong");
        msg = "🚀 This app is gaining momentum.";
      }
      else if (installs >= 1) {
        tag.textContent = "Getting Attention 👀";
        tag.classList.add("momentum-positive");
        msg = "👀 This app has activity this week.";
      }
      else {
        return; // no momentum => hide everything
      }

      tag.classList.remove("hidden");

      /* ================
         TOOLTIP CONTENT (Option D)
         Only show values >= 7
      ================= */
      let tooltipHTML = `<strong>📊 App Metrics</strong><br>`;

      if (total >= 7)    tooltipHTML += `• Downloads: ${total}<br>`;
      if (installs >= 7) tooltipHTML += `• Installs (7d): ${installs}<br>`;
      if (users >= 7)    tooltipHTML += `• Users (7d): ${users}<br>`;

      // Remove header if all suppressed
      if (tooltipHTML === `<strong>📊 App Metrics</strong><br>`) {
        tooltipHTML = "";
      }

      tooltipHTML += `<br>${msg}`;

      tip.innerHTML = tooltipHTML;

      /* ================
         ONLY ONE TOOLTIP OPEN AT A TIME
      ================= */
      tag.addEventListener("click", (ev) => {
        ev.stopPropagation();

        // Close all other tooltips
        document.querySelectorAll(".tooltip").forEach(t => {
          if (t !== tip) t.classList.add("hidden");
        });

        tip.classList.toggle("hidden");
      });
    });

  } catch (err) {
    console.error("Failed to load metrics:", err);
  }
}

/* ======================
   CLOSE ALL TOOLTIPS WHEN CLICKING OUTSIDE
====================== */
document.addEventListener("click", () => {
  document.querySelectorAll(".tooltip").forEach(t => t.classList.add("hidden"));
});

document.addEventListener("DOMContentLoaded", loadMetrics);
