import { rKnee, lKnee, rAnkle, lAnkle, union } from '../GaryScripts/ObterBoneco.js';
import { legs, gary } from '../GaryScripts/JuntaGeometriasBoneco.js'
import { noOfFrames, jumpSpeed } from './0_Saltar.js';

export function stageOne(stage1, stage2)
{
    if (stage1 && union.rotation.x < 0.5)
    {
        gary.position.y -= 58 / noOfFrames * jumpSpeed;
        union.rotation.x += (0.5 / noOfFrames) * jumpSpeed;
        legs.rotation.x += (-1.5 / noOfFrames) * jumpSpeed;
        lKnee.rotation.x += (2.5 / noOfFrames) * jumpSpeed;
        rKnee.rotation.x += (2.5 / noOfFrames) * jumpSpeed;
        lAnkle.rotation.x += (-1 / noOfFrames) * jumpSpeed;
        rAnkle.rotation.x += (-1 / noOfFrames) * jumpSpeed;
    }
    else
    {
        stage1.value = false;
        stage2.value = true;
        //console.log("STAGE 1 -> Squat");
    }
}