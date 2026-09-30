import { createServer } from "node:http";
import { createReadStream, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";

const root = resolve("out");
if (!existsSync(resolve(root, "index.html"))) throw new Error("Export assente: eseguire prima npm run build.");
const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".xml": "application/xml", ".txt": "text/plain", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".ico": "image/x-icon", ".woff2": "font/woff2", ".pdf": "application/pdf" };
async function isFile(file) { try { return (await stat(file)).isFile(); } catch { return false; } }
const server = createServer(async (request, response) => {
  try {
    if (!["GET", "HEAD"].includes(request.method)) { response.writeHead(405, { Allow: "GET, HEAD" }); response.end(); return; }
    let path;
    try { path = decodeURIComponent(new URL(request.url, "http://localhost").pathname); } catch { response.writeHead(400); response.end(); return; }
    if (path.includes("\\") || path.includes("\0")) { response.writeHead(400); response.end(); return; }
    const requested = resolve(root, `.${path}`);
    if (requested !== root && !requested.startsWith(root + sep)) { response.writeHead(403); response.end(); return; }
    const candidates = [requested, `${requested}.html`, resolve(requested, "index.html")];
    let file;
    for (const candidate of candidates) { if (await isFile(candidate)) { file = candidate; break; } }
    const status = file ? 200 : 404;
    file ??= resolve(root, "404.html");
    if (!await isFile(file)) { response.writeHead(404); response.end(); return; }
    response.writeHead(status, { "Content-Type": `${types[extname(file)] ?? "application/octet-stream"}${[".html", ".css", ".js", ".json", ".xml", ".txt", ".svg"].includes(extname(file)) ? "; charset=utf-8" : ""}`, "Content-Length": (await stat(file)).size, "Cache-Control": "no-cache" });
    if (request.method === "HEAD") response.end();
    else createReadStream(file).on("error", () => response.destroy()).pipe(response);
  } catch { if (!response.headersSent) response.writeHead(500); response.end(); }
});
const port = Number(process.env.PORT ?? 3000);
server.on("error", error => { console.error(error.message); process.exitCode = 1; });
server.listen(port, "127.0.0.1", () => console.log(`Anteprima statica: http://127.0.0.1:${port}`));
