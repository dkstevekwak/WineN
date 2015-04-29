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
	    	for (var key in res.data){
	    		arr.push({ "productId": key, "qty": res.data[key] });
	    	}
	    	arr = arr.sort(function(a,b){
	    		return b.qty - a.qty;
	    	});
	    	arr = arr.slice(0,3);
	    	console.log("getProductRec arr",arr);
	    	return arr; //res.data;
	    }, function(err){
	        throw new Error(err);
	    });
	  };
	return {
		getAllRecs,
		getProductRec
	};
});
