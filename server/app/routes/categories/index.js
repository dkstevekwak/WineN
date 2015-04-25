'use strict';
var router = require('express').Router();
var Category = require('mongoose').model('Category');
var _ = require('lodash');
module.exports = router;

router.get('/', function(req, res, next) {
    Category.find({}, function(err, categories) {
        if (err) return next(err);
        console.log('categories', categories);
        res.send(categories);
    });
});
