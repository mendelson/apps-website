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

const TOOLTIP_TEXT = {
  high: "High adoption this week — many athletes are choosing this app.",
  medium: "Consistent growth this week — solid ongoing traction.",
  low: "A steady performer trusted by athletes each week."
};

/* ======================================
   LOAD METRICS + BUILD FEATURED
====================================== */

async function loadMetrics() {
  try {
    const res = await fetch(SHEET_URL);
    const text = await res.text();
    const json = JSON.parse(text.substring(47).slice(0, -2));
    const row = json.table.rows[0].c;

    document.querySelectorAll('.card').forEach(card => {
      const name = card.dataset.name;
      const mBox = card.querySelector('.metrics');
      const tag = card.querySelector('.momentum-tag');
      const tip = card.querySelector('.tooltip');

      if (!APP_METRICS[name]) return;

      const [tCol, iCol, uCol] = APP_METRICS[name];

      const total = row[tCol]?.v || 0;
      const installs = row[iCol]?.v || 0;
      const users = row[uCol]?.v || 0;

      // store for featured selection
      mBox.dataset.total = total;
      mBox.dataset.installs = installs;
      mBox.dataset.users = users;

      // hide raw numbers
      mBox.style.display = "none";

      // momentum logic
      if (installs >= 50) {
        tag.innerHTML = `🔥 Popular This Week <span class="info-icon">ⓘ</span>`;
        tag.classList.add("momentum-hot");
        tip.textContent = TOOLTIP_TEXT.high;
      } 
      else if (installs >= 10) {
        tag.innerHTML = `📈 Growing Fast <span class="info-icon">ⓘ</span>`;
        tag.classList.add("momentum-strong");
        tip.textContent = TOOLTIP_TEXT.medium;
      } 
      else if (installs >= 1) {
        tag.innerHTML = `👍 Trusted by Athletes <span class="info-icon">ⓘ</span>`;
        tag.classList.add("momentum-positive");
        tip.textContent = TOOLTIP_TEXT.low;
      } 
      else {
        return; // too low — omit completely
      }

      tag.classList.remove("hidden");

      tag.addEventListener("click", (e) => {
        e.stopPropagation();
        document.querySelectorAll(".tooltip").forEach(t => t.classList.add("hidden"));
        tip.classList.toggle("hidden");
      });
    });

    // clicking anywhere closes tooltips
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
   FEATURED CAROUSEL (Option A – Clean Slides)
====================================== */

function buildFeaturedCarousel() {
  const cards = [...document.querySelectorAll(".card")];

  const metric = (c, k) =>
    Number(c.querySelector(".metrics").dataset[k] || 0);

  // sorted lists
  const byInstalls = cards.slice().sort((a,b)=> metric(b,"installs") - metric(a,"installs"));
  const byDownloads = cards.slice().sort((a,b)=> metric(b,"total") - metric(a,"total"));
  const byUsers = cards.slice().sort((a,b)=> metric(b,"users") - metric(a,"users"));

  // unique picks
  const picks = [];
  const pushUnique = app => {
    if (!picks.includes(app)) picks.push(app);
  };

  pushUnique(byInstalls[0]);
  pushUnique(byDownloads.find(c=>!picks.includes(c)));
  pushUnique(byUsers.find(c=>!picks.includes(c)));

  // labels
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
    const thumb = card.querySelector(".thumb").src;
    const title = card.querySelector("h3").textContent;
    const desc = card.querySelector("p").textContent;

    const slide = document.createElement("div");
    slide.className = "carousel-slide";
    slide.innerHTML = `
      <div class="featured-slide-content">
        <div class="featured-label">${labels[i]}</div>

        <div class="featured-card-preview">
          <img src="${thumb}">
          <h3>${title}</h3>
          <p>${desc}</p>
          <button class="featured-cta">See details</button>
        </div>
      </div>
    `;

    // CTA scroll/highlight (restored EXACT behavior)
    slide.querySelector(".featured-cta")
      .addEventListener("click", () => {
        card.scrollIntoView({ behavior: "smooth", block: "center" });
        card.classList.add("highlight");
        setTimeout(() => card.classList.remove("highlight"), 1700);
      });

    track.appendChild(slide);

    // indicators
    const dot = document.createElement("div");
    dot.className = "indicator";
    if (i === 0) dot.classList.add("active");
    dots.appendChild(dot);
    dot.addEventListener("click", () => goTo(i));
  });

  let index = 0;
  let interval = setInterval(() => move(+1), 5000);

  function goTo(i) {
    index = i;
    track.style.transform = `translateX(-${i*100}%)`;
    dots.querySelectorAll(".indicator").forEach((d,j)=> 
      d.classList.toggle("active", j===i)
    );
  }

  function move(dir) {
    index = (index + dir + picks.length) % picks.length;
    goTo(index);
  }

  // Pause on hover
  document.querySelector(".carousel").addEventListener("mouseenter", () => {
    clearInterval(interval);
  });
  document.querySelector(".carousel").addEventListener("mouseleave", () => {
    interval = setInterval(() => move(+1), 5000);
  });

  // Swipe
  let startX = 0;
  track.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });
  track.addEventListener("touchend", e => {
    let dx = e.changedTouches[0].clientX - startX;
    if (dx > 60) move(-1);
    if (dx < -60) move(+1);
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