const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const UPLOAD_DIR = path.join(ROOT, "images", "uploads");
const PORT = process.env.PORT || 8123;
const MAX_BODY = 30 * 1024 * 1024;

fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function send(res, code, body, type) {
  const data = typeof body === "string" ? body : JSON.stringify(body);
  res.writeHead(code, { "Content-Type": type || "application/json; charset=utf-8", "Cache-Control": "no-store" });
  res.end(data);
}

function safeName(raw) {
  let name = decodeURIComponent(String(raw || "")).replace(/[\\/:*?"<>|\x00-\x1f]/g, "_").trim();
  if (!name) return null;
  name = name.replace(/\s+/g, "-");
  if (name.length > 120) name = name.slice(-120);
  if (!/\.(png|jpe?g|gif|webp|svg)$/i.test(name)) return null;
  return name;
}

function uniquePath(name) {
  const ext = path.extname(name);
  const base = name.slice(0, -ext.length);
  let p = path.join(UPLOAD_DIR, name);
  let i = 1;
  while (fs.existsSync(p)) {
    p = path.join(UPLOAD_DIR, `${base}-${i++}${ext}`);
  }
  return p;
}

function listUploads() {
  return fs.readdirSync(UPLOAD_DIR)
    .filter(f => /\.(png|jpe?g|gif|webp|svg)$/i.test(f))
    .map(f => ({ file: "images/uploads/" + f, name: f }))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
}

function serveStatic(req, res, urlPath) {
  let rel = decodeURIComponent(urlPath);
  if (rel.endsWith("/")) rel += "index.html";
  const abs = path.normalize(path.join(ROOT, rel));
  if (!abs.startsWith(ROOT)) { send(res, 403, { ok: false, error: "forbidden" }); return; }
  fs.stat(abs, (err, st) => {
    if (err || !st.isFile()) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
      return;
    }
    const ext = path.extname(abs).toLowerCase();
    res.writeHead(200, {
      "Content-Type": MIME[ext] || "application/octet-stream",
      "Content-Length": st.size,
      "Cache-Control": "no-cache",
    });
    fs.createReadStream(abs).pipe(res);
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");

  if (url.pathname === "/upload" && req.method === "POST") {
    const name = safeName(req.headers["x-filename"]);
    if (!name) { send(res, 400, { ok: false, error: "missing or invalid x-filename header (image extension required)" }); return; }
    const chunks = [];
    let size = 0;
    let aborted = false;
    req.on("data", c => {
      size += c.length;
      if (size > MAX_BODY) {
        aborted = true;
        send(res, 413, { ok: false, error: "file too large (max 30MB)" });
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on("end", () => {
      if (aborted) return;
      if (!size) { send(res, 400, { ok: false, error: "empty body" }); return; }
      const target = uniquePath(name);
      fs.writeFile(target, Buffer.concat(chunks), err => {
        if (err) { send(res, 500, { ok: false, error: "could not save file" }); return; }
        const rel = "images/uploads/" + path.basename(target);
        console.log("uploaded:", rel);
        send(res, 200, { ok: true, file: rel, name: path.basename(target) });
      });
    });
    req.on("error", () => {});
    return;
  }

  if (url.pathname === "/uploads" && req.method === "GET") {
    send(res, 200, { ok: true, files: listUploads() });
    return;
  }

  const delMatch = url.pathname.match(/^\/uploads\/(.+)$/);
  if (delMatch && req.method === "DELETE") {
    const name = safeName(delMatch[1]);
    if (!name) { send(res, 400, { ok: false, error: "invalid file name" }); return; }
    const abs = path.normalize(path.join(UPLOAD_DIR, name));
    if (!abs.startsWith(UPLOAD_DIR)) { send(res, 403, { ok: false, error: "forbidden" }); return; }
    fs.unlink(abs, err => {
      if (err) { send(res, 404, { ok: false, error: "file not found" }); return; }
      console.log("deleted:", name);
      send(res, 200, { ok: true });
    });
    return;
  }

  if (url.pathname.startsWith("/upload") || url.pathname.startsWith("/uploads")) {
    send(res, 404, { ok: false, error: "unknown endpoint" });
    return;
  }

  serveStatic(req, res, url.pathname);
});

server.listen(PORT, () => {
  console.log(`Adventskalender server running at http://127.0.0.1:${PORT}/`);
});
