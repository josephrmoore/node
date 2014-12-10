var TextBox = require('./TextBox'), inherits = require('util').inherits;

function Action(){
	TextBox.call(this);
	this.color = "red";
	this.character = "";
}

inherits(Action, TextBox)

Action.prototype.assignCharacter = function(character){
	this.character = character;
}

module.exports = Action;