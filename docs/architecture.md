# Struttura e responsabilità del codice

## Dove intervenire

| Cartella | Responsabilità |
| --- | --- |
| `src/app/` | Rotte App Router, composizione delle pagine, metadata, sitemap e stili globali. |
| `src/components/` | Presentazione e interazioni; aggiungere `use client` solo dove servono API del browser o stato React. |
| `src/content/` | Contenuti JSON modificabili anche tramite Pages CMS. |
| `src/lib/` | Regole condivise e tipi, senza dipendenze dai componenti di presentazione quando possibile. |
| `scripts/` | Preparazione immagini, validazione, test e anteprima dell'export statico. |
| `public/` | File serviti pubblicamente; originali e varianti generate. |
| `docs/` | Decisioni di manutenzione e procedure del progetto. |

La struttura attuale è sufficiente per le dimensioni del sito. Non serve spostare componenti solo per creare nuove cartelle: creare un modulo dedicato quando una funzionalità acquisisce più componenti e regole autonome.

## Contenuti e validazione

`src/lib/content-validation.mjs` definisce i contratti dei progetti e dei blocchi testuali, Bento e schede. Il formato MJS consente di usare le stesse regole in Next.js e negli script Node, senza compilazione aggiuntiva.

`Block.tsx` valida il contenuto prima del rendering e restringe il tipo TypeScript; le pagine devono soltanto passargli il blocco. `scripts/check-content.mjs` usa lo stesso schema e aggiunge i controlli che richiedono il filesystem, come l'esistenza delle immagini, e la verifica dei protocolli dei link.

Lo schema `.pages.yml` descrive i campi dell'editor: quando cambia un contratto, allineare schema CMS, validatore, tipi e test. Non duplicare la validazione nelle singole pagine.

Le regole delle foto Team sono condivise tra interfaccia e verifica dell'export in `team-profiles.mjs`; i tipi sono separati in `team-types.ts`, così non occorre importarli da un componente client.

## Rendering e stile

Le pagine e i componenti privi di interazioni rimangono componenti server. `LazyCardsSection` delimita il caricamento del carosello client. Contenuti semplici e Markdown mantengono contratti distinti; `RichText` centralizza il rendering Markdown.

Gli stili globali sono in `src/app/globals.css`, quelli del contenuto formattato in `src/app/styles/rich-content.css`. Non unificare intestazioni o composizioni diverse con un componente generico se richiede numerose eccezioni o cambia la grafica.

## Build e pubblicazione

1. `check:content` verifica i JSON.
2. `prepare-images.mjs` conserva gli originali e genera varianti e manifest.
3. `next build` produce l'export statico in `out/`.
4. `check:export` verifica il risultato effettivamente pubblicabile, inclusa la temporanea esclusione Team.

Lint, `typecheck` e test sono controlli distinti. La CI li esegue prima della pubblicazione. Non introdurre API o funzionalità che richiedono un server Next senza riconsiderare `output: "export"` e GitHub Pages.

## Documenti di riferimento

- [Stato Team e censimento ottobre 2026](team-status.md)
- [Versioni e manutenzione delle dipendenze](dependencies.md)
- [README e comandi operativi](../README.md)
- [Stato del sito](../web_page_status.md)
