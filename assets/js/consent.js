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

  var I18N = {
    en: { t: 'This site uses Google Analytics to understand usage. No personal data is collected.', a: 'Accept', d: 'Decline' },
    pt: { t: 'Este site usa o Google Analytics para entender o uso. Nenhum dado pessoal é coletado.', a: 'Aceitar', d: 'Recusar' },
    es: { t: 'Este sitio usa Google Analytics para entender el uso. No se recopilan datos personales.', a: 'Aceptar', d: 'Rechazar' },
    de: { t: 'Diese Seite nutzt Google Analytics zur Nutzungsanalyse. Es werden keine personenbezogenen Daten erhoben.', a: 'Akzeptieren', d: 'Ablehnen' },
    fr: { t: "Ce site utilise Google Analytics pour comprendre son usage. Aucune donnée personnelle n'est collectée.", a: 'Accepter', d: 'Refuser' }
  };
  function initConsent() {
    var bar = document.getElementById('consent-bar');
    var lang = (document.documentElement.lang || 'en').split('-')[0];
    var t = I18N[lang] || I18N.en;
    if (bar) {
      var tx = bar.querySelector('.consent-text'),
          ac = bar.querySelector('[data-consent="accept"]'),
          dc = bar.querySelector('[data-consent="decline"]');
      if (tx) tx.textContent = t.t;
      if (ac) ac.textContent = t.a;
      if (dc) dc.textContent = t.d;
      var stored;
      try { stored = localStorage.getItem('mm_consent'); } catch (e) {}
      if (!stored) bar.hidden = false;
      function set(v) {
        try { localStorage.setItem('mm_consent', v); } catch (e) {}
        if (v === 'granted') { try { gtag('consent', 'update', { analytics_storage: 'granted' }); } catch (e) {} }
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
        var m = (a.getAttribute('href') || '').match(/\/(de|en|es|fr|pt)(\/|$)/);
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
