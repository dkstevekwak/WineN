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

	$scope.promoCode = Cart.order.promo || null;
	$scope.products = Cart.getCart();
	$scope.promoApplied = false;

	var subTotal = Cart.calculateSubTotal($scope.products);

	$scope.checkoutDetails = {
		subTotal: subTotal,
		tax: Cart.order.tax,
		shipping: Cart.order.shipping,
		promo:Cart.order.promo
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
		var newDate = new Date();
		if(Cart.order.promo) return console.log("don't be greedy!");
		Cart.order.promo = $scope.promoCode;
		$scope.checkoutDetails.promo = $scope.promoCode;
		Promos.getPromo(promoCode).then(function(promo){
			if(!promo) console.log("promo does not exist");
			else if(promo.expirationDate<newDate.toISOString()) console.log("promo expired!")
			else {
				if(promo.products.length){
					$scope.products.forEach(function(cartProduct){
						promo.products.forEach(function(promoProduct){
							if(cartProduct._id === promoProduct) {
								cartProduct.price *= (100-promo.percentage)/100;
								$scope.checkoutDetails.subTotal = Cart.calculateSubTotal($scope.products);
								$scope.promoApplied = true;
							}
						});
					});
				} else {
					console.log("else", $scope.products);
					$scope.products.forEach(function(cartProduct){
						cartProduct.categories.forEach(function(eachCategory){
							if(eachCategory === promo.category) {
								cartProduct.price *= (100-promo.percentage)/100;
								$scope.checkoutDetails.subTotal = Cart.calculateSubTotal($scope.products);
								$scope.promoApplied = true;
							}
						});
					});
				}
			}
		});

	};

});
