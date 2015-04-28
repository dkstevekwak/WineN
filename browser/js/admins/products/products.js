'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('productsadmins', {
        url: '/admins/products',
        templateUrl: 'js/admins/products/products.html',
		controller: 'ProductsAdminController'
    });
});

app.controller('ProductsAdminController', function($scope, Products, Reviews, Categories) {
	$scope.updatedProduct = null;
	//$scope.viewingProducts = [];

    $scope.selectedCategories = [];

    $scope.currentProduct = null;

    function Product() {
        this.name = null;
        this.image = null;
        this.price = null;
        this.qty = null;
        this.createdBy = null;
        this.categories = [];
        this.description = {
            review: null,
            winery: null,
            origin: null,
            do: null,
            grapes: null,
            taste: null,
            serves: null,
            vintage: null,
            aoc: null
        }
    };

    $scope.newProduct = new Product();

    $scope.setCategory = function(category, product){
        var index = product.categories.indexOf(category._id);
        if(index === -1){
            product.categories.push(category._id)
            $scope.selectedCategories.push(category._id);
        }
        else {
            product.categories.splice(index,1);
            $scope.selectedCategories.splice(index, 1);
        }
    };


	$scope.createProduct = function(product) {
		Products.createProduct(product)
		.then(function(product) {
            console.log('product', product);
            $scope.products.push(product);
            $scope.newProduct = new Product();
            $scope.selectedCategories = [];
		});
	};

    $scope.setCurrentProduct = function(product) {
        if (product === $scope.currentProduct) {
            $scope.currentProduct = null;
            $scope.selectedCategories = [];
            return;
        }
        $scope.currentProduct = product;
        $scope.currentTab = 'details';
    };

    $scope.setCurrentTab = function(tab) {
        $scope.currentTab = tab;
    };

    $scope.search = function(product) {
		//query box is empty
		if(!$scope.query) return true;
		//query box has a string
        var lowercaseQuery = $scope.query.toLowerCase();
        var lowercaseName = product.name.toLowerCase();

		if (lowercaseName.indexOf(lowercaseQuery) > -1) return true;
		return false;
    };

	Products.getAllProducts()
	.then(function(productList){
        productList = productList.map(function(product) {
            product.categories = product.categories.map(function(category) {
                return category._id;
            });
            return product;
        });
		$scope.products = productList;
	}, function(err){
		console.log('errors', err);
	});

    Categories.getCategories()
    .then(function(categoryList) {
        $scope.categories = categoryList;
    });

	$scope.updateProduct = function(product) {
		Products.updateProduct(product)
		.then(function(product) {
		}).catch(function(err){
			console.log(err);
		});
	};

    $scope.deleteProduct = function(productId) {
        Products.deleteProduct(productId)
        .then(function(product) {
            $scope.products = $scope.products.filter(product => productId !== product._id);
            $scope.currentProduct = null;
            $scope.selectedCategories = [];
        });
    };

	$scope.deleteReview = function(reviewId, productId) {
		Reviews.deleteReview(reviewId).then(function() {
			var indexToUpdate;
			$scope.products.forEach(function(eachProduct,index) {
				if (eachProduct._id === productId) {
					indexToUpdate = index;
				}
			});
			$scope.products[indexToUpdate].reviews = $scope.products[indexToUpdate].reviews.filter(review => review._id !== reviewId);


			//function(review) {
			//return review._id !== reviewId
			//}
		}, function(err) {
            throw new Error(err);
		});
	};
	//$scope.showReviews = function(productId){

		//if($scope.viewingProducts.indexOf(productId)===-1) {
			//$scope.viewingProducts.push(productId);
		//}
		//else {
			//var index = $scope.viewingProducts.indexOf(productId);
			//$scope.viewingProducts.splice(index,1);
		//}
	//}
});
