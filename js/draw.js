var cubeCounter = 0;
var sphereCounter = 0;

function createCube(){
  const DEFAULT_SIZE = 1;
  var cube = BABYLON.Mesh.CreateBox('cube' + cubeCounter, DEFAULT_SIZE, scene);
  window.setTimeout(function(){
    cube.position.x = cursor.position.x;
    cube.position.y = cursor.position.y;
    cube.position.x = cursor.position.x;
  }, 100);
  cubeCounter++;
  return cube;
}

function createSphere(){
  const DEFAULT_SIZE = 1;
  var sphere = BABYLON.Mesh.CreateSphere('sphere' + sphereCounter, 10, DEFAULT_SIZE, scene);
  window.setTimeout(function(){
    sphere.position.x = cursor.position.x;
    sphere.position.y = cursor.position.y;
    sphere.position.x = cursor.position.x;
  }, 100);
  sphereCounter++;
  return sphere;
}