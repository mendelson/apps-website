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
      image: document.querySelector(`.card[data-name="${name}"] img`)?.src,
      url: name
    };
  });

  /* Avoid duplicates */
  const used = new Set();
  const pick = sortedList => {
    for (const app of sortedList) {
      if (!used.has(app.name)) {
        used.add(app.name);
        return app;
      }
    }
    return null;
  };

  /* Rankings */
  const byInstalls = [...apps].sort((a,b) => b.installs - a.installs);
  const byTotal    = [...apps].sort((a,b) => b.total - a.total);
  const byUsers    = [...apps].sort((a,b) => b.users - a.users);

  const popularThisWeek = pick(byInstalls);
  const allTimeFavorite = pick(byTotal);
  const lovedAthletes   = pick(byUsers);

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
      app: lovedAthletes
    }
  ];

  const track = document.querySelector(".carousel-track");
  const indicators = document.querySelector(".carousel-indicators");

  track.innerHTML = "";
  indicators.innerHTML = "";

  slides.forEach((slide, i) => {
    if (!slide.app) return;

    track.innerHTML += `
      <div class="carousel-slide">
        <h3>${slide.title}</h3>
        <img src="${slide.app.image}" alt="${slide.app.name}">
        <h4>${slide.app.name}</h4>
        <p>${slide.desc}</p>
        <a class="button" data-target="${slide.app.name}">View App</a>
      </div>
    `;

    indicators.innerHTML += `
      <span data-index="${i}" class="${i === 0 ? 'active' : ''}"></span>
    `;
  });

  let current = 0;
  const totalSlides = slides.length;

  const updateCarousel = () => {
    const width = document.querySelector(".carousel").offsetWidth;
    track.style.transform = `translateX(-${current * width}px)`;
    indicators.querySelectorAll("span").forEach((dot, idx) => {
      dot.classList.toggle("active", idx === current);
    });
  };

  /* Auto rotate 5s */
  let auto = setInterval(() => {
    current = (current + 1) % totalSlides;
    updateCarousel();
  }, 5000);

  /* Pause on hover */
  const carousel = document.querySelector(".carousel");

  carousel.addEventListener("mouseenter", () => clearInterval(auto));
  carousel.addEventListener("mouseleave", () => {
    auto = setInterval(() => {
      current = (current + 1) % totalSlides;
      updateCarousel();
    }, 5000);
  });

  /* Indicator click */
  indicators.addEventListener("click", e => {
    if (e.target.dataset.index) {
      current = parseInt(e.target.dataset.index);
      updateCarousel();
    }
  });

  /* SWIPE */
  let startX = 0;
  let dragging = false;

  track.addEventListener("touchstart", e => {
    clearInterval(auto);
    startX = e.touches[0].clientX;
    dragging = true;
  });

  track.addEventListener("touchmove", e => {
    if (!dragging) return;
    const dx = e.touches[0].clientX - startX;
    track.style.transition = "none";
    track.style.transform =
      `translateX(calc(-${current * 100}% + ${dx}px))`;
  });

  track.addEventListener("touchend", e => {
    const dx = e.changedTouches[0].clientX - startX;
    dragging = false;

    track.style.transition = "transform 0.6s ease";

    if (dx > 60) current = Math.max(0, current - 1);
    if (dx < -60) current = Math.min(totalSlides - 1, current + 1);

    updateCarousel();

    auto = setInterval(() => {
      current = (current + 1) % totalSlides;
      updateCarousel();
    }, 5000);
  });

  /* CTA scroll-to-card */
  track.querySelectorAll(".button").forEach(btn => {
    btn.addEventListener("click", () => {
      const name = btn.dataset.target;
      const card = document.querySelector(`.card[data-name="${name}"]`);
      if (!card) return;

      const top = card.getBoundingClientRect().top + window.scrollY - 70;

      window.scrollTo({
        top,
        behavior: "smooth"
      });

      card.classList.add("highlight");
      setTimeout(() => card.classList.remove("highlight"), 1400);
    });
  });

  window.addEventListener("resize", updateCarousel);
  updateCarousel();
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

    /* Apply momentum tags */
    document.querySelectorAll('.card').forEach(card => {
      const name = card.dataset.name;
      const col = APP_COL[name];
      if (col === undefined) return;

      const total = metrics.total[col];
      const installs = metrics.installs[col];
      const users = metrics.users[col];

      const tag = card.querySelector(".momentum-tag");
      const tooltip = card.querySelector(".tooltip");

      let message = "";

      const html = label =>
        `${label} <span style="opacity:.7;margin-left:6px;">ⓘ</span>`;

      if (installs >= 50) {
        tag.innerHTML = html("Trending Hot 🔥");
        tag.classList.add("momentum-hot");
        message = "A lot of athletes discovered this app recently.";
      } 
      else if (installs >= 10) {
        tag.innerHTML = html("Trending Up 🚀");
        tag.classList.add("momentum-strong");
        message = "Growing fast — more athletes are choosing this app every day.";
      } 
      else if (installs >= 1) {
        tag.innerHTML = html("Getting Attention 👀");
        tag.classList.add("momentum-positive");
        message = "A rising pick among athletes this week.";
      } 
      else return;

      tag.classList.remove("hidden");

      let tipHtml = `<strong>📊 App Metrics</strong><br>`;
      if (total >= 7) tipHtml += `• Downloads: ${total}<br>`;
      if (installs >= 7) tipHtml += `• Installs (7d): ${installs}<br>`;
      if (users >= 7) tipHtml += `• Users (7d): ${users}<br>`;
      tipHtml += `<br>${message}`;

      tooltip.innerHTML = tipHtml;

      tag.addEventListener("click", e => {
        e.stopPropagation();
        document.querySelectorAll(".tooltip").forEach(t => {
          if (t !== tooltip) t.classList.add("hidden");
        });
        tooltip.classList.toggle("hidden");
      });
    });

    /* Close tooltips on outside click */
    document.addEventListener("click", () => {
      document.querySelectorAll(".tooltip").forEach(t => t.classList.add("hidden"));
    });

    /* Build Featured Carousel */
    buildFeaturedCarousel(metrics);

  } catch (err) {
    console.error("Failed to load metrics:", err);
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
    if (window.scrollY > 400) {
      btn.classList.add("show");
    } else {
      btn.classList.remove("show");
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/* ======================
   START EVERYTHING
====================== */

document.addEventListener("DOMContentLoaded", () => {
  loadMetrics();
  initBackToTop();
});
