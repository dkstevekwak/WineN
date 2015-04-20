'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('homeadmins', {
        url: '/admins',
        templateUrl: 'js/admins/home/home.html'
    });
});