# Verifica delle prestazioni — 30 settembre 2026

## Interventi applicati

### Font locali

Orbitron e Roboto Condensed vengono serviti dal sito, senza il precedente `@import` da Google Fonts. I file WOFF2 sono gli stessi distribuiti da Google Fonts: Orbitron v35 e Roboto Condensed v31, con gli intervalli di peso originali. I due subset latini pesano complessivamente 63.212 byte; il subset latino esteso di Roboto Condensed, 33.964 byte, viene richiesto soltanto per i caratteri che ne fanno parte. Sono conservate entrambe le licenze SIL Open Font License in `public/fonts/`.

`FontPreloads` usa l'API React `preload`, raccomandata dalla documentazione Next installata, per evitare hint duplicati durante rendering e navigazione. `font-display: swap`, famiglie, pesi e dimensioni restano invariati. Il beneficio riguarda l'eliminazione della richiesta al CSS remoto e delle connessioni esterne per i font, non una riduzione dichiarata dei tempi di caricamento su reti reali.

Font e licenze provengono dai domini ufficiali `fonts.gstatic.com` e dalla repository `google/fonts`; gli URL delle versioni sono ricostruibili dal foglio Google Fonts per le famiglie e gli intervalli di peso indicati.

### Cache della preparazione immagini

`scripts/prepare-images.mjs` salva i risultati in `.next/cache/image-preparation.json`, già incluso nella cache della CI. Prima di riutilizzare una variante verifica SHA-256 dell'originale, dimensione richiesta, qualità, impostazioni di compressione, versioni dei codec Sharp e SHA-256 del file generato. Se il file manca o cambia viene rigenerato. Un JSON di cache non valido viene ignorato e ricostruito.

Sul computer locale la preparazione con cache calda ha riutilizzato 85 varianti in circa 0,31 secondi. Verifica eseguita anche alterando temporaneamente una variante: 84 riutilizzate e quella alterata ricreata correttamente. Il manifest viene sempre riscritto dai contenuti correnti; la cache non modifica i contenuti pubblicati.

## JavaScript e animazioni

Prima di questi interventi i file JavaScript iniziali presenti nell'HTML della home ammontavano a 624.031 byte, circa 191.644 byte compressi con gzip locale; Progetti a 600.095 byte, circa 185.877 gzip. Questi valori comprendono il runtime condiviso Next/React e non sono una misura del traffico effettivo né del tempo di esecuzione. Le pagine condividono gran parte dei file, quindi una navigazione successiva può riutilizzarli dalla cache del browser.

Swiper è già in un chunk separato e la home corrente non contiene blocchi `cards_section`. Lo sfondo stellato aggiorna tre trasformazioni tramite `requestAnimationFrame` durante gli eventi di scroll e sospende le animazioni quando il documento è nascosto. Le sezioni usano `IntersectionObserver` e smettono di osservare dopo la comparsa. Non sono emersi motivi per aggiungere ulteriori librerie o riscrivere queste funzionalità.

## Verifiche successive utili

- Misurare LCP, INP e CLS sulla pubblicazione reale e su un dispositivo mobile: le misure locali non rappresentano una rete mobile.
- Verificare caching e compressione HTTP di GitHub Pages sui file effettivamente richiesti.
- Profilare blur e filtri grafici su dispositivi meno potenti prima di modificarli, poiché incidono sull'aspetto.

Vedere anche [ottimizzazione immagini](image-performance.md). Gli originali e i documenti del team rimangono conservati.
