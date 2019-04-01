/*
    This file contains all the animations for all the objects in 
    the scene.
*/

function animateWater( obj, time ) {

    obj.material.alphaMap.offset.y = time * 0.2;
}