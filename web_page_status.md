# Red Propulsion | Stato tecnico e architettura

Ultimo aggiornamento: 30 settembre 2026. Questo documento descrive il codice presente nella repository; le istruzioni operative sono nel README.

## 1. Stack e distribuzione

- Next.js 16.3.7, App Router; React e React DOM 19.3.0.
- TypeScript 6.0.3 con `strict`, Tailwind CSS 4.3.3, Lucide React, React Markdown e Swiper 14.3.0.
- Node.js 24 LTS per sviluppo e CI. Versioni puntuali e lock delle dipendenze sono in `package.json` e `package-lock.json`.
- `output: "export"` produce `out/`; GitHub Pages serve i file statici sul dominio definito in `public/CNAME`.
- Le immagini non richiedono un server Next: `images.unoptimized` è attivo; Sharp prepara varianti WebP prima della build.
- L’anteprima `npm start` serve l’export statico. `next start` non è compatibile con questa configurazione.

## 2. Routing

Le pagine pubbliche sono Home (`/`), Progetti (`/projects`), Partners (`/partners`), FAQ (`/faq`) e Contatti (`/contacts`). Il layout globale include Navbar, Footer e StarsBackground, oltre ai metadata di fallback.

`[slug]/page.tsx` genera le rotte previste dai contenuti con `generateStaticParams` e risolve i parametri asincroni di Next.js 16. `/departments` è attualmente una pagina in costruzione: resta accessibile ma è noindex ed esclusa dalla sitemap. La sitemap è generata staticamente.

`/team` reindirizza a `/projects`, ha canonical Progetti e noindex. La precedente interfaccia è conservata in `TeamPage.tsx`, `TeamTabs.tsx` e `TeamCard.tsx`, con JSON e foto. Non viene montata dalla rotta pubblica. I file in `public/` restano pubblici e non sono protetti dal redirect.

## 3. Contenuti e CMS

I 10 file JSON in `src/content/` separano i contenuti dal rendering. `.pages.yml` configura Pages CMS. Il sottotitolo della landing e le FAQ usano testo semplice; footer, sezioni testuali e corpi delle schede usano Markdown. Non viene eseguito HTML grezzo.

`Block.tsx` supporta `text_section`, `cards_section` e `bento_section`. `LazyCardsSection` separa Swiper in un chunk caricato quando serve il carosello, mantenendo il rendering server delle schede. Bento rende al massimo due immagini; il limite è esplicito anche nel CMS e nella validazione.

Progetti usa `projects_page.json` con patch, descrizione, ruoli, posti e link ai moduli. `validateProjects` controlla i campi obbligatori anche prima del rendering. `check:content` controlla struttura dei blocchi, URL espliciti, esistenza delle immagini locali e contratto dei progetti prima della build. Non è uno schema completo per ogni campo storico del Team e non verifica la disponibilità degli URL remoti.

## 4. Interazioni e prestazioni

La Navbar usa listener di scroll passivo e aggiorna lo stato solo al cambio delle soglie. Il menu mobile gestisce Escape, focus, blocco dello scroll e contenuto inerte; rispetta i click modificati e cancella le navigazioni ritardate quando sostituite o al dismount. La restituzione del focus evita il pulsante nascosto al passaggio desktop.

ScrollReveal usa IntersectionObserver, mantiene la soglia ordinaria del 15% e gestisce i blocchi troppo alti per raggiungerla. Le preferenze di movimento ridotto sono considerate dal componente e dal CSS. StarsBackground sincronizza l’animazione con requestAnimationFrame: non rappresenta una garanzia di 60 FPS su ogni dispositivo.

`ResponsiveImage` usa il manifest `src/lib/image-variants.json`. Sharp genera varianti in `public/optimized/`, applica l’orientamento EXIF e conserva gli originali. I preset seguono l’uso delle immagini nei contenuti. Gli assets importati sono 48 file originali; i raster non usati in `public/assets/` non generano copie.

Il CSS mantiene scrollbar nascoste e indicatori di focus. La toolbar di sviluppo Next è disabilitata. Non è stato modificato il design nell’intervento tecnico.

## 5. Controlli e limiti

La CI esegue lint, generazione dei tipi e controllo TypeScript, test di validazione, build con controlli TypeScript e contenuti, quindi verifica l’export. Il lint è separato dalla build, come previsto da Next.js 16. Le pull request verso main sono controllate senza pubblicazione. Solo main può pubblicare; i permessi di deployment sono assegnati al relativo job.

Il controllo dell’export verifica canonical, sitemap/noindex, foto e varianti, collegamenti HTML ai moduli e destinazione del redirect Team. I test coprono posti invalidi, URL non consentiti, campi mancanti e titoli duplicati nei progetti.

Le verifiche automatiche non certificano conformità WCAG, prestazioni costanti, servizi esterni né tutti i dispositivi fisici. Le prove responsive nel browser verificano viewport simulati; ulteriori modifiche a contenuti e componenti richiedono una nuova verifica.

### Verifica locale dell’audit tecnico del 30 settembre 2026, prima degli aggiornamenti delle librerie

Lint, TypeScript, 9 test di validazione, controllo dei 10 JSON, build ed export delle 7 rotte completati con successo. Provate sei pagine a 320, 390, 768, 1024, 1280 e 1920 px: nessun overflow orizzontale rilevato e nessun errore in console. Verificati apertura delle schede, menu/Escape, annullamento della navigazione in attesa, sblocco al passaggio desktop, scroll della home e redirect Team.

L’anteprima restituisce 200 sulle rotte previste, 404 sulle rotte inesistenti, HEAD senza corpo e 405 sui metodi non consentiti. La build indica 116 kB di First Load JS per la home, rispetto ai 179 kB rilevati prima dell’isolamento di Swiper. È una misura della build, non un tempo di caricamento su rete reale. Il workflow è stato controllato localmente, ma deve ancora essere eseguito su GitHub.

### Aggiornamento delle librerie del 30 settembre 2026

Aggiornati framework, React, Tailwind, Swiper, strumenti e tipi alle versioni compatibili indicate in `docs/dependencies.md`. La build ora usa Turbopack; ESLint usa la configurazione flat nativa. Il layout conserva il comportamento precedente dello scroll durante la navigazione tramite `data-scroll-behavior="smooth"`. Le stelle vengono generate dopo l’idratazione nel successivo frame, con cleanup del callback. TypeScript usa `react-jsx` e include i tipi di sviluppo richiesti da Next.js 16.

Lint, TypeScript, 9 test, controllo dei contenuti, build ed export completati con successo dopo l’aggiornamento. Audit npm: zero vulnerabilità segnalate. Riprovate sei pagine a sei larghezze, da 320 a 1920 px, caricando ogni pagina nel viewport scelto: nessun overflow orizzontale. Verificate navigazione mobile e desktop, schede Progetti e FAQ da tastiera; nessun errore in console. Swiper è stato provato anche nel rendering server con i quattro moduli utilizzati; nessuna pagina pubblica corrente contiene un carosello, quindi resta da riprovarlo nel browser quando sarà usato nei contenuti.

Next.js 16 non stampa più la metrica First Load JS: i numeri del paragrafo precedente riguardano la build con Next.js 15 e non descrivono la build attuale. La verifica locale non equivale all’esecuzione del workflow su GitHub né a una certificazione di tutti i dispositivi fisici.

**Sicurezza in attesa di patch:** il comunicato Next.js aggiornato annuncia 16.3.8 e 15.5.27 per le nuove correzioni del 30 settembre e chiarisce che 16.3.7 non le include. Alle 13:32 UTC Next.js 16.3.8 non risulta pubblicato su npm. Ricontrollare prima del prossimo deployment e aggiornare framework e preset insieme quando disponibile; l’audit npm a zero non copre ancora questo annuncio. I dettagli e il riferimento ufficiale sono in `docs/dependencies.md`.

## Aggiornamento previsto della sezione Team

Team è momentaneamente oscurata al pubblico e verrà riaggiornata dopo il censimento di ottobre 2026. Componenti, contenuti e foto sono conservati. Stato e procedura di ripristino: [docs/team-status.md](docs/team-status.md). La struttura e le regole condivise del codice sono descritte in [docs/architecture.md](docs/architecture.md).

## Fotografie della home — 30 settembre 2026

La nostra storia usa una nuova foto di laboratorio da assets e una galleria manuale di otto fotografie. La galleria supporta touch, controlli e tastiera, senza autoplay, con foto verticali intere e varianti responsive. Testo, landing e statistiche sono conservati.
