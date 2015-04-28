'use strict';
app.directive('navbar', function ($rootScope, ModalService, AuthService, AUTH_EVENTS, $state, Cart) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

            scope.items = [
                //{ label: 'Home', state: 'home' },
                { label: 'AboutUs', state: 'about' },
                { label: 'Our Wines', state: 'products'},
                { label: 'Profile', state: 'profile'}
                // { label: 'Checkout', state: 'checkout'},

            ];
            //
            //scope.openCart = function() {
            //    ModalService.showModal({
            //        templateUrl: 'js/cart/cart.html',
            //        controller: "CartController"
            //    }).then(function(modal) {
            //        modal.element.modal();
            //        modal.close.then(function(result) {
            //            $scope.message = "You said " + result;
            //        });
            //    });
            //};

            scope.adminItems = [
                { label: 'Products', state: 'productsadmins' },
                { label: 'Categories', state: 'categories' },
                { label: 'Users', state: 'usermanagement' },
                { label: 'Promos', state: 'promos' },
                { label: 'Orders', state: 'orders' }
            ];

            scope.user = null;

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.logout = function () {
                AuthService.logout().then(function () {
                   Cart.emptyCart();
                   $state.go('home');
                });
            };

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                });
            };

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


