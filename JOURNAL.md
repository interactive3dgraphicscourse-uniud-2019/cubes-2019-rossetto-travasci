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

- Eric Rossetto

```31.03.2019 - 11:35```

Aggiunta cartella scripts. Completata la funzione che crea l'oggetto `blueFish`. 
Lo script `lights.js` ora è a parte e **deve** essere inizializzato nel main.

- Eric Rossetto

```31.03.2019 - 14:35```

Aggiunto file `animation.js` contenente tutte le funzioni da chiamare per le animazioni.

- Eric Rossetto

##Creazione del terrain

```31.03.2019 - 15:12```

Completata sia la versione iniziale dell'algoritmo deputato alla costruzione del terreno che l'immagine rappresentante la heightmap. Il prossimo passo sarà modificare l'algoritmo di costruzione del terreno in modo da riempire eventuali buchi nelle pareti verticali del terreno.

![First iteration of terrain](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/First%20terrain%20iteration.png)

- Stefano Travasci

```31.03.2019 - 19:02```

Creati i costruttori per i modelli di pesci e piattaforme. Sostituiti i materiali con i più appropriati `MeshPongMaterial`.

Aggiunta la possibilità di creare un blocco d'acqua animato (su questo è possibile però migliorarlo), agli aspetti stilistici non ci ho ancora dato peso.

![Water 1.0](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/water_example.PNG)

- Eric Rossetto

```1.04.2019 - 12:19```

Creato il costruttore per il ponte e per l'albero. Create alcune utili texture di 256x256 pixel in formato `.png`. Sarebbe da trovare una soluzione per lo stretch delle texture che in alcuni casi è fastidioso.

![Tree 1.0](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/tree_example.png)

- Eric Rossetto

## Progressi con il terreno


```1.04.2019 - 14:15```

Il codice per la costruzione del terreno è stato migliorato in modo da evitare la formazione di buchi nelle pareti verticali dello stesso. È stata inoltre aggiunta una texture per la sabbia, che al momento è stata applicata a tutto il terreno.
Cambiamenti minori includono un nuovo colore per il cielo e un diverso posizionamento iniziale della telecamera.

![Sandy-Terrain](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/Sandy-Terrain.png)

- Stefano Travasci

## Texture del terreno cambia a seconda dell'altezza, aggiunta del mare e altro

```1.04.2019 - 16:22```

Ora il la texture del terreno cambia a seconda dell'altezza del blocco e del fatto che sia o meno in superficie. I blocchi al di sotto del metro sopra al livello del mare sono tutti di sabbia, quelli al di sopra sono di erba se si trovano in superficie, altrimenti sono di terra.
Aggiunto il mare trasparente al terreno. Tentativo di aggiungere le ombre ai blocchi del terreno, ma le ombre appaiono solo per un ridottissimo numero di blocchi. Necessari ulteriori approfondimenti a riguardo.

![Aggiunto il mare](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/AddedSea.png)

- Stefano Travasci

## Ombre del terreno

```1.04.2019 - 16:45```

Modificato il codice delle luci in modo da renderizzare correttamente le ombre create dal terreno.

![Sistemate le ombre](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/FixedShadows.png)

- Stefano Travasci
