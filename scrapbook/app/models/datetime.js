var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DateTimeSchema   = new Schema({
	name: String,
	date: Date,
	notes: String
});

module.exports = mongoose.model('DateTime', DateTimeSchema);