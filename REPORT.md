# Progetto Interactive-3D-Graphics: Modeling and rendering with boxes

Partiamo con l'introduzione del soggetto della nostra scena: **un'isola dei pirati con annessi soggetti a tema animati**.

![Island](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/island_example.png)

# Terreno della scena

Il terreno viene costruito tramite un algoritmo all'interno di `terrainBuilder.js` che scansiona l'immagine `heightmapIsland.png` composta solo da colori nella scala dei grigi. Alle coordinate *(i, j)* infatti è presente una certa tonalità che definisce la posizione *y* finale del blocco (che al termine sarà *(i, y, j)* ) e la diversa texture da applicarci (`sand`, `dirt`, `stone` o `grass`). Sono inoltre stati fatti diversi miglioramenti all'algoritmo in modo da ridurre l'impatto sulle prestazioni: se un blocco non presenta blocchi adiacenti con posizioni in altezza maggiori viene reso falso il valore di `castShadow`. 

Il mare, parte integrante del terreno, è un parallelepipedo con base di dimensioni della heightmap che utilizza un materiale trasparente.

I confini del terreno non sono scoperti ma viene invece posto un muro verticale e arriva al punto più basso del terreno.
Sono state inoltre aggiunte nuvole

# Oggetti

Sono stati creati diversi modelli, i cui costruttori sono presenti nel file `builders.js` e le animazioni in `animations.js`:

### `Fish`
Il costruttore `buildFish(color)` ritorna una mesh di un pesce del colore fornito in input. 

![fish](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/fishes_example.png)

Chiamando il metodo questi si muoveranno tracciando cerchi oppure "8" sul piano XZ di un raggio e durata complessiva specificati nell'input della funzione. Il pesce inoltre muoverà la coda rotando di pochi gradi attorno y per dare la sensazione che questo stia nuotando. 
### `Bridge`
Il costruttore `buildBridge(height)` ritorna una mesh di una sezione di ponte di altezza `height`. 

![bridge](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/bridge_example.png)

### `Tree` 
Il costruttore `buildTree(color)` ritorna una mesh di un albero del colore fornito in input. 

![tree](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/tree_example.png)

### `Butterfly`
Il costruttore `buildButterfly(color)` ritorna una mesh di una farfalla del colore fornito in input. 

![butterfly](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/Butterflies.png)

Chiamando il metodo queste si muoveranno tracciando una traiettoria ellittica su XZ mentre disegneranno una traiettoria sinusoidale su Y. Inoltre queste muoveranno le ali rotando attorno al loro busto per rendere l'animazione del volo.
### `Pirate Flag`
Il costruttore `buildPirateFlag()` ritorna una mesh di un bandiera dei pirati. 

![pirateflag](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/PirateFlag.png)

Per rendere il tessuto animato lo si è fatto costituire da diversi parallelepipedi. Ognuno di questi descrive un'animazione sinusoidale su Y e X con diversi istanti di partenza.
### `Coffer` 
Il costruttore `buildCoffer()` ritorna una mesh di un forziere. 

![coffer](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/coffer_example.png)

Al premere del tasto `O` il forziere si aprirà ruotando attorno alle cerniere mostrando il suo interno ed emettendo un rumore all'apertura e alla chiusura.
### `Cannon` 
Il costruttore `buildCannon()` ritorna una mesh di un cannone. 

![cannon](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/AddedCannon.png)

Al premere del tasto `F` la miccia si "accenderà" emettendo un particolare suono e generando diverse particelle che andranno a rappresentare la scintilla. Dopo un lasso di tempo prefissato il cannone "sparerà" un blocco (cannonball). Dopo lo sparo, un certo numero di particelle andranno a rappresentare il fumo dovuto allo sparo.
### `Statue` 
Il costruttore `buildStatue()` ritorna una mesh di una statua. 

![statue](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/Statue.png)

## Oggetti aggiuntivi