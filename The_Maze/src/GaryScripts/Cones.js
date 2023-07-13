import * as THREE from 'three';

export function makeCones(coneTexture, matrixTotal, objectHead)
{
    var coneMaterial = new THREE.MeshStandardMaterial(  { map: coneTexture } );
    var cone = [matrixTotal];
    for (let i = 0; i < 10; i++)
    {
        for (let j = 0; j < 10; j++)
        {
            var coneGeometry = new THREE.ConeGeometry( 2, 6, 64 );
            cone[ (i+j) ] = new THREE.Mesh( coneGeometry, coneMaterial );
            cone[ (i+j) ].position.x = -15.5 + (j * 3.4);
            cone[ (i+j) ].position.y = 20;
            cone[ (i+j) ].position.z = -15 + (i * 3.4);
            objectHead.add(cone[ (i+j) ]);
            for (let k = 0; k < 10; k++)
            {
                cone[ (i+j+k) ] = new THREE.Mesh( coneGeometry, coneMaterial );
                cone[ (i+j+k) ].position.x = -15.2 + (k * 3.4);
                cone[ (i+j+k) ].position.z = -20;
                cone[ (i+j+k) ].position.y = -15 + (i * 3.4);
                cone[ (i+j+k) ].rotation.x = (-(Math.PI)/2);
                objectHead.add(cone[ (i+j+k) ]);
            }
        }
    }
}