'use strict';
app.factory('Products', function ($http) {

  var getAllProducts = function () {
    return $http.get('/api/products').then(function(res){
      console.log("here is res", res);
      return res.data; //should be an array of products
    }, function(err){
      console.log(err);
      console.log("uh oh")
    })
  };

  var getProduct = function(productId){
    return $http.get('/api/products/' + productId).then(function(res){
      console.log("here is res", res);
      return res.data; //should be an array of products
    }, function(err){
      console.log(err);
      console.log("uh oh")
    })
  }

  var updateProduct = function(product) {
	  return $http.put('/api/products/' + product._id, product).then(function(res) {
		  console.log('response', res)
		  return res.data;
	  }, function(err) {
		  console.log('error', err);
	  });
  };

  return {
    getAllProducts,
    getProduct,
	updateProduct
  };

});
