'use strict';
app.factory('Cart', function ($http,localStorageService, Users, AuthService) {
	// nice to haves cartID, total numberOfItems and subtotal for cookie/session

	var shipping = 5;
	var tax = 5;
	var localCart = JSON.parse(localStorage.getItem('cart') || []);

	function productExists(productId){
		var test = localCart.filter(function(el){
			return el._id === productId;
		})
		return test.length;
	} //check if product exists, returns a num

	function incrementQty(productId){
		localCart.filter(function(el){
			return el._id === productId;
		})[0].orderQty++;
		localStorage.setItem('cart',JSON.stringify(localCart));
	}//adds one to item in local cart + localStorage

  var readCart = function(){
    localCart = JSON.parse(localStorage.getItem('cart'));
  };
  var setCart = function(){
    localStorage.setItem('cart',JSON.stringify(localCart));
  }

	var changeQty = function(productId, qty){
		localCart.filter(function(el){
			return el._id === productId;
		})[0] = qty;
		localStorage.setItem('cart',JSON.stringify(localCart));
	}//edits item in local cart + localStorage

	var addToCart = function(product) {
		if (!localStorage && !localStorage.getItem('cart')) {
			localStorage.setItem('cart',JSON.stringify(localCart));
		} //if localStorage doesn't exist, create it
		else if (productExists(product._id)){
			incrementQty(product._id);
    }
    else {
        product.orderQty = 1;
    }//find product in local cart to update qty, else set to 1 and add

		localCart.push(product);
		localStorage.setItem('cart',JSON.stringify(localCart));
	};//checks if localStorage exists, changes localCart and localStorage

	var emptyCart = function(){
		readCart();
		while(localCart.length){
			localCart.pop();
		}
		localStorage.setItem('cart',JSON.stringify(localCart));
	}; //clears localStorage and localCart, perhaps need to also do so to cloud?

	//cart is  cleared server side upon order creation;
	var removeItem = function(product){
		readCart();
		localCart = localCart.filter(function(el){
			return el._id !== product._id;
		});
		localStorage.setItem('cart',JSON.stringify(localCart));
	}; //removes item from localStorage and localCart

	var getCart = function() {
		readCart();
		return localCart;
	}; //a function that resets localCart to read localStorage

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

  var cloudCartSync = function(){
    if (AuthService.isAuthenticated()){
      Users.getCurrentUser().then(function(user){
        if (localCart && localCart.length == 0 && user.cart.length > 0) {
          localStorage.setItem('cart',JSON.stringify(user.cart));
          readCart();
        }// if localCart exists but is empty and user has a cloud cart, set localStorage and localCart to user.cart
        else if (localCart && localCart.length) {
          updateCloudCart();
        }
        console.log('cloudCartSynced');
      }, function(err){
        console.log('failed to get current user', err);
        return null;
      })
    }



  };
  //cloudCartSync(); //checks cloud cart on load;

  var updateCloudCart = function(){
    return Users.getCurrentUser().then(function(user) {
      console.log('serverCart Updating');
      readCart();
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

  return {
	  addToCart,
	  emptyCart,
	  calculateSubTotal,
	  removeItem,
	  shipping,
	  getCart,
	  tax,
		changeQty
  };

});
