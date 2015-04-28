'use strict';

var router = require('express').Router();
var User = require('mongoose').model('User');
var authFn = require('../authRules.js');
var _ = require('lodash');
module.exports = router;

router.get('/:userId', authFn.ensureLoggedIn, function(req, res, next) {
  User.findById(req.params.userId, function (err, user) {
    if (err) return next(err);
    res.send(user);
  });
});
router.post('/', function(req, res, next) {
    var user = req.body;
    //console.log('user in post', user);
    User.create(user, function(err, savedUser) {
        if (err) return next(err);
        //console.log('savedUser', savedUser);
        res.send(savedUser);
    });
});

  router.put('/:userId', authFn.ensureLoggedIn, function(req, res, next) {
    User.findById(req.params.userId, function(err, user) {
      if (err) return next(err);
      if (req.user.role === 'admin' || req.user._id == user._id) { //ensures user is admin or editing himself;
        _.extend(user, req.body);
        user.save(function(err, savedUser){
          res.send(savedUser);
        })
      }
    });
  });
router.put('/:userId/cart', authFn.ensureLoggedIn, function(req, res, next) {
    User.findById(req.params.userId, function(err, user) {
        if (err) return next(err);
        user.cart = req.body;
        user.save(function(err, savedUser){
            res.send(savedUser.cart); //double check if it returns a single object
        });

    });
});



router.get('/', authFn.ensureAdmin, function(req, res, next) {
  User.find({}, function(err, users) {
    if (err) return next(err);
    res.send(users);
  });
});