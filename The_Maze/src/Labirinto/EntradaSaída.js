import * as THREE from 'three';

import { wallBallTexture, wallTowerTexture } from "./MakeMaze.js";
import { arcCylinderMaker } from "./CylinderMaker.js";
import { makeRing } from "./RingMaker.js";
import { makeSphere } from "./SphereMaker.js";

export function makeArcs()
{
    const rightPillar = arcCylinderMaker(110, 110, 509, 64, 400, 9, 0, 40, wallTowerTexture);
    const leftPillar = arcCylinderMaker(110, 110, 509, 64, -400, 9, 0, 18, wallTowerTexture);
    const rightPillarRing = makeRing(110, 10, 16, 100, 2 * Math.PI, wallBallTexture, Math.PI/2, 400, 250, 0);
    const leftPillarRing = makeRing(110, 10, 16, 100, 2 * Math.PI, wallBallTexture, Math.PI/2, -400, 250, 0);
    const halfRing = makeRing(400, 80, 30, 100, 3, wallBallTexture, 0, 0, 30, 0);
    const rightPillarSphere = makeSphere(110, 64, 32, wallBallTexture, 400, 270, 0);
    const leftPillarSphere = makeSphere(110, 64, 32, wallBallTexture, -400, 270, 0);
    
    var completeArc = new THREE.Group();
    completeArc.add(rightPillar, leftPillar, rightPillarRing, leftPillarRing, halfRing, rightPillarSphere, leftPillarSphere);
    completeArc.castShadow = true;
    completeArc.receiveShadow = true;
    return completeArc;
}