export function validateProjects(content, label = "projects_page.json") {
  const fail = (path, message) => { throw new Error(`${label}.${path}: ${message}`); };
  const text = (value, path) => {
    if (typeof value !== "string" || !value.trim()) fail(path, "testo obbligatorio");
  };
  text(content?.title, "title");
  text(content?.description, "description");
  if (!Array.isArray(content?.projects)) fail("projects", "lista obbligatoria");
  const titles = new Set();
  content.projects.forEach((project, index) => {
    const path = `projects[${index}]`;
    for (const key of ["tag", "title", "tagline", "description", "applicationLabel", "applicationNote"]) text(project?.[key], `${path}.${key}`);
    if (titles.has(project.title)) fail(`${path}.title`, "titolo duplicato");
    titles.add(project.title);
    text(project.image?.src, `${path}.image.src`);
    text(project.image?.alt, `${path}.image.alt`);
    if (!/^\/(?!\/)/.test(project.image.src)) fail(`${path}.image.src`, "usare un percorso locale assoluto");
    for (const key of ["width", "height"]) {
      if (!Number.isInteger(project.image[key]) || project.image[key] <= 0) fail(`${path}.image.${key}`, "intero positivo obbligatorio");
    }
    text(project.applicationUrl, `${path}.applicationUrl`);
    let application;
    try { application = new URL(project.applicationUrl); } catch { fail(`${path}.applicationUrl`, "URL non valido"); }
    if (!["https:", "http:"].includes(application.protocol)) fail(`${path}.applicationUrl`, "URL HTTP(S) obbligatorio");
    if (!Array.isArray(project.roles) || !project.roles.length) fail(`${path}.roles`, "almeno un ruolo obbligatorio");
    const roles = new Set();
    project.roles.forEach((role, roleIndex) => {
      const rolePath = `${path}.roles[${roleIndex}]`;
      text(role?.title, `${rolePath}.title`);
      text(role?.description, `${rolePath}.description`);
      if (roles.has(role.title)) fail(`${rolePath}.title`, "ruolo duplicato");
      roles.add(role.title);
      if (!Number.isInteger(role.positions) || role.positions <= 0) fail(`${rolePath}.positions`, "intero positivo obbligatorio");
    });
  });
}

/** Shared schema for CMS blocks, used by rendering and prebuild checks. */
export function validateContentBlock(content, label = "block") {
  const fail = (path, message) => { throw new Error(`${label}.${path}: ${message}`); };
  const text = (value, path) => {
    if (typeof value !== "string" || !value.trim()) fail(path, "testo obbligatorio");
  };
  if (!content || typeof content !== "object") fail("type", "blocco obbligatorio");
  switch (content.type) {
    case "text_section":
      text(content.title, "title");
      text(content.body, "body");
      break;
    case "cards_section":
      if (!Array.isArray(content.cards)) fail("cards", "lista obbligatoria");
      content.cards.forEach((card, i) => {
        for (const key of ["title", "body"]) text(card?.[key], `cards[${i}].${key}`);
        text(card?.button?.title, `cards[${i}].button.title`);
        text(card?.button?.url, `cards[${i}].button.url`);
      });
      break;
    case "bento_section":
      text(content.title, "title");
      text(content.text, "text");
      if (!Array.isArray(content.images) || content.images.length > 2) fail("images", "massimo due percorsi immagine");
      content.images.forEach((image, i) => text(image, `images[${i}]`));
      if (content.imageAlt !== undefined) text(content.imageAlt, "imageAlt");
      if (content.gallery !== undefined) {
        if (!Array.isArray(content.gallery) || !content.gallery.length) fail("gallery", "lista non vuota obbligatoria");
        const sources = new Set();
        content.gallery.forEach((photo, i) => {
          text(photo?.src, `gallery[${i}].src`);
          text(photo?.alt, `gallery[${i}].alt`);
          if (photo.fit !== undefined && !["cover", "contain"].includes(photo.fit)) fail(`gallery[${i}].fit`, "usare cover o contain");
          if (photo.position !== undefined) text(photo.position, `gallery[${i}].position`);
          if (sources.has(photo.src)) fail(`gallery[${i}].src`, "fotografia duplicata");
          sources.add(photo.src);
        });
      }
      break;
    default:
      fail("type", "tipo di blocco non riconosciuto");
  }
}
