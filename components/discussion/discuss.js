app.controller('DiscussController', ['$scope','$http','$routeParams','$location',
   function($scope,$http,$routeParams,$location){
    console.log('DiscussionController')
    $scope.commentsDisplayed = {}
    $scope.newReply = {}
    $scope.addReply = false;
    var topic_id = $location.path().split("/")[2]; // get the topic id


    $scope.showComments = function(){
      console.log(topic_id)
      $http({
         method:'GET',
         data:$scope.topicDisplayed,
         url:'/showComments/'+ JSON.stringify(topic_id)
      }).then(
         function(response){
            $scope.commentsDisplayed = response.data
            console.log($scope.commentsDisplayed)
         },function(response){
            console.log('failure')
         }
      )
    }

    $scope.addComment = function(){
       $scope.newReply.topic_id = topic_id
       $scope.newReply.date_time = Date()
       console.log($scope.newReply)
        $http({
         method:'POST',
         data:$scope.newReply,
         url:'/reply'
      }).then(function(response){
         console.log('comment added')
         $scope.showComments()
         $scope.reset()
      }, function(response){
         console.log('cannot add comment')
      })
      $scope.addReply = false;
    }
   
    $scope.reset = function(){
       $scope.newReply = {}
       $scope.commentsForm.$setPristine()
    }
    $scope.reply = function(){
       /*
       A method to add a comment to the 
       */
      
      $scope.addReply = true;
     
    }
    $scope.showComments()
   }])