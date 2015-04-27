'use strict';
app.config(function($stateProvider) {

	$stateProvider.state('productDetails', {
		url: '/products/:productId',
		templateUrl: 'js/products/product.html',
		controller: 'ProductController'
	});

});

app.controller('ProductController', function($scope, $stateParams, Products, Cart, Reviews, Recommendations) {

	var productId = $stateParams.productId;
	$scope.seeComments = false;

	Products.getProduct(productId)
	.then(function(product) {
		$scope.product = product;
	}, function(err) {
        throw new Error(err);
	});

	$scope.addToCart = function(product) {
		Cart.addToCart(product);
	};

	$scope.viewComments = function(){
		if (!$scope.seeComments) $scope.seeComments = true;
		else $scope.seeComments = false;
	};
	
	$scope.getProductRec = function(productId){
		$scope.productRecs = [];
		Recommendations.getProductRec(productId).then(function(pidArr){
			pidArr.forEach(function(el){
				Products.getProduct(el.productId)
				.then(function(product) {
						$scope.productRecs.push(product);
					}, function(err) {
				        throw new Error(err);
				});
			});
		});
	};
	$scope.getProductRec(productId);
});
