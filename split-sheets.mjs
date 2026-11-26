import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "images", "split");
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

// [source, prefix, greyTrim, initialMargin]
const sheets = [
  ["images/pin1-stitch-stickers.jpg", "stitch", false, 0],
  ["images/pin2-navidad-dtf.jpg", "bears", true, 15],
  ["images/pin3.jpg", "bears2", false, 0],
  ["images/pin4-christmas-cat.jpg", "cats", false, 0],
];

const NONWHITE = 235;
const MIN_DIM = 60;   // drop segments smaller than this in either dimension
const ERODE = 2;      // erosion radius: kills thin border lines / jpeg speckle bridges

function buildMask(raw, w, h) {
  const mask = new Uint8Array(w * h);
  for (let i = 0, p = 0; i < w * h; i++, p += 3) {
    if (raw[p] < NONWHITE || raw[p + 1] < NONWHITE || raw[p + 2] < NONWHITE) mask[i] = 1;
  }
  return mask;
}

function erode(mask, w, h, r) {
  const out = new Uint8Array(w * h);
  for (let y = r; y < h - r; y++) {
    const row = y * w;
    for (let x = r; x < w - r; x++) {
      let ok = 1;
      for (let dy = -r; dy <= r && ok; dy++) {
        const rr = (y + dy) * w;
        for (let dx = -r; dx <= r; dx++) {
          if (!mask[rr + x + dx]) { ok = 0; break; }
        }
      }
      if (ok) out[row + x] = 1;
    }
  }
  return out;
}

// Connected components on the (eroded) mask; returns per-pixel component ids + boxes.
function componentize(mask, w, h) {
  const labels = new Int32Array(w * h).fill(-1);
  const comps = [];
  const stack = new Int32Array(w * h);
  for (let start = 0; start < w * h; start++) {
    if (!mask[start] || labels[start] !== -1) continue;
    const id = comps.length;
    let sp = 0;
    stack[sp++] = start;
    labels[start] = id;
    let minX = w, maxX = -1, minY = h, maxY = -1, count = 0;
    while (sp > 0) {
      const p = stack[--sp];
      const x = p % w;
      const y = (p / w) | 0;
      count++;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
      for (let dy = -1; dy <= 1; dy++) {
        const ny = y + dy;
        if (ny < 0 || ny >= h) continue;
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx;
          if (nx < 0 || nx >= w || (dx === 0 && dy === 0)) continue;
          const q = ny * w + nx;
          if (mask[q] && labels[q] === -1) { labels[q] = id; stack[sp++] = q; }
        }
      }
    }
    comps.push({ id, minX, maxX, minY, maxY, count });
  }
  return { labels, comps };
}

function boxArea(b) { return (b.maxX - b.minX + 1) * (b.maxY - b.minY + 1); }
function overlapArea(a, b) {
  const ox = Math.min(a.maxX, b.maxX) - Math.max(a.minX, b.minX) + 1;
  const oy = Math.min(a.maxY, b.maxY) - Math.max(a.minY, b.minY) + 1;
  if (ox <= 0 || oy <= 0) return 0;
  return ox * oy;
}
function mergeBox(a, b) {
  a.minX = Math.min(a.minX, b.minX);
  a.minY = Math.min(a.minY, b.minY);
  a.maxX = Math.max(a.maxX, b.maxX);
  a.maxY = Math.max(a.maxY, b.maxY);
}

// Multi-source BFS: assign every original-mask pixel to the component whose
// eroded pixel it is nearest to (geodesic ownership). Bridges/speckles that
// erosion removed get re-attached to the sticker they touch.
function propagate(mask, seedLabels, w, h) {
  const labels = Int32Array.from(seedLabels);
  const queue = new Int32Array(w * h);
  let qt = 0;
  for (let i = 0; i < w * h; i++) if (labels[i] >= 0) queue[qt++] = i;
  let qh = 0;
  while (qh < qt) {
    const p = queue[qh++];
    const L = labels[p];
    const x = p % w;
    const y = (p / w) | 0;
    for (let dy = -1; dy <= 1; dy++) {
      const ny = y + dy;
      if (ny < 0 || ny >= h) continue;
      for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx;
        if (nx < 0 || nx >= w || (dx === 0 && dy === 0)) continue;
        const q = ny * w + nx;
        if (mask[q] && labels[q] === -1) { labels[q] = L; queue[qt++] = q; }
      }
    }
  }
  return labels;
}

// Split raw RGB buffer into sticker regions; each region also reports its own
// pixel bbox so neighbor bleed inside overlapping bounding boxes can be whitened.
function findStickers(raw, w, h) {
  const mask = buildMask(raw, w, h);
  const eroded = erode(mask, w, h, ERODE);
  const { labels: seedLabels, comps } = componentize(eroded, w, h);

  comps.sort((a, b) => boxArea(b) - boxArea(a));
  const kept = [];      // kept[i] = { ids: [compIds], bbox }
  for (const c of comps) {
    const bw = c.maxX - c.minX + 1;
    const bh = c.maxY - c.minY + 1;
    let merged = false;
    for (const k of kept) {
      // attach only fragments that sit essentially inside this sticker
      // (own sparkles/decorations) — fragments that merely poke into the bbox
      // belong to a neighboring sticker and must be left alone
      if (overlapArea(c, k.bbox) >= 0.85 * boxArea(c) && c.count >= 20) {
        mergeBox(k.bbox, c);
        k.ids.push(c.id);
        merged = true;
        break;
      }
    }
    if (!merged) {
      if (bw < MIN_DIM || bh < MIN_DIM) continue; // junk fragment, no owner
      kept.push({ ids: [c.id], bbox: { ...c } });
    }
  }

  // comp id -> kept index
  const ownerOfComp = new Int32Array(comps.length).fill(-1);
  kept.forEach((k, ki) => k.ids.forEach((cid) => { ownerOfComp[cid] = ki; }));

  const labels = propagate(mask, seedLabels, w, h);

  // exact pixel bboxes per kept sticker
  const boxes = kept.map(() => ({ minX: w, minY: h, maxX: -1, maxY: -1, count: 0 }));
  for (let p = 0; p < w * h; p++) {
    const L = labels[p];
    if (L < 0) continue;
    const k = ownerOfComp[L];
    if (k < 0) continue;
    const b = boxes[k];
    const x = p % w;
    const y = (p / w) | 0;
    if (x < b.minX) b.minX = x;
    if (x > b.maxX) b.maxX = x;
    if (y < b.minY) b.minY = y;
    if (y > b.maxY) b.maxY = y;
    b.count++;
  }
  return { boxes, labels, ownerOfComp };
}

const manifest = [];

for (const [src, prefix, greyTrim, initialMargin] of sheets) {
  let img = sharp(src);
  if (greyTrim) {
    const { data } = await img.clone().extract({ left: 2, top: 2, width: 1, height: 1 }).raw().toBuffer({ resolveWithObject: true });
    const trimmed = await img.clone().trim({ background: [data[0], data[1], data[2]], threshold: 20 }).toBuffer();
    img = sharp(trimmed);
  }

  // Try increasing margins until no single component dominates the sheet
  // (guards against a dark border line / leftover sliver connecting everything).
  let result = null;
  for (const margin of [initialMargin, initialMargin + 10, initialMargin + 25, initialMargin + 45]) {
    const meta = await img.metadata();
    const left = Math.min(margin, Math.floor(meta.width / 3));
    const top = Math.min(margin, Math.floor(meta.height / 3));
    const buf = await img
      .extract({ left, top, width: meta.width - 2 * left, height: meta.height - 2 * top })
      .removeAlpha()
      .toBuffer();
    const m = await sharp(buf).metadata();
    const raw = await sharp(buf).raw().toBuffer();
    const stickers = findStickers(raw, m.width, m.height);
    const valid = stickers.boxes.filter((b) => b.count > 0 && b.maxX - b.minX + 1 >= MIN_DIM && b.maxY - b.minY + 1 >= MIN_DIM);
    const biggest = Math.max(...valid.map(boxArea), 0);
    if (valid.length > 1 && biggest > 0.55 * m.width * m.height) {
      console.log(`${prefix}: margin ${margin} left a mega-component (${(100 * biggest / (m.width * m.height)).toFixed(0)}%), retrying with bigger margin`);
      continue;
    }
    result = { stickers, raw, width: m.width, height: m.height };
    break;
  }

  const { stickers, raw, width: W, height: H } = result;
  let n = 0;
  for (let ki = 0; ki < stickers.boxes.length; ki++) {
    const b = stickers.boxes[ki];
    if (b.count === 0 || b.maxX < b.minX) continue;
    const bw = b.maxX - b.minX + 1;
    const bh = b.maxY - b.minY + 1;
    if (bw < MIN_DIM || bh < MIN_DIM) continue;
    const pad = 4;
    const left = Math.max(0, b.minX - pad);
    const top = Math.max(0, b.minY - pad);
    const width = Math.min(W, b.maxX + 1 + pad) - left;
    const height = Math.min(H, b.maxY + 1 + pad) - top;

    // copy the tile, whitening everything that is not THIS sticker's own pixels
    const tile = Buffer.alloc(width * height * 3, 255);
    for (let y = 0; y < height; y++) {
      const gy = top + y;
      if (gy < 0 || gy >= H) continue;
      for (let x = 0; x < width; x++) {
        const gx = left + x;
        const p = gy * W + gx;
        const L = stickers.labels[p];
        if (L < 0 || stickers.ownerOfComp[L] !== ki) continue;
        const q = (y * width + x) * 3;
        tile[q] = raw[p * 3];
        tile[q + 1] = raw[p * 3 + 1];
        tile[q + 2] = raw[p * 3 + 2];
      }
    }

    const trimmedTile = await sharp(tile, { raw: { width, height, channels: 3 } })
      .trim({ background: "#ffffff", threshold: 25 })
      .png()
      .toBuffer();
    if (!trimmedTile || trimmedTile.length < 500) continue;
    const m = await sharp(trimmedTile).metadata();
    if (m.width < 40 || m.height < 40) continue;
    n++;
    const name = `${prefix}-${String(n).padStart(2, "0")}.png`;
    await sharp(trimmedTile).resize({ width: 400, height: 400, fit: "inside" }).toFile(path.join(outDir, name));
    manifest.push({ file: `images/split/${name}`, set: prefix, id: `${prefix}-${n}` });
  }
  console.log(`${prefix}: ${n} stickers`);
}

fs.writeFileSync(path.join(__dirname, "images", "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`Total: ${manifest.length}`);
