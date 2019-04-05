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

//animates the eyes of the statue by changing its texture
function animateStatue(statue,time){
  var t=time%24850;
  if(t>12425){
    t=24850-t;
  }
  if(t<10000){
    statueMaterial[4]=statueFaces[0];
  }else if(t<11500){
    statueMaterial[4]=statueFaces[Math.floor((t-10000)/250)+1];
    console.log(Math.floor((t-10000)/250)+1);
  }else if(t<11750){
    statueMaterial[4]=statueFaces[5];
  }else if(t<12000){
    statueMaterial[4]=statueFaces[6];
  }else if(t<12250){
    statueMaterial[4]=statueFaces[5];
  }else{
    statueMaterial[4]=statueFaces[6];
  }
}
