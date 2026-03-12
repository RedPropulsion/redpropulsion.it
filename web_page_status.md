# Red Propulsion | Website Status & Architecture

Questo documento fornisce una specifica tecnica dettagliata dell'architettura e dello stato attuale del progetto Red Propulsion. Descrive i paradigmi di sviluppo, la struttura del codice e le ottimizzazioni implementate per garantire performance e scalabilità.

---

## 1. Stack Tecnologico e Dipendenze Core

L'applicazione è sviluppata utilizzando le versioni più recenti del framework Next.js e della libreria React, adottando uno standard di sviluppo orientato alla tipizzazione rigorosa.

- **Framework**: Next.js 15.3.3 (utilizzando App Router e Turbopack)
- **Runtime**: React 19.0.0
- **Linguaggio**: TypeScript (Configurazione strict)
- **Design System**: Tailwind CSS (Utility-first con estensioni custom per il brand)
- **Libreria Icone**: Lucide React
- **Motore di Build**: Configurato per Static Site Generation (SSG) tramite la direttiva `output: "export"` in `next.config.ts`.
- **Inibizione Ottimizzazione Immagini**: `images: { unoptimized: true }` per compatibilità con l'esportazione statica senza server Node.js attivo.

---

## 2. Architettura del Routing e Gestione delle Pagine

L'organizzazione delle rotte segue le convenzioni di Next.js 15, con una distinzione tra pagine statiche predefinite e rotte dinamiche.

### Root Directory (src/app)
- **layout.tsx**: Root layout globale. Gestisce il mounting di `Navbar`, `Footer`, e dello sfondo animato `StarsBackground`. Definisce i Metadata SEO di fallback (titolo, descrizione, parole chiave).
- **page.tsx**: Pagina Home. Carica i dati da `index_page.json` e monta le sezioni principali (Hero, Stats, Featured Sections).
- **sitemap.ts**: Endpoint per la generazione della sitemap XML. Configurato con `export const dynamic = "force-static"` per permettere la generazione durante la compilazione statica.

### Rotte Dinamiche ([slug])
- Utilizza `generateStaticParams` per pre-renderizzare le pagine definite in `projects_page.json`, `sponsors_page.json`, ecc.
- Implementa la nuova gestione asincrona dei parametri di Next.js 15: il campo `params` deve essere gestito come una `Promise` e risolto tramite `await` all'interno di `Page` e `generateMetadata`.

### Sezioni Specializzate
- **team/**: Possiede un layout interno (`layout.tsx`) per permettere l'esportazione dei metadata SEO (Server-side) pur mantenendo la pagina principale (`page.tsx`) come Client Component per gestire gli stati interattivi dei tab Avionics.

---

## 3. Implementazione dei Componenti Strategici

I componenti sono stati ottimizzati per evitare problemi di idratazione (Hydration Mismatch) e per massimizzare l'efficienza di rendering.

### Navbar.tsx
- **Protezione Idratazione**: Le stringhe di telemetria casuali nel menu mobile sono generate all'interno di un `useEffect` post-montaggio per evitare discrepanze tra il codice generato sul server e quello eseguito sul client.
- **Performance**: Il monitoraggio dello scroll è ottimizzato per evitare ricalcoli inutili ed è sincronizzato con animazioni CSS smooth.

### TeamCard.tsx
- **Unique Filters**: Utilizza l'hook `useId` di React 19 per generare identificatori SVG unici per ogni card. Questo previene la collisione degli ID nel DOM quando più di 40 card sono visualizzate contemporaneamente.
- **Anti-Banding Solution**: Implementa un filtro SVG a turbolenza frattale (`feTurbulence`) e dither granulare per eliminare l'effetto banding nei gradienti scuri delle card.
- **Layout Flessibile**: Gestisce automaticamente tre stati di layout: Premium (Team Leader), Hero (Responsabili), e Compact (Membri regolari).

### StarsBackground.tsx
- **Parallasse Performante**: Il movimento delle stelle è gestito tramite `requestAnimationFrame`. Questo approccio garantisce 60 FPS costanti scaricando il calcolo dalla coda principale degli eventi verso il ciclo di rendering del browser.

---

## 4. Livello Dati (Content Layer)

La logica del sito è separata dal contenuto testuale tramite file JSON in `src/content/`. Questo permette aggiornamenti rapidi senza toccare il codice JSX/TSX.

- **Schema JSON**: Ogni pagina ha un file di configurazione con titoli, descrizioni e array di oggetti per le sezioni o i membri del team.
- **Validazione**: I componenti di blocco (`Block.tsx`) effettuano controlli basilari sui dati in ingresso per prevenire errori di rendering in caso di file JSON malformati.

---

## 5. Ottimizzazioni per la Produzione

Il progetto ha superato test rigorosi di compilazione e conformità agli standard web.

- **SEO Avanzata**: Implementazione di `robots.txt` e `sitemap.xml` dinamico per facilitare l'indicizzazione da parte di Google Search Console.
- **Accessibilità (A11y)**:
  - Inserimento di `aria-label` descrittivi per gli elementi interattivi.
  - Implementazione di `aria-expanded` negli elementi collassabili (FAQ e Mobile Menu).
  - Garanzia di conformità per gli screen reader.
- **Stato della Build**: Il progetto passa il comando `npm run build` con successo, generando una cartella `out/` pronta per il deployment su qualsiasi server per siti statici (GitHub Pages, Vercel, Netlify).
- **TypeScript Compliance**: Zero errori o avvisi di tipo nel codice sorgente, garantendo stabilità durante l'esecuzione.

---

Ultimo aggiornamento tecnico: 11 Marzo 2026
