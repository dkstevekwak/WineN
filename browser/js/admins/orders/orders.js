'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('orders', {
        url: '/admins/orders',
        templateUrl: 'js/admins/orders/orders.html'
    });
});