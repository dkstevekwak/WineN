'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('productsadmins', {
        url: '/admins/products',
        templateUrl: 'js/admins/products/products.html',
		controller: 'ProductsAdminController'
    });
});

app.controller('ProductsAdminController', function($scope, Products) {

	Products.getAllProducts()
	.then(function(productList){
		$scope.products = productList;
	}, function(err){
		console.log('errors', err);
	});

	$scope.updateProduct = function(product) {
			console.log('first updated product', product)
		Products.updateProduct(product)
		.then(function(product) {
			console.log('updated product', product)
		}).catch(function(err){
			console.log(err);
		});
	};

});
