console.log("hello world");

var clack = angular.module('clack', ['ngRoute']);
clack.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: '/client/game.html'
  })
  .when('/getclackin', {
    templateUrl: '/client/getclackin.html'
  })
});

clack.controller('clackController', function($scope, $http){
  $scope.userInfo = {};
  $scope.userInfo.username;
  $scope.userInfo.currentscore = 0;
  $scope.userInfo.totalscore = 0;
  $scope.userInfo.theUsers = [];

  $scope.addUser = function(username){
    $scope.userInfo.username = username;
    var data = {
      username: $scope.userInfo.username,
      totalscore: 0
    };
    $http({
      url: '/user',
      method: 'POST',
      data: JSON.stringify(data)
    }).success(function(data){
      console.log(data);
    }).error(function(error){
      console.log(error);
    });
  };

  $scope.loadUser = function(username){
    $scope.userInfo.username = username;
    $http({
      url: '/loaduser',
      method: 'POST',
      data: {
        username: $scope.userInfo.username
      }
    }).success(function(data){
      if(data){
        $scope.userInfo.totalscore = data.totalscore;
        $scope.userInfo.currentscore = data.totalscore;
      }
    }).error(function(error){
      console.log(error);
    });
  };

  $scope.loadUsers = function(){
    $http({
      url: '/allusers',
      method: 'GET'
    }).success(function(users){
      $scope.userInfo.theUsers = users;
    }).error(function(err){
      console.log(err);
    });
  };

  $scope.saveScore = function(){
    var prompt = $scope.loadPrompt();
    var newTotal = $scope.userInfo.currentscore + $scope.userInfo.totalscore;
    console.log('NEW TOTAL', newTotal);
    $http({
      url: '/savescore',
      method: 'PUT',
      data: {
        username: $scope.userInfo.username,
        totalscore: newTotal
      }
    }).success(function(updatedUser){
      console.log(updatedUser);
      $scope.userInfo.totalscore += updatedUser.totalscore;
    }).error(function(error){
      console.log(error);
    });
  };

  $scope.loadPrompt = function(){
    $http({
      url: '/loadPrompt',
      method: 'GET'
    });
  };

  $scope.startGame = function(){
    setTimeout(function(){
      $scope.saveScore()
      $scope.userInfo.currentscore = 0;
      console.log('TIME\'S UP');
    }, 1000);
  };

  $scope.counter = function(){
     $scope.userInfo.currentscore++;
     console.log($scope.userInfo.currentscore);
  };
});