import * as THREE from 'three';

export function makeFootPrints(xPosition, zPosition, zRotation)
{
    var footPrintGeometry = new THREE.CircleGeometry( 50, 128 );
    var footPrintTexture = new THREE.TextureLoader().load('./src/Images/Foot_Print.png');
    var footPrintMaterial = new THREE.MeshStandardMaterial(  { map: footPrintTexture } );
    footPrintMaterial.transparent = true;
    
    var footPrint = new THREE.Mesh(footPrintGeometry, footPrintMaterial);
    footPrint.rotation.x = -(Math.PI/2);
    footPrint.rotation.z = Math.PI + zRotation;
    footPrint.position.x = xPosition;
    footPrint.position.y = 10;
    footPrint.position.z = zPosition;
    return footPrint;
}