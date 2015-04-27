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
        throw new Error(err);
    });
    $scope.updateUser = function(user) {
        if ($scope.newPassword) user.password = $scope.newPassword;
        Users.updateUser(user, $scope.updatedUser)
          .then(function(user) {
              $scope.updatedUser = user;
          }).catch(function(err){
              throw new Error(err);
          });
    };

    $scope.setCurrentUser = function(user) {
        if ($scope.currentUser === user) {
            $scope.currentUser = null;
            return;
        }
        $scope.currentUser = user;
    };

	$scope.search = function (user){
		//query box is empty
		if(!$scope.query) return true;
		//query box has a string
        var lowercaseQuery = $scope.query.toLowerCase();
        var lowercaseName = user.firstName.toLowerCase() + user.lastName.toLowerCase();
        var lowercaseEmail = user.email.toLowerCase();

		if (lowercaseName.indexOf(lowercaseQuery) > -1
				|| lowercaseEmail.indexOf(lowercaseQuery) > -1) {
		        return true;
		    }
		return false;
	};

});
