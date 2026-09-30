# Ottimizzazione immagini e caricamento

## Intervento del 30 settembre 2026

Le patch dei progetti erano SVG complessi da 460.047 e 443.389 byte, mostrati a 140–190 pixel. La pagina ora usa `ResponsiveImage` e varianti WebP trasparenti da 190, 380 e 570 pixel, scelte dal browser in base allo spazio disponibile e alla densità dello schermo. Gli SVG originali rimangono conservati.

| Risoluzione | Ignis e Fulgor | AMD | Totale |
| --- | ---: | ---: | ---: |
| Originali SVG | 460.047 B | 443.389 B | 903.436 B |
| 190 px | 10.084 B | 16.060 B | 26.144 B |
| 380 px | 25.834 B | 41.728 B | 67.562 B |
| 570 px | 43.492 B | 73.420 B | 116.912 B |

Riduzione del peso delle patch: circa 97% a 190 px, 93% a 380 px e 87% a 570 px. Sono misure dei file, non tempi di caricamento o Core Web Vitals su reti reali.

La qualità WebP delle patch è 90 per preservare testi e dettagli. La prima immagine viene caricata subito, la seconda mantiene il caricamento differito. Dimensioni, testi alternativi e disposizione sono conservati.

## Pipeline condivisa

`npm run build` esegue automaticamente `scripts/prepare-images.mjs`. Le fotografie erano già servite in WebP responsive: mantengono qualità 82, ora con maggiore sforzo di compressione (`effort: 6`), eseguito durante la build. Gli SVG vengono rasterizzati soltanto se sono immagini dei progetti; i loghi vettoriali semplici restano vettoriali.

Non eliminare gli originali. Dopo una modifica ai contenuti o alle immagini, rigenerare manifest e varianti e verificare `npm run check:export`. L'export statico non dispone di un servizio di ottimizzazione delle immagini al momento della richiesta.

## Altri controlli

- I font Google sono ora distribuiti localmente in WOFF2, con le relative licenze: caratteri e pesi restano quelli esistenti, con `display=swap` e preload dei due subset latini.
- Le immagini della galleria mantengono caricamento differito e varianti responsive.
- Il carosello Swiper è già separato dal caricamento principale tramite `LazyCardsSection`.
- Lo sfondo stellato aggiorna le trasformazioni durante lo scorrimento, senza un ciclo JavaScript continuo a pagina ferma.
- I file originali o non utilizzati presenti in `public/` non vengono tutti scaricati dal visitatore: il peso della cartella non coincide con il peso della pagina.

Caching e compressione HTTP vanno misurati sulla pubblicazione GitHub Pages; il server locale non rappresenta le condizioni della produzione.
