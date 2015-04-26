var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);
//DJ starting cartPersistence-#13

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models/user');
require('../../../server/db/models/product');
require('../../../server/db/models/cart');

var User = mongoose.model('User');
var Product = mongoose.model('Product');
var Cart = mongoose.model('Cart');

describe('Cart model', function(){
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
    
	var cart, dateTime = Date.now();
    beforeEach('Create temporary cart', function (done) {
		cart = new Cart({
			session: "Hpgq9Kdr5fpWDxqRnyR-KO_DvZFxcoqT", //session._id
			user: user._id,
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
			date: dateTime,
		});
		
		Cart.create(cart,function(err, saved){
			if(err) {
				throw err;
				return done(err);
			}
			cart = saved;
			done();
		});
   });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('has session field of type string',function(done){
		expect(cart.session).to.equal('Hpgq9Kdr5fpWDxqRnyR-KO_DvZFxcoqT');
		expect(cart.session).to.be.a('string');
		done();
    });

    it('has user field is a reference to User',function(done){
		expect(cart.user).to.be.instanceOf(Object);
		done();
    });
    
    xit('has a date field with a date value when it was created',function(done){
    	expect(cart.date).to.equal(Date(dateTime));
		done();
    });

    
    it('has date field of type date',function(done){
		expect(cart.date).to.be.instanceof(Date);
		done();
    });
    
    it('has cartProducts field which is an array of objects with keys: productId, price, qty',function(done){
		expect(cart.cartProducts[0].product_id).to.equal(product1._id);
		expect(cart.cartProducts[0].price).to.be.equal("8.99");
		expect(cart.cartProducts[0].qty).to.be.equal("1");
		expect(cart.cartProducts[1].product_id).to.equal(product2._id);
		expect(cart.cartProducts[1].price).to.be.equal("18.99");
		expect(cart.cartProducts[1].qty).to.be.equal("2");
		done();
    });
    
});
