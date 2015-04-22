'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('productsadmins', {
        url: '/admins/products',
        templateUrl: 'js/admins/products/products.html',
		controller: 'ProductsAdminController'
    });
});

app.controller('ProductsAdminController', function($scope, Products) {
	$scope.updatedProduct = null;

	Products.getAllProducts()
	.then(function(productList){
		$scope.products = productList;
	}, function(err){
		console.log('errors', err);
	});

	$scope.updateProduct = function(product) {
		Products.updateProduct(product, $scope.updatedProduct)
		.then(function(product) {
		}).catch(function(err){
			console.log(err);
		});
	};

});
