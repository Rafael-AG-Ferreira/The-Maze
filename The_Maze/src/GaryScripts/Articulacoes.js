import * as THREE from 'three';

export function makeArticulacoes(radius, articulationTexture, xTranslation, yTranslation, zRotation)
{
    var articulationGeometry = new THREE.SphereGeometry( radius, 32, 16 );
    var articulationMaterial = new THREE.MeshStandardMaterial(  { map: articulationTexture } );
    var articulation = new THREE.Mesh( articulationGeometry, articulationMaterial );
    articulation.translateX(xTranslation);
    articulation.translateY(yTranslation);
    articulation.rotateZ(zRotation);
    return articulation;
}