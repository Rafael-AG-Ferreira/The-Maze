import { useEffect } from 'react';
import * as THREE from 'three';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import SceneInit from './lib/SceneInit';

export function gameInstructions()
{
    var instructions = new THREE.Group();
    const fontLoader = new FontLoader();
    const ttfLoader = new TTFLoader();
    ttfLoader.load('fonts/jet_brains_mono_regular.ttf', (json) => {
        const jetBrainsFont = fontLoader.parse(json);
        const textGeometry = new TextGeometry('↑ ou \'W\'                       Deslocamento para a Frente\n'+
                                            '↓ ou \'S\'                       Deslocamento para para Trás\n'+
                                            'Rato + \'↑ ou W\'                Mover na Horizontal\n'+
                                            'Rato nas Extremidades do ercã  Girar na Horizontal\n'+
                                            'Espaço                         Saltar\n'+
                                            '\'M\'                            Perspetiva Superior do Labirinto\n'+
                                            '\'K\'                            Ativar/Desativar Música\n'+
                                            '\'R\'                            Avançar Animação Inicial\n',
        {
            height: 0.001,
            size: 0.025,
            font: jetBrainsFont,
        });
        const textGeometry2 = new TextGeometry('INSTRUÇÕES [I]',
        {
        height: 0.001,
        size: 0.03,
        font: jetBrainsFont,
        });
        const textMaterial = new THREE.MeshBasicMaterial({color: 0xffff00});
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.translateX(-21.6);
        textMesh.translateY(2);
        textMesh.translateZ(-1);
        textMesh.scale.x = 36;
        textMesh.scale.y = 36;
        instructions.add(textMesh);

        const textMaterial2 = new THREE.MeshBasicMaterial({color: 0xdb871d });
        const textMesh2 = new THREE.Mesh(textGeometry2, textMaterial2);
        textMesh2.translateX(-5);
        textMesh2.translateY(5);
        textMesh2.translateZ(-1);
        textMesh2.scale.x = 36;
        textMesh2.scale.y = 36;
        instructions.add(textMesh2);
    });
    const geometry = new THREE.PlaneGeometry( 5, 1 );
    const material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide} );
    material.transparent = true;
    material.opacity = 0.7;
    const textDarkBackground = new THREE.Mesh( geometry, material );
    textDarkBackground.translateY(-1.175);
    textDarkBackground.translateZ(-2);
    textDarkBackground.scale.x = 18;
    textDarkBackground.scale.y = 18;
    instructions.add(textDarkBackground);
    instructions.translateX(-0.8);
    instructions.translateY(-22);
    instructions.translateZ(-60);
    return instructions;
}

export function titleText()
{
    var title = new THREE.Group();
    const fontLoader = new FontLoader();
    fontLoader.load('node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json',
      (droidFont) => 
      {
        const textGeometry = new TextGeometry('Grupo 0\n  MAZE', 
        {
          size: 1000,
          height: 100,
          font: droidFont,
        });
        const textMaterial = new THREE.MeshNormalMaterial({side: THREE.DoubleSide});
        textMaterial.wireframe = true;
        const textMesh1 = new THREE.Mesh(textGeometry, textMaterial);
        textMesh1.position.x = -3000;
        textMesh1.position.y = 4000;
        //textMesh1.rotation.x = -Math.PI/4;
        title.add(textMesh1);
      }
    );
    return title;
}