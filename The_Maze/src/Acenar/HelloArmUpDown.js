import { sayHelloSpeed } from "./SayHello.js";

export function helloGoingUpDown(angle, objectShoulder, objectHumeral, objectElbow, wichArm)
{
    objectShoulder.rotateX(Math.PI/180 * (-5 * angle * sayHelloSpeed.value));
    objectHumeral.rotateZ(Math.PI/180 * (1.5 * angle * wichArm * sayHelloSpeed.value));
    objectElbow.rotateZ(Math.PI/180 * (-angle * wichArm * sayHelloSpeed.value));
}