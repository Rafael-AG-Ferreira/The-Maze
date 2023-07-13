import * as THREE from 'three';
import {Set_uvAttribute} from '../SetUVAttribute.js';

export var postLights = new THREE.Group();
export var postFakeLights = new THREE.Group();

export function returnProjector(x, y, z, yROT)
{
    var completeProjector = new THREE.Group();
    const BaseGeometry = new THREE.CylinderGeometry(30, 30, 2000, 16 );
    var tubeTexture = new THREE.TextureLoader().load('./src/Images/metal.jpg', function(texture)
    {
        texture.wrapS= texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.repeat.set(1, 1);
    });
    var materialBase = new THREE.MeshStandardMaterial(  { map: tubeTexture } );
    for(let i = 0; i < 3; i++)
    {
        let post = new THREE.Mesh(BaseGeometry, materialBase);
        if(i > 0)
        {
            post.translateY(i * 1200 + 600);
            post.rotateZ(Math.PI / 2);
            if(i > 1)
            {
                let spotLight = new THREE.SpotLight( 0xfff7c5, 0.6 );
                spotLight.castShadow = true;
                spotLight.angle = Math.PI/4;
                spotLight.distance = 15000;
                spotLight.penumbra = 0.1;
                spotLight.decay = 0.2;
                spotLight.position.set(x, y + 1000, z);
                postLights.add(spotLight);
            }
        }
        else 
        {
            post.scale.y = 2; 
            post.translateY(1200);
        }
        completeProjector.add(post);
    }

    var projectorTexture = new THREE.TextureLoader().load('./src/Images/HolofoteLUZ.jpg');
    const projectorGeometry = new THREE.BoxGeometry( 200, 200, 80 );
    const projectorMaterial = new THREE.MeshStandardMaterial(  { map: projectorTexture } );
    var projectorUvAttribute = projectorGeometry.getAttribute('uv');
    Set_uvAttribute(projectorUvAttribute);
    projectorGeometry.uvsNeedUpdate = true;

    let postFakeGroup = new THREE.Group();

    for(let i = 0; i < 8; i++)
    {
        let projector = new THREE.Mesh( projectorGeometry, projectorMaterial );
        let slider = 1;
        let amount = 1;
        if(i % 2 == 0) slider = -1;
        if(i < 4)
        {
            projector.translateY(3000);
            if(i > 1) amount = 3;
            projector.translateX(300 * slider * amount);
        }
        if(i > 3)
        {
            amount = 1; 
            projector.translateY(1800);
            if(i > 5) amount = 3;
            projector.translateX(300 * slider * amount);
        }
        projector.translateZ(0.5);
        projector.rotateX(Math.PI / 10);

        const geometry = new THREE.PlaneGeometry( 170, 170 );
        const material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
        let fakeOnLights = new THREE.Mesh( geometry, material );
        fakeOnLights.position.set((projector.position.x), (projector.position.y - 270), (projector.position.z + 65));
        fakeOnLights.rotation.copy(projector.rotation);
        
        postFakeGroup.add(fakeOnLights);
        postFakeGroup.rotation.y = yROT;
        postFakeGroup.position.set(x, y, z);
        completeProjector.add(projector);           
    }
    postFakeLights.add(postFakeGroup);
    return completeProjector;
}