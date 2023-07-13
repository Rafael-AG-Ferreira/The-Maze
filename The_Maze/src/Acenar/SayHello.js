import { helloGoingUpDown } from "./HelloArmUpDown.js";
import { helloWaving } from "./HelloWaving.js";
import { resetHello } from "./ResetHello.js";
import { tecla } from "../App.jsx";

export var armIsUp = {value: false};
export var helloAngle = {value: 0.4};
export var forearmAngle = {value: -2};
export var numOfWavings = {value: 3};
export var sayHelloSpeed = {value: 1.5};

export function sayHello(objectShoulder, objectHumeral, objectElbow, wichArm, lower, upper)
{
    if(!armIsUp.value && objectShoulder.rotation.x > (-3.13))
    {
        helloGoingUpDown(helloAngle.value,objectShoulder, objectHumeral, objectElbow, wichArm);
        if(objectShoulder.rotation.x <= (-3.13))
        {
            armIsUp.value = true;
        }
    }
    else if(armIsUp.value && numOfWavings.value > 0)
    {
        helloWaving(objectElbow, wichArm, lower, upper);
    }
    else if(numOfWavings.value == 0 && objectShoulder.rotation.x < 0.01)
    {
        helloGoingUpDown(-helloAngle.value, objectShoulder, objectHumeral, objectElbow, wichArm);
    }
    else
    {
        resetHello(objectShoulder, objectHumeral, objectElbow, wichArm);
        tecla.value = 0;  // Tem que se resetar a tecla senão fica constantemente a executar as funções até que uma nova tecla seja premida
        return true;
    }
}