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

app.get('/getclackin.html', function(req, res){
  res.sendFile('/client/getclackin.html', {root: __dirname});
});

app.get('/user', function(req, res){
  var user = 'andy';
  var stuff = [];
  Users.find({}, function(err, users){
    if(err){
      console.log(err);
    }
    console.log('USERS', users);
    stuff = users;
    res.send(stuff);
  });
});

app.post('/user', function(req, res){
  //need to get data
  console.log('PARAMAS', req.body);
  var newUser = new Users({username: req.body.username, totalscore: req.body.totalscore});
  console.log('34', newUser);
  newUser.save(function(err, newUser){
    if(err){
      return console.log('err', err);
    }
    console.log(newUser);
    res.send('HERRO post');
    return newUser;
  });
});

app.get('/*', function(req, res) {
  res.sendFile('/index.html');
});

//start up the server
var server = app.listen(port, function(){
  console.log('Im listening');
});