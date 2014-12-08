var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EventSchema   = new Schema({
	name: String,
	people: [Schema.Types.ObjectId],
	place: Schema.Types.ObjectId,
	date: Schema.Types.ObjectId,
	media: [Schema.Types.ObjectId],
	notes: String
});

module.exports = mongoose.model('Event', EventSchema);