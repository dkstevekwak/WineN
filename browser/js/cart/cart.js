'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.html',
        controller: "CartController"
    });
});


app.controller('CartController', function($scope, Cart, Recommendations){
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
  $scope.productRecs = [];
	//Order is important
	if($scope.cartProducts && $scope.cartProducts.length) updateCartFields();	//runs initial calculate on load, further called with ng-change on html quantity forms

	$scope.addToCart = function(product){
		Cart.addToCart(product);
	};
	$scope.removeItem = function(product){
		Cart.removeItem(product);
		updateCartFields();
	};
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
	$scope.getAllRecs = function(){
		$scope.allRecs = Recommendations.getAllRecs();
	};
//	$scope.getAllRecs();
	$scope.getProductRec = function(productId){
    console.log('we are inside getProductRec', productId)
		Recommendations.getProductRec(productId).then(function(prodArr){
      console.log('this promise ran');
      $scope.productRecs = prodArr;
    });
	};
  if ($scope.cartProducts && $scope.cartProducts.length) {
    console.log('we are inside here');
    $scope.getProductRec($scope.cartProducts[0]._id);
  }
});
