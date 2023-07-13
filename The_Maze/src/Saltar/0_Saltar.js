// #region VARIÁVEIS PARA SALTAR
    export var jumpSpeed = 10;
    export var jumpSize = 2000;
    export var noOfFrames = 300;
    export var increment = (jumpSize / noOfFrames) * jumpSpeed;
    export var stage1 = {value: true};
    var stage2 = {value: false};
    var stage3 = {value: false};
    var stage4 = {value: false};
    var stage5 = {value: false};
    var stage6 = {value: false}; 
    var stage7 = {value: false};
    export var reseted = {value: false};
//#endregion

import { stageOne } from './1_StageOne.js';
import { stageTwo } from './2_StageTwo.js';
import { stageThree } from './3_StageThree.js';
import { stageFour } from './4_StageFour.js';
import { stageFive } from './5_StageFive.js';
import { stageSix } from './6_StageSix.js';
import { stageSeven } from './7_StageSeven.js';

export function jump(switchControl, tecla)
{
    if(stage1.value)
    {
        stageOne(stage1, stage2);
    }
    else if(stage2.value)
    {
        stageTwo(stage2, stage3);
    }
    else if(stage3.value)
    {
        stageThree(stage3, stage4);
    }
    else if(stage4.value)
    {
        stageFour(stage4, stage5);
    }
    else if (stage5.value)
    {
        stageFive(stage5, stage6);
    }
    else if (stage6.value)
    {
        stageSix(stage6, stage7);
    }
    else if (stage7.value)
    {
        stageSeven(stage7);
    }
    else
    {
        stage1.value = true;
        stage2.value = false; stage3.value = false; stage4.value = false; stage5.value = false; stage6.value = false; stage7.value = false; reseted.value = false; switchControl.value = false;
        //console.log("Saltar() -> FIM");
        tecla.value = 0;
        return true;
    }
}