'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    user: {
		type: mongoose.Schema.Types.ObjectId, ref: 'User'
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
        type: mongoose.Schema.Types.ObjectId, ref: 'Product'
    }
});
mongoose.model('Review', schema);
