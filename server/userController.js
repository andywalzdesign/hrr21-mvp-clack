module.exports = function(req, res){
//need to get data
  var newUser = new Users({username: 'req.body.username', totalscore: 0});
  console.log('34', newUser);
  newUser.save(function(err, newUser){
    if(err){
      return console.log('err', err);
    }
    console.log(newUser);
    res.send('HERRO post');
    return newUser;
  });
};