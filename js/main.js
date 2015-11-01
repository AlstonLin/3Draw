var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectId;
var url = 'mongodb://d3draw.cloudapp.net';
var count = 0;
var scene, camera;
var cubeCounter = 0;
var cubeCounter = 0;

window.addEventListener('DOMContentLoaded', function(){
  //Increment counter
  count++;
  Console.log(count);
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

    // create a built-in "sphere" shape; its constructor takes 5 params: name, width, depth, subdivisions, scene
    var sphere = BABYLON.Mesh.CreateSphere('sphere', 16, 2, scene);

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
  }

  

  // call the createScene function
  scene = createScene();

  //Insert scene into database
  Console.log("About to insert.");
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    insertScene(db, function() {
      db.close();
    }, scene);
  });

  // run the render loop
  engine.runRenderLoop(function(){
      scene.render();
  });

  // the canvas/window resize event handler
  window.addEventListener('resize', function(){
      engine.resize();
  });
});

function getCursorPosition(){
  const DIR_MULTIPLIER = 3;

  var cameraX = camera.position.x;
  var cameraY = camera.position.y;
  var cameraZ = camera.position.z;

  var dirX = Math.sin(camera.rotation.x);
  var dirY = Math.sin(camera.rotation.y);
  var dirZ = Math.sin(camera.rotation.z);

  return {
    x: cameraX + DIR_MULTIPLIER * dirX,
    y: cameraY + DIR_MULTIPLIER * dirY,
    z: cameraZ + DIR_MULTIPLIER * dirZ
  };
}

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