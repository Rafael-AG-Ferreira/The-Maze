import * as THREE from 'three';
import {Set_uvAttribute} from '../SetUVAttribute.js';

export function makeParallelepipedUV(width, height, depth, ParallelepipedTexture, xTranslation, yTranslation, zTranslation, xRotation, yRotation, zRotation)
{
        var ParallelepipedUVGeometry = new THREE.BoxGeometry( width, height, depth );
        var ParallelepipedUVMaterial = new THREE.MeshStandardMaterial(  { map: ParallelepipedTexture } );
        var ParallelepipedUVAttribute = ParallelepipedUVGeometry.getAttribute('uv');
        Set_uvAttribute(ParallelepipedUVAttribute);
        ParallelepipedUVGeometry.uvsNeedUpdate = true;
        var ParallelepipedUV = new THREE.Mesh( ParallelepipedUVGeometry, ParallelepipedUVMaterial );
        ParallelepipedUV.translateX(xTranslation);
        ParallelepipedUV.translateY(yTranslation);
        ParallelepipedUV.translateZ(zTranslation);
        ParallelepipedUV.rotateX(xRotation);
        ParallelepipedUV.rotateY(yRotation);
        ParallelepipedUV.rotateZ(zRotation);
        return ParallelepipedUV;
}