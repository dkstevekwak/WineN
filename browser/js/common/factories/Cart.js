'use strict';
app.factory('Cart', function ($http) {
	// nice to haves cartID, total numberOfItems and subtotal for cookie/session
	var cart = [];
	var shipping = 5;
	var tax = 5;


	//add to cart
	var addToCart = function(product) {
		product.orderQty = 1;
		cart.push(product);
	};
	//empty cart
	var emptyCart = function(){
		while(cart.length) {
			cart.pop();
		}
	};
	//remove from cart
	
	//eventually save cart  
	var calculateAmount = function(q,p){
		if(!q||!p) return 0;
		return parseFloat(q) * parseFloat(p);
	};

	var calculateSubTotal = function(){
		var subTotal=0;
		angular.forEach(cart, function(eachProduct){
			subTotal+=calculateAmount(eachProduct.orderQty, eachProduct.price);
		})
		return subTotal;
	}
  return {
	  addToCart,
	  cart,
	  emptyCart,
	  calculateSubTotal,
	  shipping,
	  tax
  };

});
