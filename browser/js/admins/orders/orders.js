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
          throw new Error(err);
      });

    $scope.updateOrder = function(order) {
        Orders.updateOrder(order).then(function(updatedOrder){
            console.log('order update success');
        }, function(err){
            throw new Error(err);
        });
    };

    $scope.viewOrder = function(orderId){
        Orders.getOrder(orderId).then(function(order){
            Orders.update.currentOrder = order;
            $state.go('order');
        }, function(err){
            throw new Error(err);
        });
    };

});
