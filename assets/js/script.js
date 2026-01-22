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
  trending: {
    title: "🔥 Trending This Week",
    message: "Many athletes have chosen this app recently, making it one of the most active picks this week.",
    note: "Based on fresh weekly installs."
  },
  popular: {
    title: "🏆 Popular and Widely Used",
    message: "This app has a large long-term audience and strong weekly usage among athletes.",
    note: "Reflects both total installs and active athletes."
  },
  consistent: {
    title: "💪 Consistently Used by Athletes",
    message: "Athletes rely on this app regularly, showing steady weekly usage.",
    note: "Retention-focused insight."
  },
  discovered: {
    title: "📈 Newly Discovered by Athletes",
    message: "A solid number of new athletes have discovered this app recently.",
    note: "Based on recent installs."
  },
  trusted: {
    title: "👍 Trusted by a Core Group",
    message: "A reliable group of athletes keeps using this app week after week.",
    note: "Stable usage over time."
  },
  niche: {
    title: "✨ New or Niche App",
    message: "This app serves a smaller audience or is still new on the platform.",
    note: "Focused or early-stage usage pattern."
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
      let level = null;

if (installs >= 50) {
  level = "trending";
  tag.innerHTML = `🔥 Trending This Week <span class="info-icon">ⓘ</span>`;
  tag.classList.add("momentum-hot");

} else if (total >= 100 && users >= 20) {
  level = "popular";
  tag.innerHTML = `🏆 Popular and Widely Used <span class="info-icon">ⓘ</span>`;
  tag.classList.add("momentum-strong");

} else if (users >= 10) {
  level = "consistent";
  tag.innerHTML = `💪 Consistently Used <span class="info-icon">ⓘ</span>`;
  tag.classList.add("momentum-positive");

} else if (installs >= 10) {
  level = "discovered";
  tag.innerHTML = `📈 Newly Discovered <span class="info-icon">ⓘ</span>`;
  tag.classList.add("momentum-positive");

} else if (users >= 3) {
  level = "trusted";
  tag.innerHTML = `👍 Trusted by Athletes <span class="info-icon">ⓘ</span>`;
  tag.classList.add("momentum-positive");

} else {
  level = "niche";
  tag.innerHTML = `✨ Niche App <span class="info-icon">ⓘ</span>`;
  tag.classList.add("momentum-positive");
}

tip.dataset.level = level;
tag.classList.remove("hidden");

      /* === Tooltip content (stats ≥ 7 only) === */
      const tipLevel = tip.dataset.level;
      let stats = "";

      if (total >= 7) stats += `<div>Downloads: <strong>${total}</strong></div>`;
      if (installs >= 7) stats += `<div>Installs (week): <strong>${installs}</strong></div>`;
      if (users >= 7) stats += `<div>Active users: <strong>${users}</strong></div>`;

      const tt = TOOLTIP_TEXT[tipLevel];

tip.innerHTML = `
  <div class="tip-title">${tt.title}</div>
  <div class="tip-message">${tt.message}</div>

  <div class="tip-metrics">
    ${total    >= 7 ? `<div><span>Total Downloads:</span> <strong>${total}</strong></div>` : ""}
    ${installs >= 7 ? `<div><span>Installs (7 days):</span> <strong>${installs}</strong></div>` : ""}
    ${users    >= 7 ? `<div><span>Active Users:</span> <strong>${users}</strong></div>` : ""}
  </div>

  <div class="tip-note">${tt.note}</div>
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
  document.querySelectorAll(".card-badge").forEach(b => b.remove());
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

  /* ============================================
   FEATURED BADGES (only for the 3 picks)
  ============================================ */

  const badgeMap = [
    { emoji: "🔥", word: "Trending",  class: "trending" },
{ emoji: "🏆", word: "Popular",   class: "popular" },
{ emoji: "💪", word: "Consistent", class: "consistent" }
  ];

  picks.forEach((card, i) => {
    if (!card) return;

    let badge = card.querySelector(".card-badge");
    if (!badge) {
      badge = document.createElement("div");
      badge.className = `card-badge ${badgeMap[i].class}`;
      badge.textContent = `${badgeMap[i].emoji} ${badgeMap[i].word}`;
      card.appendChild(badge);
    }
  });

  const labels = [
    "🔥 Popular This Week",
    "🏆 All-Time Favorite",
    "💪 Athletes keep using it"
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

    if (dx > 60) {
      index = (index - 1 + picks.length) % picks.length;  // ciclo para trás
    } else if (dx < -60) {
      index = (index + 1) % picks.length;                 // ciclo para frente
    }

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

/* ==========================================================
   ADVANCED TRACKING – Motionforge
========================================================== */

/* ========== 1. TRACK: Search input ========== */
document.getElementById("search").addEventListener("input", e => {
  gtag("event", "search", {
    search_term: e.target.value
  });
});

/* ========== 2. TRACK: Click on app cards ========== */
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    gtag("event", "card_click", {
      app_name: card.dataset.name
    });
  });
});

/* ========== 3. TRACK: Click on CIQ badges ========== */
document.querySelectorAll(".ciq-badge").forEach(badge => {
  badge.addEventListener("click", e => {
    const card = e.target.closest(".card");
    gtag("event", "ciq_click", {
      app_name: card?.dataset.name || "unknown",
      ciq_url: badge.href
    });
  });
});

/* ========== 4. TRACK: Click on Version links (improved) ========== */
document.querySelectorAll(".versions .dropdown a").forEach(link => {
  link.addEventListener("click", () => {
    const card = link.closest(".card");
    const appName = card?.dataset.name || "unknown";
    const versionName = link.textContent.trim();
    const versionUrl = link.href;

    gtag("event", "app_version_click", {
      app_name: appName,
      version_name: versionName,
      url: versionUrl
    });
  });
});

/* ========== 5. TRACK: Click on Tooltip icon ========== */
document.querySelectorAll(".momentum-tag").forEach(tag => {
  tag.addEventListener("click", () => {
    const card = tag.closest(".card");
    gtag("event", "tooltip_open", {
      app_name: card?.dataset.name || "unknown"
    });
  });
});

/* ========== 6. TRACK: Click on Contact button ========== */
document.getElementById("emailBtn").addEventListener("click", () => {
  gtag("event", "contact_click", {
    method: "email_button"
  });
});

/* ========== 7. TRACK: Scroll depth tracking ========== */
let scrollTracked = false;
window.addEventListener("scroll", () => {
  if (!scrollTracked && window.scrollY > 1200) {
    scrollTracked = true;
    gtag("event", "scroll_depth", {
      depth: "50%"
    });
  }
});

/* ========== 8. TRACK: Featured carousel interactions ========== */
document.querySelectorAll(".featured-cta").forEach(btn => {
  btn.addEventListener("click", () => {
    gtag("event", "featured_cta_click", {
      card_title: btn.closest(".featured-card-preview").querySelector("h3")?.textContent
    });
  });
});

/* ========== TRACK: Time viewing each card ========== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const card = entry.target;
    const appName = card.dataset.name;

    if (entry.isIntersecting) {
      card._viewStart = performance.now();
    } else if (card._viewStart) {
      const time = performance.now() - card._viewStart;
      gtag("event", "card_view_time", {
        app_name: appName,
        milliseconds: Math.round(time)
      });
      card._viewStart = null;
    }
  });
}, { threshold: 0.6 });

document.querySelectorAll(".card").forEach(card => observer.observe(card));

/* ========== TRACK: Featured carousel impressions ========== */
const carouselSlides = document.querySelectorAll(".carousel-slide");
carouselSlides.forEach((slide, index) => {
  slide._visible = false;
});

let carouselObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const title = entry.target.querySelector("h3")?.textContent || "unknown";

      if (!entry.target._visible) {
        entry.target._visible = true;
        gtag("event", "featured_slide_view", {
          slide_title: title
        });
      }
    } else {
      entry.target._visible = false;
    }
  });
}, { threshold: 0.7 });

carouselSlides.forEach(slide => carouselObserver.observe(slide));

/* ========== TRACK: Returning users (D1, D3, D7) ========== */
const lastVisit = localStorage.getItem("mf_last_visit");
const now = Date.now();

if (lastVisit) {
  const days = Math.floor((now - Number(lastVisit)) / (1000 * 60 * 60 * 24));

  if (days === 1) gtag("event", "return_d1");
  if (days === 3) gtag("event", "return_d3");
  if (days === 7) gtag("event", "return_d7");
}

localStorage.setItem("mf_last_visit", now.toString());

/* ========== TRACK: Traffic source enrichment ========== */
gtag("event", "page_source_detail", {
  referrer: document.referrer || "direct",
  utm_source: new URLSearchParams(location.search).get("utm_source") || null,
  utm_campaign: new URLSearchParams(location.search).get("utm_campaign") || null,
  utm_medium: new URLSearchParams(location.search).get("utm_medium") || null
});

/* ========== TRACK: Search → Click connection ========== */
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    const searchTerm = document.getElementById("search").value.trim();
    if (searchTerm) {
      gtag("event", "search_result_click", {
        app_name: card.dataset.name,
        search_term: searchTerm
      });
    }
  });
});
