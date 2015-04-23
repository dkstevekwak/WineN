'use strict';
app.factory('Cart', function ($http,localStorageService) {
	// nice to haves cartID, total numberOfItems and subtotal for cookie/session
	var cart = [];
	var shipping = 5;
	var tax = 5;
	var localProducts = JSON.parse(localStorage.getItem('cart')) || [];

//	var productsLS = localStorage.getItem('productIds').split(",") || [];
	

	//add to cart
	var addToCart = function(product) {
		product.orderQty = 1;
		cart.push(product);
		//set local storage in the browser
		localProducts.push(product);
		localStorage.setItem('cart',JSON.stringify(localProducts));
		//get local storage in the browser
		$http.get('api/cart', {
            params: { productId: product._id }
        }).then(function (response) {
            return response.data;
        });
	};
	//empty cart
	var emptyCart = function(){
		var localCart = JSON.parse(localStorage.getItem('cart'));	
		while(localCart.length){
			localCart.pop();
		}
		localStorage.setItem('cart',JSON.stringify(localCart));
		while(cart.length) {
			cart.pop();
		}
	};

	var removeItem = function(product){
		//local storage
		localProducts = JSON.parse(localStorage.getItem('cart'));
		localProducts = localProducts.filter(function(el){
			return el._id !== product._id;
		});
		localStorage.setItem('cart',JSON.stringify(localProducts));		
		
		//angular cart
		cart.forEach(function(element,index){
			if(element._id===product._id){
				cart.splice(index,1)
			}
		});
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
	  removeItem,
	  shipping,
	  tax
  };

});
