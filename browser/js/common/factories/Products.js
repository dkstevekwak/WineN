'use strict';
app.factory('Products', function ($http) {

  var getAllProducts = function () {
    return $http.get('/api/products').then(function(res){
      return res.data; //should be an array of products
    }, function(err){
        throw new Error(err);
    });
  };

  var getProduct = function(productId){
    return $http.get('/api/products/' + productId).then(function(res){
      return res.data; //should be an array of products
    }, function(err){
        throw new Error(err);
    });
  };

  var updateProduct = function(product) {
	  return $http.put('/api/products/' + product._id, product).then(function(res) {
		  return res.data;
	  }, function(err) {
        throw new Error(err);
	  });
  };

  var createProduct = function(product) {
    return $http.post('/api/products/add', product).then(function(res) {
      return res.data;
    }, function(err) {
        throw new Error(err);
    });
  };
  var deleteProduct = function(productId) {
      return $http.delete('/api/products/' + productId).then(function(res) {
          return res.data;
      });
  };

  return {
    getAllProducts,
    getProduct,
	updateProduct,
    createProduct,
    deleteProduct
  };

});
