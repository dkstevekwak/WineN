'use strict';
app.directive('navbaradmins', function ($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/admins/directives/navbar/navbar.html',
        link: function (scope) {
                // auth:true;
            scope.items = [
                { label: 'Home', state: 'homeadmins' },
                { label: 'Orders', state: 'orders' },
                { label: 'User Management', state: 'usermanagement'}
            ];

            scope.user = null;

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.logout = function () {
                AuthService.logout().then(function () {
                   $state.go('home');
                });
            };

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                });
            };
            scope.isAdmin = function(){
              AuthService.getLoggedInUser().then(function (user) {
                return (scope.user && scope.user.role === 'admin');
              });
            }
            var removeUser = function () {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});