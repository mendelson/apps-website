// Copy into the Apps Script project (bound or standalone) that serves the web app / doGet.
//
// Layout must match your sheet: title in ROW_TITLE at col C, C+3, C+6…
// (OFFSET_NEXT_APP = 3). Using 4 here was a bug and shifted every app’s metrics.

// CONFIGURAÇÃO -------------------------------------------------

const SOURCE_ID = "1ss0plcKrV5QZmty1uoQ9AtzKIpd0PE1QwDV9U4NWlmc";
const SOURCE_SHEET = "Página1";

const CACHE_ID = "1okrpkfe8TWZSUsfFk3PGG1-FPC_JCQ74gEMMiNxiDe8";
const CACHE_SHEET = "Página1";

const ROW_TITLE = 2;
const ROW_TOTAL = 4;
const ROW_INSTALLS = 5;
const ROW_USERS = 6;
const ROW_APP_AGE = 7;
const ROW_LAUNCH_DATE = 8;

// Métricas: 1 coluna à direita do título (igual ao script original).
const OFFSET_METRICS = 1;
// Próximo bloco de app: 3 colunas à frente (igual ao script original).
const OFFSET_NEXT_APP = 3;

// --------------------------------------------------------------

/** Empty cell or any typical Sheets error (#REF!, #N/A!, #VALUE!, …). */
function looksLikeSheetError(displayValue) {
  const t = String(displayValue || "").trim();
  if (!t) return true;
  return /^#/.test(t);
}

/** Parse a numeric metric from getDisplayValue(); commas / NBSP tolerated. */
function parseMetricNumber(displayValue) {
  const t = String(displayValue || "")
    .trim()
    .replace(/\u00a0/g, "")
    .replace(/,/g, "");
  const n = Number(t);
  return n;
}

function metricsAreComplete(total, installs, users) {
  if (
    looksLikeSheetError(total) ||
    looksLikeSheetError(installs) ||
    looksLikeSheetError(users)
  ) {
    return false;
  }
  const t = parseMetricNumber(total);
  const i = parseMetricNumber(installs);
  const u = parseMetricNumber(users);
  return isFinite(t) && isFinite(i) && isFinite(u);
}

/** Clears this app’s block in the cache so doGet never serves stale numbers. */
function clearAppBlockInCache(cache, titleCol, metricCol) {
  cache.getRange(ROW_TITLE, titleCol).clearContent();
  cache.getRange(ROW_TOTAL, metricCol).clearContent();
  cache.getRange(ROW_INSTALLS, metricCol).clearContent();
  cache.getRange(ROW_USERS, metricCol).clearContent();
  cache.getRange(ROW_APP_AGE, metricCol).clearContent();
  cache.getRange(ROW_LAUNCH_DATE, metricCol).clearContent();
}

function updateCache() {
  const source = SpreadsheetApp.openById(SOURCE_ID).getSheetByName(SOURCE_SHEET);
  const cache = SpreadsheetApp.openById(CACHE_ID).getSheetByName(CACHE_SHEET);

  const maxColumns = source.getLastColumn();

  for (let col = 1; col <= maxColumns; ) {
    const title = source.getRange(ROW_TITLE, col).getDisplayValue().trim();
    if (!title) {
      col++;
      continue;
    }

    const metricCol = col + OFFSET_METRICS;

    const total = source.getRange(ROW_TOTAL, metricCol).getDisplayValue().trim();
    const installs = source.getRange(ROW_INSTALLS, metricCol).getDisplayValue().trim();
    const users = source.getRange(ROW_USERS, metricCol).getDisplayValue().trim();
    const appAge = source.getRange(ROW_APP_AGE, metricCol).getDisplayValue().trim();

    const launchSrc = source.getRange(ROW_LAUNCH_DATE, metricCol);

    if (metricsAreComplete(total, installs, users)) {
      cache.getRange(ROW_TITLE, col).setValue(title);
      cache.getRange(ROW_TOTAL, metricCol).setValue(total);
      cache.getRange(ROW_INSTALLS, metricCol).setValue(installs);
      cache.getRange(ROW_USERS, metricCol).setValue(users);

      if (!looksLikeSheetError(appAge)) {
        cache.getRange(ROW_APP_AGE, metricCol).setValue(appAge);
      } else {
        cache.getRange(ROW_APP_AGE, metricCol).clearContent();
      }

      cache.getRange(ROW_LAUNCH_DATE, metricCol).setValue(launchSrc.getValue());
    } else {
      clearAppBlockInCache(cache, col, metricCol);
    }

    col += OFFSET_NEXT_APP;
  }
}

function doGet(e) {
  const cache = SpreadsheetApp.openById(CACHE_ID).getSheetByName(CACHE_SHEET);
  const maxColumns = cache.getLastColumn();
  const tz = Session.getScriptTimeZone();

  const apps = {};

  for (let col = 1; col <= maxColumns; ) {
    const title = cache.getRange(ROW_TITLE, col).getDisplayValue().trim();
    if (!title) {
      col++;
      continue;
    }

    const metricCol = col + OFFSET_METRICS;

    const total = cache.getRange(ROW_TOTAL, metricCol).getDisplayValue().trim();
    const installs = cache.getRange(ROW_INSTALLS, metricCol).getDisplayValue().trim();
    const users = cache.getRange(ROW_USERS, metricCol).getDisplayValue().trim();
    const appAge = cache.getRange(ROW_APP_AGE, metricCol).getDisplayValue().trim();

    const launchCell = cache.getRange(ROW_LAUNCH_DATE, metricCol);
    const launchVal = launchCell.getValue();
    const launchDisplay = launchCell.getDisplayValue().trim();

    if (!metricsAreComplete(total, installs, users)) {
      col += OFFSET_NEXT_APP;
      continue;
    }

    let launch_date_iso = null;
    if (launchVal instanceof Date && !isNaN(launchVal.getTime())) {
      launch_date_iso = Utilities.formatDate(launchVal, tz, "yyyy-MM-dd");
    }

    apps[title] = {
      total_downloads: parseMetricNumber(total),
      installs_7_days: parseMetricNumber(installs),
      users_7_days: parseMetricNumber(users),
      app_age: looksLikeSheetError(appAge) ? "" : appAge,
      launch_date: launchDisplay,
      launch_date_iso: launch_date_iso
    };

    col += OFFSET_NEXT_APP;
  }

  return ContentService
    .createTextOutput(JSON.stringify(apps))
    .setMimeType(ContentService.MimeType.JSON);
}
