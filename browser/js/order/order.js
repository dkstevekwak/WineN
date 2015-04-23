'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('order', {
        url: '/order',
        templateUrl: 'js/order/order.html',
        controller: 'OrderController'
    });
});

app.controller('OrderController', function($scope, Orders, Cart){
    $scope.order = null;
    $scope.orderProcessed = Orders.justOrdered;

    Orders.getOrder(Orders.currentOrder._id)
            .then(function(order){
                $scope.order=order;
            })


})