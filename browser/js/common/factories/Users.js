'use strict';
app.factory('Users', function ($http) {

    var createUser = function(user) {
        return $http.post('/api/users', user).then(function(res) {
            console.log('res.data', res.data)
            return res.data;
        }, function(err) {
            return 'An Account Is Already Associated With That Email';
        });
    };

  var getAllUsers = function () {
    return $http.get('/api/users').then(function(res){
      return res.data; //should be an array of users
    }, function(err){
        throw new Error(err);
    });
  };

  var getUser = function(userId){
    return $http.get('/api/users/' + userId).then(function(res){
      return res.data; //should be a user object
    }, function(err){
        throw new Error(err);
    });
  };
  var getCurrentUser = function(){
    return $http.get('/session').then(function(res){
      return res.data.user;
    }, function(err){
        throw new Error(err);
    });
  };

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
        throw new Error(err);
    });
  };


  return {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    getCurrentUser
  };

});
