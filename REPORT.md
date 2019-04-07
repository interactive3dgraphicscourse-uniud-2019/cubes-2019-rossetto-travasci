# Progetto Interactive-3D-Graphics: Modeling and rendering with boxes

Partiamo con l'introduzione del soggetto della nostra scena: **un'isola dei pirati con annessi soggetti a tema animati**.

![Island](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/island_example.png)

Per la realizzazione abbiamo deciso di dividere il progetto in **feature**, in modo da definire, almeno inizialmente, una lista di possibili idee da implementare con la relativa priorità.

Volendole elencare:

### Feature fondamentali

Queste feature sono necessarie alla realizzazione e costituiscono la vera base del nostro progetto e quindi hanno una priorità di implementazione maggiore.

- [costruzione del terreno a partire da una *heightmap*](##costruzione-terreno-da-heightmap) 
- [oggetti aggiuntivi oltre al terreno (utilizzando anche gerarchie di scena non banali)](##aggiunta-di-oggetti-alla-scena)
- [inserire almeno una animazione](##animazioni)

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

## Costruzione terreno da heightmap

Il terreno viene costruito tramite un algoritmo all'interno di `terrainBuilder.js` che scansiona l'immagine `heightmapIsland.png` composta solo da colori nella scala dei grigi. Alle coordinate *(i, j)* infatti è presente una certa tonalità che definisce la posizione *y* finale del blocco (che al termine sarà *(i, y, j)* ) e la diversa texture da applicarci (`sand`, `dirt`, `stone` o `grass`). Sono inoltre stati fatti diversi miglioramenti all'algoritmo in modo da ridurre l'impatto sulle prestazioni: se un blocco non presenta blocchi adiacenti con posizioni in altezza maggiori viene reso falso il valore di `castShadow`. 

Il mare, parte integrante del terreno, è un parallelepipedo con base di dimensioni della heightmap che utilizza un materiale trasparente.

I confini del terreno non sono scoperti ma viene invece posto un muro verticale e arriva al punto più basso del terreno.
Sono state inoltre aggiunte nuvole

## Aggiunta di oggetti alla scena

Sono stati creati diversi modelli, i cui costruttori sono presenti nel file `builders.js`:

- `Fish`: il costruttore `buildFish(color)` ritorna una mesh di un pesce del colore fornito in input. ![fish](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/fishes_example.png)
- `Bridge`: il costruttore `buildBridge(height)` ritorna una mesh di una sezione di ponte di altezza `height`. ![bridge](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/bridge_example.png)
- `Tree`: il costruttore `buildTree(color)` ritorna una mesh di un albero del colore fornito in input. ![tree](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/tree_example.png)
- `Butterfly`: il costruttore `buildButterfly(color)` ritorna una mesh di una farfalla del colore fornito in input. ![butterfly](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/Butterflies.png)
- `Pirate Flag`: il costruttore `buildPirateFlag()` ritorna una mesh di un bandiera dei pirati. ![pirateflag](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/PirateFlag.png)
- `Coffer`: il costruttore `buildCoffer()` ritorna una mesh di un forziere. ![coffer](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/coffer_example.png)
- `Cannon`: il costruttore `buildCannon()` ritorna una mesh di un cannone. ![cannon](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/AddedCannon.png)
- `Statue`: il costruttore `buildStatue()` ritorna una mesh di una statua. ![statue](https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/cubes-2019-rossetto-travasci/master/screenshots/Statue.png)

La posizione degli oggetti sulla mappa è dovuta solo ad un gusto estetico.

## Animazioni

Sono state introdotte numerose animazioni per gli oggetti in scena tramite le funzioni dichiarate in `animation.js`, `lights.js`, `terrainBuilder.js`. 

- `Fish`: questi si muoveranno tracciando cerchi oppure "8" sul piano XZ di un raggio e durata complessiva specificati nell'input della funzione. Il pesce inoltre muoverà la coda rotando di pochi gradi attorno y per dare la sensazione che questo stia nuotando. 
- `Butterfly`: queste si muoveranno tracciando una traiettoria ellittica su XZ mentre disegneranno una traiettoria sinusoidale. Inoltre queste muoveranno le ali rotando attorno al loro busto per rendere l'animazione del volo.
- `Pirate Flag`: per rendere il "tessuto" della bandiera animato dal vento l'animazione traccia una funzione sinusoidale(coseno) in verticale su Y e orizzontale su Z. 
- `Coffer`: al premero del tasto `O` il forziere si aprirà ruotando attorno alle cerniere mostrando il suo interno ed emettendo un rumore all'apertura e alla chiusura.
- `Statue`
- `Cannon`
- `Clouds`
- `Day/night`