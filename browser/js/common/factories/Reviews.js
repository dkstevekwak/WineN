app.factory('Reviews', function ($http) {
    return {
        postReview: function(review){
            return $http.post('/api/reviews', review).then(function(res){
                return res.data;
            }, function(err){
                console.log(err);
            })
        },
        getReviews: function(productId){
            return $http.get('/api/reviews/:'+productId).then(function(res){
                return res.data;
            }, function(err){
                console.log(err);
            })
        },
        updateReview: function(reviewId){
            return $http.put('/api/reviews/:'+reviewId).then(function(res)){
                return res.data;
            }, function(err){
                console.log(err);
            })
        },
        deleteReview: function(reviewId){
            return $http.delete('/api/reviews/:'+reviewId).then(function(res){
                return res.data;
            }, function(err){
                console.log(err);
            })
        }
    }
});