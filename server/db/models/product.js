'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
		required: true,
        unique : true
    },
    image: {
        type: String,
        default: 'https://s3.amazonaws.com/winen/no-image.jpg'
    },
    description: {
        review: {
            type: String,
            required: true
        },
        winery: String,
        origin: String,
        do: String,
        grapes: String,
        taste: [String],
        serves: String,
        vintage: Number,
        aoc: String
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
	categories: [{
		type: mongoose.Schema.Types.ObjectId, ref:'Category',
		required: true
	}],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Review' //commented out required
    }]
});

mongoose.model('Product', schema);
