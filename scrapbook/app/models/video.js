var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var VideoSchema   = new Schema({
	name: String,
	file: String,
	notes: String
});

module.exports = mongoose.model('Video', VideoSchema);