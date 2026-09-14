'use strict';
/*
 * consent.js — GA4 consent bar + mmTrack() + universal event wiring, shared by
 * every apps.mmendelson.com page (main showcase, tracker, live_tracker, 404,
 * privacy). GA4 itself is loaded with Consent Mode v2 (denied by default) in
 * each page's <head>; this file provides the localized consent bar and the
 * chrome events. Page-specific events (the app cards, search, etc.) live in
 * assets/js/script.js. All params are bucketed / non-PII.
 * See website/ANALYTICS_TRACKING.md.
 */
(function () {
  function track(name, params) {
    try { if (typeof gtag === 'function') gtag('event', name, params || {}); } catch (e) {}
  }
  window.mmTrack = track;

  var FAMILY = /(^|\.)mmendelson\.com$/i;
  function hostOf(href) { try { return new URL(href, location.href).hostname; } catch (e) { return ''; } }
  function siteOf(href) {
    if (/apps\.mmendelson\.com/.test(href) || href === '/' || href.charAt(0) === '/') return 'apps';
    if (/run\.mmendelson\.com/.test(href)) return 'run';
    if (/mmendelson\.com/.test(href)) return 'home';
    return 'apps';
  }

  // Banner v2 — it must name the demographic signals, because accepting now
  // also grants ad_user_data / ad_personalization (Google Signals). All seven
  // site languages; an unknown <html lang> falls back to English.
  var I18N = {
    en: { t: 'This site uses Google Analytics cookies to understand how mmendelson.com and its sub-sites are used, including age, gender and interest estimates from Google. Decline and only anonymous counts are kept.', a: 'Accept', d: 'Decline', p: 'Privacy policy' },
    pt: { t: 'Este site usa cookies do Google Analytics para entender como o mmendelson.com e seus subsites são usados, incluindo estimativas de idade, gênero e interesses feitas pelo Google. Ao recusar, ficam apenas contagens anônimas.', a: 'Aceitar', d: 'Recusar', p: 'Política de privacidade' },
    es: { t: 'Este sitio usa cookies de Google Analytics para entender cómo se usan mmendelson.com y sus subsitios, incluidas las estimaciones de edad, género e intereses de Google. Al rechazar, solo se conservan recuentos anónimos.', a: 'Aceptar', d: 'Rechazar', p: 'Política de privacidad' },
    de: { t: 'Diese Website nutzt Google-Analytics-Cookies, um die Nutzung von mmendelson.com und seinen Unterseiten zu verstehen — einschließlich der von Google geschätzten Angaben zu Alter, Geschlecht und Interessen. Bei Ablehnung bleiben nur anonyme Zählungen.', a: 'Akzeptieren', d: 'Ablehnen', p: 'Datenschutz' },
    fr: { t: 'Ce site utilise des cookies Google Analytics pour comprendre l\u2019usage de mmendelson.com et de ses sous-sites, y compris les estimations d\u2019âge, de genre et d\u2019intérêts fournies par Google. En cas de refus, seuls des comptages anonymes sont conservés.', a: 'Accepter', d: 'Refuser', p: 'Confidentialité' },
    it: { t: 'Questo sito usa i cookie di Google Analytics per capire come vengono usati mmendelson.com e i suoi sottositi, comprese le stime di età, genere e interessi fornite da Google. Se rifiuti, restano solo conteggi anonimi.', a: 'Accetta', d: 'Rifiuta', p: 'Privacy' },
    ru: { t: 'Этот сайт использует файлы cookie Google Analytics, чтобы понять, как используются mmendelson.com и его подсайты, включая оценки возраста, пола и интересов от Google. При отказе остаётся только анонимный подсчёт.', a: 'Принять', d: 'Отклонить', p: 'Конфиденциальность' }
  };
  function initConsent() {
    var bar = document.getElementById('consent-bar');
    var lang = (document.documentElement.lang || 'en').split('-')[0];
    var t = I18N[lang] || I18N.en;
    if (bar) {
      var tx = bar.querySelector('.consent-text'),
          ac = bar.querySelector('[data-consent="accept"]'),
          dc = bar.querySelector('[data-consent="decline"]');
      if (tx) {
        tx.textContent = t.t + ' ';
        var a = document.createElement('a');
        a.href = '/privacy_policy/' + (I18N[lang] ? lang : 'en') + '/';
        a.textContent = t.p;
        tx.appendChild(a);
      }
      if (ac) ac.textContent = t.a;
      if (dc) dc.textContent = t.d;
      // mm_consent_v is the banner version answered. A visitor who accepted
      // the v1 banner consented to analytics only, so they are asked again
      // rather than having the ad signals switched on behind them.
      var answered = (window.mmConsentGet || function () { return null; })('mm_consent_v');
      if (answered !== '2') bar.hidden = false;
      function set(v) {
        var put = window.mmConsentSet || function (k, x) { try { localStorage.setItem(k, x); } catch (e) {} };
        put('mm_consent', v);
        put('mm_consent_v', '2');
        if (v === 'granted') {
          try {
            gtag('consent', 'update', {
              analytics_storage: 'granted', ad_storage: 'granted',
              ad_user_data: 'granted', ad_personalization: 'granted'
            });
          } catch (e) {}
        }
        bar.hidden = true;
      }
      if (ac) ac.addEventListener('click', function () { set('granted'); });
      if (dc) dc.addEventListener('click', function () { set('denied'); });
    }
    document.querySelectorAll('[data-consent="reset"]').forEach(function (el) {
      el.addEventListener('click', function (e) { e.preventDefault(); if (bar) bar.hidden = false; });
    });
  }

  function initEvents() {
    // Family site switch (main nav bar + tracker/live_tracker .switch + footer)
    document.querySelectorAll('.site-switch a, .foot-switch a, .switch a').forEach(function (a) {
      if (a.classList.contains('active')) return;
      var where = a.closest('.foot-switch') ? 'footer' : 'header';
      a.addEventListener('click', function () {
        track('site_switch_click', { to_site: siteOf(a.getAttribute('href') || ''), location: where });
      });
    });
    // Language selector (URL-fork links to /{lang}/)
    document.querySelectorAll('.lang-option[href]').forEach(function (a) {
      a.addEventListener('click', function () {
        var m = (a.getAttribute('href') || '').match(/\/(de|en|es|fr|it|pt|ru)(\/|$)/);
        track('language_change', { to_lang: m ? m[1] : '', method: 'globe' });
      });
    });
    // Section nav (hash links)
    document.querySelectorAll('nav ul a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function () { track('nav_click', { target: (a.getAttribute('href') || '').replace('#', '') }); });
    });
    // Outbound (non-family http; skip the CIQ store badges — those are ciq_click)
    document.querySelectorAll('a[href^="http"]').forEach(function (a) {
      if (a.closest('.ciq-badge') || a.classList.contains('ciq-badge')) return;
      var host = hostOf(a.href);
      if (!host || FAMILY.test(host)) return;
      a.addEventListener('click', function () { track('outbound_click', { host: host }); });
    });
  }

  function boot() { initConsent(); initEvents(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
