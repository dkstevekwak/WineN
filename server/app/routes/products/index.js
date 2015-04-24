'use strict';
var router = require('express').Router();
var Product = require('mongoose').model('Product');
var _ = require('lodash');
module.exports = router;

router.get('/', function(req, res, next) {
	Product.find({}).populate('reviews').exec(function(err, products) {
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

router.put('/:productId', function(req,res,next){
	var body = req.body;
	console.log("this is server not test", body)
	Product.findById(req.params.productId, function(err, product) {
		if (err) return next(err);
		body.reviews = body.reviews.map(function(eachReview){
			return eachReview._id;
		});
		_.extend(product, body);
		product.save(function(err, savedProduct){
			res.send(savedProduct);
		});
	});
});


router.post('/add', function(req,res,next){
	var body = req.body;
	var newProduct = new Product(body);
	newProduct.save(function(err,savedProduct){
		if(err) return next(err);
		res.send(savedProduct);
	});
});


