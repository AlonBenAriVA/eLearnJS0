
   app.controller('ShowMeDoController', ['$scope','$http',
   function($scope,$http){
      
      $scope.func1 = function(){
         $scope.hello = 'hello'
         $http({
            method:'GET',
            data:$scope.vidlist,
            url:'/vidList'
         }).then(function(response){
            console.log(response.data)
            $scope.vids = response.data
         },function(err){
            console.log(err.data)
         })
      }

      $scope.func1()
      
   }])






