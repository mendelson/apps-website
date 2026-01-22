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
   DROPDOWN
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

const APP_COL = {
  "Live Pace Speed Calculator": 2,
  "Live Predictor Premium": 6,
  "Live Time Predictor": 10,
  "Route Silhouette": 18,
  "Pacer Data Field": 14,
  "Solve for X": 22,
  "Time Across The Galaxy": 26,
  "Tracker Data Field": 30
};

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
      image: document.querySelector(`.card[data-name="${name}"] .thumb`)?.src
    };
  });

  /* Prevent duplicate featured apps */
  const used = new Set();
  const pick = list => list.find(app => !used.has(app.name));

  const byInstalls = [...apps].sort((a,b) => b.installs - a.installs);
  const byTotal    = [...apps].sort((a,b) => b.total - a.total);
  const byUsers    = [...apps].sort((a,b) => b.users - a.users);

  const popular    = pick(byInstalls); used.add(popular.name);
  const allTime    = pick(byTotal);    used.add(allTime.name);
  const loved      = pick(byUsers);    used.add(loved.name);

  const slides = [
    {
      title: "🔥 Popular This Week",
      desc: "The fastest-growing app right now among athletes.",
      app: popular
    },
    {
      title: "⭐ All-Time Favorite",
      desc: "The most downloaded app of the entire collection.",
      app: allTime
    },
    {
      title: "👥 Loved by Its Athletes",
      desc: "Athletes who use it tend to stick with it.",
      app: loved
    }
  ];

  const track = document.querySelector(".carousel-track");
  const indicators = document.querySelector(".carousel-indicators");

  track.innerHTML = "";
  indicators.innerHTML = "";

  slides.forEach((slide, i) => {
    track.innerHTML += `
      <div class="carousel-slide">
        <h3>${slide.title}</h3>
        <img src="${slide.app.image}">
        <h4>${slide.app.name}</h4>
        <p>${slide.desc}</p>
        <a class="button" data-target="${slide.app.name}">View App</a>
      </div>
    `;

    indicators.innerHTML += `
      <span data-index="${i}" class="${i === 0 ? "active" : ""}"></span>
    `;
  });

  let current = 0;
  const totalSlides = slides.length;

  const update = () => {
    const w = document.querySelector(".carousel").offsetWidth;
    track.style.transform = `translateX(-${current * w}px)`;
    indicators.querySelectorAll("span").forEach((dot, idx) =>
      dot.classList.toggle("active", idx === current)
    );
  };

  /* Auto rotate 5s */
  let auto = setInterval(() => {
    current = (current + 1) % totalSlides;
    update();
  }, 5000);

  const carousel = document.querySelector(".carousel");

  carousel.addEventListener("mouseenter", () => clearInterval(auto));
  carousel.addEventListener("mouseleave", () => {
    auto = setInterval(() => {
      current = (current + 1) % totalSlides;
      update();
    }, 5000);
  });

  indicators.addEventListener("click", e => {
    if (e.target.dataset.index) {
      current = parseInt(e.target.dataset.index);
      update();
    }
  });

  /* Swipe gestures */
  let start = 0;
  let dragging = false;

  track.addEventListener("touchstart", e => {
    clearInterval(auto);
    start = e.touches[0].clientX;
    dragging = true;
  });

  track.addEventListener("touchmove", e => {
    if (!dragging) return;
    const dx = e.touches[0].clientX - start;
    track.style.transition = "none";
    track.style.transform =
      `translateX(calc(-${current * 100}% + ${dx}px))`;
  });

  track.addEventListener("touchend", e => {
    dragging = false;
    track.style.transition = "transform 0.6s ease";

    const dx = e.changedTouches[0].clientX - start;

    if (dx > 60) current = Math.max(0, current - 1);
    if (dx < -60) current = Math.min(totalSlides - 1, current + 1);

    update();

    auto = setInterval(() => {
      current = (current + 1) % totalSlides;
      update();
    }, 5000);
  });

  /* CTA scroll to card */
  track.querySelectorAll(".button").forEach(btn => {
    btn.addEventListener("click", () => {
      const name = btn.dataset.target;
      const card = document.querySelector(`.card[data-name="${name}"]`);
      if (!card) return;

      const y = card.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: "smooth" });

      card.classList.add("highlight");
      setTimeout(() => card.classList.remove("highlight"), 2000);
    });
  });

  window.addEventListener("resize", update);
  update();
}

/* ======================
   MOMENTUM TAGS + TOOLTIP
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

    document.querySelectorAll(".card").forEach(card => {
      const name = card.dataset.name;
      const col = APP_COL[name];
      if (col == null) return;

      const total = metrics.total[col];
      const inst  = metrics.installs[col];
      const user  = metrics.users[col];

      const tag = card.querySelector(".momentum-tag");
      const tip = card.querySelector(".tooltip");

      let label = "";
      let text = "";

      if (inst >= 50) {
        label = "Trending Hot 🔥";
        tag.classList.add("momentum-hot");
        text = "A lot of athletes discovered this app recently.";
      } else if (inst >= 10) {
        label = "Trending Up 🚀";
        tag.classList.add("momentum-strong");
        text = "Growing fast — more athletes are choosing this app every day.";
      } else if (inst >= 1) {
        label = "Getting Attention 👀";
        tag.classList.add("momentum-positive");
        text = "A rising pick among athletes this week.";
      } else return;

      tag.innerHTML = `${label} <span>ⓘ</span>`;
      tag.classList.remove("hidden");

      let stats = "<strong>📊 App Metrics</strong><br>";
      if (total >= 7) stats += `• Downloads: ${total}<br>`;
      if (inst  >= 7) stats += `• Installs (7d): ${inst}<br>`;
      if (user  >= 7) stats += `• Users (7d): ${user}<br>`;
      stats += `<br>${text}`;

      tip.innerHTML = stats;

      tag.addEventListener("click", e => {
        e.stopPropagation();
        document.querySelectorAll(".tooltip")
          .forEach(t => t !== tip && t.classList.add("hidden"));
        tip.classList.toggle("hidden");
      });
    });

    /* Close tooltip outside */
    document.addEventListener("click", () => {
      document.querySelectorAll(".tooltip").forEach(t => t.classList.add("hidden"));
    });

    buildFeaturedCarousel(metrics);

  } catch (err) {
    console.error("Metrics load failed:", err);
  }
}

/* ======================
   BACK TO TOP BUTTON
====================== */
function initBackToTop() {
  const btn = document.createElement("div");
  btn.id = "backToTop";
  btn.innerHTML = "⬆";
  document.body.appendChild(btn);

  window.addEventListener("scroll", () => {
    btn.classList.toggle("show", window.scrollY > 400);
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ======================
   INIT
====================== */
document.addEventListener("DOMContentLoaded", () => {
  loadMetrics();
  initBackToTop();
});
