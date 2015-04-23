'use strict';
var mongoose = require('mongoose');

//define cartProducts schema


var schema = new mongoose.Schema({
	user: { //either user._id or session._id
        type: String,
		required: true
		//unique : true,
		//dropDups: true
    },
    paid: {
        type: Boolean,
        default: false
    },
    cartProducts: {
        type: []
    },
    status: {
        type: String,
        required: true
    },
    date: {
			type: Date
    },
    promoCode: {
        type: String
    },
	shipping: {
		type: Number
	},
    tax: {
		type: Number
	},
    subTotal: {
		type: Number
	},
	firstName: {
		type: String
	},
	lastName: {
		type: String
	},
	shippingAddress: {
		line1: String,
		line2: String,
		city: String,
		state: String,
		zip: String
	},
	billingAddress: {
		line1: String,
		line2: String,
		city: String,
		state: String,
		zip: String
	}
});

schema.virtual('total').get(function(){
	return this.shipping + this.tax + this.subTotal;
});


mongoose.model('Order', schema);

