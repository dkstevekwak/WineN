'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('categories', {
        url: '/admins/categories',
        templateUrl: 'js/admins/categories/categories.html',
        controller: 'CategoriesAdminsController'
    });
});

app.controller('CategoriesAdminsController', function($scope, Categories, Products){

    $scope.newCategory = {
        name: null
    };

    Categories.getCategories().then(function(categoryList){
        $scope.categories = categoryList;
    });

    $scope.updateCategory = function(category) {
        Categories.updateCategory(category)
        .then(function(category) {
            $scope.updateSuccess = true;
        });
    };

    $scope.setCurrentCategory = function(category) {
        if ($scope.currentCategory === category) {
            $scope.currentCategory = null;
            return;
        }
        $scope.currentCategory = category;
    };

    $scope.deleteCategory = function(categoryId) {
        Categories.deleteCategory(categoryId)
        .then(function(category) {
            $scope.categories = $scope.categories.filter(function(category) {
                return category._id !== categoryId;
            });
            $scope.currentCategory = null;
        });
    };

    $scope.createCategory = function(category) {
        console.log('in controller', category)
        Categories.createCategory(category)
        .then(function(category) {
            $scope.categories.push(category);
            $scope.newCategory.name = null;
        });
    };

});

