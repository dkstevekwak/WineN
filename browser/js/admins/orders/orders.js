'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('orders', {
        url: '/admins/orders',
        templateUrl: 'js/admins/orders/orders.html',
        controller: 'OrderManagementController'
    });
});

app.controller('OrderManagementController', function($scope, Orders, $state) {

    $scope.statuses = [
        'created',
        'processing',
        'canceled',
        'completed'
    ];

    $scope.selectStatus = function(status) {
        if ($scope.currentStatus === status) {
            $scope.currentStatus = null;
            return;
        }
        $scope.currentStatus = status;
    };

    Orders.getAllOrders()
      .then(function(orders) {
          orders = orders.map(function(order) {
              order.date = new Date(order.date);
              order.date = order.date.toDateString();
              return order;
          });
          $scope.orders = orders;
      }, function(err){
          throw new Error(err);
      });

    $scope.updateOrder = function(order) {
        Orders.updateOrder(order).then(function(updatedOrder){
            $scope.updateSuccess = true;
        }, function(err){
            throw new Error(err);
        });
    };

    $scope.setCurrentOrder = function(order) {
        if ($scope.currentOrder === order) {
            $scope.currentOrder = null;
            return;
        }
        $scope.currentOrder = order;
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
