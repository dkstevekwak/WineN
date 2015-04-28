'use strict';
app.factory('Promos', function ($http) {
    return {
        postPromo: function(promo){
            if (promo.category) promo.category = JSON.parse(promo.category)._id;
            return $http.post('/api/promos', promo).then(function(res){
                return res.data;
            }, function(err){
                throw new Error(err);
            });
        },
        getAllPromos: function() {
            return $http.get('/api/promos').then(function(res) {
                var toReturn = res.data.map(function(each){
                    each.expirationDate = new Date(each.expirationDate);
                    return each;
                });

                return toReturn;
            }, function(err) {
                throw new Error(err);
            });
        },
        getPromo: function(promoCode){
            return $http.get('/api/promos/' + promoCode).then(function(res){
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
