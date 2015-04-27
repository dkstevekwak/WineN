'use strict';

var router = require('express').Router();
var User = require('mongoose').model('User');
var _ = require('lodash');
module.exports = router;

router.get('/', function(req, res, next) {
    User.find({}, function(err, users) {
        if (err) return next(err);
        res.send(users);
    });
});

router.put('/:userId', function(req, res, next) {
    User.findById(req.params.userId, function(err, user) {
        if (err) return next(err);
        _.extend(user, req.body);
        user.save(function(err, savedUser){
            res.send(savedUser); //double check if it returns a single object
        });

    });
});
router.put('/:userId/cart', function(req, res, next) {
    User.findById(req.params.userId, function(err, user) {
        if (err) return next(err);
        user.cart = req.body;
        user.save(function(err, savedUser){
            res.send(savedUser.cart); //double check if it returns a single object
        });

    });
});
router.get('/:userId', function(req, res, next) {
    User.findById(req.params.userId, function(err, user) {
        if (err) return next(err);
        res.send(user); //double check if it returns a single object
    });
});
