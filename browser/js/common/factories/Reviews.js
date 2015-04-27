app.factory('Reviews', function ($http) {
    return {
        postReview: function(review){
            return $http.post('/api/reviews', review).then(function(res){
                return res.data;
            }, function(err){
                throw new Error(err);
            });
        },
        getReviews: function(productId){
            return $http.get('/api/reviews/'+ productId).then(function(res){
                return res.data;
            }, function(err){
                throw new Error(err);
            });
        },
        getUserReviews: function(userId) {
            return $http.get('/api/reviews/user/' + userId).then(function(res) {
                return res.data;
            }, function(err) {
                throw new Error(err);
            });
        },
        updateReview: function(review){
            return $http.put('/api/reviews/', review).then(function(res){
                return res.data;
            }, function(err){
                throw new Error(err);
            });
        },
        deleteReview: function(reviewId){
            return $http.delete('/api/reviews/'+reviewId).then(function(res){
                return res.data;
            }, function(err){
                throw new Error(err);
            });
        }
    };
});
