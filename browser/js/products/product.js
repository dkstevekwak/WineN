'use strict';
app.config(function($stateProvider) {

	$stateProvider.state('productDetails', {
		url: '/products/:productId',
		templateUrl: 'js/products/product.html',
		controller: 'ProductController'
	});

});

app.controller('ProductController', function($scope, $stateParams, Products, Cart, Reviews) {

	var productId = $stateParams.productId;
	$scope.seeComments = false;

	Products.getProduct(productId)
	.then(function(product) {
		$scope.product = product;
	}, function(err) {
		console.log('error', err);
	});

	$scope.addToCart = function(product) {
		console.log("hi")
		Cart.addToCart(product);
	};

	$scope.viewComments = function(){
		if (!$scope.seeComments) $scope.seeComments = true;
		else $scope.seeComments = false;
	}

});
