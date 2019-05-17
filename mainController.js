var app = angular.module('ELearn',['ngRoute','ngResource','ngMaterial','ngMessages'])
//[
app.config(function($routeProvider) {
	$routeProvider 
    .when('/',{
      templateUrl:'components/eLearn/eLearn.html',
      controller:'ELearnHomeController'
    }).
    when('/getUserList',{
      templateUrl:'components/getUserList/getUserList.html',
      contorller:'GetUserListController'
    }).
    when('/discussion/:disc_id',{
      templateUrl:'components/discussion/discuss.html',
      contorller:'DiscussController'
    }).
    when('/videoThread/:vidId',{
      templateUrl:'components/thread/videoThread.html',
      contorller:'VideoThreadController'
    }).
    when('/addVideo',{
      templateUrl:'components/addVideo/addVideo.html',
      contorller:'AddVideoController'
    }).
    when('/login',{
      templateUrl:'components/admin/login-register.html',
      contorller:'LoginRegisterController'
    }).
    when('/ShowMeDoVids',{
      templateUrl:'components/vids/ShowMeDo.html',
      contorller:'ShowMeDoController'
    }).
    otherwise({
      redirectTo:'/'
    })
  })


app.controller('MainController',['$scope','$routeParams',function($scope,$routeParams){
  console.log('running now')
  $scope.user = {}
  $scope.topic = {}
  $scope.register = {}
  $scope.vidList = ['video1.mp4']
  $scope.addNewTopic = false
  
  


}]);