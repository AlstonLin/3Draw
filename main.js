var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectId;
var url = 'mongodb://d3draw.cloudapp.net';
var count = 0;

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
      var scene = new BABYLON.Scene(engine);

      // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
      var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5,-10), scene);

      // target the camera to scene origin
      camera.setTarget(BABYLON.Vector3.Zero());

      // attach the camera to the canvas
      camera.attachControl(canvas, false);

      // create a basic light, aiming 0,1,0 - meaning, to the sky
      var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);

      // create a built-in "sphere" shape; its constructor takes 5 params: name, width, depth, subdivisions, scene
      var sphere = new BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene);

      // move the sphere upward 1/2 of its height
      sphere.position.y = 1;

      // create a built-in "ground" shape; its constructor takes the same 5 params as the sphere's one
      var ground = new BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene);

      // return the created scene
      return scene;
  }

  // call the createScene function
  var scene = createScene();

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
  return {
    x: 0,
    y: 0,
    z: 0
  };
}

function insertScene(db, callback, scene) {
  db.collection('scenes').insertOne({
      "scene" : scene,
      "_id" : count
    }, 
    function(err, result) {
      assert.equal(err, null);
      console.log("Scene" . count . "saved.");
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