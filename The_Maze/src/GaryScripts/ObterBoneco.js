import * as THREE from 'three';
import { makeParallelepipedUV } from './ParallelepipedUV.js';
import { makeArticulacoes } from './Articulacoes.js';
import { makeParallelepiped } from './Parallelepiped.js';
import { makeCones } from './Cones.js';



//#region TEXTURAS
    var legsTexture = new THREE.TextureLoader().load('./src/Images/calcas.jpg'); //---------------------> Textura das Calças
    var rShoeTexture = new THREE.TextureLoader().load('./src/Images/R_Shoe.jpg'); //--------------------> Textura do Sapato Direito
    var lShoeTexture = new THREE.TextureLoader().load('./src/Images/L_Shoe.jpg'); //--------------------> Textura do Sapato Esquerdo
    var shoulderTexture = new THREE.TextureLoader().load('./src/Images/ombro.jpg'); //------------------> Textura da Pele
    var unionTexture = new THREE.TextureLoader().load('./src/Images/uniao.jpg'); //---------------------> Textura da Cintura
    var torsoTexture = new THREE.TextureLoader().load('./src/Images/tronco.jpg'); //--------------------> Textura do Tronco/Camisola
    var headTexture = new THREE.TextureLoader().load('./src/Images/Cabeca.jpg'); //---------------------> Textura da Cabeça/Cara
    var hairTexture = new THREE.TextureLoader().load('./src/Images/Cabelo.jpg'); //---------------------> Textura do Cabelo
//#endregion
//#region Formas de Paralelipípedo com UVMapping
    export var rShoe = makeParallelepipedUV(18, 18, 30, rShoeTexture, 0, -10, 5, 0, 0, 0); //------------> Sapato Direito
    export var lShoe = makeParallelepipedUV(18, 18, 30, lShoeTexture, 0, -10, 5, 0, 0, 0); //------------> Sapato Esquedo
    export var union = makeParallelepipedUV(54, 25, 14.5, unionTexture, 0, 20, 0, 0, 0, 0); //-----------> Bacia (União das Pernas)
    export var torso = makeParallelepipedUV(54, 65, 14.5, torsoTexture, 0, 45, 0, 0, 0, 0); //-----------> Tronco
    export var head = makeParallelepipedUV(35, 35, 35, headTexture, 0, 105, 0, 0, 0, 0); //--------------> Cabeça/Cara
//#endregion
//#region Formas Esféricas (Articulações)        
    export var rAnkle = makeArticulacoes(8, legsTexture, 0, -25, 0); //----------------------------------> Tornozelo Direito
    export var lAnkle = makeArticulacoes(8, legsTexture, 0, -25, 0); //----------------------------------> Tornozelo Esquerdo
    export var rKnee = makeArticulacoes(8, legsTexture, 0, -25, 0); //-----------------------------------> Joelho Direito
    export var lKnee = makeArticulacoes(8, legsTexture, 0, -25, 0); //-----------------------------------> Joelho Direito
    export var rHipJoint = makeArticulacoes(1, legsTexture, -20, 10, 0); //------------------------------> Anca Direita
    export var lHipJoint = makeArticulacoes(1, legsTexture, 20, 10, 0); //-------------------------------> Anca Esquerda
    export var lGlenoHumeral = makeArticulacoes(8, shoulderTexture, 3, 0, 0.2); //-----------------------> Articulação Ombro Esquerdo
    export var rGlenoHumeral = makeArticulacoes(8, shoulderTexture, -3, 0, -0.2); //---------------------> Articulação Ombro Direito
    export var lElbow = makeArticulacoes(8, shoulderTexture, 0, -20, 0); //------------------------------> Articulação Ombro Esquerdo
    export var rElbow = makeArticulacoes(8, shoulderTexture, 0, -20, 0); //------------------------------> Articulação Ombro Direito
//#endregion
//#region Formas de Paralelipípedo Simples
    export var rFemur = makeParallelepiped(14.5, 55, 14.5, legsTexture, 0, -25, 0, 0, 0, 0); //----------> Fémur Direito
    export var lFemur = makeParallelepiped(14.5, 55, 14.5, legsTexture, 0, -25, 0, 0, 0, 0); //----------> Fémur Esquerdo
    export var rTibia = makeParallelepiped(14.5, 45, 14.5, legsTexture, 0, -20, 0, 0, 0, 0); //----------> Tíbia Direita
    export var lTibia = makeParallelepiped(14.5, 45, 14.5, legsTexture, 0, -20, 0, 0, 0, 0); //----------> Tíbia Esquerda
    export var lShoulder = makeParallelepiped(20.5, 14.5, 14.5, shoulderTexture, 37, 63, 0, 0, 0, 0); //-> Ombro Esquerdo
    export var rShoulder = makeParallelepiped(20.5, 14.5, 14.5, shoulderTexture, -37, 63, 0, 0, 0, 0); //> Ombro Direito
    export var lArm = makeParallelepiped(14.5, 40, 14.5, shoulderTexture, 0, -14, 0, 0, 0, 0); //--------> Braço Esquerdo
    export var rArm = makeParallelepiped(14.5, 40, 14.5, shoulderTexture, 0, -14, 0, 0, 0, 0); //--------> Braço Direito
    export var lForearm = makeParallelepiped(14.5, 30, 14.5, shoulderTexture, 0, -14, 0, 0, 0, 0); //----> Antebraço Esquerdo
    export var rForearm = makeParallelepiped(14.5, 30, 14.5, shoulderTexture, 0, -14, 0, 0, 0, 0); //----> Antebraço Direito
    export var neck =  makeParallelepiped(15, 15, 15, shoulderTexture, 0, 80, 0, 0, 0, 0); //------------> Pescoço
//#endregion
//#region Cones (Cabelo) 
    export var hair = makeCones(hairTexture, 200, head);
//#endregion
   
