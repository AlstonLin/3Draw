var scene, camera, cursor, socket, engine, canvas;
var count = 0;
var id = 0;
var freeCam = true;
/**
socket = io();

io.on('server update', function(data){
  scene = data;
});

socket.emit('client id', {socket: socket, roomId: id});
**/
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
  
  //Return all scenes
  //var scenes = collection.find().fetch();
  //Get scene by id
  //var currentScene = collection.find({"_id" : id}).fetch();

  if(currentScene == []) {
  // createScene function that creates and return the scene
    var createScene = function(){
      // create a basic BJS Scene object
      scene = new BABYLON.Scene(engine);

      // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
      camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 0, 5), scene);

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
          new BABYLON.Vector3(100000, 0, 0),
          new BABYLON.Vector3(-100000, 0, 0),
      ], scene);
      
      linex.color = new BABYLON.Color3(1, 0, 0);

      var liney = new BABYLON.Mesh.CreateLines("line2", [
          new BABYLON.Vector3(0, 100000, 0),
          new BABYLON.Vector3(0, -100000, 0),
      ], scene);
      liney.color = new BABYLON.Color3(0, 1, 0);

      var linez = new BABYLON.Mesh.CreateLines("line3", [
          new BABYLON.Vector3(0, 0, 100000),
          new BABYLON.Vector3(0, 0, -100000),
      ], scene);
      linez.color = new BABYLON.Color3(0, 0, 1);

      // return the created scene
      return scene;
    };
  }

  // createScene function that creates and return the scene
  var createScene = function(){
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



    // return the created scene
    return scene;
  };


    // call the createScene function
  var currentScene = getScene(id);
  if(currentScene == null) {
    scene = createScene();
  } else {
    scene = currentScene;
  }
  engine.runRenderLoop(function(){
      scene.render();
  });

  // the canvas/window resize event handler
  window.addEventListener('resize', function(){
      engine.resize();
  });
});

function switchView(){
  var cx, cy, cz;
  cx = camera.position.x;
  cy = camera.position.y;
  cz = camera.position.z;

  if(freeCam){
  camera.dispose();
       //  Create an ArcRotateCamera aimed at 0,0,0, with no alpha, beta or radius, so be careful.  It will look broken.
   camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 0, BABYLON.Vector3.Zero(), scene);
   // Quick, let's use the setPosition() method... with a common Vector3 position, to make our camera better aimed.
   camera.setPosition(new BABYLON.Vector3(cx, cy, cz));
   // First, set the scene's activeCamera... to be YOUR camera.
   scene.activeCamera = camera;
// Then attach the activeCamera to the canvas.
   scene.activeCamera.attachControl(canvas);
    freeCam = false;
  }else{
    camera.dispose();
    camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(cx, cy, cz), scene);
    // target the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // attach the camera to the canvas
    camera.attachControl(canvas, false);
    freeCam = true;
  }
  console.log("switch Cam");
}

function getScene(){

}

function addSceneToServer(){
  //socket.emit('client insert', {roomId: id, scene: scene});
}

function updateServer(){
  //socket.emit('client update', {roomId: id, scene: scene});
}



