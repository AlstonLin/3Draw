var collection;
var sockets = [];
var socketMap = [];
var mongodb = require('mongodb');
var assert = require('assert');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(80, function(){
  console.log('listening on *80');
});

io.on('connection', function(socket){
  sockets[socket] = -1;
  socket.on('disconnect', function(socket){
    delete sockets[socket];
  });
});

io.on('client id', function(data){
  sockets[data.socket] = data.roomId;
  updateClients(data.roomId, collections.findOne({data.id}));
});

io.on('client update', function(data){
  updateScene(data.roomId, data.scene);
});

io.on('client insert', function(data){
  addScene(data.roomId, data.scene);
});


function setupMongo(){
  var MongoClient = mongodb.MongoClient;
  var url = 'mongodb://localhost';
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      console.log('Connection established to', url);
      collection = db.collection('scenes');
      db.close();
    }
  });
}
setupMongo();



function addScene(roomId, scene){
  collection.insert({
    roomId: roomId,
    scene: scene
  });
}

function updateScene(roomId, scene){
  collection.update(
    {roomId: roomId},
    {$set:{scene: scene}}
  );
  updateClients(roomId, scene);
}

function updateClients(roomId, scene){
    io.broadcast('server update', {roomId: roomId, scene: scene});
  }
}