import { rKnee, lKnee, rAnkle, lAnkle, rShoulder, lShoulder, union } from '../GaryScripts/ObterBoneco.js';
import { legs, gary } from '../GaryScripts/JuntaGeometriasBoneco.js'
import { noOfFrames, jumpSpeed } from './0_Saltar.js';
import { zerar } from './8_Zerar.js';

export function stageSeven(stage7)
{
    if(stage7 && union.rotation.x > 0)
    {
        gary.position.y += 58 / noOfFrames * jumpSpeed;
        union.rotation.x -= (0.5 / noOfFrames) * jumpSpeed;
        legs.rotation.x -= (-1.5 / noOfFrames) * jumpSpeed;
        lKnee.rotation.x -= (2.5 / noOfFrames) * jumpSpeed;
        rKnee.rotation.x -= (2.5 / noOfFrames) * jumpSpeed;
        lAnkle.rotation.x -= (-1 / noOfFrames) * jumpSpeed;
        rAnkle.rotation.x -= (-1 / noOfFrames) * jumpSpeed;
        lShoulder.rotation.x -= ((Math.PI) / (noOfFrames * 2));
        rShoulder.rotation.x -= ((Math.PI) / (noOfFrames * 2));
    }
    else
    {
        zerar();
        stage7.value = false;
        //console.log("STAGE 7 -> Fim do Salto Completo");
    }
}