var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models/product');

var Product= mongoose.model('Product');

describe('Product model', function(){
    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Product).to.be.a('function');
    });

    it('should have name, image, description, price, createdBy',function(done){
    	var product = new Product({
    		name: '', 
    		image:'', 
    		description:'', 
    		price:'', 
    		createdBy:''
    	});
    });    

    it('should have qty',function(done){
    	var product = new Product({
    		qty:[]
    	});
    });

    it('should have categories',function(done){
    	var product = new Product({
    		categories: []
    	});
    });

})