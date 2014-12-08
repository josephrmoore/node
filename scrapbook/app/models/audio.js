var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var AudioSchema   = new Schema({
	name: String,
	file: String,
	notes: String
});

module.exports = mongoose.model('Audio', AudioSchema);