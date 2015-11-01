
var scene, camera, cursor;
//var MongoClient = require('mongodb').MongoClient;
//var assert = require('assert');
//var ObjectId = require('mongodb').ObjectId;
//var url = 'mongodb://d3draw.cloudapp.net';
var count = 0;
var cubeCounter = 0;

window.addEventListener('DOMContentLoaded', function(){
  //Increment counter
  count++;
  console.log(count);
  // get the canvas DOM element
  var canvas = document.getElementById('renderCanvas');

  // load the 3D engine
  var engine = new BABYLON.Engine(canvas, true);

  
    
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
  }

  

  // call the createScene function
  scene = createScene();

  //Insert scene into database
  console.log("About to insert.");
  /*MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    insertScene(db, function() {
      db.close();
    }, scene);
  });*/

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



/*
function insertScene(db, callback, scene) {
  db.collection('scenes').insertOne({
      "scene" : scene,
      "_id" : count
    }, 
    function(err, result) {
      assert.equal(err, null);
      console.log("Scene " + count + " saved.");
      callback(result);
    });
}

//Return all scenes
var scenes = function getAllScenes(db, callback) {
  var cursor = db.collection('scenes').find();
  cursor.each(function(err, doc) {
    assert.equal(err, null);
    if(doc != null) {
      console.dir(doc);
    }
    else {
      callback();
    }
  });
}

//Get scene by id
var scene = function getScene(db, callback, id) {
  var cursor =db.collection('scenes').find( { "_id": id } );
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         console.dir(doc);
      } else {
         callback();
      }
   });

}
*/
