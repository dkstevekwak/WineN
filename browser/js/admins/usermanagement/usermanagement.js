'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('usermanagement', {
        url: '/admins/usermanagement',
        templateUrl: 'js/admins/usermanagement/usermanagement.html',
        controller: 'UserManagementController'
    });
});

app.controller('UserManagementController', function($scope, Users){
   $scope.updatedUser = null;
    Users.getAllUsers().then(function(userList){
        $scope.users = userList;
    },function(err){
        console.log('error at getAllUsers', err);
    })
    $scope.updateUser = function(user) {
        Users.updateUser(user, $scope.updatedUser)
          .then(function(user) {
              $scope.updatedUser = user;
          }).catch(function(err){
              console.log(err);
          });
    };
});