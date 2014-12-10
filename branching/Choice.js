var Action = require('./Action'), inherits = require('util').inherits;

function Choice(){
	Action.call(this);
	this.color = "yellow";
}

inherits(Choice, Action)

Choice.prototype.linkResults = function(results){
	this.results = results;
}

module.exports = Choice;