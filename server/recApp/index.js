'use strict';
var path = require('path');
var express = require('express');
var app = express();
var router = app.Router();
module.exports = router;

// Pass our express application pipeline into the configuration

//CORs
router.all("/api/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    return next();
});

// Routes that will be accessed via AJAX should be prepended with
// /api so they are isolated from our GET /* wildcard.
router.use('/api', require('./routes'));


/*
    This middleware will catch any URLs resembling a file extension
    for example: .js, .html, .css
    This allows for proper 404s instead of the wildcard '/*' catching
    URLs that bypass express.static because the given file does not exist.
*/
router.use(function (req, res, next) {

    if (path.extname(req.path).length > 0) {
        res.status(404).end();
    } else {
        next(null);
    }

});

//router.get('/*', function (req, res) {
//    res.sendFile(router.get('indexHTMLPath'));
//});

// Error catching endware.
router.use(function (err, req, res) {
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});
