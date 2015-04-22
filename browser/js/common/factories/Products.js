'use strict';
app.factory('Products', function ($http) {

  var getAllProducts = function () {
    return $http.get('/api/products').then(function(res){
      return res.data; //should be an array of products
    }, function(err){
      console.log(err);
    })
  };

  var getProduct = function(productId){
    return $http.get('/api/products/' + productId).then(function(res){
      return res.data; //should be an array of products
    }, function(err){
      console.log(err);
    })
  }

  var updateProduct = function(oldProduct, updatedProduct) {
    var toSendProduct = {};
    angular.forEach(oldProduct, function(info,key){
      if(info!==updatedProduct[key]) {
        toSendProduct[key]=updatedProduct[key]
      }
    });
	  return $http.put('/api/products/' + product._id, toSendProduct).then(function(res) {
		  return res.data;
	  }, function(err) {
		  console.log('error', err);
	  });
  };

  var createProduct = function(product) {
    return $http.post('/api/products/add', product).then(function(res) {
      return res.data;
    }, function(err) {
      console.log('error', err);
    });
  };

  return {
    getAllProducts,
    getProduct,
	updateProduct,
    createProduct
  };

});
