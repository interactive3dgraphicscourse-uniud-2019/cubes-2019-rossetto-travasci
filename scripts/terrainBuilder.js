function buildTerrain(scene){
	var img = new Image();
	img.onload = function () {

		//get height data from img
		var data = getHeightData(img,0.5);

		//starts the construction of the terrain
		createTerrain(scene, data);
		addClouds(parseInt(Math.sqrt(data.length)));
	}

	// load img source
	img.src = "../textures/heightmapIsland3.png";
}

//return array with height data from img, taken from: http://danni-three.blogspot.it/2013/09/threejs-heightmaps.html
function getHeightData(img,scale) {

 if (scale == undefined) scale=1;

		var canvas = document.createElement( 'canvas' );
		canvas.width = img.width;
		canvas.height = img.height;
		var context = canvas.getContext( '2d' );

		var size = img.width * img.height;
		//console.log(size);
		var data = new Float32Array( size );

		context.drawImage(img,0,0);

		for ( var i = 0; i < size; i ++ ) {
				data[i] = 0
		}

		var imgd = context.getImageData(0, 0, img.width, img.height);
		var pix = imgd.data;

		var j=0;
		for (var i = 0; i<pix.length; i +=4) {
				var all = pix[i]+pix[i+1]+pix[i+2];  // all is in range 0 - 255*3
				data[j++] = scale*all/3;
		}

		return data;
}

//declared here sot hey can be used everywhere
var terrain, cube, geometry;
var sandMaterial, dirtMaterial, stoneMaterial;
//16 different types of grass, one for each possible configuration. Created here to avoid recreating them every time a grass block is placed.
var grassMaterialSimple=[], grassMaterialFull=[], grassMaterialUp=[], grassMaterialDown=[], grassMaterialLeft=[], grassMaterialRight=[],
grassMaterialUpDown=[], grassMaterialUpLeft=[], grassMaterialUpRight=[], grassMaterialDownLeft=[], grassMaterialDownRight=[], grassMaterialLeftRight=[],
grassMaterialUpDownLeft=[], grassMaterialUpDownRight=[], grassMaterialDownLeftRight=[], grassMaterialUpLeftRight=[];

//build the terrain by using an array contain the various heights and adds it to the scene
//we suppose the base of the terrain to be a square
function createTerrain(scene, data){
	//the lenght and width of the terrain
	var side=parseInt(Math.sqrt(data.length));
	//the Object3D containing the terrain
	terrain=new THREE.Object3D();

	geometry = new THREE.BoxGeometry(0.5,0.5,0.5);

	//sand
	var sandTexture = new THREE.TextureLoader().load('../textures/sand.png');
	sandTexture.magFilter = THREE.NearestFilter;
	sandTexture.minFilter = THREE.LinearMipMapLinearFilter;
	sandMaterial = new THREE.MeshPhongMaterial( { map: sandTexture, side: THREE.FrontSide } );

	//grass
	var grassTexture = new THREE.TextureLoader().load('../textures/grass.png');
	grassTexture.magFilter = THREE.NearestFilter;
	grassTexture.minFilter = THREE.LinearMipMapLinearFilter;
	grassMaterial = new THREE.MeshPhongMaterial( { map: grassTexture, side: THREE.FrontSide } );

	//dirt
	var dirtTexture = new THREE.TextureLoader().load('../textures/dirt.png');
	dirtTexture.magFilter = THREE.NearestFilter;
	dirtTexture.minFilter = THREE.LinearMipMapLinearFilter;
	dirtMaterial = new THREE.MeshPhongMaterial( { map: dirtTexture, side: THREE.FrontSide } );

	//stone
	var stoneTexture = new THREE.TextureLoader().load('../textures/stone.png');
	stoneTexture.magFilter = THREE.NearestFilter;
	stoneTexture.minFilter = THREE.LinearMipMapLinearFilter;
	stoneMaterial = new THREE.MeshPhongMaterial( { map: stoneTexture, side: THREE.FrontSide } );

	//create the different blocks of grassSide
	createGrass();

	//finds the height of the lowest point on the terrain.
	//Used to avoid the creation of an overside sea and to build the sides of the terrain
	var minVal=255;
	for (var i=0;i<data.length;i++){
		minVal=Math.min(data[i],minVal);
	}

	for(var i=0;i<side;i++){
		for(var j=0;j<side;j++){
			var up, down, left, right;

			//dealing with the special cases where the considered point is at the edge of the terrain
			//using minVal to build vertical walls from the edges of terrain down to height of the lowest point in the terrain
			if(i==0){
				up=minVal-0.5;
				down=data[(i+1)*side+j];
			} else if (i==side-1){
				up=data[(i-1)*side+j];
				down=minVal-0.5;
			} else {
				up=data[(i-1)*side+j];
				down=data[(i+1)*side+j];
			}

			if(j==0){
				right=data[i*side+j+1];
				left=minVal-0.5;
			} else if (j==side-1){
				right=minVal-0.5;
				left=data[i*side+j-1];
			} else {
				right=data[i*side+j+1];
				left=data[i*side+j-1];
			}

			var y=data[i*side+j];
			var min=Math.min(up,down,left,right,y);
			var adiacentHeights=[up,down,left,right];

			buildColumn(j/2,i/2,y,(y-min)*2,adiacentHeights);
		}
	}
	scene.add(terrain);

	//center the terrain on the origin
	terrain.position.x=-side/4;
	terrain.position.z=-side/4;
	terrain.position.y=-(127.5)/2;

	//creates the sea
	var seaGeometry = new THREE.BoxGeometry(side/2-0.2,(128/2)-minVal-0.2,side/2-0.2);
	var seaMaterial = new THREE.MeshPhongMaterial( {
		color: 0x0042ad,
		transparent: true,
		opacity: 0.33,
		blendSrc: THREE.SrcAlphaFactor,
    	blendDst: THREE.OneMinusSrcAlphaFactor,
		blendEquation: THREE.AddEquation,
		shininess: 90,
		emissive: 0x0033cc,
		emissiveIntensity: 0.1,
	} );

	var sea=new THREE.Mesh(seaGeometry,seaMaterial);
	sea.position.x=+side/4-0.25;
	sea.position.z=+side/4-0.25;
	sea.position.y=minVal+((128/2)-minVal-0.2)/2+0.3-0.5;
	terrain.add(sea);
}

//given a set of coordinates and a number n, it create of column of blocks n blocks tall with the block on top being at those coordinates
//uses the heights of the adiacent points to decide which kind of grass must be eventually used
function buildColumn(x,z,y,n,adiacentHeights){
	//the surface block
	var sidesBool=[y<adiacentHeights[0]+1,y<adiacentHeights[1]+1,y<adiacentHeights[2]+1,y<adiacentHeights[3]+1];
	var castShadow=!((y<=adiacentHeights[0])&&(y<=adiacentHeights[1])&&(y<=adiacentHeights[2])&&(y<=adiacentHeights[3]));
	placeBlock(x,y,z,true,sidesBool,castShadow);

	//the blocks under the surface block
	for(var i=1;i<n;i++){
		placeNonSurfaceBlock(x,y-(i/2),z);
	}

}

function placeNonSurfaceBlock(x,y,z){
	placeBlock(x,y,z,false,[false,false,false,false],true);
}

//places the block made of the right material
//uses a boolean to differentiate from blocks on top (that may be made of grass) and the ones under it
//uses other booleans to know on which sides the height of the adiacent point is within one block of difference from the block itself (used for creating the grass)
//the surface blocks surrounded by blocks of the same height don't cast shadows (there's no need to). This way we reduce unwanted visual effects and improve the performance.
function placeBlock(x,y,z,top,sidesBool,castShadow){
	var material;
	//over y*2=128 there's grass or dirt, under it only sand
	if(y*2>128){

		if(top){
			if (y*2>129) {
				material=getGrassMaterial(sidesBool);
			} else {//if y*2=128 it means that is the first layer of grass/dirt and there will be sand under it
				material=grassMaterialSimple;
			}
		} else {
			material=dirtMaterial;
		}

		} else {
			if(top){
				material=sandMaterial;
			} else {
				material=sandMaterial;
			}
	}

	cube = new THREE.Mesh( geometry, material );
	terrain.add(cube);
	cube.position.x=x;
	cube.position.z=z;
	cube.position.y=y;
	cube.castShadow = castShadow;
	cube.receiveShadow = true;
}

//Uses an array of four booleans to understand which sides need to be covered in full grass.
//Then returns the right kind of grass material.
function getGrassMaterial(sidesBool){
	if(sidesBool[0]){
		if (sidesBool[1]){
			if(sidesBool[2]){
				if(sidesBool[3]){
					return grassMaterialFull;
				}else{
					return grassMaterialUpDownLeft;
				}
			}else{
				if(sidesBool[3]){
					return grassMaterialUpDownRight;
				}else{
					return grassMaterialUpDown;
				}
			}
		} else {
			if(sidesBool[2]){
				if(sidesBool[3]){
					return grassMaterialUpLeftRight;
				}else{
					return grassMaterialUpLeft;
				}
			}else{
				if(sidesBool[3]){
					return grassMaterialUpRight;
				}else{
					return grassMaterialUp;
				}
			}
		}
	} else{
		if (sidesBool[1]){
			if(sidesBool[2]){
				if(sidesBool[3]){
					return grassMaterialDownLeftRight;
				}else{
					return grassMaterialDownLeft;
				}
			}else{
				if(sidesBool[3]){
					return grassMaterialDownRight;
				}else{
					return grassMaterialDown;
				}
			}
		} else {
			if(sidesBool[2]){
				if(sidesBool[3]){
					return grassMaterialLeftRight;
				}else{
					return grassMaterialLeft;
				}
			}else{
				if(sidesBool[3]){
					return grassMaterialRight;
				}else{
					return grassMaterialSimple;
				}
			}
		}
	}
}

//initializes the various grass materials
function createGrass(){
	//grass (top)
	var grassTexture = new THREE.TextureLoader().load('../textures/grass.png');
	grassTexture.magFilter = THREE.NearestFilter;
	grassTexture.minFilter = THREE.LinearMipMapLinearFilter;
	var grassMaterial = new THREE.MeshPhongMaterial( { map: grassTexture } );

	//grass (side)
	var grassSideTexture = new THREE.TextureLoader().load('../textures/grassSide.png');
	grassSideTexture.magFilter = THREE.NearestFilter;
	grassSideTexture.minFilter = THREE.LinearMipMapLinearFilter;
	var grassSideMaterial = new THREE.MeshPhongMaterial( { map: grassSideTexture } );

	grassMaterialSimple.push(grassSideMaterial, grassSideMaterial,grassMaterial,dirtMaterial,grassSideMaterial,grassSideMaterial);
	grassMaterialFull.push(grassMaterial,grassMaterial,grassMaterial,dirtMaterial,grassMaterial,grassMaterial);
	grassMaterialUp.push(grassSideMaterial, grassSideMaterial,grassMaterial,dirtMaterial,grassSideMaterial,grassMaterial);
	grassMaterialDown.push(grassSideMaterial, grassSideMaterial,grassMaterial,dirtMaterial,grassMaterial,grassSideMaterial);
	grassMaterialLeft.push(grassSideMaterial, grassMaterial,grassMaterial,dirtMaterial,grassSideMaterial,grassSideMaterial);
	grassMaterialRight.push(grassMaterial, grassSideMaterial,grassMaterial,dirtMaterial,grassSideMaterial,grassSideMaterial);
	grassMaterialUpDown.push(grassSideMaterial, grassSideMaterial,grassMaterial,dirtMaterial,grassMaterial,grassMaterial);
	grassMaterialUpLeft.push(grassSideMaterial, grassMaterial,grassMaterial,dirtMaterial,grassSideMaterial,grassMaterial);
	grassMaterialUpRight.push(grassMaterial, grassSideMaterial,grassMaterial,dirtMaterial,grassSideMaterial,grassMaterial);
	grassMaterialDownLeft.push(grassSideMaterial, grassMaterial,grassMaterial,dirtMaterial,grassMaterial,grassSideMaterial);
 	grassMaterialDownRight.push(grassMaterial, grassSideMaterial,grassMaterial,dirtMaterial,grassMaterial,grassSideMaterial);
 	grassMaterialLeftRight.push(grassMaterial, grassMaterial,grassMaterial,dirtMaterial,grassSideMaterial,grassSideMaterial);
 	grassMaterialUpDownLeft.push(grassSideMaterial,grassMaterial,grassMaterial,dirtMaterial,grassMaterial,grassMaterial);
 	grassMaterialUpDownRight.push(grassMaterial,grassSideMaterial,grassMaterial,dirtMaterial,grassMaterial,grassMaterial);
 	grassMaterialDownLeftRight.push(grassMaterial,grassMaterial,grassMaterial,dirtMaterial,grassMaterial,grassSideMaterial);
 	grassMaterialUpLeftRight.push(grassMaterial,grassMaterial,grassMaterial,dirtMaterial,grassSideMaterial,grassMaterial);
}

var clouds,cloudTexture,cloudReady=false,cloudOldTime;
//adds clouds to the terrain
function addClouds(size){
		var cloudGeometry=new THREE.PlaneGeometry(size*48,size*48);
		cloudTexture= new THREE.TextureLoader().load('../textures/clouds.png',function(){cloudReady=true;cloudOldTime=Date.now();});
		cloudTexture.magFilter = THREE.NearestFilter;
		cloudTexture.minFilter = THREE.LinearMipMapLinearFilter;
		cloudTexture.repeat.set(0.25, 1);
		cloudTexture.wrapS = cloudTexture.wrapT = THREE.MirroredRepeatWrapping;
		var cloudMaterial = new THREE.MeshPhongMaterial( { map: cloudTexture, transparent: true, opacity: 0.7, side: THREE.DoubleSide } );
		cloudMaterial.alphaTest = 0.4;
		clouds=new THREE.Mesh(cloudGeometry,cloudMaterial);
		terrain.add(clouds);
		clouds.rotation.x=-90*Math.PI/180;
		clouds.position.y=255/4+70;
		clouds.position.x=size/4;
		clouds.position.z=size/4;
		cloudTexture.offset.x -= 0.25;
}

//moves the clouds
function animateClouds(time,speedMultiplier){
	if(!cloudReady) return;
	var t=time-cloudOldTime;
	cloudOldTime=time;
	cloudTexture.offset.x -= t*0.000001*speedMultiplier;
}
