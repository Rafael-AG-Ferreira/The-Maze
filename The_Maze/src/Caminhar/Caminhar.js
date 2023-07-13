import {head, rKnee, lKnee, rHipJoint, lHipJoint, lShoulder, rShoulder} from '../GaryScripts/ObterBoneco.js';

    // #region VARIÁVEIS PARA CAMINHAR
    export var hBAngle = 0.2;
    export var headBang = true;
    export var wLAngle = 5;
    export var walkLeft = true;
    export var wRAngle = -5;
    export var walkRight = false;
    export var lKAngle = 5;
    export var walkKLeft = true;
    export var rKAngle = -5;
    export var walkKRight = false;
    // #endregion

export function walk(tecla)
{
    //head.rotateX(Math.PI/180 * hBAngle * 2);
    lHipJoint.rotateX(Math.PI/180 * wLAngle);
    rHipJoint.rotateX(Math.PI/180 * wRAngle);
    lShoulder.rotateX(Math.PI/180 * wRAngle);
    rShoulder.rotateX(Math.PI/180 * wLAngle);

    //[headBang, hBAngle] = rotationXLimits(head, hBAngle, headBang, 0.3, -0.15);
    //[headBang, hBAngle] = rotationXLimits(head, hBAngle, headBang, 0.3, -0.15);
    [walkLeft, wLAngle] = rotationXLimits(lHipJoint, wLAngle, walkLeft, 0.5, -0.5);
    [walkRight, wRAngle] = rotationXLimits(rHipJoint, wRAngle, walkRight, 0.5, -0.5);

    if (lHipJoint.rotation.x > 0.1 || lHipJoint.rotation.x < -0.1)
    {
        if (lHipJoint.rotation.x > 0.3 || lHipJoint.rotation.x < -0.3)
        {
            lKnee.rotateX(Math.PI/180 * lKAngle);
            [walkKLeft, lKAngle] = rotationXLimits(lKnee, lKAngle, walkKLeft, 0.2, 0);
            rKnee.rotateX(Math.PI/180 * rKAngle);
            [walkKRight, rKAngle] = rotationXLimits(rKnee, rKAngle, walkKRight, 0.2, 0);
        }
        else
        {
            lKnee.rotateX(Math.PI/180 * lKAngle);
            [walkKLeft, lKAngle] = rotationXLimits(lKnee, lKAngle, walkKLeft, 0.2, 0.2);
            rKnee.rotateX(Math.PI/180 * rKAngle);
            [walkKRight, rKAngle] = rotationXLimits(rKnee, rKAngle, walkKRight, 0.2, 0);
        }
    }
    tecla.value = 0;  // Tem que se resetar a tecla senão fica constantemente a executar as funções até que uma nova tecla seja premida
}

function rotationXLimits(object, angle, flag, lowerLimit, upperLimit)
{
    if(flag && (object.rotation.x > lowerLimit))
    {
        angle = 0 - angle;
        flag = false;
    }
    else if(!flag && (object.rotation.x < upperLimit))
    {
        angle = 0 - angle;
        flag = true;
    }
    return [flag, angle]
}