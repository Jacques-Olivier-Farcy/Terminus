function Item(name, text, picname){
	this.itemname = name;
    this.picturename = (typeof picname === 'undefined') ? "./static/img/none.gif": "./static/img/" + picname;
	this.cmd_text = (typeof text === 'undefined') ? {"less": "This is a generic item"} : {"less": text};
}

Item.prototype.addCmdText = function(cmd, text) {
	this.cmd_text[cmd] = text;
};

Item.prototype.toString = function(){
	return this.itemname;
}