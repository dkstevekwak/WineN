var dbURI = 'mongodb://localhost:27017/testingDB';
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
			if(err) return done(err);
			user = saved;
			done();
		});
    });
    
    var product1;
    var product2;
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
		Product.create(product1,product2,function(err, saved1,saved2){
			if(err) return done(err);
			product1 = saved1;
			product2 = saved2;
			done();
		});
    });
    
	var order;
    beforeEach('Create temporary order', function (done) {
		order = {
				user: {
					_id: user._id,
					firstName: user.firstName,
					lastName: user.lastName,
					shippingAddress: {
						line1: user.shippingAddress.line1,
						line2: user.shippingAddress.line2,
						city: user.shippingAddress.city,
						state: user.shippingAddress.state,
						zip: user.shippingAddress.zip
					},
					billingAddress: {
						line1: user.billingAddress.line1,
						line2: user.billingAddress.line2,
						city: user.billingAddress.city,
						state: user.billingAddress.state,
						zip: user.billingAddress.zip
					}
				},
			paid: false,
			cart: [
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
			date: Date.now(),
			promoCode: "SPRING15",
			details: {
				shipping: "5.00",
				tax: "1.00",
				subTotal: "46.97"
	//			,total: "52.97"
			}
		};
		Order.create(order,function(err, saved){
			if(err) return done(err);
			order = saved;
			done();
		});
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('has a status field of type string',function(done){
		expect(order.status).to.equal('Ordered');
		expect(order.status).to.be.a('string');
		done();
    });

    it('has a date field of type date',function(done){
		expect(order.date).to.be.instanceOf(Date);
		done();
    });

    it('has an order.user._id is a string which eqauls user._id ',function(done){
		expect(order.user._id).to.equal(user._id.toString());
		done();
    });

    it('has a virtal which marks a paid field of value of false as true',function(done){
		expect(order.paid).to.equal(true);
		done();
    });

    it('has a paid field which is a boolean',function(done){
		expect(order.paid).to.be.a('boolean');
		done();
    });

    it('has a cart field which is an array of products: productId, price, qty',function(done){
		expect(order.cart[0].product_id).to.equal(product1._id);
		expect(order.cart[0].price).to.equal("8.99");
		expect(order.cart[0].qty).to.equal("1");
		expect(order.cart[1].product_id).to.equal(product2._id);
		expect(order.cart[1].price).to.equal("18.99");
		expect(order.cart[1].qty).to.equal("2");
		done();
    });
    
    it('has a virtual total which is the sum of shipping, tax and subTotal',function(done){
    	expect(order.details.total).to.equal(order.details.shipping + order.details.tax + order.details.subTotal);
    	done();
    });
    
});
