var scene, camera, cursor, collection;
var count = 0;
var id = 0;

function setupMongo(){
  var mongodb = require('mongodb');
  var MongoClient = mongodb.MongoClient;
  var url = 'mongodb://localhost:27017/scenes';
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      //HURRAY!! We are connected. :)
      console.log('Connection established to', url);
      collection = db.collection('scenes');
      db.close();
    }
  });
}

setupMongo();

$("#submit").click(function(){
  id = $("#id").val();
});

//added comment to force sync


window.addEventListener('DOMContentLoaded', function(){
  //Increment counter
  count++;
  console.log(count);
  // get the canvas DOM element
  var canvas = document.getElementById('renderCanvas');

  // load the 3D engine;
  var engine = new BABYLON.Engine(canvas, true);

  //Get ID
  console.log("ID: " + id);

  //Return all scenes
  var scenes = collection.find().fetch();
  //Get scene by id
  var currentScene = collection.find({"_id" : id}).fetch();

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

    drawLinkLines();


    // return the created scene
    return scene;
  }

    // call the createScene function
    scene = createScene();

    //Insert scene into database
    console.log("About to insert.");
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      insertScene(db, function() {
        db.close();
      }, scene);
    });
  }

  else { 
    scene = currentScene;
  }

  // run the render loop
  engine.runRenderLoop(function(){
      scene.render();
  });

  // the canvas/window resize event handler
  window.addEventListener('resize', function(){
      engine.resize();
  });
});

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



