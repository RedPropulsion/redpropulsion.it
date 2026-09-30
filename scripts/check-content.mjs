import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve, sep } from "node:path";
import { validateProjects, validateContentBlock } from "../src/lib/content-validation.mjs";

const publicRoot = resolve("public");
const fail = (path, message) => { throw new Error(`${path}: ${message}`); };
function walk(value, path) {
  if (Array.isArray(value)) return value.forEach((item, i) => walk(item, `${path}[${i}]`));
  if (!value || typeof value !== "object") return;
  if (value.type) {
    validateContentBlock(value, path);
    if (value.type === "bento_section") {
      value.images.forEach((image, i) => checkImage(image, `${path}.images[${i}]`));
    }
  }
  for (const [key, item] of Object.entries(value)) {
    const field = `${path}.${key}`;
    if (["src", "image", "icon", "imgSrc", "backgroundImage"].includes(key) && typeof item === "string" && item) checkImage(item, field);
    if (["url", "linkedin"].includes(key) && typeof item === "string" && item) {
      // The retained Team content also accepts LinkedIn handles, normalized by TeamTabs.
      if (key === "linkedin" && /^[\p{L}\p{N} .'-]+$/u.test(item)) continue;
      if (item !== "scroll" && !/^\/(?!\/)/.test(item) && !/^#[^\s]*$/.test(item)) {
        let url;
        try { url = new URL(item); } catch { fail(field, "URL non valido"); }
        if (!["https:", "http:", "mailto:", "tel:"].includes(url.protocol)) fail(field, "protocollo URL non supportato");
      }
    }
    walk(item, field);
  }
}
function checkImage(image, path) {
  if (/^https?:\/\//.test(image)) return;
  if (!/^\/(?!\/)/.test(image)) fail(path, "percorso immagine locale assoluto obbligatorio");
  const file = resolve(publicRoot, image.slice(1));
  if (!file.startsWith(publicRoot + sep) || !existsSync(file)) fail(path, `immagine mancante o fuori da public: ${image}`);
}
const files = readdirSync("src/content").filter(file => file.endsWith(".json"));
for (const file of files) {
  const content = JSON.parse(readFileSync(`src/content/${file}`, "utf8"));
  if (file === "projects_page.json") validateProjects(content, file);
  walk(content, file);
}
console.log(`Contenuti verificati: ${files.length} file JSON.`);
