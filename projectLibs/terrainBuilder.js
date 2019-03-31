function buildTerrain(scene){
	var img = new Image();
	img.onload = function () {

		//get height data from img
		var data = getHeightData(img,0.5);

		//starts the construction of the terrain
		createTerrain(scene, data);
	}

	// load img source
	img.src = "../models/textures/heightmapIsland.png";
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

//build the terrain by using an array contain the various heights and adds it to the scene
//we suppose the base of the terrain to be a square
function createTerrain(scene, data){
	//the lenght and width of the terrain
	var side=parseInt(Math.sqrt(data.length));
	//the Object3D containing the terrain
	var terrain=new THREE.Object3D();

	var cube;
	var geometry = new THREE.BoxGeometry(0.5,0.5,0.5);
	var texture = new THREE.TextureLoader().load('../models/textures/missingTexture.png');
	texture.magFilter = THREE.NearestFilter;
	texture.minFilter = THREE.LinearMipMapLinearFilter;
	var material = new THREE.MeshPhongMaterial( { map: texture } );

	for(var i=0;i<side;i++){
		for(var j=0;j<side;j++){
			cube = new THREE.Mesh( geometry, material );
			terrain.add(cube);
			cube.position.x=j/2;
			cube.position.z=i/2;
			cube.position.y=data[i*side+j];
		}
	}
	scene.add(terrain);

	//center the terrain on the origin
	terrain.position.x=-side/4;
	terrain.position.z=-side/4;
	terrain.position.y=-(127.5)/2;
}
