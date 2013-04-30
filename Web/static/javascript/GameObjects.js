/**
* Objects used to build levels
*/

/**
* ROOMS
* Players can cd between rooms
*
* API: Room(roomname, introtext, img){
*/

//HOME
var Home = new Room("Home",
    "You are in the comfort of your own home.",
    "loc_farm.gif");
Home.addItem(new Item("WelcomeLetter", "Welcome! If you are new to the game, here are some tips: \n\n" +
		"Look at your surroundings with the command \"ls\". \n" +
		"Move to a new location with the command \"cd LOCATION\" \n" +
		"You can backtrack with the command \"cd ..\". \n" +
		"Interact with things in the world with the command \"less ITEM\" \n\n" +
        "If you forget where you are, type \"pwd\" \n\n" + 
		"Go ahead, explore. We hope you enjoy what you find. Do ls as your first command.\n"));

//WESTERN FOREST
var WesternForest = new Room("WesternForest",
    "You enter and travel deep into the forest. \
Eventually, the path leads to a clearing with a large impressive building. A sign \
on it reads: Spell Casting Academy: The Elite School of Magic.",
    "loc_forest.gif");
WesternForest.addItem(new Item("Sign",
    "Spell Casting Academy: The Elite School of Magic \
Today Only: Free Introductory Lessons! Novices welcome!",
    "loc_forest.gif"));
WesternForest.addItem(new Item("BackSign",
    "If you ever want to go directly Home, just type 'cd ~' or just plain old `cd' \
    and you'll come back Home. Getting back might be more difficult though.",
    "loc_forest.gif"));

//SPELL CASTING ACADEMY
var SpellCastingAcademy = new Room("SpellCastingAcademy", 
    "The halls are filled the hustle \
and bustle of academy students scurrying to and from classes. The inside of the \
academy is as impressive as it is on the outside with a high ceiling and gothic \
arches, it seems even larger on the inside.", 
    "loc_academy.gif");
var HurryingStudent = new Item("HurryingStudent", 
    "You to speak to a hurrying student. \
The student runs into you and falls to the ground. \
The student quickly gets up \
and apologizes to you, asking if you are okay. You are sturdier than you look and \
you're undamaged. I'm so sorry, I was in such a hurry that I didn't see you \
there... Say, I haven't seen you here before. You're new here aren't-cha?\" the \
student winks at you, \"Don't worry, there's tons of newbies around today, \
why don't you try checking out one of the free intro lessons? I'd show you where \
to go, but I gotta run to class. Just head into the Lessons hall and someone \
should help you out. See you around.\" The student runs past you. You notice that \
the student is pretty cute, and probably around your age. Unfortunately, the \
student disappears around a corner before you can ask for a name.", 
    "item_student.gif")
SpellCastingAcademy.addItem(HurryingStudent);

//PRACTICE ROOM
var PracticeRoom = new Room("PracticeRoom", 
    "The room is filled with practice dummies \
for students to practice their new spells on.",
    "loc_practiceroom.gif");
PracticeRoom.addItem(new Item("Instructions", 
    "Welcome to the Practice Room. Here \
you will find practice dummies try your new spells on. Go ahead, give it a go! \
Practice dummies will respawn in their original location once you leave the \
Practice Room. If you don't know any spells yet, go back and check out some Lessons.", 
    "item_manuscript.gif"));
PracticeRoom.addItem(new Item("PracticeDummy1", "It's a practice dummy", "item_dummy.gif"));
PracticeRoom.addItem(new Item("PracticeDummy2", "It's a practice dummy", "item_dummy.gif"));
PracticeRoom.addItem(new Item("PracticeDummy3", "It's a practice dummy", "item_dummy.gif"));
PracticeRoom.addItem(new Item("PracticeDummy4", "It's a practice dummy", "item_dummy.gif"));
PracticeRoom.addItem(new Item("PracticeDummy5", "It's a practice dummy", "item_dummy.gif"));
PracticeRoom.addCommand("mv");

//BOX
var Box = new Room("Box", "This box is too small for you to fit into.", "item_box.gif");
Box.removeCommand("cd");
Box.addCmdText("cd", "You are too small to fit into the box.");

//NORTHERN MEADOW
var NorthernMeadow = new Room("NorthernMeadow", 
    "This is a beautiful green meadow. A plump but majestic pony prances happily about.",
    "loc_meadow.gif");
NorthernMeadow.addItem(new Item("Pony", 
    "You go up to the pony and attempt to ride it. \
It compiles and you ride the pony around in circles for a bit. It then grows tired \
of having you as a burden and knocks you off. He then looks towards the east as if \
suggesting that you head in that direction.", 
    "item_fatpony.gif"));

//EASTERN MOUNTAINS
var EasternMountains = new Room("EasternMountains", 
    "You travel through a mountain path, \
which eventually leads you to the entrance of a cave. Sitting right outside this \
cave is an old man.", 
    "loc_mountains.gif");
EasternMountains.addItem(new Item("OldMan", 
    "You speak with the old man. He greets \
you warmly as if you were old friends. You feel at ease with him. Hello \
adventurer! Top of the morning to you! You seem like a young and energetic \
explorer. If you're brave enough, your destiny awaits within this cave. That \
destiny will manifest itself as a portal. Enter this portal and begin the next \
chapter of your life. The old man sees the shock on your face and smiles \
comforting smile, \"I am but a fragile old man, and cannot accompany you through \
this cave, but what I can provide are a few simple spells that will help you \
along your way. Just read my old manuscripts and tryout those spells.\"", 
	"item_mysteryman.gif"));
EasternMountains.addItem(new Item("OldManuscripts", 
    "If you ever forget a spell just use\
\"help\" and a list of available spells will appear. If you need details on how \
to use a specific spell, use 'man' followed by spell command. For example, \
if you were interested in details on how to use the \"mv\" spell you would use: \
man mv",
    "item_manuscript.gif"));

//LESSONS
var Lessons = new Room("Lessons", 
    "You enter the Lessons hall ready and eager. \
It's much quieter here, as many of the lessons have already started. \
You quickly ushered into the Introductory Lesson, which already begun. \
You enter the class on the \"Move Spell.\"", 
    "loc_classroom.gif");
Lessons.addItem(new Item("Professor", 
    "The professor is difficult to understand, but you pick up just enough to learn 3 things: \
\n\
1. You can use 'mv' to move things in the world \n\
2. You have to indicate the object and the new location (i.e.: mv OBJECT NEWLOCATION) \n\
3. This spell will only work on certain objects, for example the PracticeDummy objects in the PracticeRoom \n\
\n\
You did not pay enough attention to learn which types of objects are unmovable. \
Oh well, experimenting was always more of your style anyways. But be careful!", 
    "item_professor.gif"));

//CAVE
var Cave = new Room("Cave", "It's your typical cave: dark and dank.", "loc_cave.gif");
		
//DARK CORRIDOR
var DarkCorridor = new Room("DarkCorridor", 
    "You travel through the dark corridor and find a small dank room at the end.", 
    "loc_corridor.gif");

//STAIRCASE
var Staircase = new Room("Staircase", 
    "The rocky staircase leads you to a dead end and a sign indicating such.", 
    "loc_stair.gif");
Staircase.addItem(new Item("Sign", "DEAD END", "item_sign.gif"));

//DANK ROOM
var DankRoom = new Room("DankRoom", 
    "It's a musty dank room. A round boulder sits to the right side of the room.",
    "loc_darkroom.gif");
DankRoom.addItem(new Item("Boulder",
    "You feel a slight breeze coming from behind the boulder. \
Maybe move it out of your way?",
    "item_boulder.gif"));
DankRoom.addCommand("mv");

//SMALL HOLE
var SmallHole = new Room("SmallHole", 
    "There's nothing exciting in the small hole, and it's pretty dirty. \
There's no real reason to go into the hole.",
    "none.gif");
SmallHole.addCmdText("cd", 
    "There's nothing exciting in the small hole, and it's pretty dirty. There's no real reason to go into the hole. I suggest going back out.");
//add event handler to the "addItem" method of SmallHole to cause the rest of the level to be connected
SmallHole.ev.addListener("addItem", function(){
	link_rooms(DankRoom, Tunnel);
});

//TUNNEL
var Tunnel = new Room("Tunnel", 
    "It's quite moist in here. \
    You notice a small furry movement in the corner of your vision. \
It's most likely a rat. A very large rat. Perhaps a mongoose. \
At the end of the tunnel you find a stone chamber.",
    "loc_tunnel.gif");
Tunnel.addItem(new Item("Rat", 
    "Upon further inspection, you determine that the furry \
presence is in fact a rat...the size of a small dog. It bites you. \
You are very displeased.",
    "item_rat.gif"));

//STONE CHAMBER
var StoneChamber = new Room("StoneChamber", 
    "The whole rooms glows a dim green light. \
The source of this light is a portal standing in the middle of the room. \
This is obviously the portal of which the old man spoke.", 
    "loc_portalroom.gif");

//PORTAL (to bring you to the next level
var Portal = new Room("Portal", 
    "You have been transported through time...", 
    "item_portal.gif");
//---------------END LEVEL 1-----------------


//---------------LEVEL 2---------------------
//TOWN SQUARE
var TownSquare = new Room("TownSquare", 
    "You are in a sunny and spacious town square. \
There is a pedestal at the center of the cobblestone turnabout, but no statue on it. \
The architecture is charming, but everyone here seems nervous for some reason.",
    "loc_square.gif");
TownSquare.addItem(new Item("RandomCitizen1", 
    "\"Excuse me,\" you begin. The man turns, startled. \
\"Oh, hello! Welcome to Terminus. You'll have to forgive me, but we're all a little \
on edge lately, what with the Dark Wizard spreading corruption all along the \
coast.  You should be careful!\"",
    "item_citizen1.gif"));
TownSquare.addItem(new Item("RandomCitizen2", 
    "The man looks up from his newspaper when he notices you staring. \
\"Have you read this?\" he exclaims, shaking the latest edition of \"The Last \
Word\" in your face. \"It says here the wizard's corruption has spread as far\
as Oston to the south, and New Console is completely unrecoverable! These are \
dangerous times,\" he mutters, shaking his head and turning back to his reading.",
    "item_citizen2.gif"));
TownSquare.addItem(new Item("DistraughtLady", 
    "The woman is sobbing uncontrollably, her face in her hands. \
\"My baby,\" she cries, \"They kidnapped my baby! I just know that wizard had \
something to do with it.\"",
    "item_lady.gif"));

//MARKETPLACE
var Marketplace = new Room("Marketplace", 
    "You are in the marketplace.",
    "loc_market.gif");
var Vendor = new Item("Vendor", 
    "\" 'Ello there.\" The vendor smiles at you unpleasantly, \
revealing a mouth full of gold teeth. \"Well? Wot are you looking for?\"",
    "item_merchant.gif");
Vendor.addCmdText("rm", 
    "\"Ha! That spell doesn't work on everything, you know. I may have forgotten \
to mention that before I sold it to you...\"");
Marketplace.addItem(Vendor);
//var Backpack = new Item("Backpack", "There's a beat-up looking backpack on the table with no price tag.  Its cloth looks \n" +
//		"frayed, but sturdy. You glance quickly at the vendor, but his attention is elsewhere. \n" +
//		"Do you take the backpack? y\\n \n", "item_backpack.gif");
//Marketplace.addItem(Backpack);
var RmSpell = new Item("rmSpell", 
    "\"Ah, yes, the rm spell,\" he muses. \"Simply say \"rm\" followed by the name of an item or person, \
and they will disappear from this plane... forever. D'you have the guts to use it, I wonder?\"",
    "item_manuscript.gif");

//	"There's a spell scroll on the table labeled \"Remove.\" \n" +
//		"Do you want to buy it for 15 gold pieces? y/n \n", "item_manuscript.gif")
//"The vendor snatches the gold from your hand and then hands you the scroll,\n" +
//				"leering as he does so. \"Ah, yes, the rm spell,\" he muses. \"Simply say \"rm\" followed by the name of an item or person, \n" +
//				"and they will disappear from this plane... forever. D'you have the guts to use it, I wonder?\"\n" +
//				"You can now use the \"rm\" spell.\n", "Come back later.\n");
Marketplace.addItem(RmSpell);
var MkdirSpell = new Item("mkdirSpell",
    "Make dreams into reality. Just say \"mkdir\" followed by any name that pleases you, and you can create a new place that \
never existed there before. Ha! Not very useful, if y'ask me...\"",
    "item_manuscript.gif");
//		"Do you want to buy it for 30 gold pieces? y\\n \n"
//, "The vendor cackles. \"An ambitious one, eh? Very well. \n" +
//				"Just say \"mkdir\" followed by any name that pleases you, and you can create a new place \n" +
//				"that never existed there before. Ha! Not very useful, if y'ask me...\"\n" +
//				"You can now use the \"mkdir\" spell.\n", "You leave the mkdirSpell on the table\n");
Marketplace.addItem(MkdirSpell);

//LIBRARY
var Library = new Room("Library", 
    "The Library is dimly lit and smells like mildew. \
Still, it's warm in here and the soft green carpet makes it seem kind of cozy.",
    "loc_library.gif");
Library.addItem(new Item("TotallyRadSpellbook",
    "Legends speak of a great word of power that allows the speaker to perform \
any action on any item. \"Sudo\", as the ancients called it, conveys complete mastery over the elements. \
Unfortunately, or perhaps fortunately, the mystical password has been lost \
to the sands of time.",
    "item_radspellbook.gif"));
Library.addItem(new Item("PaperbackRomance", 
    "You flip the paperback open to a random page. \
\"Oh, Horatio!\" Antonia exclaimed, her bosom heaving as Horatio deftly ripped the \
bodice from her lithe frame. Horatio gave an animalistic growl and he clasped her \
fingers in his strong hands and brought them to rest upon his swollen— You close the \
book, disinterested, and place it back on the shelf.",
    "item_romancenovel.gif"));
Library.addItem(new Item("HistoryOfTerminus", 
    "It looks like an interesting book, but it's way too long and the print is too tiny.",
    "item_historybook.gif"));
Library.addItem(new Item("NostalgiaForHome", 
    "If you ever get lonely for Home, just 'cd ~' and you'll go back there. \
    But just remember that it will be harder to come back.",
    "item_historybook.gif"));
		// "DarkWizard", "...old tales tell of a dark wizard who will fragment the land...\n" +
		//"...only the world-maker can stop the dark wizard's virus from...\n" +
		//"...that the power of \"sudo\" may be the dark wizard's only weakness...\n"));
//add lever back when items when events can be added to items
//Library.addItem(new Item("InconspicuousLever", 
//    "You spot an inconspicuous lever behind the shelves.  Curious, you pull it, \
//and a panel slides open to reveal a secret back room.",
//    "item_lever.gif"));
Library.addCommand("grep");

//BACK ROOM
var BackRoom = new Room("BackRoom", 
    "You find a mysterious back room. You find a librarian \
alone with a small elf. You hope you're not interrupting.",
    "loc_backroom.gif");
BackRoom.addItem(new Item("Grep", 
    "The exceptionally ugly elf turns to you with a sour expression. \
\"Greeeeeep,\" he says sullenly.",
    "grep.gif"));
var Librarian = new Item("Librarian", 
    "\"Hm? Oh, hello. I apologize for the mess, but I'm very busy \
doing research on the dark wizard. Would you do me a favor? Go look up all \
references to DarkWizard in the History of Terminus. My assistant Grep \
can help you.\" \
Grep eyes you balefully. \"Greeepp.\" \"To search the contents of the book, just type \
\"grep PHRASE DOCUMENT\", where PHRASE is the phrase you want to search for, \
and DOCUMENT is the name of the book you want to search.\"",
    "item_librarian.gif");
BackRoom.addItem(Librarian);
BackRoom.addCommand("grep");

//ROCKY PATH
var RockyPath = new Room("RockyPath",
    "The weed-choked path leads off into the fields. \
There is an enormous boulder blocking your way, however.",
    "loc_rockypath.gif");
var Boulder = new Item("LargeBoulder", "It's much too big to move.", "item_boulder.gif");
Boulder.addCmdText("rm", "The boulder disappears with a pop.");
RockyPath.addItem(Boulder);
RockyPath.addCommand("rm");
Boulder.addValidCmd("rm");
RockyPath.ev.addListener("removeItem", function(){
    link_rooms(RockyPath, Farm);
});

//ARTISAN'S SHOP
var ArtisanShop = new Room("ArtisanShop", 
    "The walls of the shop are covered in clocks, \
all slightly out of sync. At the workbench, a woman in an enormous pair of goggles \
is wielding a blowtorch with frightening enthusiasm.",
    "loc_artisanshop.gif");
var StrangeTrinket = new Item("StrangeTrinket", "It looks like a crystal of some sort.  It's very beautiful.", "item_trinket.gif");
StrangeTrinket.addCmdText("rm", 
    "Didn't your mother ever teach you that it's rude to rease other people's \
things from their plane of existence?");
StrangeTrinket.addCmdText("mv", 
    "You can't take that, it's not yours!");
ArtisanShop.addItem(StrangeTrinket);
var ClockworkDragon = new Item("ClockworkDragon",
    "A dragon the size of a small dog is frolicking about the room. \
You'd think it was real if it weren't for the wind-up key sticking out of its back.",
    "item_clockdragon.gif");
ClockworkDragon.addCmdText("rm",  
    "Didn't your mother ever teach you that it's rude to erase other people's \
things from their plane of existence?");
ClockworkDragon.addCmdText("mv", 
    "You can't take that, it's not yours!");
ArtisanShop.addItem(ClockworkDragon);
var Artisan = new Item("Artisan", 
    "The Artisan lifts up her goggles and peers at you in \
surprise. \"Are you the new assistant? You're late! ...  \
\n\
You say you aren't my assistant? \
Well, that doesn't mean you can't make yourself useful. I need some gears, quickly! \
\n\
... \
\n\
You don't even know how to make things? Hmph. Some assistant you are. Just \
say \"touch ITEM\" alright? Where ITEM is the name of the thing you want to create. \
Now make me a Gear! Then come back.\"",
    "item_artisan.gif");
ArtisanShop.addItem(Artisan);
ArtisanShop.addCommand("touch");
ArtisanShop.ev.addListener("touchGear", function(){
    Artisan.addCmdText("less", "Well that’s lovely, thank you, but you can’t expect me to make\
anything with just one gear! Can’t you copy it?\n\
...\n\
*sigh* I can see you are going to need a lot of training. Just say “cp [ITEM] [NEWITEM]”.\
[ITEM]’s the name of the item that you want copy, and [NEWITEM]’s the new name of the\
copy, got it? Then poof! You’ll have shiny new item. I need five more gears so you’d better\
get started! Just call them gear1, gear2, gear3, gear4, and gear5, please.");
    ArtisanShop.addCommand("cp");
});
ArtisanShop.ev.addListener("FiveGearsCopied", function(){
    Artisan.addCmdText("less", "Ha, finished already? I guess you learn fast. Well, thanks for your \
        assistance.");
});

//FARM
var Farm = new Room("Farm",
    "There was once a farm of some sort here, but now the fields are scorched and brown.",
    "loc_farm.gif");
var EarOfCorn = new Item("EarOfCorn",
    "The corn is sad and withered-looking.",
    "item_corn.gif");
EarOfCorn.addCmdText("rm",
    "Why would you destroy a starving man's only food?");
Farm.addItem(EarOfCorn);
var Farmer = new Item("Farmer", 
    "\"Ruined! I'm ruined! Look at these crops... almost nothing \
left! The wizard's minions were here last week... they destroyed everything. How \
will I feed my 3 children with just one ear of corn? I could really use AnotherEarOfCorn! \"",
    "item_farmer.gif");
Farm.addItem(Farmer);
Farm.addCommand("cp");
Farm.ev.addListener("CornCopied", function(){
    Farmer.addCmdText("less", "It’s a miracle! Thank you, friend. May the Admin bless you.");
});

//CLEARING
var Clearing = new Room("Clearing", 
    "There's a small grassy clearing here, with a man sitting on a \
stone and sobbing. Behind him is a pile of rubble.",
    "loc_clearing.gif");
var CryingMan = new Item("CryingMan", 
    "\"You! You're a magic-user! I can tell, you've got that look. \
Come to finish the job, have you? Well, go ahead, do your worst there's nothing else you \
can take from me. Not since the rest of you were here a few days ago.\" \
\n\n\
\"What happened? You DARE to ask-- you know perfectly well what happened. \
Your friends, the wizard's minions, destroyed my house and kidnapped my poor \
daughter, that's what! My wife even went into town to look for help, and I haven't \
heard from her since!\" \
\n\n\
\"Hm? Well, I guess it's true that you don't look like one of the wizard's minions. Still, \
I don't trust you magicfolk. If you really are who you say you are, then prove your \
good intentions by making me a new House!\"",
    "item_man.gif");
Clearing.addItem(CryingMan);
Clearing.removeCommand("cd");
Clearing.addCmdText("cd", "You can’t cross the bridge until you’ve replaced the missing Plank.");
Clearing.addCommand("mkdir");
Clearing.ev.addListener("HouseMade", function(){
    Clearing.getChildFromName("House").addCmdText("cd", "You are entering the House that you made.");
    Clearing.getChildFromName("House").addCmdText("ls", "You made this house for the man. How thoughtful of you!");
    Clearing.removeCmdText("cd");
    Clearing.changeIntroText("There's a small grassy clearing here, with a man sitting on a \
stone and sobbing. Behind him is a pile of rubble. Behind him is a small white house.");
});

//BROKEN BRIDGE
var BrokenBridge = new Room("BrokenBridge",
    "A creaky wooden bridges stretches across a chasm. But it's missing a \
Plank, and the gap is too far to jump.",
    "loc_bridge.gif");
//beforeClearing = new Room("Clearing", "You can't cross the bridge until you've replaced the missing Plank.", "");
BrokenBridge.addCommand("touch");
BrokenBridge.ev.addListener("touchPlank", function(){
    // link_rooms(BrokenBridge, Clearing);
    Clearing.addCommand("cd");
    Clearing.removeCmdText("cd");
    BrokenBridge.removeCmdText("cd");
    BrokenBridge.changeIntroText("A creaky rope bridges stretches across a chasm.");
});
		
//OMINOUS-LOOKING PATH
var OminousLookingPath = new Room("OminousLookingPath", 
    "The path leads toward a dark cave. It's an ordinary cobblestone path, but for \
some reason it fills you with a sense of dread.",
    "loc_path.gif");
var ThornyBrambles = new Item("ThornyBrambles", 
    "This thicket of brambles is covered with wicked-looking thorns. You \
can't go around it, and you definitely aren't about to go through it.",
    "item_brambles.gif");
ThornyBrambles.addCmdText("mv", 
    "You can't touch them because they are covered with thorns. Ouch!");
ThornyBrambles.addCmdText("rm", 
    "You speak the words of the Remove spell and the brambles glimmer a \
deep blue. After fizzling for a minute, they disappear with a puff of smoke.");
ThornyBrambles.addValidCmd("rm");
OminousLookingPath.addItem(ThornyBrambles);
OminousLookingPath.addCommand("rm");
OminousLookingPath.ev.addListener("rmBrambles", function(){
    link_rooms(OminousLookingPath, CaveOfTrolls);
});

//CAVE
//Room beforeCave = new Room("CaveOfDisgruntledTrolls", "A patch of thorny brambles is growing at the mouth of the cave, blocking your way.", "loc_cave");
var CaveOfTrolls = new Room("CaveOfDisgruntledTrolls", 
    "The cave is dark and smells like... feet? Oh, right, it's probably the trolls. \
There's a scared-looking kid in a cage by the far wall.",
    "loc_cave.gif");
var UglyTroll = new Item("UglyTroll", 
    "He looks mad, and really ugly.",
    "item_troll1.gif");
UglyTroll.addCmdText("rm",
    "The troll looks briefy surprised, then vanishes with an unpleasant squelching sound.");
Boulder.addValidCmd("rm");
CaveOfTrolls.addItem(UglyTroll);
//beforeCave.addItem(uglyTroll);
var UglierTroll = new Item("UglierTroll", 
    "He looks mad, and really, really ugly.",
    "item_troll2.gif");
UglierTroll.addCmdText("rm",
    "The troll looks briefy surprised, then vanishes with an unpleasant squelching sound.");
CaveOfTrolls.addItem(UglierTroll);
//beforeCave.addItem(uglierTroll);
/*hideousTroll = new MoveableItem("AbsolutelyHideousTroll", "You probably don't want to look at this guy. Oops, too late. \n", "item_supertroll");
hideousTroll.setRMText("The troll belches spectacularly, and you could swear he actually smirks. \n" +
		"You won't get rid of him that easily, not without admin privileges.\n");
hideousTroll.setMVText("If you move him out of the cave, he'll terrorize \n" +
		"the countryside. Also he will probably eat you. \n");*/
var HideousTroll = new Item("AbsolutelyHideousTroll", 
    "You probably don't want to look at this guy. Oops, too late.",
    "item_supertroll.gif");
HideousTroll.addCmdText("rm", 
    "The troll belches spectacularly, and you could swear he actually smirks. \
You won't get rid of him that easily, not without the PASSWORD.");
HideousTroll.addCmdText("mv", 
    "If you move him out of the cave, he'll terrorize \
the countryside. Also he will probably eat you.");
CaveOfTrolls.addItem(HideousTroll);
//beforeCave.addItem(hideousTroll);
CaveOfTrolls.addCommand("rm");
CaveOfTrolls.addCommand("mv");

//CAGE
var Cage = new Room("Cage", 
    "There's a scared-looking kid in there.",
    "item_cage.gif");
var KidnappedChild = new Item("KidnappedChild",
    "You know it's kind of mean, but you can't help but think that that is one \
funny-looking kid.",
    "item_cagedboy.gif");
KidnappedChild.addCmdText("mv", 
    "The kid looks around, dazed, surprised to find himself out of the cage. \
You smile at him and speak in a gentle voice. 'You should probably be getting home, \
little boy. Someone is there waiting for you.' \
'I'm a girl,' says the little girl smartly. Then she dashes past you, out of the cave, and \
runs up the ominous path towards home.");
Cage.addItem(KidnappedChild);

//Athena cluster
var AthenaCluster = new Room("AthenaCluster", "None shall pass without the combination. You\
    have one chance to enter the combination. Enter password:");
var Workstation = new Item("Workstation", "The Workstation has resources you can use to \
    access files in a joint Athena locker. It adds new rooms (when they're in your Home we\
    call them lockers) to your Home, and you can \
    add them to your collection of lockers if you have permission. If you know what you want to add \
    to your Home (the name of the locker you want, of course), just 'add LOCKERNAME'. It \
    gives you extra spells (if you learn them), and gives you more Rooms to explore.")
AthenaCluster.addItem(Workstation);
AthenaCluster.removeCommand("ls");
AthenaCluster.addCmdText("ls", "You must enter the Athena cluster combo first.");
AthenaCluster.removeCommand("cd");
AthenaCluster.addCmdText("cd", "None shall pass without the combination. You\
    have one chance to enter the combination. Enter password:")
AthenaCluster.ev.addListener("AthenaClusterExited", function(){
    AthenaCluster.removeCommand("cd");
});
AthenaCluster.addCommand("tellme");

//MIT
var MIT = new Room("MIT", "You have arrived by magic carpet to MIT!", "item_manuscript.gif");
var AdmissionLetter = new Item("AdmissionLetter", "Congratulations on entering MIT! \
    Here you will learn special spells that you can only use at MIT. Enjoy!", "item_manuscript.gif")
MIT.addItem(AdmissionLetter);
MIT.ev.addListener("tryEnterAthenaCluster", function(){
    MIT.addCommand("terminus");
    MIT.addCmdText("terminus", "You have correctly entered the cluster combo. Entering the AthenaCluster.");
    AthenaCluster.removeCommand("ls");
    AthenaCluster.addCmdText("ls", "You must enter the Athena cluster combo first.");
    // AthenaCluster.removeCommand("cd");
    // AthenaCluster.addCmdText("cd", "None shall pass without the combination. You\
    // have one chance to enter the combination. Enter password:");
});
MIT.ev.addListener("AthenaComboEntered", function(){
    AthenaCluster.addCommand("ls");
    AthenaCluster.removeCmdText("ls");
    AthenaCluster.addCommand("cd");
    // AthenaCluster.addCmdText("cd", "You have correctly entered the cluster combo. You may enter.");
    enterRoom(AthenaCluster);
    MIT.removeCommand("terminus");
    MIT.removeCmdText("terminus");
});
MIT.addCommand("tellme");

//StataCenter
var StataCenter = new Room("StataCenter");
var WaryEyeOfGradStudent = new Item("WaryEyeOfGradStudent", "If you so desire, you can add \
    a new MagicLocker outside your Home. In this MagicLocker you can find some tools that \
    will be useful in your time at MIT (and beyond). There you can find portals to \
    other places, you can write notes, and you can store various items you collect in \
    your travels in the MagicLocker. But first you need to go to the AthenaCluster and \
    learn how.");
StataCenter.addItem(WaryEyeOfGradStudent);
var HelpfulTA = new Item("HelpfulTA", "Ah, welcome to the wonderful land of Stata.\
    There's one room here that you'll need the combination for. All you have to do is ask:\
    'tellme combo'.");
StataCenter.addItem(HelpfulTA);
StataCenter.addCommand("tellme");

//Magic locker
var MagicLocker = new Room("MagicLocker")

/**
* LINKS BETWEEN ROOMS
* Fulfill parent/child relationships between rooms
*
* API: link(parentRoom, childRoom) 
*/
function link_rooms(parentRoom, childRoom){if (!(childRoom in parentRoom.children)){parentRoom.addChild(childRoom);}if (!(parentRoom in childRoom.parents)){childRoom.addParent(parentRoom);}};


// LEVEL 1 LINKS
link_rooms(Home, WesternForest);
link_rooms(WesternForest, SpellCastingAcademy);
link_rooms(SpellCastingAcademy, PracticeRoom);
link_rooms(PracticeRoom, Box);
link_rooms(Home, NorthernMeadow);
link_rooms(NorthernMeadow, EasternMountains);
link_rooms(SpellCastingAcademy, Lessons);
link_rooms(EasternMountains, Cave);
link_rooms(Cave, DarkCorridor);
link_rooms(Cave, Staircase);
link_rooms(DarkCorridor, DankRoom);
link_rooms(DankRoom, SmallHole);
link_rooms(Tunnel, StoneChamber);
link_rooms(StoneChamber, Portal);

//level 1 -> level 2
link_rooms(Portal, TownSquare);

//LEVEL 2 LINKS
link_rooms(TownSquare, Marketplace);
link_rooms(TownSquare, Library);
link_rooms(TownSquare, RockyPath);
link_rooms(TownSquare, ArtisanShop);
link_rooms(TownSquare, BrokenBridge);
//link(library, backRoom); 
// link_rooms(RockyPath, Farm);
link_rooms(BrokenBridge, Clearing);
link_rooms(Clearing, OminousLookingPath);
// link_rooms(OminousLookingPath, CaveOfTrolls);
//link_rooms(CaveOfTrolls, Cave);

//MIT level links
link_rooms(Home, MIT);
link_rooms(MIT, StataCenter);
link_rooms(MIT, AthenaCluster);