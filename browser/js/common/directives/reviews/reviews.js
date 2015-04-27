app.directive('reviews', function(){
    return {
        restrict: 'E',
        templateUrl: "js/common/directives/reviews/reviews.html",
        controller: 'ReviewsController'
    };
});

app.controller('ReviewsController', function($stateParams, $scope, Reviews, Users) {
    $scope.newReview = {
        title: null,
        text: null,
        rating: null,
        user: null,
        product: null
    };
    var productId = $stateParams.productId;

    Reviews.getReviews(productId).then(function(reviews){
        $scope.reviews = reviews;
    }, function(err){
        throw new Error(err);
    });

    $scope.postReview = function(newReview){
        newReview.product = productId;
        Users.getCurrentUser().then(function(user){
            newReview.user = user._id;
        }).then(function(){
            return Reviews.postReview(newReview);
        }).then(function(review){
            $scope.reviews.push(review);
        }).catch(function(err){
            console.log(err);
        });


    };
    //$scope.updateReview = function(){
    //    Reviews.updateReview(review).then(function(review){
    //        $scope.review = review;
    //    }, function(err){
    //        console.log(err);
    //    })
    //};
    //
    //$scope.deleteReview = function(){
    //    Reviews.deleteReview(review).then(function(review){
    //        $scope.reviews.filter(function(each){
    //            return each._id !== review._id;
    //        })
    //    }, function(err){
    //        console.log(err);
    //    });
    //};


});
