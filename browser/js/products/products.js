'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('products', {
        url: '/products',
        templateUrl: 'js/products/products.html',
        controller: 'ProductsController'
    });
});

app.controller('ProductsController', function($scope, Products, Cart, localStorageService){
	//locatStorageService	
	
	$scope.categories=['all', 'Red','White','Sparkling',"Cider"];
	$scope.currentCategory = "all";
	$scope.selectCategory = function(category){
		$scope.currentCategory = category;
	}
  Products.getAllProducts().then(function(productList){
    $scope.products = productList;
  }, function(err){
    console.log("errors", err);
  })
  
	$scope.addToCart = function(product) {
		console.log("add to cart")
		Cart.addToCart(product);
	};

});