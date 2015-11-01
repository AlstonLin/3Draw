var scene, camera, cursor;
var cubeCounter = 0;

window.addEventListener('DOMContentLoaded', function(){
  // get the canvas DOM element
  var canvas = document.getElementById('renderCanvas');

  // load the 3D engine
  var engine = new BABYLON.Engine(canvas, true);

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
    // return the created scene
    return scene;
  }

  // call the createScene function
  scene = createScene();

  // run the render loop
  engine.runRenderLoop(function(){
      scene.render();
  });

  // the canvas/window resize event handler
  window.addEventListener('resize', function(){
      engine.resize();
  });
});

window.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 87: //w -> +y
      cursor.position.y += 0.1;
    break;

    case 65: //a -> +x
      cursor.position.x += 0.1
    break;

    case 83: //s -> -y
      cursor.position.y -= 0.1;
    break;

    case 68: //d -> -x
      cursor.position.x -= 0.1;
    break;

    case 81: //q -> +z
      cursor.position.z += 0.1;
    break;

    case 69: //e -> -z
      cursor.position.z -= 0.1;
    break;
  }
}, false);



