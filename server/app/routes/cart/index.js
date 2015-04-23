'use strict';
var router = require('express').Router();
var Cart = require('mongoose').model('Cart');
var Product = require('mongoose').model('Product');
var _ = require("lodash");
module.exports = router;

router.get('/', function (req, res,next) {
//	console.log("req.session.cart ",req.session.cart );
	console.log("req",req);
	var cart = req.session.cart || { products: [] };
	req.session.cart = cart;
	req.session.cart.products.push(req.query.productId);
	console.log("req.session",req.session);
	if (err) return next(err);
	res.sendStatus(200);
//	next();	
//	//find product in database 
//	Product.findById(req.param.productId,function(err,product){
//		req.session.cart = cart..push(product._id);
//	});

	
//    //Read the incoming body data
//    var body = req.body;
//    //Load (or initialize) the cart session id
//    body.session = req.session._id;
//    console.log("body:",body);
//
//	var newCart = new Cart(body);
//	newCart.save(function(err,saved){
//		if(err) return next(err);
//		res.send(saved);
//	});
});