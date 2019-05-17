app.controller('VideoThreadController', ['$scope','$http','$routeParams','$location',
   function($scope,$http,$routeParams,$location){
    var vid = $routeParams.vidId  //get the video id
    $scope.video = {}
    $scope.topics = {}
    $http({
     method:'GET',
     url:'/thread/' +JSON.stringify(vid),
     
    }).then(function(success){
      $scope.video = success.data
    }, function(err){
      console.log(err)
    })


    $scope.iife = (function(){
      $http({
        method:'GET',
        url:'/getTopicList',
      }).then(function(response){
        $scope.topics =response.data
        
      }), function(response){
        console.log('failure')
      }
     
    })()



    $scope.addTopic = function(){
      /*
        A method to add a topic
      */
     console.log('Adding a topic')
     $scope.addNewTopic = true
    }

    $scope.SubmitNewTopic = function(){
      console.log('submit new topic')
      $scope.topic.vid_id = $location.path().split("/")[2] // get the 
      
      $http({
        method:'POST',
        data:$scope.topic,
        url:'/newTopic'
      }).then(function(response){
          $scope.addNewTopic = false
          $scope.topics = response.data
          console.log($scope.topics)
      }, function(response){
        console.log('failure')


      })
    }

   }])