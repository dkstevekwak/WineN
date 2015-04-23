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
	$scope.cartProducts = Cart.localCart;
	// $scope.
	
	var updateCartFields = function(){
		$scope.subTotal = Cart.calculateSubTotal();
		$scope.cartProducts = Cart.localCart;
		$scope.total = $scope.shipping + $scope.tax + $scope.subTotal;

	};
	
	//Order is important
	if($scope.cartProducts.length) updateCartFields();	//runs initial calculate on load, further called with ng-change on html quantity forms
	
	$scope.addToCart = function(product){
		Cart.addToCart(product);
	};
	$scope.removeItem = function(product){
		Cart.removeItem(product);
//		$scope.cartProducts = Cart.localCart;
		updateCartFields();
	}
	$scope.emptyCart = function (){
		//Cart.localCart = [];
		Cart.emptyCart();
		$scope.cartProducts = Cart.localCart;
		updateCartFields();		
	};
	$scope.updateCart = function(){
		Cart.localCart = $scope.cartProducts;
	};
});