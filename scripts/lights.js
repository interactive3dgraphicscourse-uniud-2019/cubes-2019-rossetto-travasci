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

function buildLights() {

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
	  dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;

    scene.add( hemiLight );
    scene.add( dirLight );

    //increase the shadow camera
    dirLight.shadow.camera.left = -15;
    dirLight.shadow.camera.right = 15;
    dirLight.shadow.camera.top = 15;
    dirLight.shadow.camera.bottom = -15;

    //fog
    fogColor = new THREE.Color(0xbce7ff);
    scene.background = fogColor;
    scene.fog = new THREE.Fog(fogColor, 200, 400);

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

}

var lastMoment=-1;
function daynight(time) {

    if( canPlayCycle ) {
        var t = time/10000;
        var z = Math.sin(t);
        var y = Math.cos(t);
        var r,g,b;
        var changeFog=false;
        dirLight2.position.set( -1, y, z);
        dirLight2.position.multiplyScalar(50);
        if( y > 0.4 ) {
            // DAY
            dirLight2.intensity = 1;
            dirLight2.shadow.darkness = 0.7;
            dirLight2.castShadow = true;
            r = 188;
            g = 231;
            b = 255;
            if(lastMoment!=0){
              lastMoment=0;
              changeFog=true;
              hemiLight2.intensity=0.6;
            }
        } else if( y < 0.4 && y > -0.4 ) {//dusk and dawn
            v = (y+0.4) / 0.8;
            dirLight2.intensity = v;
            dirLight2.shadow.darkness = v * 0.7;
            dirLight2.castShadow = true;
            hemiLight2.intensity=v*0.5+0.1;
            var p;
            if(y<-0.1){//dusk
              p=(y+0.4)/0.3;
              r = Math.floor(255*p)+Math.floor(42*(1-p));
              g = Math.floor(168*p)+Math.floor(43*(1-p));
              b = Math.floor(28*p)+Math.floor(45*(1-p));
              changeFog=true;
            }else if(y<0.1){
              if(lastMoment!=1){
                lastMoment=1;
                changeFog=true;
              }
              r = 255;
              g = 168;
              b = 28;
            }else{//dawn
              p=1-(y-0.1)/0.3;
              r = Math.floor(255*p)+Math.floor(188*(1-p));
              g = Math.floor(168*p)+Math.floor(231*(1-p));
              b = Math.floor(28*p)+Math.floor(255*(1-p));
              changeFog=true;
            }

        } else {
            // NIGHT
            dirLight2.intensity = 0;
            dirLight2.shadow.darkness = 0.7;
            dirLight2.castShadow = false;
            r = 42;
            g = 43;
            b = 45;
            if(lastMoment!=2){
              lastMoment=2;
              changeFog=true;
              hemiLight2.intensity=0.1;
            }
        }
        color=new THREE.Color("rgb("+r+", "+g+", "+b+")");
        scene.background = color;
        if(changeFog){
          scene.fog.color=color;
    			renderer.setClearColor( color );
        }
    }
}

function switchLight(){
  if(canPlayCycle){
    scene.add( hemiLight );
    scene.add( dirLight );
    scene.remove( hemiLight2 );
    scene.remove( dirLight2 );
    var color=new THREE.Color(0xbce7ff);
    scene.background = color;
    scene.fog.color = color;
    renderer.setClearColor( color );
  }else{
    scene.add( hemiLight2 );
    scene.add( dirLight2 );
    scene.remove( hemiLight );
    scene.remove( dirLight );
    lastMoment=-1;
  }
}
