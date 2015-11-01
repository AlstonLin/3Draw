var cubeCounter = 0;
var sphereCounter = 0;
var cylinderCounter = 0;
var coneCounter = 0;
var drawLine = 0;
const DEFAULT_SIZE = 1;
const DELAY = 10;
function drawCube(){
  var cube = BABYLON.Mesh.CreateBox('cube' + cubeCounter, DEFAULT_SIZE, scene);
  window.setTimeout(function(){
    deepClonePosition(cube, cursor);
  }, DELAY);
  cubeCounter++;
  return cube;
}

function drawSphere(){
  var sphere = BABYLON.Mesh.CreateSphere('sphere' + sphereCounter, 10, DEFAULT_SIZE, scene);
  window.setTimeout(function(){
    deepClonePosition(sphere, cursor);
  }, DELAY);
  sphereCounter++;
  return sphere;
}

function drawCylinder(){
  var cylinder = BABYLON.Mesh.CreateCylinder("cylinder" + cylinderCounter, 2 * DEFAULT_SIZE, DEFAULT_SIZE, DEFAULT_SIZE, 10, scene, true);
  window.setTimeout(function(){
    deepClonePosition(cylinder, cursor);
  }, DELAY);
  cylinderCounter++;
  return cylinder;
}

function drawCone(){
  var cone = BABYLON.Mesh.CreateCylinder("cone" + coneCounter, 2 * DEFAULT_SIZE, 0, DEFAULT_SIZE, 10, scene, true);
  window.setTimeout(function(){
    deepClonePosition(cone, cursor);
  }, DELAY);
  coneCounter++;
  return cone;
}

function drawLine(){

}

function deepClonePosition(a, b){
  a.position.x = b.position.x;
  a.position.y = b.position.y;
  a.position.x = b.position.x;
}