'use strict';
app.factory('Recommendations', function ($http,localStorageService, Users, AuthService) {
	var getAllRecs = function(){
	    return $http.get('/recommendations/').then(function(res){
	    	console.log("getAllRecs res.data",res.data);
	    	return res.data;
	    }, function(err){
	        throw new Error(err);
	    });
	  };
	var getProductRec = function(pid){
		var pidRequestStr = '/recommendations/'+pid;
	    return $http.get(pidRequestStr.toString()).then(function(res){
	    	var arr = [];
	    	return res.data;
	    }, function(err){
	        throw new Error(err);
	    });
	  };
	return {
		getAllRecs,
		getProductRec
	};
});
