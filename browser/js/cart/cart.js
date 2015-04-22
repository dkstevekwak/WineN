'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.html',
        controller: "CartController"
    });
});


app.controller('CartController', function($scope, Cart){
	$scope.shipping = 5;
	$scope.tax = 5;
	$scope.subTotal = 10;
	$scope.cartProducts = Cart.cart;
	$scope.calculateSubTotal = function(){
		$scope.subTotal = 0;
		$scope.cartProducts = Cart.cart;
		angular.forEach($scope.cartProducts, function(val){
			$scope.subTotal += $scope.calculateAmount(val.orderQty, val.price);
		});
		$scope.total = $scope.shipping + $scope.tax + $scope.subTotal;
		console.log("cart:",Cart.cart);
	};

	$scope.calculateAmount = function(q,p){
		if(!q||!p) return 0;
		return parseFloat(q) * parseFloat(p);
	};
	//Order is important

	$scope.calculateSubTotal(); //runs initial calculate on load, further called with ng-change on html quantity forms
	$scope.addToCart = function(product){
		Cart.addToCart(product);
	};
	$scope.removeItem = function(product){
		Cart.cart = Cart.cart.filter(function(element){
			return element._id!==product._id;
		});
		$scope.cartProducts = Cart.cart;
		$scope.calculateSubTotal();
	}
	$scope.emptyCart = function (){
		Cart.cart = [];
		$scope.calculateSubTotal();		
	};
	$scope.updateCart = function(){
		Cart.cart = $scope.cartProducts;
	};

});