'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('profile', {
        url: '/profile',
        templateUrl: 'js/profile/profile.html',
        controller: 'ProfileController'
    });
});


app.controller("ProfileController", function($scope, Users, Orders, Reviews, $state){

    $scope.updatedReview = null;

    $scope.currentTab = 'orders';

    $scope.updateProfile = function(user){
        Users.updateUser(user); //not sure if this sets unshown fields to null;
    };
	$scope.getCurrentUser = function(){
      Users.getCurrentUser().then(function(user){
          $scope.user = user;
      }).then(function() {
        return Reviews.getUserReviews($scope.user._id);
      }).then(function(reviews) {
            $scope.reviews = reviews;
      }).catch(function(err) {
          throw new Error(err);
      });
  };

    $scope.setCurrentTab = function(tabName) {
        $scope.currentTab = tabName;
    };

    $scope.viewOrder = function(orderId){
        Orders.getOrder(orderId).then(function(order){
            Orders.update.currentOrder = order;
            $state.go('order');
        }, function(err){
            throw new Error(err);
        });
    };

    $scope.updateReview = function(review) {
        Reviews.updateReview(review)
        .then(function() {
        }, function(err) {
            console.log(err);
        });
    };

    $scope.deleteReview = function(reviewId) {
        Reviews.deleteReview(reviewId)
        .then(function() {
            $scope.reviews = $scope.reviews.filter(review => review._id !== reviewId);
            //function(review) {
                //return review._id !== reviewId
            //}
        }, function(err) {
            throw new Error(err);
        });
    };

    $scope.getCurrentUser();

});
