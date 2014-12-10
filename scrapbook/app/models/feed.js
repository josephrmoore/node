var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FeedSchema   = new Schema({
	name: String,
	layout: String,
	notes: String,
	items: {
		"person" : [Schema.Types.ObjectId],
		"place" : [Schema.Types.ObjectId],
		"datetime" : [Schema.Types.ObjectId],
		"event" : [Schema.Types.ObjectId],
		"writing" : [Schema.Types.ObjectId],
		"picture" : [Schema.Types.ObjectId],
		"audio" : [Schema.Types.ObjectId],
		"video" : [Schema.Types.ObjectId]
	}
});

module.exports = mongoose.model('Feed', FeedSchema);