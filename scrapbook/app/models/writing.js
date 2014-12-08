var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var WritingSchema   = new Schema({
	name: String,
	content: String,
	notes: String
});

module.exports = mongoose.model('Writing', WritingSchema);