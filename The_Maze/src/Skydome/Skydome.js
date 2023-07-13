import * as THREE from 'three';

//#region SKYDOME
var backgroundGeo = new THREE.SphereGeometry(22000, 25, 25); 
var loader  = new THREE.TextureLoader(), 
    texture = loader.load( "./src/Images/SkyDome/bground.jpg" );     

var backgroundMaterial = new THREE.MeshStandardMaterial
({ 
     map: texture,
});

export var background = new THREE.Mesh(backgroundGeo, backgroundMaterial);
           background.material.side = THREE.BackSide; 
//#endregion
