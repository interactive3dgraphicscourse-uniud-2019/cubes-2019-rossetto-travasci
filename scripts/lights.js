/*
    Setting up lights.
*/

/*
    This method initializes the lights to a given data.
    ( -- this case is the default -- )

    Hemisphere : color, groundColor, intensity

    DirectionaLight : color, intensity

    Both are pointing a particular direction given by a Vector3.
*/

var hemiLight, dirLight;
var hemiLight2, dirLight2;

var dayColor, nightColor;

function createLights() {

    //==========================
    //The standard static lights
    //==========================

    // Setting Hemisphere
    hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
	  hemiLight.color.setHSL( 0.6, 1, 0.6 );
    hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
    hemiLight.position.set( 0, 500, 0 );
    //hemiLight.position.multiplyScalar(5);

    // Setting DirectionaLight
    dirLight = new THREE.DirectionalLight( 0xffffff, 1 );

    dirLight.color.setHSL( 0.1, 1, 0.95 );
    dirLight.position.set( -2, 1.7, 1 );
    //dirLight.position.set( -2, 1.7, 3 );                // afternoon (?)
    dirLight.position.multiplyScalar( 40 );
	  dirLight.castShadow = true;
	  dirLight.shadow.mapSize.width = 4096;
    dirLight.shadow.mapSize.height = 4096;

    scene.add( hemiLight );
    scene.add( dirLight );

    //increase the shadow camera
    dirLight.shadow.camera.left = -15;
    dirLight.shadow.camera.right = 15;
    dirLight.shadow.camera.top = 15;
    dirLight.shadow.camera.bottom = -15;

    //==========================================
    //The lights for the animated daynight cycle
    //==========================================

    // Setting Hemisphere
    hemiLight2 = new THREE.HemisphereLight( 0xffffff, 0x00ff00, 0.6 );
	  hemiLight2.color.setHSL( 0.6, 1, 0.6 );
    hemiLight2.groundColor.setHSL( 0.095, 1, 0.75 );
    hemiLight2.position.set( 0, 500, 0 );

    // Setting DirectionaLight
    dirLight2 = new THREE.DirectionalLight( 0xffffff, 1);
    dirLight2.color.setHSL( 0.1, 1, 0.95 );
    dirLight2.position.set( -1, 1.75, 0);
    dirLight2.position.multiplyScalar( 50 );
	  dirLight2.castShadow = true;
	  dirLight2.shadow.mapSize.width = 2048;
    dirLight2.shadow.mapSize.height = 2048;

    //increase the shadow camera
    dirLight2.shadow.camera.left = -15;
    dirLight2.shadow.camera.right = 15;
    dirLight2.shadow.camera.top = 15;
    dirLight2.shadow.camera.bottom = -15;

    // Need tweaks
    dirLight2.shadow.camera.far = 3500;
    dirLight2.shadow.bias = -0.000001;

    dayColor = new THREE.Color(0xbce7ff);
    nightColor = new THREE.Color(0x252850);

}

var backColor = new THREE.Color(0xbce7ff);
function daynight(time) {

    if( canPlayCycle ) {
        var t = time * 0.0001;
        var x = Math.sin(t);
        var y = Math.cos(t);

        dirLight2.position.set( x, x, y);
        dirLight2.position.multiplyScalar(50);
        scene.background = new THREE.Color(0xbce7ff);
        var background = scene.background;

        if( x > 0.2 ) {
            // DAY
            dirLight2.intensity = 1;
            dirLight2.shadow.darkness = 0.7;
            dirLight2.castShadow = true;
            if( nightColor <= dayColor ) {
                r = 151/360;
                g = 201/360;
                b = 175/360;
            } else {
                r = 0;
                g = 0;
                b = 0;
            }
            scene.background += scene.background.add(r, g, b);
        } else if( x < 0.2 && x > 0 ) {
            v = x / 0.2;
            dirLight2.intensity = v;
            dirLight2.shadow.darkness = v * 0.7;
            dirLight2.castShadow = true;
            if( nightColor <= dayColor ) {
                r = 151/360;
                g = 201/360;
                b = 175/360;
            } else {
                r = 0;
                g = 0;
                b = 0;
            }
            scene.background += scene.background.add(r, g, b);
        } else {
            // NIGHT
            dirLight2.intensity = 0.1;
            dirLight2.shadow.darkness = 0.7;
            dirLight2.castShadow = false;
            if( dayColor >= nightColor ) {
                r = -151/360;
                g = -201/360;
                b = -175/360;
            } else {
                r = 0;
                g = 0;
                b = 0;
            }

        }
    }
}

function switchLight(){
  if(canPlayCycle){
    scene.add( hemiLight );
    scene.add( dirLight );
    scene.remove( hemiLight2 );
    scene.remove( dirLight2 );
  }else{
    scene.add( hemiLight2 );
    scene.add( dirLight2 );
    scene.remove( hemiLight );
    scene.remove( dirLight );
  }
}
