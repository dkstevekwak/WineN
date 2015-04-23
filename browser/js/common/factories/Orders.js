'use strict';
app.factory('Orders', function ($http) {
  var currentOrder = null;
  var justOrdered = false;
  var getAllOrders = function () {
    return $http.get('/api/checkout').then(function(res){
      return res.data; //should be an array of orders for admins only
    }, function(err){
      console.log(err);
    })
  };

  var getOrder = function(orderId){
        justOrdered=false;
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
        currentOrder = res.data;
        justOrdered= true;
        console.log("his is res from server", res.data)
        return res.data;
      }, function(err) {
        console.log('error', err);
      });
    };
    var guestConfirmOrder = function(order) {
      return $http.post('/api/checkout/guest', order).then(function(res) {
        console.log()
        return res.data; //returns the order
      }, function(err) {
        console.log('error', err);
      });
    };

  return {
    justOrdered,
    currentOrder,
    getAllOrders,
    getOrder,
    userConfirmOrder,
    guestConfirmOrder,
    updateOrder
  };

});