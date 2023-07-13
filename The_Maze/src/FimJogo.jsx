import { useEffect } from 'react';
import * as THREE from 'three';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import SceneInit from './lib/SceneInit';

export function endGame(days)
{
    var finalMessage = new THREE.Group();
    const fontLoader = new FontLoader();
    fontLoader.load('node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json',
      (droidFont) => 
      {
        const textGeometry = new TextGeometry('Parabéns!', 
        {
          size: 1000,
          height: 10,
          font: droidFont,
        });
        const textMaterial = new THREE.MeshNormalMaterial({side: THREE.DoubleSide});
        var temp = new THREE.TextureLoader().load('./src/Images/parabens.png');
        textMaterial.normalMap = temp;
        const textMesh1 = new THREE.Mesh(textGeometry, textMaterial);
        textMesh1.position.x = -1500;
        textMesh1.position.y = 6000;
        finalMessage.add(textMesh1);

        const textGeometry2 = new TextGeometry('Concluiu o jogo em ' + days.toString() + ' dias', 
        {
          size: 700,
          height: 10,
          font: droidFont,
        });
        const textMaterial2 = new THREE.MeshNormalMaterial({side: THREE.DoubleSide});
        textMaterial2.normalMap = temp;
        const textMesh2 = new THREE.Mesh(textGeometry2, textMaterial2);
        textMesh2.position.x = -4500;
        textMesh2.position.y = 4000;
        finalMessage.add(textMesh2);

        const textGeometry3 = new TextGeometry('Até à Próxima', 
        {
          size: 700,
          height: 10,
          font: droidFont,
        });
        const textMaterial3 = new THREE.MeshNormalMaterial({side: THREE.DoubleSide});
        textMaterial3.normalMap = temp;
        const textMesh3 = new THREE.Mesh(textGeometry3, textMaterial3);
        textMesh3.position.x = -1500;
        textMesh3.position.y = 2500;
        finalMessage.add(textMesh3);
      }
    );
    return finalMessage;
}