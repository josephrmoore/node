var TextBox = require('./TextBox'), inherits = require('util').inherits;

function Description(){
	TextBox.call(this);
	this.color = "blue";
}

inherits(Description, TextBox)

module.exports = Description;