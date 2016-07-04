var mongoose = require('mongoose');

// the User schema
var UserSchema = new mongoose.Schema({
	username: String,
	email: String,
	password: String
}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
});

var User = mongoose.model('User', UserSchema);