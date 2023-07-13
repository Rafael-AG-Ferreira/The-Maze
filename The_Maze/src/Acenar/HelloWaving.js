import { forearmAngle, numOfWavings, sayHelloSpeed } from "./SayHello.js"

export function helloWaving(objectElbow, wichArm, lower, upper)
{
    [numOfWavings.value, forearmAngle.value] = rotationZLimits(objectElbow, forearmAngle.value + (sayHelloSpeed.value / 2), numOfWavings.value, lower, upper, wichArm); 
    objectElbow.rotateZ(Math.PI/180 * forearmAngle.value);
}

function rotationZLimits(object, angle, counter, lowerLimit, upperLimit, wichArm)
{
    if(object.rotation.z > lowerLimit)
    {
        angle = 0 - angle;
        if(wichArm == 1) counter--;
    }
    else if(object.rotation.z < upperLimit)
    {
        angle = 0 - angle;
        if(wichArm == -1) counter -= 0.75;
    }
    return [counter, angle]
}