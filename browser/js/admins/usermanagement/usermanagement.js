'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('usermanagement', {
        url: '/admins/usermanagement',
        templateUrl: 'js/admins/usermanagement/usermanagement.html'
    });
});