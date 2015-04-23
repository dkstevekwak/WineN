'use strict';
var mongoose = require('mongoose');

//define cartProducts schema


var schema = new mongoose.Schema({
		user: {
			_id: {
				type: String, //tentative until we decide sessionID or userID handling
				required: true
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
		},

    paid: {
        type: Boolean,
        default: false
    },
    cart: {
        type: []
    },
    status: {
        type: String
    },
    date: {
			type: Date
    },
    promoCode: {
        type: String
    },
	details: {
		shipping: {
			type: Number
		},
		tax: {
			type: Number
		},
		subTotal: {
			type: Number
		}
	}
});

schema.virtual('details.total').get(function(){
	return this.details.shipping + this.details.tax + this.details.subTotal;
});
schema.pre('save', function(next){
	console.log('inside presave');
	if (!this.paid) this.paid = true;
	if (!this.status) this.status = 'Created';
	if (!this.date) this.date = Date.now();
	next();
});

mongoose.model('Order', schema);

