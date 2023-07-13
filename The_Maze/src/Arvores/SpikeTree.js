import * as THREE from 'three';

export var spikeTrees = new THREE.Group();

import { getRandomArbitrary } from "../Funcoes_Genericas/Random.js";

for (let index = 0; index < 10; index++)
{
    // #region VARIÁVEIS
    var quantityTrunks = 0;
    var trunk = [];
    var quantityLeafs = 0;
    var leaf = [];
    // #endregion
    // #region TRONCOS
        // #region TEXTURA
            var mapTrunk = new THREE.TextureLoader().load("./src/Images/Tree_Trunk_2.png");
            var bmapTrunk = new THREE.TextureLoader().load("./src/Images/Tree_Trunk_2_Bump.png");
            var dmapTrunk = new THREE.TextureLoader().load("./src/Images/Tree_Trunk_2_Displacement.png");

            var materialTrunk = new THREE.MeshStandardMaterial
            ({ 
                bumpMap: bmapTrunk,
                bumpScale: 0,
                displacementMap: dmapTrunk,
                displacementScale: 0,
                map: mapTrunk
            });
        // #endregion
        // #region CRIAÇÃO DO TRONCO
            trunkCreate(0.2, 0.2, 4, 15, 0, 0, 0, 0, 0, 0);
        //# endregion
    // #endregion

   // #region FOLHAS
        // #region TEXTURA FOLHAS
            var mapLeaf = new THREE.TextureLoader().load("./src/Images/Tree_Leaf_6.jpg");
            var bmapLeaf = new THREE.TextureLoader().load("./src/Images/Tree_Leaf_6_Bump.png");
            var dmapLeaf = new THREE.TextureLoader().load("./src/Images/Tree_Leaf_6_Displacement.png");

            var materialLeaf = new THREE.MeshStandardMaterial({ 
                bumpMap: bmapLeaf,
                bumpScale: 0,
                displacementMap: dmapLeaf,
                displacementScale: 0,
                map: mapLeaf
            });
        // #endregion
        // #region CRIAÇÃO DAS FOLHAS
            leafCreateCon(1.5, 3.0, 5, 0, 1.6, 0, 0, 0, 0);
            leafCreateCon(0.8, 2.0, 5, 0, 3.6, 0, 0, 9, 0);
            leafCreateCon(0.5, 1.0, 5, 0, 4.5, 0, 0, 18, 0);
            leafCreateCon(1.2, 2.5, 5, 0, 2.5, 0, 0, 27, 0);
        // #endregion
    // #endregion


    // #region GRUPO - ÁRVORE
        // #region VARIÁVEIS
        // Criação do grupo
            var spikeTree = new THREE.Group();

        // Adicionar troncos ao grupo
            for(var i = 1; i <= quantityTrunks; i++)
            {
                spikeTree.add(trunk[i]);
            }

        // Adicionar folhas ao grupo
            for(var i = 1; i <= quantityLeafs; i++)
            {
                spikeTree.add(leaf[i]);
            }
            let tempX = getRandomArbitrary(-16000, 16000);
            let tempZ = getRandomArbitrary(-16000, 16000);
            while( (tempX < 6800 && tempX > -6800) && (tempZ < 6800 && tempZ > -6800) ) { tempX = getRandomArbitrary(-16000, 16000); }
            while( (tempX > 5000 && tempX < -6800) && (tempZ > 6500 && tempZ < -8000) ) { tempX = getRandomArbitrary(-16000, 16000); }
            while( (tempZ < 6800 && tempZ > -6800) && (tempX < 6800 && tempX > -6800) ) { tempZ = getRandomArbitrary(-16000, 16000); }
            spikeTree.position.x = tempX;
            spikeTree.position.y = 200;
            spikeTree.position.z = tempZ;

            spikeTree.scale.x = getRandomArbitrary(100, 250);
            spikeTree.scale.y = getRandomArbitrary(100, 200);
            spikeTree.scale.z = getRandomArbitrary(100, 250);
            spikeTree.rotation.y = getRandomArbitrary(0, (2*Math.PI));
            spikeTrees.add(spikeTree);
    // #endregion
}

export function trunkCreate(radiusTop, radiusBottom, height, radialSegments, transX, transY, transZ, rotX, rotY, rotZ)
{
    quantityTrunks++;

    const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
    trunk[quantityTrunks] = new THREE.Mesh(geometry, materialTrunk);

    /* TRANSLATIONS */

    trunk[quantityTrunks].translateX(transX);
    trunk[quantityTrunks].translateY(transY);
    trunk[quantityTrunks].translateZ(transZ);

    /* ROTATIONS */
    
    trunk[quantityTrunks].rotateX(Math.PI / 180 * rotX);
    trunk[quantityTrunks].rotateY(Math.PI / 180 * rotY);
    trunk[quantityTrunks].rotateZ(Math.PI / 180 * rotZ);
}

function leafCreateCon(radius, height, radialSegments, transX, transY, transZ, rotX, rotY, rotZ)
{
    quantityLeafs++;

    const geometry = new THREE.ConeGeometry(radius, height, radialSegments);
    leaf[quantityLeafs] = new THREE.Mesh(geometry, materialLeaf);

    /* ROTATIONS */
    
    leaf[quantityLeafs].rotateX(Math.PI / 180 * rotX);
    leaf[quantityLeafs].rotateY(Math.PI / 180 * rotY);
    leaf[quantityLeafs].rotateZ(Math.PI / 180 * rotZ);

    /* TRANSLATIONS */

    leaf[quantityLeafs].translateX(transX);
    leaf[quantityLeafs].translateY(transY);
    leaf[quantityLeafs].translateZ(transZ);
}