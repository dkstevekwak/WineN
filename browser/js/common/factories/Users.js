'use strict';
app.factory('Users', function ($http) {

  var getAllUsers = function () {
    return $http.get('/api/users').then(function(res){
      return res.data; //should be an array of users
    }, function(err){
      console.log(err);
    })
  };

  var getUser = function(userId){
    return $http.get('/api/users/' + userId).then(function(res){
      return res.data; //should be a user object
    }, function(err){
      console.log(err);
    })
  }

  var updateUser = function(user) {
    //var toSendUser = {};
    //angular.forEach(user, function(info,key){
    //  if(info!==user[key]) {
    //    toSendUser[key]=user[key]
    //  }
    //}); not sure on the logic of the above, commented out works
    return $http.put('/api/users/' + user._id, user).then(function(res) {
      return res.data;
    }, function(err) {
      console.log('error', err);
    });
  };
  //TODO need to ensure changing password makes it salted

  return {
    getAllUsers,
    getUser,
    updateUser
  };

});
