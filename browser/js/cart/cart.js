'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.html',
        controller: "CartController"
    });
});


app.controller('CartController', function($scope,'Cart'){
	$scope.addToCart = function(product){
		Cart.addToCart(product);
	};
	$scope.removeItem = function(product){
		Cart.cart = Cart.cart.filter(function(element){
			return element._id!==product._id;
		});
	}
	$scope.cartProducts = Cart.cart;
	$scope.updateCart = function(){
		Cart.cart = $scope.cartProducts;
	};	
	$scope.calculateAmount = function(q,p){
		if(!q||!p) return 0;
		return parseFloat(q) * parseFloat(p);
	};

});