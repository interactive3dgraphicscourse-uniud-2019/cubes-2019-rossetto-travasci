/*
    This file contains all the animations for all the objects in
    the scene.
*/

function animateWater( obj, time ) {

    obj.material.alphaMap.offset.y = time * 0.2;
}

function animateFishTail2( obj, time, duration ) {

  tail1 = obj.children[1];
  tail2 = obj.children[2];
  backfin1 = obj.children[2].children[0];
  backfin2 = obj.children[2].children[1];

  // Time to move all the fish tail : 4s
  // Values from 0 to 3999
  swingTime = time % duration;
  if( swingTime > duration/2) {
    swingTime = duration - swingTime;
    tail1.position.x += 0.0008;
    tail2.position.x += 0.0007;
  } else {
    tail1.position.x -= 0.0008;
    tail2.position.x -= 0.0007;
  }

}

function animateFishTail( obj, time, duration ) {

  tail1 = obj.children[1];
  tail2 = obj.children[2];
  backfin1 = obj.children[2].children[0];
  backfin2 = obj.children[2].children[1];

  var swingTime = time % duration;
  if( swingTime > duration/2 ){
    swingTime=duration-swingTime;
  }
  tail1.rotation.y = 14 * Math.PI/180 * swingTime/(duration/2)-7* Math.PI/180;
  tail2.rotation.y = 28 * Math.PI/180 * swingTime/(duration/2)-14* Math.PI/180;
}



/*
  Animates the fish.
  Duration is the time to do the animation.
*/
function animateFish2( fish, time, duration, x, y, z, r ) {

  animateFishTail(fish, time, 500);
  var period = duration;
  var swimTime = time % duration;

  fish.position.z = r*Math.sin(360 * Math.PI/180 * swimTime/period ) + z;
  fish.position.x = r*Math.cos(360 * Math.PI/180 * swimTime/period ) + x;
  fish.position.y=y;

  fish.rotation.y = (-1.9 * Math.PI * swimTime/period + Math.PI/2);
}

function animateFish( fish, time, duration, x, y, z, rx, rz ) {

  animateFishTail(fish, time, 500);
  var period = duration / 2;
  var swimTime = time % duration;

  if( swimTime > duration / 2 ) {
    swimTime=duration-swimTime;
    fish.position.z = Math.sin(360 * Math.PI/180 * swimTime/period )*rz + z ;
    fish.position.x = Math.cos(360 * Math.PI/180 * swimTime/period )*rx + x - rx ;
  } else {
    fish.position.z = Math.sin(360 * Math.PI/180 * swimTime/period + Math.PI )*rz + z ;
    fish.position.x = Math.cos(360 * Math.PI/180 * swimTime/period + Math.PI )*rx + x + rx ;
  }

  fish.position.y=y;
  fish.rotation.y = (-2 * Math.PI * swimTime/period - Math.PI/2);
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
    b[0].rotation.x=(120*Math.PI/180)*wingTime/350;
    b[1].rotation.x=-(120*Math.PI/180)*wingTime/350;

    //move the butterfly
    var t=time%periodCircuit;
    butterfly.position.x=Math.cos(mul*360*Math.PI/180*t/periodCircuit)*rx+x;
    butterfly.position.z=Math.sin(mul*360*Math.PI/180*t/periodCircuit)*rz+z;
    var ty=time%periodOscillation;
    butterfly.position.y=Math.cos(360*Math.PI/180*ty/periodOscillation-Math.PI/4)*ry+y;

    //change the direction the butterfly is pointing towards
    butterfly.rotation.y=-2*Math.PI*t/periodCircuit*mul+Math.PI/2*mul;

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

/*
  Animates the coffer.
*/

function openCoffer(coffer, duration, time, time_i) {

  if( canOpenCoffer ) {
    var pointer = coffer.children[1].children[0].children[0];
    var delta = time - time_i;

    if( delta >= 0 && canPlayOpenCofferAudio ) {
      openAudio.play();
      canPlayOpenCofferAudio = false;
    }

    var t = delta % duration;
    if( t > duration/2 ) {
      t = duration - t;
    }

    pointer.rotation.x = -100 * Math.PI/180 * t/(duration/2);

    if((delta >= 11900) && canPlayCloseCofferAudio) {
      closeAudio.play();
      canPlayCloseCofferAudio = false;
    }

    if(delta >= duration){
      canOpenCoffer = false;
      pointer.rotation.x=0;
    }
  }
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

var cannonInitialTime;
var fuseSmoke=[];
var fuseSparks=[];
var cannonBall;
var cannonFire=[];
var cannonSmoke=[];
var cannonAnimationList=[false,false,false];//used to perform certain operations only once and at a particular moment
//start the shooting animation, creates all the needed blocks
function shootCannon(){
  if (cannonReady&&canPlayFuseAudio&&canPlayCannonAudio){
    fuseAudio.play();
    cannonReady=false;
    cannonInitialTime=Date.now();

    var smallParticleGeometry=new THREE.BoxGeometry(0.15,0.15,0.15);
    var mediumParticleGeometry=new THREE.BoxGeometry(0.225,0.225,0.225);
    var bigParticleGeometry=new THREE.BoxGeometry(0.33,0.33,0.33);
    var hugeParticleGeometry=new THREE.BoxGeometry(0.45,0.45,0.45);
    var cannonBallGeometry=new THREE.BoxGeometry(0.85,0.85,0.85);

    var lightGreyMaterial=new THREE.MeshBasicMaterial({color: 0xb2b2b2});
    var darkGreyMaterial=new THREE.MeshBasicMaterial({color: 0x8c8c8c});
    var deepGreyMaterial=new THREE.MeshBasicMaterial({color: 0x383838});
    var deepDarkMaterial=new THREE.MeshBasicMaterial({color: 0x232323});
    var yellowSparkMaterial=new THREE.MeshBasicMaterial({color: 0xffee32});
    var orangeSparkMaterial=new THREE.MeshBasicMaterial({color: 0xff8300});
    var redFireMaterial=new THREE.MeshBasicMaterial({color: 0xff3700});

    fuseSmoke.push(new THREE.Mesh(smallParticleGeometry,lightGreyMaterial));
    fuseSmoke.push(new THREE.Mesh(smallParticleGeometry,lightGreyMaterial));
    fuseSmoke.push(new THREE.Mesh(smallParticleGeometry,darkGreyMaterial));
    fuseSmoke.push(new THREE.Mesh(mediumParticleGeometry,lightGreyMaterial));
    fuseSmoke.push(new THREE.Mesh(mediumParticleGeometry,darkGreyMaterial));

    fuseSparks.push(new THREE.Mesh(smallParticleGeometry,yellowSparkMaterial));
    fuseSparks.push(new THREE.Mesh(smallParticleGeometry,yellowSparkMaterial));
    fuseSparks.push(new THREE.Mesh(smallParticleGeometry,yellowSparkMaterial));
    fuseSparks.push(new THREE.Mesh(smallParticleGeometry,orangeSparkMaterial));
    fuseSparks.push(new THREE.Mesh(smallParticleGeometry,orangeSparkMaterial));

    cannonBall=new THREE.Mesh(cannonBallGeometry,new THREE.MeshPhongMaterial({color: 0x232323}));
    cannonBall.castShadow=true;
    cannonBall.receiveShadow=true;

    cannonFire.push(new THREE.Mesh(hugeParticleGeometry,redFireMaterial));
    cannonFire.push(new THREE.Mesh(bigParticleGeometry,redFireMaterial));
    cannonFire.push(new THREE.Mesh(bigParticleGeometry,redFireMaterial));
    cannonFire.push(new THREE.Mesh(hugeParticleGeometry,yellowSparkMaterial));
    cannonFire.push(new THREE.Mesh(bigParticleGeometry,yellowSparkMaterial));
    cannonFire.push(new THREE.Mesh(mediumParticleGeometry,yellowSparkMaterial));
    cannonFire.push(new THREE.Mesh(bigParticleGeometry,deepDarkMaterial));
    cannonFire.push(new THREE.Mesh(bigParticleGeometry,deepDarkMaterial));
    cannonFire.push(new THREE.Mesh(mediumParticleGeometry,deepDarkMaterial));
    cannonFire.push(new THREE.Mesh(mediumParticleGeometry,deepDarkMaterial));
    cannonFire.push(new THREE.Mesh(mediumParticleGeometry,deepGreyMaterial));
    cannonFire.push(new THREE.Mesh(mediumParticleGeometry,deepGreyMaterial));

    cannonSmoke.push(new THREE.Mesh(hugeParticleGeometry,deepGreyMaterial));
    cannonSmoke.push(new THREE.Mesh(hugeParticleGeometry,deepGreyMaterial));
    cannonSmoke.push(new THREE.Mesh(hugeParticleGeometry,deepDarkMaterial));
    cannonSmoke.push(new THREE.Mesh(bigParticleGeometry,deepDarkMaterial));
    cannonSmoke.push(new THREE.Mesh(bigParticleGeometry,deepGreyMaterial));
    cannonSmoke.push(new THREE.Mesh(mediumParticleGeometry,deepGreyMaterial));
    cannonSmoke.push(new THREE.Mesh(mediumParticleGeometry,deepGreyMaterial));
    cannonSmoke.push(new THREE.Mesh(mediumParticleGeometry,darkGreyMaterial));
  }
}

//animates the cannonSide
function animateCannonShot(cannon,time){
  if(cannonReady) return;
  var t=time-cannonInitialTime;
  var fuse=cannon.children[1].children[3];
  var cannonBody=cannon.children[1];
  if(t<3000){
    //===============
    //Fuse is ignited
    //===============
    if(!cannonAnimationList[0]) {
      addArrayToObject(fuse,fuseSmoke);
      addArrayToObject(fuse,fuseSparks);
    }
    var particleSpeed=400;
    var t1=t%500;
    var t2=(t+200)%500;
    var t3=(t+400)%500;
    fuseSparks[1].position.set(0.7*(Math.cos(150*Math.PI/180*t2/500)-1)*0.75,0.7*Math.sin(150*Math.PI/180*t2/500)*1.5,0);
    fuseSparks[2].position.set(0.7*(Math.cos(50*Math.PI/180+170*Math.PI/180*t1/500)-1)*0.5*0.35,0.7*Math.sin(50*Math.PI/180+170*Math.PI/180*t1/500)*2,0.7*(Math.cos(50*Math.PI/180+170*Math.PI/180*t1/500)-1)*0.5*0.65);
    fuseSparks[3].position.set(-0.7*(Math.cos(10*Math.PI/180+170*Math.PI/180*t2/500)-1)*0.8*0.10,0.7*Math.sin(10*Math.PI/180+170*Math.PI/180*t2/500)*2,-0.7*(Math.cos(10*Math.PI/180+170*Math.PI/180*t2/500)-1)*0.8*0.90);
    fuseSparks[4].position.set(-0.7*(Math.cos(160*Math.PI/180*t3/500)-1)*1.4*0.05,0.7*Math.sin(160*Math.PI/180*t3/500)*1.2,0.7*(Math.cos(160*Math.PI/180*t3/500)-1)*1.4*0.95);

    fuseSmoke[0].position.set(-0.7*(Math.cos(150*Math.PI/180*t3/500)-1)*0.50,0.7*Math.sin(150*Math.PI/180*t3/500)*1.7,0.7*(Math.cos(150*Math.PI/180*t3/500)-1)*0.50);
    fuseSmoke[1].position.set(0,0.7*Math.sin(150*Math.PI/180*t1/500)*1.7,0.7*(Math.cos(150*Math.PI/180*t1/500)-1)*0.85);
    fuseSmoke[2].position.set(-0.7*(Math.cos(30*Math.PI/180+170*Math.PI/180*t3/500)-1)*0.5*0.45,0.7*Math.sin(30*Math.PI/180+170*Math.PI/180*t3/500)*2.5,-0.7*(Math.cos(30*Math.PI/180+170*Math.PI/180*t3/500)-1)*0.5*0.55);
    fuseSmoke[3].position.set(0.7*(Math.cos(10*Math.PI/180+170*Math.PI/180*t2/500)-1)*0.7*0.60,0.7*Math.sin(10*Math.PI/180+170*Math.PI/180*t2/500)*2.8,-0.7*(Math.cos(10*Math.PI/180+170*Math.PI/180*t2/500)-1)*0.7*0.50);
    fuseSmoke[4].position.set(-0.7*(Math.cos(10*Math.PI/180+150*Math.PI/180*t1/500)-1)*0.75,0.7*Math.sin(10*Math.PI/180+150*Math.PI/180*t1/500),0);

    cannonAnimationList[0]=true;
  } else if(t<3500){
    //=============
    //Shot is fired
    //=============
    if(!cannonAnimationList[1]){
      cannonAudio.play();
      cannonBody.add(cannonBall);
      addArrayToObject(cannonBody,cannonFire);
    }

    var tb=t-3000;
    cannonBall.position.set(4.5+70*tb/1000,-0.5*9.81*(tb/1000)*(tb/1000),0);

    cannonFire[0].position.set(4.5+15*tb/1000,0,0.1*tb*0.0035);
    cannonFire[1].position.set(4.5+15*tb/1000*0.9,tb*0.0035,0);
    cannonFire[2].position.set(4.5+15*tb/1000*0.8,-0.4*tb*0.0035,0.5*tb*0.0035);
    cannonFire[3].position.set(4.5+15*tb/1000*0.7,0.7*tb*0.0035,-0.3*tb*0.0035);
    cannonFire[4].position.set(4.5+15*tb/1000*0.95,-0.5*tb*0.0035,0.5*tb*0.0035);
    cannonFire[5].position.set(4.5+15*tb/1000*0.85,0.75*tb*0.0035,-0.2*tb*0.0035);
    cannonFire[6].position.set(4.5+15*tb/1000*0.75,-0.2*tb*0.0035,-0.2*tb*0.0035);
    cannonFire[7].position.set(4.5+15*tb/1000*0.92,0.7*tb*0.0035,0.4*tb*0.0035);
    cannonFire[8].position.set(4.5+15*tb/1000*0.82,-0.8*tb*0.0035,-0.1*tb*0.0035);
    cannonFire[9].position.set(4.5+15*tb/1000*0.72,-0.5*tb*0.0035,0.4*tb*0.0035);
    cannonFire[10].position.set(4.5+15*tb/1000*0.97,0.6*tb*0.0035,-0.5*tb*0.0035);
    cannonFire[11].position.set(4.5+15*tb/1000*0.87,0.2*tb*0.0035,0.3*tb*0.0035);

    cannonAnimationList[1]=true;
  } else if(t<6500){
    //=============================
    //Smoke after the shot is fired
    //=============================
    if(!cannonAnimationList[2]){
      addArrayToObject(cannonBody,cannonSmoke);
    }

    cannonBall.position.set(4.5+70*(t-3000)/1000,-0.5*9.81*(t-3000)/1000*(t-3000)/1000,0);

    cannonSmoke[0].position.set(4.5+(Math.cos(2*Math.PI*(t-3500)/2000)+0.5),(t-3500)/1000,Math.sin(2*Math.PI*(t-3500)/2000));
    cannonSmoke[1].position.set(4.5+(Math.cos(2.5+2*Math.PI*(t-3500)/2000)+0.5)*0.8,0.10+0.9*(t-3500)/1000,Math.sin(2.5+2*Math.PI*(t-3500)/2000)*0.8);
    cannonSmoke[2].position.set(4.5+(Math.cos(1.7+2*Math.PI*(t-3500)/2000)+0.5)*0.75,0.05+0.9*(t-3500)/1000,Math.sin(1.7+2*Math.PI*(t-3500)/2000)*0.75);
    cannonSmoke[3].position.set(4.5+(Math.cos(4.5+2*Math.PI*(t-3500)/2000)+0.5)*0.5,-0.05+1.3*(t-3500)/1000,Math.sin(4.5+2*Math.PI*(t-3500)/2000)*0.5);
    cannonSmoke[4].position.set(4.5+(Math.cos(2+2*Math.PI*(t-3500)/2000)+0.5)*0.4,1.2*(t-3500)/1000,Math.sin(2+2*Math.PI*(t-3500)/2000)*0.4);
    cannonSmoke[5].position.set(4.5+(Math.cos(5.4+2*Math.PI*(t-3500)/2000)+0.5)*1.10,-0.25+1.2*(t-3500)/1000,Math.sin(5.4+2*Math.PI*(t-3500)/2000)*1.10);
    cannonSmoke[6].position.set(4.5+(Math.cos(0.25+2*Math.PI*(t-3500)/2000)+0.5)*1.2,-0.4+0.7*(t-3500)/1000,Math.sin(0.25+2*Math.PI*(t-3500)/2000)*1.2);
    cannonSmoke[7].position.set(4.5+(Math.cos(5.1+2*Math.PI*(t-3500)/2000)+0.5)*1.05,-0.15+1.05*(t-3500)/1000,Math.sin(5.1+2*Math.PI*(t-3500)/2000)*1.05);;

    cannonAnimationList[2]=true;
  } else if(t<7500){
    //===============
    //Nothing happens
    //===============
  } else {
    //==============================================
    //Resets the variables and deletes the particles
    //==============================================
    for(var i=0;i<fuseSmoke.length;i++){
      fuseSmoke[i].geometry.dispose();
      fuseSmoke[i].material.dispose();
      fuseSmoke[i]=undefined;
    }
    fuseSmoke=[];
    for(var i=0;i<fuseSparks.length;i++){
      fuseSparks[i].geometry.dispose();
      fuseSparks[i].material.dispose();
      fuseSparks[i]=undefined;
    }
    fuseSparks=[];

    cannonBall.geometry.dispose();
    cannonBall.material.dispose();
    cannonBall=undefined;

    for(var i=0;i<cannonFire.length;i++){
      cannonFire[i].geometry.dispose();
      cannonFire[i].material.dispose();
      cannonFire[i]=undefined;
    }
    cannonFire=[];

    for(var i=0;i<cannonSmoke.length;i++){
      cannonSmoke[i].geometry.dispose();
      cannonSmoke[i].material.dispose();
      cannonSmoke[i]=undefined;
    }
    cannonSmoke=[];

    cannonReady=true;
  }
  cannonCleaner(t,fuse,cannonBody);
}

//removes from the scene the meshes that aren't needed anymore
function cannonCleaner(t,fuse,cannonBody){
  if(cannonAnimationList[0]&&t>3000){
    removeArrayFromObject(fuse,fuseSmoke);
    removeArrayFromObject(fuse,fuseSparks);
    cannonAnimationList[0]=false;
  }
  if(cannonAnimationList[1]&&t>3500){
    removeArrayFromObject(cannonBody,cannonFire);
    cannonAnimationList[1]=false;
  }
  if(cannonAnimationList[2]&&t>6500){
    cannonBody.remove(cannonBall);
    removeArrayFromObject(cannonBody,cannonSmoke);
    cannonAnimationList[2]=false;
  }
}

//adds all the objects in the array to the other object
function addArrayToObject(object,array){
  for(var i=0;i<array.length;i++){
    object.add(array[i]);
  }
}

//removes all the objects in the array from the other object
function removeArrayFromObject(object,array){
  for(var i=0;i<array.length;i++){
    object.remove(array[i]);
  }
}
