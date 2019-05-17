app.controller('ELearnHomeController',['$scope','$http','$location',
function($scope,$http,$location){
  $scope.stam = function(){
    console.log('stam')
  }

  $scope.newUser = function(){
    console.log('registerme')
    $scope.register.reg = true;
    
  }
  $scope.processForm = function(){
    $http({
      method: 'POST',
      data:$scope.user,
      url: '/login'
    }).then(function (response) {
      console.log(response.data)
      if (response.data.msg == 'OK'){
        $location.path('/ShowMeDoVids')
      }
       // this callback will be called asynchronously
        // when the response is available
      }, function (response) {
        console.log('failure')
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

    }


  $scope.processRegistration = function(){
    $scope.register.reg = false

    $scope.register.new = new Date()
    console.log($scope.register)

    $http({
      method: 'POST',
      data:$scope.register,
      url: '/register'
    }).then(function successCallback(response) {
      console.log('successful')
        // this callback will be called asynchronously
        // when the response is available
      }, function errorCallback(response) {
        console.log('failure')
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
      register.$setPristine();
  }  
}])