'use strict';
var router = require('express').Router();
var Product = require('mongoose').model('Product');
var Review = require('mongoose').model('Review');


router.use(function(req,res,next){
    if(req.body.product){
        Product.findById(req.body.product, function(err,product){
            req.product = product;
            next();
        })
    } else {
        next();
    }
})

router.get('/:productId', function(req, res, next) {
    var productId = req.params.productId;
    console.log(productId)
    Review.find({product: productId}, function(err, reviews) {
        if (err) return next(err);
        res.send(reviews);
    });
});


router.post('/', function(req,res,next){
    var body = req.body;
    var newReview = new Review(body);
    newReview.save(function(err,savedReview){
        if(err) return next(err);
        req.product.reviews.push(savedReview._id);
        req.product.save(function(err){
            res.send(savedReview);
        })
    });
});

module.exports = router;

