//Creates a butterfly with wings the color of 'color'
function buildButterfly(color){
  var rightWing=buildWing(color);
  var leftWing=buildWing(color);
  var butterfly=new THREE.Object3D;
  var body=buildButterflyBody();
  leftWing.position.z=0.8;
  rightWing.position.z=-0.8;
  leftWing.scale.set(1.2,1.2,1.2);
  rightWing.scale.set(1.2,1.2,1.2);
  butterfly.add(leftWing);
  butterfly.add(rightWing);
  butterfly.add(body);
  butterfly.scale.set(0.07,0.07,0.07);
  return butterfly;
}

//builds a wing of the butterfly
function buildWing(color){
  var material=new THREE.MeshBasicMaterial({color:color});
  var geometry1=new THREE.BoxGeometry(1,3,1);
  var geometry2=new THREE.BoxGeometry(1,2,1);
  var geometry3=new THREE.BoxGeometry(1,1,1);
  var mesh1=new THREE.Mesh(geometry1,material);
  var mesh2=new THREE.Mesh(geometry2,material);
  var mesh3=new THREE.Mesh(geometry3,material);
  mesh1.position.y=1.5;
  mesh2.position.y=1;
  mesh3.position.y=0.5;
  mesh1.position.x=-1;
  mesh3.position.x=1;
  var wing=new THREE.Object3D;
  wing.add(mesh1);
  wing.add(mesh2);
  wing.add(mesh3);
  return wing;
}

//builds the body of the butterfly
function buildButterflyBody(){
  var material=new THREE.MeshBasicMaterial({color:0x000000});
  var geometryBody=new THREE.BoxGeometry(4,0.5,0.5);
  var geometryHead=new THREE.BoxGeometry(1,1,1);
  var meshBody=new THREE.Mesh(geometryBody,material);
  var meshHead=new THREE.Mesh(geometryHead,material);
  var body=new THREE.Object3D;
  meshHead.position.x=-2.5;
  meshBody.position.x=-0.25;
  body.add(meshBody);
  body.add(meshHead);
  return body;
}

//Animates the butterfly 'butterfly' by making it go around an ellipse centered at 'x', 'y', 'z' in periodCircuit time.
//The ellipse as an axis aligned with the x axis and with a length of 'rx' and another axis aligned with the z axis and with a length of 'rz'.
//The butterfly also goes up and down by a distance of 'ry', reaching the apex height every periodOscillation milliseconds.
//Clockwise is true when the butterfly if flying in a clockwise motion.
function animateButterfly(butterfly,time,x,y,z,periodCircuit,periodOscillation,rx,ry,rz,clockwise){

  var b=butterfly.children;
  var mul=1;
  if(!clockwise)mul=-1;
  //animate the wings
  var wingTime=time%700;
  if (wingTime>350) {
    wingTime=700-wingTime;
  }
  b[0].rotation.x=(90*Math.PI/180)*wingTime/350;
  b[1].rotation.x=-(90*Math.PI/180)*wingTime/350;

  //move the butterfly
  var t=time%periodCircuit;
  butterfly.position.x=Math.cos(mul*360*Math.PI/180*t/periodCircuit)*rx+x;
  butterfly.position.z=Math.sin(mul*360*Math.PI/180*t/periodCircuit)*rz+z;
  var ty=time%periodOscillation;
  butterfly.position.y=Math.cos(360*Math.PI/180*ty/periodOscillation-Math.PI/4)*ry+y;

  //change the direction the butterfly is pointing towards
  butterfly.rotation.y=-2*Math.PI*t/periodCircuit*mul+Math.PI/2*mul;

}
