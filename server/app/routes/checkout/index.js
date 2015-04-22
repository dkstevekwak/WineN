'use strict';
var router = require('express').Router();
var Order = require('mongoose').model('Order');
module.exports = router;

/* Alex and DJ, starting to work on server/routes/checkout/index.js checkoutRoutes-#51
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

router.put('/:productId', function(req,res,next){
	var body = req.body;
	console.log("this is server not test", body)
	Product.findById(req.params.productId, function(err, product) {
		if (err) return next(err);
		for (var key in body){
			product[key] = body[key];
		}
		// product.name = body.name;
		// product.image = body.image;
		// product.description = body.description;
		// product.price = body.price;
		// product.qty = body.qty;
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
});*/