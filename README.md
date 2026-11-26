# Adventskalender Arranger

A browser-based tool for designing a printed Advent calendar from Christmas sticker images. Split Pinterest sticker sheets into individual stickers, arrange them into numbered doors, customize the look, and print or export the result as PDF.

## Features

### Arrangement
- Numbered door grid (1–52 doors, configurable start number)
- Columns: auto-fit or fixed 2–8
- Drag & drop to swap doors, or drag images from the library into doors
- Shuffle, sort (filename / set), reverse, reset
- Click a door to open/close it (flip animation), open/close all
- Flat **Images mode** — view without doors, with the same drag & drop; prints and PDF-exports as a clean image grid

### Image library
- 52 stickers split from 4 Pinterest sheets (Stitch, Christmas bears, beige bears, black cats)
- Per-image enable/disable — disabled images are hidden and their doors empty
- Set filters, enable/disable all, "show disabled" toggle
- Custom image upload through the built-in Node backend (stored in `images/uploads/`), with object-URL fallback on plain static hosting

### Right-click context menus
- **Doors:** open/close, remove image, random image, rotate 90°, flip horizontally, edit door number, lock (protected from shuffle/sort), assign/clear per-door front image, disable image, delete from library
- **Library items:** enable/disable, add to first free door, assign as door front, delete

### Appearance
- Door size, gap, corner radius, border width/color
- Door background, number/text color, number size and position
- Global **front image** for all door faces (with opacity + cover/contain fit) and per-door overrides
- Editable title, show/hide title and numbers
- All settings persist in localStorage

### Export
- **Print** with a dedicated print stylesheet (option: print doors opened)
- **PDF export** via jsPDF — A4, images embedded, custom labels and per-door rotations included
- Optional full-page **cover page** using the front image
- Arrangement export/import as JSON

### Internationalization
UI available in English, Deutsch, Français, Español, Italiano, Nederlands (auto-detected, persisted).

## Getting started

Requires Node.js.

```bash
npm install        # only needed for the sticker-splitting script (sharp)
npm start          # or: node server.js
```

Then open http://127.0.0.1:8123/ in your browser.

### Running the web server

The web server is `server.js` (no dependencies, plain Node). It hosts the app **and** provides the upload API:

```bash
node server.js            # default port 8123
$env:PORT=3000; node server.js   # PowerShell: custom port
PORT=3000 node server.js         # bash: custom port
```

Alternatively, any static server works (e.g. `npx http-server -p 8123`), but then uploads fall back to session-only custom images (they are not saved to disk).

**Troubleshooting:** `Error: listen EADDRINUSE: address already in use :::8123` means something is already listening on that port — either another instance of this server is still running, or another app took the port. Stop the other process (or close the old terminal) and start again, or run on a different port as shown above.

## Upload API

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/upload` | Raw image bytes, filename in the `x-filename` header (max 30MB, PNG/JPG/GIF/WebP/SVG) |
| `GET` | `/uploads` | List uploaded images |
| `DELETE` | `/uploads/<name>` | Delete an uploaded image |

## Splitting sticker sheets

`split-sheets.mjs` cuts the downloaded sheet collages in `images/` into individual trimmed stickers in `images/split/` using content-aware segmentation (connected components + label propagation), then regenerates `images/manifest.json`:

```bash
node split-sheets.mjs
```

## Project structure

```
index.html          App markup (structure + templates)
css/style.css       All styling
js/app.js           All logic (vanilla JS, no build step)
server.js           Node backend: static hosting + upload API
split-sheets.mjs    Sticker sheet splitter (sharp)
images/
  manifest.json     Library manifest ({file, set, id})
  pin*.jpg/png      Original sticker sheets from Pinterest
  split/            52 individual sticker PNGs
  uploads/          User-uploaded images
```
