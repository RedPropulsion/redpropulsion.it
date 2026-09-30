import assert from "node:assert/strict";
import { getProfilePicture } from "../src/lib/team-profiles.mjs";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const base = "https://redpropulsion.it";
const routes = ["/", "/team", "/partners", "/faq", "/contacts", "/projects", "/departments"];
const sitemap = readFileSync("out/sitemap.xml", "utf8");

for (const route of routes) {
  const file = route === "/" ? "index.html" : `${route.slice(1)}.html`;
  const html = readFileSync(join("out", file), "utf8");
  const canonical = route === "/" ? base : `${base}${route === "/team" ? "/projects" : route}`;
  assert.ok(html.includes(`<link rel="canonical" href="${canonical}"/>`), `${file}: canonical mancante o errato`);
  const placeholder = route === "/team" || route === "/departments";
  if (placeholder) {
    assert.ok(html.includes('content="noindex, follow"'), `${route}: il segnaposto deve essere escluso dall'indicizzazione`);
    assert.ok(!sitemap.includes(`<loc>${base}${route}</loc>`), `${route}: segnaposto presente nella sitemap`);
  } else assert.ok(sitemap.includes(`<loc>${canonical}</loc>`), `${route}: rotta assente dalla sitemap`);
}

const team = JSON.parse(readFileSync("src/content/team_page.json", "utf8"));
const members = [...team.board.members, ...team.departments.flatMap((department) => department.members)];
for (const member of members.filter((person) => person.imgAvail || person.imgSrc)) {
  const source = getProfilePicture(member);
  if (!/^https?:/.test(source)) assert.ok(existsSync(join("out", source.replace(/^\//, ""))), `Foto mancante: ${source}`);
}

const variants = JSON.parse(readFileSync("src/lib/image-variants.json", "utf8"));
for (const images of Object.values(variants)) {
  for (const image of images) assert.ok(existsSync(join("out", image.src)), `Variante mancante: ${image.src}`);
}

const projects = JSON.parse(readFileSync("src/content/projects_page.json", "utf8"));
const projectsHtml = readFileSync("out/projects.html", "utf8");
for (const project of projects.projects) {
  assert.ok(existsSync(join("out", project.image.src)), `Patch mancante: ${project.title}`);
  const links = [...projectsHtml.matchAll(/<a\b([^>]*)>/g)].map(match => attributes(match[1]));
  const link = links.find(link => link.href === project.applicationUrl);
  assert.ok(link, `Link al modulo mancante: ${project.title}`);
  assert.equal(link.target, "_blank", `Target del modulo errato: ${project.title}`);
  assert.ok(link.rel?.split(/\s+/).includes("noopener"), `Protezione del modulo mancante: ${project.title}`);
}
const teamHtml = readFileSync("out/team.html", "utf8");
const refresh = [...teamHtml.matchAll(/<meta\b([^>]*)>/g)].map(match => attributes(match[1])).find(meta => meta["http-equiv"] === "refresh");
assert.ok(refresh && /(?:^|;)\s*url=\/projects$/i.test(refresh.content), "La vecchia pagina Team deve reindirizzare a /projects");
assert.ok(!teamHtml.includes("boardMembers") && !teamHtml.includes("Consiglio Direttivo"), "La vecchia pagina Team non deve esporre il contenuto");
for (const member of members) {
  const fullName = `${member.firstName} ${member.lastName ?? ""}`.trim();
  if (member.lastName) assert.ok(!teamHtml.includes(fullName), `Nome del team esposto: ${fullName}`);
}
for (const route of routes) {
  const html = readFileSync(join("out", route === "/" ? "index.html" : `${route.slice(1)}.html`), "utf8");
  for (const match of html.matchAll(/<a\b([^>]*)>/g)) assert.notEqual(attributes(match[1]).href, "/team", `${route}: link pubblico alla vecchia sezione Team`);
}
function attributes(source) {
  return Object.fromEntries([...source.matchAll(/([\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map(match => [match[1], (match[2] ?? match[3]).replaceAll("&amp;", "&").replaceAll("&quot;", '"')]));
}
console.log(`Export verificato: ${routes.length} rotte, immagini, moduli e redirect Team.`);
