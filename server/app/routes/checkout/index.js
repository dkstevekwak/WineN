'use strict';
var router = require('express').Router();
var Order = require('mongoose').model('Order');
var _ = require("lodash");
module.exports = router;

/* Alex and DJ, starting to work on server/routes/checkout/index.js checkoutRoutes-#51*/
//FIX only for Admin -- move to Admin routes


//filter by object criteria like by status or date

//front end thank you page with confirmation of order

//guest order
router.get('/:orderId', function(req, res, next) {
	//authenticate that order has the right user AT A LATER TI
	Order.findById(req.params.orderId, function(err, order) {
		if (err) return next(err);
		res.send(order);
	});
});

//guest checkout
router.post('/guest', function(req,res,next){
	var body = req.body;
	var order = new Order(body);
	order.save(function(err,saved){
		if(err) return next(err);
		res.send(saved);
	});
});

//authenticated 

//checkout
router.post('/', function(req,res,next){
	//authenticate to get userId AT A LATER TI
	var body = req.body;
	//var order = {
	//	cart: $scope.products,
	//	user: $scope.user,
	//	details: $scope.checkoutDetails
	//}
	console.log('posting order', req.body);
	var order = new Order();
	order.cartProducts = body.cart;
	order.user = body.user._id;
	//need order.promoCode logic
	order.shipping = body.details.shipping;
	order.tax = body.details.tax;
	order.subTotal = body.details.subTotal;
	order.firstName = body.user.firstName;
	order.lastName = body.user.lastName;
	order.shippingAddress = body.user.shippingAddress;
	order.paid = true;
	order.status = 'Created'; //have to define business workflow of status
	order.date = Date.now();
	  //needs to decrease quantity
	  //needs to check if quantity is OK && @ checkout
	order.save(function(err,saved){
		if(err) return next(err);
		res.send(saved);
	});
});

//get all orders
router.get('/', function(req, res, next) {
	Order.find({}, function(err, orders) {
		if (err) return next(err);
		res.send(orders);
	});
});

//put to change the status of an order
router.put('/:orderId', function(req,res,next){
	var body = req.body;
	Order.findById(req.params.orderId, function(err, order) {
		if (err) return next(err);
//		for (var key in body){
//			order[key] = body[key];
//		}
		_.extend(order,body);
		console.log("_.extended order",order);
		order.save(function(err, saved){
			res.send(saved);
		});
	});
});