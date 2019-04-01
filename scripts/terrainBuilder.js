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

//declared here sot hey can be used everywhere
var terrain, cube, geometry, material;

//build the terrain by using an array contain the various heights and adds it to the scene
//we suppose the base of the terrain to be a square
function createTerrain(scene, data){
	//the lenght and width of the terrain
	var side=parseInt(Math.sqrt(data.length));
	//the Object3D containing the terrain
	terrain=new THREE.Object3D();

	geometry = new THREE.BoxGeometry(0.5,0.5,0.5);
	var texture = new THREE.TextureLoader().load('../models/textures/sand.png');
	texture.magFilter = THREE.NearestFilter;
	texture.minFilter = THREE.LinearMipMapLinearFilter;
	material = new THREE.MeshPhongMaterial( { map: texture } );

	for(var i=0;i<side;i++){
		for(var j=0;j<side;j++){
			var up, down, left, right;

			//dealing with the special cases where the considered point is at the edge of the terrain
			if(i==0){
				up=data[i*side+j];
				down=data[(i+1)*side+j];
			} else if (i==side-1){
				up=data[(i-1)*side+j];
				down=data[i*side+j];
			} else {
				up=data[(i-1)*side+j];
				down=data[(i+1)*side+j];
			}

			if(j==0){
				right=data[i*side+j+1];
				left=data[i*side+j];
			} else if (j==side-1){
				right=data[i*side+j];
				left=data[i*side+j-1];
			} else {
				right=data[i*side+j+1];
				left=data[i*side+j-1];
			}

			var y=data[i*side+j];
			var min=Math.min(up,down,left,right,y);

			buildColumn(j/2,i/2,y,(y-min)*2);
		}
	}
	scene.add(terrain);

	//center the terrain on the origin
	terrain.position.x=-side/4;
	terrain.position.z=-side/4;
	terrain.position.y=-(127.5)/2;
}

//given a set of coordinates and a number n, it create of column of blocks n blocks tall with the block on top being at those coordinates
function buildColumn(x,z,y,n){
	//the surface block
	cube = new THREE.Mesh( geometry, material );
	terrain.add(cube);
	cube.position.x=x;
	cube.position.z=z;
	cube.position.y=y;

	//the blocks under the surface block
	for(var i=1;i<n;i++){
		cube = new THREE.Mesh( geometry, material );
		terrain.add(cube);
		cube.position.x=x;
		cube.position.z=z;
		cube.position.y=y-(i/2);
	}

}
