'use strict';
app.factory('Recommendations', function ($http,localStorageService, Users, AuthService) {
	var getAllRecs = function(){
	    return $http.get('http://192.168.1.216:1338/api/').then(function(res){
	    	console.log("getAllRecs res.data",res.data);
	    	return res.data;
	    }, function(err){
	        throw new Error(err);
	    });
	  };
	var getProductRec = function(pid){
		var pidRequestStr = 'https://winen.herokuapp.com:444/api/'+pid;
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
		getProduc
	};
});
