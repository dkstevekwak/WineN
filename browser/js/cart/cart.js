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
	$scope.cartProducts = Cart.getCart();
	// $scope.

	var updateCartFields = function(){
		$scope.subTotal = Cart.calculateSubTotal();
		$scope.cartProducts = Cart.getCart();
		$scope.total = $scope.shipping + $scope.tax + $scope.subTotal;
	};

	//Order is important
	if($scope.cartProducts && $scope.cartProducts.length) updateCartFields();	//runs initial calculate on load, further called with ng-change on html quantity forms

	$scope.addToCart = function(product){
		Cart.addToCart(product);
	};
	$scope.removeItem = function(product){
		Cart.removeItem(product);
		updateCartFields();
	}
	$scope.emptyCart = function (){
		//Cart.localCart = [];
		Cart.emptyCart();
		updateCartFields();
	};
	$scope.changeQty = function(productId, qty){
		Cart.changeQty(productId, qty);
		updateCartFields();
	};
	$scope.updateCart = function(){//shouldn't exist
		Cart.localCart = $scope.cartProducts;
	};
});
