'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('order', {
        url: '/order',
        templateUrl: 'js/order/order.html',
        controller: 'OrderController'
    });
});

app.controller('OrderController', function($scope, Orders, Cart) {
    $scope.order = Orders.update.currentOrder;
    $scope.orderProcessed = Orders.update.justOrdered;
    $scope.getThisOrder = function () {
        Orders.getOrder(Orders.currentOrder._id).then(function (order) {
            order.date = new Date(order.date);
            order.date = order.date.toDateString();
            $scope.order = order;
        });
    };



});
