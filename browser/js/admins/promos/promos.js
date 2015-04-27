'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('promos', {
        url: '/admins/promos',
        templateUrl: 'js/admins/promos/promos.html',
        controller: 'PromosAdminsController'
    });
});

app.controller('PromosAdminsController', function($scope, Promos, Categories, Products){

    function Promo (){
        this.code = null;
        this.expirationDate = null;
        this.products = [];
        this.category = null;
    };

    $scope.newPromo = new Promo();

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

    $scope.setProduct = function(product){
        var index = $scope.newPromo.products.indexOf(product._id);
        if(index === -1){
            $scope.newPromo.products.push(product._id)
        }
        else $scope.newPromo.products.splice(index,1);
    };
    $scope.createPromo = function(promo) {
        console.log("this is category when creating", promo.category);
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
        console.log("this is category when setting", promo.category);
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

