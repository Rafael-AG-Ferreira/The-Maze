import * as THREE from 'three';

import {rShoe, lShoe, union, torso, head, rAnkle, lAnkle, rKnee, lKnee, rHipJoint, lHipJoint, lGlenoHumeral, rGlenoHumeral,
lElbow, rElbow, rFemur, lFemur, rTibia, lTibia, lShoulder, rShoulder, lArm, rArm, lForearm, rForearm, neck} from './ObterBoneco.js';

//#region PERNA DIREITA
    export var rightLeg = new THREE.Group(); rHipJoint.add(rFemur); rFemur.add(rKnee); rKnee.add(rTibia);
        rTibia.add(rAnkle); rAnkle.add(rShoe); rightLeg.add( rHipJoint );
//#endregion
//#region PERNA ESQUERDA
    export var leftLeg = new THREE.Group(); lHipJoint.add(lFemur); lFemur.add(lKnee); lKnee.add(lTibia);
        lTibia.add(lAnkle); lAnkle.add(lShoe); leftLeg.add( lHipJoint );
//#endregion
//#region GRUPO DUAS PERNAS
    export var legs = new THREE.Group(); legs.add( leftLeg ); legs.add( rightLeg );
//#endregion
//#region BRAÇO ESQUERDO
    export var leftArm = new THREE.Group(); lShoulder.add( lGlenoHumeral ); lGlenoHumeral.add( lArm );
        lArm.add(lElbow); lElbow.add(lForearm); leftArm.add( lShoulder );
//#endregion
//#region BRAÇO DIREITO
    export var rightArm = new THREE.Group(); rShoulder.add( rGlenoHumeral ); rGlenoHumeral.add( rArm );
        rArm.add(rElbow); rElbow.add(rForearm); rightArm.add( rShoulder );
//#endregion
//#region TORSO COMPLETO
    export var upperBody = new THREE.Group(); upperBody.add( torso ); upperBody.add( leftArm ); upperBody.add( rightArm );
//#endregion
//#region CABEÇA COMPLETA
    export var firstPersonCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 50, 100000);
    firstPersonCamera.translateZ(-15);
    firstPersonCamera.rotation.y = Math.PI;
    head.add(firstPersonCamera);

    export var thirdPersonCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 50, 100000);
    thirdPersonCamera.translateY(350);
    thirdPersonCamera.translateZ(-200);
    thirdPersonCamera.lookAt(head.position.x, head.position.y, head.position.z);
    thirdPersonCamera.rotation.x -= 0.25;
    head.add(thirdPersonCamera);

    export var mapCamera = new THREE.OrthographicCamera(-4000, 4000, 4000, -4000, -4000, 4000);
    mapCamera.translateY(600);
    mapCamera.lookAt(head.position.x, head.position.y, head.position.z);
    head.add(mapCamera);

    export var fullHead = new THREE.Group(); fullHead.add( neck ); fullHead.add( head ); upperBody.add(fullHead); union.add(upperBody);

    export var viewGaryCam = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 50, 100000);
    viewGaryCam.translateY(130);
    viewGaryCam.translateZ(500);
    viewGaryCam.lookAt(head.position.x, head.position.y, head.position.z);
    union.add(viewGaryCam);
//#endregion
//#region BONECO COMPLETO
    export var gary = new THREE.Group(); gary.add( legs ); gary.add( union );
    gary.translateX(-5600);
    gary.translateY(105);
    gary.translateZ(-6200);
//#endregion