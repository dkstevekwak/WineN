'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl'
    });
});

app.controller('HomeCtrl', function ($scope, AuthService, $state, Cart) {
  Cart.cloudCartSync(); //when user arrives on login or home, it performs logged in user and cloud cart sync stuff;
});