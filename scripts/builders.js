function createFish( color ) {

    // Geometries and materials
    var body_geometry = new THREE.BoxBufferGeometry( 0.2, 0.14, 0.14 );
    var body_material = new THREE.MeshPhongMaterial(
        { color,
          side: THREE.FrontSide }
    );

    var muzzle_geometry = new THREE.BoxBufferGeometry( 0.09, 0.07, 0.07 );
    var muzzle_material = new THREE.MeshPhongMaterial(
        { color: 0xa9f9f9,
          side: THREE.FrontSide }
    );

    var tail1_geometry = new THREE.BoxBufferGeometry( 0.09, 0.12, 0.12 );
    var tail1_material = new THREE.MeshPhongMaterial(
        { color: color*8.5,
          side: THREE.FrontSide }
    );

    var tail2_geometry = new THREE.BoxBufferGeometry( 0.09, 0.10, 0.10 );

    var backfin_geometry = new THREE.BoxBufferGeometry( 0.2, 0.02, 0.005 );
    var fin_material = new THREE.MeshPhongMaterial(
        { color: 0x13FF00,
          side: THREE.FrontSide,
          emissive: 0x13FF00,
          emissiveIntensity: 0.01 }
    );

    var topfin_geometry = new THREE.BoxBufferGeometry( 0.14, 0.074, 0.010);

    var eye_geometry = new THREE.BoxBufferGeometry( 0.04, 0.15, 0.035 );
    var eye_material = new THREE.MeshPhongMaterial(
        { color: 0x000000,
          side: THREE.FrontSide }
    );

    // Meshes
    var body = new THREE.Mesh(body_geometry, body_material);
    var muzzle = new THREE.Mesh(muzzle_geometry, muzzle_material);
    var tail1 = new THREE.Mesh(tail1_geometry, tail1_material);
    var tail2 = new THREE.Mesh(tail2_geometry, body_material);
    var backfin1 = new THREE.Mesh(backfin_geometry, fin_material);
    var backfin2 = new THREE.Mesh(backfin_geometry, fin_material);
    var topfin = new THREE.Mesh(topfin_geometry, fin_material);
    var eye = new THREE.Mesh(eye_geometry, eye_material);

    muzzle.position.set(-0.08, 0, 0);
    tail1.position.set(0.1, 0.0, 0);
    //tail1.rotation.y = 30 * Math.PI/180;
    tail2.position.set(0.14, 0, 0);
    //tail2.rotation.y = 48 * Math.PI/180;
    backfin1.position.set(0.05, 0, 0);
    backfin2.position.set(0.05, 0, 0);
    backfin1.rotation.z = 10 * Math.PI/180;
    backfin2.rotation.z = -10 * Math.PI/180;
    //backfin1.rotation.y = -60 * Math.PI/180;
    //backfin2.rotation.y = -60 * Math.PI/180;
    topfin.position.set(0, 0.06, 0);
    eye.rotation.x = -90 * Math.PI/180;
    eye.position.set(-0.05, 0.02, 0);

    body.castShadow = true;
    body.receiveShadow = true;
    muzzle.castShadow = true;
    muzzle.receiveShadow = true;
    tail1.castShadow = true;
    tail1.receiveShadow = true;
    tail2.castShadow = true;
    tail2.receiveShadow = true;
    topfin.castShadow = true;
    topfin.receiveShadow = true;
    backfin1.castShadow = true;
    backfin1.receiveShadow = true;
    backfin2.castShadow = true;
    backfin2.receiveShadow = true;

    // Hierarchy
    body.add(muzzle);
    body.add(tail1);
    body.add(tail2);
    tail2.add(backfin1);
    tail2.add(backfin2);
    body.add(topfin);
    body.add(eye);

    return body;
}


/*
  Creates a platform of specified height with a plane on top of given
  width. The legOffset specifies how much the pillars of the platform must dist
  from the edge of the plane.

  The legOffset depends on the width and the depth of the pillars.
      pillarsWidth < legOffSet < width
*/

function createPlatform(width, height, legOffset) {

  var pillar_geometry = new THREE.BoxBufferGeometry( 0.25, height, 0.25 );
  var top_geometry = new THREE.BoxBufferGeometry( width, 0.1, width );
  var platform_material = new THREE.MeshPhongMaterial();

  var loader = new THREE.TextureLoader();
  loader.load(
    "../textures/bridge_texture_256x256.png",                                   // Need a texture
    function( texture ) {
      platform_material = new THREE.MeshPhongMaterial(
        { map: texture }
      )
    }
  );

  var pillar1 = new THREE.Mesh(pillar_geometry, platform_material);
  var pillar2 = new THREE.Mesh(pillar_geometry, platform_material);
  var pillar3 = new THREE.Mesh(pillar_geometry, platform_material);
  var pillar4 = new THREE.Mesh(pillar_geometry, platform_material);
  var top = new THREE.Mesh(top_geometry, platform_material);

  pillar1.position.set( (width-legOffset)/2, height/2, (width-legOffset)/2 );
  pillar2.position.set( -(width-legOffset)/2, height/2, (width-legOffset)/2 );
  pillar3.position.set( (width-legOffset)/2, height/2, -(width-legOffset)/2 );
  pillar4.position.set( -(width-legOffset)/2, height/2, -(width-legOffset)/2 );
  top.position.set( 0, height, 0 );

  pillar1.receiveShadow = true;
  pillar1.castShadow = true;
  pillar2.receiveShadow = true;
  pillar2.castShadow = true;
  pillar3.receiveShadow = true;
  pillar3.castShadow = true;
  pillar4.receiveShadow = true;
  pillar4.castShadow = true;
  top.receiveShadow = true;
  top.castShadow = true;

  var table = new THREE.Mesh();
  table.position.set( 0, 0, 0 );

  table.add(pillar1);
  table.add(pillar2);
  table.add(pillar3);
  table.add(pillar4);
  table.add(top);

  return table;
}

/*
  Creates a bridge of a given height.
*/
function createBridge( height ) {

  var pillar_geometry = new THREE.BoxBufferGeometry( 0.23, height, 0.23 );
  var top_geometry = new THREE.BoxBufferGeometry( 1.8, 0.1, 2.8 );

  var texture = new THREE.TextureLoader().load("../textures/bridge_texture_256x256.png");
  var platform_material = new THREE.MeshPhongMaterial(
    { map: texture,
      shininess: 10 }
  );

  texture.magFilter = THREE.NearestFilter;

  var pillar_texture = new THREE.TextureLoader().load("../textures/pillars_texture_16x16.png");
  var pillar_material = new THREE.MeshPhongMaterial(
    {
      map: pillar_texture,
      shininess: 10
    }
  )

  var pillar1 = new THREE.Mesh(pillar_geometry, pillar_material);
  var pillar2 = new THREE.Mesh(pillar_geometry, pillar_material);
  var pillar3 = new THREE.Mesh(pillar_geometry, pillar_material);
  var pillar4 = new THREE.Mesh(pillar_geometry, pillar_material);
  var top = new THREE.Mesh(top_geometry, platform_material);

  pillar1.position.set( 0.9, height/2, 1.4 );
  pillar2.position.set( -0.9, height/2, 1.4);
  pillar3.position.set( 0.9, height/2, -1.4);
  pillar4.position.set( -0.9, height/2, -1.4 );
  top.position.set( 0, height - 0.25, 0 );

  pillar1.receiveShadow = true;
  pillar1.castShadow = true;
  pillar2.receiveShadow = true;
  pillar2.castShadow = true;
  pillar3.receiveShadow = true;
  pillar3.castShadow = true;
  pillar4.receiveShadow = true;
  pillar4.castShadow = true;
  top.receiveShadow = true;
  top.castShadow = true;

  var bridge = new THREE.Object3D();
  bridge.position.set( 0, 0, 0 );

  bridge.add(pillar1);
  bridge.add(pillar2);
  bridge.add(pillar3);
  bridge.add(pillar4);
  bridge.add(top);

  return bridge;
}

/*
  Creates a layer of water. (Can be a box)
  It uses the principles of transparency shown at lesson plus
  some tricks to make it move.

  The width is the length of an edge of a cube.
*/
function createWater( width ) {

  var texture = new THREE.TextureLoader().load("../textures/water2.png");
  var box_geometry = new THREE.PlaneBufferGeometry( width, width );
  var box_material = new THREE.MeshPhongMaterial(
     {
       map: texture,
       opacity: 1,
       blendSrc: THREE.SrcAlphaFactor,
       blendDst: THREE.OneMinusSrcAlphaFactor,
       blendEquation: THREE.AddEquation,
       transparent: true,
       side: THREE.DoubleSide
     }
  );

  box_material.alphaMap = texture;
  box_material.alphaMap.magFilter = THREE.NearestFilter;
  box_material.alphaMap.wrapT = THREE.RepeatWrapping;
  box_material.alphaMap.repeat.y = 1;

  var water_box = new THREE.Mesh(box_geometry, box_material);

  water_box.rotation.x = 90 * Math.PI/180;

  // CAN CAUSE PROBLEMS
  water_box.receiveShadow = true;

  return water_box;
}

/*
  Creates a a light blue tree.
*/
function createTree(color) {

  trunk_texture = new THREE.TextureLoader().load("../textures/trunk_texture_256x512.png");
  trunk_texture.magFilter = THREE.NearestFilter;

  var trunk_material = new THREE.MeshPhongMaterial(
    {
      map: trunk_texture
    }
  );
  var foliage_texture = new THREE.TextureLoader().load("../textures/foliage_texture_16x16.png");
  foliage_texture.magFilter = THREE.NearestFilter;

  var foliage_material = new THREE.MeshPhongMaterial(
    {
      color: color,
      map: foliage_texture
    }
  );
  var trunk_geometry = new THREE.BoxBufferGeometry( 1, 5, 1 );
  var trunk_geometry_add1 = new THREE.BoxBufferGeometry( 1.3, 1, 1 );
  var trunk_geometry_add2 = new THREE.BoxBufferGeometry( 1, 3, 1.1 );
  var trunk_geometry_add3 = new THREE.BoxBufferGeometry( 1, 0.8, 1 );
  var branch_geometry = new THREE.BoxBufferGeometry( 0.8, 0.3, 0.3 );
  var foliage_geometry = new THREE.BoxBufferGeometry( 3.2, 2.5, 4 );
  var foliage_geometry_add1 = new THREE.BoxBufferGeometry( 1.5, 1, 2 );
  var foliage_geometry_add2 = new THREE.BoxBufferGeometry( 1, 1, 3 );

  var trunk = new THREE.Mesh(trunk_geometry, trunk_material);
  var trunk_add1 = new THREE.Mesh(trunk_geometry_add1, trunk_material);
  var trunk_add2 = new THREE.Mesh(trunk_geometry_add2, trunk_material);
  var trunk_add3 = new THREE.Mesh(trunk_geometry_add3, trunk_material);
  var branch1 = new THREE.Mesh(branch_geometry, trunk_material);
  var branch2 = new THREE.Mesh(branch_geometry, trunk_material);
  var foliage = new THREE.Mesh(foliage_geometry, foliage_material);
  var foliage_add1 = new THREE.Mesh(foliage_geometry_add1, foliage_material);
  var foliage_add2 = new THREE.Mesh(foliage_geometry_add2, foliage_material);
  var tree = new THREE.Object3D();

  trunk.position.set( 0, 2.5, 0 );
  trunk_add1.position.set( 0, 0.5, 0.3 );
  trunk_add2.position.set( -0.3, 1.5, 0.3 );
  trunk_add3.position.set( 0.3, 0.4, -0.3 );
  branch1.position.set( 0.7, 4, 0 );
  branch2.position.set( 0.95, 4.35, 0 );
  branch2.rotation.z = 90 * Math.PI/180;
  foliage.position.set( 0, 5.8, 0 );
  foliage_add1.position.set( 1.4, 6, 1.3 );
  foliage_add2.position.set( -1.3, 6, -0.7 );

  trunk.castShadow = true;
  trunk.receiveShadow = true;
  trunk_add1.castShadow = true;
  trunk_add1.receiveShadow = true;
  trunk_add2.castShadow = true;
  trunk_add2.receiveShadow = true;
  trunk_add3.castShadow = true;
  trunk_add3.receiveShadow = true;
  branch1.castShadow = true;
  branch1.receiveShadow = true;
  branch2.castShadow = true;
  branch2.receiveShadow = true;
  foliage.castShadow = true;
  foliage.receiveShadow = true;
  foliage_add1.castShadow = true;
  foliage_add1.receiveShadow = true;
  foliage_add2.castShadow = true;
  foliage_add2.receiveShadow = true;

  tree.add(trunk);
  tree.add(trunk_add1);
  tree.add(trunk_add2);
  tree.add(trunk_add3);
  tree.add(branch1);
  tree.add(branch2);
  tree.add(foliage);
  tree.add(foliage_add1);
  tree.add(foliage_add2);

  return tree;
}

//Creates a butterfly with wings the color of 'color'
function buildButterfly(color){
  var rightWing=buildWing(color);
  var leftWing=buildWing(color);
  var butterfly=new THREE.Object3D;
  var body=buildButterflyBody();
  leftWing.position.z=0.8;
  rightWing.position.z=-0.8;
  leftWing.scale.set(1.2,1.2,1.2);
  rightWing.scale.set(1.2,1.2,1.2);
  butterfly.add(leftWing);
  butterfly.add(rightWing);
  butterfly.add(body);
  butterfly.scale.set(0.07,0.07,0.07);
  return butterfly;
}

//builds a wing of the butterfly
function buildWing(color) {
  var material=new THREE.MeshPhongMaterial({color:color});
  var geometry1=new THREE.BoxGeometry(1,3,1);
  var geometry2=new THREE.BoxGeometry(1,2,1);
  var geometry3=new THREE.BoxGeometry(1,1,1);
  var mesh1=new THREE.Mesh(geometry1,material);
  var mesh2=new THREE.Mesh(geometry2,material);
  var mesh3=new THREE.Mesh(geometry3,material);
  mesh1.castShadow = true;
  mesh2.castShadow = true;
  mesh3.castShadow = true;
  mesh1.receiveShadow = true;
  mesh2.receiveShadow = true;
  mesh3.receiveShadow = true;
  mesh1.position.y=1.5;
  mesh2.position.y=1;
  mesh3.position.y=0.5;
  mesh1.position.x=-1;
  mesh3.position.x=1;
  var wing=new THREE.Object3D;
  wing.add(mesh1);
  wing.add(mesh2);
  wing.add(mesh3);
  return wing;
}

//builds the body of the butterfly
function buildButterflyBody() {
  var material=new THREE.MeshPhongMaterial({color:0x000000});
  var geometryBody=new THREE.BoxGeometry(4,0.5,0.5);
  var geometryHead=new THREE.BoxGeometry(1,1,1);
  var meshBody=new THREE.Mesh(geometryBody,material);
  var meshHead=new THREE.Mesh(geometryHead,material);
  var body=new THREE.Object3D();
  meshHead.position.x=-2.5;
  meshBody.position.x=-0.25;
  meshHead.castShadow = true;
  meshBody.castShadow = true;
  meshHead.receiveShadow = true;
  meshBody.receiveShadow = true;
  body.add(meshBody);
  body.add(meshHead);
  return body;
}

//create a pirate flag
function buildPirateFlag() {
  var flagPart=buildFlagCloth();
  var pole=buildPole();
  var flag=new THREE.Object3D;

  flag.add(flagPart);
  flag.add(pole);

  flagPart.position.y+=1.5;
  return flag;
}

//builds the flag part of the flag
function buildFlagCloth() {
  var flagPart=new THREE.Object3D;

  var flagShape=new THREE.BoxGeometry(0.25,2,0.25);

  var flagShortTexture = new THREE.TextureLoader().load('../textures/flag/flagShort.png');
	flagShortTexture.magFilter = THREE.NearestFilter;
  var flagShortMaterial = new THREE.MeshPhongMaterial( { map: flagShortTexture } );
  flagShortMaterial.castShadow=true;
  flagShortMaterial.receiveShadow=true;

  var flagSideTexture = new THREE.TextureLoader().load('../textures/flag/flagStripBlank.png');
	flagSideTexture.magFilter = THREE.NearestFilter;
  var flagSideMaterial = new THREE.MeshPhongMaterial( { map: flagSideTexture } );
  flagSideMaterial.castShadow=true;
  flagSideMaterial.receiveShadow=true;

  var flagSideThinTexture = new THREE.TextureLoader().load('../textures/flag/flagStripBlankThin.png');
	flagSideThinTexture.magFilter = THREE.NearestFilter;
  var flagSideThinMaterial = new THREE.MeshPhongMaterial( { map: flagSideThinTexture } );
  flagSideThinMaterial.castShadow=true;
  flagSideThinMaterial.receiveShadow=true;

  var flagStripTextures=[];
  var flagStripMaterials=[];
  var part;
  for(var i=1;i<=14;i++){
    flagStripTextures.push(new THREE.TextureLoader().load('../textures/flag/flagStrip'+i+'.png'));
    flagStripTextures[i-1].magFilter = THREE.NearestFilter;
    flagStripMaterials.push(new THREE.MeshPhongMaterial( { map: flagStripTextures[i-1] } ));
    part = new THREE.Mesh(flagShape,[flagSideThinMaterial,flagSideThinMaterial,flagShortMaterial,flagShortMaterial,flagStripMaterials[i-1],flagStripMaterials[i-1]]);
    part.position.x=i/4;
    part.castShadow=true;
    part.receiveShadow=true;
    flagPart.add(part);
  }

  return flagPart;
}

//builds the pole of the flag
function buildPole() {
  var poleComplete=new THREE.Object3D;

  var poleShape=new THREE.BoxGeometry(0.35,5.5,0.35);
  var poleTextureSide = new THREE.TextureLoader().load('../textures/flag/poleHeight.png');
  poleTextureSide.magFilter = THREE.NearestFilter;
  var poleMaterialSide = new THREE.MeshPhongMaterial( { map: poleTextureSide } );
  var poleTexturePoint = new THREE.TextureLoader().load('../textures/flag/polePoint.png');
  poleTexturePoint.magFilter = THREE.NearestFilter;
  var poleMaterialPoint = new THREE.MeshPhongMaterial( { map: poleTexturePoint } );
  var pole=new THREE.Mesh(poleShape,[poleMaterialSide,poleMaterialSide,poleMaterialPoint,poleMaterialPoint,poleMaterialSide,poleMaterialSide]);
  pole.castShadow=true;
  pole.receiveShadow=true;

  var topBallShape=new THREE.BoxGeometry(0.5,0.5,0.5);
  var topBallTexture = new THREE.TextureLoader().load('../textures/flag/poleTop.png');
  topBallTexture.magFilter = THREE.NearestFilter;
  var topBallMaterial = new THREE.MeshPhongMaterial( { map: topBallTexture } );
  var topBall=new THREE.Mesh(topBallShape,topBallMaterial);
  topBall.castShadow=true;
  topBall.receiveShadow=true;

  poleComplete.add(topBall);
  topBall.position.y=2.8;
  poleComplete.add(pole);
  return poleComplete;
}

var openAudio;
var closeAudio;

function createCoffer() {
  openAudio = new Audio('../audioFiles/202092__spookymodem__chest-opening.wav');
  closeAudio = new Audio('../audioFiles/261462__tntdude7__chest-slam.wav');

  var base = createBase();

  var coffer1_geometry = new THREE.BoxBufferGeometry(1.9, 0.8, 1.2);
  var coffer2_geometry = new THREE.BoxBufferGeometry(1.9, 0.4, 1.2);
  var hinge_geometry = new THREE.BoxBufferGeometry(0.1, 0.1, 0.1);
  var lock_geometry = new THREE.BoxBufferGeometry(0.22, 0.13, 0.1);
  var interior_geometry = new THREE.PlaneBufferGeometry(1.8, 1.1);
  var pointer = new THREE.Object3D();

  var coffer_texture = new THREE.TextureLoader().load("../textures/coffer_texture_16x16.png");
  coffer_texture.magFilter = THREE.NearestFilter;

  var gold_texture = new THREE.TextureLoader().load("../textures/gold_texture_16x16.png");
  gold_texture.magFilter = THREE.NearestFilter;

  var coffer_material = new THREE.MeshPhongMaterial( {
    map: coffer_texture,
    shininess: 0
  });
  var hinge_material = new THREE.MeshPhongMaterial( {color: 0x909090} );
  var interior_material = new THREE.MeshPhongMaterial( { color: 0x0f0f0f });

  var gold_material = new THREE.MeshPhongMaterial({
    map: gold_texture,
    emissive: 0xffffff,
    emissiveIntensity: 0.3
  });

  var coffer1 = new THREE.Mesh( coffer1_geometry, coffer_material );
  var coffer2 = new THREE.Mesh( coffer2_geometry, coffer_material );
  var hinge1 = new THREE.Mesh( hinge_geometry, hinge_material );
  var hinge2 = new THREE.Mesh( hinge_geometry, hinge_material );
  var lock = new THREE.Mesh( lock_geometry, hinge_material );
  var interior = new THREE.Mesh( interior_geometry, interior_material );
  var gold = new THREE.Mesh( interior_geometry, gold_material );

  coffer1.position.set(0, 1.05, 0);
  coffer2.position.set(0, 0.2, 0.6);
  hinge1.position.set(-0.6, 0.4, -0.6);
  hinge2.position.set(0.6, 0.4, -0.6);
  lock.position.set(0, 0.4, 0.6);
  interior.position.set(0, -0.205, 0);
  interior.rotation.x = 90 * Math.PI/180;
  gold.position.set(0, 0.4005, 0);
  gold.rotation.x = -90 * Math.PI/180;
  pointer.position.set(0.6, 0.01, 0);

  coffer1.castShadow = true;
  coffer1.receiveShadow = true;
  coffer2.castShadow = true;
  coffer2.receiveShadow = true;
  hinge1.castShadow = true;
  hinge1.receiveShadow = true;
  hinge2.castShadow = true;
  hinge2.receiveShadow = true;
  gold.receiveShadow = true;
  interior.receiveShadow = true;

  var coffer = new THREE.Object3D();

  coffer.add(base);
  coffer.add(coffer1);
  coffer1.add(hinge1);
  coffer1.add(hinge2);
  coffer1.add(lock);
  hinge1.add(pointer);
  pointer.add(coffer2);
  coffer2.add(interior);
  coffer1.add(gold);

  coffer.position.set( 0, 0, 0.6);

  return coffer;
}

function createBase() {
  var base1_geometry = new THREE.BoxBufferGeometry( 3.2, 0.2, 3.2);
  var edge_geometry = new THREE.BoxBufferGeometry( 0.2, 0.5, 3.6);
  var pedestal_geometry = new THREE.BoxBufferGeometry(2.3, 1.5, 1.5);
  var water_geometry = new THREE.BoxBufferGeometry(3.2, 0.4, 3.2);
  var footBridge_geometry = new THREE.BoxBufferGeometry(1.6, 0.3, 0.9);

  var water_texture = new THREE.TextureLoader().load("../textures/water2.png");
  var base_texture = new THREE.TextureLoader().load("../textures/base_texture_16x16.png");
  base_texture.magFilter = THREE.NearestFilter;

  var base_material = new THREE.MeshPhongMaterial( {
    map: base_texture,
    shininess: 0
  });

  var edge_material = new THREE.MeshPhongMaterial( {
    color: 0x909090,
    shininess: 0
  });

  var water_material = new THREE.MeshPhongMaterial( {
    map: water_texture,
    color: 	0x0077be,
    transparent: true,
		opacity: 0.33,
		blendSrc: THREE.SrcAlphaFactor,
    blendDst: THREE.OneMinusSrcAlphaFactor,
		blendEquation: THREE.AddEquation,
		shininess: 90,
		emissive: 0x0033cc,
    emissiveIntensity: 0.5,
  });

  var base1 = new THREE.Mesh( base1_geometry, base_material );
  var pedestal = new THREE.Mesh( pedestal_geometry, base_material );
  var edge1 = new THREE.Mesh( edge_geometry, edge_material );
  var edge2 = new THREE.Mesh( edge_geometry, edge_material );
  var edge3 = new THREE.Mesh( edge_geometry, edge_material );
  var edge4 = new THREE.Mesh( edge_geometry, edge_material );
  var water = new THREE.Mesh( water_geometry, water_material );
  var footBridge = new THREE.Mesh( footBridge_geometry, edge_material );

  base1.castShadow = true;
  base1.receiveShadow = true;
  pedestal.castShadow = true;
  pedestal.receiveShadow = true;
  edge1.castShadow = true;
  edge1.receiveShadow = true;
  edge2.castShadow = true;
  edge2.receiveShadow = true;
  edge3.castShadow = true;
  edge3.receiveShadow = true;
  edge4.castShadow = true;
  edge4.receiveShadow = true;
  footBridge.castShadow = true;
  footBridge.receiveShadow = true;

  pedestal.position.set(0, -0.1, 0);
  edge1.position.set(1.7, 0, 0);
  edge2.position.set(-1.7, 0, 0);
  edge3.position.set(0, 0, 1.7);
  edge3.rotation.y = -90 * Math.PI/180;
  edge4.position.set(0, 0, -1.7);
  edge4.rotation.y = -90 * Math.PI/180;
  water.position.set(0, 0, 0);
  footBridge.position.set(0, 0.3, 1.15);

  var base = new THREE.Object3D();

  base.add(base1);
  base1.add(pedestal);
  base1.add(edge1);
  base1.add(edge2);
  base1.add(edge3);
  base1.add(edge4);
  base1.add(water);
  base.add(footBridge);

  return base;

}

//creates and returns a complete cannon
function buildCannon(){
  var base=buildCannonBase();
  var body=buildCannonBody();
  var cannon= new THREE.Object3D();
  cannon.add(base);
  cannon.add(body);
  body.position.set(-1.2,1.5,0);
  body.rotation.z=11*Math.PI/180;
  body.rotation.y=180*Math.PI/180;
  body.scale.multiplyScalar(0.85);

  //loads the audio files for the animation
  fuseAudio = new Audio('../audioFiles/140715__j1987__fuse2.wav');
  fuseAudio.volume=0.5;
  fuseAudio.oncanplaythrough=function() {canPlayFuseAudio=true;};
  cannonAudio = new Audio('../audioFiles/184650__isaac200000__cannon1.wav');
  cannonAudio.volume=0.5;
  cannonAudio.oncanplaythrough=function() {canPlayCannonAudio=true;};

  return cannon;
}

//creates the wooden base of the cannon
function buildCannonBase(){
  var wheels=buildCannonWheels();
  var structure=buildCannonStructure();
  structure.add(wheels[0]);
  structure.add(wheels[1]);
  structure.add(wheels[2]);
  structure.add(wheels[3]);
  wheels[0].position.set(-1.5,-0.375,0.875);
  wheels[1].position.set(1.5,-0.375,0.875);
  wheels[2].position.set(-1.5,-0.375,-0.875);
  wheels[3].position.set(1.5,-0.375,-0.875);
  return structure;
}

//returns an array containing four cannon wheels
function buildCannonWheels() {
  var wheels=[];
  var geometry=new THREE.BoxGeometry(1,1,0.25);
  var textureMain = new THREE.TextureLoader().load("../textures/cannon/wheel.png");
  textureMain.magFilter = THREE.NearestFilter;
  var materialMain=new THREE.MeshPhongMaterial({map: textureMain});
  var textureSide = new THREE.TextureLoader().load("../textures/cannon/wheelSide.png");
  textureSide.magFilter = THREE.NearestFilter;
  var materialSide=new THREE.MeshPhongMaterial({map: textureSide});
  var material=[materialSide,materialSide,materialSide,materialSide,materialMain,materialMain];
  for(var i=0;i<4;i++){
    wheels.push(new THREE.Mesh(geometry,material));
    wheels[i].castShadow=true;
    wheels[i].receiveShadow=true;
  }
  return wheels;
}

//creates the main wooden structure of the cannon base
function buildCannonStructure(){
  var structure=new THREE.Object3D;
  var geometryBig=new THREE.BoxGeometry(5,0.75,1.5);
  var geometrySmall=new THREE.BoxGeometry(3,1,1.5);

  var textureBigTopAndSides = new THREE.TextureLoader().load("../textures/cannon/structureBigTopAndSides.png");
  textureBigTopAndSides.magFilter = THREE.NearestFilter;
  var materialBigTopAndSides=new THREE.MeshPhongMaterial({map: textureBigTopAndSides});

  var textureSmallTopAndSides = new THREE.TextureLoader().load("../textures/cannon/structureSmallTopAndSides.png");
  textureSmallTopAndSides.magFilter = THREE.NearestFilter;
  var materialSmallTopAndSides=new THREE.MeshPhongMaterial({map: textureSmallTopAndSides});

  var textureFront = new THREE.TextureLoader().load("../textures/cannon/structureFront.png");
  textureFront.magFilter = THREE.NearestFilter;
  var materialFront=new THREE.MeshPhongMaterial({map: textureFront});

  var materialBig=[materialFront,materialFront,materialBigTopAndSides,materialBigTopAndSides,materialBigTopAndSides,materialBigTopAndSides];
  var materialSmall=[materialFront,materialFront,materialSmallTopAndSides,materialSmallTopAndSides,materialSmallTopAndSides,materialSmallTopAndSides];

  var big=new THREE.Mesh(geometryBig,materialBig);
  big.castShadow=true;
  big.receiveShadow=true;
  var small=new THREE.Mesh(geometrySmall,materialSmall);
  small.castShadow=true;
  small.receiveShadow=true;

  small.position.y=0.875;
  small.position.x=-1;
  structure.add(big);
  structure.add(small);
  return structure;
}

//creates the cannon without it's base
function buildCannonBody(){
  var cannonBody=new THREE.Object3D;

  var mainGeometry=new THREE.BoxGeometry(9,1,1);
  var backGeometry=new THREE.BoxGeometry(0.8,0.8,0.8);
  var hingeGeometry=new THREE.BoxGeometry(0.5,0.5,2);
  var fuseHolderGeometry=new THREE.BoxGeometry(0.15,0.1,0.15);
  var fuseGeometry=new THREE.BoxGeometry(0.08,0.2,0.08);

  var textureCannonPoint = new THREE.TextureLoader().load("../textures/cannon/cannonPoint.png");
  textureCannonPoint.magFilter = THREE.NearestFilter;
  var materialCannonPoint=new THREE.MeshPhongMaterial({map: textureCannonPoint});

  var textureCannonBack = new THREE.TextureLoader().load("../textures/cannon/cannonBack.png");
  textureCannonBack.magFilter = THREE.NearestFilter;
  var materialCannonBack=new THREE.MeshPhongMaterial({map: textureCannonBack});

  var textureCannonSide = new THREE.TextureLoader().load("../textures/cannon/cannonSide.png");
  textureCannonSide.magFilter = THREE.NearestFilter;
  var materialCannonSide=new THREE.MeshPhongMaterial({map: textureCannonSide});

  var textureFuse = new THREE.TextureLoader().load("../textures/cannon/fuse.png");
  textureFuse.magFilter = THREE.NearestFilter;
  var materialFuse=new THREE.MeshPhongMaterial({map: textureFuse});

  var textureSmallSteel = new THREE.TextureLoader().load("../textures/cannon/smallSteel.png");
  textureSmallSteel.magFilter = THREE.NearestFilter;
  var materialSmallSteel=new THREE.MeshPhongMaterial({map: textureSmallSteel});

  var textureCannonHingePoint = new THREE.TextureLoader().load("../textures/cannon/cannonHingePoint.png");
  textureCannonHingePoint.magFilter = THREE.NearestFilter;
  var materialCannonHingePoint=new THREE.MeshPhongMaterial({map: textureCannonHingePoint});

  var textureCannonHingeSide = new THREE.TextureLoader().load("../textures/cannon/cannonHingeSide.png");
  textureCannonHingeSide.magFilter = THREE.NearestFilter;
  var materialCannonHingeSide=new THREE.MeshPhongMaterial({map: textureCannonHingeSide});

  var main=new THREE.Mesh(mainGeometry,[materialCannonPoint,materialCannonBack,materialCannonSide,materialCannonSide,materialCannonSide,materialCannonSide]);
  main.castShadow=true;
  main.receiveShadow=true;
  var back=new THREE.Mesh(backGeometry,materialCannonBack);
  back.castShadow=true;
  back.receiveShadow=true;
  var hinge=new THREE.Mesh(hingeGeometry,[materialCannonHingePoint,materialCannonHingePoint,materialCannonHingeSide,materialCannonHingeSide,materialCannonHingeSide,materialCannonHingeSide]);
  hinge.castShadow=true;
  hinge.receiveShadow=true;
  var fuseHolder=new THREE.Mesh(fuseHolderGeometry,materialSmallSteel);
  fuseHolder.castShadow=true;
  fuseHolder.receiveShadow=true;
  var fuse=new THREE.Mesh(fuseGeometry,materialFuse);
  fuse.castShadow=true;
  fuse.receiveShadow=true;

  cannonBody.add(main);
  cannonBody.add(back);
  back.position.x=-4.4;
  cannonBody.add(hinge);
  fuse.add(fuseHolder);
  fuseHolder.position.y=-0.15;
  cannonBody.add(fuse);
  fuse.position.set(-3.75,0.7,0);
  return cannonBody;
}

//creates a statue
var statueFaces=[],statueMaterial;
function buildStatue(){
  var mainGeometry=new THREE.BoxGeometry(1.5,2,0.5);
  var topGeometry=new THREE.BoxGeometry(1,0.25,0.5);

  var textureStatueBack = new THREE.TextureLoader().load("../textures/statue/statueBack.png");
  textureStatueBack.magFilter = THREE.NearestFilter;
  var materialStatueBack=new THREE.MeshPhongMaterial({map: textureStatueBack});

  var textureStatueTop = new THREE.TextureLoader().load("../textures/statue/statueTop.png");
  textureStatueTop.magFilter = THREE.NearestFilter;
  var materialStatueTop=new THREE.MeshPhongMaterial({map: textureStatueTop});

  var textureStatueSides=new THREE.TextureLoader().load("../textures/statue/statueSides.png");
  textureStatueSides.magFilter = THREE.NearestFilter;
  var materialStatueSides=new THREE.MeshPhongMaterial({map: textureStatueSides});

  var textureStatueSmallFrontAndSides = new THREE.TextureLoader().load("../textures/statue/statueSmallFrontAndSides.png");
  textureStatueSmallFrontAndSides.magFilter = THREE.NearestFilter;
  var materialStatueSmallFrontAndSides=new THREE.MeshPhongMaterial({map: textureStatueSmallFrontAndSides});

  var textureStatueSmallTop = new THREE.TextureLoader().load("../textures/statue/statueSmallTop.png");
  textureStatueSmallTop.magFilter = THREE.NearestFilter;
  var materialStatueSmallTop=new THREE.MeshPhongMaterial({map: textureStatueSmallTop});

  var face;
  for(var i=1;i<=7;i++){
    face = new THREE.TextureLoader().load("../textures/statue/statueFace"+i+".png");
    face.magFilter = THREE.NearestFilter;
    statueFaces.push(new THREE.MeshPhongMaterial({map: face}));
  }

  statueMaterial=[materialStatueSides,materialStatueSides,materialStatueTop,materialStatueTop,statueFaces[0],materialStatueBack];
  var statue=new THREE.Mesh(mainGeometry,statueMaterial);
  var statueTop=new THREE.Mesh(topGeometry,[materialStatueSmallFrontAndSides,materialStatueSmallFrontAndSides,materialStatueSmallTop,materialStatueSmallTop,materialStatueSmallFrontAndSides,materialStatueSmallFrontAndSides]);
  statue.add(statueTop);
  statueTop.position.y=1.125;
  statue.castShadow=true;
  statue.receiveShadow=true;
  statueTop.castShadow=true;
  statueTop.receiveShadow=true;
  return statue;
}
