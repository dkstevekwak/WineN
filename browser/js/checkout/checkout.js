'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: 'js/checkout/checkout.html',
        controller: "CheckoutCtrl"
    });
});

app.controller("CheckoutCtrl", function($state, $scope, Cart, Users, Orders){
	var getCurrentUser = function(){
		Users.getCurrentUser().then(function(currUser){
			$scope.user = currUser;
		}, function(err){
			console.log('error getting current user')
		})
	}
	getCurrentUser();

	$scope.products = Cart.localCart;
	$scope.checkoutDetails = {
		subTotal: Cart.calculateSubTotal(),
		tax: Cart.tax,
		shipping: Cart.shipping,
		total: Cart.calculateSubTotal()+Cart.tax+Cart.shipping
	};
	$scope.confirmOrder = function(){
		var order = {
			cart: $scope.products,
			user: $scope.user,
			details: $scope.checkoutDetails
		}
		Orders.userConfirmOrder(order).then(function(order){
			Cart.emptyCart();
			console.log("order created!!!", order);
			$state.go('order'); //returns the order
			//redirect via state after thankyou/confirmation page created
		}, function(err){
			console.log('order creation failed oh no', err);
		})
	}
	

});