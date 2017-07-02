dialog['fr']={
  'room_pwd':"Tu te trouve dans %s.",
  'room_intro_none':"C'est une pièce très banale.",
  'room_name_none':"Pièce banale",
  'room_items': "Objets:\n%s",
  'room_directions': "Lieux:\n%s ",
  'room_empty': "Il n'y a nul objet visible à regarder.",
  'room_combination':"The combination is 'terminus' (without the quotes).",
  'room_new_created':"New room %s created",
  'room_incorrect_syntax':"Incorrect syntax. Ask the OldMan for help.",
  'room_spell_unknown':"You have not learned this spell yet",
  'room_wrong_syntax': "Wrong syntax. Read the instructions again.",
  'room_cannot_cast':"You cannot cast this spell here.",
  'room_wrong_password':"Wrong password.",
  'room_lock_added':"You just added the %s locker",
  'room_invalid_locker': "Je ne connais pas ce nom de verrou.",
  'room_invalid_spell': "Ce sort n'existe pas",
};
dialog['en']={
  'room_pwd':"You are in %s.",
  'room_intro_none':"This is a generic room.",
  'room_name_none':"Generic room",
  'room_items': "Objects:\n%s",
  'room_directions': "Locations:\n%s ",
  'room_empty': "The room is empty.",
  'room_combination':"The combination is 'terminus' (without the quotes).",
  'room_new_created':"New room %s created",
  'room_incorrect_syntax':"Incorrect syntax. Ask the OldMan for help.",
  'room_spell_unknown':"You have not learned this spell yet",
  'room_wrong_syntax': "Wrong syntax. Read the instructions again.",
  'room_cannot_cast':"You cannot cast this spell here.",
  'room_wrong_password':"Wrong password.",
  'room_lock_added':"You just added the %s locker",
  'room_invalid_locker': "No valid locker of that name.",
  'room_invalid_spell': "This is not a valid spell."
};
img={
'room_none':"none.gif",
};
function i(fname){
  return './img/' + fname;
}

String.prototype.replaceAll = function(replaceThis, withThis){
	toreturn = this.toString();
	while (toreturn.indexOf(replaceThis) > 0){
		toreturn = toreturn.replace(replaceThis, withThis);
	}
	return toreturn;
};

function Room(roomname, introtext, roompic){
	this.parents = [];
	this.children = new Array();
	this.items = new Array();
	this.commands = ["cd", "ls", "less", "man", "help", "exit", "pwd"];
	this.room_name = (typeof roomname === 'undefined') ? _('room_name_none') : roomname;
	this.room_pic = i((typeof roompic === 'undefined') ? img['room_none']: roompic);
	this.intro_text = (typeof introtext === 'undefined') ? _('room_intro_text'): introtext;
	this.cmd_text = {"pwd": _('room_pwd',this.room_name)};
	//for event handling
	this.ev = new EventTarget();
	EventTarget.call(this);
};

Room.prototype.toString = function(){
	return this.room_name;
};

Room.prototype.changeIntroText = function(new_text){
	this.intro_text = new_text;
};

Room.prototype.addItem = function(newitem) {
	if (typeof newitem != 'undefined'){
		this.items[this.items.length] = newitem;
	}
};

Room.prototype.removeItem = function(itemnametoremove){
	index = this.itemStringArray().indexOf(itemnametoremove);
	if (index != -1){
		return this.items.splice(index, 1)[0];
	}
	return null;
};

Room.prototype.itemStringArray = function(item){
	itemstrarray = []
	for (var i = 0; i < this.items.length; i++){
		itemstrarray[itemstrarray.length] = this.items[i].toString();
	}
	return itemstrarray;
};

Room.prototype.childStringArray = function(child){
	childstrarray = []
	for (var i = 0; i < this.children.length; i++){
		childstrarray[childstrarray.length] = this.children[i].toString();
	}
	return childstrarray;
};

Room.prototype.getItemFromName = function(itemname){
	itemindex = this.itemStringArray().indexOf(itemname);
	if (itemindex > -1)
		return this.items[itemindex];
	return -1;
}

Room.prototype.getChildFromName = function(childname){
	childindex = this.childStringArray().indexOf(childname);
	if (childindex > -1)
		return this.children[childindex];
	return -1;
}

Room.prototype.addChild = function(newchild){
	if (typeof newchild != 'undefined'){
		this.children[this.children.length] = newchild;
	}
};

Room.prototype.removeChild = function(child){
	index = this.children.indexOf(child);
	if (index != -1){
		this.children.splice(index, 1);
	}
};

Room.prototype.childrenStringArray = function(child){
	childrenstrarray = []
	for (var i = 0; i < this.children.length; i++){
		childrenstrarray[childrenstrarray.length] = this.children[i].toString();
	}
	return childrenstrarray;
};

Room.prototype.addParent = function(parent){
	this.parents[0] = parent;
};

Room.prototype.addCommand = function(cmd){
	this.commands[this.commands.length] = cmd;
};

Room.prototype.removeCommand = function(cmd){
	index = this.commands.indexOf(cmd);
	if (index != -1){
		this.commands.splice(index, 1);
	}
};

Room.prototype.addCmdText = function(cmd, text) {
	this.cmd_text[cmd] = text;
};

Room.prototype.removeCmdText = function(cmd){
	delete this.cmd_text[cmd];
};

Room.prototype.ls = function(args){
	if (args.length > 0){
		if (this.childrenStringArray().indexOf(args[0]) > -1){
			return this.children[this.childrenStringArray().indexOf(args[0])].printLS();
		} else {
			return _("room_empty");
		}
	} else {
		$("#scene").attr("src",this.room_pic); // Display image of room
    return this.printLS();
	}
};

Room.prototype.printLS = function(){
  return _('room_directions', " " + (this.children.toString()).replaceAll(",", "\n "))
    + "\n" + ( (this.items.length > 0) ? _('room_items', " " + (this.items.toString()).replaceAll(",", "\n ")) : '');
}

var enterRoom = function(new_room){
  $("#scene").attr("src", i(img['room_none'])); //Always show blank image when moving into a room
  current_room = new_room;
  state.setCurrentRoom(current_room);
}

Room.prototype.cd = function(args){
	if (args.length > 1){
		return "Nope nope nope. Tu ne peux pas te dédoubler et accéder à plusieurs salles en même temps. Seul le grand Tmux peut faire cette prouesse.";
	} else if (args.length == 0){
		enterRoom(Home);
		return "Tu es de retour à la maison!";
	}else if (args[0] === "..") {
		if (this.parents.length >= 1){
			if (this.room_name === "AthenaCluster"){
				this.ev.fire("AthenaClusterExited");
			}
            enterRoom(this.parents[0]);
			return "Tu est entré-e dans " + current_room.toString() + ". " + current_room.intro_text;
		} else {
			return "Tu est dans la première salle.";
		}
	} else if (args[0] === "~"){
		enterRoom(Home);
		return "Tu es de retour à la maison!";
	} else if (args[0] === ".") {
        enterRoom(current_room);
        $("#scene").attr("src", i(img['room_none'])); //Always show blank image when moving into a room
		return "Tu es entré-e dans " + current_room.toString() + ". " + current_room.intro_text;
	// } else if (args[0].indexOf("/") > 0){
	// 	var rooms_in_order = args[0].split("/");
	// 	var cur_room_to_test = this;
	// 	for (var i = 0; i < rooms_in_order.length; i++){
	// 		cur_room_to_test = cur_room_to_test.can_cd(rooms_in_order[i]);
	// 		if (cur_room_to_test === false){
	// 			return "That is not reachable from here.";
	// 		}
	// 	}
	// 	enterRoom(cur_room_to_test);
	// 	return "You  have moved to " + cur_room_to_test.toString() + ". " + current_room.intro_text;
	} else {
		roomname = args[0];
		for (var i = 0; i < this.children.length; i++){
			if (roomname === this.children[i].toString()){
				if (this.children[i].commands.indexOf("cd") > -1){
	                enterRoom(this.children[i]);
					return "You have moved to " + current_room.toString() + ". " + current_room.intro_text;
				} else {
					if (roomname === "AthenaCluster"){
						this.ev.fire("tryEnterAthenaCluster");
					} 
					return this.children[i].cmd_text["cd"];
				}
			}
		}
		return "Il n'existe aucun lieu appelé " + args[0] + ". Retourne te coucher.";
	}
};

/*Checks if arg can be reached from this room
* Returns the room if it can
* Returns false if it cannot
*
* 'arg' is a single node, not a path
* i.e. Home.can_cd("next_room") returns true
*      Home.can_cd("next_room/another_room") is invalid
*/
Room.prototype.can_cd = function(arg){
    //Don't allow for undefined or multiple paths
    if (arg == undefined || arg.indexOf("/") > -1){
        return false;
    }
    else if(arg === "..") {
		return this.parents[0];
	} else if (arg === ".") {
        return this;
	} else {
		for (var i = 0; i < this.children.length; i++){
			if (arg === this.children[i].toString()){
				return this.children[i];
			}
		}
		return false;
	}
};

Room.prototype.less = function(args){
	if (args.length < 1){
		return "Pick a different item to less.";
	} else {
		item = args[0];
		for (var i = 0; i < this.items.length; i++){
			if (item === this.items[i].toString()){
                $("#scene").attr("src",this.items[i].picturename); // Display image of item
                if (this.room_name === "Library" && (item === "InconspicuousLever")){
                	this.ev.fire("pullLever");
                }
				return this.items[i].cmd_text["less"];
			}
		}
		return "There is no " + args[0] + " here.";
	}
};

//only valid for command names
Room.prototype.man = function(args){
	if (args.length < 1){
		return "Il faut se poser une question pour être prêt à connaître sa réponse. C'est ce que dit le grand manuscrit.";
	} else {
		if (args[0] in man_pages){
			return man_pages[args[0]];
		}
		return "Il n'y a rien d'écrit dans le grand manuscrit.";
	}
};

Room.prototype.help = function(args){
	return "Écris 'man' pour avoir accès aux informations contenues dans la manuscrit";
};

//TODO: for some reason this doesn't close the window
Room.prototype.exit = function(args){
	window.open('', '_self', ''); 
	window.close(); 
};

Room.prototype.pwd = function(args){
    $("#scene").attr("src", this.room_pic);
	return "";
};

Room.prototype.mv = function(args){
	if (args.length != 2){
		return "You need to move thing A to place B. Use mov [thingA] [placeB].";
	} else {
		var item_name_to_move = this.itemStringArray().indexOf(args[0]);
		if ((item_name_to_move >= 0) && (this.childrenStringArray().indexOf(args[1]) >= 0)){
			itemtoadd = this.items[this.itemStringArray().indexOf(args[0])];
			this.children[this.childrenStringArray().indexOf(args[1])].addItem(itemtoadd);
			if ((args[0] === "UglyTroll") && (this.room_name === "CaveOfDisgruntledTrolls")){
				this.ev.fire("openSlide");
			}
			if ((args[0] === "Boulder") && (this.room_name === "DankRoom")){
				this.ev.fire("mvBoulder");
			}
			this.removeItem(args[0]);
			return "Moved " + args[0] + " to " + args[1] + ".";
		} else {
			return "Must be a valid item and location to move it.";
		}
	}
};

Room.prototype.rm = function(args){
	if (args.length < 1){
		return "You must remove a particular item";
	} else {
		stringtoreturn = "";
		for (var i = 0; i < args.length; i++){
			if (this.getItemFromName(args[i]) != -1){
				if (this.getItemFromName(args[i]).valid_cmds.indexOf("rm") > 0){
					var removedItem = this.removeItem(args[i]);
					if (removedItem.itemname === "ThornyBrambles" && this.room_name === "OminousLookingPath"){
						this.ev.fire("rmBrambles")
					}
					if (removedItem.itemname === "UglyTroll" && this.room_name === "CaveOfDisgruntledTrolls"){
						this.ev.fire("openSlide");
					}
					if (removedItem.itemname === "LargeBoulder" && this.room_name === "RockyPath"){
						this.ev.fire("rmLargeBoulder");
					}
					if ("rm" in removedItem.cmd_text){
						stringtoreturn += removedItem.cmd_text["rm"] + "\n";
					} else {
						stringtoreturn += "You just removed " + args[i] + "\n";
					}
				} else {
					stringtoreturn += "That item cannot be removed";
				}
			} else {
				return "That's not a valid object to remove.";
			}
		}
		return stringtoreturn;
	}
};

Room.prototype.grep = function(args){
	if (this.commands.indexOf("grep") > 0){
		var word_to_find = args[0];
		if (this.getItemFromName(args[1]) != -1){
			var item_to_find_in_text = this.getItemFromName(args[1]).cmd_text["less"];
			var line_array = item_to_find_in_text.split("\n");
			var return_arr = jQuery.grep(line_array, function(line){ return (line.indexOf(word_to_find) > 0)});
			return return_arr.join("\n");
		} else {
			return "Not a valid item to search in.";
		}
	}
	return "You haven't learned this spell yet.";
};

Room.prototype.touch = function(args){
	if (args.length < 1){
		return "You must touch something in particular.";
	} else {
		var createdItemsString = "";
		for (var i = args.length - 1; i >= 0; i--) {
			if (args[i].length > 0){
				this.addItem(new Item(args[i], "This is a " + args[i]));
				createdItemsString += args[i];
				if (args[i] === "Plank" && this.room_name === "BrokenBridge"){
					this.ev.fire("touchPlank");
				} else if (args[i] === "Gear" && this.room_name === "ArtisanShop"){
					this.ev.fire("touchGear");
				}
			}
		};
		if (createdItemsString === ""){
			return "You haven't touched anything. Check your syntax.";
		}
		return "You have just created " + createdItemsString;
	}
	return "You haven't learned this spell yet.";
};

Room.prototype.cp = function(args){
	if (args.length != 2){
		return "Incorrect syntax. Ask the OldMan for help.";
	} else {
		var item_to_copy_name = args[0];
		var new_item_name = args[1];
		var item_to_copy = this.getItemFromName(item_to_copy_name);
		if (item_to_copy != -1){
			var newItem = new Item(new_item_name);
			newItem.picturename = item_to_copy.picturename;
			newItem.cmd_text = item_to_copy.cmd_text;
			newItem.valid_cmds = item_to_copy.valid_cmds;
			this.addItem(newItem);
			if (this.room_name === "ArtisanShop"){
				if (new_item_name === "gear1" || new_item_name === "gear2" || new_item_name === "gear3" || new_item_name === "gear4" || new_item_name === "gear5"){
					if (this.getItemFromName("gear1") != -1 && this.getItemFromName("gear2") != -1 && this.getItemFromName("gear3") != -1 && this.getItemFromName("gear4") != -1 && this.getItemFromName("gear5") != -1){
						this.ev.fire("FiveGearsCopied");
					}
				}
			} else if (this.room_name === "Farm"){
				if (item_to_copy_name === "EarOfCorn" && new_item_name === "AnotherEarOfCorn"){
					this.ev.fire("CornCopied");
				}
			}
			return "Just copied " + item_to_copy_name + " into " + new_item_name + ".";
		}
		return "No item of that name to copy."
	}
	return "You haven't learned this spell yet.";
};

Room.prototype.terminus = function(args){
	var text_to_return = this.cmd_text["terminus"]
	this.ev.fire("AthenaComboEntered");
	return text_to_return;
};

Room.prototype.tellme = function(args){
	if (args[0] === "combo"){
		return _("room_combination");
	}
	return _('room_incorrect_syntax');
};

Room.prototype.mkdir = function(args){
	if (this.commands.indexOf("mkdir") > 0){
		if (args.length === 1){
			var room_name_to_make = args[0];
			var new_room = new Room(args[0]);
			link_rooms(this, new_room);
			if (this.room_name === "Clearing" && room_name_to_make === "House"){
				this.ev.fire("HouseMade");
			}
			return _("room_new_created", args[0]);
		}
		return _("room_incorrect_syntax");
	}
	return _("room_spell_unknown");
};

Room.prototype.sudo = function(args){
	if (this.commands.indexOf("sudo") > 0){
		if (args[0] === "less" && args[1] === "Certificate"){
			this.ev.fire("tryEnterSudo");
			return;
		} else {
			return _("room_wrong_syntax");
		}
	} 
	return _("room_cannot_cast");
}

Room.prototype.IHTFP = function(args){
	if (this.commands.indexOf("IHTFP") > 0){
		if (args.length === 0){
			var text_to_return = this.cmd_text["IHTFP"]
			this.ev.fire("sudoComplete");
			return text_to_return;
		}
		return _('room_wrong_password');
	}
	return _('room_invalid_spell');
}

Room.prototype.add = function(args){
	if (this.commands.indexOf("add") > 0){
		if (args[0] === "MagicLocker"){
			this.ev.fire("addMagicLocker");
			if (typeof this.cmd_text["add"] === 'undefined'){
				return _("room_lock_added",[args[0]]);
			}
			return this.cmd_text["add"];
		}
		else {
			return _("room_invalid_locker");
		}
	}
	return _('room_invalid_spell');
}
