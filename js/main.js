var scene, camera, cursor, socket, engine, canvas;
var count = 0;
var id = 0;

socket = io('http://localhost');

io.on('server update', function(data){
  if(scene == null){
    if(data == null) {
      scene = createScene();
    } else { 
      scene = data;
    }
    engine.runRenderLoop(function(){
        scene.render();
    });
  }else{
    scene = data;
  }
});

socket.emit('client id', {socket: socket, roomId: id});

$("#submit").click(function(){
  id = $("#id").val();
});



window.addEventListener('DOMContentLoaded', function(){
  //Increment counter
  count++;
  console.log(count);
  // get the canvas DOM element
  canvas = document.getElementById('renderCanvas');

  // load the 3D engine;
  engine = new BABYLON.Engine(canvas, true);

  //Get ID
  console.log("ID: " + id);
  }
);

window.addEventListener('resize', function(){
      engine.resize();
});


function createScene(){
  // create a basic BJS Scene object
  scene = new BABYLON.Scene(engine);

  // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
  camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 0, 10), scene);

  // target the camera to scene origin
  camera.setTarget(BABYLON.Vector3.Zero());

  // attach the camera to the canvas
  camera.attachControl(canvas, false);

  // create a basic light, aiming 0,1,0 - meaning, to the sky
  var light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0,1,0), scene);
  var materialCursor = new BABYLON.StandardMaterial("cursorTexture", scene);
  materialCursor.diffuseColor = new BABYLON.Color3(0, 0, 0);
  cursor = BABYLON.Mesh.CreateSphere("sphere", 10.0, 0.1, scene);
  cursor.material = materialCursor;

  // create x,y,z axis
  var linex = new BABYLON.Mesh.CreateLines("lines1", [
      new BABYLON.Vector3(10000, 0, 0),
      new BABYLON.Vector3(-10000, 0, 0),
  ], scene);
  

  var liney = new BABYLON.Mesh.CreateLines("line2", [
      new BABYLON.Vector3(0, 10000, 0),
      new BABYLON.Vector3(0, -10000, 0),
  ], scene);

  var linez = new BABYLON.Mesh.CreateLines("line3", [
      new BABYLON.Vector3(0, 0, 10000),
      new BABYLON.Vector3(0, 0, -10000),
  ], scene);

  drawLinkLines();
  // return the created scene
  return scene;
}

function addSceneToServer(){
  socket.emit('client insert', {roomId: id, scene: scene});
}

function updateServer(){
  socket.emit('client update', {roomId: id, scene: scene});
}



