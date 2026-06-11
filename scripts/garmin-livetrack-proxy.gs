// Garmin LiveTrack proxy + per-user session registry (Apps Script).
//
// Deployed as the GAS_PROXY web app used by tracker/index.html:
//   ?url=<garmin url>                → CORS proxy (HTML or JSON passthrough)
//   ?action=session&user=<username> → latest LiveTrack session URL for that user
//
// Sessions are discovered by watching Gmail: Garmin LiveTrack invitation
// e-mails arrive at <account>+<username>@gmail.com and contain the session
// link. checkGarminEmails() runs every 5 min via time trigger.
//
// IMPORTANT: Saving the script does not update the public URL. Deploy →
// Manage deployments → Edit (pencil) → New version → Deploy.
// After pasting a new version, run checkGarminEmails() once manually to
// pick up any e-mail received while the old code was live.

// A stored session counts as "current" for this long after its e-mail arrived.
// Past that, handleSession returns url:null so the web app shows the
// "waiting for activity" banner instead of loading a dead session.
const SESSION_MAX_AGE_MS = 24 * 60 * 60 * 1000;

// ── Routing ───────────────────────────────────────────────────────────────────
function doGet(e) {
  if (e.parameter.action === 'session') return handleSession(e);
  return handleProxy(e);
}

// ── CORS Proxy ────────────────────────────────────────────────────────────────
function handleProxy(e) {
  const url = e.parameter.url;
  if (!url) {
    return jsonOut({ error: 'missing url param' });
  }
  try {
    const resp = UrlFetchApp.fetch(url, {
      muteHttpExceptions: true,
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });
    const code = resp.getResponseCode();
    const body = resp.getContentText('UTF-8');
    if (code !== 200) {
      return jsonOut({ __gasError: code, __gasBody: body.slice(0, 200) });
    }
    try {
      return jsonOut(JSON.parse(body));
    } catch (_) {
      return ContentService.createTextOutput(body).setMimeType(ContentService.MimeType.TEXT);
    }
  } catch (err) {
    return jsonOut({ __gasError: 0, __gasBody: err.message });
  }
}

// ── Session lookup ─────────────────────────────────────────────────────────────
function handleSession(e) {
  const user = (e.parameter.user || '').toLowerCase().trim();
  if (!user) return jsonOut({ error: 'missing user param' });
  const props = PropertiesService.getScriptProperties();
  const url = props.getProperty('session_' + user);
  const ts = Number(props.getProperty('session_ts_' + user) || 0) || null;
  const fresh = url && ts && Date.now() - ts <= SESSION_MAX_AGE_MS;
  // ts is always returned so the web app can show "last activity X hours ago"
  return jsonOut({ url: fresh ? url : null, ts: ts });
}

// ── Gmail watcher — runs every 5 min via time trigger ─────────────────────────
function checkGarminEmails() {
  // No is:unread filter: reading the e-mail on a phone must not hide the
  // session from this watcher. No subject filter either — Garmin localises
  // subjects, so we match on the livetrack link in the body instead.
  // Idempotency comes from the per-user timestamp comparison below.
  const props = PropertiesService.getScriptProperties();
  const threads = GmailApp.search('from:garmin.com newer_than:2d', 0, 30);
  threads.forEach(thread =>
    thread.getMessages().forEach(msg => processGarminEmail(msg, props))
  );
}

function processGarminEmail(msg, props) {
  // Derive username from the +tag in the To: address
  const tagMatch = msg.getTo().match(/\+([^@>]+)@/);
  if (!tagMatch) return;
  const username = tagMatch[1].toLowerCase().trim();

  // Extract LiveTrack session URL from the HTML body
  const urlMatch = msg.getBody().match(/https:\/\/livetrack\.garmin\.com\/session\/[^"'\s<>]+/);
  if (!urlMatch) return;

  // Only ever move forward: skip messages older than what is already stored.
  const msgTs = msg.getDate().getTime();
  const prevTs = Number(props.getProperty('session_ts_' + username) || 0);
  if (msgTs <= prevTs) return;

  props.setProperty('session_' + username, urlMatch[0]);
  props.setProperty('session_ts_' + username, String(msgTs));
  Logger.log('Stored session for ' + username + ': ' + urlMatch[0]);
}

// ── Run once to create the time trigger ───────────────────────────────────────
function createTrigger() {
  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === 'checkGarminEmails')
    .forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('checkGarminEmails').timeBased().everyMinutes(5).create();
  Logger.log('Trigger created.');
}

// ── Shared helper ─────────────────────────────────────────────────────────────
function jsonOut(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
