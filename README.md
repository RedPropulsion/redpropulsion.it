# Red Propulsion

Sito dell'associazione studentesca Red Propulsion. È un progetto Next.js 16 con App Router, React 19, TypeScript e Tailwind CSS 4. La build produce file statici nella cartella `out/`, pubblicati su GitHub Pages.

## Sviluppo locale

Richiede Node.js 24 LTS (versione indicata anche in `.nvmrc` e in CI).

```bash
npm ci
npm run dev
```

Apri <http://localhost:3000>. Prima di pubblicare:

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run check:export
```

## Struttura

- `src/app/`: rotte, layout, metadata e sitemap.
- `src/components/`: componenti di presentazione e interazioni.
- `src/content/`: contenuti JSON; modificarli per aggiornare testi, membri, sponsor e FAQ.
- `public/`: immagini, icone e file statici.
- `.pages.yml`: schema dei contenuti per l'editor Pages CMS.
- `.github/workflows/nextjs.yml`: build e pubblicazione su GitHub Pages al push su `main`.

Le rotte pubbliche sono `/`, `/projects`, `/partners`, `/faq` e `/contacts`. `/departments` resta una pagina in costruzione. `/team` reindirizza a `/projects` ed è esclusa dalla sitemap e dall’indicizzazione.

Progetti legge testi, ruoli, posti e moduli da `src/content/projects_page.json`, modificabile tramite Pages CMS. La precedente pagina Team è conservata in `src/components/TeamPage.tsx`, insieme al JSON, ai componenti e alle foto originali, senza essere renderizzata nella rotta pubblica.

`public/assets/` contiene tutti i 48 file originali dell’archivio fornito il 29 settembre 2026. Le due patch SVG sono usate nella pagina Progetti; gli altri assets sono disponibili per uso futuro. La preparazione delle immagini elabora i raster di questa cartella solo quando referenziati nei contenuti JSON, evitando copie inutilizzate.

La home e le pagine dinamiche usano i blocchi `text_section`, `cards_section` e `bento_section` definiti in `src/components/Block.tsx`. Ogni blocco è validato durante la build. Per le schede, il collegamento del pulsante usa il campo `url`.

## Pubblicazione

La build prepara automaticamente copie WebP responsive in `public/optimized/`, mantenendo gli originali. Dopo un caricamento di immagini durante lo sviluppo, eseguire `node scripts/prepare-images.mjs`. `ResponsiveImage` usa le varianti disponibili e conserva il supporto per percorsi nuovi o remoti.

I titoli e le descrizioni di Contatti e Partners vengono letti dai rispettivi JSON. Le foto del team possono usare `imgSrc`; in sua assenza resta disponibile la convenzione dei nomi esistente. Le pagine con sezioni vuote restano visitabili, con `noindex`.

`next.config.ts` imposta `output: "export"` e disabilita l'ottimizzazione server delle immagini. Il workflow verifica anche le pull request verso `main`: installa con `npm ci`, esegue lint, test, build (comprensiva di verifica TypeScript, contenuti e immagini) e controllo dell’export. La pubblicazione di `out/` è limitata ai push su `main` e alle esecuzioni manuali su `main`. Il dominio è specificato in `public/CNAME`.

## Anteprima dell’export

Dopo `npm run build`, eseguire `npm start` oppure `npm run preview` e aprire <http://127.0.0.1:3000>. Il server locale serve `out/`, risolve anche rotte come `/projects` e restituisce la pagina 404 con stato HTTP 404. È un’anteprima locale, non un server di produzione. Impostare `PORT` per usare una porta diversa. Sviluppo e anteprima usano normalmente la stessa porta: fermarne uno prima di avviare l’altro. Next.js 16 usa cartelle distinte per build e sviluppo.

## Contratto dei contenuti

- `npm run check:content` verifica i 10 JSON: blocchi, link espliciti, immagini locali e campi dei progetti. Viene eseguito automaticamente prima di ogni build.
- I progetti richiedono testi non vuoti, patch locale con testo alternativo e dimensioni intere positive, URL di candidatura HTTP(S) e almeno un ruolo. Ogni ruolo richiede un numero intero positivo di posti. Titoli di progetti e ruoli non possono essere duplicati nello stesso elenco.
- `bento_section` accetta al massimo due immagini, come il componente attuale. Il limite vale sia nel CMS sia nel controllo dei contenuti.
- Sottotitolo della landing, risposte FAQ e testi dei progetti sono testo semplice. Corpo del footer, sezioni testuali e corpi delle schede sono Markdown, renderizzato da `RichText`. L’HTML grezzo non viene eseguito.
- I percorsi delle immagini locali iniziano con `/` e devono esistere sotto `public/`. I profili Team conservano anche la convenzione dei nomi e i vecchi handle LinkedIn, normalizzati da `TeamTabs`.
- La pagina Team conservata non viene renderizzata pubblicamente. Foto e altri file in `public/` rimangono raggiungibili: il redirect non è un controllo di accesso agli assets.

## Immagini e verifiche

`sharp` è una dipendenza di sviluppo diretta. La preparazione conserva gli originali e genera WebP a qualità 82: foto dei blocchi Bento e sfondi dei banner a 640/1280/1920 px; profili e placeholder a 160/400/800 px; loghi e altre immagini a 96/320 px. Non ingrandisce gli originali, considera l’orientamento EXIF e segnala collisioni tra nomi di output. Non usare due raster con stesso percorso e nome base ma estensioni diverse. Un’immagine raster destinata a una nuova posizione grande va inclusa nella relativa politica dello script.

`npm test` verifica i contratti dei contenuti e la risoluzione delle foto Team. `npm run check:export` controlla rotte, canonical, noindex/sitemap, immagini generate e profili, link effettivi ai moduli e redirect Team. Questi controlli non sostituiscono una prova nel browser né verificano la disponibilità dei servizi esterni.

## Manutenzione delle dipendenze

Versioni, motivazioni degli aggiornamenti e vincoli di compatibilità sono documentati in [docs/dependencies.md](docs/dependencies.md). Next.js ed `eslint-config-next` devono restare allineati; React e React DOM devono avere la stessa versione. `npm run typecheck` genera prima i tipi delle rotte con `next typegen`, così funziona anche su un checkout nuovo. Next.js 16 non esegue il lint durante la build: `npm run lint` resta un controllo distinto, obbligatorio in CI.

## Documentazione del progetto

- [Architettura e responsabilità del codice](docs/architecture.md).
- [Team temporaneamente oscurata e aggiornamento dopo il censimento di ottobre 2026](docs/team-status.md).
- [Dipendenze e vincoli di aggiornamento](docs/dependencies.md).

La validazione dei blocchi è condivisa tra rendering e prebuild in `src/lib/content-validation.mjs`. I percorsi delle foto Team sono centralizzati in `src/lib/team-profiles.mjs`, usato anche dal controllo dell'export.

## Fotografie della home

La sezione La nostra storia usa una foto fissa e una galleria manuale di otto foto da `public/assets/`. I dati sono in `index_page.json`: `imageAlt` descrive la foto principale; `gallery` contiene `src`, `alt`, `position` opzionale e `fit` (`cover` o `contain`). Le fotografie verticali usano `contain` per conservare il soggetto intero. La galleria supporta scorrimento touch, frecce e tastiera senza autoplay, con rispetto del movimento ridotto. Le foto della galleria ricevono varianti responsive come le altre fotografie Bento. Gli originali rimangono conservati.
