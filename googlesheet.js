function doPost(e) {
  try {
    const params = e.parameter;
    const name = params.name;
    const email = params.email;
    const anzahl = params.anzahl;
    const datum = params.datum;
    const herkunft = params.herkunft;
    const herkunftDetails = params.herkunft_details;
    const herkunftFinal = herkunft === "Anderes" && herkunftDetails ? `Anderes: ${herkunftDetails}` : herkunft;

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName(datum);

    if (!sheet) {
      return ContentService
        .createTextOutput("FEHLER: Kein Tab für dieses Datum.")
        .setMimeType(ContentService.MimeType.TEXT);
    }

    const timestamp = new Date();
    sheet.appendRow([name, anzahl, email, timestamp, herkunftFinal]);

    const subject = `Ihre Reservierung für Dracula am ${datum}`;
    const body = `
Hallo ${name},

vielen Dank für Ihre Reservierung für Dracula am ${datum}.
Wir haben ${anzahl} Karte(n) für Sie hinterlegt.

Bitte beachten Sie: Die Karten liegen an der Abendkasse zur Abholung bereit. Die Bezahlung ist nur mit Bargeld möglich.
Bei Verspätung oder Nichterscheinen behalten wir uns vor, die Reservierung freizugeben.

Wir freuen uns auf Ihren Besuch!

Ihre Sternenwanderer
`;

    MailApp.sendEmail(email, subject, body);

    return ContentService
      .createTextOutput("OK")
      .setMimeType(ContentService.MimeType.TEXT);

  } catch (error) {
    return ContentService
      .createTextOutput('FEHLER: ' + error.toString())
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

function doGet(e) {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheets = spreadsheet.getSheets();

    let result = [];

    sheets.forEach(sheet => {
      const name = sheet.getName();
      const count = sheet.getRange("H2").getValue();
      const max = sheet.getRange("H1").getValue();
      const remaining = max - count;

      result.push({
        date: name,
        remaining: remaining
      });
    });

    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
