'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('productsadmins', {
        url: '/admins/products',
        templateUrl: 'js/admins/products/products.html',
		controller: 'ProductsAdminController'
    });
});

app.controller('ProductsAdminController', function($scope, Products, Reviews) {
	$scope.updatedProduct = null;
	$scope.seeReviews = true;

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
			console.log(err)
		})
	};
	$scope.showReviews = function(){
		if(!$scope.seeReviews) $scope.seeReviews = true;
		else $scope.seeReviews = false;
	}
});
