# Progetto Interactive-3D-Graphics: Modeling and rendering with boxes

Nel nostro progetto abbiamo realizzato un'isola con il tema dei pirati. L'isola, costruita a partire da una heightmap realizzata appositamente, è stata quindi decorata con vari oggetti che seguissero il tema. Molti di questi oggetti sono stati inoltre animati.

![Island](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/island_example.png)

Il file principale è `Progetto-Cubes-2019-Rossetto-Travasci.html`. Vengono utilizzate le librerie `three.min.js`, `stats.min.js` e `OrbitControls.js`, tutte contenute nella cartella `lib`. Il file principale ha accesso anche alla libreria `Coordinates.js` (sempre collocata nella stessa cartella), che però al momento non è usata.  
La cartella `scripts` contiene vari file `.js` che vengono utilizzati dal file principale per vari scopi. In particolare, in ordine alfabetico: `animations.js` contiene tutto il codice che implementa le animazioni; `builders.js` contiene le funzioni necessarie a creare gli oggetti presenti nella scena; `lights.js` si occupa di creare le luci e di gestirle nel ciclo giorno/notte e nella attivazione e disattivazione dello stesso; `terrainBuilder.js`, infine, crea il terreno a partire dalla heightmap, aggiunge il mare e si occupa della creazione ed animazione delle nuvole.  
La cartella `audioFiles` contiene i file audio usati nel progetto.
La cartella `textures` contiene tutte le textures e la heightmap.

# Features

## Terrain

Il terreno viene costruito dalla funzione `buildTerrain()` all'interno di `terrainBuilder.js`. Questa funzione utilizza l'immagine `heightmapIsland.png`, che non è altro che una heightmap, per posizionare i blocchi del terreno alla giusta altezza. Ogni pixel della heightmap rappresenta un blocco di lato 0.5, ovvero mezzo metro nella nostra convenzione.  
Solo i blocchi visibili del terreno vengono creati, ovvero i blocchi che si trovano in superficie e quelli che fanno parte di pareti verticali esposte. Ai confini del terreno, inoltre, un muro verticale di blocchi arriva fino all'altezza del punto più basso del terreno, in modo da far sembrare compatto il terreno quando visto dai lati.  
Le texture dei blocchi che compongono il terreno variano a seconda della loro altezza e del fatto che si trovino o meno in superficie. Ad esempio, i blocchi di erba vengono posizionati solo al di sopra di una certa altezza e solo se non ci sono altri blocchi direttamente al di sopra di loro.  
Inoltre, i blocchi d'erba possiedono diverse varianti, in modo che le loro facce laterali siano completamente composte da erba se subito al di sotto di tale faccia si trova un altro cubo di erba. In caso contrario, la faccia laterale in questione presenterà una parte superiore di erba e una inferiore di terra.  
Per diminuire l'impatto nelle prestazioni del terreno, i blocchi di superficie che si trovano ad una altezza inferiore o uguale a quella di tutti i blocchi di superficie ad essi adiacenti non generano ombre. Inoltre, invece di creare una nuova mesh per ogni blocco posizionato nel terreno, vengono clonate delle mesh create in precedenza.

Il mare, parte integrante del terreno, è un parallelepipedo con base di dimensioni quasi uguali a quelle del terreno che utilizza un materiale trasparente.

---

## Fish
Il costruttore `buildFish(color)` ritorna una mesh di un pesce del colore fornito in input. 

![fish](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/fishes_example.png)

Chiamando il metodo questi si muoveranno tracciando cerchi oppure "8" sul piano XZ di un raggio e durata complessiva specificati nell'input della funzione. Il pesce inoltre muoverà la coda rotando di pochi gradi attorno y per dare la sensazione che questo stia nuotando.

---

## Bridge
Il costruttore `buildBridge(height)` ritorna una mesh di una sezione di ponte di altezza `height`. 

![bridge](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/bridge_example.png)

---

## Tree
Il costruttore `buildTree(color)` ritorna una mesh di un albero del colore fornito in input. 

![tree](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/tree_example.png)

---

## Butterfly
Il costruttore `buildButterfly(color)` ritorna una mesh di una farfalla del colore fornito in input. 

![butterfly](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/Butterflies.png)

Chiamando il metodo queste si muoveranno tracciando una traiettoria ellittica su XZ mentre disegneranno una traiettoria sinusoidale su Y. Inoltre queste muoveranno le ali rotando attorno al loro busto per rendere l'animazione del volo.

---

## Pirate Flag
Il costruttore `buildPirateFlag()` ritorna una mesh di un bandiera dei pirati. 

![pirateflag](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/PirateFlag.png)

Per rendere il tessuto animato lo si è fatto costituire da diversi parallelepipedi. Ognuno di questi descrive un'animazione sinusoidale su Y e X con diversi istanti di partenza.

---

## Treasure Coffer 
Il costruttore `buildCoffer()` ritorna una mesh di un forziere. 

![coffer](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/coffer_example.png)

Al premere del tasto `O` il forziere si aprirà ruotando attorno alle cerniere mostrando il suo interno ed emettendo un rumore all'apertura e alla chiusura.

---

## Cannon
Il costruttore `buildCannon()` ritorna una mesh di un cannone. 

![cannon](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/AddedCannon.png)

Al premere del tasto `F` la miccia si "accenderà" emettendo un particolare suono e generando diverse particelle che andranno a rappresentare la scintilla. Dopo un lasso di tempo prefissato il cannone "sparerà" un blocco (cannonball). Dopo lo sparo, un certo numero di particelle andranno a rappresentare il fumo dovuto allo sparo.

---

## Magic Statue 
Il costruttore `buildStatue()` ritorna una mesh di una statua. 

![statue](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/Statue.png)

La statua possiede un'animazione che fa lampeggiare gli occhi.

---

## Clouds

Sono state aggiunte delle nuvole animate che si muovono in continuazione nel cielo. Per rendere più morbida la transizione e dare l'effetto di allontanamento delle nuvole è stata aggiunta una nebbia alla scena.

![clouds](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/clouds_example.png)

---

## Day/night cycle

Tramite la pressione del tasto `N` è possibile simulare un ciclo giorno/notte attivando un'animazione che sposta e cambia l'intensità della DirectionalLight su una circonferenza tutto attorno alla scena. Per migliorare la resa della luce nelle fasi intermedie (alba e tramonto) si sposta anche la HemisphereLight. Lo sfondo reagisce anch'esso al cambiamento cambiando colore in base alla percentuale di animazione a cui arrivato. Alla successiva pressione del tasto la luce torna nella sua posizione scenica di default.

--- 

## Calm Sounds 

Tramite la pressione del tasto `P` è possibile attivare i suoni ambientali, utili a creare atmosfera.

# Credits
