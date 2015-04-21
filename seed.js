/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

Refer to the q documentation for why and how q.invoke is used.

*/

var mongoose = require('mongoose');
var connectToDb = require('./server/db');
var User = mongoose.model('User');
var Product = mongoose.model('Product');
var Category = mongoose.model('Category');
var q = require('q');
var chalk = require('chalk');

var getCurrentUserData = function () {
    return q.ninvoke(User, 'find', {});
};
var seedUsers = function () {
    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password',
            role: 'admin',
            username: 'fullstack',
            address: {
                line1: '5 Hanover Square',
                line2: '25th Floor',
                city: 'New York City',
                state: 'New York',
                zip: '10006'
            }
        },
        {
            email: 'obama@gmail.com',
            password: 'potus',
            role: 'user',
            username: 'pres',
            address: {
                line1: '1 White House',
                line2: 'Oval Office',
                city: 'Capital',
                state: 'Washington D.C.',
                zip: '11111'
            }
        }
    ];
    return q.invoke(User, 'create', users);

};
var seedCategories = function () {
    var categories = [
        {name: 'Red'},
        {name: 'White'},
        {name: 'Sparkling'},
        {name: 'Cider'}
    ];
    return q.invoke(Category, 'create', categories);

};
var seedProducts = function () {
    return User.findOne({email:'obama@gmail.com'}).exec().then(function(user){
        var products = [
            {
                name: 'A red wine',
                image: 'http://placehold.it/500x500',
                description: 'This is a very fancy red wine',
                price: '59.99',
                qty: 37,
                createdBy: user._id,
                categories: ['Red']
            },
            {
                name: 'A green wine',
                image: 'http://placehold.it/500x500',
                description: 'This is a very fancy green wine',
                price: '39.99',
                qty: 27,
                createdBy: user._id,
                categories: ['White']
            }
        ];

        return q.invoke(Product, 'create', products);

    })


};

connectToDb.then(function () {
    //mongoose.connection.db.dropDatabase(function() {
        getCurrentUserData().then(function (users) {
            if (users.length === 0) {
                return seedUsers();
            } else {
                console.log(chalk.magenta('Seems to already be user data, exiting!'));
                //process.kill(0);
            }
        }).then(function () {
            
            return seedCategories();
        }).then(function () {
            
            return seedProducts();
        }).then(function () {
            
            process.kill(0);
        }).catch(function (err) {
            console.error(err);
            process.kill(1);
        });
    //});
});