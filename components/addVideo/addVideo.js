app.controller('AddVideoController',['$scope','$http',
  function($scope,$http){
    $scope.loadClips = function(){
      console.log('adding videos')
      $http({
        method:'POST',
        data:$scope.clips,
        url:'/loadClips',
      }).then(function(response){
        console.log(response.data)
      }, function(err){
        console.log('err.data')
      })   
    }
  }])