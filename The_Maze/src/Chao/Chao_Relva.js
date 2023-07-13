import * as THREE from 'three';

var mapGrass = new THREE.TextureLoader().load("./src/Images/Relva_0.png", function(grassTexture)
{
	grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
	grassTexture.offset.set(0, 0);
	grassTexture.repeat.set(50, 50);
});
var bmapGrass = new THREE.TextureLoader().load("./src/Images/Relva_0_Bump.png", function(grassTexture)
{
	grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
	grassTexture.offset.set(0, 0);
	grassTexture.repeat.set(50, 50);
});
var dmapGrass = new THREE.TextureLoader().load("./src/Images/Relva_0_Displacement.png", function(grassTexture)
{
	grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
	grassTexture.offset.set(0, 0);
	grassTexture.repeat.set(50, 50);
});

var materialGrass = new THREE.MeshStandardMaterial
(
    {
        bumpMap: bmapGrass,
        bumpScale: 1.3,
        displacementMap: dmapGrass,
        displacementScale: 5,
        map: mapGrass
    }
);

var geometry = new THREE.CircleGeometry( 22001, 128 );
export var grassFloor = new THREE.Mesh(geometry, materialGrass);
grassFloor.translateY(-4.5);
grassFloor.rotation.x = -Math.PI/2;

