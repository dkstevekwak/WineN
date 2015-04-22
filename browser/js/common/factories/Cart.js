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
		cart = [];
	};
	//remove from cart
	
	//eventually save cart  
  return {
	  addToCart,
	  cart,
		emptyCart
  };

});
