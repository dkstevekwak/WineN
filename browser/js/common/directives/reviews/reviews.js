app.directive('reviews', function(){
    return {
        restrict: 'E',
        templateUrl: "js/common/directives/reviews/reviews.html",
        controller: 'ReviewsController'
    }
});

app.controller('ReviewsController', function($stateParams, $scope, Reviews) {
    $scope.reviews=['hehe','hello'];
    $scope.newReview = {
        text: null
    };
    //$scope.productId = $stateParams.productId;
    $scope.postReview = function(review){
        $scope.reviews.push(review);
        $scope.newReview.text = null;
        Reviews.postReview($scope.newReview).then(function(review){

        }, function(err){
            console.log(err);
        })
    };
    $scope.getReviews = function(productId){
        Reviews.getReviews(productId).then(function(reviews){
            $scope.reviews = reviews;
        }, function(err){
            console.log(err);
        })
    };
    $scope.updateReview = function(){
        Reviews.updateReview(review).then(function(review){
            $scope.review = review;
        }, function(err){
            console.log(err);
        })
    };

    $scope.deleteReview = function(){
        Reviews.deleteReview(review).then(function(review){
            $scope.reviews.filter(function(each){
                return each._id !== review._id;
            })
        }, function(err){
            console.log(err);
        });
    };


});