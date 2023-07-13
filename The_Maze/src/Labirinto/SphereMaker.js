import * as THREE from 'three';

export function makeSphere(radius, widthSegments, heightSegments, texture, xPos, yPos, zPos)
{
    const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    const sphereMaterial = new THREE.MeshStandardMaterial( { map: texture} );
    const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
    sphere.position.x = xPos;
    sphere.position.y = yPos;
    sphere.position.z = zPos;
    return sphere;
}