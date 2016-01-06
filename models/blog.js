var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Creating a Schema
var blogSchema = new Schema({
	'name': { type: String, required: true },
	'description': { type: String, required: true },
	'author': { type: String, required: true }
});

//Need to create a model out of the Schema
var Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;