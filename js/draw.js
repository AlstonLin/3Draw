var cubeCounter = 0;
var sphereCounter = 0;
var cylinderCounter = 0;
var coneCounter = 0;
var drawLine = 0;
var linkLinex;
var linkLiney;
var linkLinez;
var r = 0;
var g = 0;
var b = 0;
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

function changeColour(obj){
  if(obj != null) {
    var material1 = new BABYLON.StandardMaterial("texture1", scene);
    material1.wireframe = true;
    material1.emissiveColor = new BABYLON.Color3(r / 255.0, g / 255.0, b / 255.0);
    obj.material = material1;
  }
}

function highlight(obj){
  if(obj != null){
     var material1 = new BABYLON.StandardMaterial("texture1", scene);
      material1.wireframe = true;
      obj.material = material1;
  }
}

function unhighlight(obj){
  if(obj != null){
    var material1 = new BABYLON.StandardMaterial("texture1", scene);
      material1.wireframe = false;
      obj.material = material1;
  }
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
  a.position.z = b.position.z;
}

function drawLinkLines(){
  // lines
  var x0,y0,z0;
  x0 = cursor.position.x;
  y0 = cursor.position.y;
  z0 = cursor.position.z;

  if(linkLinex != null){
    linkLinex.dispose();
  }
  if(linkLiney != null){
    linkLiney.dispose();
  }
  if(linkLinez != null){
    linkLinez.dispose();
  }


  linkLinex = new BABYLON.Mesh.CreateLines("lline1", [
        new BABYLON.Vector3(x0, y0, z0),
        new BABYLON.Vector3(x0, 0, z0),
    ], scene);
  linkLinex.color = new BABYLON.Color3(1, 0, 0);

  linkLiney = new BABYLON.Mesh.CreateLines("lline2", [
        new BABYLON.Vector3(x0, 0, z0),
        new BABYLON.Vector3(0, 0, z0),
    ], scene);
  linkLiney.color = new BABYLON.Color3(0, 1, 0);

  linkLinez = new BABYLON.Mesh.CreateLines("lline13", [
        new BABYLON.Vector3(x0, 0, z0),
        new BABYLON.Vector3(x0, 0, 0),
    ], scene);
  linkLinez.color = new BABYLON.Color3(0, 0, 1);
  
}