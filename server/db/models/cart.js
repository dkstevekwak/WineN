'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    session: {
		type: String
	},
    user: [{
		type: mongoose.Schema.Types.ObjectId, ref: 'User'
	}],
    cartProducts: {
        type: []
    },
    date: {
		type: Date,
		default: Date.now
    }
});
mongoose.model('Cart', schema);
