/* ==========================================================
   SEARCH
========================================================== */
document.getElementById('search').addEventListener('input', e => {
  const q = e.target.value.toLowerCase();
  document.querySelectorAll('.card').forEach(c => {
    c.style.display = c.dataset.name.toLowerCase().includes(q) ? '' : 'none';
  });
});

/* ==========================================================
   EMAIL
========================================================== */
document.getElementById('emailBtn').addEventListener('click', () => {
  window.location.href = "mailto:mateusmendelson@hotmail.com";
});

/* ==========================================================
   DROPDOWN (VERSIONS)
========================================================== */
document.querySelectorAll(".versions button").forEach(btn => {
  btn.addEventListener("click", e => {
    e.stopPropagation();
    btn.parentElement.classList.toggle("open");
  });
});

document.addEventListener("click", e => {
  if (!e.target.closest(".versions"))
    document.querySelectorAll(".versions.open")
      .forEach(v => v.classList.remove("open"));
});

/* ==========================================================
   METRICS CONFIG
========================================================== */

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1ss0plcKrV5QZmty1uoQ9AtzKIpd0PE1QwDV9U4NWlmc/gviz/tq?tqx=out:json";

const APP_METRICS = {
  "Live Pace Speed Calculator": [2, 2, 2],
  "Live Predictor Premium": [6, 6, 6],
  "Live Time Predictor": [10, 10, 10],
  "Pacer Data Field": [14, 14, 14],
  "Route Silhouette": [18, 18, 18],
  "Solve for X": [22, 22, 22],
  "Time Across The Galaxy": [26, 26, 26],
  "Tracker Data Field": [30, 30, 30]
};

const TOOLTIP_TEXT = {
  high: {
    title: "📈 Popular This Week",
    message: "This app saw a strong increase in usage and is trending among athletes.",
    note: "Above-average performance compared to similar apps."
  },
  medium: {
    title: "🚀 Steady Growth",
    message: "Athletes are adopting this app at a consistent and healthy pace.",
    note: "Good retention and ongoing engagement."
  },
  low: {
    title: "👍 Reliable Usage",
    message: "This app maintains a stable base of weekly active athletes.",
    note: "Solid and dependable performance."
  }
};

/* ==========================================================
   LOAD METRICS + TOOLTIP FIX + FEATURED
========================================================== */

async function loadMetrics() {
  try {
    const res = await fetch(SHEET_URL);
    const text = await res.text();
    const json = JSON.parse(text.substring(47).slice(0, -2));
    const rowTotal = json.table.rows[0].c;
    const rowInstalls = json.table.rows[1].c;
    const rowUsers = json.table.rows[2].c;

    const allCards = [...document.querySelectorAll('.card')];

    allCards.forEach(card => {
      const name = card.dataset.name;
      const metrics = card.querySelector('.metrics');
      const tag = card.querySelector(".momentum-tag");
      const tip = card.querySelector(".tooltip");

      if (!APP_METRICS[name]) return;

      const [tCol, iCol, uCol] = APP_METRICS[name];
      const total = rowTotal[tCol]?.v || 0;
      const installs = rowInstalls[iCol]?.v || 0;
      const users = rowUsers[uCol]?.v || 0;

      metrics.dataset.total = total;
      metrics.dataset.installs = installs;
      metrics.dataset.users = users;

      metrics.style.display = "none"; // raw numbers hidden

      /* === MOMENTUM TAG === */
      if (installs >= 50) {
        tag.innerHTML = `🔥 Popular This Week <span class="info-icon">ⓘ</span>`;
        tag.classList.add("momentum-hot");
        tip.dataset.level = "high";
      } else if (installs >= 10) {
        tag.innerHTML = `📈 Growing Fast <span class="info-icon">ⓘ</span>`;
        tag.classList.add("momentum-strong");
        tip.dataset.level = "medium";
      } else if (installs >= 1) {
        tag.innerHTML = `👍 Trusted by Athletes <span class="info-icon">ⓘ</span>`;
        tag.classList.add("momentum-positive");
        tip.dataset.level = "low";
      } else {
        return;
      }

      tag.classList.remove("hidden");

      /* === Tooltip content (stats ≥ 7 only) === */
      const level = tip.dataset.level;
      let stats = "";

      if (total >= 7) stats += `<div>Downloads: <strong>${total}</strong></div>`;
      if (installs >= 7) stats += `<div>Installs (week): <strong>${installs}</strong></div>`;
      if (users >= 7) stats += `<div>Active users: <strong>${users}</strong></div>`;

      tip.innerHTML = `
        <div class="tip-title">${TOOLTIP_TEXT[level].title}</div>

        <div class="tip-message">
          ${TOOLTIP_TEXT[level].message}
        </div>

        <div class="tip-metrics">
          ${total    > 7 ? `<div><span>Total Downloads:</span> <strong>${total}</strong></div>` : ""}
          ${installs > 7 ? `<div><span>Installs (7 days):</span> <strong>${installs}</strong></div>` : ""}
          ${users    > 7 ? `<div><span>Active Users (7 days):</span> <strong>${users}</strong></div>` : ""}
        </div>

        <div class="tip-note">${TOOLTIP_TEXT[level].note}</div>
      `;

      /* === Tooltip toggle with adaptive positioning === */
      tag.addEventListener("click", e => {
        e.stopPropagation();

        document.querySelectorAll(".tooltip")
          .forEach(t => t.classList.add("hidden"));

        tip.classList.toggle("hidden");
        adaptTooltipPosition(tag, tip);
      });
    });

    /* Close tooltips when clicking outside */
    document.addEventListener("click", () => {
      document.querySelectorAll(".tooltip").forEach(t => t.classList.add("hidden"));
    });

    buildFeaturedCarousel();

  } catch (err) {
    console.warn("Failed to load metrics:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadMetrics);

/* ==========================================================
   ADAPTIVE TOOLTIP POSITIONING
========================================================== */

function adaptTooltipPosition(tag, tip) {
  // Tooltip ALWAYS appears BELOW the tag
  tip.style.top = "100%";
  tip.style.bottom = "auto";
  tip.style.transform = "translateX(-50%)";
  tip.style.marginTop = "8px";

  // Arrow always pointing UP toward the tag
  tip.style.setProperty("--arrow-dir", "up");
}

/* ==========================================================
   FEATURED CAROUSEL
========================================================== */

function buildFeaturedCarousel() {
  const cards = [...document.querySelectorAll(".card")];
  const get = (c, k) => Number(c.querySelector(".metrics").dataset[k] || 0);

  /* Sort */
  const byInstalls = cards.slice().sort((a, b) => get(b, "installs") - get(a, "installs"));
  const byTotal = cards.slice().sort((a, b) => get(b, "total") - get(a, "total"));
  const byUsers = cards.slice().sort((a, b) => get(b, "users") - get(a, "users"));

  /* Unique picks */
  const picks = [];
  const add = c => { if (c && !picks.includes(c)) picks.push(c); };

  add(byInstalls[0]);
  add(byTotal.find(c => !picks.includes(c)));
  add(byUsers.find(c => !picks.includes(c)));

  const labels = [
    "🔥 Popular This Week",
    "🏆 All-Time Favorite",
    "💪 Most Engaged Users"
  ];

  const track = document.querySelector(".carousel-track");
  const dots = document.querySelector(".carousel-indicators");
  track.innerHTML = "";
  dots.innerHTML = "";

  picks.forEach((card, i) => {
    const img = card.querySelector(".thumb").src;
    const title = card.querySelector("h3").textContent;
    const desc = card.querySelector("p").textContent;

    const slide = document.createElement("div");
    slide.className = "carousel-slide";

    slide.innerHTML = `
      <div class="featured-slide-content">
        <div class="featured-label">${labels[i]}</div>
        <div class="featured-card-preview">
          <img src="${img}">
          <h3>${title}</h3>
          <p>${desc}</p>
          <button class="featured-cta">See details</button>
        </div>
      </div>
    `;

    slide.querySelector(".featured-cta").addEventListener("click", () => {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      card.classList.add("highlight");
      setTimeout(() => card.classList.remove("highlight"), 1700);
    });

    track.appendChild(slide);

    const dot = document.createElement("div");
    dot.className = "indicator" + (i === 0 ? " active" : "");
    dots.appendChild(dot);

    dot.addEventListener("click", () => goTo(i));
  });

  let index = 0;

  function goTo(i) {
    index = i;
    track.style.transition = "transform 0.45s ease";
    track.style.transform = `translateX(-${i * 100}%)`;
    dots.querySelectorAll(".indicator").forEach((d, j) =>
      d.classList.toggle("active", j === i)
    );
  }

  let interval = setInterval(() => next(), 5000);
  const next = () => goTo((index + 1) % picks.length);

  document.querySelector(".carousel").addEventListener("mouseenter", () => {
    clearInterval(interval);
  });

  document.querySelector(".carousel").addEventListener("mouseleave", () => {
    interval = setInterval(() => next(), 5000);
  });

  /* TOUCH SWIPE */
  let startX = 0;
  let currentX = 0;
  let dragging = false;

  track.addEventListener("touchstart", e => {
    dragging = true;
    startX = e.touches[0].clientX;
    currentX = startX;
    track.style.transition = "none";
  });

  track.addEventListener("touchmove", e => {
    if (!dragging) return;
    currentX = e.touches[0].clientX;
    const dx = currentX - startX;
    track.style.transform = `translateX(calc(${-index * 100}% + ${dx}px))`;
  });

  track.addEventListener("touchend", () => {
    dragging = false;
    const dx = currentX - startX;
    track.style.transition = "transform 0.45s ease";

    if (dx > 60 && index > 0) index--;
    else if (dx < -60 && index < picks.length - 1) index++;

    goTo(index);
  });
}

/* ==========================================================
   BACK TO TOP BUTTON
========================================================== */

const toTopBtn = document.createElement("div");
toTopBtn.id = "toTopBtn";
toTopBtn.textContent = "⬆";
document.body.appendChild(toTopBtn);

window.addEventListener("scroll", () => {
  if (window.scrollY > 600)
    toTopBtn.classList.add("show");
  else
    toTopBtn.classList.remove("show");
});

toTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
