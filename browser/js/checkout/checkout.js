'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: 'js/checkout/checkout.html',
        controller: "CheckoutCtrl"
    });
});

app.controller("CheckoutCtrl", function($scope){
	$scope.user = {
		username: "DJ",
		shippingAddress: "334 79th St"
	};
	$scope.products = [];
	

});