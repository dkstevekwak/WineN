var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models/user');
require('../../../server/db/models/product');
require('../../../server/db/models/review');

var User = mongoose.model('User');
var Product = mongoose.model('Product');
var Review = mongoose.model('Review');
// DJ exciteresearch/ open reviewModeTests-#21

describe('Review model', function(){
    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    var user;
    beforeEach('Create temporary user', function (done) {
		user = {
			email: 'obama@gmail.com',
			password: 'potus',
		   	role: 'admin',
			username: 'awang',
			shippingAddress: {
				line1: '5 Hanover Square',
				line2: '25th Flr',
				city: 'New York City',
				state: 'New York',
				zip: '10006' },
			billingAddress: {
				line1: '5 Hanover Square',
				line2: '25th Flr',
				city: 'New York City',
				state: 'New York',
				zip: '10006' }
		};
		User.create(user,function(err, saved){
			if(err) {
					throw err;
					return done(err);
				}
			user = saved;
			done();
		});
    });
    
    var product;
    beforeEach('Create temporary products', function (done) {
		product = {
			name: "Test Brew 1",
			price: "8.99",
			description: "product1 test brew",
			categories: ["Red"]
		};
		Product.create(product,function(err, saved){
			if(err) {
				throw err;
				return done(err);
			}
			product = saved;
			done();
		});
    });
    
	var review, dateTime = Date.now();
    beforeEach('Create temporary review', function (done) {
		review = {
			user: user._id,
			title: "Fantasaticly Fruity Find",
			text: "Wine to get smashed by, a case of this makes for a great travel companion, and the these bottles make create 'message bottles' when tossed into the ocean.",
			date: dateTime,
			likes: 4,
			rating: 0.8,
			product: product._id
		};
		
		Review.create(review,function(err, saved){
			if(err) {
				throw err;
				return done(err);
			}
			review = saved;
			done();
		});
    });
    
    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('has user field equal to user._id',function(done){
    	console.log("WHERE IS THE USERNAME FOR THE REVIEW?!?");
		expect(review.user).to.equal(user._id);
		done();
    });

    it('has title field of type string',function(done){
		expect(review.title).to.equal("Fantasaticly Fruity Find");
		expect(review.title).to.be.a('string');
		done();
    });

    it('has text field of type string',function(done){
		expect(review.text).to.equal("Wine to get smashed by, a case of this makes for a great travel companion, and the these bottles make create 'message bottles' when tossed into the ocean.");
		expect(review.text).to.be.a('string');
		done();
    });

    xit('has a date field with a date value when it was created',function(done){
    	expect(review.date).to.equal(Date(dateTime));
		done();
    });

    it('has a date field of type date',function(done){
		expect(review.date).to.be.instanceof(Date);
		done();
    });
    
    it('has likes field of type number',function(done){
		expect(review.likes).to.be.equal(4);
		expect(review.likes).to.be.a('number');
		done();
    });

    it('has rating field with a value between 0 and 1',function(done){
		expect(review.rating).to.be.within(0, 1);
		done();
    });

    it('has product field equal to product._id',function(done){
		expect(review.product).to.be.equal(product._id);
		done();
    });
    
});