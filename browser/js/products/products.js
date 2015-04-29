'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('products', {
        url: '/products',
        templateUrl: 'js/products/products.html',
        controller: 'ProductsController'
    });
});

app.controller('ProductsController', function($state, $scope, Products, Cart, Categories, localStorageService){
	//locatStorageService

	$scope.currentCategory = null;

    $scope.findCategory = function(product) {
        return product.categories.some(function(category) {
            return category._id === $scope.currentCategory;
        });
    }

	$scope.selectCategory = function(category){
        console.log('category._id', category._id)
        console.log('currentCategory', $scope.currentCategory)
        if ($scope.currentCategory === category._id) {
            $scope.currentCategory = null;
            return;
        }
		$scope.currentCategory = category._id;
	};

	$scope.imageAnimating = [];

  Products.getAllProducts().then(function(productList){
      productList = productList.filter(function(product) {
          return product.qty > 0;
      });
    $scope.products = productList;
  }, function(err){
      throw new Error(err);
  });

    var getCategories = function() {
        Categories.getCategories()
        .then(function(categoryList) {
            $scope.categories = categoryList;
        })
        .catch(function(err) {
            console.log(err);
        });
    };
    getCategories();

  	//Add to Cart
	$scope.addToCart = function(product) {
		Cart.addToCart(product);
	};
	$scope.setPromo = function(promoCode) {
		Cart.order.promo = promoCode;
		Cart.featuredPromo = true;
		$state.go("checkout");
	}
	//Search
	$scope.search = function (product){
		//query box is empty
		if(!$scope.query) return true;
		//query box has a string
        var lowercaseQuery = $scope.query.toLowerCase();
        var lowercaseName = product.name.toLowerCase();
		var categoriesStr = product.categories.join(",");
        var lowercaseCategories = categoriesStr.toLowerCase();

		if (lowercaseName.indexOf(lowercaseQuery) > -1
				|| lowercaseCategories.indexOf(lowercaseQuery) > -1) {
		        return true;
		    }
		return false;
	};
	$scope.imageAnimate = function(productId){
		var index = $scope.imageAnimating.indexOf(productId);
		if(index===-1) {
			$scope.imageAnimating.push(productId);
		}
		else {
			$scope.imageAnimating.splice(index,1);
		}
	};
});
