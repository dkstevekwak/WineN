'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String
		required: true
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: String,
        required: true
    },
    qty: {
		type: Number
    },
    createdBy: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
	categories: {
		type: [String]
	}
});

mongoose.model('Product', schema);
