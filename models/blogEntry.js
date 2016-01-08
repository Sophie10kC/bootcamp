var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Creating a Schema
var blogEntrySchema = new Schema({
	'title': { type: String, required: true },
	'text': { type: String, required: true },
	'author': { type: String, required: true },
	'blogId': { type: String, required: true },
	'img': { data: String, contentType: String },
	'date': { type: Date, default: Date.now}
});

//Need to create a model out of the Schema
var BlogEntry = mongoose.model('BlogEntry', blogEntrySchema);

module.exports = BlogEntry;