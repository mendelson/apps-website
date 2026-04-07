// Copy to Google Apps Script only. Do not put real spreadsheet IDs in git.
// Replace YOUR_SOURCE_ID / YOUR_CACHE_ID / sheet names below.

// CONFIGURAÇÃO -------------------------------------------------

const SOURCE_ID = "YOUR_SOURCE_ID";
const SOURCE_SHEET = "Página1";

const CACHE_ID = "YOUR_CACHE_ID";
const CACHE_SHEET = "Página1";

const ROW_TITLE = 2;
const ROW_TOTAL = 4;
const ROW_INSTALLS = 5;
const ROW_USERS = 6;
const ROW_APP_AGE = 7;
const ROW_LAUNCH_DATE = 8;

const OFFSET_METRICS = 1;
const OFFSET_NEXT_APP = 4;

// --------------------------------------------------------------


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

    const invalid = ["", "#REF!", "#N/A", "#ERROR!"];

    const incomplete =
      invalid.includes(total) ||
      invalid.includes(installs) ||
      invalid.includes(users);

    if (!incomplete) {
      cache.getRange(ROW_TITLE, col).setValue(title);
      cache.getRange(ROW_TOTAL, metricCol).setValue(total);
      cache.getRange(ROW_INSTALLS, metricCol).setValue(installs);
      cache.getRange(ROW_USERS, metricCol).setValue(users);
      cache.getRange(ROW_APP_AGE, metricCol).setValue(appAge);
      cache.getRange(ROW_LAUNCH_DATE, metricCol).setValue(launchSrc.getValue());
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

    let launch_date_iso = null;
    if (launchVal instanceof Date && !isNaN(launchVal.getTime())) {
      launch_date_iso = Utilities.formatDate(launchVal, tz, "yyyy-MM-dd");
    }

    apps[title] = {
      total_downloads: Number(total),
      installs_7_days: Number(installs),
      users_7_days: Number(users),
      app_age: appAge,
      launch_date: launchDisplay,
      launch_date_iso: launch_date_iso
    };

    col += OFFSET_NEXT_APP;
  }

  return ContentService
    .createTextOutput(JSON.stringify(apps))
    .setMimeType(ContentService.MimeType.JSON);
}
