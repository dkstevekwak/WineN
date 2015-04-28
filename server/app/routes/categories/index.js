'use strict';
var router = require('express').Router();
var Category = require('mongoose').model('Category');
var Product = require('mongoose').model('Product');
var async = require('async');
var _ = require('lodash');
module.exports = router;

router.get('/', function(req, res, next) {
    Category.find({}, function(err, categories) {
        if (err) return next(err);
        res.send(categories);
    });
});

router.post('/', function(req, res, next) {
    console.log('in route', req.body)
    Category.create(req.body, function(err, category) {
        if (err) return next(err);
        res.send(category);
    });
});

router.put('/:categoryId', function(req, res, next) {
    Category.findByIdAndUpdate(req.params.categoryId, req.body, function(err, category) {
        if (err) return next(err);
        res.send(category);
    });
});

router.delete('/:categoryId', function(req, res, next) {
    Category.findByIdAndRemove(req.params.categoryId, function(err, removedCategory) {
        if (err) return next(err);
        Product.find({ categories: req.params.categoryId }, function(err, products) {
            if (err) return next(err);
            var saveArr = [];
            products.forEach(function(product) {
                var indexToRemove = product.categories.indexOf(removedCategory._id);
                product.categories.splice(indexToRemove, 1);
                saveArr.push(function() {
                    product.save();
                });
            });
            async.parallel(saveArr, res.send(removedCategory));
        });
    });
});
