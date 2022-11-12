function CopyName(id) {
  let copyText = document.getElementById(id);
  copyText.hidden = false;
  copyText.select();
  document.execCommand("copy");
  copyText.hidden = true;
}

function randomInt(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min);
  return Math.round(rand);
}

function GetRandomEmote() {
  let pg = ["amogus", "amongParty", "bananaDance", "bananaDance", "BLANKIES", "blobDance", "bongoTap", "BONK", 
	"browsW", "catJAM", "clapW", "clappingW", "coolDoge", "dogeDancedrumTime", 
	"duckPls", "EDM", "FeelsRainMan", "fluteJAM", "guitarTime", "headbangingW", "jammiesW", "KEKW", 
	"marioDance", "catParty", "miyanoHype", "MYAAA", "NOPERS", "nyanPls", "parrotJAM", "partyKirby", 
	"peepoArrive", "peepoBlanket", "peepoBye", "peepoChat", "peepoClap", "peepoDj", "peepoShy", 
	"pepeJAM", "pikachuS", "PogU", "popCat", "pressF", "pugPls", "rainbowPls", "ratJAM", "rickroll", 
	"SadCatW", "SadgeCry", "turtleHop", "turtleAngry", "turtleCry", "turtleDrip", "turtleFlush", 
	"turtleHYPE", "turtleJAM", "turtlePop", "turtleShower", "turtleHi", "turtleYo", "turtleShoe", 
	"lightersUp", "lionDance", "widepeepoHappy"];
  let idx = randomInt(0, pg.length);
  CopyName(pg[idx]);
}