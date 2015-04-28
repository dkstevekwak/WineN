'use strict';
var _ = require('lodash');
var router = require('express').Router();
var Product = require('mongoose').model('Product');
var Review = require('mongoose').model('Review');
var User = require('mongoose').model('User');
var authFn = require('../authRules.js');

router.use(function(req,res,next){
    if(req.body.product){
        Product.findById(req.body.product, function(err,product){
            req.product = product;
            next();
        });
    } else {
        next();
    }
});

router.get('/:productId', function(req, res, next) {
    var productId = req.params.productId;
    Review.find({product: productId}, function(err, reviews) {
        if (err) return next(err);
        res.send(reviews);
    });
});


router.post('/', authFn.ensureLoggedIn, function(req,res,next){
    var body = req.body;
    var newReview = new Review(body);
    newReview.save(function(err,savedReview){
        if(err) return next(err);
        req.product.reviews.push(savedReview._id);
        req.product.save(function(err){
            res.send(savedReview);
        });
    });
});

router.get('/user/:userId', function(req, res, next) {
    Review.find({ user: req.params.userId })
    .populate('product')
    .exec(function(err, reviews) {
        if (err) return next(err);
        res.send(reviews);
    });
});

router.put('/', authFn.ensureLoggedIn, function(req, res, next) {
    Review.findById(req.body._id, function(err, review) {
        if (err) return next(err);
        req.body.product = review.product;
        _.extend(review, req.body);
        review.save(function(err, savedReview) {
            res.send(savedReview);
        });
    });
});

router.delete('/:reviewId', function(req, res, next) {
    Review.findByIdAndRemove(req.params.reviewId, function(err) {
        if (err) return next(err);
        res.sendStatus(200);
    });
});

module.exports = router;

