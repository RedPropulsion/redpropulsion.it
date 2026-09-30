import sharp from "sharp";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative, sep } from "node:path";

// Presets follow the role of the image, rather than its filename.
const photographSources = new Set();
const referencedAssets = new Set();
function collect(value) {
  if (typeof value === "string" && value.startsWith("/assets/")) referencedAssets.add(value);
  if (!value || typeof value !== "object") return;
  if (value.type === "bento_section") {
    value.images.forEach(image => photographSources.add(image));
    value.gallery?.forEach(photo => photographSources.add(photo.src));
  }
  if (typeof value.backgroundImage === "string") photographSources.add(value.backgroundImage);
  Object.values(value).forEach(collect);
}
for (const name of await readdir("src/content")) {
  if (name.endsWith(".json")) collect(JSON.parse(await readFile(join("src/content", name), "utf8")));
}
const outputSources = new Map();
const variants = {};
async function visit(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) { if (entry.name !== "optimized") await visit(file); continue; }
    if (!/\.(png|jpe?g|webp)$/i.test(file)) continue;
    const source = `/${relative("public", file).split(sep).join("/")}`;
    if (source.startsWith("/assets/") && !referencedAssets.has(source)) continue;
    const widths = source.startsWith("/profilePictures/") || source.startsWith("/placeholder") ? [160, 400, 800] : photographSources.has(source) ? [640, 1280, 1920] : [96, 320];
    const metadata = await sharp(file).metadata();
    const sizes = [...new Set(widths.map(width => Math.min(width, [5, 6, 7, 8].includes(metadata.orientation) ? metadata.height : metadata.width)))];
    variants[source] = [];
    for (const width of sizes) {
      const output = `/optimized${source.replace(/\.[^.]+$/, "")}-${width}.webp`;
      const previous = outputSources.get(output);
      if (previous && previous !== source) throw new Error(`Collisione tra immagini: ${previous} e ${source}`);
      outputSources.set(output, source);
      await mkdir(dirname(join("public", output)), { recursive: true });
      await sharp(file).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(join("public", output));
      variants[source].push({ src: output, width });
    }
  }
}
await visit("public");
await mkdir("src/lib", { recursive: true });
await writeFile("src/lib/image-variants.json", JSON.stringify(variants, null, 2) + "\n");
console.log(`Immagini responsive preparate: ${Object.keys(variants).length}. Originali conservati.`);
