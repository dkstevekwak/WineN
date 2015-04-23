'use strict';
app.factory('Cart', function ($http,localStorageService) {
	// nice to haves cartID, total numberOfItems and subtotal for cookie/session

	var shipping = 5;
	var tax = 5;
	var localCart = JSON.parse(localStorage.getItem('cart')) || [];

	//Jimmy and DJ, starting to work on ngCartPersistance-#74
	
	function productExists(productId){
		var test = localCart.filter(function(el){
			return el._id === productId;
		})
		return test.length;
	}
	
	function incrementQty(productId){
		localCart.filter(function(el){
			return el._id === productId;
		})[0].orderQty++;
	}	
	
	//add to cart
	var addToCart = function(product) {
		//find product in local cart to update qty
		if (productExists(product._id)){
			incrementQty(product._id);
			localStorage.setItem('cart',JSON.stringify(localCart));
			return;
		}		
		
		product.orderQty = 1;
//		cart.push(product);
		//set local storage in the browser
		localCart.push(product);
		localStorage.setItem('cart',JSON.stringify(localCart));
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
//		while(cart.length) {
//			cart.pop();
//		}
	};

	var removeItem = function(product){
		//local storage
		localCart = JSON.parse(localStorage.getItem('cart'));
		localCart = localCart.filter(function(el){
			return el._id !== product._id;
		});
		localStorage.setItem('cart',JSON.stringify(localCart));		
		
		//angular cart
//		cart.forEach(function(element,index){
//			if(element._id===product._id){
//				cart.splice(index,1)
//			}
//		});
	};
	//remove from cart
	
	//eventually save cart  
	var calculateAmount = function(q,p){
		if(!q||!p) return 0;
		return parseFloat(q) * parseFloat(p);
	};

	var calculateSubTotal = function(){
		var subTotal=0;
		angular.forEach(localCart, function(eachProduct){
			subTotal+=calculateAmount(eachProduct.orderQty, eachProduct.price);
		})
		return subTotal;
	};
	
  return {
	  addToCart,
	  localCart,
	  emptyCart,
	  calculateSubTotal,
	  removeItem,
	  shipping,
	  tax
  };

});
