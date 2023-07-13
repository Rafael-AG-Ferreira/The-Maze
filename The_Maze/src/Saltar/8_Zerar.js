import { rKnee, lKnee, rAnkle, lAnkle, head, lHipJoint, rHipJoint, lShoulder, rShoulder, union } from '../GaryScripts/ObterBoneco.js';
import { legs, leftLeg, rightLeg, gary } from '../GaryScripts/JuntaGeometriasBoneco.js'

export function zerar()
{ 
    gary.position.y = 105; 
    head.rotation.x = lHipJoint.rotation.x = rHipJoint.rotation.x = lShoulder.rotation.x = 
    rShoulder.rotation.x = union.rotation.x = legs.rotation.x = leftLeg.rotation.x = rightLeg.rotation.x =
    lKnee.rotation.x = rKnee.rotation.x = lAnkle.rotation.x = rAnkle.rotation.x = 0;
}