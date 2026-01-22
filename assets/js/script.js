/* ======================================
   SEARCH
====================================== */
document.getElementById('search').addEventListener('input', e => {
  const q = e.target.value.toLowerCase();
  document.querySelectorAll('.card').forEach(c => {
    c.style.display = c.dataset.name.toLowerCase().includes(q) ? '' : 'none';
  });
});

/* ======================================
   EMAIL
====================================== */
document.getElementById('emailBtn').addEventListener('click', () => {
  window.location.href = "mailto:mateusmendelson@hotmail.com";
});

/* ======================================
   DROPDOWNS
====================================== */
document.querySelectorAll(".versions button").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.parentElement.classList.toggle("open");
  });
});

/* ======================================
   METRICS CONFIG
====================================== */

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

/* TOOLTIP TEXTS */
const TOOLTIP_TEXT = {
  high: "High adoption this week — many athletes are choosing this app.",
  medium: "Consistent growth this week, showing strong athlete interest.",
  low: "A steady performer trusted by athletes every week."
};

/* ======================================
   LOAD METRICS
====================================== */

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

      // Store for featured selection
      metricsBox.dataset.total = total;
      metricsBox.dataset.installs = installs;
      metricsBox.dataset.users = users;

      // Hide raw numbers
      metricsBox.style.display = "none";

      // Momentum logic
      if (installs >= 50) {
        tag.innerHTML = `🔥 Popular This Week <span class="info-icon">ⓘ</span>`;
        tag.classList.add("momentum-hot");
        tip.textContent = TOOLTIP_TEXT.high;
      } else if (installs >= 10) {
        tag.innerHTML = `📈 Growing Fast <span class="info-icon">ⓘ</span>`;
        tag.classList.add("momentum-strong");
        tip.textContent = TOOLTIP_TEXT.medium;
      } else if (installs >= 1) {
        tag.innerHTML = `👍 Trusted by Athletes <span class="info-icon">ⓘ</span>`;
        tag.classList.add("momentum-positive");
        tip.textContent = TOOLTIP_TEXT.low;
      } else {
        return;
      }

      tag.classList.remove("hidden");

      // Tooltip toggle
      tag.addEventListener("click", e => {
        e.stopPropagation();
        document.querySelectorAll(".tooltip").forEach(t => t.classList.add("hidden"));
        tip.classList.toggle("hidden");
      });
    });

    document.addEventListener("click", () => {
      document.querySelectorAll(".tooltip").forEach(t => t.classList.add("hidden"));
    });

    buildFeaturedCarousel();

  } catch (err) {
    console.warn("Failed to load metrics:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadMetrics);

/* ======================================
   FEATURED CAROUSEL
====================================== */

function buildFeaturedCarousel() {
  const cards = [...document.querySelectorAll(".card")];

  const getVal = (card, key) =>
    Number(card.querySelector(".metrics").dataset[key] || 0);

  const mostInstalls = cards.slice().sort((a,b) =>
    getVal(b,"installs") - getVal(a,"installs"))[0];

  const mostDownloads = cards.slice().sort((a,b) =>
    getVal(b,"total") - getVal(a,"total"))[0];

  const mostActive = cards.slice().sort((a,b) =>
    getVal(b,"users") - getVal(a,"users"))[0];

  const featured = [
    { label: "🔥 Popular This Week", card: mostInstalls },
    { label: "🏆 All-Time Favorite", card: mostDownloads },
    { label: "💪 Most Engaged Users", card: mostActive }
  ];

  const track = document.querySelector(".carousel-track");
  const dots = document.querySelector(".carousel-indicators");

  track.innerHTML = "";
  dots.innerHTML = "";

  featured.forEach((item, i) => {
    const c = item.card;
    const thumb = c.querySelector(".thumb").src;

    const slide = document.createElement("div");
    slide.className = "carousel-slide";

    slide.innerHTML = `
      <div class="featured-slide-content">
        <div class="featured-label">${item.label}</div>
        <div class="featured-card-preview">
          <img src="${thumb}">
          <h3>${c.querySelector("h3").textContent}</h3>
          <p>${c.querySelector("p").textContent}</p>
          <button class="featured-cta">See details</button>
        </div>
      </div>
    `;

    // CTA scroll-to-card behavior (restored EXACTLY as before)
    slide.querySelector(".featured-cta").addEventListener("click", () => {
      c.scrollIntoView({ behavior: "smooth", block: "center" });
      c.classList.add("highlight");
      setTimeout(() => c.classList.remove("highlight"), 1700);
    });

    track.appendChild(slide);

    // Indicators
    const dot = document.createElement("div");
    dot.className = "indicator";
    if (i === 0) dot.classList.add("active");

    dots.appendChild(dot);

    dot.addEventListener("click", () => goToSlide(i));
  });

  let index = 0;
  let interval = setInterval(() => nextSlide(), 5000);

  function nextSlide() {
    index = (index + 1) % featured.length;
    goToSlide(index);
  }

  function goToSlide(i) {
    index = i;
    track.style.transform = `translateX(${-i * 100}%)`;

    dots.querySelectorAll(".indicator").forEach((d, idx) =>
      d.classList.toggle("active", idx === i)
    );
  }

  // Pause auto-rotate on hover
  document.querySelector(".carousel")
    .addEventListener("mouseenter", () => clearInterval(interval));

  document.querySelector(".carousel")
    .addEventListener("mouseleave", () =>
      interval = setInterval(nextSlide, 5000)
    );

  // Swipe gestures (mobile)
  let startX = 0;

  track.addEventListener("touchstart", e =>
    startX = e.touches[0].clientX
  );

  track.addEventListener("touchend", e => {
    let diff = e.changedTouches[0].clientX - startX;
    if (diff > 60) goToSlide(Math.max(0, index - 1));
    if (diff < -60) goToSlide(Math.min(featured.length - 1, index + 1));
  });
}

/* ======================================
   BACK TO TOP BUTTON
====================================== */

const toTopBtn = document.createElement("div");
toTopBtn.id = "toTopBtn";
toTopBtn.textContent = "⬆";
document.body.appendChild(toTopBtn);

window.addEventListener("scroll", () => {
  if (window.scrollY > 600) {
    toTopBtn.classList.add("show");
  } else {
    toTopBtn.classList.remove("show");
  }
});

toTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});