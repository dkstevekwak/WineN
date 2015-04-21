'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('homeadmins', {
        url: '/admins/home',
        templateUrl: 'js/admins/home/home.html'
    });
});