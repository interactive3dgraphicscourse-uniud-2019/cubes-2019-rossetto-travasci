/*
    THIS SCRIPT CREATES A FISH AND ADDS IT TO THE SCENE
*/

var unknown_material;

var errLoader = new THREE.TextureLoader();
errLoader.load(
  "../models/textures/missingTexture.png",

  function( texture ) {
    unknown_material = new THREE.MeshPhongMaterial( {
      map: texture
    })
  }
);

function createBlueFish() {

    // Geometries and materials
    var body_geometry = new THREE.BoxBufferGeometry( 0.22, 0.18, 0.18 );
    var body_material = new THREE.MeshPhongMaterial(
        { color: 0x0060fc,
          side: THREE.FrontSide }
    );

    var muzzle_geometry = new THREE.BoxBufferGeometry( 0.1, 0.07, 0.07 );
    var muzzle_material = new THREE.MeshPhongMaterial(
        { color: 0xa9f9f9,
          side: THREE.FrontSide }
    );

    var tail1_geometry = new THREE.BoxBufferGeometry( 0.23, 0.148, 0.14 );
    var tail1_material = new THREE.MeshPhongMaterial(
        { color: 0x1fb8de,
          side: THREE.FrontSide }
    );

    var tail2_geometry = new THREE.BoxBufferGeometry( 0.23, 0.09, 0.102 );

    var backfin_geometry = new THREE.BoxBufferGeometry( 0.08, 0.02, 0.005 );
    var fin_material = new THREE.MeshPhongMaterial(
        { color: 0x13FF00, 
          side: THREE.FrontSide }
    );

    var topfin_geometry = new THREE.BoxBufferGeometry( 0.14, 0.074, 0.010);

    var eye_geometry = new THREE.BoxBufferGeometry( 0.05, 0.19, 0.038 );
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

    muzzle.position.set(-0.09, 0, 0);
    tail1.position.set(0.04, 0.0, 0);
    tail2.position.set(0.08, 0, 0);
    backfin1.position.set(0.111, 0, 0);
    backfin2.position.set(0.111, 0, 0);
    backfin1.rotation.z = 36.6 * Math.PI/180;
    backfin2.rotation.z = -36.6 * Math.PI/180;
    topfin.position.set(0, 0.08, 0);
    eye.rotation.x = -90 * Math.PI/180;
    eye.position.set(-0.04, 0.04, 0);

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

function createHouse() {

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
    "",                                   // Need a texture
    function( texture ) {
      platform_material = new THREE.MeshPhongMaterial(
        { map: texture }
      )
    },

    function( err ) {
      console.error( 'An error happened. ');
      platform_material = unknown_material;
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

function createBridge( height ) {

  var pillar_geometry = new THREE.BoxBufferGeometry( 0.23, height, 0.23 );
  var top_geometry = new THREE.BoxBufferGeometry( 1.8, 0.1, 2.8 );

  var texture = new THREE.TextureLoader().load("../models/textures/bridge_texture_256x256.png");
  var platform_material = new THREE.MeshPhongMaterial(
    { map: texture,
      shininess: 10 }
  );

  var pillar_texture = new THREE.TextureLoader().load("../models/textures/pillars_texture_16x16.png");
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

  var bridge = new THREE.Mesh();
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

  var texture = new THREE.TextureLoader().load("../models/textures/water2.png");
  var box_geometry = new THREE.BoxBufferGeometry( width, 0.01, width );
  var box_material = new THREE.MeshPhongMaterial(
     {
       map: texture, 
       opacity: 1,
       blendSrc: THREE.SrcAlphaFactor,
       blendDst: THREE.OneMinusSrcAlphaFactor,
       blendEquation: THREE.AddEquation,
       transparent: true,
       side: THREE.FrontSide
     }
  );

  box_material.alphaMap = texture;
  box_material.alphaMap.magFilter = THREE.NearestFilter;
  box_material.alphaMap.wrapT = THREE.RepeatWrapping;
  box_material.alphaMap.repeat.y = 1;

  var water_box = new THREE.Mesh(box_geometry, box_material);
  
  // CAN CAUSE PROBLEMS 
  water_box.receiveShadow = true;

  return water_box;
}

