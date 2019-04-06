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

## Creazione del terrain

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

```1.04.2019 - 16:56```

Modificato il codice di creazione dell'acqua: ora sfrutta un PlaneBufferGeometry per ridurre l'impatto sulle perfomance. Corretta l'altezza di alcune texture che non erano potenze di due.

- Eric Rossetto

## Migliorata l'erba del terreno

```1.04.2019 - 20:33```

Modificata la texture dell'erba in modo che le sue facce laterali siano composte da due parti: una superiore di erba ed una inferiore di terra. Allo stesso tempo, però, quando nella colonna di blocchi adiacente alla faccia in questione è presente un blocco di erba esattamente un blocco più in basso, la faccia in questione sarà composta completamente da erba, in modo da collegare le parti di erba dei due blocchi.  
In questa descrizione non si discute del corportamento dell'algoritmo per le facce dei blocchi di erba che non sono visibili o lo sono solo guardando il terreno da sotto.

![Improved grass](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/NewKindsOfGrass.png)

- Stefano Travasci

 ## Aggiunte mura verticali al confine del terreno
 
```1.04.2019 - 21:23```

Ora i confini del terreno non rimangono più "aperti" come prima, ma viene costruito automaticamente un muro verticale che arriva fino al punto più in basso del terreno.  
Alzato leggermente il livello del mare.

![Vertical walls](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/VerticalTerrainEdges.png)

- Stefano Travasci

```1.04.2019 - 21:23```

Ridotta la heightmap a 49x49 per questioni di perfomance. Modificata in modo da renderla più eterogenea.

- Eric Rossetto

## Aggiunta farfalle

```2.04.2019 - 02:12```

Aggiunto codice deputato alla creazione di farfalle e alla loro animazione. Nel momento della creazione è possibile scegliere il colore della farfalla. Una volta creata viene restituito un Object3D rappresentante la farfalla. Una volta aggiunta alla scena, sarà possibile usare la funzione apposita per animarla. La funzione riceve, oltre all'Object3D farfalla, varie informazioni come la posizione del centro, distanze massime dal centro e tempi necessari a compiere i vari spostamenti. La funzione si occupa sia dell'animazione dell'oggetto stesso che del suo spostamento e orientamento all'interno della scena.
Sono state fatte anche alcune modifiche minori al codice, come una piccola riorganizzazione del codice all'interno del file HTML principale e lo spostamento della posizione iniziale della telecamera.

![Butteflies](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/Butterflies.png)

- Stefano Travasci

## Miglioramento ombre e aggiunta ombre alle farfalle

```2.04.2019 - 02:39```

La luce direzionale è stata riposizionata e le dimensioni della sua shadow camera ridotte. Questi cambiamenti, fatti per adeguarsi alla riduzione della dimensione del terreno, hanno portato un miglioramento della qualità delle ombre.  
Inoltre, ora le farfalle producono e ricevono ombre.

![ButterfliesAndShadows](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/ShadowButterflies.png)

- Stefano Travasci

## Aggiunta bandiera pirata

```2.04.2019 - 12:03```

Aggiunto il codice per creare ed animare una bandiera pirata e le relative texture.

![Pirates](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/PirateFlag.png)

- Stefano Travasci

## Completata animazione pesce

```2.04.2019 - 16:53```

Aggiunto il codice relativo all'animazione della coda e del movimento del pesce.

![Fishes](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/fishes_example.png)

- Eric Rossetto

## Scelta progettuale

```3.04.2019 - 00:03```

Per incrementare il numero di modelli presenti in scena verranno implementati: un forziere e un cannone. Il primo dovrà aprirsi all'avvicinarsi della camera e mostrare al suo interno una texture che rappresenti il tesoro (possibilmente luccicante). Il secondo invece dovrà avere la possibilità di essere attivato ed essere in grado di "accendere" la miccia emettendo delle proprie particelle e sparare un colpo con conseguente fumo.

- Eric Rossetto, Stefano Travasci

## Ponte

```3.04.2019 - 00:27```

Aggiunta di un piccolo ponte di collegamento fra le isole.

![Bridge](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/bridge_example.png)

- Eric Rossetto

## Ombre del terreno

```3.04.2019 - 20:32```

Il codice di creazione del terreno è stato modificato in questo modo: se un blocco di superficie è circondato esclusivamente da blocchi di superficie che si trovano ad una altezza maggiore o uguale ad esso, questo blocco non genera più ombre. Queste ombre non cadevano mai in un punto visibile del terreno o degli oggetti presenti su di esso, quindi erano inutili. In questo modo si migliorano le performance e si riduce notevolmente il numero di effetti visivi spiacevoli causati dalle ombre che si notano fra i confini di blocchi adiacenti.

- Stefano Travasci

## Animazioni

```4.04.2019 - 09:22```

Applicato fix alla coda del pesce, ora si muove sempre.

- Eric Rossetto

## Aggiunta forziere

```4.04.2019 - 12:35```

Aggiunto il costruttore per il forziere con la relativa base. 

![Coffer](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/coffer_example.png)

- Eric Rossetto

## Costruzione cannone

```4.04.2019 - 18:38```

Il codice per la costruzione del cannone e le sue textures sono stati completati. Un cannone è stato quindi posizionato nella scena.  
Varie altre modifiche minori al codice.

![Cannon](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/AddedCannon.png)

- Stefano Travasci

## Aggiunta nuvole

```4.04.2019 - 21:14```

Ora il codice del terreno aggiunge anche delle nuvole. Le nuvole sono animate in modo che si spostino con il tempo. È possibile scegliere (e variare) la velocità con cui esse si muovono.

![Clouds](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/AddedClouds.png)

- Stefano Travasci

## Migliorate le nuvole

```4.04.2019 - 22:57```

Sono stati apportati vari miglioramenti alle nuvole:  
- migliorata la texture delle nuvole;
- ingrandito il piano su cui appaiono le nuvole;
- aggiunta la nebbia (fog) in modo che nasconda il confine del piano delle nuvole.

![BetterClouds](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/ImprovedClouds.png)

- Stefano Travasci

## Completata animazione forziere       

```5.04.2019 - 00:58```

Completata l'animazione di apertura del forziere. Premendo il tasto 'O' si aprirà e si chiuderà automaticamente, al completamento sarà possibile riaprirlo con lo stesso tasto.

- Eric Rossetto

## Aggiunta foresta

```5.04.2019 - 11:38```

Aggiunti gli alberi in modo da crearne una foresta.

![Forest](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/forest_example.png)

- Eric Rossetto

## Aggiunta statua "magica"

```5.04.2019 - 12:09```

Completato il codice per la creazione e l'animazione di una statua e realizzate le relative texture. Periodicamente gli occhi della statua si illuminano e lampeggiano.

![Statue](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/Statue.png)

- Stefano Travasci

## Aggiunte le animazioni al cannone

```5.04.2019 - 20:11```

Completate le animazioni del cannone. Per attivarle è sufficiente premere il tasto 'F' sulla tastiera. All'inizio della animazione la miccia del cannone comincerà a fumare, poi il colpo esploderà fuori dal cannone e quindi si alzerà una colonna di fumo dalla bocca del cannone. L'animazione è accompagnata da effetti sonori per la miccia che brucia e l'esplosione del colpo.

![CannonAnimated](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/CannonAnimation.png)

- Stefano Travasci

## Aggiunti suoni di sottofondo

```5.04.2019 - 21:54```

Tramite la pressione del tasto 'P' della tastiera è possibile attivare dei suoni di sottofondo. Successive pressioni dello stesso pulsante metteranno in pausa o faranno ripartire l'audio.

- Stefano Travasci

## Ciclo giorno/notte

```5.04.2019 - 22:03```

Aggiunta la possibilità di ottenere l'effetto del ciclo giorno/notte (approssimato). E' disattivabile attravrso la pressione del tasto `N`.

- Eric Rossetto

## Aggiunto overlay

```6.04.2019 - 22:22```

Aggiunto un overlay che mostra le funzioni associate a certi pulsanti della tastiera. È possibile nascondere o mostrare nuovamente l'overlay premendo il tasto 'ESC'.

![Overlay](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/Overlay.png)

- Stefano Travasci
