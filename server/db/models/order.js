'use strict';
var mongoose = require('mongoose');

//define cartProducts schema

var schema = new mongoose.Schema({
//why isn't the user in the database a referece to the user table?
//  user: {
//		type: mongoose.Schema.Types.ObjectId, ref: 'User'
//	},
		user: {
			_id: {
				type: String, //tentative until we decide sessionID or userID handling
				required: true
			},
			email: {
				type: String
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
		},
		promo: String
	}
    ,stripeToken: {
		String
	}
    
});

schema.virtual('details.total').get(function(){
	return this.details.shipping + this.details.tax + this.details.subTotal;
});
schema.pre('save', function(next){
//	console.log('inside presave');
	if (!this.paid) this.paid = true;
	if (!this.status) this.status = 'created';
	if (!this.date) this.date = Date.now();
	next();
});

schema.set('toJSON', { virtuals: true });

mongoose.model('Order', schema);

