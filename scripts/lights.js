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

var hemiLight, dirLight, fogColor;

var dayColor, nightColor, canPlayCycle;

function createLights() {

    // Setting Hemisphere
    hemiLight = new THREE.HemisphereLight( 0xffffff, 0x00ff00, 0.6 );
	hemiLight.color.setHSL( 0.6, 1, 0.6 );
    hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
    hemiLight.position.set( 0, 500, 0 );

    // Setting DirectionaLight
    dirLight = new THREE.DirectionalLight( 0xffffff, 1);
    dirLight.color.setHSL( 0.1, 1, 0.95 );
    dirLight.position.set( -1, 1.75, 0);
    dirLight.position.multiplyScalar( 50 );
	dirLight.castShadow = true;
	dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;

    scene.add( hemiLight );
    scene.add( dirLight );

    //increase the shadow camera
    dirLight.shadow.camera.left = -15;
    dirLight.shadow.camera.right = 15;
    dirLight.shadow.camera.top = 15;
    dirLight.shadow.camera.bottom = -15;

    // Need tweaks
    dirLight.shadow.camera.far = 3500;
    dirLight.shadow.bias = -0.000001;       

    //fog
	fogColor = new THREE.Color(0xbce7ff);
	scene.background = fogColor;
    scene.fog = new THREE.Fog(fogColor, 200, 400);
    
    dayColor = new THREE.Color(0xbce7ff);
    nightColor = new THREE.Color(0x252850);

}

function daynight(time) {

    if( canPlayCycle ) {
        var t = time * 0.0002;
        var x = Math.sin(t);
        var y = Math.cos(t);

        dirLight.position.set( x, x, y);
        dirLight.position.multiplyScalar(50);

        dayColor = dayColor + new THREE.Color( (dayColor-nightColor)/60 );

        if( x > 0.2 ) {
            // DAY
            dirLight.intensity = 1;
            dirLight.shadow.darkness = 0.7;
        } else if( x < 0.2 && x > 0 ) {
            v = x / 0.2;
            dirLight.intensity = v;
            dirLight.shadow.darkness = v * 0.7;
        } else {
            // NIGHT
            dirLight.intensity = 0;
            dirLight.shadow.darkness = 0.7;
        }
    }
}
