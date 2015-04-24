'use strict';
app.factory('Cart', function ($http,localStorageService, Users) {
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

		cloudCartSync();
		//assuming
		//$http.get('api/cart', {
     //       params: { productId: product._id }
     //   }).then(function (response) {
     //       return response.data;
		//});
	};
	//empty cart
	var emptyCart = function(){
		localCart = JSON.parse(localStorage.getItem('cart'));
		while(localCart.length){
			localCart.pop();
		}
		localStorage.setItem('cart',JSON.stringify(localCart));
//		while(cart.length) {
//			cart.pop();
//		}
	};
	var readCart = function(){
		localCart = JSON.parse(localStorage.getItem('cart'));
	};

	var cloudCartSync = function(){
		readCart();
		Users.getCurrentUser().then(function(user){
			if (localCart.length == 0 && user.cart.length > 0) {
				localStorage.setItem('cart',JSON.stringify(user.cart));
				readCart();
			}
			else if (localCart.length !== 0) {
				updateCloudCart();
			}
			console.log('cloudCartSynced');
		}, function(err){
			console.log('failed to get current user', err);
			return null;
		})


	};
	cloudCartSync(); //checks cloud cart on load;

	//var getCloudCart = function(){
	//	console.log('getting cloud cart');
	//	return $http.get('/api/' + user._id + '/cart').then(function(res){
	//		console.log('got serverCart', res);
	//		return res.data; //should be promise object that is a cart;
	//	}, function(err){
	//		console.log('failed to update cart', err)
	//	})
	//}; //may not be necessary since cart is part of user object;
	var updateCloudCart = function(){
		Users.getCurrentUser().then(function(user) {
			console.log('serverCart Updating');
			return $http.put('/api/users/' + user._id + '/cart', localCart).then(function (res) {
				console.log('serverCart Updated', res.data);
				return res.data; //promise object that should be a cart;
			}, function (err) {
				console.log('failed to update cart', err)
			})
		}, function(err){
			console.log('failed to get current user', err);
			return null;
		})
	};


	//cart is  cleared server side upon order creation;
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

	var getCart = function() {
		return localCart;
	};

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
	  emptyCart,
	  calculateSubTotal,
	  removeItem,
	  shipping,
	  getCart,
	  tax
  };

});
