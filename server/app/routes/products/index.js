'use strict';
var router = require('express').Router();
var Product = require('mongoose').model('Product');
module.exports = router;

router.get('/', function(req, res, next) {
	Product.find({}, function(err, products) {
		if (err) return next(err);
		res.send(products);
	});
});

router.get('/:productId', function(req, res, next) {
	Product.findById(req.params.productId, function(err, product) {
		if (err) return next(err);
		res.send(product);
	});
});
