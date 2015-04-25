// Categories Factory
'use strict';
app.factory('Categories', function($http) {

    return {
        getCategories: function() {
            return $http.get('/api/categories').then(function(res) {
                console.log('res', res);
                return res.data;
            }).catch(function(err) {
                console.log('err', err);
                console.log(err);
            });
        }
    };

});
