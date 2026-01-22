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
   DROPDOWN
====================== */
document.querySelectorAll(".versions button").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.parentElement.classList.toggle("open");
  });
});

/* ======================
   GOOGLE SHEET CONFIG (FINAL)
====================== */

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1ss0plcKrV5QZmty1uoQ9AtzKIpd0PE1QwDV9U4NWlmc/gviz/tq?tqx=out:json";

/*
  Verified JSON column indexes:
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
   LOAD METRICS (FINAL)
====================== */

async function loadMetrics() {
  try {
    const res = await fetch(SHEET_URL);
    const text = await res.text();
    const json = JSON.parse(text.substring(47).slice(0, -2));

    const rows = json.table.rows;
    // rows[0] = total downloads
    // rows[1] = installs last 7 days
    // rows[2] = users last 7 days

    document.querySelectorAll('.card').forEach(card => {
      const name = card.dataset.name;
      const col  = APP_COL[name];

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

      function tagHTML(label) {
        return `${label} <span class="info-icon" style="opacity:0.7; font-size:14px; margin-left:6px;">ⓘ</span>`;
      }

      if (installs >= 50) {
        tag.innerHTML = tagHTML("Trending Hot 🔥");
        tag.classList.add("momentum-hot");
        msg = "🔥 This app is having a very strong week.";
      }
      else if (installs >= 10) {
        tag.innerHTML = tagHTML("Trending Up 🚀");
        tag.classList.add("momentum-strong");
        msg = "🚀 This app is gaining momentum.";
      }
      else if (installs >= 1) {
        tag.innerHTML = tagHTML("Getting Attention 👀");
        tag.classList.add("momentum-positive");
        msg = "👀 This app has activity this week.";
      }
      else {
        return; // No momentum, no display
      }

      tag.classList.remove("hidden");

      /* ================
         TOOLTIP CONTENT (Filtered)
         Only show metrics >= 7
      ================= */
      let tooltipHTML = `<strong>📊 App Metrics</strong><br>`;

      if (total >= 7)    tooltipHTML += `• Downloads: ${total}<br>`;
      if (installs >= 7) tooltipHTML += `• Installs (7d): ${installs}<br>`;
      if (users >= 7)    tooltipHTML += `• Users (7d): ${users}<br>`;

      if (tooltipHTML === `<strong>📊 App Metrics</strong><br>`)
        tooltipHTML = ""; // hide all stats

      tooltipHTML += `<br>${msg}`;
      tip.innerHTML = tooltipHTML;

      /* ================
         OPEN/CLOSE TOOLTIP
      ================= */
      tag.addEventListener("click", (ev) => {
        ev.stopPropagation();

        // Close all others
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
   FEATURED CAROUSEL
====================== */

function buildFeaturedCarousel(metrics) {

  const apps = Object.keys(APP_COL).map(name => {
    const col = APP_COL[name];
    return {
      name,
      col,
      total: metrics.total[col] || 0,
      installs: metrics.installs[col] || 0,
      users: metrics.users[col] || 0,
      image: document.querySelector(`.card[data-name="${name}"] img`)?.src,
      url: document.querySelector(`.card[data-name="${name}"] a.ciq-badge`)?.href
    };
  });

  /* Helper: avoid showing same app twice */
  const used = new Set();
  const pick = (sortedList) => {
    for (const item of sortedList) {
      if (!used.has(item.name)) {
        used.add(item.name);
        return item;
      }
    }
    return null;
  };

  /* Rankings */
  const byInstalls = [...apps].sort((a,b) => b.installs - a.installs);
  const byTotal    = [...apps].sort((a,b) => b.total - a.total);
  const byUsers    = [...apps].sort((a,b) => b.users - a.users);

  /* Pick winners */
  const popularThisWeek  = pick(byInstalls);
  const allTimeFavorite  = pick(byTotal);
  const lovedByAthletes  = pick(byUsers);

  const slides = [
    {
      title: "🔥 Popular This Week",
      desc: "The fastest-growing app right now among athletes.",
      app: popularThisWeek
    },
    {
      title: "⭐ All-Time Favorite",
      desc: "The most downloaded app of the entire collection.",
      app: allTimeFavorite
    },
    {
      title: "👥 Loved by Its Athletes",
      desc: "Athletes who use it tend to stick with it.",
      app: lovedByAthletes
    }
  ];

  /* Build HTML */
  const track = document.querySelector(".carousel-track");
  const indicators = document.querySelector(".carousel-indicators");

  track.innerHTML = "";
  indicators.innerHTML = "";

  slides.forEach((slide, index) => {
    if (!slide.app) return;

    track.innerHTML += `
      <div class="carousel-slide">
        <h3>${slide.title}</h3>
        <img src="${slide.app.image}" alt="${slide.app.name}">
        <h4>${slide.app.name}</h4>
        <p>${slide.desc}</p>
        <a class="button" href="${slide.app.url}">View App</a>
      </div>
    `;

    indicators.innerHTML += `
      <span data-index="${index}" class="${index === 0 ? "active" : ""}"></span>
    `;
  });

  /* Carousel behavior */
  let current = 0;
  const totalSlides = slides.length;

  const updateCarousel = () => {
    const width = document.querySelector(".carousel").offsetWidth;
    track.style.transform = `translateX(-${current * width}px)`;
    indicators.querySelectorAll("span").forEach((dot, i) => {
      dot.classList.toggle("active", i === current);
    });
  };

  /* Auto-rotate every 3 seconds */
  setInterval(() => {
    current = (current + 1) % totalSlides;
    updateCarousel();
  }, 3000);

  /* Indicator click */
  indicators.addEventListener("click", (e) => {
    if (e.target.dataset.index) {
      current = parseInt(e.target.dataset.index);
      updateCarousel();
    }
  });

  /* Update on resize */
  window.addEventListener("resize", updateCarousel);
}


/* ======================
   LOAD METRICS EXTENDED
====================== */

async function loadMetrics() {
  try {
    const res = await fetch(SHEET_URL);
    const text = await res.text();
    const json = JSON.parse(text.substring(47).slice(0, -2));

    const rows = json.table.rows;

    const metrics = {
      total: rows[0].c.map(c => c?.v || 0),
      installs: rows[1].c.map(c => c?.v || 0),
      users: rows[2].c.map(c => c?.v || 0)
    };

    /* Build momentum tags + tooltips */
    document.querySelectorAll('.card').forEach(card => {
      const name = card.dataset.name;
      const col = APP_COL[name];

      if (col === undefined) return;

      const total = metrics.total[col];
      const installs = metrics.installs[col];
      const users = metrics.users[col];

      const tag = card.querySelector(".momentum-tag");
      const tip = card.querySelector(".tooltip");

      let msg = "";

      function tagHTML(label) {
        return `${label} <span class="info-icon" style="opacity:0.7; font-size:14px; margin-left:6px;">ⓘ</span>`;
      }

      if (installs >= 50) {
        tag.innerHTML = tagHTML("Trending Hot 🔥");
        tag.classList.add("momentum-hot");
        msg = "🔥 This app is having a very strong week.";
      } else if (installs >= 10) {
        tag.innerHTML = tagHTML("Trending Up 🚀");
        tag.classList.add("momentum-strong");
        msg = "🚀 This app is gaining momentum.";
      } else if (installs >= 1) {
        tag.innerHTML = tagHTML("Getting Attention 👀");
        tag.classList.add("momentum-positive");
        msg = "👀 This app has activity this week.";
      } else {
        return;
      }

      tag.classList.remove("hidden");

      let tooltipHTML = `<strong>📊 App Metrics</strong><br>`;

      if (total >= 7) tooltipHTML += `• Downloads: ${total}<br>`;
      if (installs >= 7) tooltipHTML += `• Installs (7d): ${installs}<br>`;
      if (users >= 7) tooltipHTML += `• Users (7d): ${users}<br>`;

      if (tooltipHTML === `<strong>📊 App Metrics</strong><br>`) {
        tooltipHTML = "";
      }

      tooltipHTML += `<br>${msg}`;
      tip.innerHTML = tooltipHTML;

      tag.addEventListener("click", (ev) => {
        ev.stopPropagation();
        document.querySelectorAll(".tooltip").forEach(t => {
          if (t !== tip) t.classList.add("hidden");
        });
        tip.classList.toggle("hidden");
      });
    });

    /* FEATURED CAROUSEL BUILD */
    buildFeaturedCarousel(metrics);

  } catch (err) {
    console.error("Failed to load metrics:", err);
  }
}

/* Close all tooltips on outside click */
document.addEventListener("click", () => {
  document.querySelectorAll(".tooltip").forEach(t => t.classList.add("hidden"));
});

document.addEventListener("DOMContentLoaded", loadMetrics);

/* ======================
   CLOSE ALL TOOLTIPS WHEN CLICKING OUTSIDE
====================== */
document.addEventListener("click", () => {
  document.querySelectorAll(".tooltip").forEach(t => t.classList.add("hidden"));
});

document.addEventListener("DOMContentLoaded", loadMetrics);
