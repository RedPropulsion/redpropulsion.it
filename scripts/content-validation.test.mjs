import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { validateProjects } from "../src/lib/content-validation.mjs";

const fixture = () => JSON.parse(readFileSync("src/content/projects_page.json", "utf8"));
test("i contenuti correnti dei progetti sono validi", () => validateProjects(fixture()));
for (const positions of [0, -1, 1.5, "3", null]) {
  test(`rifiuta posti non validi: ${positions}`, () => {
    const content = fixture();
    content.projects[0].roles[0].positions = positions;
    assert.throws(() => validateProjects(content), /roles\[0\].positions/);
  });
}
test("rifiuta URL eseguibili e incompleti", () => {
  for (const url of ["javascript:alert(1)", "forms.gle/example"]) {
    const content = fixture();
    content.projects[0].applicationUrl = url;
    assert.throws(() => validateProjects(content), /applicationUrl/);
  }
});
test("segnala immagini e ruoli incompleti", () => {
  const content = fixture();
  delete content.projects[0].image;
  assert.throws(() => validateProjects(content), /image.src/);
  const empty = fixture();
  empty.projects[0].roles = [];
  assert.throws(() => validateProjects(empty), /roles/);
});
test("rifiuta titoli duplicati usati come chiavi React", () => {
  const content = fixture();
  content.projects.push(structuredClone(content.projects[0]));
  assert.throws(() => validateProjects(content), /titolo duplicato/);
});
