var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PlaceSchema   = new Schema({
	name: String,
	location: String,
	notes: String
});

module.exports = mongoose.model('Place', PlaceSchema);