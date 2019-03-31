/*
    THIS SCRIPT CREATES A FISH AND ADDS IT TO THE SCENE
*/

/*
    Scene must be a globale parameter : issue.
*/
function createBlueFish() {

    // Geometries and materials
    var body_geometry = new THREE.BoxBufferGeometry( 0.23, 0.195, 0.222 );
    var body_material = new THREE.MeshBasicMaterial(
        { color: 0x0060fc }
    );

    var tail1_geometry = new THREE.BoxBufferGeometry( 0.234, 0.148, 0.152 );
    var tail1_material = new THREE.MeshBasicMaterial(
        { color: 0x1fb8de }
    );

    var tail2_geometry = new THREE.BoxBufferGeometry( 0.226, 0.09, 0.102 );

    var backfin_geometry = new THREE.BoxBufferGeometry( 0.054, 0.02, 0.005 );
    var fin_material = new THREE.MeshBasicMaterial(
        { color: 0x404040 }
    );

    var topfin_geometry = new THREE.BoxBufferGeometry( 0.14, 0.074, 0.010);

    var eye_geometry = new THREE.BoxBufferGeometry( 0.05, 0.24, 0.038 );
    var eye_material = new THREE.MeshBasicMaterial(
        { color: 0x000000 }
    );

    // Meshes
    var body = new THREE.Mesh(body_geometry, body_material);
    var tail1 = new THREE.Mesh(tail1_geometry, tail1_material);
    var tail2 = new THREE.Mesh(tail2_geometry, body_material);
    var backfin1 = new THREE.Mesh(backfin_geometry, fin_material);
    var backfin2 = new THREE.Mesh(backfin_geometry, fin_material);
    var topfin = new THREE.Mesh(topfin_geometry, fin_material);
    var eye = new THREE.Mesh(eye_geometry, eye_material);
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
    body.add(tail1);
    body.add(tail2);
    tail2.add(backfin1);
    tail2.add(backfin2);
    body.add(topfin);
    body.add(eye);

    return body;
}