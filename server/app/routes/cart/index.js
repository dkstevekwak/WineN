'use strict';
var router = require('express').Router();
var Cart = require('mongoose').model('Cart');
var _ = require("lodash");
module.exports = router;

router.post('/', function (req, res,next) {
    //Read the incoming body data
    var body = req.body;
    //Load (or initialize) the cart session id
    body.session = req.session._id;
    console.log("body:",body);

	var newCart = new Cart(body);
	newCart.save(function(err,saved){
		if(err) return next(err);
		res.send(saved);
	});
});
}).get('/:cartId', function(req, res, next) {
	Cart.findById(req.params.cartId, function(err, cart) {
		if (err) return next(err);
		res.send(cart);
	});
}).put('/:cartId', function(req, res, next) {
	Cart.findById(req.params.cartId, function(err, cart) {
		if (err) return next(err);
		res.send(cart);
	});
});