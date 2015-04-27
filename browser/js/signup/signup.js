'use strict';
app.config(function($stateProvider) {
    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupController'
    });
});

app.controller('SignupController', function($scope, $state, Users) {

    $scope.user = {
        firstName: null,
        lastName: null,
        email: null,
        password: null
    };

    $scope.confirmPassword = null;

    $scope.createUser = function(user) {
        if (user.password !== $scope.confirmPassword) {
            $scope.error = 'Passwords Do Not Match';
            return;
        }
        Users.createUser(user)
        .then(function(user) {
            $state.go('products');
        })
        .catch(function(err) {
            throw new Error(err);
        });
    };

});
