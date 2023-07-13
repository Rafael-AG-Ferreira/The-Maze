import { rKnee, lKnee, rAnkle, lAnkle, rShoulder, lShoulder, union } from '../GaryScripts/ObterBoneco.js';
import { legs, gary } from '../GaryScripts/JuntaGeometriasBoneco.js'
import { noOfFrames, jumpSpeed } from './0_Saltar.js';

export function stageTwo(stage2, stage3)
{
    if(stage2 && union.rotation.x > 0)
    {
        gary.position.y += 58 / noOfFrames * jumpSpeed;
        union.rotation.x -= (0.5 / noOfFrames) * jumpSpeed;
        legs.rotation.x -= (-1.5 / noOfFrames) * jumpSpeed;
        lKnee.rotation.x -= (2.5 / noOfFrames) * jumpSpeed;
        rKnee.rotation.x -= (2.5 / noOfFrames) * jumpSpeed;
        lAnkle.rotation.x -= (-1 / noOfFrames) * jumpSpeed;
        rAnkle.rotation.x -= (-1 / noOfFrames) * jumpSpeed;
        lShoulder.rotation.x -= ((Math.PI) / (noOfFrames * 2 / jumpSpeed));
        rShoulder.rotation.x -= ((Math.PI) / (noOfFrames * 2 / jumpSpeed));
    }
    else
    {
        stage2.value = false;
        stage3.value = true;
        //console.log("STAGE 2 -> Anti - Squat");
    }
}