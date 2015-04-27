'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('promos', {
        url: '/admins/promos',
        templateUrl: 'js/admins/promos/promos.html',
        controller: 'PromosAdminsController'
    });
});

app.controller('PromosAdminsController', function($scope, Promos, Categories, Products){

    Promos.getAllPromos().then(function(promoList){
        $scope.promos = promoList;
    },function(err){
        throw new Error(err);
    });

    Products.getAllProducts().then(function(productList){
        $scope.products = productList;
    },function(err){
        throw new Error(err);
    });

    Categories.getCategories().then(function(categoryList){
        $scope.categories = categoryList;
    },function(err){
        throw new Error(err);
    });

    $scope.createPromo = function(promo) {
        Promos.postPromo(promo)
        .then(function(promo) {
            $scope.promos.push(promo);
        }, function(err) {
            throw new Error(err);
        });
    };

    $scope.updatePromo = function(promo) {
        Promos.updatePromo(promo)
        .then(function(user) {
        }).catch(function(err){
          throw new Error(err);
        });
    };

    $scope.deletePromo = function(promoId) {
        Promos.deletePromo(promoId)
        .then(function(promo) {
            $scope.promos = $scope.promos.filter(eachPromo => promoId !== eachPromo._id);
        }, function(err) {
            throw new Error(err);
        });
    };

    $scope.setCurrentPromo = function(promo) {
        if ($scope.currentPromo === promo) {
            $scope.currentPromo = null;
            return;
        }
        $scope.currentPromo = promo;
    };

	$scope.search = function (promo){
		//query box is empty
		if(!$scope.query) return true;
		//query box has a string
        var lowercaseQuery = $scope.query.toLowerCase();
        var lowercaseName = promo.name.toLowerCase();

		if (lowercaseName.indexOf(lowercaseQuery) > -1) {
            return true;
        }
		return false;
	};

});

