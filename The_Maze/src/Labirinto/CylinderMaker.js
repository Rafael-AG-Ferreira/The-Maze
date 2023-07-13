import * as THREE from 'three';

export function arcCylinderMaker(topRadius, bottomRadius, ySize, segments, xPos, yPos, zPos, yRotation, texture)
{
    const PillarGeometry = new THREE.CylinderGeometry(topRadius, bottomRadius, ySize, segments);
    const PillarMaterial = new THREE.MeshStandardMaterial( {map: texture} );
    const pillar = new THREE.Mesh(PillarGeometry ,  PillarMaterial);
    pillar.position.set(xPos, yPos, zPos);
    pillar.rotation.y = yRotation;
    return pillar;
}