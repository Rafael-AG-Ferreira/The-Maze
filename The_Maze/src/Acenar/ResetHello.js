import { tecla, switchControl } from "../App.jsx";
import { helloAngle, armIsUp, forearmAngle, numOfWavings } from "./SayHello.js"
import { reseted } from "../Saltar/0_Saltar.js";

export function resetHello(objectShoulder, objectHumeral, objectElbow)
{
    objectShoulder.rotation.x = 0;
    objectHumeral.rotation.x = 0;
    if((tecla.value) == 56)
    {
        objectHumeral.rotation.z = 0.2;
    }
    else if((tecla.value) == 57)
    {
        objectHumeral.rotation.z = -0.2;
    }
    objectElbow.rotation.z = 0;
    helloAngle.value = 0.4;
    armIsUp.value = reseted.value = switchControl.value = false;
    forearmAngle.value = -2;
    numOfWavings.value = 3;
}