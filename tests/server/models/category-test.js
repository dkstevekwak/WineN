var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models/category');
require('../../../server/db/models/product');
require('../../../server/db/models/category');

var Category = mongoose.model('Category');

describe('Category model', function(){
    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

	var category;
    beforeEach('Create temporary category', function (done) {
		Category.create({ name: 'White' }, function(err, savedCategory) {
            category = savedCategory;
			done();
		});
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Category).to.be.a('function');
    });

    it('should have name as String',function(){
        expect(category.name).to.equal("White");
    });
});
