'use strict';
var chalk = require('chalk');

// Requires in ./db/index.js -- which returns a promise that represents
// mongoose establishing a connection to a MongoDB database.
var startDb = require('./db');

// Create a node server instance! cOoL!
var server = require('http').createServer();
//var recServer = require('http').createServer();

var createApplication = function () {
    var app = require('./app');
    //var recApp = require('./recApp');
    server.on('request', app); // Attach the Express application.
    //recServer.on('request', recApp);//
    require('./io')(server);   // Attach socket.io.
};

var startServer = function () {

    var PORT = process.env.PORT || 1337;
    var RECPORT = PORT + 1;
    server.listen(PORT, function () {
        console.log(chalk.blue('Server started on port', chalk.magenta(PORT)));
    });
    //recServer.listen(RECPORT, function(){
    //    console.log(chalk.blue('recServer started on port', chalk.magenta(RECPORT)));
    //})

};

startDb.then(createApplication).then(startServer).catch(function (err) {
    console.error('Initialization error:', chalk.red(err.message));
    console.error('Process terminating . . .');
    process.kill(1);
});