'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: 'js/checkout/checkout.html',
        controller: "CheckoutCtrl"
    });
});

app.controller("CheckoutCtrl", function($state, $scope, Cart, Users, Orders, Promos){

    Users.getCurrentUser().then(function(currUser){
        $scope.user = currUser;
    }, function(err){
        throw new Error(err);
    });

	$scope.promoCode = null;
	$scope.products = Cart.getCart();

	var subTotal = Cart.calculateSubTotal($scope.products);

	$scope.checkoutDetails = {
		subTotal: subTotal,
		tax: Cart.tax,
		shipping: Cart.shipping
	};

	$scope.confirmOrder = function(){
		var order = {
			cart: $scope.products,
			user: $scope.user,
			details: $scope.checkoutDetails
		};
		Orders.userConfirmOrder(order).then(function(order){
			Cart.emptyCart();
			$state.go('order'); //returns the order
			//redirect via state after thankyou/confirmation page created
		}, function(err){
            throw new Error(err);
		});
	};

	$scope.applyPromo = function(promoCode){
		Promos.getPromo(promoCode).then(function(promo){
			if(!promo) console.log("promo does not exist");
			else {
				if(promo.products.length){
					$scope.products.forEach(function(cartProduct){
						promo.products.forEach(function(promoProduct){
							if(cartProduct._id === promoProduct) {
								cartProduct.price *= (100-promo.percentage)/100;
								$scope.checkoutDetails.subTotal = Cart.calculateSubTotal($scope.products);
							}
						})
					})
				} else {
					$scope.products.forEach(function(cartProduct){
						console.log(cartProduct);
						console.log(promo.category);
						if(cartProduct.categories[0]===promo.name) {
							cartProduct.price *= (100-promo.percentage)/100;
							$scope.checkoutDetails.subTotal = Cart.calculateSubTotal($scope.products);
						}
					})
				}
			}
		})

	}

});
