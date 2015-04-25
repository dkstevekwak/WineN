'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
		required: true
		//unique : true,
		//dropDups: true
    },
    image: {
        type: String
    },
    description: {
        type: mongoose.Schema.Types.Mixed,
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
        type: mongoose.Schema.Types.ObjectId, ref: 'User' //commented out required
    },
	categories: {
		type: [String],
		required: true
	}
});

mongoose.model('Product', schema);
