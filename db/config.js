var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mvp');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('OPEN');
});

var userSchema = mongoose.Schema({
  username: String,
  totalscore: Number
});

var Users = mongoose.model('Users', userSchema);

module.exports = Users;






// var mongodb = require('mongodb');
// var MongoClient = require('mongodb').MongoClient;
// var url = 'mongodb://localhost:27017/mvp';

// // Use connect method to connect to the server
// MongoClient.connect(url, function(err, db) {
//   console.log("Connected successfully to server");

//   var collection = db.collection('Users');
//   var user = {
//     username: 'me',
//     totalscore: 0
//   };
//   collection.insert(user, function(err, result){
//     if(err){
//       console.log(err);
//     } else {
//       console.log('added a user');
//     }
//   });
// });

// module.exports = MongoClient.connect;