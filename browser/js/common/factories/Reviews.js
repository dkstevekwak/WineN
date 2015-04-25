app.factory('Reviews', function ($http) {
    return {
        postReview: function(review){
            return $http.post('/api/reviews', review).then(function(res){
                return res.data;
            }, function(err){
                console.log(err);
            });
        },
        getReviews: function(productId){
            return $http.get('/api/reviews/'+ productId).then(function(res){
                console.log(res.data)
                return res.data;
            }, function(err){
                console.log(err);
            });
        },
        getUserReviews: function(userId) {
            return $http.get('/api/reviews/user/' + userId).then(function(res) {
                console.log(res.data)
                return res.data;
            }, function(err) {
                console.log(err);
            });
        },
        updateReview: function(review){
            return $http.put('/api/reviews/', review).then(function(res){
                return res.data;
            }, function(err){
                console.log(err);
            });
        },
        deleteReview: function(reviewId){
            return $http.delete('/api/reviews/'+reviewId).then(function(res){
                return res.data;
            }, function(err){
                console.log(err);
            });
        }
    }
});
