# Stato temporaneo della sezione Team

Aggiornato il 30 settembre 2026.

## Decisione e tempistiche

La sezione Team è momentaneamente oscurata al pubblico. **Dopo il censimento di ottobre 2026 verrà riaggiornata**, utilizzando i dati verificati sui membri, sui ruoli e sulla struttura del team.

Il ripristino avverrà dopo la verifica dei risultati del censimento; non è prevista una riattivazione automatica a una data precisa.

## Comportamento attuale

- La navigazione pubblica presenta Progetti.
- `/team` reindirizza a `/projects`, usa il canonical di Progetti e contiene `noindex`.
- Team è esclusa dalla sitemap e i suoi membri non sono renderizzati nella pagina pubblica.
- Componenti, JSON e foto esistenti sono conservati per l'aggiornamento successivo.

L'oscuramento riguarda la pagina e la navigazione: i file in `public/`, comprese le foto, rimangono raggiungibili tramite URL. Il redirect non costituisce un controllo di accesso ai file.

## Materiale conservato

- `src/content/team_page.json`: dati dei membri, board e dipartimenti.
- `src/components/TeamPage.tsx`, `TeamTabs.tsx`, `TeamCard.tsx`: pagina e componenti.
- `src/lib/team-types.ts`: tipi condivisi dei dati.
- `src/lib/team-profiles.mjs`: risoluzione centralizzata delle foto.
- `public/profilePictures/25-26/`: foto storiche; non eliminare gli originali.

## Aggiornamento dopo il censimento

1. Verificare membri attivi, nominativi, ruoli, responsabili, board e dipartimenti; aggiornare il JSON e lo schema CMS se cambia il modello dei dati.
2. Verificare immagini e link LinkedIn. Per le nuove foto usare `imgSrc` esplicito, evitando di attribuire i dati nuovi alla cartella storica `25-26`.
3. Verificare che componenti e filtri rappresentino correttamente la nuova struttura.
4. Ripristinare la pagina nella rotta `/team`; aggiornare anche il layout della rotta, canonical, robots e sitemap. Aggiornare la navigazione secondo la decisione del team.
5. Adattare `scripts/check-export.mjs`: attualmente verifica intenzionalmente il redirect, l'assenza dei nominativi e l'assenza dei link pubblici a Team.
6. Eseguire lint, controllo dei tipi, test, build e verifica dell'export. Verificare nel browser navigazione, tastiera e dispositivi mobili e desktop.
7. Aggiornare questo documento, README e `web_page_status.md` quando la pagina torna pubblica.

Progetti mantiene contenuti e moduli propri; l'aggiornamento Team richiede una decisione esplicita sulla navigazione e non comporta la cancellazione dei progetti.
