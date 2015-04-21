'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
		required: true,
		//unique : true,
		//dropDups: true
    },
    image: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    qty: {
		type: Number
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
		required: true
    },
	categories: {
		type: [String],
		required: true
	}
});

mongoose.model('Product', schema);
