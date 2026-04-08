// Garmin metrics: sync source → cache sheet + doGet JSON (Apps Script).
// doGet includes every column with a valid title; missing/broken numeric cells → 0 in JSON so all apps
// (e.g. Split Pacer Pro) still match the website even when one metric is #REF! in the cache.
//
// Spreadsheets (same layout on both — tab "Página1"):
//   Source: https://docs.google.com/spreadsheets/d/1ss0plcKrV5QZmty1uoQ9AtzKIpd0PE1QwDV9U4NWlmc
//   Cache:  https://docs.google.com/spreadsheets/d/1okrpkfe8TWZSUsfFk3PGG1-FPC_JCQ74gEMMiNxiDe8
//
// Layout (row numbers 1-based):
//   Row ROW_TITLE: app names in consecutive columns from B onward (2, 3, 4, …).
//   Rows ROW_TOTAL…ROW_LAUNCH_DATE: alternating label | value columns — for a title
//   in column `col`, the metric VALUES live in column (2*col - 1), not col+1.
//   Example: title B2 → totals in C4…C8; title C2 → totals in E4…E8; title D2 → G4…G8.

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

/** Next app title is one column to the right (B → C → D …). */
const OFFSET_NEXT_TITLE_COL = 1;

/**
 * getLastColumn() can stop early if the rightmost titles/metrics are sparse; scan at least this far
 * so later apps (e.g. Split Pacer Pro) are still read and emitted.
 */
const MIN_TITLE_SCAN_LAST_COL = 40;

// --------------------------------------------------------------

/**
 * Column index (1-based) where numeric values for metrics live, given the title column.
 * Matches alternating label/value columns in rows ROW_TOTAL…ROW_LAUNCH_DATE.
 */
function metricValueColumn(titleCol) {
  return 2 * titleCol - 1;
}

/** Empty cell or any typical Sheets error (#REF!, #N/A!, #VALUE!, …). */
function looksLikeSheetError(displayValue) {
  const t = String(displayValue || "").trim();
  if (!t) return true;
  return /^#/.test(t);
}

/** Only formula error displays (#…); empty string is not an error here. */
function isFormulaErrorDisplay(displayValue) {
  const t = String(displayValue || "").trim();
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

/** One numeric cell: OK to copy from source → cache (not empty/#… and parses as a finite number). */
function isValidNumericMetric(displayValue) {
  if (looksLikeSheetError(displayValue)) return false;
  return isFinite(parseMetricNumber(displayValue));
}

/** JSON output: finite number, or 0 if cache cell is empty / #error (app still appears on the site). */
function safeMetricNumberForJson(displayValue) {
  if (!isValidNumericMetric(displayValue)) return 0;
  return parseMetricNumber(displayValue);
}

function updateCache() {
  const source = SpreadsheetApp.openById(SOURCE_ID).getSheetByName(SOURCE_SHEET);
  const cache = SpreadsheetApp.openById(CACHE_ID).getSheetByName(CACHE_SHEET);

  const maxColumns = Math.max(source.getLastColumn(), MIN_TITLE_SCAN_LAST_COL);

  for (let col = 1; col <= maxColumns; ) {
    const title = source.getRange(ROW_TITLE, col).getDisplayValue().trim();
    if (!title) {
      col++;
      continue;
    }
    if (isFormulaErrorDisplay(title)) {
      col += OFFSET_NEXT_TITLE_COL;
      continue;
    }

    const metricCol = metricValueColumn(col);

    const total = source.getRange(ROW_TOTAL, metricCol).getDisplayValue().trim();
    const installs = source.getRange(ROW_INSTALLS, metricCol).getDisplayValue().trim();
    const users = source.getRange(ROW_USERS, metricCol).getDisplayValue().trim();
    const appAge = source.getRange(ROW_APP_AGE, metricCol).getDisplayValue().trim();

    const launchSrc = source.getRange(ROW_LAUNCH_DATE, metricCol);
    const launchDisplay = launchSrc.getDisplayValue().trim();

    cache.getRange(ROW_TITLE, col).setValue(title);

    if (isValidNumericMetric(total)) {
      cache.getRange(ROW_TOTAL, metricCol).setValue(total);
    }
    if (isValidNumericMetric(installs)) {
      cache.getRange(ROW_INSTALLS, metricCol).setValue(installs);
    }
    if (isValidNumericMetric(users)) {
      cache.getRange(ROW_USERS, metricCol).setValue(users);
    }

    if (!isFormulaErrorDisplay(appAge)) {
      cache.getRange(ROW_APP_AGE, metricCol).setValue(appAge);
    }

    if (!isFormulaErrorDisplay(launchDisplay)) {
      cache.getRange(ROW_LAUNCH_DATE, metricCol).setValue(launchSrc.getValue());
    }

    col += OFFSET_NEXT_TITLE_COL;
  }
}

function doGet(e) {
  const cache = SpreadsheetApp.openById(CACHE_ID).getSheetByName(CACHE_SHEET);
  const maxColumns = Math.max(cache.getLastColumn(), MIN_TITLE_SCAN_LAST_COL);
  const tz = Session.getScriptTimeZone();

  const apps = {};

  for (let col = 1; col <= maxColumns; ) {
    const title = cache.getRange(ROW_TITLE, col).getDisplayValue().trim();
    if (!title) {
      col++;
      continue;
    }
    if (isFormulaErrorDisplay(title)) {
      col++;
      continue;
    }

    const metricCol = metricValueColumn(col);

    const total = cache.getRange(ROW_TOTAL, metricCol).getDisplayValue().trim();
    const installs = cache.getRange(ROW_INSTALLS, metricCol).getDisplayValue().trim();
    const users = cache.getRange(ROW_USERS, metricCol).getDisplayValue().trim();
    const appAge = cache.getRange(ROW_APP_AGE, metricCol).getDisplayValue().trim();

    const launchCell = cache.getRange(ROW_LAUNCH_DATE, metricCol);
    const launchVal = launchCell.getValue();
    const launchDisplay = launchCell.getDisplayValue().trim();

    let launch_date_iso = null;
    if (launchVal instanceof Date && !isNaN(launchVal.getTime())) {
      launch_date_iso = Utilities.formatDate(launchVal, tz, "yyyy-MM-dd");
    }

    const launchOut = isFormulaErrorDisplay(launchDisplay) ? "" : launchDisplay;

    apps[title] = {
      total_downloads: safeMetricNumberForJson(total),
      installs_7_days: safeMetricNumberForJson(installs),
      users_7_days: safeMetricNumberForJson(users),
      app_age: looksLikeSheetError(appAge) ? "" : appAge,
      launch_date: launchOut,
      launch_date_iso: launch_date_iso
    };

    col += OFFSET_NEXT_TITLE_COL;
  }

  return ContentService
    .createTextOutput(JSON.stringify(apps))
    .setMimeType(ContentService.MimeType.JSON);
}
