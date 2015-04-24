'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
//	userId: user._id,
//	productId: product._id,
//	rating: 0.8,
//	title: "Fantasaticly Fruity Find",
//	body: "Wine to get smashed by, a case of this makes for a great travel companion, and the these bottles make create 'message bottles' when tossed into the ocean.",
//	approved: true,
//	verified: true,
//	date: Date.now,
//	likes: 4
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
mongoose.model('Review', schema);
