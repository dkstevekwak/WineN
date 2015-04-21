'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('products', {
        url: '/products',
        templateUrl: 'js/products/products.html',
        controller: 'ProductsController'
    });
});



app.controller('ProductsController', function($scope){
	$scope.categories=['red','white','sparkling'];
	$scope.currentCategory = "";
	$scope.selectCategory = function(category){
		$scope.currentCategory = category;
	}


});