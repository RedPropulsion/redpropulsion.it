import test from "node:test";
import assert from "node:assert/strict";
import { validateContentBlock } from "../src/lib/content-validation.mjs";
import { getProfilePicture } from "../src/lib/team-profiles.mjs";

test("blocchi incompleti e tipi sconosciuti producono errori contestuali", () => {
  for (const block of [null, { type: "unknown" }, { type: "text_section", title: "Titolo", body: " " }, { type: "cards_section", cards: [null] }]) {
    assert.throws(() => validateContentBlock(block, "pagina.sections[0]"), /pagina\.sections\[0\]/);
  }
});
test("Bento rifiuta immagini vuote o oltre il limite del componente", () => {
  for (const images of [[""], ["/a", "/b", "/c"]]) {
    assert.throws(() => validateContentBlock({ type: "bento_section", title: "Titolo", text: "Testo", images }), /images/);
  }
});
test("accetta i tre tipi di blocco previsti dal CMS", () => {
  for (const block of [
    { type: "text_section", title: "Titolo", body: "Testo" },
    { type: "bento_section", title: "Titolo", text: "Testo", images: ["/foto.webp"] },
    { type: "cards_section", cards: [{ title: "Titolo", body: "Testo", button: { title: "Apri", url: "/projects" } }] },
  ]) validateContentBlock(block);
});
test("foto Team: percorso esplicito, placeholder e normalizzazione degli accenti", () => {
  assert.equal(getProfilePicture({ imgSrc: " /assets/foto.webp ", imgAvail: true }), "/assets/foto.webp");
  assert.equal(getProfilePicture({ firstName: "Mario" }), "/placeholderRED.webp");
  assert.equal(getProfilePicture({ firstName: "Nicolò", lastName: "D’Angelo", imgAvail: true }), "/profilePictures/25-26/NicoloD’Angelo.webp");
  assert.equal(getProfilePicture({ firstName: "Éva", lastName: "D'Amico", imgAvail: true }), "/profilePictures/25-26/EvaDAmico.webp");
});

test("galleria rifiuta foto incomplete, duplicate e ritagli non supportati", () => {
  const block = { type: "bento_section", title: "Titolo", text: "Testo", images: [] };
  for (const gallery of [[], [{ src: "/foto.webp" }], [{ src: "/foto.webp", alt: "Foto", fit: "stretch" }], [{ src: "/foto.webp", alt: "Foto" }, { src: "/foto.webp", alt: "Duplicata" }]]) {
    assert.throws(() => validateContentBlock({ ...block, gallery }), /gallery/);
  }
});
