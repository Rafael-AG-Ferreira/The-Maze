import { rShoulder, lShoulder } from '../GaryScripts/ObterBoneco.js';
import { gary } from '../GaryScripts/JuntaGeometriasBoneco.js'
import { noOfFrames, increment, jumpSpeed } from './0_Saltar.js';

export function stageFour(stage4, stage5)
{
    if(stage4 && gary.position.y > 110)
    {
        gary.position.y -= increment;
        lShoulder.rotation.x += ((Math.PI) / (noOfFrames * 2 / jumpSpeed));
        rShoulder.rotation.x += ((Math.PI) / (noOfFrames * 2 / jumpSpeed));
    }
    else
    {
        stage4.value = false;
        stage5.value = true;
        //console.log("STAGE 4 -> Fim do Salto na Posição (quase) 0");
    }
}