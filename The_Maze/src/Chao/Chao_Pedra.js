import * as THREE from 'three';

var mapStone = new THREE.TextureLoader().load("./src/Images/Pedra_0.png", function(stoneTexture)
{
	stoneTexture.wrapS = stoneTexture.wrapT = THREE.RepeatWrapping;
	stoneTexture.offset.set(0, 0);
	stoneTexture.repeat.set(50, 50);
});
var bmapStone = new THREE.TextureLoader().load("./src/Images/Pedra_0_Bump.png", function(stoneTexture)
{
	stoneTexture.wrapS = stoneTexture.wrapT = THREE.RepeatWrapping;
	stoneTexture.offset.set(0, 0);
	stoneTexture.repeat.set(50, 50);
});
var dmapStone = new THREE.TextureLoader().load("./src/Images/Pedra_0_Displacement.png", function(stoneTexture)
{
	stoneTexture.wrapS = stoneTexture.wrapT = THREE.RepeatWrapping;
	stoneTexture.offset.set(0, 0);
	stoneTexture.repeat.set(50, 50);
});

var materialStone = new THREE.MeshStandardMaterial
(
    {
        bumpMap: bmapStone,
        bumpScale: 1.3,
        displacementMap: dmapStone,
        displacementScale: 5,
        map: mapStone
    }
);

var geometry = new THREE.PlaneGeometry(12000, 12000,50,50);
export var stoneFloor = new THREE.Mesh(geometry, materialStone);
		stoneFloor.rotation.x = -Math.PI/2;
export var gameAmbientLight = new THREE.AmbientLight( 0xffffff);
		gameAmbientLight.intensity = 0.1;
		stoneFloor.add(gameAmbientLight);

