var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);
var mongoose = require('mongoose')
,   app = require('../../../server/app')
,   expect = require('chai').expect
,   agent = require('supertest').agent(app)
,   User = require('../../../server/db/models/user');


require('../../../server/db/models/product');
var Product = mongoose.model('Product');

describe('Products Route', function(){

	beforeEach('Establish DB connection', function (done) {
	    if (mongoose.connection.db) return done();
	    mongoose.connect(dbURI, done);
	});

	// before(function(done){
	// 	clearDB(done);
	// });
	// afterEach('Clear test database', function (done) {
	//     clearDB(done);
	// });

	describe('GET /products', function(){


		it('Should respond with Content-Type text/json', function(done){
			agent
			.get('/api/products')
			.expect('Content-Type', /json/)
			.expect(200)
			.expect(function(res){
				expect(res.body).to.be.instanceof(Array);
				expect(res.body).to.have.length(0);
			})
			.end(done);
			
		});
	});

		it('Should return a product if there is one in DB', function(done){
			var product = new Product ({
				name: "Jimmy's Brew",
				price:'29.99',
				image:'/images/jimmysbrew.png',
	            categories: ['Organic','Red'],
				description:"It's organic"
			});
			product.save(function(err){			
				agent
					.get('/api/products/')
					.expect(200)
					.expect(function(res){
						expect(res.body).to.be.instanceof(Array);
						expect(res.body[0].price).to.equal('29.99');
					})
					.end(done);	
			});
	});
		it('Should return two products if there are two in DB', function(done){
			var product1 = new Product ({
				name: "DJ's Brew",
				price:'29.99',
				image:'/images/jimmysbrew.png',
	            categories: ['Organic','Red'],
				description:"It's organic"
			});

			var product2 = new Product ({
				name: "Jimmy's Brew",
				price:'29.99',
				image:'/images/jimmysbrew.png',
	            categories: ['Organic','Red'],
				description:"It's organic"
			});

			product1.save(function(err){
				product2.save(function(err){
					agent
						.get('/api/products/')
						.expect(200)
						.expect(function(res){
							expect(res.body).to.be.instanceof(Array);
							console.log(res.body);
							expect(res.body.length).to.equal(2);
							expect(res.body[1].name).to.equal("Jimmy's Brew");
						})
						.end(done);	
				})			
			});
	});
	describe('GET /products/:productId', function(){

	});


})