# Manutenzione delle dipendenze

Verifica effettuata il 30 settembre 2026 sul registro npm, confrontando requisiti delle versioni e documentazione ufficiale. I numeri nella colonna «prima» sono le versioni installate prima di questo intervento. `package-lock.json` registra le versioni effettivamente risolte.

## Versioni scelte

| Libreria | Prima | Dopo | Motivo |
| --- | --- | --- | --- |
| Next.js | 15.5.26 | 16.3.7 | Passaggio alla linea LTS attiva e alla stabile disponibile su npm; export statico verificato. La patch di sicurezza 16.3.8 annunciata oggi non è ancora pubblicata. |
| eslint-config-next | 15.5.26 | 16.3.7 | Stessa versione del framework e configurazione flat nativa. |
| React / React DOM | 19.1.9 | 19.3.0 | Stessa versione per entrambi, compatibile con Next.js e con le librerie usate. |
| Tailwind CSS / @tailwindcss/postcss | 4.1.11 | 4.3.3 | Correzioni del compilatore CSS e plugin allineato. La grafica corrente è stata ricontrollata. |
| Swiper | 12.2.0 | 14.3.0 | Correzioni, tipi più accurati e rimozione delle dipendenze runtime; le API usate restano compatibili. |
| TypeScript | 5.8.3 | 6.0.3 | Ultima versione della linea con API del compilatore compatibile con il lint corrente. |
| ESLint | 9.28.0 | 9.39.5 | Ultima versione 9 compatibile con i plugin import e accessibilità della configurazione Next. |
| eslint-config-prettier | 10.1.5 | 10.1.8 | Aggiornamento compatibile del preset. |
| Prettier | 3.5.3 | 3.9.9 | Correzioni compatibili nella stessa major; nessuna riformattazione generale del progetto. |
| @types/node | 20.17.57 | 24.19.0 | Tipi allineati alla major Node 24 usata localmente e in CI. |
| @types/react / @types/react-dom | 19.1.6 / 19.1.5 | 19.3.0 / 19.3.0 | Tipi allineati a React 19.3. |
| PostCSS, tramite override | 8.5.28 | 8.5.28 | Già aggiornato nel lockfile; portato anche il limite minimo dell’override da ^8.5.23 a ^8.5.28. |
| react-markdown | 10.1.0 | 10.1.0 | Già aggiornato alla release corrente verificata. |
| Sharp | 0.35.5 | 0.35.5 | Già aggiornato alla release corrente verificata. |
| lucide-react | 0.514.0 | 0.514.0 | La candidata 1.49.0 rimuove Github, Instagram e Linkedin e modifica alcuni SVG. Conservata la versione corrente per mantenere icone e grafica. |
| @eslint/eslintrc, dipendenza diretta | 3.3.1 | Non più necessaria direttamente | Rimosso l’adattatore FlatCompat dalla configurazione; il pacchetto può comunque esistere come dipendenza transitiva di ESLint. |

## Versioni rinviate

- **Next.js 16.3.8 / eslint-config-next 16.3.8**: patch di sicurezza annunciata per il 30 settembre. La verifica diretta su npm alle 13:32 UTC ha restituito 404 per Next.js 16.3.8; `latest` è ancora 16.3.7. Il comunicato aggiornato chiarisce che 16.3.7 contiene una correzione di bug e non le nuove correzioni di sicurezza. Ricontrollare la pubblicazione prima del prossimo deployment e aggiornare insieme framework e preset ESLint.
- **ESLint 10.11.0**: i peer di `eslint-plugin-import` e `eslint-plugin-jsx-a11y` non includono ESLint 10. Non forzare l’installazione con `--force` o `--legacy-peer-deps`. ESLint 9.39.5 è deprecato e va sostituito quando l’intera configurazione sarà compatibile; la versione scelta mantiene oggi i controlli funzionanti.
- **TypeScript 7.0.2**: manca ancora l’API programmatica stabile richiesta da alcuni strumenti e il parser TypeScript del lint richiede una versione inferiore a 6.1. La serie 6.0 è fissata con `~6.0.3` per rispettare quel limite.
- **Lucide 1.49.0**: richiede una scelta esplicita sulle icone dei brand e sui disegni cambiati. La prova della candidata ha rilevato errori TypeScript sugli import dei social; tutti gli SVG attuali sono stati conservati ripristinando 0.514.0.
- **Tipi Node 26**: il progetto usa Node 24 LTS, quindi i tipi seguono quella major.

## Adeguamenti del codice e della CI

- ESLint importa direttamente i preset flat di Next.js, senza FlatCompat.
- La generazione delle stelle è schedulata con requestAnimationFrame dopo l’idratazione e cancellata al dismount, evitando gli aggiornamenti sincroni segnalati dal nuovo preset React.
- Il layout dichiara `data-scroll-behavior="smooth"` per conservare lo scroll istantaneo nelle navigazioni e quello morbido nei collegamenti interni.
- Next.js 16 richiede `jsx: "react-jsx"`; i tipi di sviluppo sono inclusi in TypeScript.
- `npm run typecheck` esegue `next typegen` prima del compilatore, anche su checkout nuovi. La CI esegue questo comando oltre al lint: Next.js 16 non esegue ESLint durante `next build`.
- Build e sviluppo usano Turbopack. L’export resta statico e viene pubblicato con lo stesso workflow e dominio.
- Il nuovo `next dev` ha generato `AGENTS.md` e `CLAUDE.md`, conservati nella repository: indicano la documentazione abbinata alla versione installata. Non modificano il sito.

## Verifiche e limiti

Completati lint, generazione dei tipi, TypeScript, 9 test, controllo dei 10 JSON, build ed export delle 7 rotte. Audit npm: zero vulnerabilità segnalate al momento della verifica. Il risultato non comprende ancora le nove vulnerabilità annunciate da Next.js, le cui patch e advisory completi sono in attesa di pubblicazione; non equivale quindi a una conferma che non restino problemi di sicurezza.

Provate le sei pagine correnti a 320, 390, 768, 1024, 1280 e 1920 px. Verificate navigazione mobile e desktop, schede e FAQ da tastiera; nessun overflow orizzontale o errore in console rilevato. Le icone sono quelle originali. Swiper 14 è compatibile con gli import e le opzioni del componente e con il rendering server; poiché i contenuti pubblici non usano attualmente un carosello, la prova interattiva resta necessaria quando ne viene inserito uno.

Verificato anche `next dev` su una porta locale temporanea con navigazione mobile e FAQ da tastiera, senza errori nel browser o nel terminale. Il server temporaneo è stato fermato; l’anteprima dell’export resta disponibile sulla porta 3000.

Next.js 16 e Swiper 14 richiedono browser moderni: Safari/iOS 16.4 o superiore e versioni recenti di Chrome, Edge e Firefox. Questo intervento non costituisce una verifica su browser o dispositivi fisici diversi da quello utilizzato.

## Riferimenti ufficiali

- [Migrazione a Next.js 16](https://nextjs.org/docs/app/guides/upgrading/version-16)
- [Annuncio aggiornato della release di sicurezza di settembre](https://nextjs.org/blog/upcoming-nextjs-security-release-september-2026)
- [React 19.3](https://react.dev/blog/2026/09/09/react-19-3)
- [TypeScript 7 e compatibilità dell’API](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/)
- [Changelog Swiper e migrazione dalla versione 12](https://swiperjs.com/changelog)
- [Release Tailwind CSS 4.3.3](https://github.com/tailwindlabs/tailwindcss/releases/tag/v4.3.3)
