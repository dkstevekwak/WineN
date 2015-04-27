'use strict';
app.factory('Cart', function ($http,localStorageService, Users, AuthService) {
	// nice to haves cartID, total numberOfItems and subtotal for cookie/session

	var shipping = 5;
	var tax = 5;
	var localCart = JSON.parse(localStorage.getItem('cart')) || [];

	function productExists(productId){
		var test = localCart.filter(function(el){
			return el._id === productId;
		});
		return test.length;
	} //check if product exists, returns a num
  var dumpCart = function(cart){
    while (cart && cart.length){
      cart.pop();
    }
  };
  var populateCart = function(target, source){
    //assumes target is blank
    while (source && source.length){
      target.push(source.pop());
    }
  };

  function calculateSubTotal(products){
    var subTotal=0;
    products.forEach(function(eachProduct){
      subTotal+=calculateAmount(eachProduct.orderQty, eachProduct.price);
    });
    return subTotal;
  };

  function calculateAmount(q,p){
    if(!q||!p) return 0;
    return parseFloat(q) * parseFloat(p);
  };

  var readCart = function(){
    var temp = JSON.parse(localStorage.getItem('cart'));
    dumpCart(localCart);
    populateCart(localCart, temp);
  }; //reads from local cart;
  var setLocalCart = function(){
    localStorage.setItem('cart',JSON.stringify(localCart));
  };
  function incrementQty(productId){
    localCart.filter(function(el){
      return el._id === productId;
    })[0].orderQty++;
    setLocalCart();
    updateCloudCart();
  }//adds one to item in local cart + localStorage
	var changeQty = function(productId, qty){
		localCart.filter(function(el){
			return el._id === productId;
		})[0] = qty;
		setLocalCart();
    updateCloudCart();
	};//edits item in local cart + localStorage

	var addToCart = function(product) {
		if (!localStorage && !localStorage.getItem('cart')) {
			localStorage.setItem('cart',JSON.stringify(localCart));
		} //if localStorage doesn't exist, create it
		if (productExists(product._id)){
			incrementQty(product._id);
    }
    else {
      product.orderQty = 1;
      localCart.push(product);
    }//find product in local cart to update qty, else set to 1 and add

		setLocalCart();
	};//checks if localStorage exists, changes localCart and localStorage

	var emptyCart = function(){
		readCart();
		while(localCart.length){
			localCart.pop();
		}
		setLocalCart();
	}; //clears localStorage and localCart, perhaps need to also do so to cloud?

	//cart is  cleared server side upon order creation;
	var removeItem = function(product){
		readCart();
		var temp = localCart.filter(function(el){
			return el._id !== product._id;
		});
    emptyCart();
		populateCart(localCart, temp);
    setLocalCart();
    updateCloudCart();
	}; //removes item from localStorage and localCart

	var getCart = function() {
		readCart();
		return localCart;
	}; //a function that resets localCart to read localStorage






  var updateCloudCart = function(){
    Users.getCurrentUser().then(function(user) {
      readCart();
      return $http.put('/api/users/' + user._id + '/cart', localCart).then(function (res) {
        return res.data; //promise object that should be a cart;
      }, function (err) {
          throw new Error(err);
      })
    }, function(err){
        throw new Error(err);
    })
  };

  var cloudCartSync = function(){
    if (AuthService.isAuthenticated()){
      Users.getCurrentUser().then(function(user){
        if (localCart && localCart.length === 0 && user.cart.length > 0) {
          localStorage.setItem('cart',JSON.stringify(user.cart));
          readCart();
        }// if localCart exists but is empty and user has a cloud cart, set localStorage and localCart to user.cart
        else if (localCart && localCart.length) {
          updateCloudCart();
        }
      }, function(err){
          throw new Error(err);
      });
    }
    //cloudCartSync(); //checks cloud cart on load;
  };
  return {
	  addToCart,
	  emptyCart,
	  removeItem,
	  shipping,
	  getCart,
	  tax,
    calculateSubTotal,
		changeQty,
    cloudCartSync
  };

});
