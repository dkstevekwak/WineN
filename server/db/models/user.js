'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
//Alex and DJ, about to add orders to userSchema 'userSchema-ordersUpdate-#46'
var schema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    salt: {
        type: String
    },
    twitter: {
        id: String,
        username: String,
        token: String,
        tokenSecret: String
    },
    facebook: {
        id: String
    },
    google: {
        id: String
    },
	role: {
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
	},
	orders: [{
		type: mongoose.Schema.Types.ObjectId, ref: 'Order'
	}],
  cart: []
});

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

schema.pre('save', function (next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('User', schema);
