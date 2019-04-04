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
  return cannon;
}

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

function buildCannonWheels() {
  var wheels=[];
  var geometry=new THREE.BoxGeometry(1,1,0.25);
  var textureMain = new THREE.TextureLoader().load("../models/textures/cannon/wheel.png");
  textureMain.magFilter = THREE.NearestFilter;
  textureMain.minFilter = THREE.LinearMipMapLinearFilter;
  var materialMain=new THREE.MeshPhongMaterial({map: textureMain});
  var textureSide = new THREE.TextureLoader().load("../models/textures/cannon/wheelSide.png");
  textureSide.magFilter = THREE.NearestFilter;
  textureSide.minFilter = THREE.LinearMipMapLinearFilter;
  var materialSide=new THREE.MeshPhongMaterial({map: textureSide});
  var material=[materialSide,materialSide,materialSide,materialSide,materialMain,materialMain];
  for(var i=0;i<4;i++){
    wheels.push(new THREE.Mesh(geometry,material));
    wheels[i].castShadow=true;
    wheels[i].receiveShadow=true;
  }
  return wheels;
}

function buildCannonStructure(){
  var structure=new THREE.Object3D;
  var geometryBig=new THREE.BoxGeometry(5,0.75,1.5);
  var geometrySmall=new THREE.BoxGeometry(3,1,1.5);

  var textureBigTopAndSides = new THREE.TextureLoader().load("../models/textures/cannon/structureBigTopAndSides.png");
  textureBigTopAndSides.magFilter = THREE.NearestFilter;
  textureBigTopAndSides.minFilter = THREE.LinearMipMapLinearFilter;
  var materialBigTopAndSides=new THREE.MeshPhongMaterial({map: textureBigTopAndSides});

  var textureSmallTopAndSides = new THREE.TextureLoader().load("../models/textures/cannon/structureSmallTopAndSides.png");
  textureSmallTopAndSides.magFilter = THREE.NearestFilter;
  textureSmallTopAndSides.minFilter = THREE.LinearMipMapLinearFilter;
  var materialSmallTopAndSides=new THREE.MeshPhongMaterial({map: textureSmallTopAndSides});

  var textureFront = new THREE.TextureLoader().load("../models/textures/cannon/structureFront.png");
  textureFront.magFilter = THREE.NearestFilter;
  textureFront.minFilter = THREE.LinearMipMapLinearFilter;
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

function buildCannonBody(){
  var cannonBody=new THREE.Object3D;

  var mainGeometry=new THREE.BoxGeometry(9,1,1);
  var backGeometry=new THREE.BoxGeometry(0.8,0.8,0.8);
  var hingeGeometry=new THREE.BoxGeometry(0.5,0.5,2);
  var fuseHolderGeometry=new THREE.BoxGeometry(0.15,0.1,0.15);
  var fuseGeometry=new THREE.BoxGeometry(0.08,0.2,0.08);

  var textureCannonPoint = new THREE.TextureLoader().load("../models/textures/cannon/cannonPoint.png");
  textureCannonPoint.magFilter = THREE.NearestFilter;
  textureCannonPoint.minFilter = THREE.LinearMipMapLinearFilter;
  var materialCannonPoint=new THREE.MeshPhongMaterial({map: textureCannonPoint});

  var textureCannonBack = new THREE.TextureLoader().load("../models/textures/cannon/cannonBack.png");
  textureCannonBack.magFilter = THREE.NearestFilter;
  textureCannonBack.minFilter = THREE.LinearMipMapLinearFilter;
  var materialCannonBack=new THREE.MeshPhongMaterial({map: textureCannonBack});

  var textureCannonSide = new THREE.TextureLoader().load("../models/textures/cannon/cannonSide.png");
  textureCannonSide.magFilter = THREE.NearestFilter;
  textureCannonSide.minFilter = THREE.LinearMipMapLinearFilter;
  var materialCannonSide=new THREE.MeshPhongMaterial({map: textureCannonSide});

  var textureFuse = new THREE.TextureLoader().load("../models/textures/cannon/fuse.png");
  textureFuse.magFilter = THREE.NearestFilter;
  textureFuse.minFilter = THREE.LinearMipMapLinearFilter;
  var materialFuse=new THREE.MeshPhongMaterial({map: textureFuse});

  var textureSmallSteel = new THREE.TextureLoader().load("../models/textures/cannon/smallSteel.png");
  textureSmallSteel.magFilter = THREE.NearestFilter;
  textureSmallSteel.minFilter = THREE.LinearMipMapLinearFilter;
  var materialSmallSteel=new THREE.MeshPhongMaterial({map: textureSmallSteel});

  var textureCannonHingePoint = new THREE.TextureLoader().load("../models/textures/cannon/cannonHingePoint.png");
  textureCannonHingePoint.magFilter = THREE.NearestFilter;
  textureCannonHingePoint.minFilter = THREE.LinearMipMapLinearFilter;
  var materialCannonHingePoint=new THREE.MeshPhongMaterial({map: textureCannonHingePoint});

  var textureCannonHingeSide = new THREE.TextureLoader().load("../models/textures/cannon/cannonHingeSide.png");
  textureCannonHingeSide.magFilter = THREE.NearestFilter;
  textureCannonHingeSide.minFilter = THREE.LinearMipMapLinearFilter;
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
