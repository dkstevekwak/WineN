var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models/order');
require('../../../server/db/models/user');
require('../../../server/db/models/product');
require('../../../server/db/models/review');

var Order = mongoose.model('Order');
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
				address: {
					line1: '5 Hanover Square',
					line2: '25th Flr',
					city: 'New York City',
					state: 'New York',
					zip: '10006' }
			};    	
		var createUser = function (user) {
			User.create(user,function(err, saved){
				if(err) return done(err);
				user = saved;
				done();
			});
		};
    });
    
    var product1,product2;
    beforeEach('Create temporary products', function (done) {
		product1 = new Product({
			name: "Test Brew 1",
			price: "8.99",
			description: "product1 test brew",
			categories: ["Red"]
		});
		product2 = new Product({
			name: "Test Brew 2",
			price: "18.99",
			description: "product2 test brew",
			categories: ["White"]
		});
//		product1.save(function(err) {			
//			product2.save(function(err) {
//				done();
//			});
//		});
		var createProducts = function () {
			return Product.create(product1,product2,function(saved1,saved2){
				product1 = saved1;
				product2 = saved2;
				if(err) throw err;
				done();
			});
		};
    });
    
	var order;
    beforeEach('Create temporary order', function (done) {
		order = new Order({
			user: user._id,
			paid: false,
			cartProducts: [
			               { 
			            	   product_id: product1._id, 
			            	   price: product1.price,
			            	   qty: "1"
			               },
			               { 
			            	   product_id: product2._id, 
			            	   price: product2.price,
			            	   qty: "2"
			               }
			              ],
			status: "Ordered",
			date: Date.now,
			promoCode: "SPRING15",
			shipping: "5.00",
			tax: "1.00",
			subTotal: "46.97",
			total: "52.97"
		});
		var createOrder = function () {
			return Order.create(order,function(saved){
				order = saved;
				if(err) throw err;
				done();
			});
		};
    });

	var review;
    beforeEach('Create temporary review', function (done) {
		review = new Review({
			user: user._id,
			product: product._id,
			rating: 0.8,
			title: "Fantasaticly Fruity Find",
			text: "Wine to get smashed by, a case of this makes for a great travel companion, and the these bottles make create 'message bottles' when tossed into the ocean.",
			date: Date.now,
			likes: 4
		});
		var createReview = function () {
			return Review .create(review,function(saved){
				review = saved;
				if(err) throw err;
				done();
			});
		};		
    });
    
    afterEach('Clear test database', function (done) {
        clearDB(done);
    });
    
    var createReview = function (review) {
        return Review.create(review,function(err,saved){
        	if(err) throw err;
        });
    };
    
    var createUser = function (user) {
        return User.create(user,function(err,saved){
        	if(err) throw err;
        });
    };

    it('has userId field of type string',function(done){
    	createUser(user).createReview(review).then(function(review) {
			expect(review.userId).to.be.equal('admin');
			expect(review.username).to.be.equal('awang');
			done();
		})
    });

    xit('has productId field of type date',function(done){
		expect(order.date).to.be.instanceOf(Date);
		done();
    });

    xit('has rating field of type string',function(done){
//		expect(order.user.toString).to.equal(user._id.toString);
		expect(order.user).to.be.a('string');
		done();
    });

    xit('has title field which is a boolean',function(done){
		expect(order.paid).to.be.equal(false);
		expect(order.paid).to.be.a('boolean');
		done();
    });

    xit('has body field which is a boolean',function(done){
		expect(order.paid).to.be.equal(false);
		expect(order.paid).to.be.a('boolean');
		done();
    });

    xit('has approved field which is a boolean',function(done){
		expect(order.paid).to.be.equal(false);
		expect(order.paid).to.be.a('boolean');
		done();
    });

    xit('has verified field which is a boolean',function(done){
		expect(order.paid).to.be.equal(false);
		expect(order.paid).to.be.a('boolean');
		done();
    });

    xit('has date field which is a boolean',function(done){
		expect(order.paid).to.be.equal(false);
		expect(order.paid).to.be.a('boolean');
		done();
    });

    xit('has likes field which is a boolean',function(done){
		expect(order.paid).to.be.equal(false);
		expect(order.paid).to.be.a('boolean');
		done();
    });

    xit('has cartProducts field which is an array of objects with keys: productId, price, qty',function(done){
		expect(order.cartProducts[0].product_id).to.equal(product1._id);
		expect(order.cartProducts[0].price).to.be.equal("8.99");
		expect(order.cartProducts[0].qty).to.be.equal("1");
		expect(order.cartProducts[1].product_id).to.equal(product2._id);
		expect(order.cartProducts[1].price).to.be.equal("18.99");
		expect(order.cartProducts[1].qty).to.be.equal("2");
		done();
    });
    
    xit('should have categories which is an Array ',function(done){
        var product = new Product({
			name: "Jimmy's Brew",
			price:'29.99',
            createdBy: user._id,
            categories: ['Organic','Red'],
			description:"It's organic"
        });
       product.save(function(err){
			expect(product).to.have.deep.property('categories[0]', 'Organic');
			expect(product).to.have.deep.property('categories[1]', 'Red');
            done();
        });
     });
    
});