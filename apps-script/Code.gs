// Optional: Set your Sheet ID explicitly, or leave as 'YOUR_GOOGLE_SHEET_ID'
// if this script is bound directly inside your MindShelf Bookmarks Google Sheet.
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID';

function getTargetSpreadsheet_() {
  if (SHEET_ID && SHEET_ID !== 'YOUR_GOOGLE_SHEET_ID') {
    return SpreadsheetApp.openById(SHEET_ID);
  }
  return SpreadsheetApp.getActiveSpreadsheet();
}

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('MindShelf — AI Bookmark Library')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, viewport-fit=cover');
}

function getBookmarksFromSheet() {
  const ss = getTargetSpreadsheet_();
  const sheet = ss.getSheets()[0];
  const rows = sheet.getDataRange().getDisplayValues();
  if (rows.length <= 1) return [];
  return rows.slice(1).map((r, idx) => ({
    id: 'row-' + (idx + 2),
    rowNumber: idx + 2,
    date: r[0] || '',
    title: r[1] || '',
    url: r[2] || '',
    folder: r[3] || 'Tools',
    tags: (r[4] || '').split(/[,\s]+/).filter(Boolean),
    type: r[5] || 'To Read',
    summary: r[6] || '',
    snapshot: r[7] || '',
    notes: r[8] || '',
    status: r[9] || 'Unread'
  })).reverse();
}

function addBookmarkToSheet(item) {
  const ss = getTargetSpreadsheet_();
  const sheet = ss.getSheets()[0];
  sheet.appendRow([
    item.date,
    item.title,
    item.url,
    item.folder,
    (item.tags || []).join(', '),
    item.type,
    item.summary,
    item.snapshot,
    item.notes,
    item.status || 'Unread'
  ]);
  return getBookmarksFromSheet();
}

function updateBookmarkInSheet(rowNumber, status, notes) {
  const ss = getTargetSpreadsheet_();
  const sheet = ss.getSheets()[0];
  if (rowNumber && rowNumber >= 2) {
    if (notes !== undefined) sheet.getRange(rowNumber, 9).setValue(notes);
    if (status !== undefined) sheet.getRange(rowNumber, 10).setValue(status);
  }
  return true;
}
