'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/tutorial', require('./tutorial'));
router.use('/members', require('./members'));
router.use('/products', require('./products'));
router.use('/checkout', require('./checkout'));

// Make sure this is after all of
// the registered routes!

// router.use(function(err, req, res, next) {
// 	if (err) return res.sendStatus(500);
// });

router.use(function (req, res) {
    res.status(404).end();
});