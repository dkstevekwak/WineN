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

router.post('/add', function(req,res,next){
	var body = req.body;
	console.log("this is body", body);
	var newProduct = new Product(body);
	newProduct.save(function(err,savedProduct){
		if(err) return next(err);
		console.log(savedProduct)
		res.send(savedProduct);
	})
})


router.put('/:productId', function(req,res,next){
	var body = req.body;

	Product.findById(req.params.productId, function(err, product) {
		if (err) return next(err);
		console.log('this is the body', body)
		console.log('this is the product', product)
		product = body;
		product.save(function(err, savedProduct){
			res.json(savedProduct);
		})
	});
})

