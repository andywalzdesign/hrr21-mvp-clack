console.log("hello world");

var clack = angular.module('clack', [])
.controller('clackController', function($scope, $http){
  $scope.userInfo = {};
  $scope.username;
  $scope.userInfo.totalscore = 0;

  $scope.addUser = function(username){
    $scope.username = username;
    console.log('SCOPE', $scope);
    console.log('USERNAME', username);
    console.log('USERNAME', $scope.username);
    var data = {
      username: $scope.username,
      totalscore: $scope.userInfo.totalscore
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
      $scope.userInfo.totalscore = data;
      console.log(data);
      console.log('user loaded');
    }).error(function(error){
      console.log(error);
    });
  };

  $scope.counter = function(){
     $scope.userInfo.totalscore++;
     console.log(totalscore);
  };
});