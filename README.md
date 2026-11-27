# Red Propulsion

Sito dell'associazione studentesca Red Propulsion. Next.js 16 (App Router), React 19, TypeScript e Tailwind CSS 4. La build produce un export statico in `out/`, pubblicato su GitHub Pages.

## Sviluppo locale

Richiede Node.js 24 LTS (`.nvmrc`, `engines` in `package.json` e CI).

```bash
npm ci
npm run dev
```

Apri <http://localhost:3000>. Prima di pubblicare:

```bash
npm run lint
npm run typecheck
npm run build
```

Next.js 16 non esegue ESLint durante la build: `npm run lint` resta un controllo separato. `npm run typecheck` genera prima i tipi delle rotte con `next typegen`.

## Struttura

- `src/app/`: rotte, layout, metadata e sitemap.
- `src/components/`: presentazione e interazioni; componenti server salvo dove servono stato o API del browser.
- `src/content/`: contenuti JSON, modificabili anche con Pages CMS.
- `src/lib/`: regole condivise, tipi e manifest delle immagini.
- `scripts/prepare-images.mjs`: generazione delle varianti WebP.
- `public/`: originali, varianti generate, font e file statici.
- `.pages.yml`: schema dei contenuti per Pages CMS.
- `.github/workflows/nextjs.yml`: lint, typecheck, build e pubblicazione su `main`.

Le rotte pubbliche sono `/`, `/projects`, `/partners`, `/faq` e `/contacts`. `/departments` resta una pagina in costruzione, esclusa dall'indicizzazione. `/team` reindirizza a `/projects`, usa il canonical di Progetti ed è escluso da sitemap e indicizzazione; componenti, JSON e foto sono conservati per un ripristino futuro. I file in `public/`, comprese le foto, restano raggiungibili: il redirect non è un controllo di accesso agli asset.

Progetti legge testi, ruoli, posti e moduli da `src/content/projects_page.json`, modificabile con Pages CMS. Il campo `applicationsOpen` controlla il collegamento al modulo e la visualizzazione dei posti: quando è `false`, il sito mostra “Candidature chiuse” e non pubblica il link.

La home e le pagine dinamiche usano i blocchi `text_section`, `cards_section` e `bento_section` definiti in `src/components/Block.tsx`. I percorsi delle foto Team sono centralizzati in `src/lib/team-profiles.mjs`.

## Convenzioni dei contenuti

- I progetti richiedono testi non vuoti, patch locale con testo alternativo e dimensioni intere positive, URL di candidatura HTTP(S) e almeno un ruolo con un numero intero positivo di posti. Titoli di progetti e ruoli non possono essere duplicati nello stesso elenco.
- `bento_section` accetta al massimo due immagini: il limite è allineato tra CMS e componente.
- Sottotitolo della landing, risposte FAQ e testi dei progetti sono testo semplice. Footer, sezioni testuali e corpi delle schede sono Markdown, renderizzato da `RichText`; l'HTML grezzo non viene eseguito.
- I percorsi delle immagini locali iniziano con `/` e devono corrispondere a un file presente in `public/`.
- Per le schede, il pulsante usa il campo `url`.

## Immagini e font

`next.config.ts` imposta `output: "export"` e disabilita l'ottimizzazione server delle immagini. In fase di build `scripts/prepare-images.mjs` genera varianti WebP in `public/optimized/` e il manifest `src/lib/image-variants.json`, usato da `ResponsiveImage` per costruire `srcSet`; senza variante viene usato l'originale. La qualità è 82 per le fotografie e 90 per le patch SVG dei progetti. Le larghezze sono 640/1280/1920 per foto e banner, 160/400/800 per profili e placeholder, 96/320 per loghi e altre immagini, 190/380/570 per le patch. Le varianti non ingrandiscono gli originali e tengono conto dell'orientamento EXIF.

Non eliminare gli originali. Dopo aver aggiunto o modificato immagini, rieseguire la build oppure `node scripts/prepare-images.mjs` per aggiornare manifest e varianti. I risultati sono memorizzati in `.next/cache/image-preparation.json`, così le varianti invariate vengono riutilizzate. Evitare due raster con lo stesso percorso e nome base ma estensioni diverse.

Orbitron e Roboto Condensed sono distribuiti localmente in WOFF2, con le licenze SIL Open Font License in `public/fonts/`; `FontPreloads` gestisce i preload dei subset latini.

## Pubblicazione

La CI verifica le pull request e pubblica solo i push su `main` o le esecuzioni manuali su `main`: installa con `npm ci`, esegue lint, typecheck e build. Il dominio è specificato in `public/CNAME`.

## Manutenzione delle dipendenze

Next.js ed `eslint-config-next` devono restare alla stessa versione, così come React e React DOM. TypeScript è fissato a `~6.0.3`, ESLint alla serie 9 e i tipi Node alla major 24. Le versioni effettive sono registrate in `package-lock.json`.

## Fotografie della home

La sezione “La nostra storia” usa una foto fissa e una galleria manuale di otto foto da `public/assets/`. I dati sono in `index_page.json`: `imageAlt` descrive la foto principale; `gallery` contiene `src`, `alt`, `position` opzionale e `fit` (`cover` o `contain`). Le foto verticali usano `contain` per conservare il soggetto intero. La galleria supporta scorrimento touch, frecce e tastiera senza autoplay, con rispetto del movimento ridotto. Le foto ricevono varianti responsive come le altre immagini Bento; gli originali rimangono conservati.

## Team

La sezione Team è temporaneamente oscurata in attesa del censimento. Per ripristinarla: aggiornare `team_page.json` e lo schema CMS con membri, ruoli e struttura verificati; controllare foto e link LinkedIn, usando `imgSrc` esplicito per i nuovi file; verificare componenti e filtri; riattivare la rotta `/team` con layout, canonical, robots e sitemap coerenti; aggiornare la navigazione secondo la decisione del team. `TeamPage.tsx`, `TeamTabs.tsx`, `TeamCard.tsx`, `src/lib/team-types.ts`, `src/lib/team-profiles.mjs`, il JSON e le foto vanno conservati.
