'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('newproductadmins', {
        url: '/admins/newProduct',
        templateUrl: 'js/admins/newProduct/products.html',
		controller: 'NewProductAdminController'
    });
});

app.controller('NewProductAdminController', function($scope, Products, $state) {



	$scope.createProduct = function(product) {
		Products.createProduct(product)
		.then(function(product) {
            $state.go('productsadmins');
            //TODO nice to redirect to newly created product page
		});
	};

});
