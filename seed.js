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
                name: 'Canada Negra',
                image: '/img/Andlau Riesling.gif',
                description: {
                  review: 'This is a very fancy red wine',
                  winery: 'Bodegas Enguera',
                  origin: 'Spain, Valencia',
                  'do': 'Valencia',
                  grapes: 'Tempranillo, Syrah',
                  taste: ['light'],
                  serves: '14 - 16',
                  vintage: null,
                  aoc: ''
                },
                price: '59.99',
                qty: 37,
                createdBy: user._id,
                categories: ['Red Wine']
            },
            {
              name: 'Cote Chalonnaise',
              image: '/img/ansata.gif',
              description: {
                review: 'This is a very fancy red wine',
                winery: 'Guy Chaumont',
                origin: 'France, Bourgogne Cote Chalonnaise',
                'do': '',
                grapes: 'Pinot Noir',
                taste: ['light'],
                serves: '',
                vintage: 2010,
                aoc: 'Bourgogne Cote Chalonnaise'
              },
              price: '59.99',
              qty: 37,
              createdBy: user._id,
              categories: ['Red Wine']
            },
            {
              name: 'Beaune Chauacheux Premier Cru',
              image: '/img/beaune chouacheux.gif',
              description: {
                review: 'This is a very fancy red wine',
                winery: 'Fanny Sabre',
                origin: 'France, Bourgogne',
                'do': '',
                grapes: 'Pinot Noir',
                taste: ['full'],
                serves: '',
                vintage: null,
                winery: 'Fanny Sabre',
                aoc: 'Beaune ler Cru'
              },
              price: '59.99',
              qty: 37,
              createdBy: user._id,
              categories: ['Red Wine']
              }, {
              name: 'Pommard \<Les Vignots\>',
              image: '/img/bourgogne rouge.gif',
              description: {
                review: 'This is a very fancy red wine',
                winery: 'Chantal Lescure',
                origin: 'France, Bourgogne',
                'do': '',
                grapes: 'Pinot Noir',
                taste: ['medium', 'full'],
                vintage: null,
                aoc: ''
              },
              price: '59.99',
              qty: 37,
              createdBy: user._id,
              categories: ['Red Wine']
            },{
            name: 'Cremant Brut Zero',
            image: '/img/cote chalonnaise.gif',
            description: {
              review: 'This is a wine with many bubbles',
              winery: 'Guy Chaumont',
              origin: 'France, Bourgogne',
              'do': '',
              grapes: 'Chardonnay 70%, Aligote 30%',
              taste: ['bubbly'],
              serves: '',
              vintage: null,
              aoc: ''
            },
            price: '59.99',
            qty: 37,
            createdBy: user._id,
            categories: ['Sparkling']
          }, {
              name: 'Sidre Tendre',
              image: '/img/Drappier grande sendree rose.gif',
              description: {
                review: 'This is another cidre',
                winery: 'Eric Bordelet',
                origin: 'Normandie, France',
                'do': '',
                grapes: 'some grapish korean immigrant to france',
                taste: [''],
                serves: '',
                vintage: null,
                aoc: ''
              },
              price: '59.99',
              qty: 37,
              createdBy: user._id,
              categories: ['Cider']
            }, {
            name: 'Poire authentique',
            image: '/img/Drappier Grande sendree.gif',
            description: {
              review: 'This is a cidre',
              winery: 'Eric Bordelet',
              origin: 'Normandie, France',
              'do': '',
              grapes: 'another grapish korean immigrant to france',
              taste: [''],
              serves: '',
              vintage: null,
              aoc: ''
              },
            price: '59.99',
            qty: 37,
            createdBy: user._id,
            categories: ['Cider']
            }, {
              name: 'Sydre Angelette',
              image: '/img/Drappier sans souffre.gif',
              description: {
                review: 'I am the third spelling of Cidre on this site from the same winery, and it is on purpose',
                winery: 'Eric Bordelet',
                origin: 'Normandie, France',
                'do': '',
                grapes: 'another grapish korean immigrant to france',
                taste: [''],
                serves: '',
                vintage: null,
                aoc: ''
                },
              price: '59.99',
              qty: 37,
              createdBy: user._id,
              categories: ['Cider']
            }, {
            name: 'Tradition',
            image: '/img/grimaudes.gif',
            description: {
              review: 'This is a very fancy red wine',
              winery: 'Leon Barral',
              origin: 'France, Languedoc',
              'do': '',
              grapes: 'Cinsault, Grenache, carignan',
              taste: ['medium', 'full'],
              serves: '',
              vintage: null,
              aoc: ''
            },
            price: '59.99',
            qty: 37,
            createdBy: user._id,
            categories: ['Red Wine']
          }, {
            name: 'Jadis',
            image: '/img/LB jadis.gif',
            description: {
              review: 'This is a very fancy red wine',
              winery: 'Leon Barral',
              origin: 'France, Languedoc',
              'do': '',
              grapes: 'Syrah, Grenache, carignan',
              taste: ['full'],
              serves: '',
              vintage: null,
              aoc: 'Faugeres'
            },
            price: '59.99',
            qty: 37,
            createdBy: user._id,
            categories: ['Red Wine']
          }, {
            name: 'Valinieres',
            image: '/img/LB tradition.gif',
            description: {
              review: 'This is a very fancy red wine',
              winery: 'Leon Barral',
              origin: 'France, Languedoc',
              'do': '',
              grapes: 'Mourvedre 80%, Syrah 20%',
              taste: ['full'],
              serves: '',
              vintage: null,
              aoc: 'Faugeres'
            },
            price: '59.99',
            qty: 37,
            createdBy: user._id,
            categories: ['Red Wine']
          }, {
            name: 'Prelude',
            image: '/img/LB valiniere.gif',
            description: {
              review: 'This is a very fancy red wine',
              winery: 'Mas Lumen',
              origin: 'France, Languedoc',
              'do': '',
              grapes: 'Carignan 50%, Syrah 27%, Cinsault 13%, Grenache 10%',
              taste: [],
              serves: '16',
              vintage: null,
              aoc: ''
            },
            price: '59.99',
            qty: 37,
            createdBy: user._id,
            categories: ['Red Wine']
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