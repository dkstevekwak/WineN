var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models/product');

var Product= mongoose.model('Product');

describe('Product model', function(){
    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Product).to.be.a('function');
    });

    it('should have name, image, description, price, createdBy be strings',function(done){
    	var product = new Product({
    		name: "Jimmy's Brew", 
    		image:'/images/jimmysbrew.png', 
    		description:"It's organic", 
    		price:'29.99'
    	});
        product.save(function(err){
            product.name.should.equal("Jimmy's Brew");
            product.image.should.equal('/images/jimmysbrew.png');
            product.description.should.equal("It's organic");
            product.price.should.equal('29.99');
            done(); 
        });
    });    

    it('should have qty which is a Number',function(done){
    	var product = new Product({
    		qty: 15
    	});
        product.save(function(err){
            product.qty.should.equal(15);
            done(); 
        });
    });

    it('should have categories which is an Array ',function(done){
        var product = new Product({
            categories: ['Organic','Red']
        });
       product.save(function(err){
            product.categories.should.equal(['Organic','Red']);
            done(); 
        });
     });

    it('should have createdBy which is an Object reference to a user',function(done){
        var product = new Product({ 
            createdBy: {}
        });
       product.save(function(err){
            product.createdBy.should.equal({}); //FIX
            done(); 
        });
    });

    it('should have validation to require name',function(done){
        var product = new Product({ 
            image:'/images/jimmysbrew.png', 
            description:"It's organic", 
            price:'29.99',
            qty: 15,
            categories: ['Organic','Red'],
            createdBy: {}
        });
       product.save(function(err){
            err.message.should.equal("Validation Failed"); //FI
            done(); 
        });
    });

    it('should require price',function(done){
        var product = new Product({ 
            name: "Jimmy's Brew", 
            image:'/images/jimmysbrew.png', 
            description:"It's organic", 
            qty: 15,
            categories: ['Organic','Red'],
            createdBy: {}
       });
       product.save(function(err){
            err.message.should.equal("Validation Failed"); //FI
           done(); 
        });
    });

    it('should require catergory',function(done){
        var product = new Product({ 
            name: "Jimmy's Brew", 
            image:'/images/jimmysbrew.png', 
            description:"It's organic", 
            price:'29.99',
            qty: 15,
            createdBy: {}
        });
       product.save(function(err){
             err.message.should.equal("Validation Failed"); //FI
          done(); 
        });
    });

    it('should require createdBy',function(done){
        var product = new Product({ 
            name: "Jimmy's Brew", 
            image:'/images/jimmysbrew.png', 
            description:"It's organic", 
            price:'29.99',
            qty: 15,
            categories: ['Organic','Red']
        });
       product.save(function(err){
             err.message.should.equal("Validation Failed"); //FI
            done(); 
        });
    });

})