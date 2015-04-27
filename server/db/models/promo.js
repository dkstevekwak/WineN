'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    code: {
        type: String,
		required: true
    },
    createdDate: {
		type: Date,
		default: Date.now
    },
    expirationDate: {
        type: Date
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Product'
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Category'
    },
    percentage: Number
});

mongoose.model('Promo', schema);
