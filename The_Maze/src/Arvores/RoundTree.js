import * as THREE from 'three';
export var roundTrees = new THREE.Group();

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
        // #region CRIAÇÃO
            trunkCreate(0.05, 0.20, 5, 15, 0, 1, 0, 0, 0, 0);
            trunkCreate(0.01, 0.09, 1.5, 15, -0.3, 1.6, 0, 0, 0, 23);
            trunkCreate(0.01, 0.09, 1.5, 15, 0.4, 1.2, 0, -25, 150, 43);
            trunkCreate(0.01, 0.09, 1.5, 15, 0, 0.9, 0.4, 0, 90, 33);
            trunkCreate(0.01, 0.09, 1.5, 15, 0, 1, -0.4, 0, 90, -33);
        // #endregion
    // #endregion

    // #region FOLHAS
        // #region TEXTURA FOLHAS
        var mapLeaf = new THREE.TextureLoader().load("./src/Images/Tree_Leaf_9.jpg");
        var bmapLeaf = new THREE.TextureLoader().load("./src/Images/Tree_Leaf_9_Bump.jpg");
        var dmapLeaf = new THREE.TextureLoader().load("./src/Images/Tree_Leaf_9_Displacement.jpg");

        var materialLeaf2 = new THREE.MeshStandardMaterial({ 
            bumpMap: bmapLeaf,
            bumpScale: 0,
            displacementMap: dmapLeaf,
            displacementScale: 0,
            map: mapLeaf
        });
    // #endregion
    // #region CRIAÇÃO
        leafCreateIco(0.8, 5, 0, 3.5, 0, 0, 0, 0);
        leafCreateIco(0.3, 5, -0.55, 2.2, 0, 0, 0, 0);
        leafCreateIco(0.35, 5, 0.7, 1.8, 0, 0, 0, 0);
        leafCreateIco(0.35, 5, 0.8, 1.5, 0, 0, -90, 0);
        leafCreateIco(0.35, 5, 0.8, 1.5, 0, 0, 90, 0);
    // #endregion
// #endregion

    // #region GRUPO - ÁRVORE
        // #region VARIÁVEIS
        // Criação do grupo
            var roundTree = new THREE.Group();

        // Adicionar troncos ao grupo
            for(var i = 1; i <= quantityTrunks; i++)
            {
                roundTree.add(trunk[i]);
            }

        // Adicionar folhas ao grupo
            for(var i = 1; i <= quantityLeafs; i++)
            {
                roundTree.add(leaf[i]);
            }

            let tempX = getRandomArbitrary(-16000, 16000);
            let tempZ = getRandomArbitrary(-16000, 16000);
            while( (tempX < 6800 && tempX > -6800) && (tempZ < 6800 && tempZ > -6800) ) { tempX = getRandomArbitrary(-16000, 16000); }
            while( (tempX > 5000 && tempX < -6800) && (tempZ > 6500 && tempZ < -8000) ) { tempX = getRandomArbitrary(-16000, 16000); }
            while( (tempZ < 6800 && tempZ > -6800) && (tempX < 6800 && tempX > -6800) ) { tempZ = getRandomArbitrary(-16000, 16000); }
            roundTree.position.x = tempX;
            roundTree.position.y = 200;
            roundTree.position.z = tempZ;

            roundTree.scale.x = getRandomArbitrary(100, 250);
            roundTree.scale.y = getRandomArbitrary(100, 200);
            roundTree.scale.z = getRandomArbitrary(100, 250);
            roundTree.rotation.y = getRandomArbitrary(0, (2*Math.PI));
            roundTrees.add(roundTree);
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

function leafCreateIco(radius, detail, transX, transY, transZ, rotX, rotY, rotZ)
{
    quantityLeafs++;

    const geometry = new THREE.IcosahedronGeometry( radius, detail);
    leaf[quantityLeafs] = new THREE.Mesh(geometry, materialLeaf2);

    /* ROTATIONS */
    
    leaf[quantityLeafs].rotateX(Math.PI / 180 * rotX);
    leaf[quantityLeafs].rotateY(Math.PI / 180 * rotY);
    leaf[quantityLeafs].rotateZ(Math.PI / 180 * rotZ);

    /* TRANSLATIONS */

    leaf[quantityLeafs].translateX(transX);
    leaf[quantityLeafs].translateY(transY);
    leaf[quantityLeafs].translateZ(transZ);
}