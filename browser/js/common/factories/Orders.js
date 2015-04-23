'use strict';
app.factory('Orders', function ($http) {

  var getAllOrders = function () {
    return $http.get('/api/checkout').then(function(res){
      return res.data; //should be an array of orders for admins only
    }, function(err){
      console.log(err);
    })
  };

  var getOrder = function(orderId){
    return $http.get('/api/checkout/' + orderId).then(function(res){
      return res.data; //should be an order object
    }, function(err){
      console.log(err);
    })
  }

  //var updateOrder = function(oldProduct, updatedProduct) {
  //  var toSendProduct = {};
  //  angular.forEach(oldProduct, function(info,key){
  //    if(info!==updatedProduct[key]) {
  //      toSendProduct[key]=updatedProduct[key]
  //    }
  //  });
  //  return $http.put('/api/products/' + product._id, toSendProduct).then(function(res) {
  //    return res.data;
  //  }, function(err) {
  //    console.log('error', err);
  //  });
  //}; later

    var userConfirmOrder = function(order) {
      return $http.post('/api/checkout', order).then(function(res) {
        return res.data; //returns the order
      }, function(err) {
        console.log('error', err);
      });
    };
    var guestConfirmOrder = function(order) {
      return $http.post('/api/checkout/guest', order).then(function(res) {
        return res.data; //returns the order
      }, function(err) {
        console.log('error', err);
      });
    };

  return {
    getAllOrders,
    getOrder,
    userConfirmOrder,
    guestConfirmOrder
  };

});