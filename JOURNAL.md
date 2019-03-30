# Progetto Interactive 3D Graphics: Modeling and rendering with boxes

Abbiamo fatto la scelta di usare il codice di partenza con luci e texture e di creare un terreno partendo da una heightmap.
Tutti i blocchi che useremo saranno di dimensioni uguali, ovvero di 50cm, tranne per situazioni particolari come ad esempio particelle in movimento. Usiamo l'uguaglianza 1m=1 nel codice di threejs, quindi il lato dei cubi nel codice sarà lungo 0,50.

Il terreno che costruiremo sarà un'isola circondata dal mare, con eventuale aggiunta di isole secondarie o scogli.

Proponiamo che i blocchi abbiano texture di dimensione 2x2, ma è ancora una proposta temporanea e la scelta verrà fatta in seguito.

Abbiamo diviso le feature da implementare nel progetto in tre categorie. Le feature fondamentali sono quelle che costituiscono le fondamenta vere e proprie del progetto e devo per queste essere realizzate prima di tutte le altre. Le feature primare sono quelle feature che, seppur secondarie rispetto a quelle fondamentali, sono di grande importanza e devono essere quindi obbligatoriamente realizzate. Le feature secondare, infine, sono quelle feature più avanzate o raffinate che non devono essere per forza inserite ma che, se implementate, arricchiscono ulteriormente il risultato finale.

### Feature fondamentali

- costruzione del terreno a partire da una *heightmap*
- oggetti aggiuntivi oltre al terreno (utilizzando anche gerarchie di scena non banali)
- inserire almeno una animazione

### Feature primarie

- aggiunta di blocchi per evitare che superfici verticali del terreno contengano *buchi*
- raffinamento dell'animazione/i
- implementazione di texture nel terreno e negli oggetti
- utilizzo di texture diverse nei vari blocchi nel terreno a seconda della loro altezza e/o del numero di blocchi posizionati al di sopra di essi
- *mare* intorno all'isola

### Feature secondarie

- aggiunta di ombre per ogni cubo
- aggiungere pozze d'acqua all'interno dell'isola
- nel terreno, cambiare la texture dei blocchi in superficie a seconda dell'altezza della heightmap nei punti adiacenti.
- aggiunta di nuove animazioni o ulteriore raffinamento di quelle esistenti
- una GUI o un sistema interattivo per l'utente 
- animazioni alle texture

Ci dividiamo inizialmente così i compiti: Eric Rossetto si occuperà della creazione degli oggetti della scena mentre Stefano Travasci si occuperà della creazione del terreno a partire dalla heightmap.

## Lavoro iniziale
```30.03.2019 - 12:30```

Stesura iniziale delle features del Journal e testing iniziale di three.js editor.
- Eric Rossetto

## Creazione del file di partenza
```30.03.2019 - 13:30```

Creato il file HTML su cui verrà costruito il progetto basandomi sul file iniziale con luci e texture.
Oltre a varie modifiche minori, è stato tolto il cubo di esempio e il terreno piatto che non servirà più in quanto realizzato a partire da una heightmap.
- Stefano Travasci

## Aggiunte al journal
```30.03.2019 - 16:43```

Ampliato il journal con altre informazioni.
- Stefano Travasci

```30.03.2019 - 23:17```

Aggiunta la cartella **models** contentente:
- *geometries* : contiene solo file del tipo nome.json e contiene solo geometrie esportate dall'editor di three.js
- *objects* : contiene solo file del tipo nome.json e contiene solo mesh esportati dall'editor di three.js
- *textures* : contiene solo file del tipo nome.png o nome.jpg

Inoltre è stato aggiunto il file `boxLoader.html` (all'interno di *example_code*) che contiene un utile esempio di loading di una mesh esportata dall'editor a cui è stata successivamente modificato il materiale rendendolo adatto al sistema di illuminazione.

E' stato inoltre aggiunt ouno script per il loading degli oggetti (temporaneo!).
- Eric Rossetto
