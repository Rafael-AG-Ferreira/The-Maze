import { rShoulder, lShoulder } from '../GaryScripts/ObterBoneco.js';
import { gary } from '../GaryScripts/JuntaGeometriasBoneco.js'
import { noOfFrames, jumpSpeed, jumpSize, increment } from './0_Saltar.js';

export function stageThree(stage3, stage4)
{
    if(stage3 && gary.position.y < (jumpSize + 105))
    {
        gary.position.y += increment;
        lShoulder.rotation.x -= ((Math.PI) / (noOfFrames * 2 / jumpSpeed));
        rShoulder.rotation.x -= ((Math.PI) / (noOfFrames * 2 / jumpSpeed));
    }
    else
    {
        stage3.value = false;
        stage4.value = true;
        //console.log("STAGE 3 -> Saltei");
    }
}