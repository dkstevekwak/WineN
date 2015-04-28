'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    user: {
		type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
	},
    title: {
        type: String
    },
    text: {
        type: String
    },
    date: {
		type: Date,
		default: Date.now
    },
    likes: {
        type: Number
    },
    rating: Number,
    product: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Product',
        required: true
    }
});
mongoose.model('Review', schema);
