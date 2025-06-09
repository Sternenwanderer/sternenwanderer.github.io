# Sternenwanderer Website Repo
Die Website ist mit [11ty](https://11ty.dev) gebaut und das Theme basiert auf [Halide](https://github.com/danurbanowicz/halide).

## Neue Inszenierung hinzufügen (auf GitHub)
1. Neuen Ordner in `assets/uploads` erstellen, in dem Poster, Photos und alle anderen Dokumente leben.
2. Neues .md Dokument im Ordner `productions` erstellen:
```
---
draft: false
title: Stückname
description: > Beschreibung
director: Regie, wenn Regie: sonst subgroup: Untergruppe
year: Semester
images:
  - src: /assets/uploads/NAME_DES_ORDNERS/poster.jpg
    caption: Poster
date: Datum der Premiere
---
[Zusamenfassung, Cast, etc]
```

3.  Photos:

     Photos müssen wie das Poster im Header deklariert werden.

4. Text:
    Unter den drei Strichen kann beliebiger Text in [Markdown](https://www.markdownguide.org/) geschrieben werden.

## Neue Inszenierung hinzufügen (local dev, bevorzugt)
1. Repo clonen
2. Schritten oben folgen
3. `npm install`, Warnungen ignorieren, dann: `npx eleventy --serve`, um zu schauen, ob alles noch funktioniert
4. Änderungen committen und pushen
5. Warten, bis GitHub die Website neu deployed hat

## Fragen?
Nicolai nerven (Oder für Reservierungen Lukas)

## Website aktualisieren
Die Website sollte sich automatisch aktualisieren, sobald sich irgendetwas bei den Dateien geändert hat.

---

## Reservierungen
Reservierungen sind für folgende Aufführungen wiederholbar aufsetzbar.
Hierzu müssen 2 Schritte durchgeführt werden: 
- Ein neues Google Sheet mit Script aufsetzen
- Das Konfigurationsfile "/_data/reservierung.yaml" mit Infos zur aktuellen Produktion befüllen.
#### 1. Google sheet mit script:
- 1. Setze eine neue Google Sheet auf
- 2. Am unteren Rand erstelle Sheets für die Einzelnen Aufführungsdaten
- 3. Kopiere die zwei Kopfzeilen aus vorherigen Stücken
- 4. Im oberen Reiter Klicke auf `Extensions -> Apps Script`
- 5. Ersetze sämtlichen code mit dem code in `googlesheet.js` in diesem Repository
- 6. Klicke auf `Deploy -> New Deployment`
- 7. Wähle 
  - Type: Web App
  - Description: Egal
  - Execute as Me(sternenwanderertuebingen@gmail.com) <- An dieser Stelle angemeldet im offiziellen account
  - Who has Access: Anyone
- 8. Klick auf Deploy
- 9. Trust untrusted project bestätigen
- 10. Kopiere die web App URL

#### 2. Config File ändern
- 1. Öffne `_data/reservierung.yaml`
- 2. Setze 
  - verkauf: true
  - ausverkauft: false (Das Ändern, wenn keine Tickets mehr verfügbar sind)
  - titel, (untertitel), preis
  - spreadsheet_deployment: die im vorherigen Schritt kopierte Deployment URL
