import * as THREE from 'three';

export function makeParallelepiped(width, height, depth, ParallelepipedTexture, xTranslation, yTranslation, zTranslation, xRotation, yRotation, zRotation)
{
    var ParallelepipedGeometry = new THREE.BoxGeometry( width, height, depth );
    var ParallelepipedMaterial = new THREE.MeshStandardMaterial(  { map: ParallelepipedTexture } );
    var Parallelepiped = new THREE.Mesh( ParallelepipedGeometry, ParallelepipedMaterial );
    Parallelepiped.translateX(xTranslation);
    Parallelepiped.translateY(yTranslation);
    Parallelepiped.translateY(zTranslation);
    Parallelepiped.rotateX(xRotation);
    Parallelepiped.rotateY(yRotation);
    Parallelepiped.rotateZ(zRotation);
    return Parallelepiped;
}