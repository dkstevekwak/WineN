'use strict';
var router = require('express').Router();
var Order = require('mongoose').model('Order');
var User = require('mongoose').model('User');
var Product = require('mongoose').model('Product');
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
	_.assign(order, body);
	order.save(function(err,savedOrder){
		if(err) return next(err);
        body.cart.forEach(function(boughtProduct){
          Product.findById(boughtProduct._id, function(err, product){
            if(err) return next(err);
            product.qty -= Number(boughtProduct.orderQty);
            product.save();
          });

        });
        res.send(savedOrder);
	});
});

//authenticated

//checkout
router.post('/', function(req,res,next){
	//authenticate to get userId AT A LATER TI
	var body = req.body;
	var order = new Order();
	_.assign(order, body);
	//TODO have to define business workflow of status
	  //needs to decrease quantity
	  //needs to check if quantity is OK && @ checkout
	order.save(function(err,savedOrder){
		User.findById(order.user._id, function(err, user){
			user.orders.push(savedOrder._id);
			user.cart = [];
			user.save(function(err, savedUser){
				if(err) return next(err);
        var saveArr = [];


        body.cart.forEach(function(boughtProduct){
          Product.findById(boughtProduct._id, function(err, product){
            if(err) {
              return next(err);
            }
            product.qty -= Number(boughtProduct.orderQty);
            product.save();
          });

        });
        res.send(savedOrder);
			});

		});
		if(err) return next(err);
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
		_.extend(order, body);
		order.save(function(err, saved){
			res.send(saved);
		});
	});
});
