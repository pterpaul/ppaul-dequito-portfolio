function doPost(e) {
  try {
    var spreadsheetId = '1hjlx0w8OQ4v_EAsxXH9og-7XF-qYAMYx29HBtJIjQqQ';
    var sheetName = 'Sheet1';
    var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);

    if (!sheet) {
      throw new Error('Sheet not found: ' + sheetName);
    }

    var payload = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    sheet.appendRow([
      new Date(),
      payload.firstName || '',
      payload.lastName || '',
      payload.fullName || '',
      payload.email || '',
      payload.source || 'chatbot',
      payload.question || '',
      payload.pageUrl || '',
      payload.userAgent || '',
      payload.submittedAt || '',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
