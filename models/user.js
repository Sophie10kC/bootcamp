var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Creating a Schema
var userSchema = new Schema({
	'username': { type: String, required: true, unique: true }
});

//Need to create a model out of the Schema
var User = mongoose.model('User', userSchema);

module.exports = User;
