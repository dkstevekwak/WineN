'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.html',
        controller: "CartController"
    });
});


app.controller('CartController', function($scope, Cart){
	$scope.shipping = Cart.shipping;
	$scope.tax = Cart.tax;
	$scope.subTotal = 0;
	$scope.cartProducts = Cart.cart;
	// $scope.
	$scope.calculateSubTotal = function(){
		$scope.subTotal = Cart.calculateSubTotal();
		$scope.cartProducts = Cart.cart;
		$scope.total = $scope.shipping + $scope.tax + $scope.subTotal;

	};

	
	//Order is important

	$scope.calculateSubTotal(); //runs initial calculate on load, further called with ng-change on html quantity forms
	$scope.addToCart = function(product){
		Cart.addToCart(product);
	};
	$scope.removeItem = function(product){
		Cart.removeItem(product);
		$scope.cartProducts = Cart.cart;
		$scope.calculateSubTotal();
	}
	$scope.emptyCart = function (){
		//Cart.cart = [];
		Cart.emptyCart();
		$scope.cartProducts = Cart.cart;
		$scope.calculateSubTotal();		
	};
	$scope.updateCart = function(){
		Cart.cart = $scope.cartProducts;
	};
});
