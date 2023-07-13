import * as THREE from 'three';
import { changeableCamera } from './App.jsx';
import { head, rShoulder, rGlenoHumeral, rElbow } from './GaryScripts/ObterBoneco.js';
import { gary } from './GaryScripts/JuntaGeometriasBoneco.js';
import { sayHello } from './Acenar/SayHello.js';

var circRadius = 15000;
var ratio = 1;
var firstLoop = true;
var firstLoopSpeed = 0.2;
var secondLoop = false;
var thirdLoop = false;
var firstRotation = true;
var secondRotation = false;
var continueWaving = true;
var iterationCounter = 0;
var coordsToGary = new THREE.Vector3( 0, 0, 0 );
    gary.getWorldPosition(coordsToGary);
var coordsToHead = new THREE.Vector3( 0, 0, 0 );
    head.getWorldPosition(coordsToHead);

export function gameStart()
{
    if(firstLoop || secondLoop || thirdLoop)
    {
        iterationCounter++;
            if(firstLoop)
            {
                changeableCamera.lookAt(coordsToGary.x, coordsToHead.y, coordsToGary.z);
                changeableCamera.position.x = (circRadius * Math.cos(firstLoopSpeed)) + coordsToGary.x;
                changeableCamera.position.y -= 10 * ratio;
                changeableCamera.position.z = -(circRadius * Math.sin(firstLoopSpeed)) + + coordsToGary.z;

                ratio -= 0.00001;
                circRadius = (circRadius - (15 * ratio));
                firstLoopSpeed += (0.01 * ratio);

                if(circRadius < 6000)
                {
                    ratio -= 0.002;
                    if((changeableCamera.position.x - coordsToGary.x) < 0.5 && circRadius < 3800)
                    {
                        firstLoop = false;
                        secondLoop = true;
                        ratio = 1;
                    }
                }   
            }
            if (!firstLoop && secondLoop)
            {
                if(firstRotation)
                {
                    changeableCamera.position.x = coordsToGary.x;
                    gary.rotation.y += 0.1;
                    if (gary.rotation.y >= Math.PI) { firstRotation = false; }
                }
                else if(!firstRotation && continueWaving)
                {
                    if(sayHello(rShoulder, rGlenoHumeral, rElbow, -1, 1.6, 0.5)) { continueWaving = false; secondRotation = true;}
                }
                else if(!continueWaving && secondRotation)
                {
                    gary.rotation.y += 0.1;
                    if (gary.rotation.y >= Math.PI*2) 
                    { 
                        secondRotation = false;
                        gary.rotation.y = 0;
                        secondLoop = false;
                        thirdLoop = true;
                        ratio = 1;
                    }
                }
            }
            if (!secondLoop && thirdLoop)
            {
                changeableCamera.lookAt(coordsToGary.x, coordsToHead.y, coordsToGary.z);
                ratio += 0.03;
                changeableCamera.position.z += (10 * ratio);
                
                if (changeableCamera.position.z <= coordsToGary.z - 1) 
                { 
                    changeableCamera.position.y = (-0.5998701 * changeableCamera.position.z) - 3492.615; 
                }
                else
                {
                    thirdLoop = false;
                }
            }
        return true;
    }
    else
    {
        cancelAnimationFrame(gameStart);
        return false;
    }
}