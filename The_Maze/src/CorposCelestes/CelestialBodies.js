import * as THREE from 'three';

const celestialGeometry = new THREE.SphereGeometry(500, 64, 32);

//#region MOON
    var moonTexture = new THREE.TextureLoader().load('./src/Images/MoonTexture.jpg');
    const moonMaterial = new THREE.MeshBasicMaterial( { map: moonTexture } );
    export var moon = new THREE.Mesh(celestialGeometry, moonMaterial);
    moon.position.set(-20000, 0, 0);
    
    export var moonLight = new THREE.PointLight( 0xffffff, 0);
    moonLight.castShadow = true;
    moonLight.position.x = -19000;
//#endregion

//#region SUN
    var sunTexture = new THREE.TextureLoader().load('./src/Images/sun.jpg');
    const sunMaterial = new THREE.MeshBasicMaterial( { map: sunTexture } );
    export var sun = new THREE.Mesh(celestialGeometry, sunMaterial);
    sun.position.set(20000, 0, 0);

    export var sunLight = new THREE.PointLight( 0xffffff, 1.5 );
    sunLight.castShadow = true;
    sunLight.position.x = 19000;
//#endregion