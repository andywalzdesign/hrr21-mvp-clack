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
  $scope.userInfo.totalscore;

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
      console.log('user added');
      console.log(data);
    }).error(function(error){
      console.log(error);
    });
  };

  $scope.loadUser = function(username){
    $scope.userInfo.loadUser = username;
    $http({
      url: '/loaduser',
      method: 'POST',
      data: {
        username: $scope.userInfo.loadUser
      }
    }).success(function(data){
      $scope.userInfo.totalscore = data.totalscore;
      $scope.userInfo.currentscore = data.totalscore;
      console.log(data);
      console.log('user loaded');
    }).error(function(error){
      console.log(error);
    });
  };

  $scope.counter = function(){
     $scope.userInfo.currentscore++;
     console.log(currentscore);
  };
});