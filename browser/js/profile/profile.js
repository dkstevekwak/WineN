'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('profile', {
        url: '/profile',
        templateUrl: 'js/profile/profile.html',
        controller: 'ProfileController'
    });
});


app.controller("ProfileController", function($scope){
	$scope.user = {
		username: "DJ",
		password: "pass",
		email: "email@gmail.com",
		role: "admin",
		orders: ['order1','order2'],
		mailingAddress: "334 79th St",	
		shippingAddress: "334 79th St"
	}

});