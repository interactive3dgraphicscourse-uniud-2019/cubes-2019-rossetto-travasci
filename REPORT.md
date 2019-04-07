# Progetto Interactive-3D-Graphics: Modeling and rendering with boxes

Nel nostro progetto abbiamo realizzato un'isola con il tema dei pirati. L'isola, costruita a partire da una heightmap realizzata appositamente, è stata quindi decorata con vari oggetti che seguissero il tema. Molti di questi oggetti sono stati inoltre animati.

![Island](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/island_example.png)

Il file principale è `Progetto-Cubes-2019-Rossetto-Travasci.html`. Vengono utilizzate le librerie `three.min.js`, `stats.min.js` e `OrbitControls.js`, tutte contenute nella cartella `lib`. Il file principale ha accesso anche alla libreria `Coordinates.js` (sempre collocata nella stessa cartella), che però al momento non è usata.  
La cartella `scripts` contiene vari file `.js` che vengono utilizzati dal file principale per vari scopi. In particolare, in ordine alfabetico: `animations.js` contiene tutto il codice che implementa le animazioni; `builders.js` contiene le funzioni necessarie a creare gli oggetti presenti nella scena; `lights.js` si occupa di creare le luci e di gestirle nel ciclo giorno/notte e nella attivazione e disattivazione dello stesso; `terrainBuilder.js`, infine, crea il terreno a partire dalla heightmap, aggiunge il mare e si occupa della creazione ed animazione delle nuvole.  
La cartella `audioFiles` contiene i file audio usati nel progetto.
La cartella `textures` contiene tutte le textures e la heightmap.

Lo spostamento all'interno della scena è gestito dai controlli definiti in `OrbitControls.js`.

# Features

### Terrain

Il terreno viene costruito dalla funzione `buildTerrain()` all'interno di `terrainBuilder.js`. Questa funzione utilizza l'immagine `heightmapIsland.png`, che non è altro che una heightmap, per posizionare i blocchi del terreno alla giusta altezza. Ogni pixel della heightmap rappresenta un blocco di lato 0.5, ovvero mezzo metro nella nostra convenzione.  
Solo i blocchi visibili del terreno vengono creati, ovvero i blocchi che si trovano in superficie e quelli che fanno parte di pareti verticali esposte. Ai confini del terreno, inoltre, un muro verticale di blocchi arriva fino all'altezza del punto più basso del terreno, in modo da far sembrare compatto il terreno quando visto dai lati.  
Le texture dei blocchi che compongono il terreno variano a seconda della loro altezza e del fatto che si trovino o meno in superficie. Ad esempio, i blocchi di erba vengono posizionati solo al di sopra di una certa altezza e solo se non ci sono altri blocchi direttamente al di sopra di loro.  
Inoltre, i blocchi d'erba possiedono diverse varianti, in modo che le loro facce laterali siano completamente composte da erba se subito al di sotto di tale faccia si trova un altro cubo di erba. In caso contrario, la faccia laterale in questione presenterà una parte superiore di erba e una inferiore di terra.  
Per diminuire l'impatto nelle prestazioni del terreno, i blocchi di superficie che si trovano ad una altezza inferiore o uguale a quella di tutti i blocchi di superficie ad essi adiacenti non generano ombre. Inoltre, invece di creare una nuova mesh per ogni blocco posizionato nel terreno, vengono clonate delle mesh create in precedenza.

Il mare, parte integrante del terreno, è un parallelepipedo con base di dimensioni quasi uguali a quelle del terreno che utilizza un materiale trasparente.

---

### Fish
Il costruttore `buildFish(color)` ritorna un Object3D di un pesce del colore fornito in input. 

![fish](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/fishes_example.png)

A seconda del tipo di animazione scelta, il pesce si muoverà su un tracciato a forma di cerchio oppure di "8". Il pesce inoltre muoverà la coda a destra e a sinistra per dare l'impressione che stia nuotando.

---

### Bridge
Il costruttore `buildBridge(height)` ritorna un Object3D di una sezione di ponte di altezza `height`. 

![bridge](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/bridge_example.png)

---

### Tree
Un albero, creato utilizzando il costruttore `buildTree(color)`. Al momento della sua creazione è possibile sceglierne il colore. 

![tree](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/tree_example.png)

Nel terreno sono stati aggiunti diversi alberi. Gli alberi uguali sono stati ottenuti clonando una stessa mesh, invece di crearne di separate. Quindi, per averli di dimensioni diverse, sono state applicate diverse scalature.

---

### Butterfly
Una farfalla, creata utilizzando il costruttore `buildButterfly(color)`. Nel momento della sua creazione è possibile scegliere il colore dele sue ali.

![butterfly](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/Butterflies.png)

Quando animate, si muoveranno su un tracciato ellittico, sbattendo le ali e ondeggiando in alto ed in basso durante lo spostamento.

---

### Pirate Flag
Una bandiera dei pirati, creata utilizzando il costruttore `buildPirateFlag()`. 

![pirateflag](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/PirateFlag.png)

Per rendere creare una animazione della bandiera che sventola, il tessuto è stato scomposto in diversi parallelepipedi (ognuno animato).

---

### Treasure Coffer 
Un forziere, creato utilizzando il costruttore `buildCoffer()`. 

![coffer](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/RCoffer.png)

Alla pressione del tasto `O` il forziere si aprirà e si chiuderà dopo un tempo prefissato, emettendo suoni all'apertura e alla chiusura.

---

### Cannon
Un cannone, creato utilizzando il costruttore `buildCannon()`. 

![cannon](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/RCannon.png)

Alla pressione del tasto `F` la miccia si "accenderà", ovverò emetterà un suono e genererà dfumo e scintille. Dopo qualche secondo il cannone "sparerà" una palla di cannone. Dopo lo sparo, una piccola colonna di fumo si alzerà dalla bocca del cannone.

---

### Magic Statue 
Una statua magica, creata utilizzando il costruttore `buildStatue()`. 

![statue](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/RStatue.png)

Attraverso l'alternanza di molteplici texture, è stata creata una animazione grazie alla quali gli occhi della statua sembrano lampeggiare.

---

### Clouds

Delle nuvole animate che si muovono in continuazione nel cielo. Per nascondere il confine del piano su cui appaiono le nuvole è stata aggiunta una nebbia alla scena.  
Il codice deputato alla creazione ed animazione delle nuvole si trova all'interno di `terrainBuilder.js`. L'animazione, in particolare, funziona incrementando continuamente l'offset della texture delle nuvole.

![clouds](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/clouds_example.png)

---

### Day/night cycle

Tramite la pressione del tasto `N` è possibile simulare un ciclo giorno/notte attivando un'animazione che sposta la DirectionalLight e ne cambia l'intensità. Anche l'intensità della HemisphereLight viene modificata durante il corso della giornata simulata. Lo sfondo reagisce anch'esso al cambiamento cambiando colore gradualmente in base alla percentuale di animazione a cui si è arrivati. Alla successiva pressione del tasto la luce torna nella sua posizione di default.

![DayNightCycle](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/RDayNight.png)

--- 

### Ambient Sounds 

Tramite la pressione del tasto `P` è possibile attivare dei suoni ambientali di sottofondo.

---

### Overlay

Un overlay che mostra i tasti della tastiera da premere per effettuare certe azioni. Nascondibile premendo il tasto `Esc`.

![Overlay](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/ROverlay.png)

# Credits

Nel progetto sono stati utilizzati i seguenti suoni, tutti provvisti di una licenza Creative Commons 0.

> fuse2.wav by j1987 on freesound.org  
> Cannon1.wav by Isaac200000 on freesound.org  
> Chest Opening.wav by spookymodem on freesound.org  
> Chest Slam by TNTdude7 on freesound.org  
> Tropical Island by richwise on freesound.org  
