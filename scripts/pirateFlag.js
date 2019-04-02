//create a pirate flag
function buildPirateFlag(){
  var flagPart=buildFlagCloth();
  var pole=buildPole();
  var flag=new THREE.Object3D;

  flag.add(flagPart);
  flag.add(pole);

  flagPart.position.y+=1.5;
  return flag;
}

//builds the flag part of the flag
function buildFlagCloth(){
  var flagPart=new THREE.Object3D;

  var flagShape=new THREE.BoxGeometry(0.25,2,0.25);

  var flagShortTexture = new THREE.TextureLoader().load('../models/textures/flag/flagShort.png');
	flagShortTexture.magFilter = THREE.NearestFilter;
	flagShortTexture.minFilter = THREE.LinearMipMapLinearFilter;
  var flagShortMaterial = new THREE.MeshPhongMaterial( { map: flagShortTexture } );
  flagShortMaterial.castShadow=true;
  flagShortMaterial.receiveShadow=true;

  var flagSideTexture = new THREE.TextureLoader().load('../models/textures/flag/flagStripBlank.png');
	flagSideTexture.magFilter = THREE.NearestFilter;
	flagSideTexture.minFilter = THREE.LinearMipMapLinearFilter;
  var flagSideMaterial = new THREE.MeshPhongMaterial( { map: flagSideTexture } );
  flagSideMaterial.castShadow=true;
  flagSideMaterial.receiveShadow=true;

  var flagSideThinTexture = new THREE.TextureLoader().load('../models/textures/flag/flagStripBlankThin.png');
	flagSideThinTexture.magFilter = THREE.NearestFilter;
	flagSideThinTexture.minFilter = THREE.LinearMipMapLinearFilter;
  var flagSideThinMaterial = new THREE.MeshPhongMaterial( { map: flagSideThinTexture } );
  flagSideThinMaterial.castShadow=true;
  flagSideThinMaterial.receiveShadow=true;

  var flagStripTextures=[];
  var flagStripMaterials=[];
  var part;
  for(var i=1;i<=14;i++){
    flagStripTextures.push(new THREE.TextureLoader().load('../models/textures/flag/flagStrip'+i+'.png'));
    flagStripTextures[i-1].magFilter = THREE.NearestFilter;
    flagStripTextures[i-1].minFilter = THREE.LinearMipMapLinearFilter;
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
function buildPole(){
  var poleComplete=new THREE.Object3D;

  var poleShape=new THREE.BoxGeometry(0.35,5.5,0.35);
  var poleTextureSide = new THREE.TextureLoader().load('../models/textures/flag/poleHeight.png');
  poleTextureSide.magFilter = THREE.NearestFilter;
  poleTextureSide.minFilter = THREE.LinearMipMapLinearFilter;
  var poleMaterialSide = new THREE.MeshPhongMaterial( { map: poleTextureSide } );
  var poleTexturePoint = new THREE.TextureLoader().load('../models/textures/flag/polePoint.png');
  poleTexturePoint.magFilter = THREE.NearestFilter;
  poleTexturePoint.minFilter = THREE.LinearMipMapLinearFilter;
  var poleMaterialPoint = new THREE.MeshPhongMaterial( { map: poleTexturePoint } );
  var pole=new THREE.Mesh(poleShape,[poleMaterialSide,poleMaterialSide,poleMaterialPoint,poleMaterialPoint,poleMaterialSide,poleMaterialSide]);
  pole.castShadow=true;
  pole.receiveShadow=true;

  var topBallShape=new THREE.BoxGeometry(0.5,0.5,0.5);
  var topBallTexture = new THREE.TextureLoader().load('../models/textures/flag/poleTop.png');
  topBallTexture.magFilter = THREE.NearestFilter;
  topBallTexture.minFilter = THREE.LinearMipMapLinearFilter;
  var topBallMaterial = new THREE.MeshPhongMaterial( { map: topBallTexture } );
  var topBall=new THREE.Mesh(topBallShape,topBallMaterial);
  topBall.castShadow=true;
  topBall.receiveShadow=true;

  poleComplete.add(topBall);
  topBall.position.y=2.8;
  poleComplete.add(pole);
  return poleComplete;
}

//animates a flag
function animateFlag(flag,time,period){
  var t=time%period;
  var ty=time%(period/2);
  var f=flag.children[0].children;
  for(var i=0;i<14;i++){
    f[i].position.z=Math.cos(Math.PI/16*i+2*Math.PI*t/period)*(i+1)*0.04;
    f[i].position.y=Math.cos(Math.PI/16*i+2*Math.PI*ty/(period/2))*i*0.01;
  }
}
