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
