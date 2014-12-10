var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
	name: String,
	person: Schema.Types.ObjectId,
	notes: String,
	access: [Schema.Types.ObjectId]
});

module.exports = mongoose.model('Person', PersonSchema);