var collection;
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
 
function setupMongo(){
  var mongodb = require('mongodb');
  var MongoClient = mongodb.MongoClient;
  var url = 'mongodb://d3draw.cloudapp.net:27017/scenes';
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