function TextBox(){
	this.parent = null;
	this.id = null;
	this.descendents = [];
	this.color = "#ffffff";
	this.text = "";
}

TextBox.prototype.create = function(parent){
	this.parent = parent.id;
	this.generateId();
	parent.descendents.push(this.id);
}

TextBox.prototype.generateId = function(id){
	this.id = id;
}

TextBox.prototype.addText = function(text){
	this.text = text;
}

module.exports = TextBox;