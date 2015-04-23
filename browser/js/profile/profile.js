'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('profile', {
        url: '/profile',
        templateUrl: 'js/profile/profile.html',
        controller: 'ProfileController'
    });
});


app.controller("ProfileController", function($scope, Users){
	//$scope.user = {
	//	username: "DJ",
	//	password: "pass",
	//	email: "email@gmail.com",
	//	role: "admin",
	//	orders: ['order1','order2'],
	//	mailingAddress: "334 79th St",
	//	shippingAddress: "334 79th St"
	//}
    $scope.updateProfile = function(user){
        Users.updateUser(user); //not sure if this sets unshown fields to null;
    }
	$scope.getCurrentUser = function(){
      Users.getCurrentUser().then(function(user){
          console.log('successful user response', user)
          $scope.user = user;
      }, function(err){
          console.log('not logged in');
      })
  }
    $scope.getCurrentUser();
});