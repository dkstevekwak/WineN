'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('orders', {
        url: '/admins/orders',
        templateUrl: 'js/admins/orders/orders.html',
        controller: 'OrderManagementController'
    });
});

app.controller('OrderManagementController', function($scope, Orders, $state) {

    Orders.getAllOrders()
      .then(function(orders) {
          $scope.orders = orders;
      }, function(err){
          console.log('get all orders failed', err)
      });

    $scope.updateOrder = function(order) {
        Orders.updateOrder(order).then(function(updatedOrder){
            console.log('order update success');
        }, function(err){
            console.log('order update failed', err)
        })
    };

    $scope.viewOrder = function(orderId){
        Orders.getOrder(orderId).then(function(order){
            Orders.update.currentOrder = order;
            $state.go('order');
        }, function(err){
            console.log('failed to get order', err)
        });
    }

});