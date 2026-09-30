# Partners — aggiornamento 30 settembre 2026

La presenza dei nuovi partner deriva dai loghi forniti dall'utente in `public/assets/` e dalla lista nell'HTML di riferimento. I siti ufficiali servono a verificare identità e attività, non dimostrano da soli una sponsorizzazione.

La pagina conserva Molex e aggiunge i cinque partner mancanti. I loghi adatti al fondo scuro sono presentati senza pannello bianco. Su richiesta dell’utente anche RedAI e Alhof sono mostrati senza pannello: RedAI mantiene il logo rosso/grigio trasparente fornito; Alhof usa la variante rossa/grigia trasparente già presente nel repository. Nessun logo originale viene eliminato o invertito con filtri CSS.

## Fonti

- RedAI: https://www.redai.it/ — software, automazione e gestione documentale.
- Design Wrap: https://www.designwrap.it/ e https://it.linkedin.com/company/design-wrap-s-r-l — wrapping e pellicole. Il sito ha restituito 403 al lettore web; il profilo aziendale conferma dominio e attività.
- AISLER: https://aisler.net/en-US — produzione e assemblaggio PCB.
- Ansys: https://ansys.synopsys.com/ — destinazione attuale del sito Ansys.
- Altium: https://www.altium.com/pcb-design — progettazione PCB.
- SOLIDWORKS: https://www.solidworks.com/solution/what-is-3d-cad — CAD 3D.
- AlHof: https://www.alhof.com/ — componenti elettromeccanici.

## MH: Maker House Srl

L'utente ha identificato il partner MH come Maker House Srl. Il sito ufficiale https://www.makerhouse.it/ e il profilo aziendale https://it.linkedin.com/company/makerhouse confermano ragione sociale, sede e attività di stampa 3D, prototipazione e progettazione. La scheda esistente è stata completata con nome Maker House, link e descrizione, conservando il logo fornito.

Le descrizioni dei partner già presenti sono conservate; quelle nuove descrivono l'attività generale, senza affermare donazioni, forniture o accordi specifici.

## Varianti dei loghi per fondo scuro

- Altium: variante bianca già presente nel repository, `public/Altium_Logo_WHT.png`.
- SOLIDWORKS: variante rossa trasparente già presente, `public/SolidWorks-logo.png`.
- Molex: SVG rosso già presente, `public/Molex-Logo.svg`.
- Design Wrap: versione bianca e gialla scaricata da https://www.designwrap.it/wp-content/uploads/2026/01/DesignWrap_Logo-Bianco.webp .
- AISLER: versione arancione trasparente utilizzata dal sito ufficiale, https://cdn.aisler.net/packs/static/images/logo_medium-e01c7ccf5352ef837a15.png .
- Maker House: geometria SVG del logo nella pagina https://www.makerhouse.it/ ; il colore `#f5efe6` risolve il `currentColor`/`--ink` utilizzato dal foglio ufficiale https://www.makerhouse.it/assets/css/main.css .
- Ansys: SVG del logo nella barra del sito https://ansys.synopsys.com/ ; il colore bianco risolve il `currentColor` ufficiale.

Gli SVG estratti incorporano il colore del contesto originale per essere utilizzabili come immagini autonome; forme e proporzioni sono conservate. RedAI ha restituito un errore di certificato al download. Non sono state inventate varianti bianche: per RedAI e Alhof restano i colori dei file disponibili. Una variante ufficiale chiara potrebbe migliorare ulteriormente la leggibilità sul fondo scuro.

La variante SOLIDWORKS contiene ampi margini trasparenti: `logoFit: cover` li esclude dalla cornice senza modificare il file o tagliare il marchio. Gli altri loghi usano `contain`.

## Bilanciamento delle dimensioni

Ogni partner configura `logoWidth` e `logoHeight` (pixel CSS) per bilanciare lo spazio visibile del marchio, tenendo conto dei margini trasparenti e delle forme diverse. La zona logo rimane alta 96 px per allineare nomi e descrizioni; la larghezza del marchio è limitata allo spazio disponibile su mobile. Le proporzioni dei file sono conservate. I marchi compatti Molex e Maker House e il logo a due righe Design Wrap hanno una cornice più alta dei logotipi orizzontali.
