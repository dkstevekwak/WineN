var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);
var mongoose = require('mongoose')
,   app = require('../../../server/app')
,   expect = require('chai').expect
,   agent = require('supertest').agent(app);



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

	describe('GET api/products', function(){
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
							expect(res.body.length).to.equal(2);
							expect(res.body[1].name).to.equal("Jimmy's Brew");
						})
						.end(done);	
				})			
			});
	});

	describe('GET api/products/:productId', function(){
		var product;
		beforeEach(function(done){
			product = new Product ({
				name: "DJ's Brew",
				price:'29.99',
				image:'/images/jimmysbrew.png',
	            categories: ['Organic','Red'],
				description:"It's organic"
			});
			product.save(done);
		})
		it('should return the JSON of the product based on the id', function(done){
			agent
				.get('/api/products/' + product._id)
				.expect(200)
				.expect(function(res){
					expect(res.body.name).to.equal("DJ's Brew");
					expect(res.body.price).to.equal("29.99");
				})
				.end(done);
		});	
		it("should return a 500 error if the ID is not correct", function(done){
			agent
				.get('/api/products/'+'1231321313123213')
				.expect(500)
				.end(done);
		});
	});

	describe('POST api/products/add', function(){
		it('should be able to create a new product', function(done){
			agent
				.post('/api/products/add')
				.send({
					name: "DJ's Brew",
					price:'29.99',
					image:'/images/jimmysbrew.png',
		            categories: ['Organic','Red'],
					description:"It's organic"
				})
				.expect(200)
				.expect(function(res){
					expect(res.body.name).to.equal("DJ's Brew");
					expect(res.body.price).to.equal("29.99");
				})
				.end(done);
		});
		it('should check that the last one product saved to the DB', function(done){
			agent
				.post('/api/products/add')
				.send({
					name: "DK's Brew",
					price:'30.99',
					image:'/images/jimmysbrew.png',
		            categories: ['Organic','Red'],
					description:"It's organic"
				})
				.expect(200)
				.expect(function(res){
					Product.findOne({name:"DK's Brew"}, function(err,product){
						expect(product.price).to.equal('30.99');
						expect(product).to.be.instanceof(Product);
					});
				})
				.end(done);
		});
	});
	describe('PUT api/products/:productId', function(){
		var product;
		beforeEach(function(done){
			var product1 = new Product ({
				name: "Alex's Brew",
				price:'29.99',
				image:'/images/jimmysbrew.png',
	            categories: ['Organic','Red'],
				description:"It's organic"
			});
			product1.save(function(err){
				Product.findOne({name:"Alex's Brew"}, function(err,_product){
					product=_product;
					done();
				})
			});
		})

		it('should be able to update a product', function(done){
			console.log("this should be Alex",product);
			agent
				.put('/api/products/' + product._id)
				.send({'price':'15.00'})
				.expect(200)
				.expect(function(res){
					console.log(res.body)
					expect(res.body.name).to.equal("Alex's Brew");
					expect(res.body.price).to.equal('15.00');
				})
				.end(done);
		});
	});

});



