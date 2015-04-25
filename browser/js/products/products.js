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
  
  	//Add to Cart
	$scope.addToCart = function(product) {
		console.log("add to cart")
		Cart.addToCart(product);
	};
	
	//Search
	$scope.search = function (product){
		//query box is empty
		if(!$scope.query) return true;
		//query box has a string
		var categoriesStr = product.categories.join(",");
		if (product.name.indexOf($scope.query)!=-1 
				|| categoriesStr.indexOf($scope.query)!=-1) {
		        return true;
		    }
		return false;
	};

});