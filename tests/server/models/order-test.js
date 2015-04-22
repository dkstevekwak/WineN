var dbURI = 'mongodb:localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models/order');
require('../../../server/db/models/user');
require('../../../server/db/models/product');

var Order = mongoose.model('Order');
var User = mongoose.model('User');
var Product = mongoose.model('Product');

describe('Order model', function(){
    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

	var user;
    beforeEach('Create temporary user', function (done) {
		user = new User({
			email: 'fake@email.com',
			username: 'fakeUser'
		});
		user.save(function(err) {
			done();
		});
    });
    
    var products;
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
		product1.save(function(err) {			
			product2.save(function(err) {
				done();
			});
		});
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
			date: new Date(),
			promoCode: "SPRING15",
			shipping: "5.00",
			tax: "1.00",
			subTotal: "46.97",
			total: "52.97"
		});
		order.save(function(err) {
			done();
		});
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should have status field of type string',function(done){
		expect(order.status).to.equal('Ordered');
		done();
    });

    xit('should have date field of type date',function(done){
		expect(order.date).to.be.instanceOf(Date);
		done();
    });

    it('should have user field of type string',function(done){
		expect(order.user).to.be.equal('fakeUser');
		done();
    });

    it('should have a paid field which is a boolean',function(done){
		expect(order.paid).to.be.equal(false);
		done();
    });

    it('should have cartProducts field which is an array of objects with keys: productId, price, qty',function(done){
		expect(order.cartProducts[0].product_id).to.equal(product1._id);
		expect(order.cartProducts[0].price).to.be.equal("8.99");
		expect(order.cartProducts[0].qty).to.be.equal("1");
		expect(order.cartProducts[1].product_id).to.equal(product2._id);
		expect(order.cartProducts[1].price).to.be.equal("18.99");
		expect(order.cartProducts[1].qty).to.be.equal("2");
		done();
    });
    
});
