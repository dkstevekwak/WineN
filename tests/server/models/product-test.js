var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models/product');
require('../../../server/db/models/user');

var Product= mongoose.model('Product');
var User = mongoose.model('User');

describe('Product model', function(){
    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

	var user;
    beforeEach('Create temporary user', function (done) {
		user = new User({
			email: 'fake@email.com'
		});
		user.save(function(err) {
			done();
		});
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Product).to.be.a('function');
    });

    it('should have name, image, description, price, createdBy be strings',function(done){
		var product = new Product ({
			name: "Jimmy's Brew",
			price:'29.99',
			image:'/images/jimmysbrew.png',
            categories: ['Organic','Red'],
            createdBy: user._id,
			description:"It's organic"
		});
		product.save(function(err){
			expect(product.name).to.equal("Jimmy's Brew");
			expect(product.image).to.equal('/images/jimmysbrew.png');
			expect(product.description).to.equal("It's organic");
			expect(product.price).to.equal('29.99');
			done();
		});
    });

    it('should have qty which is a Number',function(done){
    	var product = new Product({
			name: "Jimmy's Brew",
			price:'29.99',
            categories: ['Organic','Red'],
            createdBy: user._id,
    		qty: 15
    	});
        product.save(function(err){
			expect(product.qty).to.equal(15);
            done();
        });
    });

    it('should have categories which is an Array ',function(done){
        var product = new Product({
			name: "Jimmy's Brew",
			price:'29.99',
            createdBy: user._id,
            categories: ['Organic','Red']
        });
       product.save(function(err){
			expect(product).to.have.deep.property('categories[0]', 'Organic');
			expect(product).to.have.deep.property('categories[1]', 'Red');
            done();
        });
     });

    it('should have createdBy which is an Object reference to a user',function(done){
        var product = new Product({
			name: "Jimmy's Brew",
			price:'29.99',
            categories: ['Organic','Red'],
            createdBy: user._id
        });
		product.save(function(err){
            expect(product.createdBy).to.equal(user._id);
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
            createdBy: user._id
        });
       product.save(function(err){
            expect(err.message).to.equal("Validation Failed"); //FI
            done();
        });
    });

    xit('should require price',function(done){
        var product = new Product({
            name: "Jimmy's Brew",
            image:'/images/jimmysbrew.png',
            description:"It's organic",
            qty: 15,
            categories: ['Organic','Red'],
            createdBy: user._id
       });
       product.save(function(err){
            expect(err.message).to.equal("Validation Failed"); //FI
			done();
        });
    });

    xit('should require category',function(done){
        var product = new Product({
            name: "Jimmy's Brew",
            image:'/images/jimmysbrew.png',
            description:"It's organic",
            price:'29.99',
            qty: 15,
            createdBy: user._id
        });
       product.save(function(err){
            expect(err.message).to.equal("Validation Failed"); //FI
			done();
        });
    });

    xit('should require createdBy',function(done){
        var product = new Product({
            name: "Jimmy's Brew",
            image:'/images/jimmysbrew.png',
            description:"It's organic",
            price:'29.99',
            qty: 15,
            categories: ['Organic','Red']
        });
       product.save(function(err){
            expect(err.message).to.equal("Validation Failed"); //FI
            done();
        });
    });

})
