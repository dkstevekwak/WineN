'use strict';
app.config(function($stateProvider) {

	$stateProvider.state('productDetails', {
		url: '/products/:productId',
		templateUrl: 'js/products/product.html',
		controller: 'ProductController'
	});

});

app.controller('ProductController', function($scope, $stateParams, Products, Cart) {

	var productId = $stateParams.productId;

	Products.getProduct(productId)
	.then(function(product) {
		$scope.product = product;
	}, function(err) {
		console.log('error', err);
	});

	$scope.addToCart = function(product) {
		Cart.addToCart(product);
	};

});
