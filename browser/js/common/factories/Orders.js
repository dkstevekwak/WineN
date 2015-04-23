'use strict';
app.factory('Orders', function ($http) {
  var update = {
    currentOrder:null,
    justOrdered: false
  };
  var getAllOrders = function () {
    return $http.get('/api/checkout').then(function(res){
      return res.data; //should be an array of orders for admins only
    }, function(err){
      console.log(err);
    })
  };

  var getOrder = function(orderId){
        update.justOrderd = false;
        return $http.get('/api/checkout/' + orderId).then(function(res){
          return res.data; //should be an order object
        }, function(err){
          console.log(err);
    })
  }

  var updateOrder = function(order) {

    return $http.put('/api/checkout/' + order._id, order).then(function(res) {
      return res.data;
    }, function(err) {
      console.log('error', err);
    });
  };

    var userConfirmOrder = function(order) {
      return $http.post('/api/checkout', order).then(function(res) {
        update.currentOrder = res.data;
        update.justOrderd = true;
        return res.data;
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
    update,
    getAllOrders,
    getOrder,
    userConfirmOrder,
    guestConfirmOrder,
    updateOrder
  };

});