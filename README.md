# Sternenwanderer Website Repo
Die Website ist mit [11ty](11ty.dev) gebaut und das Theme basiert auf [Halide](https://github.com/danurbanowicz/halide).

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
3. `npx eleventy --serve`, um zu schauen, ob alles noch funktioniert
4. Änderungen committen und pushen
5. Warten, bis GitHub die Website neu deployed hat

## Fragen?
Nicolai nerven

## Website aktualisieren
Die Website sollte sich automatisch aktualisieren, sobald sich irgendetwas bei den Dateien geändert hat.