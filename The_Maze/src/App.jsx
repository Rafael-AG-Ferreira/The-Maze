import * as THREE                                                                   from 'three';
import * as CANNON                                                                  from 'cannon-es';
import CannonDebugger                                                               from 'cannon-es-debugger';
import SceneInit                                                                    from './lib/SceneInit';
import {  useEffect                                                               } from 'react';
import {  TextGeometry                                                            } from 'three/examples/jsm/geometries/TextGeometry';
import {  TTFLoader                                                               } from 'three/examples/jsm/loaders/TTFLoader';
import {  FontLoader                                                              } from 'three/examples/jsm/loaders/FontLoader';
import {  background                                                              } from './Skydome/Skydome.js';
import {  grassFloor                                                              } from './Chao/Chao_Relva.js';
import {  stoneFloor,gameAmbientLight                                            } from './Chao/Chao_Pedra.js';
import {  roundTrees                                                              } from './Arvores/RoundTree.js';
import {  spikeTrees                                                              } from './Arvores/SpikeTree.js';
import {  completeMaze, pillarGhostArrayX, pillarGhostArrayZ, 
          verticalWallGhostArrayX, verticalWallGhostArrayZ,
          horizontalWallGhostArrayX, horizontalWallGhostArrayZ                    } from './Labirinto/MakeMaze.js';
import {  gary, firstPersonCamera, thirdPersonCamera, mapCamera, viewGaryCam      } from './GaryScripts/JuntaGeometriasBoneco.js';
import {  lShoulder, rShoulder, lGlenoHumeral, rGlenoHumeral, lElbow, rElbow      } from './GaryScripts/ObterBoneco.js';
import {  walk                                                                    } from './Caminhar/Caminhar.js';
import {  moon, moonLight, sun, sunLight                                          } from './CorposCelestes/CelestialBodies.js';
import {  gameStart                                                               } from './AnimacaoInicial.js';
import {  makeFootPrints                                                          } from './GaryScripts/Footprints.js';
import {  sayHello                                                                } from './Acenar/SayHello.js';
import {  zerar                                                                   } from './Saltar/8_Zerar.js';
import {  jump, reseted                                                           } from './Saltar/0_Saltar.js';
import {  postLights, postFakeLights                                              } from "./Labirinto/Holofotes.js";
import {  gameInstructions, titleText                                             } from './Instrucoes.jsx'
import {  endGame                                                                 } from './FimJogo.jsx'
import {  daysPassed                                                              } from './ContaDias.jsx'
import {  credits                                                                 } from './Final.jsx'

var auxCamera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 100000);
    auxCamera.position.y = 150;
    auxCamera.position.z = 600;
var changeableCamera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 40, 100000);
    changeableCamera.position.y = 10000;
    changeableCamera.add(gameInstructions());
var thrirdPC = false;
var programerCamera = new THREE.OrthographicCamera(-10000, 10000, 10000, -10000, 1, 100000);
    programerCamera.position.y = 80000;
var pCamera = false;
var garyCam = false;
var footPrintCounter = 0;
var xPos, yPos, newX, newY = 0;
var animInit = true;
var animInitDone = false;
const garyPositions = new THREE.Vector3( 0, 0, 0 );
var mapCamLock = false;
var now = 0;
var endExecMap = 0;
var canJump = false;
var infoCamera = false;
var programmerPassword = "RumoAo20";
var collided = false;
var garyLast40StepsX = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var garyLast40StepsZ = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var garyCollRecoil = 0;
var celestialAxis = new THREE.Group();
    celestialAxis.add(moon, sun, sunLight, moonLight);
var removeCelestialLights = false;
var gameInst = gameInstructions();
var acenderLuzes = false;
var passedDays = 0;
var sunPos = new THREE.Vector3( 0, 0, 0 );
var moonPos  = new THREE.Vector3( 0, 0, 0 );
var daysInfo = daysPassed(0);
var concludedGame = false;
var message = new THREE.Object3D();
var change = false;
var switchControl = {value: false};
var tecla = {value: 0};
var title = titleText();
var removePostLights = false;
var removeAmbientLight = false;
export {changeableCamera, auxCamera, switchControl, tecla};

export function App() 
{
  useEffect(() => 
  {
    const cena = new SceneInit('TheMaze');
    cena.initialize();
    cena.camera = changeableCamera;
    cena.animate();
        //const axesHelper = new THREE.AxesHelper(8000);      // Eixo XYZ para ajuda na estruturação da cena
        //cena.scene.add( axesHelper );
    celestialAxis.rotation.y = Math.PI/4;
    celestialAxis.rotation.z = Math.PI/2;
    cena.scene.add( grassFloor, stoneFloor, completeMaze, celestialAxis, background, spikeTrees, roundTrees, title, gary );
        //gary.position.x = 0; gary.position.z = -30000;      // Posição para ver a cena de longe (esfera)
        //gary.position.x = -3400; gary.position.z = -3400;   // Posição quase inicial mas fora da "caixa" de colisão
        //gary.position.x = 5900; gary.position.z = 5500;     // Posição no fim do labirinto
    
    
    /////////////////////////////////////////////////// MUNDO DA FÍSICA ///////////////////////////////////////////////////
    const physicsWorld = new CANNON.World({});                // "Cena" do mundo da física
    const groundBody = new CANNON.Body                        // Chão do mundo da física
    ({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Plane(),
    }); groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);           // Rotação do chão para não ficar "visto de frente"
    physicsWorld.addBody(groundBody);                                     // Adição do chão ao mundo da física
    const cannonDebugger = new CannonDebugger(cena.scene, physicsWorld);  // Debugger que permite ver o mundo da física (para ser vísivel tem que ser updated no loop)
    var garyGhostBody = new CANNON.Body                                   // Corpo do Gary no mundo da física
    ({
        position: new CANNON.Vec3(gary.position.x, gary.position.y+100, gary.position.z),
        shape: new CANNON.Cylinder(70, 70, 50, 32),
        mass: 500000,
        type: CANNON.Body.DYNAMIC,
    }); physicsWorld.addBody(garyGhostBody);                              // Adição do (neste caso raio) Gary ao mundo da física
    garyGhostBody.addEventListener('collide', function(event)             // Criação de EventListener para colisões
    {
      var bodyA = event.bodyA;
      var bodyB = event.bodyB;
      console.log('Colisão detetada entre ', bodyA, ' e ', bodyB);
      collided = true;
    });
    for (let i = 0; i < pillarGhostArrayX.length; i++)                    // Criação dos pilares do labirinto no mundo da física
    {
        let pillarGhostBody = new CANNON.Body
        ({
            position: new CANNON.Vec3(pillarGhostArrayX[i], 250, pillarGhostArrayZ[i]),
            shape: new CANNON.Cylinder(110, 110, 500, 64),
        });
        pillarGhostBody.collisionResponse = true;
        physicsWorld.addBody(pillarGhostBody);                            // Adição dos pilares ao mundo da física
    }
    for (let i = 0; i < verticalWallGhostArrayX.length; i++)              // Criação dos Muros Vericais (vistos de cima) do labirinto no mundo da física
    {
        makeGhostBlock(verticalWallGhostArrayX[i], 250, verticalWallGhostArrayZ[i], 300, 247, 20, 0, (-Math.PI/2), 0, physicsWorld);
    }
    for (let i = 0; i < horizontalWallGhostArrayX.length; i++)            // Criação dos Muros Horizontais (vistos de cima) do labirinto no mundo da física
    {
        makeGhostBlock(horizontalWallGhostArrayX[i], 250, horizontalWallGhostArrayZ[i], 300, 247, 20, 0, 0, 0, physicsWorld);
    }
    makeGhostBlock(-6000, 250, -6600, 20, 500, 500, 0, 0, 0, physicsWorld); // Parede do mundo da física para não se poder naver na cena além do labirinto
    makeGhostBlock(-5200, 250, -6600, 20, 500, 500, 0, 0, 0, physicsWorld); // Parede do mundo da física para não se poder naver na cena além do labirinto
    makeGhostBlock(-5600, 250, -7080, 430, 500, 20, 0, 0, 0, physicsWorld); // Parede do mundo da física para não se poder naver na cena além do labirinto
    ///////////////////////////////////////////////FIM DO  MUNDO DA FÍSICA ////////////////////////////////////////////////

    window.addEventListener("mousemove", function(event)                    // Event Listener para determinar as coordenadas do rato no ecrã
    { screenView(event); });

    document.addEventListener('keydown', (event) =>                         // Event Listener para determinar que tecla foi premida
    {
      if (switchControl.value) return                                       // Sai imediatamente se uma outra funcionalidade estiver a ser usada
      tecla.value = event.key; 
      switch (tecla.value) 
      {
        case 'w':
        case 'ArrowUp':
        case '8':
            if(!collided)
            {
              let percentage = 0;
              if(xPos < ((window.innerWidth/2) - 80))
              {
                percentage = ((window.innerWidth/2) - xPos) * (100 / (window.innerWidth / 2));
                gary.rotation.y += 0.0005 * percentage;
                if (Math.abs(gary.rotation.y) >= (Math.PI * 2)) { gary.rotation.y = 0; }
              }
              else if(xPos > ((window.innerWidth/2) + 80))
              {
                percentage = Math.abs(((window.innerWidth / 2) - xPos) * (100 / (window.innerWidth / 2)));
                gary.rotation.y -= 0.0005 * percentage;
                if (Math.abs(gary.rotation.y) >= (Math.PI * 2)) { gary.rotation.y = 0; }
              }
              if(xPos > 40 && xPos < (window.innerWidth - 40))
              {
                gary.translateZ(13);
                garySteps();
                garyGhostBody.position.set(gary.position.x, gary.position.y, gary.position.z + 4);
                footPrintCounter++;
                if(footPrintCounter % 10 == 0)
                {
                  cena.scene.add(makeFootPrints(gary.position.x, gary.position.z, gary.rotation.y));
                  footPrintCounter = 0;
                }
              }
            }
            break;
        case 's':
        case 'ArrowDown':
        case '2':
            if(!collided)
            {
              gary.translateZ(-16);
              garySteps();
            }
          break;
        case ' ':
        case '5':
            canJump = true;
            break;
        case 'm':
            now = new Date().getTime();
            switchControl.value = true;
            if(!mapCamLock)
            {
              auxCamera = changeableCamera;
              changeCamera(mapCamera);
              setTimeout(function() 
              {
                changeCamera(auxCamera);
                switchControl.value = false;
              }, 5000);
              mapCamLock = true;
              endExecMap = new Date().getTime() + 15000;
              tecla.value = 0;
            }
            else
            {
              if((now - endExecMap) >= 0)
              {
                mapCamLock = false;
              }
              else
              {
                tecla.value = 0;
                console.log("Wait...");
                console.log((now - endExecMap));
              }
              switchControl.value = false;
            }
            break;
        case 'p':
            if(!pCamera)
            {
              let insertedPassword = prompt("Password:", "");
              if(insertedPassword === programmerPassword)
              {
                programerCamera.lookAt(0, 0, 0);
                auxCamera = changeableCamera;
                changeCamera(programerCamera);
                pCamera = true;
              }
            }
            else
            {
              changeCamera(auxCamera);
              pCamera = false;
            }
            tecla.value = 0;
            break;
        case 'i':
            if(!infoCamera)
            {
                firstPersonCamera.add(gameInst);
                infoCamera = true;
            }
            else
            {
              firstPersonCamera.remove(gameInst);
              infoCamera = false;
            }
            tecla.value = 0;
            break;
        case 'b':
          if(!garyCam)
          {
              programerCamera.lookAt(0, 0, 0);
              auxCamera = changeableCamera;
              changeCamera(viewGaryCam);
              changeableCamera.clear();
              garyCam = true;
          }
          else
          {
            changeCamera(auxCamera);
            garyCam = false;
          }
          tecla.value = 0;
          break;
        case 'c':
          if(!removeCelestialLights)
          {
              celestialAxis.remove(sunLight);
              celestialAxis.remove(moonLight);
              removeCelestialLights = true;
          }
          else
          {
            sunLight.position.copy(sunPos);
            moonLight.position.copy(moonPos);
            celestialAxis.add(sunLight);
            celestialAxis.add(moonLight);
            removeCelestialLights = false;
          }
          tecla.value = 0;
          break;
        case 'x':
          if(!removePostLights)
          {
              cena.scene.remove(postLights);
              cena.scene.remove(postFakeLights);
              removePostLights = true;
          }
          else
          {
            cena.scene.add(postLights);
            cena.scene.add(postFakeLights);
            removePostLights = false;
          }
          tecla.value = 0;
          break;
        case 'z':
          if(!removeAmbientLight)
          {
              stoneFloor.remove(gameAmbientLight);
              removeAmbientLight = true;
          }
          else
          {
            stoneFloor.add(gameAmbientLight);
            removeAmbientLight = false;
          }
          tecla.value = 0;
          break;
        case 'r':
          animInit = false;
          break;
      }
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    const animate = () =>               // Função equivalente à função Loop
    {
        cena.camera = changeableCamera;
        sun.rotateY(Math.PI/180 * 0.1);
        moon.rotateY(Math.PI/180 * 0.1);
        sun.rotateX(Math.PI/180 * 0.01);
        moon.rotateX(Math.PI/180 * 0.01);
        celestialAxis.rotateZ(Math.PI/180 * 0.04);
        physicsWorld.fixedStep();
        //cannonDebugger.update();        // O debugger que permite ver o mundo da física
        garyGhostBody.position.copy(gary.position);
        garyGhostBody.position.y = gary.position.y + 100;
        garyGhostBody.quaternion.copy(gary.quaternion); 
        sun.getWorldPosition(sunPos);
        moon.getWorldPosition(moonPos);
        if(canJump) 
        {
          recursiveJump();
        }

        if(animInit)
        {
          animInit = gameStart();
          title.rotateY(Math.PI/180 * 1);
          title.lookAt(cena.camera.position.x, cena.camera.position.y, cena.camera.position.z);
          gary.position.x = -5600;
          gary.position.y = 105;
          gary.position.z = -6200;
        }
        else if(!animInit && !animInitDone)
        { 
          changeableCamera = firstPersonCamera;
          auxCamera = changeableCamera;
          changeableCamera.add(gameInstructions());
          changeableCamera.add(daysInfo);
          setTimeout(function() 
          {
            changeableCamera.clear();
            changeableCamera.add(daysInfo);
          }, 8000);
          cena.scene.remove(title);
          switchControl.value = false;
          animInitDone = true;
        }
        if(collided)
        {
          garyCollisionRecoil();
        }      
        if(sunPos.y > 7500 && acenderLuzes)
        {
          cena.scene.remove(postLights);
          cena.scene.remove(postFakeLights);
          passedDays += 1;
          changeableCamera.remove(daysInfo);
          daysInfo = daysPassed(passedDays);
          changeableCamera.add(daysInfo);
          acenderLuzes = false;
        }
        if(sunPos.y > -10000 && sunPos.y < 10000)
        {
          sunLight.intensity = 0.0002 * sunPos.y;
        }
        if(sunPos.y < 7500 && !acenderLuzes)
        {
          cena.scene.add(postLights);
          cena.scene.add(postFakeLights);
          acenderLuzes = true;
        }
        if(moonPos.y > -10000 && moonPos.y < 10000)
        {
          moonLight.intensity = 0.00005 * moonPos.y;
        }
        if(gary.position.x >= 6200 && gary.position.z >= 5300 && !concludedGame)
        {
          message = endGame(passedDays);
          let temp = new THREE.Vector3( 0, 0, 0 );
          gary.getWorldPosition(temp);
          message.position.x = 15000;
          message.position.z = 5000;
          message.lookAt(temp);
          message.scale.x = 0.5;
          message.scale.y = 0.5;
          cena.scene.add(message);
          setTimeout(function() 
          {
            changeableCamera.clear();
            let msgCredits = credits();
            changeableCamera.add(msgCredits);
            setTimeout(function() 
            {
              window.close();
            }, 15000);
          }, 10000);
          concludedGame = true;
        }
        animateMessage();
        window.requestAnimationFrame(animate);
    };
    animate();
  }, []);
  return (
    <div>
      <canvas id="TheMaze" />
    </div>
  );  
} export default App;
//////////////////////////////////////////////////////////Funções/////////////////////////////////////////////////////////
function animateMessage()
{
  if(message.position.y < 1500 && !change)
  {
    message.translateY(50);
    if(message.position.y >= 1500) change = true;
  }
  else if(message.position.y > -1000 && change)
  {
    message.translateY(-50);
    if(message.position.y <= -1000) change = false;
  }
}

function makeGhostBlock(xPos, yPos, zPos, xSize, ySize, zSize, xRot, yRot, zRot, physicsWorld)
{
    const ghostBlock = new CANNON.Body
    ({
        position: new CANNON.Vec3(xPos, yPos, zPos),
        shape: new CANNON.Box(new CANNON.Vec3(xSize, ySize, zSize)),
    });
    ghostBlock.quaternion.setFromEuler(xRot, yRot, zRot);
    ghostBlock.collisionResponse = true;
    physicsWorld.addBody(ghostBlock);
}

function screenView(e) //------------------------------------------------> Função que obtém a posição do rato no ecrã
{
    xPos = e.clientX;
    yPos = e.clientY;
}

export function changeCamera(receivedCam) //-----------------------------> Função que permite mudar a camara a ser renderizada
{
  changeableCamera.clear();
  changeableCamera = receivedCam;
  changeableCamera.add(daysInfo);
}

function recursiveJump()
{
  switchControl.value = true;
  let jumpDone = false;
  if(!reseted.value)                                          
  {
    zerar();
    reseted.value = true; 
  }
  jumpDone = jump(switchControl, tecla);
  if(!thrirdPC)
  {
    auxCamera = changeableCamera;
    changeCamera(thirdPersonCamera);
    thrirdPC = true;
  }
  if(jumpDone)
  {
    changeCamera(auxCamera);
    thrirdPC = false;
    canJump = false;
  }
}

function garySteps()
{
  garyLast40StepsX.pop();
  garyLast40StepsX.unshift(gary.position.x);
  garyLast40StepsZ.pop();
  garyLast40StepsZ.unshift(gary.position.z);
}

function garyCollisionRecoil()
{
  if(garyCollRecoil < 15)
  {
    if(garyLast40StepsX[0] != 0)
    {
      gary.position.x = garyLast40StepsX[0];
      garyLast40StepsX.shift();
      garyLast40StepsX.push(0);
      gary.position.y = 105;
      gary.position.z = garyLast40StepsZ[0];
      garyLast40StepsZ.shift();
      garyLast40StepsZ.push(0);
    }
    else
    {
      gary.rotation.y = Math.PI;
    }
    garyCollRecoil+=1;
  }
  else
  {
    collided = false;
    garyCollRecoil = 0;
  }
}