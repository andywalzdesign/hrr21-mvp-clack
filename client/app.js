console.log("hello world");

var clack = angular.module('clack', [])
.controller('clackController', function($scope, $http){
  $scope.userInfo = {};
  $scope.userInfo.totalscore = 0;

  $scope.addUser = function(username){
    $scope.userInfo.username = username;
    var data = {
      username: $scope.userInfo.username,
      totalscore: $scope.userInfo.totalscore
    };
    // $http.post('/user', data).success(function(err, data){
    //   console.log('user added');
    //   console.log(data);
    // }).error(function(error){
    //   console.log(error);
    // });
    $http({
      url: '/user',
      method: 'POST',
      data: JSON.stringify(data)
    }).success(function(err, data){
      console.log('user added');
      console.log(data);
    }).error(function(error){
      console.log(error);
    });
  };

  $scope.loadUser = function(username){
    $scope.userInfo.loadUser = username;

    $http.get('/user').success(function(err, data){
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