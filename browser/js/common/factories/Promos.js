'use strict';
app.factory('Promos', function ($http) {
    return {
        postPromo: function(promo){
            return $http.post('/api/promos', promo).then(function(res){
                return res.data;
            }, function(err){
                throw new Error(err);
            });
        },
        getAllPromos: function() {
            return $http.get('/api/promos').then(function(res) {
                return res.data;
            }, function(err) {
                throw new Error(err);
            });
        },
        getPromo: function(promoId){
            return $http.get('/api/promos/' + promoId).then(function(res){
                return res.data;
            }, function(err){
                throw new Error(err);
            });
        },
        updatePromo: function(promo){
            return $http.put('/api/promos/', promo).then(function(res){
                return res.data;
            }, function(err){
                throw new Error(err);
            });
        },
        deletePromo: function(promoId){
            return $http.delete('/api/promos/' + promoId).then(function(res){
                return res.data;
            }, function(err){
                throw new Error(err);
            });
        }
    };
});
