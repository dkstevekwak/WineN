'use strict';

var router = require('express').Router();
var Promo = require('mongoose').model('Promo');
var _ = require('lodash');
module.exports = router;

router.get('/', function(req, res, next) {
    Promo.find({}, function(err, promos) {
        if (err) return next(err);
        res.send(promos);
    });
});

router.get('/:promoCode', function(req, res, next) {
    Promo.findOne({code:req.params.promoCode}, function(err, promo) {
        if (err) return next(err);
        res.send(promo);
    });
});

router.post('/', function(req, res, next) {
    var promo = req.body;
    console.log('promo in post', promo)
    Promo.create(promo, function(err, savedPromo) {
        if (err) return next(err);
        console.log('savedPromo', savedPromo)
        res.send(savedPromo);
    });
});

router.put('/', function(req, res, next) {
    Promo.findById(req.body._id, function(err, promo) {
        if (err) return next(err);
        _.extend(promo, req.body);
        promo.save(function(err, savedPromo){
            res.send(savedPromo); //double check if it returns a single object
        });

    });
});

router.delete('/:promoId', function(req, res, next) {
    Promo.findByIdAndRemove(req.params.promoId, function(err, promo) {
        if (err) return next(err);
        res.send(promo); //double check if it returns a single object
    });
});

