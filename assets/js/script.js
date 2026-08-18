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
   PAYMENT: alternative method link (KiezelPay free trial, etc.)
========================================================== */
document.querySelectorAll(".pay-alt__link").forEach(link => {
  link.addEventListener("click", () => {
    const card = link.closest(".card");
    if (typeof gtag === "function") {
      gtag("event", "payment_method_click", {
        app_name: card?.dataset.name || "unknown",
        method: link.dataset.method || "alt",
        url: link.href
      });
    }
  });
});

/* ==========================================================
   PRELOADER 8 — medley swimmers race
   Vanilla port of the pen's jQuery logic: each lane swims the
   full medley (back → breast → fly → free), one pool length per
   stroke, alternating direction, with a random per-length speed
   scaled by lane "power". Loops for as long as the preloader is up.
========================================================== */
window.startSwimRace = function (container) {
  const STROKES = ["backstroke", "breaststroke", "butterfly", "free"];
  const ALL = ["ready", "win", "lose"].concat(STROKES);
  const POOL = 600;            // travel distance (px), as in the original
  const POWER = [1.5, 1.2, 1.7, 1.8];

  container.querySelectorAll(".swimmer").forEach((sw, i) => {
    const pow = POWER[i % POWER.length];
    let leg = 0;
    let x = 0;
    sw.style.transform = "translateX(0px)";

    function swim() {
      const pre = document.getElementById("preloader");
      if (!sw.isConnected || (pre && pre.classList.contains("hide"))) return;

      sw.classList.remove.apply(sw.classList, ALL);
      sw.classList.add(STROKES[leg % STROKES.length]);

      const target = leg % 2 === 0 ? POOL : 0;
      const speed = Math.floor((Math.random() * 1000) / pow) + 2000;

      const anim = sw.animate(
        [{ transform: "translateX(" + x + "px)" }, { transform: "translateX(" + target + "px)" }],
        { duration: speed, easing: "linear", fill: "forwards" }
      );
      anim.onfinish = () => {
        x = target;
        sw.style.transform = "translateX(" + target + "px)";
        leg++;
        swim();
      };
    }

    swim();
  });
};

/* ==========================================================
   EXTERNAL LINKS → NEW TAB
   Genuinely external links (Garmin store, socials, …) open in a new tab.
   Navigation *within* the family (mmendelson.com / apps / run — the header
   and footer Home/Apps/Run switchers, the Run-aggregator link) must stay in
   the same tab, so those are skipped.
========================================================== */
const FAMILY_HOST = /(^|\.)mmendelson\.com$/i;
function initExternalLinks() {
  document.querySelectorAll("a[href]").forEach(a => {
    const h = a.getAttribute("href");
    if (!h || h.startsWith("#") || h.startsWith("mailto:") || h.startsWith("tel:")) return;
    if (/^https?:\/\//i.test(h)) {
      let host;
      try { host = new URL(h, location.href).hostname; } catch (e) { host = ""; }
      if (FAMILY_HOST.test(host)) return; // same-tab navigation between the three sites
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
    }
  });
}

const CAROUSEL_AUTOPLAY_MS = 6500;
const CAROUSEL_RESUME_AFTER_INTERACTION_MS = 4200;

function scrollToAppCard(card) {
  if (!card) return;
  card.scrollIntoView({ behavior: "smooth", block: "center" });
  card.classList.add("highlight");
  setTimeout(() => card.classList.remove("highlight"), 1700);
}

function escapeHtml(text) {
  const d = document.createElement("div");
  d.textContent = text;
  return d.innerHTML;
}

/**
 * Parse sheet `app_age` strings like "1 years, 4 months, 19 days" → approximate total days.
 * Must match the wording your spreadsheet uses (English plural/singular).
 */
function appAgeStringToApproxDays(ageStr) {
  const s = String(ageStr || "");
  const yMatch = /\b(\d+)\s*years?\b/i.exec(s);
  const mMatch = /\b(\d+)\s*months?\b/i.exec(s);
  const dMatch = /\b(\d+)\s*days?\b/i.exec(s);
  const y = yMatch ? Number(yMatch[1]) : 0;
  const mo = mMatch ? Number(mMatch[1]) : 0;
  const d = dMatch ? Number(dMatch[1]) : 0;
  return y * 365 + mo * 30 + d;
}

/** Sheet formula error in a text field copied to JSON. */
function isApiTextError(s) {
  const t = String(s || "").trim();
  return t.length > 0 && /^#/.test(t);
}

/**
 * Featured carousel “newcomer” slot: youngest by `app_age` (prefer API `app_age_approx_days` from Apps Script).
 * launch_date is not used. Ties on age → higher weekly installs, then higher total downloads.
 */
function getApproxDaysFromApi(api) {
  if (!api) return null;
  if (
    typeof api.app_age_approx_days === "number" &&
    Number.isFinite(api.app_age_approx_days)
  ) {
    return api.app_age_approx_days;
  }
  const raw = String(api.app_age || "").trim();
  if (!raw || isApiTextError(raw)) return null;
  const approx = appAgeStringToApproxDays(raw);
  if (!Number.isFinite(approx) || approx < 0) return null;
  return approx;
}

function getYoungestAppCardByAge(cards, data) {
  let best = null;
  let bestApprox = Infinity;
  let bestInstalls = -1;
  let bestTotal = -1;

  for (const card of cards) {
    const api = data[card.dataset.name];
    if (!api) continue;
    const approx = getApproxDaysFromApi(api);
    if (approx === null) continue;

    const ins = Number(api.installs_7_days) || 0;
    const tot = Number(api.total_downloads) || 0;

    const better =
      approx < bestApprox ||
      (approx === bestApprox &&
        (ins > bestInstalls || (ins === bestInstalls && tot > bestTotal)));

    if (better) {
      bestApprox = approx;
      best = card;
      bestInstalls = ins;
      bestTotal = tot;
    }
  }
  return best;
}

/* A card's category is decided by the authored section it lives in, used to
   pair the all-time favorite with the top app of the OTHER category. */
const categoryOf = c =>
  c.closest("#watch-faces") ? "watch" :
  c.closest("#data-fields") ? "data" : null;

/* A card is "paid" if it advertises a free trial and/or the premium
   (Garmin Pay) purchase path — these are the apps we merchandise first.
   Module scope on purpose: the section ranker and the featured carousel must
   agree on what "paid" means, so there is exactly one definition of it. */
const isPaid = c =>
  !!c.querySelector('.badge-slot .trial, .pay-alt, [data-method="garmin-pay"]');

document.addEventListener("DOMContentLoaded", () => {
  initExternalLinks();
});

/* ==========================================================
   METRICS CONFIG
   (now empty — replaced by API)
========================================================== */



/* ==========================================================
   TOOLTIP TEXT
========================================================== */

/* Momentum-tag thresholds (weekly installs, all-time downloads, weekly users).
   Named so they are easy to calibrate; the trending floor is shared with the
   featured carousel so "🔥 Trending" means the same thing in both places. */
const MOMENTUM_TRENDING_INSTALLS = 50;  // 🔥 weekly installs
const MOMENTUM_POPULAR_TOTAL     = 500; // 🏆 all-time downloads that earn "popular" on their own
const MOMENTUM_ACTIVE_USERS      = 10;  // 💪 weekly active users
const MOMENTUM_GROWING_INSTALLS  = 10;  // 📈 weekly installs

const MOMENTUM_LEVELS = {
  trending:   { fallback: "🔥 Trending This Week",       cls: "momentum-hot" },
  popular:    { fallback: "🏆 Popular and Widely Used",  cls: "momentum-strong" },
  consistent: { fallback: "💪 Actively Used",            cls: "momentum-positive" },
  discovered: { fallback: "📈 Newly Discovered",         cls: "momentum-positive" }
};

const TOOLTIP_TEXT = window.TOOLTIP_TEXT || {
  trending: {
    title: "🔥 Trending This Week",
    message: "One of the most installed apps over the last 7 days.",
    note: "Based on fresh weekly installs."
  },
  popular: {
    title: "🏆 Popular and Widely Used",
    message: "A large all-time audience with solid weekly usage among athletes.",
    note: "Based on total downloads and weekly active users."
  },
  consistent: {
    title: "💪 Actively Used",
    message: "A solid group of athletes is using this app this week.",
    note: "Based on active users over the last 7 days."
  },
  discovered: {
    title: "📈 Newly Discovered",
    message: "Picking up new installs over the last 7 days.",
    note: "Based on recent installs."
  }
};

/* ==========================================================
   SECTION RANKING
   ==========================================================
   Cards inside a section are ranked by a composite score rather than by
   all-time downloads alone.

   `total_downloads` is a cumulative counter, so ranking on it freezes the
   order — an app that led a year ago leads forever — and it systematically
   sinks paid apps, which are downloaded far less than free ones by
   construction. Together those put the site's highest weekly-install app (a
   15-day-old paid watch face, 47 installs/week) BELOW two free apps with zero
   weekly installs, while the featured carousel directly above it was
   deliberately leading with paid. The two halves of the page disagreed.

   Every signal is normalised to 0..1 across the cards being ranked BEFORE the
   weights apply. That is not cosmetic: raw totals span thousands and weekly
   installs span tens, so an unnormalised weighted sum is just the totals sort
   wearing a hat. */
const RANK_WEIGHTS = {
  momentum:    0.35,  // weekly installs — the only signal that moves week to week
  credibility: 0.20,  // all-time size, log-compressed
  engagement:  0.15,  // weekly users per download (stickiness, not raw size)
  recency:     0.15,  // decays to 0 over MAX_NEW_AGE_DAYS
  paid:        0.15   // the commercial thumb on the scale, explicit and tunable
};

/* Sample floor for RATIO signals only. A 2-download app with 2 weekly users
   scores a perfect 1.00 on engagement and outranks everything on a sample of
   two — that is noise, not stickiness. Age is a direct measurement rather than
   a ratio, so `recency` is deliberately NOT gated: a genuinely new app has few
   downloads by definition, and gating it would disable the signal for exactly
   the apps it exists to surface. */
const MIN_CREDIBLE_TOTAL = 25;

/**
 * Rank one section's cards in place by composite score.
 * Reads the metrics already stamped onto each card's `.metrics` dataset.
 */
function rankCardsInGrid(grid, data) {
  const cards = [...grid.querySelectorAll(":scope > .card")];
  if (cards.length < 2) return;

  const metricOf = (c, k) => Number(c.querySelector(".metrics")?.dataset[k] || 0);

  /* Normalisation bases, floored at 1 so an all-zero section cannot divide by
     zero — it simply scores every card 0 and keeps the authored order. */
  const maxInstalls = Math.max(...cards.map(c => metricOf(c, "installs")), 1);
  const maxLogTotal = Math.max(...cards.map(c => Math.log1p(metricOf(c, "total"))), 1);

  const scored = cards.map((card, domIndex) => {
    const total    = metricOf(card, "total");
    const installs = metricOf(card, "installs");
    const users    = metricOf(card, "users");
    const ageDays  = getApproxDaysFromApi(data?.[card.dataset.name]);

    const momentum    = installs / maxInstalls;
    /* log1p, not the raw total: 2 -> 200 downloads is a real difference,
       2000 -> 2300 is not. Compressing the tail is what stops a legacy app
       sitting on top of its section permanently. */
    const credibility = Math.log1p(total) / maxLogTotal;
    const engagement  = total >= MIN_CREDIBLE_TOTAL
      ? Math.min(1, users / Math.max(total, 1))
      : 0;
    /* Same 90-day definition of "new" the carousel's ✨ badge uses, so the two
       surfaces cannot disagree about which apps are new. */
    const recency = ageDays !== null
      ? Math.max(0, 1 - ageDays / MAX_NEW_AGE_DAYS)
      : 0;

    const score =
      RANK_WEIGHTS.momentum    * momentum +
      RANK_WEIGHTS.credibility * credibility +
      RANK_WEIGHTS.engagement  * engagement +
      RANK_WEIGHTS.recency     * recency +
      RANK_WEIGHTS.paid        * (isPaid(card) ? 1 : 0);

    /* Quantised so day-to-day metric wobble does not reshuffle the shelf on
       every reload — visitors build a spatial memory of where an app sits. */
    return { card, domIndex, score: Math.round(score * 100) / 100 };
  });

  /* Ties fall back to the authored DOM order. That also makes a failed metrics
     fetch degrade cleanly: every score is equal, so the section renders exactly
     as authored instead of in an arbitrary order. */
  scored.sort((a, b) => b.score - a.score || a.domIndex - b.domIndex);

  /* CSS `order` rather than appendChild: no reflow thrash, and the DOM order is
     left as authored — which is what a crawler, a screen reader, and a visitor
     whose metrics fetch failed all read. */
  scored.forEach((entry, i) => { entry.card.style.order = String(i); });
}

/* ==========================================================
   LOAD METRICS + TOOLTIP FIX + FEATURED
========================================================== */

function loadMetrics() {
  window._mfMetricsPromise = (async function() {
    try {
      /* === Load from new API === */
      const apiUrl = "https://script.google.com/macros/s/AKfycbzgMu_lEW_1zrJjWZX8Sy9hPCojsaARKaitpz5_nBshTZOc8g5C6BHndlNyvFnX4aEb/exec";
      const data = await fetch(apiUrl).then(r => r.json());

      const allCards = [...document.querySelectorAll('.card')];

      allCards.forEach(card => {
        const name = card.dataset.name;
        const api = data[name];
        card.querySelector(".card-app-age")?.remove();
        if (!api) {
          return;
        }

        const total = Number(api.total_downloads) || 0;
        const installs = Number(api.installs_7_days) || 0;
        const users = Number(api.users_7_days) || 0;

        const metrics = card.querySelector('.metrics');
        const tag = card.querySelector(".momentum-tag");
        const tip = card.querySelector(".tooltip");

        metrics.dataset.total = String(total);
        metrics.dataset.installs = String(installs);
        metrics.dataset.users = String(users);

        metrics.style.display = "none"; // raw numbers hidden

        /* === MOMENTUM TAG ===
           Four honest tiers. Below the lowest floor the app shows no tag at
           all (no filler) — same philosophy as the featured carousel. Every
           tooltip line states only what the raw 7-day / all-time numbers show,
           with no retention/trend claims we can't back. */
        tag.classList.remove("momentum-hot", "momentum-strong", "momentum-positive");

        let level = null;
        if (installs >= MOMENTUM_TRENDING_INSTALLS) {
          level = "trending";
        } else if (total >= MOMENTUM_POPULAR_TOTAL || (total >= 100 && users >= 20)) {
          level = "popular";
        } else if (users >= MOMENTUM_ACTIVE_USERS) {
          level = "consistent";
        } else if (installs >= MOMENTUM_GROWING_INSTALLS) {
          level = "discovered";
        }

        if (!level) {
          tag.classList.add("hidden");
          tip.classList.add("hidden");
          return; // long-tail app: show no momentum tag at all
        }

        const _mt = window._T?.momentumTags || {};
        const meta = MOMENTUM_LEVELS[level];
        tag.innerHTML = `${_mt[level] || meta.fallback} <span class="info-icon">ⓘ</span>`;
        tag.classList.add(meta.cls);
        tag.classList.remove("hidden");
        tip.dataset.level = level;

        /* === Tooltip content (each stat shown only when ≥ 7) === */
        const tt = TOOLTIP_TEXT[level];

        tip.innerHTML = `
          <div class="tip-title">${tt.title}</div>
          <div class="tip-message">${tt.message}</div>

          <div class="tip-metrics">
            ${total    >= 7 ? `<div><span>${window._T?.metrics?.totalDownloads||"Total Downloads:"}</span> <strong>${total}</strong></div>` : ""}
            ${installs >= 7 ? `<div><span>${window._T?.metrics?.installs7d||"Installs (7 days):"}</span> <strong>${installs}</strong></div>` : ""}
            ${users    >= 7 ? `<div><span>${window._T?.metrics?.activeUsers||"Active Users (7 days):"}</span> <strong>${users}</strong></div>` : ""}
          </div>

          <div class="tip-note">${tt.note}</div>
        `;

        /* === Tooltip toggle === */
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

      /* Dynamic ordering inside each app section, by composite score (see
         RANK_WEIGHTS above). The section order itself — Data Fields before
         Watch Faces — stays authored: that is an editorial statement, not a
         metric. Only the cards within a section reflow as the stats change. */
      ["#data-fields .grid", "#watch-faces .grid"].forEach(sel => {
        const grid = document.querySelector(sel);
        if (grid) rankCardsInGrid(grid, data);
      });

      buildFeaturedCarousel(data);

    } catch (err) {
      console.warn("Failed to load metrics:", err);
    }
  })();
}

document.addEventListener("DOMContentLoaded", loadMetrics);

/* ==========================================================
   ADAPTIVE TOOLTIP POSITIONING
========================================================== */

function adaptTooltipPosition(tag, tip) {
  tip.style.top = "100%";
  tip.style.bottom = "auto";
  tip.style.transform = "translateX(-50%)";
  tip.style.marginTop = "8px";
  tip.style.setProperty("--arrow-dir", "up");
}

/* ==========================================================
   FEATURED CAROUSEL
========================================================== */

const MAX_FEATURED_SLIDES = 5;
/** "🔥 Trending" floor — shared with the momentum-tag threshold above. */
const MIN_TRENDING_INSTALLS = MOMENTUM_TRENDING_INSTALLS;
/** An app only earns the "✨ New" badge while it is at most this old (days). */
const MAX_NEW_AGE_DAYS = 90;

/** Badge + carousel headline per slide reason (reason = why this app was chosen). */
const FEATURED_REASON_COPY = window.FEATURED_REASON_COPY || {
  premium: {
    badge: { emoji: "💎", word: "Premium", class: "premium" },
    headline: "💎 Premium — free trial"
  },
  new: {
    badge: { emoji: "✨", word: "New", class: "fresh" },
    headline: "✨ Newly launched"
  },
  installs: {
    badge: { emoji: "🔥", word: "Trending", class: "trending" },
    headline: "🔥 Popular This Week"
  },
  total: {
    badge: { emoji: "🏆", word: "Popular", class: "popular" },
    headline: "🏆 All-Time Favorite"
  },
  users: {
    badge: { emoji: "💪", word: "Consistent", class: "consistent" },
    headline: "💪 Athletes keep using it"
  },
  spotlight: {
    badge: { emoji: "⭐", word: "Featured", class: "trending" },
    headline: "⭐ Strong weekly installs"
  },
  topDataField: {
    badge: { emoji: "📊", word: "Favorite", class: "popular" },
    headline: "📊 Favorite Data Field"
  },
  topWatchFace: {
    badge: { emoji: "⌚", word: "Favorite", class: "popular" },
    headline: "⌚ Favorite Watch Face"
  }
};

/**
 * Featured carousel: up to 4 slides, each a different `.card` (no duplicates).
 * First slide: app with the smallest parsed API `app_age` (youngest); launch_date is not used.
 */
function buildFeaturedCarousel(data) {
  document.querySelectorAll(".card-badge").forEach(b => b.remove());

  const cards = [...document.querySelectorAll(".card")];
  const get = (c, k) => Number(c.querySelector(".metrics")?.dataset[k] || 0);

  const byInstalls = cards.slice().sort((a, b) => get(b, "installs") - get(a, "installs"));
  const byTotal = cards.slice().sort((a, b) => get(b, "total") - get(a, "total"));

  /* Youngest app and its age in days, so "new" is only ever shown when true. */
  const newcomer =
    data && typeof data === "object"
      ? getYoungestAppCardByAge(cards, data)
      : null;
  const newcomerDays = newcomer
    ? getApproxDaysFromApi(data[newcomer.dataset.name])
    : null;

  /** @type {{ card: Element, reason: keyof typeof FEATURED_REASON_COPY }[]} */
  const entries = [];
  const hasCard = c => entries.some(e => e.card === c);
  const pushEntry = (card, reason) => {
    if (!card || hasCard(card) || entries.length >= MAX_FEATURED_SLIDES) return;
    entries.push({ card, reason });
  };

  /* Slots fill in priority order, and every badge is guaranteed truthful: a
     slot is skipped (never relabelled) when its claim no longer holds, so the
     carousel shrinks to as few as one slide rather than padding with filler. */

  /* 1. COMMERCIAL — lead with the strongest paid app (revenue first),
        ranked by total downloads among paid apps. */
  const topPaid = byTotal.find(isPaid);
  if (topPaid) pushEntry(topPaid, "premium");

  /* 2. ALL-TIME FAVORITE — only the genuine #1 by total downloads; if it is
        already featured above, skip rather than mislabel the runner-up. */
  if (byTotal[0] && !hasCard(byTotal[0])) pushEntry(byTotal[0], "total");

  /* 2b. OTHER-CATEGORY FAVORITE — pair the all-time favorite with the top app
        of the OTHER category so both categories are always represented: if the
        #1 is a watch face, feature the top data field, and vice-versa.
        Automatic from live totals; additive — never displaces a slot above. */
  const favoriteCard = byTotal[0];
  if (favoriteCard) {
    const favCat = categoryOf(favoriteCard);
    if (favCat === "watch") {
      pushEntry(byTotal.find(c => categoryOf(c) === "data"), "topDataField");
    } else if (favCat === "data") {
      pushEntry(byTotal.find(c => categoryOf(c) === "watch"), "topWatchFace");
    }
  }

  /* 3. TRENDING — the genuine #1 by weekly installs, and only once it clears
        the same floor as the "🔥 Trending" momentum tag. */
  if (
    byInstalls[0] &&
    !hasCard(byInstalls[0]) &&
    get(byInstalls[0], "installs") >= MIN_TRENDING_INSTALLS
  ) {
    pushEntry(byInstalls[0], "installs");
  }

  /* 4. NEW — the youngest app, only while it is genuinely recent. */
  if (newcomer && newcomerDays !== null && newcomerDays <= MAX_NEW_AGE_DAYS) {
    pushEntry(newcomer, "new");
  }

  if (entries.length === 0) return;

  const root = document.getElementById("featured-carousel");
  const carousel = root?.querySelector(".carousel");
  const track = root?.querySelector(".carousel-viewport .carousel-track") || root?.querySelector(".carousel-track");
  const dots = root?.querySelector(".carousel-indicators");
  const prevBtn = carousel?.querySelector(".carousel-prev");
  const nextBtn = carousel?.querySelector(".carousel-next");
  if (!root || !carousel || !track || !dots) return;

  entries.forEach(({ card, reason }) => {
    const copy = FEATURED_REASON_COPY[reason];
    const badge = document.createElement("div");
    badge.className = `card-badge ${copy.badge.class}`;
    badge.textContent = `${copy.badge.emoji} ${copy.badge.word}`;
    card.appendChild(badge);
  });

  track.innerHTML = "";
  dots.innerHTML = "";

  let index = 0;
  let dragging = false;
  let activePointerId = null;
  let startX = 0;
  let startY = 0;
  let dragDx = 0;
  let swipeBeganOnThumb = false;
  let suppressNextThumbClick = false;
  let carouselInView = true;
  let autoplayTimer = null;

  function goTo(i, animate = true) {
    const n = entries.length;
    index = ((i % n) + n) % n;
    track.style.transition = animate
      ? "transform 0.45s cubic-bezier(0.25, 0.1, 0.25, 1)"
      : "none";
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.querySelectorAll(".indicator").forEach((d, j) =>
      d.classList.toggle("active", j === index)
    );
  }

  function stopCarouselAutoplay() {
    if (autoplayTimer !== null) {
      clearTimeout(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function armCarouselAutoplay() {
    stopCarouselAutoplay();
    if (entries.length <= 1) return;

    const step = () => {
      if (entries.length <= 1) return;
      if (dragging || !carouselInView || document.visibilityState !== "visible") {
        autoplayTimer = setTimeout(step, 400);
        return;
      }
      goTo(index + 1);
      autoplayTimer = setTimeout(step, CAROUSEL_AUTOPLAY_MS);
    };

    autoplayTimer = setTimeout(step, CAROUSEL_AUTOPLAY_MS);
  }

  function resumeCarouselAfterUserGesture() {
    stopCarouselAutoplay();
    if (entries.length <= 1) return;
    autoplayTimer = setTimeout(() => {
      autoplayTimer = null;
      armCarouselAutoplay();
    }, CAROUSEL_RESUME_AFTER_INTERACTION_MS);
  }

  entries.forEach(({ card, reason }, i) => {
    const headline = FEATURED_REASON_COPY[reason].headline;
    const img = card.querySelector(".thumb")?.src || "";
    const title = card.querySelector("h3")?.textContent || "";
    const desc = card.querySelector("p")?.textContent || "";
    const safeTitle = escapeHtml(title);
    const safeDesc = escapeHtml(desc);
    const _viewTpl = (window._T?.viewApp) || "View {title}";
    const ariaLabel = _viewTpl.replace("{title}", title);

    const slide = document.createElement("div");
    slide.className = "carousel-slide";
    slide.innerHTML = `
      <div class="featured-slide-content">
        <div class="featured-label">${headline}</div>
        <div class="featured-card-preview">
          <button type="button" class="featured-thumb" aria-label="">
            <img alt="" width="300" height="300" decoding="async" loading="lazy">
          </button>
          <h3>${safeTitle}</h3>
          <p>${safeDesc}</p>
          <button type="button" class="featured-cta">${window._T?.seeDetails||"See details"}</button>
        </div>
      </div>
    `;

    const thumbBtn = slide.querySelector(".featured-thumb");
    const thumbImg = thumbBtn.querySelector("img");
    thumbImg.src = img;
    thumbBtn.setAttribute("aria-label", ariaLabel);

    slide._featuredLinkedCard = card;
    thumbBtn.addEventListener("click", e => {
      if (suppressNextThumbClick) {
        e.preventDefault();
        e.stopPropagation();
        suppressNextThumbClick = false;
        return;
      }
      scrollToAppCard(card);
    });
    slide.querySelector(".featured-cta").addEventListener("click", () =>
      scrollToAppCard(card)
    );

    track.appendChild(slide);

    const dot = document.createElement("div");
    dot.className = "indicator" + (i === 0 ? " active" : "");
    dot.setAttribute("role", "button");
    dot.tabIndex = 0;
    const _slideOfTpl = (window._T?.slideOf) || "Show slide {n} of {total}";
    dot.setAttribute("aria-label", _slideOfTpl.replace("{n}", String(i + 1)).replace("{total}", String(entries.length)));
    dot.addEventListener("click", () => {
      stopCarouselAutoplay();
      goTo(i);
      resumeCarouselAfterUserGesture();
    });
    dot.addEventListener("keydown", e => {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      stopCarouselAutoplay();
      goTo(i);
      resumeCarouselAfterUserGesture();
    });
    dots.appendChild(dot);
  });

  function navGo(delta) {
    stopCarouselAutoplay();
    goTo(index + delta);
    resumeCarouselAfterUserGesture();
  }

  prevBtn?.addEventListener("click", () => navGo(-1));
  nextBtn?.addEventListener("click", () => navGo(1));

  const CAROUSEL_TAP_SLOP_PX = 22;

  function endPointerDrag(e) {
    if (e.pointerId !== activePointerId) return;
    try {
      track.releasePointerCapture(activePointerId);
    } catch (_) {}
    activePointerId = null;
    const dx = dragDx;
    const dy = e.clientY - startY;
    const beganOnThumb = swipeBeganOnThumb;
    swipeBeganOnThumb = false;
    dragging = false;
    track.style.transition =
      "transform 0.45s cubic-bezier(0.25, 0.1, 0.25, 1)";

    const isTap =
      beganOnThumb &&
      Math.abs(dx) < CAROUSEL_TAP_SLOP_PX &&
      Math.abs(dy) < CAROUSEL_TAP_SLOP_PX;

    if (isTap) {
      const slide = track.children[index];
      const linked = slide?._featuredLinkedCard;
      if (linked) {
        suppressNextThumbClick = true;
        scrollToAppCard(linked);
        setTimeout(() => {
          suppressNextThumbClick = false;
        }, 400);
      }
      goTo(index);
    } else if (dx > 60) goTo(index - 1);
    else if (dx < -60) goTo(index + 1);
    else goTo(index);

    dragDx = 0;
    resumeCarouselAfterUserGesture();
  }

  function onDocumentPointerEnd(e) {
    if (!dragging || activePointerId === null) return;
    if (e.pointerId !== activePointerId) return;
    endPointerDrag(e);
  }

  document.addEventListener("pointerup", onDocumentPointerEnd, true);
  document.addEventListener("pointercancel", onDocumentPointerEnd, true);

  track.addEventListener("pointerdown", e => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    if (e.target.closest(".featured-cta")) return;
    activePointerId = e.pointerId;
    dragging = true;
    dragDx = 0;
    startX = e.clientX;
    startY = e.clientY;
    swipeBeganOnThumb = !!e.target.closest(".featured-thumb");
    stopCarouselAutoplay();
    track.style.transition = "none";
    try {
      track.setPointerCapture(e.pointerId);
    } catch (_) {}
  });

  track.addEventListener("pointermove", e => {
    if (e.pointerId !== activePointerId || !dragging) return;
    dragDx = e.clientX - startX;
    track.style.transform = `translateX(calc(${-index * 100}% + ${dragDx}px))`;
  });

  track.addEventListener("pointerup", endPointerDrag);
  track.addEventListener("pointercancel", endPointerDrag);
  track.addEventListener("lostpointercapture", e => {
    if (dragging && e.pointerId === activePointerId) endPointerDrag(e);
  });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") stopCarouselAutoplay();
    else resumeCarouselAfterUserGesture();
  });

  const io = new IntersectionObserver(
    ioEntries => {
      const en = ioEntries[0];
      carouselInView = !!(en && en.isIntersecting);
      if (!carouselInView) stopCarouselAutoplay();
      else resumeCarouselAfterUserGesture();
    },
    { threshold: 0, rootMargin: "80px 0px 80px 0px" }
  );
  io.observe(root);

  goTo(0, false);
  requestAnimationFrame(() => {
    armCarouselAutoplay();
  });

  entries.forEach((_, si) => {
    const slide = track.children[si];
    if (!slide) return;
    slide._featuredVisible = false;
    const slideIo = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const title = entry.target.querySelector("h3")?.textContent || "unknown";
          if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
            if (!entry.target._featuredVisible) {
              entry.target._featuredVisible = true;
              if (typeof gtag === "function") {
                gtag("event", "featured_slide_view", { slide_title: title });
              }
            }
          } else {
            entry.target._featuredVisible = false;
          }
        });
      },
      { threshold: [0, 0.55] }
    );
    slideIo.observe(slide);
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
   ADVANCED TRACKING – M. Mendelson
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

/* ========== 4. TRACK: Click on Version links ========== */
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

/* ========== 8. Featured carousel → analytics (slides built at runtime) ========== */
document.addEventListener("DOMContentLoaded", () => {
  const fc = document.getElementById("featured-carousel");
  if (!fc) return;
  fc.addEventListener("click", e => {
    const cta = e.target.closest(".featured-cta");
    const thumb = e.target.closest(".featured-thumb");
    if (!cta && !thumb) return;
    if (typeof gtag !== "function") return;
    const wrap = e.target.closest(".featured-card-preview");
    gtag("event", "featured_cta_click", {
      card_title: wrap?.querySelector("h3")?.textContent,
      via: thumb ? "image" : "button"
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

/* ========== Featured slide impressions: wired inside buildFeaturedCarousel ========== */

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