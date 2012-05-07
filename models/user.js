var mongoose = require('mongoose')
,	User;

User = new mongoose.Schema({
		email: String,
		passwordHash: String,
		createdAt: Date,
		friendlyName: String
});

mongoose.model('User', User);
var User = mongoose.model('User');

module.exports = {
	User: User
}