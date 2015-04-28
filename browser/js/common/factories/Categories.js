// Categories Factory
'use strict';
app.factory('Categories', function($http) {

    return {
        getCategories: function() {
            return $http.get('/api/categories').then(function(res) {
                return res.data;
            });
        },

        updateCategory: function(category) {
            return $http.put('/api/categories/' + category._id, category).then(function(res) {
                return res.data;
            });
        },

        deleteCategory: function(categoryId) {
            return $http.delete('/api/categories/' + categoryId).then(function(res) {
                return res.data;
            });
        },

        createCategory: function(category) {
            console.log('in factory', category)
            return $http.post('/api/categories', category).then(function(res) {
                return res.data;
            });
        }

    };

});
