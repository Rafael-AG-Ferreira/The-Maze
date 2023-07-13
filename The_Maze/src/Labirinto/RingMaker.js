import * as THREE from 'three';

export function makeRing(radius, tube, radialSegments, tubularSegments, arc, texture, xRotation, xPos, yPos, zPos)
{
    const ringGeometry = new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments, arc);
    const ringMaterial = new THREE.MeshStandardMaterial( { map: texture } );
    const ring = new THREE.Mesh( ringGeometry, ringMaterial );
    ring.rotation.x = xRotation;
    ring.position.x = xPos;
    ring.position.y = yPos;
    ring.position.z = zPos;
    return ring;
}