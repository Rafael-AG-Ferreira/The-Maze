import { useEffect } from 'react';
import * as THREE from 'three';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import SceneInit from './lib/SceneInit';

export function daysPassed(number)
{
    var totalDays = new THREE.Group();
    const fontLoader = new FontLoader();
    const ttfLoader = new TTFLoader();
    ttfLoader.load('fonts/jet_brains_mono_regular.ttf', (json) => {
        const jetBrainsFont = fontLoader.parse(json);
        const textGeometry = new TextGeometry("Dias no Labirinto: " + number.toString(),
        {
            height: 0.001,
            size: 0.025,
            font: jetBrainsFont,
        });
        const textMaterial = new THREE.MeshBasicMaterial({color: 0xb20000});
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.translateX(-7.5);
        textMesh.translateY(32);
        textMesh.translateZ(-1);
        textMesh.scale.x = 36;
        textMesh.scale.y = 36;
        totalDays.add(textMesh);
    });
    const geometry = new THREE.PlaneGeometry( 1, 0.2 );
    const material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide} );
    material.transparent = true;
    material.opacity = 0.5;
    const textDarkBackground = new THREE.Mesh( geometry, material );
    textDarkBackground.translateY(33);
    textDarkBackground.translateZ(-2);
    textDarkBackground.scale.x = 18;
    textDarkBackground.scale.y = 18;
    totalDays.add(textDarkBackground);
    totalDays.translateZ(-60);
    return totalDays;
}