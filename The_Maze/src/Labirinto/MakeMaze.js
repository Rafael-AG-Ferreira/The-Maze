import * as THREE from 'three';
import { makeArcs } from "./EntradaSaída.js";
import { arcCylinderMaker } from "./CylinderMaker.js";
import { makeSphere } from "./SphereMaker.js";
import { returnProjector } from "./Holofotes.js";

export var pillarGhostArrayX = [];
export var pillarGhostArrayZ = [];
export var verticalWallGhostArrayX = [];
export var verticalWallGhostArrayZ = [];
export var horizontalWallGhostArrayX = [];
export var horizontalWallGhostArrayZ = [];

let pillarGhostIterator = 0;
let verticalWallGhostIterator = 0;
let horizontalWallGhostIterator = 0;

const mazeXTranslation = -6000;
const mazeYTranslation = 500;
const mazeZTranslation = -6000;


// Definições para o Muro
var wallTexture = new THREE.TextureLoader().load('./src/Images/stone_wall02.png', function(texture)
{
    texture.wrapS= texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set(0, 0);
    texture.repeat.set(1, 1);
});
var wallTextureHoriz = new THREE.TextureLoader().load('./src/Images/stone_wall02.png', function(texture)
{
    //texture.wrapS= texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set(0, 0);
    texture.repeat.set(1/3, 1);
});
export var wallBallTexture = new THREE.TextureLoader().load('./src/Images/StoneTexturePort2.jpg', function(texture)
{
    texture.wrapS= texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set(0, 0);
    texture.repeat.set(2, 4);
});
export var wallTowerTexture = new THREE.TextureLoader().load('./src/Images/StoneTexturePort.jpg', function(texture)
{
    texture.wrapS= texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set(0, 0);
    texture.repeat.set(1, 1);
});


const wallGeometryHorizontal = new THREE.BoxGeometry( 200, 500, 40 );
const wallGeometryVertical = new THREE.BoxGeometry( 40, 500, 600 );

const wallMaterial = new THREE.MeshStandardMaterial(  { map: wallTexture/*, lightMap: wallTexture, lightMapIntensity: 0.5*/ } );
const wallMaterialHoriz = new THREE.MeshStandardMaterial(  { map: wallTextureHoriz/*, lightMap: wallTextureHoriz, lightMapIntensity: 0.5*/ } ); 
const wallBallMaterial = new THREE.MeshStandardMaterial(  { map: wallBallTexture/*, lightMap: wallBallTexture, lightMapIntensity: 0.5*/ } );
const wallTowerMaterial = new THREE.MeshStandardMaterial(  { map: wallTowerTexture/*, lightMap: wallTowerTexture, lightMapIntensity: 0.8*/ } );
                        
export var completeMaze = new THREE.Group();
    let x_linhas = 15; //-----------------------------------------------------------------------------------> Dimensão X do labirinto
    let y_colunas = 15; //----------------------------------------------------------------------------------> Dimensão Y do labirinto
    console.log("\n\n" + (display(maze(x_linhas, y_colunas))).toString());
    completeMaze.translateX(mazeXTranslation);
    completeMaze.translateY(mazeYTranslation/2);
    completeMaze.translateZ(mazeZTranslation);

function maze(x,y) 
{
	var n=x*y-1;
	if (n<0) {alert("illegal maze dimensions");return;}
	var horiz =[]; for (var j= 0; j<x+1; j++) horiz[j]= [];
	var verti =[]; for (var j= 0; j<x+1; j++) verti[j]= [];
	var here = [Math.floor(Math.random()*x), Math.floor(Math.random()*y)];
	var path = [here];
	var unvisited = [];
	for (var j = 0; j<x+2; j++) 
	{
		unvisited[j] = [];
		for (var k= 0; k<y+1; k++)
		{
			unvisited[j].push(j>0 && j<x+1 && k>0 && (j != here[0]+1 || k != here[1]+1));
		}
	}
	while (0<n) 
	{
		var potential = [[here[0]+1, here[1]], [here[0],here[1]+1],
			[here[0]-1, here[1]], [here[0],here[1]-1]];
		var neighbors = [];
		for (var j = 0; j < 4; j++)
		{
			if (unvisited[potential[j][0]+1][potential[j][1]+1])
			{
				neighbors.push(potential[j]);
			}
		}
		if (neighbors.length) 
		{
			n = n-1;
			var next = neighbors[Math.floor(Math.random()*neighbors.length)];
			unvisited[next[0]+1][next[1]+1]= false;
			if (next[0] == here[0])
			{
				horiz[next[0]][(next[1]+here[1]-1)/2]= true;
			}
			else
			{ 
				verti[(next[0]+here[0]-1)/2][next[1]]= true;
			}
			path.push(here = next);
		} 
		else
		{ 
			here = path.pop();
		}
	}
	return {x: x, y: y, horiz: horiz, verti: verti};
}


function display(m) 
{
	var text= [];
	for (var j= 0; j<m.x*2+1; j++) 
	{
		var line= [];
		
		if (0 == j%2)
		{
			for (var k=0; k<m.y*4+1; k++)
			{
				if((j == 0 && k == 0) || (j == m.x*2-2 && k == 0))
				{
					let factorRot = 4;
					let factorZ = -150;
					if(j == m.x*2-2 && k == 0)
					{
						factorRot = 4/3;
						factorZ = 950;
					}
					let x = (-75 + (200 * k));
					let yROT = (Math.PI / factorRot);
					let z = (factorZ + (400 * j));
					let tempProjector = returnProjector(x + mazeXTranslation, mazeYTranslation, z + mazeZTranslation, yROT);
					tempProjector.position.x = x;
					tempProjector.position.z = z;
					tempProjector.rotation.y = yROT;
					completeMaze.add(tempProjector);
				}	
				if (0 == k%4) 
				{
					pillarGhostArrayX[ pillarGhostIterator ] = ((200 * k) + mazeXTranslation);
					pillarGhostArrayZ[ pillarGhostIterator ] = ((400 * j) + mazeZTranslation);
					pillarGhostIterator++;
					line[k]= '+'; // Todos os cruzamentos de linhas (verticais e horizontais)
					if(j == 0 && k == 0) 
					{ 
						let cluster = makeArcs();
						cluster.translateX(400);
						completeMaze.add(cluster); 
					}
					else if ((j > 0 || k > 4) && (j < m.x*2 || k < m.y*4-3)) 
					{
						if((j == 0 && k >= m.y*4-2) || (j == m.x*2-2 && k >= m.y*4-2))
						{
							let factorRot = 4;
							let factorZ = -150;
							if(j == m.x*2-2 && k >= m.y*4-2)
							{
								factorRot = 4/3;
								factorZ = 950;
							}
							let x = (75 + (200 * k));
							let yROT = (-Math.PI / factorRot);
							let z = (factorZ + (400 * j));
							let tempProjector = returnProjector(x + mazeXTranslation, mazeYTranslation, z + mazeZTranslation, yROT);
							tempProjector.position.x = x;
							tempProjector.position.z = z;
							tempProjector.rotation.y = yROT;
							completeMaze.add(tempProjector);
						}	

						if(j >= m.x*2-2 && k >= m.y*4-2)
						{ 
							let cluster = makeArcs();
							cluster.translateX((200 * k));
							cluster.translateZ((400 * j));
							cluster.rotation.y = -Math.PI/2;
							cluster.translateX(400);
							completeMaze.add(cluster);  
						}
						else
						{
							let cluster = arcCylinderMaker(110, 110, 509, 64, (200 * k), 9, (400 * j), 0, wallTowerTexture);
							let postBall = makeSphere(120, 128, 32, wallBallTexture, (200 * k), 270, (400 * j));
							completeMaze.add(postBall);
							completeMaze.add(cluster);
						}
					}
				}
				else
				{
					if (j>0 && m.verti[j/2-1][Math.floor(k/4)])
					{
						line[k]= ' '; // Todos os espaços livres (horizontais) -> sem muro
					}	
					else
					{
                        line[k]= '-'; // Todas a linhas horizontais
                        if (k > 4 || j > 0)
                        {
                            let cluster = new THREE.Mesh( wallGeometryHorizontal, wallMaterialHoriz );
                            cluster.translateX((200 * k));
                            cluster.translateZ((400 * j));
                            completeMaze.add(cluster);
							if(k % 2 == 0)
							{
								horizontalWallGhostArrayX[ horizontalWallGhostIterator ] = ((200 * k) + mazeXTranslation);
								horizontalWallGhostArrayZ[ horizontalWallGhostIterator ] = ((400 * j) + mazeZTranslation);
								horizontalWallGhostIterator++;
							}
                        }
					}
				}
			}
		}
		else
		{
			for (var k=0; k<m.y*4+1; k++)
			{
				if (0 == k%4)
				{
					if (k>0 && m.horiz[(j-1)/2][k/4-1])
					{
						line[k]= ' '; // Todos os espaços livres (verticais) -> sem muro
					}
					else 					  
					{
                        line[k]= '|'; // Todas a linhas verticais
                        if (j != ((m.x*2)-1) || k != (m.y*4))
                        {
							let cluster = new THREE.Mesh( wallGeometryVertical, wallMaterial );
							cluster.translateX((200 * k));
							cluster.translateZ((400 * j));
                            completeMaze.add(cluster);
							verticalWallGhostArrayX[ verticalWallGhostIterator ] = ((200 * k) + mazeXTranslation);
							verticalWallGhostArrayZ[ verticalWallGhostIterator ] = ((400 * j) + mazeZTranslation);
							verticalWallGhostIterator++;
                        }						  
					}
				}
				else
				{
					line[k]= ' '; // Todos os espaços vazios entre as células
				}
			}
		}
		if (0 == j)
		{ 
			line[1]= line[2]= line[3]= ' '; // Entrada
		}
		if (m.x*2-1 == j) line[4*m.y]= ' '; // Saída
		text.push(line.join('')+'\r\n');
	}
	return text.join('');
}