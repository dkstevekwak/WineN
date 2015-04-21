var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models/category');
require('../../../server/db/models/product');
require('../../../server/db/models/user');

var Category = mongoose.model('Category');
var User = mongoose.model('User');

describe('Category model', function(){
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
        expect(Category).to.be.a('function');
    });

    it('should have name as String',function(done){
		var category = new Category ({
			name: "Red"
		});
		category.save(function(err){
			expect(category.name).to.equal("Red");
			done();
		});
    });
});
