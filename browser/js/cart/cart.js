'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.html',
        controller: "CartController"
    });
});


app.controller('CartController', function($scope){
	$scope.cartProducts = [{
		name: "Malbec",
		quantity: "1",
		price: "29.99",
		amount: ""
	}];

	$scope.calculateAmount = function(q,p){
		if(!q||!p) return 0;
		return parseFloat(q) * parseFloat(p);
	}

});