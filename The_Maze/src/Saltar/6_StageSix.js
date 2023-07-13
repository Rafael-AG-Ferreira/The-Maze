import { rKnee, lKnee, rAnkle, lAnkle, union } from '../GaryScripts/ObterBoneco.js';
import { legs, gary } from '../GaryScripts/JuntaGeometriasBoneco.js'
import { noOfFrames, jumpSpeed } from './0_Saltar.js';

export function stageSix(stage6, stage7)
{
    if (stage6 && union.rotation.x <= 0.25)
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
        stage6.value = false;
        stage7.value = true;
        //console.log("STAGE 6 -> Half Squat");
    }
}