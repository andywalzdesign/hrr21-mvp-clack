var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var Users = require('./db/config.js');
var bodyParser = require('body-parser');

app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/client', express.static(__dirname + '/client'));
app.use('/server', express.static(__dirname + '/server'));
app.use('/db', express.static(__dirname + '/db'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

//routes
app.get('/', function(req, res){
  res.sendFile('/', {root: __dirname});
});

app.get('/loadPrompt', function(req, res){
  res.send('Take a screenshot of your score and brag about it to your friends');
});

app.put('/savescore', function(req, res){
  var score = req.body.totalscore;
  var user = req.body.username || 'ABC123';
  console.log('body usr', req.body.username);
  Users.findOneAndUpdate({username: user}, {username: user, totalscore: score}, function(err, updatedUser){
    console.log('updated user', updatedUser);
    res.json(updatedUser);
  });
});

app.post('/loaduser', function(req, res){
  var user = req.body.username;
  Users.findOne({username: user}, function(err, user){
    if(err){
      console.log(err);
    }
    res.json(user);
  });
});

app.get('/allusers', function(req, res){
  return Users.find({}, function(err, users){
    if(err){
      console.log(err);
    }
    res.json(users);
  });
});

app.post('/user', function(req, res){
  var newUser = new Users({username: req.body.username, totalscore: req.body.totalscore});
  newUser.save(function(err, newUser){
    if(err){
      return console.log('err', err);
    }
    console.log('newUser in DB');
    res.send(newUser);
  });
});

app.get('/*', function(req, res) {
  res.sendFile('/index.html');
});

//start up the server
var server = app.listen(port, function(){
  console.log('Im listening');
});