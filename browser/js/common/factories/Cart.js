'use strict';
app.factory('Cart', function ($http) {
	// nice to haves cartID, total numberOfItems and subtotal for cookie/session
	var cart = [];
	//add to cart
	var addToCart = function(product) {
		product.orderQty = 1;
		cart.push(product);
	};
	//empty cart
	var emptyCart = function(){
		console.log("before empty cart")
		if (cart.length){
			console.log("inside empty cart")
			do {
				console.log("during empty cart")
				cart.pop();
			} while(cart.length)
		}
	};
	//remove from cart
	
	//eventually save cart  
  return {
	  addToCart,
	  cart,
		emptyCart
  };

});
