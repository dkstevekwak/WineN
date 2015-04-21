//var dbURI = 'mongodb://localhost:27017/testingDB';
//var clearDB = require('mocha-mongoose')(dbURI);

//var sinon = require('sinon');
//var expect = require('chai').expect;
//var mongoose = require('mongoose');

//require('../../../server/db/models/order');
//require('../../../server/db/models/user');

//var Order = mongoose.model('Order');
//var User = mongoose.model('User');

//describe('Order model', function(){
    //beforeEach('Establish DB connection', function (done) {
        //if (mongoose.connection.db) return done();
        //mongoose.connect(dbURI, done);
    //});

	//var user;
    //beforeEach('Create temporary user', function (done) {
		//user = new User({
			//email: 'fake@email.com'
		//});
		//user.save(function(err) {
			//done();
		//});
    //});

    //afterEach('Clear test database', function (done) {
        //clearDB(done);
    //});

    //it('should have status field of type string',function(done){
		//var order = new Order({
			//status: 'Created'
		//});
		//product.save(function(err){
			//expect(order.status).to.equal('Crated');
			//done();
		//});
    //});

    //it('should have date field of type date',function(done){
		//var order = new Order({
			//date: Date.now()
		//});
		//product.save(function(err){
			//expect(order.date).to.equal('Crated');
			//done();
		//});
    //});

