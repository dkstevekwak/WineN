'use strict';
var router = require('express').Router();
var Product = require('mongoose').model('Product');
var _ = require('lodash');
module.exports = router;

router.get('/', function(req, res, next) {
	Product.find({}).populate('reviews categories').exec(function(err, products) {
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
	var updatedProduct = req.body;
	Product.findById(req.params.productId, function(err, product) {
		if (err) return next(err);
		updatedProduct.reviews = updatedProduct.reviews.map(function(eachReview){
			return eachReview._id;
		});
		_.extend(product, updatedProduct);
		product.save(function(err, savedProduct){
			res.send(savedProduct);
		});
	});
});

router.delete('/:productId', function(req, res, next) {
    Product.findByIdAndRemove(req.params.productId, function(err, product) {
        if (err) return next(err);
        res.send(product);
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


