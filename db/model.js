var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/mvp';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  console.log("Connected successfully to server");

  var collection = db.collection('Users');

  var cursor = collection.find({username: 'me'});
  // .toArray(function(err, result){
  //   if(err){
  //     console.log(err);
  //   } else {
  //     console.log(result);
  //     callback(result);
  //   }
  // });
  //cursor.each(callback());
  console.log(cursor);
  return cursor;
});

module.exports = MongoClient.connect;




















//var mongo = require('./config.js');

// var insertUser = function(db, callback) {
//   // Get the documents collection
//   var collection = db.collection('user');
//   // Insert some documents
//   collection.insertOne(
//     {username: this.username,
//       totalScore: 0
//     }, function(err, result) {
//     console.log("Inserted new User into the collection");
//     callback(result);
//   });
// }

// var database = {};

// database.insertUser = function(db, callback){
//   db.collection('Users').insertOne({
//     "name" : username,
//     "totalscore" : 0
//   }, function(err, result){
//     console.log('added a user');
//     callback(result);
//   });
// };

// var findUser = function(db, callback) {
//   // Get the documents collection
//   var collection = db.collection('user');
//   // Find some documents
//   collection.findOne({username: this.username}, function(err, user) {
//     assert.equal(err, null);
//     console.log("Found the following user");
//     console.log(user)
//     callback(user);
//   });
// }

//module.exports = database;